import { useState } from "react";
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
import { shopSections } from "@/data/shopProducts";

interface Props {
  registryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const catalogueOptions = shopSections.flatMap((section) =>
  section.products.map((p) => ({
    id: p.id,
    label: `${section.title}: ${p.name}`,
    price: p.price,
    image: p.image,
  }))
);

const AddItemDialog = ({ registryId, open, onOpenChange, onAdded }: Props) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Internal (catalogue)
  const [selectedProductId, setSelectedProductId] = useState<string>(catalogueOptions[0]?.id ?? "");
  const [internalQty, setInternalQty] = useState(1);

  // External
  const [extTitle, setExtTitle] = useState("");
  const [extUrl, setExtUrl] = useState("");
  const [extImageUrl, setExtImageUrl] = useState("");
  const [extPrice, setExtPrice] = useState("");
  const [extDescription, setExtDescription] = useState("");
  const [extQty, setExtQty] = useState(1);

  const submitInternal = async (e: React.FormEvent) => {
    e.preventDefault();
    const opt = catalogueOptions.find((o) => o.id === selectedProductId);
    if (!opt) return;
    setSaving(true);
    setError(null);
    try {
      await addRegistryItem({
        registryId,
        title: opt.label.split(": ")[1] ?? opt.label,
        imageUrl: opt.image,
        price: opt.price,
        quantityWanted: internalQty,
        source: "internal",
        productId: opt.id,
      });
      onAdded();
    } catch {
      setError("Could not add item. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const submitExternal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await addRegistryItem({
        registryId,
        title: extTitle,
        description: extDescription.trim() || null,
        imageUrl: extImageUrl.trim() || null,
        price: extPrice.trim() || null,
        quantityWanted: extQty,
        source: "external",
        externalUrl: extUrl,
      });
      onAdded();
      setExtTitle("");
      setExtUrl("");
      setExtImageUrl("");
      setExtPrice("");
      setExtDescription("");
      setExtQty(1);
    } catch {
      setError("Could not add item. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Add an item</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="internal">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="internal" className="font-body">
              From our catalogue
            </TabsTrigger>
            <TabsTrigger value="external" className="font-body">
              From another retailer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="internal">
            <form onSubmit={submitInternal} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="font-body">Product</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  {catalogueOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
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
                />
              </div>
              {error && (
                <p className="text-sm text-destructive font-body">{error}</p>
              )}
              <div className="flex justify-end">
                <Button type="submit" disabled={saving} className="font-body">
                  {saving ? "Adding..." : "Add item"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="external">
            <form onSubmit={submitExternal} className="space-y-4 pt-4">
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
                <Label htmlFor="ext-img" className="font-body">
                  Image URL (optional)
                </Label>
                <Input
                  id="ext-img"
                  type="url"
                  value={extImageUrl}
                  onChange={(e) => setExtImageUrl(e.target.value)}
                  placeholder="Paste an image URL from the retailer"
                />
                <p className="text-xs text-muted-foreground font-body">
                  If you leave this blank we will show a friendly placeholder.
                </p>
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
              {error && (
                <p className="text-sm text-destructive font-body">{error}</p>
              )}
              <div className="flex justify-end">
                <Button type="submit" disabled={saving} className="font-body">
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
