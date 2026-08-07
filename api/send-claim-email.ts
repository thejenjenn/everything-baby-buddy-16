// Vercel serverless function. Runs server-side, never in the browser.
//
// Called by the site client immediately after a successful create_claim RPC.
// Looks the claim up via the Supabase service role (bypassing RLS) so we
// never trust the client for anonymity or the shipping address, then sends
// two emails via Resend:
//   1. Guest confirmation, with the undo link and shipping address if external
//   2. Owner notification, respecting the anonymity flag
//
// Required Vercel env vars (server-only, do NOT prefix VITE_):
//   SUPABASE_URL                 - https://<ref>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    - the service_role key from Supabase API settings
//   RESEND_API_KEY               - re_...
//   RESEND_FROM                  - e.g. "Everything Baby <onboarding@resend.dev>"
//   SITE_URL                     - e.g. https://everything-baby-buddy-16.vercel.app

import { createClient } from "@supabase/supabase-js";
import { buildClaimEmail } from "../supabase/functions/send-claim-email/payload";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const config = { runtime: "nodejs" };

type ClaimRow = {
  id: string;
  guest_name: string;
  guest_email: string;
  quantity_claimed: number;
  is_anonymous: boolean;
  undo_token: string;
  item: {
    title: string;
    source: "internal" | "external";
    external_url: string | null;
    registry: {
      slug: string;
      owner_name: string;
      owner_email: string;
      shipping_address: string;
    };
  };
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    RESEND_FROM,
    SITE_URL,
  } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "server_not_configured" }, 500);
  }
  if (!RESEND_API_KEY || !RESEND_FROM) {
    // Not fatal — the claim succeeded, we just cannot send email.
    return json({ sent: false, reason: "email_not_configured" }, 200);
  }

  let body: { claim_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const claimId = body.claim_id;
  if (!claimId) return json({ error: "missing_claim_id" }, 400);

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin
    .from("claims")
    .select(
      `id, guest_name, guest_email, quantity_claimed, is_anonymous, undo_token,
       item:registry_items ( title, source, external_url,
         registry:registries ( slug, owner_name, owner_email, shipping_address ) )`
    )
    .eq("id", claimId)
    .single<ClaimRow>();

  if (error || !data) return json({ error: "claim_not_found" }, 404);

  const guestPayload = buildClaimEmail({
    guestName: data.guest_name,
    guestEmail: data.guest_email,
    quantityClaimed: data.quantity_claimed,
    isAnonymous: data.is_anonymous,
    undoToken: data.undo_token,
    siteUrl: SITE_URL ?? "https://example.com",
    item: {
      title: data.item.title,
      source: data.item.source,
      externalUrl: data.item.external_url,
    },
    registry: {
      ownerName: data.item.registry.owner_name,
      shippingAddress: data.item.registry.shipping_address,
    },
  });

  const ownerPayload = buildOwnerNotification({
    ownerEmail: data.item.registry.owner_email,
    ownerName: data.item.registry.owner_name,
    itemTitle: data.item.title,
    quantity: data.quantity_claimed,
    isAnonymous: data.is_anonymous,
    guestName: data.guest_name,
    registrySlug: data.item.registry.slug,
    siteUrl: SITE_URL ?? "https://example.com",
  });

  // Send both in parallel. If one fails we still report the other.
  const [guestRes, ownerRes] = await Promise.allSettled([
    sendResend(RESEND_API_KEY, RESEND_FROM, guestPayload),
    ownerPayload
      ? sendResend(RESEND_API_KEY, RESEND_FROM, ownerPayload)
      : Promise.resolve({ skipped: true } as const),
  ]);

  return json({
    guest: summarise(guestRes),
    owner: summarise(ownerRes),
  });
}

interface Payload {
  to: string;
  subject: string;
  html: string;
}

function buildOwnerNotification(args: {
  ownerEmail: string;
  ownerName: string;
  itemTitle: string;
  quantity: number;
  isAnonymous: boolean;
  guestName: string;
  registrySlug: string;
  siteUrl: string;
}): Payload | null {
  if (!args.ownerEmail) return null;

  const claimant = args.isAnonymous ? "Someone (anonymously)" : args.guestName;
  const dashboardUrl = args.siteUrl.replace(/\/$/, "") + "/registry/dashboard";
  const publicUrl =
    args.siteUrl.replace(/\/$/, "") + "/registry/" + args.registrySlug;

  const qty = args.quantity > 1 ? ` (×${args.quantity})` : "";

  return {
    to: args.ownerEmail,
    subject: `${claimant} claimed ${args.itemTitle} from your registry`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #171717;">
        <h1 style="font-size: 20px; margin: 0 0 12px;">Someone just claimed a gift</h1>
        <p>Hi ${escapeHtml(args.ownerName)},</p>
        <p><strong>${escapeHtml(claimant)}</strong> just claimed
          <strong>${escapeHtml(args.itemTitle)}</strong>${qty} from your registry.</p>
        <p style="margin-top: 20px;">
          <a href="${dashboardUrl}" style="background:#c76a3f;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;display:inline-block;font-weight:500;">Open your dashboard</a>
        </p>
        <p style="margin-top: 20px; font-size: 12px; color: #7a5a3f;">
          Public registry link: <a href="${publicUrl}" style="color:#c76a3f;">${publicUrl}</a>
        </p>
      </div>
    `,
  };
}

async function sendResend(key: string, from: string, payload: Payload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return { ok: true } as const;
}

function summarise(r: PromiseSettledResult<unknown>) {
  if (r.status === "fulfilled") return { ok: true, ...(r.value as object) };
  return { ok: false, error: String(r.reason) };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  } as Record<string, string>;
}
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders() },
  });
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
