import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from "lucide-react";
import { itemImage } from "@/lib/registryPlaceholder";
import type { RegistryItemWithRemaining } from "@/lib/registryTypes";

interface Props {
  item: RegistryItemWithRemaining;
  onClaimClick: () => void;
}

const RegistryItemCard = ({ item, onClaimClick }: Props) => {
  const soldOut = item.quantity_remaining <= 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-elegant">
      <div className="relative h-56 flex-shrink-0 overflow-hidden bg-muted">
        <img
          src={itemImage(item.image_url)}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full bg-white/90 px-3 font-body text-foreground border-0">
            {item.source === "external" ? "External retailer" : "Everything Baby"}
          </Badge>
        </div>
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-1.5 font-body text-sm font-medium text-foreground">
              Fully claimed
            </span>
          </div>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-6">
        <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
        {item.price && (
          <p className="mt-1 font-heading text-lg font-semibold text-primary">{item.price}</p>
        )}
        {item.description && (
          <p className="mt-3 font-body text-sm text-muted-foreground">{item.description}</p>
        )}

        <p className="mt-4 flex items-center gap-2 font-body text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-primary" />
          {item.quantity_claimed} of {item.quantity_wanted} claimed
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          {item.source === "external" && item.external_url && (
            <Button
              asChild
              variant="outline"
              className="w-full gap-2 font-body"
            >
              <a href={item.external_url} target="_blank" rel="noopener noreferrer">
                View on retailer
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            className="w-full font-body font-medium"
            onClick={onClaimClick}
            disabled={soldOut}
          >
            {soldOut ? "Fully claimed" : "Claim this gift"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistryItemCard;
