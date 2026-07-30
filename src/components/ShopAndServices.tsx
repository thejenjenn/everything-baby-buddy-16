import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [isRegistryDialogOpen, setIsRegistryDialogOpen] = useState(false);
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
      action: () => setIsRegistryDialogOpen(true),
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
    if (isRegistryDialogOpen || isNewbornDialogOpen) {
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
  }, [isRegistryDialogOpen, isNewbornDialogOpen]);

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
                  Shop by Stage
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

        {/* Registry Form Dialog */}
        <Dialog open={isRegistryDialogOpen} onOpenChange={setIsRegistryDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-heading font-bold text-charcoal-text">
                Create Your Baby Registry
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 pt-0 overflow-y-auto max-h-[70vh]">
              <iframe
                data-tally-src="https://tally.so/embed/n09ER9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Create Your Baby Registry"
                className="w-full min-h-[600px]"
                style={{ overflow: "auto" }}
              />
            </div>
          </DialogContent>
        </Dialog>

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
