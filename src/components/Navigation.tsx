import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Baby, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 animate-slide-in-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 animate-zoom-in">
            <Baby className="h-8 w-8 text-powder-blue hover-bounce" />
            <span className="font-bold text-xl text-foreground">Everything Baby</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slide-in-right">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-all duration-300 hover-lift story-link font-medium"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 hover-wiggle transition-transform duration-300"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 animate-rotate-gentle" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover-wiggle transition-transform duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-all duration-300 hover-lift story-link font-medium animate-slide-in-left"
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;