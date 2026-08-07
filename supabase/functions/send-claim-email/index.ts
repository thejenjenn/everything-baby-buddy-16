// Supabase Edge Function (Deno).
// Sends the guest's claim confirmation via Resend.
// Called by the browser immediately after a successful create_claim RPC.
//
// The client passes a JWT so Supabase authenticates the request; we also
// re-derive some fields from the DB to make sure we never trust the client
// blindly for anonymity or shipping address.
//
// Env vars expected:
//   RESEND_API_KEY        - Resend server key
//   RESEND_FROM           - "Everything Baby <hello@yourdomain>"
//   SUPABASE_URL          - populated by the Supabase runtime
//   SUPABASE_SERVICE_ROLE_KEY - populated by the Supabase runtime
//   SITE_URL              - e.g. https://theeverythingbaby.com
//
// Deploy with:
//   supabase functions deploy send-claim-email
//   supabase secrets set RESEND_API_KEY=... RESEND_FROM=... SITE_URL=...

// @ts-nocheck deno runtime
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM = Deno.env.get("RESEND_FROM");
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://example.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { claim_id } = await req.json();
    if (!claim_id) return badRequest("missing claim_id");

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Look up the claim + related item + registry (bypassing RLS via service role).
    const { data, error } = await admin
      .from("claims")
      .select(
        `
          id, guest_name, guest_email, quantity_claimed, is_anonymous, undo_token, created_at,
          item:registry_items (
            id, title, source, external_url,
            registry:registries ( id, slug, owner_name, shipping_address )
          )
        `
      )
      .eq("id", claim_id)
      .single();
    if (error || !data) return badRequest("claim_not_found");

    const item = data.item as unknown as {
      title: string;
      source: "internal" | "external";
      external_url: string | null;
      registry: {
        slug: string;
        owner_name: string;
        shipping_address: string;
      };
    };

    const isExternal = item.source === "external";
    const undoUrl = `${SITE_URL}/registry/claim/undo?token=${encodeURIComponent(
      data.undo_token
    )}`;

    const addressBlock = isExternal
      ? `<div style="margin:16px 0;padding:12px 14px;background:#fdf3ec;border-radius:8px">
           <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#7a5a3f">
             Ship to this address when you order from ${escapeHtml(
               new URL(item.external_url ?? SITE_URL).hostname
             )}
           </p>
           <p style="margin:6px 0 0;white-space:pre-line">${escapeHtml(
             item.registry.shipping_address
           )}</p>
         </div>`
      : `<p>This item comes from Everything Baby directly. We will contact you shortly with next steps.</p>`;

    const html = `
      <div style="font-family:ui-sans-serif,system-ui;color:#171717;max-width:520px;margin:0 auto;padding:24px">
        <h1 style="font-size:20px;margin:0 0 12px">Thank you for claiming ${escapeHtml(
          item.title
        )}</h1>
        <p>Hi ${escapeHtml(data.guest_name)},</p>
        <p>You have claimed <strong>${escapeHtml(item.title)}</strong>${
      data.quantity_claimed > 1 ? ` (×${data.quantity_claimed})` : ""
    } from ${escapeHtml(item.registry.owner_name)}'s registry.</p>
        ${addressBlock}
        <p>Plans changed? You can undo this claim within 24 hours using the link below.</p>
        <p><a href="${undoUrl}" style="color:#c76a3f">Undo my claim</a></p>
        <p style="margin-top:24px;color:#7a5a3f;font-size:12px">
          Sent by Everything Baby. This link expires 24 hours after your claim.
        </p>
      </div>
    `;

    const subject = `You've claimed ${item.title} from ${item.registry.owner_name}'s registry`;

    if (!RESEND_API_KEY || !RESEND_FROM) {
      // Fail loudly rather than silently swallowing when misconfigured.
      return json({ sent: false, reason: "email_not_configured" }, 200);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [data.guest_email],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return json({ sent: false, reason: "resend_error", detail: text }, 500);
    }
    return json({ sent: true });
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}
function badRequest(msg: string) {
  return json({ error: msg }, 400);
}
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
