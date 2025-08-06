import { Baby, Heart, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-background animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 animate-slide-in-left" style={{animationDelay: "0.2s"}}>
            <div className="flex items-center space-x-2">
              <Baby className="h-8 w-8 text-primary hover-bounce" />
              <span className="font-bold text-xl">Everything Baby</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Supporting mothers from bump through their child's precious early years. Making motherhood smoother and less daunting, one family at a time.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-primary fill-primary animate-pulse-scale" />
              <span className="text-background/60">Made with love for mothers</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            <h3 className="font-semibold text-lg">Our Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Newborn Packages</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Meal Plans</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Baby Registry</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Hospital Lists</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Party Packages</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Consultation</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in-up" style={{animationDelay: "0.6s"}}>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#home" className="hover:text-primary transition-colors hover-lift story-link">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors hover-lift story-link">My Story</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors hover-lift story-link">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors hover-lift story-link">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover-lift story-link">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover-lift story-link">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 animate-slide-in-right" style={{animationDelay: "0.8s"}}>
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-background/80 hover-lift transition-transform duration-300">
                <Phone className="h-4 w-4 text-primary animate-wiggle" />
                <span>Call for consultation</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80 hover-lift transition-transform duration-300">
                <MessageCircle className="h-4 w-4 text-primary animate-bounce-gentle" />
                <span>WhatsApp available</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80 hover-lift transition-transform duration-300">
                <Mail className="h-4 w-4 text-primary animate-pulse-scale" />
                <span>Email support</span>
              </div>
            </div>
            <p className="text-xs text-background/60">
              Response time: 30 mins - 2 hours during business hours
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 animate-fade-in-up" style={{animationDelay: "1s"}}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">
              © 2025 Everything Baby. All rights reserved.
            </p>
            <p className="text-sm text-background/60 animate-bounce-gentle">
              Supporting families with love and care 💝
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;