import { Baby, Heart, Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Baby className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Everything Baby</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Supporting mothers from bump through their child's precious early years. Making motherhood smoother and less daunting, one family at a time.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="text-background/60">Made with love for mothers</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#services" className="hover:text-primary transition-colors">Newborn Packages</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Meal Plans</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Baby Registry</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Hospital Lists</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Party Packages</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Consultation</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">My Story</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <Phone className="h-4 w-4 text-primary" />
                <span>Call for consultation</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>WhatsApp available</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email support</span>
              </div>
            </div>
            <p className="text-xs text-background/60">
              Response time: 2-4 hours during business hours
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">
              © 2025 Everything Baby. All rights reserved.
            </p>
            <p className="text-sm text-background/60">
              Supporting families with love and care 💝
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;