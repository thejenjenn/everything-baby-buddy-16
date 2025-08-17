import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, Mail, MapPin, Clock, Heart, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import Reveal from "@/components/Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.zapier.com/hooks/catch/24244927/utyim4l/");
  const { toast } = useToast();

  // Persist Zapier webhook URL locally so you only set it once
  useEffect(() => {
    const saved = localStorage.getItem("zapierWebhookUrl");
    if (saved) setWebhookUrl(saved);
  }, []);
  useEffect(() => {
    if (webhookUrl) localStorage.setItem("zapierWebhookUrl", webhookUrl);
  }, [webhookUrl]);

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
      if (!webhookUrl) {
        toast({
          title: "Email delivery not configured",
          description: "Please paste your Zapier Webhook URL to receive submissions.",
          variant: "destructive",
        });
        return;
      }

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: window.location.href,
        }),
      });
      
      setIsSubmitted(true);
      toast({
        title: "Request sent with Love",
        description: "Someone will reach out to you as soon as possible",
      });
      
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
        setIsSubmitted(false);
      }, 3000);
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
    <section id="contact" className="py-20 bg-gradient-to-b from-warm-cream to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal as="h2" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </Reveal>
          <Reveal as="p" delay={120} className="text-xl max-w-3xl mx-auto" style={{color: '#171717'}}>
            Ready to start your journey with Everything Baby? We're here to support you every step of the way.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Reveal as="div" className="space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                  <a 
                    href="https://wa.me/2347060867150" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Email</h4>
                  <p className="text-muted-foreground text-sm mb-3">Send us your inquiries</p>
                  <a href="mailto:info.everythingbaby@gmail.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors pointer-events-auto relative z-10">
                    info.everythingbaby@gmail.com
                  </a>
                </CardContent>
              </Card>
            </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      name="fullName"
                      value={formData.fullName}
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
                  <option value="party" className="text-gray-900">Party Packages</option>
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

                {/* Hidden admin configuration for email delivery via Zapier */}
                <input
                  type="hidden"
                  value={webhookUrl}
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