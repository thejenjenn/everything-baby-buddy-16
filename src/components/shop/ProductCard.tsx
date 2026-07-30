import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, MessageCircle } from "lucide-react";
import { ShopProduct, whatsappLink } from "@/data/shopProducts";

const ProductCard = ({ product }: { product: ShopProduct }) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-elegant">
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute left-4 top-4 rounded-full px-3 font-body">
            {product.badge}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-grow flex-col p-6">
        <h3 className="font-heading text-xl font-bold text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          {product.forWho}
        </p>
        <p className="mt-4 font-heading text-2xl font-bold text-primary">
          {product.price}
        </p>

        <Accordion type="single" collapsible className="mt-3">
          <AccordionItem value="contents" className="border-b-0">
            <AccordionTrigger className="py-3 font-body text-sm font-medium">
              What's inside
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {product.contents.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-auto pt-4">
          <Button asChild className="w-full gap-2 font-body font-medium">
            <a
              href={whatsappLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              {product.ctaLabel ?? "Order"}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
