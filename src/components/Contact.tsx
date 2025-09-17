import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Heart, CheckCircle, Baby, Store, HelpCircle, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import Reveal from "@/components/Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Request sent with Love",
          description: "Someone will reach out to you as soon as possible",
        });
        
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: ""
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="pt-8 pb-20 bg-gradient-to-b from-warm-cream to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Star className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
          <Reveal as="h3" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently asked questions
          </Reveal>
          <Reveal as="p" delay={120} className="text-lg max-w-2xl mx-auto" style={{color: '#171717'}}>
            These are the most commonly asked questions about everything baby products and services
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {/* FAQ Section */}
          <Reveal as="div" className="space-y-8">
            <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-xl px-6 py-2 bg-card">
                <AccordionTrigger className="text-left hover:no-underline text-foreground font-medium text-lg md:text-xl py-6 [&>svg]:text-foreground">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Baby className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span>Do you sell thrift/used baby products?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 pl-14 text-base md:text-lg" style={{color: '#171717'}}>
                  No, we don't sell thrift or used items. We focus on brand-new baby essentials. 💙 However, we understand that every mum has different needs, so we can gladly link you to trusted businesses that specialize in quality thrift baby products.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-xl px-6 py-2 bg-card">
                <AccordionTrigger className="text-left hover:no-underline text-foreground font-medium text-lg md:text-xl py-6 [&>svg]:text-foreground">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Store className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span>Do you have a shop or physical location?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 pl-14 text-base md:text-lg" style={{color: '#171717'}}>
                  No, we don't have a physical store. ✨ Everything Baby is a service-based company created to make your motherhood journey simple and full of care. From the comfort of your home, you can access our services, shop recommendations, and baby essentials without stress. We bring the love and care directly to you. 💕
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-xl px-6 py-2 bg-card">
                <AccordionTrigger className="text-left hover:no-underline text-foreground font-medium text-lg md:text-xl py-6 [&>svg]:text-foreground">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span>What other services do you provide?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 pl-14 text-base md:text-lg" style={{color: '#171717'}}>
                  At Everything Baby, we go beyond products. Our services include:<br />
                  🍼 Baby Shopping Assistance – We help you shop and organize all your newborn and baby essentials.<br />
                  🌸 New Mum Support – Guides, tips, and resources to make your journey lighter and filled with care.<br />
                  🎁 Curated Baby Packages – Specially packed with love, making gifting easy for new mums and loved ones.<br />
                  💬 Connections and Recommendations – Linking you to trusted baby-related businesses and services in Nigeria.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-xl px-6 py-2 bg-card">
                <AccordionTrigger className="text-left hover:no-underline text-foreground font-medium text-lg md:text-xl py-6 [&>svg]:text-foreground">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span>Is Everything Baby only about products?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 pl-14 text-base md:text-lg" style={{color: '#171717'}}>
                  No. ✨ We are not just a business. Everything Baby is a movement built on love, ease, and care. Our goal is to support mothers and babies at every step, while creating a community that understands and celebrates your journey.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>

          {/* Contact Form */}
          <Reveal as="div" delay={120} className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 text-white">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Get in touch with us
                  </h2>
                  <p className="text-purple-100 text-lg">
                    Fill out the form below and we'll get back to you as soon as possible (30mins to 1hour).
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <a href="tel:+2347060867150">Quick Call</a>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="access_key" value="11468f57-5acd-4e1a-90b3-9a244e57260e" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 caret-sky-300 focus:outline-none focus:border-sky-300 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="Email address" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 caret-sky-300 focus:outline-none focus:border-sky-300 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                      required
                    />
                  </div>
                </div>

                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" 
                  placeholder="Phone number" 
                   className="bg-white/10 border-white/20 text-white placeholder:text-white/70 caret-sky-300 focus:outline-none focus:border-sky-300 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                  required
                />

                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder:text-white/70 focus:border-sky-300 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus:outline-none"
                  required
                >
                  <option value="" className="text-gray-900">Select a service</option>
                  <option value="newborn" className="text-gray-900">Newborn Package</option>
                  <option value="meals" className="text-gray-900">Curated Meal Plans</option>
                  <option value="registry" className="text-gray-900">Baby Registry</option>
                  <option value="hospital" className="text-gray-900">Hospital List</option>
                  <option value="consultation" className="text-gray-900">General Consultation</option>
                </select>

                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your needs, baby's age, or any specific questions you have..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 caret-sky-300 focus:outline-none focus:border-sky-300 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2"
                  required
                />

                {isSubmitted ? (
                  <div className="flex items-center justify-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">Message sent successfully!</span>
                  </div>
                ) : (
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                )}

                <div className="text-center pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-purple-100">
                    <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
                    <span>We care about your privacy and will never spam you</span>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-transparent to-blue-800/20 pointer-events-none"></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;