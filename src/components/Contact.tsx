import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, Mail, MapPin, Clock, Heart } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-warm-cream to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: '#171717'}}>
            Ready to start your journey with Everything Baby? We're here to support you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                  <p className="text-muted-foreground text-sm mb-3">Chat with us on WhatsApp</p>
                  <p className="text-sm font-medium text-foreground">+234 706 086 7150</p>
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

            <Card className="border relative overflow-hidden" style={{backgroundColor: "#F7F3F0", borderColor: "#E5E7EB"}}>
              <CardContent className="p-6 relative">
                {/* Playful decorative elements */}
                <div className="absolute top-2 right-4 w-6 h-6 opacity-20" style={{color: "#EC4899"}}>🕐</div>
                <div className="absolute bottom-3 left-2 w-4 h-4 opacity-15" style={{color: "#EC4899"}}>💬</div>
                <div className="absolute top-1/2 right-2 w-3 h-3 opacity-15" style={{color: "#EC4899"}}>⚡</div>
                <div className="absolute bottom-4 right-6 w-5 h-5 opacity-15" style={{color: "#EC4899"}}>📱</div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6" style={{color: '#C2185B'}} />
                    <h4 className="font-semibold text-charcoal-text font-heading">Response Time</h4>
                  </div>
                  <p className="text-muted-taupe font-body">
                    We typically respond within 30mins - 2hours during business hours. For urgent matters, please call or message us directly on WhatsApp.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-border shadow-warm">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    First Name
                  </label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Last Name
                  </label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email Address
                </label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input type="tel" placeholder="Enter your phone number" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Service Interest
                </label>
                <select className="w-full p-3 border border-input rounded-md bg-background text-foreground">
                  <option>Select a service</option>
                  <option>Newborn Package</option>
                  <option>Curated Meal Plans</option>
                  <option>Baby Registry</option>
                  <option>Hospital List</option>
                  <option>Party Packages</option>
                  <option>General Consultation</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us about your needs, baby's age, or any specific questions you have..."
                  rows={4}
                />
              </div>

              <Button variant="default" size="lg" className="w-full">
                Send Message
              </Button>

              <div className="text-center pt-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-primary fill-primary" />
                  <span>We care about your privacy and will never spam you</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;