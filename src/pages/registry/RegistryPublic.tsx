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
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [registry, setRegistry] = useState<PublicRegistry | null>(null);
  const [items, setItems] = useState<RegistryItemWithRemaining[]>([]);
  const [claimTarget, setClaimTarget] = useState<RegistryItemWithRemaining | null>(null);
  const [confirmation, setConfirmation] = useState<CreateClaimResult | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
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
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {loading ? (
            <p className="font-body text-muted-foreground">Loading registry...</p>
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
                  <Progress value={progress} className="mt-2 h-2" />
                </div>
              )}
            </>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {!loading && !notFound && items.length === 0 && (
          <Card className="mx-auto max-w-xl rounded-2xl border-dashed">
            <CardContent className="p-10 text-center">
              <p className="font-body text-muted-foreground">
                {registry?.owner_name} has not added any items yet. Check back soon.
              </p>
            </CardContent>
          </Card>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <RegistryItemCard
                key={item.id}
                item={item}
                onClaimClick={() => setClaimTarget(item)}
              />
            ))}
          </div>
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
          onClaimed={(result) => {
            setConfirmation(result);
            setClaimTarget(null);
            load();
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

/**
 * Minimal confirmation dialog. Wraps the same UI language as the main claim dialog.
 * Kept inline because it's used exactly here and only shows a summary.
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const ClaimConfirmationDialog = ({
  result,
  onClose,
}: {
  result: CreateClaimResult;
  onClose: () => void;
}) => {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Thank you for claiming {result.item_title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 font-body text-sm text-muted-foreground">
          <p>
            We have sent a confirmation email with a link to undo your claim
            within the next 24 hours if plans change.
          </p>
          {result.is_external ? (
            <>
              <p>
                This item is stocked by another retailer. Please order from{" "}
                {result.external_url ? (
                  <a
                    className="underline text-primary"
                    href={result.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    the retailer
                  </a>
                ) : (
                  "the retailer"
                )}{" "}
                and post it to the shipping address in your email.
              </p>
              {result.shipping_address && (
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Ship to
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm text-foreground">
                    {result.shipping_address}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p>
              This item comes from Everything Baby directly. We will contact you
              shortly with next steps.
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
