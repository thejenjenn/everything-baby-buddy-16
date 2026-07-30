import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { shopSections } from "@/data/shopProducts";

const ShopCategory = () => {
  return (
    <section id="shop-category" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Reveal
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5"
          >
            Shop Category
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-muted-foreground"
          >
            Bundles packed for every stage — browse a category to see what's
            inside each box.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shopSections.map((section) => {
            const preview = section.products[0];
            return (
              <Link key={section.id} to={`/shop#${section.id}`} className="group">
                <Card className="h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:shadow-elegant">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={preview.image}
                      alt={section.title}
                      loading="lazy"
                      width={768}
                      height={576}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-2 font-body text-sm text-muted-foreground">
                      {section.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-medium text-primary">
                      Browse {section.products.length} bundles
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="font-body font-medium gap-2">
            <Link to="/shop">
              Shop by Stage
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
