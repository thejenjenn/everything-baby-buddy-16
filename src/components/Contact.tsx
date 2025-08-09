import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, Mail, MapPin, Clock, Heart } from "lucide-react";

import Reveal from "@/components/Reveal";

const Contact = () => {
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
                  <p className="text-sm font-medium text-foreground">everythingbabyworld@gmail.com</p>
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
                >
                  Quick Call
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="Full name" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-pink-400 hover:border-pink-300"
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email address" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-pink-400 hover:border-pink-300"
                    />
                  </div>
                </div>

                <Input 
                  type="tel" 
                  placeholder="Phone number" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-pink-400 hover:border-pink-300"
                />

                <select className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder:text-white/70 focus:border-pink-400 hover:border-pink-300">
                  <option value="" className="text-gray-900">Select a service</option>
                  <option value="newborn" className="text-gray-900">Newborn Package</option>
                  <option value="meals" className="text-gray-900">Curated Meal Plans</option>
                  <option value="registry" className="text-gray-900">Baby Registry</option>
                  <option value="hospital" className="text-gray-900">Hospital List</option>
                  <option value="party" className="text-gray-900">Party Packages</option>
                  <option value="consultation" className="text-gray-900">General Consultation</option>
                </select>

                <Textarea 
                  placeholder="Tell us about your needs, baby's age, or any specific questions you have..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-pink-400 hover:border-pink-300"
                />

                <Button variant="default" size="lg" className="w-full">
                  Send Message
                </Button>

                <div className="text-center pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-purple-100">
                    <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
                    <span>We care about your privacy and will never spam you</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-transparent to-blue-800/20"></div>
          </Reveal>
      </div>
      </div>
    </section>
  );
};

export default Contact;