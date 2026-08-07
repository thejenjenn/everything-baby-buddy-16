import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";
import { shopSections } from "@/data/shopProducts";

const ShopByStage = () => {
  useEffect(() => {
    document.title = "Shop | The Everything Baby";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Shop curated bundles by stage: pregnancy and postpartum care for mum, hospital bags, newborn boxes, merch and a free newborn checklist."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <header className="border-b border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal
            as="h1"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Shop
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground"
          >
            Thoughtfully packed bundles for every step — from bump care and
            delivery day to your baby's first foods.
          </Reveal>

          <nav className="mt-8 flex flex-wrap justify-center gap-3">
            {shopSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-border bg-card px-4 py-2 font-body text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* Registry teaser — sits above the first product section so parents
            see the "add these to a registry" option before they start
            browsing. Compact by design; the full CTA lives on the home page. */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal
              as="div"
              className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-[#fdf3ec] via-[#fde4d3] to-[#f5c8a5] p-6 shadow-sm md:p-8"
              style={{ borderColor: "#f0d4bb" }}
            >
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-primary shadow-sm sm:flex">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-wider text-primary">
                      Save it for later
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-bold text-charcoal-text md:text-2xl">
                      Turn your favourites into a baby registry
                    </h3>
                    <p className="mt-1 max-w-xl font-body text-sm text-[#5c4436] md:text-base">
                      Build a shareable list your family and friends can gift from — takes under a minute.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="font-body font-medium gap-2 shadow-warm transition-transform active:scale-95 flex-shrink-0"
                >
                  <Link to="/registry/login">
                    Create a baby registry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {shopSections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-20 py-16 ${i % 2 === 1 ? "bg-secondary/30" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal
                as="h2"
                className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-4xl"
              >
                {section.title}
              </Reveal>
              <Reveal
                as="p"
                delay={100}
                className="mt-3 max-w-2xl font-body text-muted-foreground"
              >
                {section.description}
              </Reveal>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default ShopByStage;
