import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/shop/ProductCard";
import { shopSections } from "@/data/shopProducts";
import { useEffect } from "react";

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
