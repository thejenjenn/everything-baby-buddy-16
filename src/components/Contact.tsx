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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your journey with Everything Baby? We're here to support you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                Whether you need consultation, want to place an order, or have questions about our services, 
                we're always happy to help. Reach out through any of the channels below.
              </p>
            </div>

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

            <Card className="border-border bg-gradient-to-r from-baby-pink/50 to-baby-blue/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold text-foreground">Response Time</h4>
                </div>
                <p className="text-muted-foreground">
                  We typically respond within 30mins - 2hours during business hours. For urgent matters, please call or message us directly on WhatsApp.
                </p>
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