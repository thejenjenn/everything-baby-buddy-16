import { supabase } from "./supabase";
import type {
  CreateClaimResult,
  OwnerRegistry,
  PublicClaim,
  PublicRegistry,
  RegistryItem,
  RegistryItemWithRemaining,
  ThankYouRow,
} from "./registryTypes";

/**
 * Fetch a registry and its items by slug, for the public page.
 * Reads through public_registries, so shipping_address is never returned.
 */
export async function fetchPublicRegistry(slug: string): Promise<{
  registry: PublicRegistry;
  items: RegistryItemWithRemaining[];
} | null> {
  const { data: registry, error } = await supabase
    .from("public_registries")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!registry) return null;

  const { data: items, error: itemsError } = await supabase
    .from("registry_items")
    .select("*")
    .eq("registry_id", registry.id)
    .order("position", { ascending: true });
  if (itemsError) throw itemsError;

  const itemIds = (items ?? []).map((i) => i.id);
  const claimsByItem = new Map<string, number>();
  if (itemIds.length > 0) {
    const { data: claims, error: claimsError } = await supabase
      .from("claims")
      .select("item_id, quantity_claimed")
      .in("item_id", itemIds);
    if (claimsError) throw claimsError;
    for (const c of claims ?? []) {
      claimsByItem.set(c.item_id, (claimsByItem.get(c.item_id) ?? 0) + c.quantity_claimed);
    }
  }

  const enriched: RegistryItemWithRemaining[] = (items ?? []).map((item: RegistryItem) => {
    const claimed = claimsByItem.get(item.id) ?? 0;
    return {
      ...item,
      quantity_claimed: claimed,
      quantity_remaining: Math.max(item.quantity_wanted - claimed, 0),
    };
  });

  return { registry: registry as PublicRegistry, items: enriched };
}

/** Claim one or more units of an item. Server serialises concurrent callers. */
export async function claimItem(args: {
  registrySlug: string;
  itemId: string;
  guestName: string;
  guestEmail: string;
  quantity: number;
  isAnonymous: boolean;
}): Promise<CreateClaimResult> {
  const { data, error } = await supabase.rpc("create_claim", {
    p_registry_slug: args.registrySlug,
    p_item_id: args.itemId,
    p_guest_name: args.guestName,
    p_guest_email: args.guestEmail,
    p_quantity: args.quantity,
    p_is_anonymous: args.isAnonymous,
  });
  if (error) throw error;

  const result = data as CreateClaimResult;
  // Fire-and-forget: hit the Vercel serverless route that sends the guest
  // confirmation and owner notification. Failure here does not affect the
  // claim itself, which is already committed in the DB.
  fetch("/api/send-claim-email", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ claim_id: result.claim_id }),
  }).catch(() => {
    /* swallow: the confirmation UI still shows on-screen */
  });

  return result;
}

export async function undoClaim(token: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("undo_claim", { p_undo_token: token });
  if (error) throw error;
  return Boolean(data);
}

/** Owner: fetch my registry (or null if I have not created one). */
export async function fetchOwnRegistry(): Promise<OwnerRegistry | null> {
  const { data, error } = await supabase
    .from("registries")
    .select("*")
    .maybeSingle();
  if (error) throw error;
  return (data as OwnerRegistry | null) ?? null;
}

export async function createRegistry(args: {
  ownerName: string;
  ownerEmail: string;
  title: string | null;
  dueDate: string | null;
  optionalMessage: string | null;
  shippingAddress: string;
}): Promise<{ id: string; slug: string }> {
  const { data, error } = await supabase.rpc("create_registry", {
    p_owner_name: args.ownerName,
    p_owner_email: args.ownerEmail,
    p_title: args.title,
    p_due_date: args.dueDate,
    p_optional_message: args.optionalMessage,
    p_shipping_address: args.shippingAddress,
  });
  if (error) throw error;
  return data as { id: string; slug: string };
}

export async function updateRegistry(args: {
  id: string;
  ownerName?: string;
  title?: string | null;
  dueDate?: string | null;
  optionalMessage?: string | null;
  shippingAddress?: string;
}): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (args.ownerName !== undefined) patch.owner_name = args.ownerName;
  if (args.title !== undefined) patch.title = args.title;
  if (args.dueDate !== undefined) patch.due_date = args.dueDate;
  if (args.optionalMessage !== undefined) patch.optional_message = args.optionalMessage;
  if (args.shippingAddress !== undefined) patch.shipping_address = args.shippingAddress;
  const { error } = await supabase.from("registries").update(patch).eq("id", args.id);
  if (error) throw error;
}

export async function addRegistryItem(args: {
  registryId: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  price?: string | null;
  quantityWanted: number;
  source: "internal" | "external";
  productId?: string | null;
  externalUrl?: string | null;
}): Promise<RegistryItem> {
  const { data: existing, error: countErr } = await supabase
    .from("registry_items")
    .select("position")
    .eq("registry_id", args.registryId)
    .order("position", { ascending: false })
    .limit(1);
  if (countErr) throw countErr;
  const nextPosition = (existing?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("registry_items")
    .insert({
      registry_id: args.registryId,
      title: args.title,
      description: args.description ?? null,
      image_url: args.imageUrl ?? null,
      price: args.price ?? null,
      quantity_wanted: args.quantityWanted,
      source: args.source,
      product_id: args.productId ?? null,
      external_url: args.externalUrl ?? null,
      position: nextPosition,
    })
    .select()
    .single();
  if (error) throw error;
  return data as RegistryItem;
}

export async function deleteRegistryItem(itemId: string): Promise<void> {
  const { error } = await supabase.from("registry_items").delete().eq("id", itemId);
  if (error) throw error;
}

export async function reorderItems(orderedIds: string[]): Promise<void> {
  // Simple approach: one update per item. Registries are small.
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("registry_items").update({ position: index }).eq("id", id)
    )
  );
}

export async function fetchThankYouList(): Promise<ThankYouRow[]> {
  const { data, error } = await supabase.rpc("owner_thank_you_list");
  if (error) throw error;
  return (data as ThankYouRow[]) ?? [];
}

export async function fetchPublicClaimsForItems(itemIds: string[]): Promise<PublicClaim[]> {
  if (itemIds.length === 0) return [];
  const { data, error } = await supabase
    .from("claims")
    .select("id, item_id, quantity_claimed, status, created_at")
    .in("item_id", itemIds);
  if (error) throw error;
  return (data as PublicClaim[]) ?? [];
}
