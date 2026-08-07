import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  ExternalLink,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteRegistryItem,
  fetchOwnRegistry,
  fetchPublicClaimsForItems,
  fetchThankYouList,
  reorderItems,
  updateRegistry,
} from "@/lib/registryApi";
import { supabase } from "@/lib/supabase";
import type {
  OwnerRegistry,
  RegistryItem,
  ThankYouRow,
} from "@/lib/registryTypes";
import AddItemDialog from "@/components/registry/AddItemDialog";
import { itemImage } from "@/lib/registryPlaceholder";

const RegistryDashboardPage = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [registry, setRegistry] = useState<OwnerRegistry | null>(null);
  const [items, setItems] = useState<RegistryItem[]>([]);
  const [claims, setClaims] = useState<Record<string, number>>({});
  const [thankYou, setThankYou] = useState<ThankYouRow[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Editable header fields (kept in local state so typing does not re-fetch)
  const [nameField, setNameField] = useState("");
  const [titleField, setTitleField] = useState("");
  const [dueField, setDueField] = useState("");
  const [messageField, setMessageField] = useState("");
  const [addressField, setAddressField] = useState("");
  const [savingHeader, setSavingHeader] = useState(false);

  const loadAll = useCallback(
    async (opts?: { silent?: boolean }) => {
      const silent = opts?.silent ?? false;
      try {
        const reg = await fetchOwnRegistry();
        if (!reg) {
          navigate("/registry/new", { replace: true });
          return;
        }
        setRegistry(reg);
        setNameField(reg.owner_name);
        setTitleField(reg.title ?? "");
        setDueField(reg.due_date ?? "");
        setMessageField(reg.optional_message ?? "");
        setAddressField(reg.shipping_address);

        const { data: itemRows, error } = await supabase
          .from("registry_items")
          .select("*")
          .eq("registry_id", reg.id)
          .order("position", { ascending: true });
        if (error) throw error;
        const rows = (itemRows ?? []) as RegistryItem[];
        setItems(rows);

        const publicClaims = await fetchPublicClaimsForItems(rows.map((r) => r.id));
        const map: Record<string, number> = {};
        for (const c of publicClaims) {
          map[c.item_id] = (map[c.item_id] ?? 0) + c.quantity_claimed;
        }
        setClaims(map);

        const ty = await fetchThankYouList();
        setThankYou(ty);
      } catch (err) {
        if (!silent) toast.error("Could not refresh the registry. Please try again.");
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setFirstLoad(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    document.title = "Your registry dashboard | Everything Baby";
    if (authLoading) return;
    if (!session) {
      navigate("/registry/login", { replace: true });
      return;
    }
    loadAll();
  }, [authLoading, session, navigate, loadAll]);

  const saveHeader = async () => {
    if (!registry) return;
    setSavingHeader(true);
    try {
      await updateRegistry({
        id: registry.id,
        ownerName: nameField,
        title: titleField.trim() || null,
        dueDate: dueField || null,
        optionalMessage: messageField.trim() || null,
        shippingAddress: addressField,
      });
      // Update in place; no full reload.
      setRegistry((r) =>
        r
          ? {
              ...r,
              owner_name: nameField,
              title: titleField.trim() || null,
              due_date: dueField || null,
              optional_message: messageField.trim() || null,
              shipping_address: addressField,
            }
          : r
      );
      toast.success("Details saved.");
    } catch {
      toast.error("Could not save. Please try again.");
    } finally {
      setSavingHeader(false);
    }
  };

  const removeItem = async (id: string) => {
    // Optimistic: remove from local state immediately, roll back on failure.
    const prev = items;
    setItems((rows) => rows.filter((r) => r.id !== id));
    setClaims(({ [id]: _drop, ...rest }) => rest);
    try {
      await deleteRegistryItem(id);
      toast.success("Item removed.");
    } catch {
      setItems(prev);
      toast.error("Could not remove item.");
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const prev = items;
    const next = items.slice();
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    setItems(next);
    try {
      await reorderItems(next.map((r) => r.id));
    } catch {
      setItems(prev);
      toast.error("Could not reorder.");
    }
  };

  const onItemAdded = (newItem: RegistryItem) => {
    setItems((rows) => [...rows, newItem]);
    setAddOpen(false);
    toast.success("Item added.");
  };

  const shareLink = registry
    ? `${window.location.origin}/registry/${registry.slug}`
    : "";

  const copyShareLink = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied.");
    setTimeout(() => setCopied(false), 1600);
  };

  if (firstLoad || !registry) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-4xl px-4 py-16">
          {/* Skeleton — avoids flashing a "Loading..." string in and out */}
          <div className="h-8 w-64 rounded bg-muted animate-pulse" />
          <div className="mt-4 h-4 w-96 rounded bg-muted animate-pulse" />
          <div className="mt-8 h-40 w-full rounded-2xl bg-muted animate-pulse" />
          <div className="mt-6 h-56 w-full rounded-2xl bg-muted animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  const totalWanted = items.reduce((s, i) => s + i.quantity_wanted, 0);
  const totalClaimed = Object.values(claims).reduce((s, v) => s + v, 0);
  const progress = totalWanted === 0 ? 0 : Math.round((totalClaimed / totalWanted) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Your registry
            </h1>
            <p className="mt-2 font-body text-muted-foreground">
              Manage your items and share the link with friends and family.
            </p>
          </div>
          <Button
            variant="ghost"
            className="font-body gap-2"
            onClick={() => signOut().then(() => navigate("/"))}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>

        <Card className="mt-6 rounded-2xl border border-border">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm text-muted-foreground">Share link</p>
                <p className="font-body text-sm text-foreground truncate">{shareLink}</p>
              </div>
              <Button onClick={copyShareLink} className="font-body gap-2 transition-transform active:scale-95">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
            {totalWanted > 0 && (
              <div className="mt-6">
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>
                    {totalClaimed} of {totalWanted} items fulfilled
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="mt-2 h-2 transition-all" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-2xl border border-border">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">Registry details</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="d-name" className="font-body">Your name</Label>
                <Input id="d-name" value={nameField} onChange={(e) => setNameField(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-title" className="font-body">Registry title (optional)</Label>
                <Input id="d-title" value={titleField} onChange={(e) => setTitleField(e.target.value)} placeholder="e.g. Jennifer's Baby" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-due" className="font-body">Due date</Label>
                <Input id="d-due" type="date" value={dueField} onChange={(e) => setDueField(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-msg" className="font-body">Message for guests</Label>
              <Textarea id="d-msg" value={messageField} onChange={(e) => setMessageField(e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-addr" className="font-body">Shipping address</Label>
              <Textarea id="d-addr" value={addressField} onChange={(e) => setAddressField(e.target.value)} rows={2} />
              <p className="text-xs text-muted-foreground font-body">
                Only shared with guests who claim items from an external retailer.
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={saveHeader} disabled={savingHeader} className="font-body transition-transform active:scale-95">
                {savingHeader ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">Items</h2>
          <Button onClick={() => setAddOpen(true)} className="font-body gap-2 transition-transform active:scale-95">
            <Plus className="h-4 w-4" />
            Add item
          </Button>
        </div>

        {items.length === 0 ? (
          <Card className="mt-4 rounded-2xl border-dashed">
            <CardContent className="p-10 text-center font-body text-muted-foreground">
              No items yet. Add your first item to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item, index) => {
              const claimed = claims[item.id] ?? 0;
              return (
                <Card
                  key={item.id}
                  className="rounded-2xl border border-border transition-all duration-200"
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src={itemImage(item.image_url)}
                      alt={item.title}
                      className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-foreground truncate">
                          {item.title}
                        </h3>
                        <Badge variant="outline" className="font-body text-xs">
                          {item.source === "external" ? "External" : "Catalogue"}
                        </Badge>
                      </div>
                      <p className="mt-1 font-body text-sm text-muted-foreground">
                        {claimed} of {item.quantity_wanted} claimed
                        {item.price ? ` · ${item.price}` : ""}
                      </p>
                      {item.source === "external" && item.external_url && (
                        <a
                          href={item.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 font-body text-xs text-primary"
                        >
                          View retailer
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">Thank you list</h2>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Who claimed what. Anonymous claims show up as "Anonymous" and their email is never shown here.
          </p>
          <Card className="mt-4 rounded-2xl border border-border">
            <CardContent className="p-0">
              {thankYou.length === 0 ? (
                <div className="p-6 text-center font-body text-muted-foreground">
                  No claims yet.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {thankYou.map((row) => (
                    <li key={row.claim_id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <p className="font-body text-sm text-foreground">
                          <span className="font-medium">{row.claimant_display_name}</span>
                          {" claimed "}
                          <span className="font-medium">{row.item_title}</span>
                          {row.quantity_claimed > 1 ? ` (×${row.quantity_claimed})` : ""}
                        </p>
                        <p className="mt-0.5 font-body text-xs text-muted-foreground">
                          {new Date(row.created_at).toLocaleString("en-GB")}
                        </p>
                      </div>
                      {row.is_anonymous && (
                        <Badge variant="outline" className="font-body text-xs">
                          Anonymous
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {registry && (
        <AddItemDialog
          registryId={registry.id}
          open={addOpen}
          onOpenChange={setAddOpen}
          onAdded={onItemAdded}
        />
      )}
    </div>
  );
};

export default RegistryDashboardPage;
