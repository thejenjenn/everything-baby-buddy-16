import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Baby, 
  GraduationCap, 
  PartyPopper, 
  UtensilsCrossed, 
  Gift, 
  ClipboardList,
  Phone,
  MessageCircle
} from "lucide-react";
import babyEssentials from "@/assets/baby-essentials.jpg";
import babyFood from "@/assets/baby-food.jpg";

const Services = () => {
  const services = [
    {
      icon: Baby,
      title: "Newborn Package",
      subtitle: "0-12 months",
      description: "Complete essentials package for your newborn's first year. Everything you need, carefully curated and delivered to your doorstep.",
      image: babyEssentials,
      features: ["Essential baby items", "Age-appropriate products", "Budget-friendly options", "Quality guaranteed"],
      cta: "View Package"
    },
    {
      icon: GraduationCap,
      title: "Back to School Package",
      subtitle: "Seasonal - September",
      description: "Special seasonal package to help prepare your little ones for their educational journey.",
      features: ["Seasonal availability", "Educational essentials", "Age-appropriate items", "September delivery"],
      badge: "Seasonal",
      cta: "Coming September"
    },
    {
      icon: PartyPopper,
      title: "Party Pack Packages",
      subtitle: "Celebrations made easy",
      description: "Make your baby's special moments unforgettable with our curated party packages for birthdays and milestones.",
      features: ["Birthday themes", "Milestone celebrations", "Decorations included", "Hassle-free planning"],
      cta: "Plan Party"
    },
    {
      icon: UtensilsCrossed,
      title: "Curated Meal Plans",
      subtitle: "6-12 months old",
      description: "Nutritious, age-appropriate meal plans developed with certified nutritionists for healthy growth and development.",
      image: babyFood,
      features: ["Nutritionist-approved", "Age-appropriate portions", "Variety of flavors", "Growth-focused nutrition"],
      cta: "Get Consultation"
    },
    {
      icon: Gift,
      title: "Baby Registry",
      subtitle: "Share with loved ones",
      description: "Create a registry and share with friends and family. Let them order gifts and send them directly to you.",
      features: ["Easy sharing", "Direct delivery", "Gift tracking", "Thank you notes"],
      cta: "Create Registry"
    },
    {
      icon: ClipboardList,
      title: "Hospital List",
      subtitle: "Delivery preparation",
      description: "Complete hospital bag checklist and essentials package for your delivery day and hospital stay.",
      features: ["Complete checklist", "Essential items", "Mom & baby needs", "Peace of mind"],
      cta: "Get List"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Supporting mums and their little ones from bump to baby's first birthday with comprehensive packages and personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-warm transition-all duration-300 group">
              {service.image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <service.icon className="h-8 w-8 text-primary" />
                  {service.badge && (
                    <Badge variant="secondary" className="bg-baby-pink text-foreground">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  <p className="text-sm text-primary font-medium">{service.subtitle}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="soft" className="w-full">
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-baby-pink to-baby-blue rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need Personalized Consultation?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every baby is unique, and so are their needs. Contact us for personalized consultation 
            and custom packages tailored specifically for your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="gap-2" asChild>
              <a href="tel:+2347060867150">
                <Phone className="h-4 w-4" />
                Call for Consultation
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-background/80" asChild>
              <a href="https://wa.me/2347060867150">
                <MessageCircle className="h-4 w-4" />
                Chat with Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;