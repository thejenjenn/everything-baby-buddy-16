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
  MessageCircle,
  Heart
} from "lucide-react";
import babyEssentials from "@/assets/baby-essentials.jpg";
import babyFood from "@/assets/baby-food.jpg";
import backToSchool from "@/assets/back-to-school.jpg";
import partyPack from "@/assets/gift-packs.jpg";
import babyRegistry from "@/assets/baby-registry.jpg";
import hospitalList from "@/assets/hospital-list.jpg";

import Reveal from "@/components/Reveal";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Newborn Package",
      subtitle: "0-3 years",
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
      image: backToSchool,
      features: ["Seasonal availability", "Educational essentials", "Age-appropriate items", "September delivery"],
      badge: "Seasonal",
      cta: "Coming September"
    },
    {
      icon: PartyPopper,
      title: "Party Pack Packages",
      subtitle: "Celebrations made easy",
      description: "Make your baby's special moments unforgettable with our curated party packages for birthdays and milestones.",
      image: partyPack,
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
      image: babyRegistry,
      features: ["Easy sharing", "Direct delivery", "Gift tracking", "Thank you notes"],
      cta: "Create Registry"
    },
    {
      icon: ClipboardList,
      title: "Hospital List",
      subtitle: "Delivery preparation",
      description: "Complete hospital bag checklist and essentials package for your delivery day and hospital stay.",
      image: hospitalList,
      features: ["Complete checklist", "Essential items", "Mom & baby needs", "Peace of mind"],
      cta: "Get List"
    }
  ];

  return (
    <section id="services" className="py-20" style={{backgroundColor: "#FFFDF9"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            Our Services
          </Reveal>
          <Reveal as="p" delay={120} className="text-xl max-w-3xl mx-auto font-body leading-relaxed" style={{color: "#171717"}}>
            Supporting mums and their little ones from bump to baby's first birthday with comprehensive packages and personalized care.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 100}>
                <Card className="border border-gray-200 hover:shadow-elegant transition-all duration-500 group bg-white rounded-2xl overflow-hidden flex flex-col h-full">
                {service.image && (
                  <div className="relative h-64 overflow-hidden rounded-t-2xl flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Overlay content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        {service.badge && (
                          <Badge variant="secondary" className="font-body rounded-full px-3 bg-white/20 text-white border-white/30">
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-2xl font-heading font-bold">{service.title}</h3>
                        <div className="flex items-center space-x-2 text-white/90">
                          <Icon className="h-5 w-5" />
                          <span className="font-body">{service.subtitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow space-y-6">
                    <p className="font-body leading-relaxed text-gray-600">{service.description}</p>
                    
                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs font-body px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center items-center pt-6 mt-6 border-t border-gray-100">
                    <Button variant="default" className="font-body font-medium w-full">
                      {service.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="div" delay={100} className="mt-20 relative rounded-3xl p-10 text-center shadow-elegant border overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"  style={{borderColor: "#E5E7EB"}}>
          {/* Playful decorative elements */}
          <div className="absolute top-4 left-8 w-8 h-8 opacity-20" style={{color: "#EC4899"}}>🎈</div>
          <div className="absolute top-8 right-12 w-6 h-6 opacity-20" style={{color: "#EC4899"}}>⭐</div>
          <div className="absolute bottom-6 left-12 w-6 h-6 opacity-20" style={{color: "#EC4899"}}>🧸</div>
          <div className="absolute bottom-10 right-8 w-8 h-8 opacity-20" style={{color: "#EC4899"}}>❤️</div>
          <div className="absolute top-1/2 left-4 w-4 h-4 opacity-15" style={{color: "#EC4899"}}>🌟</div>
          <div className="absolute top-1/3 right-6 w-5 h-5 opacity-15" style={{color: "#EC4899"}}>💕</div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight">
              Need Personalized Consultation?
            </h3>
            <p className="mb-8 max-w-2xl mx-auto font-body text-lg leading-relaxed text-purple-100">
              Every baby is unique, and so are their needs. Contact us for personalized consultation 
              and custom packages tailored specifically for your little one.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="default" size="lg" className="gap-3 font-body font-medium shadow-warm" asChild>
                <a href="tel:+2347060867150">
                  <Phone className="h-5 w-5" />
                  Call for Consultation
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-3 bg-white/90 backdrop-blur-sm font-body font-medium border-blue-500 text-blue-600 hover:bg-blue-50" asChild>
                <a href="https://wa.me/2347060867150" className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Chat with Us
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;