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
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl text-muted-taupe max-w-3xl mx-auto font-body leading-relaxed">
            Supporting mums and their little ones from bump to baby's first birthday with comprehensive packages and personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-blush-pink/30 hover:shadow-elegant transition-all duration-500 group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              {service.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-coral/20 to-transparent"></div>
                </div>
              )}
              
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gradient-to-br from-powder-blue/20 to-soft-lilac/20 rounded-xl">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  {service.badge && (
                    <Badge variant="secondary" className="bg-blush-pink text-charcoal-text font-body rounded-full px-3">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl text-charcoal-text font-heading font-semibold">{service.title}</CardTitle>
                  <p className="text-sm text-primary font-body font-medium mt-1">{service.subtitle}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6 pt-0">
                <p className="text-muted-taupe font-body leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-taupe font-body flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-warm-coral to-dusty-rose rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="default" className="w-full font-body font-medium">
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blush-pink via-powder-blue to-soft-lilac rounded-3xl p-10 text-center shadow-elegant animate-fade-in-up">
          <h3 className="text-3xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            Need Personalized Consultation?
          </h3>
          <p className="text-muted-taupe mb-8 max-w-2xl mx-auto font-body text-lg leading-relaxed">
            Every baby is unique, and so are their needs. Contact us for personalized consultation 
            and custom packages tailored specifically for your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="default" size="lg" className="gap-3 font-body font-medium" asChild>
              <a href="tel:+2347060867150">
                <Phone className="h-5 w-5" />
                Call for Consultation
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-3 bg-white/80 backdrop-blur-sm font-body font-medium" asChild>
              <a href="https://wa.me/2347060867150">
                <MessageCircle className="h-5 w-5" />
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