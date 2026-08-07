import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addRegistryItem } from "@/lib/registryApi";
import { supabase } from "@/lib/supabase";
import { itemImage } from "@/lib/registryPlaceholder";
import type { RegistryItem } from "@/lib/registryTypes";
import { shopSections } from "@/data/shopProducts";
import { Check, ImagePlus, Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  registryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: (item: RegistryItem) => void;
}

interface CatalogueOption {
  id: string;
  section: string;
  name: string;
  price: string;
  image: string;
}

const catalogueOptions: CatalogueOption[] = shopSections.flatMap((section) =>
  section.products.map((p) => ({
    id: p.id,
    section: section.title,
    name: p.name,
    price: p.price,
    image: p.image,
  }))
);

const STORAGE_BUCKET = "registry-images";

const AddItemDialog = ({ registryId, open, onOpenChange, onAdded }: Props) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Internal (catalogue)
  const [selectedProductId, setSelectedProductId] = useState<string>(
    catalogueOptions[0]?.id ?? ""
  );
  const [internalQty, setInternalQty] = useState(1);
  const selectedProduct = catalogueOptions.find((o) => o.id === selectedProductId);

  // External
  const [extTitle, setExtTitle] = useState("");
  const [extUrl, setExtUrl] = useState("");
  const [extImageUrl, setExtImageUrl] = useState("");
  const [extPrice, setExtPrice] = useState("");
  const [extDescription, setExtDescription] = useState("");
  const [extQty, setExtQty] = useState(1);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetExternal = () => {
    setExtTitle("");
    setExtUrl("");
    setExtImageUrl("");
    setExtPrice("");
    setExtDescription("");
    setExtQty(1);
  };

  const submitInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setSaving(true);
    setError(null);
    try {
      const created = await addRegistryItem({
        registryId,
        title: selectedProduct.name,
        imageUrl: selectedProduct.image,
        price: selectedProduct.price,
        quantityWanted: internalQty,
        source: "internal",
        productId: selectedProduct.id,
      });
      onAdded(created);
    } catch {
      setError("Could not add item. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChosen = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error("not_signed_in");

      const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const key = `${uid}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(key, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(key);
      setExtImageUrl(pub.publicUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/bucket.*not.*found|Bucket not found/i.test(msg)) {
        setError(
          "Image storage is not set up yet. Ask your admin to run the storage bucket SQL from REGISTRY_SETUP.md."
        );
      } else if (/not_signed_in/.test(msg)) {
        setError("Please sign in again to upload images.");
      } else {
        setError("Upload failed. Please try again or paste an image URL instead.");
      }
    } finally {
      setUploading(false);
    }
  };

  const submitExternal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const created = await addRegistryItem({
        registryId,
        title: extTitle,
        description: extDescription.trim() || null,
        imageUrl: extImageUrl.trim() || null,
        price: extPrice.trim() || null,
        quantityWanted: extQty,
        source: "external",
        externalUrl: extUrl,
      });
      onAdded(created);
      resetExternal();
    } catch {
      setError("Could not add item. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-heading">Add an item</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="internal" className="flex flex-col min-h-0 flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="internal" className="font-body">
              From our catalogue
            </TabsTrigger>
            <TabsTrigger value="external" className="font-body">
              From another retailer
            </TabsTrigger>
          </TabsList>

          {/* ------------- CATALOGUE PICKER (visual grid) ------------- */}
          <TabsContent value="internal" className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <form onSubmit={submitInternal} className="space-y-4">
              <div>
                <Label className="font-body">Pick a product</Label>
                <p className="text-xs text-muted-foreground font-body mb-3">
                  Tap to select. You can see the photo of what you are ordering before adding it.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-1">
                  {catalogueOptions.map((opt) => {
                    const active = opt.id === selectedProductId;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSelectedProductId(opt.id)}
                        aria-pressed={active}
                        className={cn(
                          "group relative flex flex-col rounded-xl border bg-card p-2 text-left transition-all",
                          active
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                          <img
                            src={opt.image}
                            alt={opt.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          {active && (
                            <div className="absolute right-1.5 top-1.5 rounded-full bg-primary p-1 text-primary-foreground">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>
                        <p className="mt-2 font-body text-xs font-medium text-foreground line-clamp-2">
                          {opt.name}
                        </p>
                        <p className="mt-0.5 font-body text-[11px] text-muted-foreground">
                          {opt.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="int-qty" className="font-body">
                  Quantity wanted
                </Label>
                <Input
                  id="int-qty"
                  type="number"
                  min={1}
                  value={internalQty}
                  onChange={(e) => setInternalQty(Math.max(1, Number(e.target.value)))}
                  className="max-w-[8rem]"
                />
              </div>

              {error && <p className="text-sm text-destructive font-body">{error}</p>}

              <div className="flex items-center justify-between border-t border-border pt-4">
                <p className="font-body text-sm text-muted-foreground truncate">
                  {selectedProduct ? `Adding: ${selectedProduct.name}` : "Pick a product to continue"}
                </p>
                <Button type="submit" disabled={saving || !selectedProduct} className="font-body">
                  {saving ? "Adding..." : "Add item"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* ------------- EXTERNAL (with upload) ------------- */}
          <TabsContent value="external" className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <form onSubmit={submitExternal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ext-title" className="font-body">
                  Product title
                </Label>
                <Input
                  id="ext-title"
                  value={extTitle}
                  onChange={(e) => setExtTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ext-url" className="font-body">
                  Product URL
                </Label>
                <Input
                  id="ext-url"
                  type="url"
                  value={extUrl}
                  onChange={(e) => setExtUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-body">Product photo (optional)</Label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <img
                      src={itemImage(extImageUrl)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFileChosen(f);
                          e.target.value = "";
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="font-body gap-2"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Choose photo
                          </>
                        )}
                      </Button>
                      {extImageUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setExtImageUrl("")}
                          className="font-body"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                      <ImagePlus className="h-3.5 w-3.5" />
                      Or paste an image URL below
                    </div>
                    <Input
                      type="url"
                      value={extImageUrl}
                      onChange={(e) => setExtImageUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ext-price" className="font-body">
                    Price (optional)
                  </Label>
                  <Input
                    id="ext-price"
                    value={extPrice}
                    onChange={(e) => setExtPrice(e.target.value)}
                    placeholder="₦15,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ext-qty" className="font-body">
                    Quantity wanted
                  </Label>
                  <Input
                    id="ext-qty"
                    type="number"
                    min={1}
                    value={extQty}
                    onChange={(e) => setExtQty(Math.max(1, Number(e.target.value)))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ext-desc" className="font-body">
                  Notes (optional)
                </Label>
                <Textarea
                  id="ext-desc"
                  value={extDescription}
                  onChange={(e) => setExtDescription(e.target.value)}
                  rows={2}
                />
              </div>

              {error && <p className="text-sm text-destructive font-body">{error}</p>}

              <div className="flex justify-end border-t border-border pt-4">
                <Button type="submit" disabled={saving || uploading} className="font-body">
                  {saving ? "Adding..." : "Add item"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
