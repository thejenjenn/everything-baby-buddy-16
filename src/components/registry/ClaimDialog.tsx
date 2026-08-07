import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { claimItem } from "@/lib/registryApi";
import type { CreateClaimResult, RegistryItemWithRemaining } from "@/lib/registryTypes";

interface Props {
  open: boolean;
  item: RegistryItemWithRemaining;
  registrySlug: string;
  onOpenChange: (open: boolean) => void;
  onClaimed: (result: CreateClaimResult) => void;
}

const ClaimDialog = ({ open, item, registrySlug, onOpenChange, onClaimed }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxAllowed = item.quantity_remaining;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await claimItem({
        registrySlug,
        itemId: item.id,
        guestName: name,
        guestEmail: email,
        quantity,
        isAnonymous,
      });
      onClaimed(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (/already_claimed/i.test(message)) {
        setError("Someone else has just claimed this. Please refresh and try another item.");
      } else if (/invalid_email/i.test(message)) {
        setError("Please enter a valid email address.");
      } else {
        setError("Sorry, something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Claim {item.title}</DialogTitle>
          <DialogDescription className="font-body">
            {item.quantity_remaining} of {item.quantity_wanted} still available.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="claim-name" className="font-body">
              Your name
            </Label>
            <Input
              id="claim-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="claim-email" className="font-body">
              Your email
            </Label>
            <Input
              id="claim-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <p className="text-xs text-muted-foreground font-body">
              We use this to send your confirmation and the undo link. It is not shared with anyone else.
            </p>
          </div>

          {maxAllowed > 1 && (
            <div className="space-y-2">
              <Label htmlFor="claim-qty" className="font-body">
                How many
              </Label>
              <Input
                id="claim-qty"
                type="number"
                min={1}
                max={maxAllowed}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(maxAllowed, Number(e.target.value))))}
              />
            </div>
          )}

          <div className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3">
            <Checkbox
              id="claim-anonymous"
              checked={isAnonymous}
              onCheckedChange={(v) => setIsAnonymous(v === true)}
              className="mt-0.5"
            />
            <div>
              <Label htmlFor="claim-anonymous" className="font-body text-sm font-medium cursor-pointer">
                Keep my name hidden from the parent
              </Label>
              <p className="text-xs text-muted-foreground font-body mt-1">
                By default your name is shown to the parent so they can send a thank you. Tick to appear as Anonymous.
              </p>
            </div>
          </div>

          {error && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-body text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="font-body"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="font-body font-medium">
              {submitting ? "Claiming..." : "Confirm claim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimDialog;
