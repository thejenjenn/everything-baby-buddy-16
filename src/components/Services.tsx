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
import backToSchool from "@/assets/back-to-school.jpg";
import partyPack from "@/assets/party-pack-kids.jpg";
import babyRegistry from "@/assets/baby-registry.jpg";
import hospitalList from "@/assets/hospital-list.jpg";

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
    <section id="services" className="py-20" style={{backgroundColor: "#F8F4F2"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-body leading-relaxed" style={{color: "#171717"}}>
            Supporting mums and their little ones from bump to baby's first birthday with comprehensive packages and personalized care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border border-gray-200 hover:shadow-elegant hover-lift hover-glow transition-all duration-500 group bg-white rounded-2xl overflow-hidden animate-fade-in-up flex flex-col h-full" style={{animationDelay: `${index * 0.1}s`}}>
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
                          <Icon className="h-5 w-5 animate-bounce-gentle" />
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

                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                    <div className="text-left">
                      <span className="text-2xl font-bold text-gray-900">From ₦5k</span>
                      <span className="text-sm text-gray-500 block">/ package</span>
                    </div>
                    <Button variant="default" className="font-body font-medium hover-lift transition-transform duration-300">
                      {service.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 relative rounded-3xl p-10 text-center shadow-elegant animate-fade-in-up hover-glow border overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"  style={{borderColor: "#E5E7EB"}}>
          {/* Playful decorative elements with animations */}
          <div className="absolute top-4 left-8 w-8 h-8 opacity-20 animate-bounce-gentle" style={{color: "#EC4899", animationDelay: "0.5s"}}>🎈</div>
          <div className="absolute top-8 right-12 w-6 h-6 opacity-20 animate-wiggle" style={{color: "#EC4899", animationDelay: "1s"}}>⭐</div>
          <div className="absolute bottom-6 left-12 w-6 h-6 opacity-20 animate-pulse-scale" style={{color: "#EC4899", animationDelay: "1.5s"}}>🧸</div>
          <div className="absolute bottom-10 right-8 w-8 h-8 opacity-20 animate-bounce-gentle" style={{color: "#EC4899", animationDelay: "2s"}}>❤️</div>
          <div className="absolute top-1/2 left-4 w-4 h-4 opacity-15 animate-float" style={{color: "#EC4899", animationDelay: "0.3s"}}>🌟</div>
          <div className="absolute top-1/3 right-6 w-5 h-5 opacity-15 animate-wiggle" style={{color: "#EC4899", animationDelay: "1.2s"}}>💕</div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 tracking-tight animate-fade-in-up">
              Need Personalized Consultation?
            </h3>
            <p className="mb-8 max-w-2xl mx-auto font-body text-lg leading-relaxed text-purple-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              Every baby is unique, and so are their needs. Contact us for personalized consultation 
              and custom packages tailored specifically for your little one.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: "0.4s"}}>
              <Button variant="default" size="lg" className="gap-3 font-body font-medium shadow-warm hover-lift hover-glow transition-all duration-300" asChild>
                <a href="tel:+2347060867150">
                  <Phone className="h-5 w-5 animate-wiggle" />
                  Call for Consultation
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-3 bg-white/90 backdrop-blur-sm font-body font-medium border-blue-500 text-blue-600 hover:bg-blue-50 hover-lift transition-all duration-300" asChild>
                <a href="https://wa.me/2347060867150" className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 animate-bounce-gentle" />
                  Chat with Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;