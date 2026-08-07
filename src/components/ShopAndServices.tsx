import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  UtensilsCrossed,
  Gift,
  ClipboardList,
  Phone,
  MessageCircle,
  Heart,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ListPlus,
  Share2,
  Package,
} from "lucide-react";
import babyEssentials from "@/assets/baby-essentials.jpg";
import babyFood from "@/assets/baby-food.jpg";
import babyRegistry from "@/assets/baby-registry.jpg";
import hospitalList from "@/assets/hospital-list.jpg";
import Reveal from "@/components/Reveal";
import { shopSections } from "@/data/shopProducts";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  cta: string;
  badge?: string;
  action?: () => void;
}

const ShopAndServices = () => {
  const navigate = useNavigate();
  const [isNewbornDialogOpen, setIsNewbornDialogOpen] = useState(false);

  const services: Service[] = [
    {
      icon: Heart,
      title: "Newborn Package",
      subtitle: "0-3 years",
      description:
        "Complete essentials package for your newborn's first year. Everything you need, carefully curated and delivered to your doorstep.",
      image: babyEssentials,
      features: [
        "Essential baby items",
        "Age-appropriate products",
        "Budget-friendly options",
        "Quality guaranteed",
      ],
      cta: "View Package",
      action: () => setIsNewbornDialogOpen(true),
    },
    {
      icon: UtensilsCrossed,
      title: "Curated Meal Plans",
      subtitle: "6-12 months old",
      description:
        "Nutritious, age-appropriate meal plans developed with certified nutritionists for healthy growth and development.",
      image: babyFood,
      features: [
        "Nutritionist-approved",
        "Age-appropriate portions",
        "Variety of flavors",
        "Growth-focused nutrition",
      ],
      cta: "Get Consultation",
      action: () => window.open("https://wa.me/2349036791181", "_blank"),
    },
    {
      icon: Gift,
      title: "Baby Registry",
      subtitle: "Share with loved ones",
      description:
        "Create a registry and share with friends and family. Let them order gifts and send them directly to you.",
      image: babyRegistry,
      features: ["Easy sharing", "Direct delivery", "Gift tracking", "Thank you notes"],
      cta: "Create Registry",
      action: () => navigate("/registry/login"),
    },
    {
      icon: ClipboardList,
      title: "Hospital List",
      subtitle: "Delivery preparation",
      description:
        "Complete hospital bag checklist and essentials package for your delivery day and hospital stay.",
      image: hospitalList,
      features: ["Complete checklist", "Essential items", "Mom & baby needs", "Peace of mind"],
      cta: "Get List",
    },
  ];

  useEffect(() => {
    if (isNewbornDialogOpen) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => {
        if (typeof (window as any).Tally !== "undefined") {
          (window as any).Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isNewbornDialogOpen]);

  return (
    <section
      id="shop-services"
      className="py-20"
      style={{ backgroundColor: "#FFFDF9" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-body font-medium uppercase tracking-wider text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Shop &amp; Services
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-5 text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text tracking-tight"
          >
            Everything you need, in one place
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mt-5 text-lg md:text-xl max-w-3xl mx-auto font-body leading-relaxed"
            style={{ color: "#171717" }}
          >
            Browse ready-to-order bundles or book a curated service — from bump
            care to baby's first birthday, we've got you covered.
          </Reveal>
        </div>

        {/* Tab switcher */}
        <Tabs defaultValue="shop" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="h-12 rounded-full bg-muted p-1.5 shadow-sm">
              <TabsTrigger
                value="shop"
                className="rounded-full px-6 py-2 font-body text-sm font-medium data-[state=active]:shadow-sm gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop by Category
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="rounded-full px-6 py-2 font-body text-sm font-medium data-[state=active]:shadow-sm gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Curated Services
              </TabsTrigger>
            </TabsList>
          </div>

          {/* SHOP TAB */}
          <TabsContent value="shop" className="mt-0 focus-visible:ring-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {shopSections.map((section) => {
                const preview = section.products[0];
                return (
                  <Link
                    key={section.id}
                    to={`/shop#${section.id}`}
                    className="group"
                  >
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
                        <div className="absolute top-3 left-3">
                          <Badge className="rounded-full bg-white/90 text-foreground border-0 font-body text-[11px] tracking-wide">
                            Shop
                          </Badge>
                        </div>
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
                  Shop
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="mt-0 focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="border border-gray-200 hover:shadow-elegant transition-all duration-500 group bg-white rounded-2xl overflow-hidden flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-2xl flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge className="rounded-full bg-white/90 text-foreground border-0 font-body text-[11px] tracking-wide">
                          Service
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-heading font-bold leading-tight">
                          {service.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-white/90">
                          <Icon className="h-3.5 w-3.5" />
                          <span className="font-body text-xs">{service.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <p className="font-body text-sm leading-relaxed text-gray-600 flex-grow">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-body px-2.5 py-1 bg-gray-100 rounded-full text-gray-600"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="pt-5 mt-5 border-t border-gray-100">
                        <Button
                          variant="default"
                          className="font-body font-medium w-full"
                          onClick={service.action}
                        >
                          {service.cta}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Registry CTA — a dedicated banner between shopping and consultation.
            Nigerian parents may not know what a registry is, so we teach the
            three steps and then invite the tap. Warm palette so it feels like
            an extension of the section, not an ad. */}
        <Reveal
          as="div"
          delay={80}
          className="mt-16 relative overflow-hidden rounded-3xl border shadow-elegant bg-gradient-to-br from-[#fdf3ec] via-[#fde4d3] to-[#f5c8a5]"
          style={{ borderColor: "#f0d4bb" }}
        >
          {/* Soft decorative shapes for warmth without noise */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* LEFT: pitch + CTA */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 font-body text-xs font-medium uppercase tracking-wider text-primary backdrop-blur-sm">
                <Gift className="h-3.5 w-3.5" />
                For parents-to-be
              </span>
              <h3 className="mt-5 font-heading text-3xl md:text-4xl font-bold tracking-tight text-charcoal-text">
                Create your baby registry
              </h3>
              <p className="mt-4 max-w-xl font-body text-base md:text-lg leading-relaxed text-[#5c4436]">
                Skip the guessing. Build a list of exactly what you need, share
                one link with family and friends, and let the gifts come to you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="font-body font-medium gap-2 shadow-warm transition-transform active:scale-95"
                  onClick={() => navigate("/registry/login")}
                >
                  Create your registry
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="font-body font-medium text-[#5c4436] hover:bg-white/60"
                  onClick={() => navigate("/registry/login")}
                >
                  I already have one
                </Button>
              </div>
              <p className="mt-4 font-body text-xs text-[#7a5a3f]">
                Free · No sign-up needed for guests · Ready in under a minute
              </p>
            </div>

            {/* RIGHT: three-step how-it-works.
                Not just decoration — teaches what a registry is at a glance. */}
            <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: ListPlus,
                  title: "Build your list",
                  body: "Pick from our catalogue or paste any product link.",
                },
                {
                  icon: Share2,
                  title: "Share the link",
                  body: "One private link for your baby shower or WhatsApp group.",
                },
                {
                  icon: Package,
                  title: "Receive the gifts",
                  body: "Guests claim, we send you thank-you names for later.",
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <li
                    key={idx}
                    className="group flex items-start gap-3 rounded-2xl bg-white/70 p-4 backdrop-blur-sm transition-all hover:bg-white/90"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-bold text-charcoal-text">
                        <span className="text-primary">{idx + 1}.</span> {step.title}
                      </p>
                      <p className="mt-0.5 font-body text-xs leading-relaxed text-[#5c4436]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* Shared consultation CTA — anchors both tabs */}
        <Reveal
          as="div"
          delay={100}
          className="mt-16 relative rounded-3xl p-10 text-center shadow-elegant border overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
          style={{ borderColor: "#E5E7EB" }}
        >
          <div className="absolute top-4 left-8 w-8 h-8 opacity-20">🎈</div>
          <div className="absolute top-8 right-12 w-6 h-6 opacity-20">⭐</div>
          <div className="absolute bottom-6 left-12 w-6 h-6 opacity-20">🧸</div>
          <div className="absolute bottom-10 right-8 w-8 h-8 opacity-20">❤️</div>
          <div className="absolute top-1/2 left-4 w-4 h-4 opacity-15">🌟</div>
          <div className="absolute top-1/3 right-6 w-5 h-5 opacity-15">💕</div>

          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight">
              Not sure what you need?
            </h3>
            <p className="mb-8 max-w-2xl mx-auto font-body text-lg leading-relaxed text-purple-100">
              Every baby is unique. Talk to us and we'll help you pick the right
              bundle or build a custom package tailored to your little one.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="default"
                size="lg"
                className="gap-3 font-body font-medium shadow-warm"
                asChild
              >
                <a href="tel:+2347060867150">
                  <Phone className="h-5 w-5" />
                  Call for Consultation
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-3 bg-white/90 backdrop-blur-sm font-body font-medium border-blue-500 text-blue-600 hover:bg-blue-50"
                asChild
              >
                <a
                  href="https://wa.me/2349036791181"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Chat with Us
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Newborn Package Dialog */}
        <Dialog open={isNewbornDialogOpen} onOpenChange={setIsNewbornDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-heading font-bold text-charcoal-text">
                New Born Package 🍼🌸
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 pt-0 overflow-y-auto max-h-[70vh]">
              <iframe
                data-tally-src="https://tally.so/embed/wz9K5k?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="New Born Package 🍼🌸"
                className="w-full min-h-[600px]"
                style={{ overflow: "auto" }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ShopAndServices;
