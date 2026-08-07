export interface PublicRegistry {
  id: string;
  slug: string;
  owner_name: string;
  due_date: string | null;
  optional_message: string | null;
  created_at: string;
}

export interface OwnerRegistry extends PublicRegistry {
  owner_id: string;
  owner_email: string;
  shipping_address: string;
}

export type ItemSource = "internal" | "external";

export interface RegistryItem {
  id: string;
  registry_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: string | null;
  quantity_wanted: number;
  source: ItemSource;
  product_id: string | null;
  external_url: string | null;
  position: number;
}

export interface PublicClaim {
  id: string;
  item_id: string;
  quantity_claimed: number;
  status: "reserved" | "purchased";
  created_at: string;
}

export interface RegistryItemWithRemaining extends RegistryItem {
  quantity_claimed: number;
  quantity_remaining: number;
}

export interface CreateClaimResult {
  claim_id: string;
  undo_token: string;
  item_title: string;
  owner_name: string;
  is_external: boolean;
  external_url: string | null;
  /** Only populated when is_external is true. Never for internal claims. */
  shipping_address: string | null;
}

export interface ThankYouRow {
  claim_id: string;
  item_id: string;
  item_title: string;
  quantity_claimed: number;
  claimant_display_name: string;
  is_anonymous: boolean;
  status: "reserved" | "purchased";
  created_at: string;
}
