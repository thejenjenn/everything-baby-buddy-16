import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RegistryItemCard from "@/components/registry/RegistryItemCard";
import ClaimDialog from "@/components/registry/ClaimDialog";
import { fetchPublicRegistry } from "@/lib/registryApi";
import type {
  CreateClaimResult,
  PublicRegistry,
  RegistryItemWithRemaining,
} from "@/lib/registryTypes";

const RegistryPublicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [firstLoad, setFirstLoad] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [registry, setRegistry] = useState<PublicRegistry | null>(null);
  const [items, setItems] = useState<RegistryItemWithRemaining[]>([]);
  const [claimTarget, setClaimTarget] = useState<RegistryItemWithRemaining | null>(null);
  const [confirmation, setConfirmation] = useState<CreateClaimResult | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    try {
      const result = await fetchPublicRegistry(slug);
      if (!result) {
        setNotFound(true);
        setRegistry(null);
        setItems([]);
      } else {
        setRegistry(result.registry);
        setItems(result.items);
      }
    } catch {
      setNotFound(true);
    } finally {
      setFirstLoad(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    document.title = registry
      ? `${registry.owner_name}'s registry | Everything Baby`
      : "Registry | Everything Baby";
  }, [registry]);

  const totalWanted = items.reduce((sum, i) => sum + i.quantity_wanted, 0);
  const totalClaimed = items.reduce((sum, i) => sum + i.quantity_claimed, 0);
  const progress = totalWanted === 0 ? 0 : Math.round((totalClaimed / totalWanted) * 100);

  // After a successful claim, patch the item in place. No full page reload,
  // no visual jerk. The DB is the source of truth, but incrementing the
  // local count optimistically keeps the UI responsive.
  const applyClaim = (itemId: string, quantity: number) => {
    setItems((rows) =>
      rows.map((r) =>
        r.id === itemId
          ? {
              ...r,
              quantity_claimed: r.quantity_claimed + quantity,
              quantity_remaining: Math.max(r.quantity_remaining - quantity, 0),
            }
          : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {firstLoad ? (
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-6 w-32 rounded bg-muted animate-pulse" />
              <div className="mx-auto mt-4 h-10 w-64 rounded bg-muted animate-pulse" />
              <div className="mx-auto mt-4 h-4 w-48 rounded bg-muted animate-pulse" />
            </div>
          ) : notFound ? (
            <>
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Registry not found
              </h1>
              <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
                Check the link you were sent. Registry links are private and cannot be guessed.
              </p>
            </>
          ) : registry ? (
            <>
              <Reveal
                as="p"
                className="font-body text-sm uppercase tracking-wider text-primary"
              >
                Baby registry
              </Reveal>
              <Reveal
                as="h1"
                delay={80}
                className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl"
              >
                {registry.owner_name}
              </Reveal>
              {registry.due_date && (
                <Reveal
                  as="p"
                  delay={140}
                  className="mt-3 font-body text-base text-muted-foreground"
                >
                  Baby due {new Date(registry.due_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Reveal>
              )}
              {registry.optional_message && (
                <Reveal
                  as="p"
                  delay={200}
                  className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground"
                >
                  {registry.optional_message}
                </Reveal>
              )}

              {totalWanted > 0 && (
                <div className="mx-auto mt-8 max-w-md">
                  <div className="flex items-center justify-between font-body text-sm text-muted-foreground">
                    <span>
                      {totalClaimed} of {totalWanted} items fulfilled
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="mt-2 h-2 transition-all" />
                </div>
              )}
            </>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {firstLoad ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-muted h-96 animate-pulse" />
            ))}
          </div>
        ) : !notFound && items.length === 0 ? (
          <Card className="mx-auto max-w-xl rounded-2xl border-dashed">
            <CardContent className="p-10 text-center">
              <p className="font-body text-muted-foreground">
                {registry?.owner_name} has not added any items yet. Check back soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          items.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <RegistryItemCard
                  key={item.id}
                  item={item}
                  onClaimClick={() => setClaimTarget(item)}
                />
              ))}
            </div>
          )
        )}
      </main>

      <Footer />

      {claimTarget && registry && (
        <ClaimDialog
          open={!!claimTarget}
          item={claimTarget}
          registrySlug={registry.slug}
          onOpenChange={(open) => {
            if (!open) setClaimTarget(null);
          }}
          onClaimed={(result, quantity) => {
            applyClaim(claimTarget.id, quantity);
            setClaimTarget(null);
            setConfirmation(result);
          }}
        />
      )}

      {confirmation && (
        <ClaimConfirmationDialog
          result={confirmation}
          onClose={() => setConfirmation(null)}
        />
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Confirmation dialog. Prominent address block for external claims — this is
// the guest's one on-screen chance to see it, and the same address is also
// sent to their email.
// -----------------------------------------------------------------------------
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck } from "lucide-react";

const ClaimConfirmationDialog = ({
  result,
  onClose,
}: {
  result: CreateClaimResult;
  onClose: () => void;
}) => {
  const copyAddress = async () => {
    if (result.shipping_address) {
      await navigator.clipboard.writeText(result.shipping_address);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Thank you for claiming {result.item_title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 font-body text-sm">
          <p className="text-muted-foreground">
            We have sent a confirmation email with a link to undo your claim within 24 hours if plans change.
          </p>

          {result.is_external ? (
            <>
              <p className="text-muted-foreground">
                {result.item_title} is stocked by another retailer.
                {result.external_url && (
                  <>
                    {" "}
                    Please order from{" "}
                    <a
                      className="underline text-primary font-medium"
                      href={result.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      the retailer
                    </a>{" "}
                    and post the gift to the address below.
                  </>
                )}
              </p>

              {result.shipping_address ? (
                <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <Truck className="h-3.5 w-3.5" />
                    Ship to
                  </div>
                  <p className="mt-2 whitespace-pre-line text-base font-medium text-foreground">
                    {result.shipping_address}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyAddress}
                    className="mt-3 font-body"
                  >
                    Copy address
                  </Button>
                </div>
              ) : (
                <p className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                  We could not display the shipping address here — please check your email for it.
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">
              This item comes from Everything Baby directly. We will contact you shortly with next steps.
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} className="font-body">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistryPublicPage;
