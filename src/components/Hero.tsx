import { Button } from "@/components/ui/button";
import { Heart, Star, Play, Baby } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => {
      const isMobile = window.innerWidth < 768;
      if (mql.matches || isMobile) {
        setParallaxY(0);
        return;
      }
      const y = window.scrollY || 0;
      const delta = Math.max(-24, Math.min(24, y * 0.4));
      setParallaxY(delta);
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  return (
    <section id="home" className="relative bg-background min-h-screen flex items-center overflow-hidden">
      {/* Floating background elements - Lovely soft blue and pink bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="motion-parallax will-change-transform"
          style={{ transform: `translateY(${parallaxY}px)` }}
        >
          <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-baby-blue/40 to-powder-blue/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-36 h-36 bg-gradient-to-br from-baby-pink/50 to-blush-pink/40 rounded-full blur-lg animate-float" style={{animationDelay: "1s"}}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-powder-blue/35 to-baby-blue/30 rounded-full blur-md animate-float" style={{animationDelay: "2s"}}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-light-pink/40 to-baby-pink/50 rounded-full blur-lg animate-float" style={{animationDelay: "3s"}}></div>
          <div className="absolute bottom-1/4 left-1/5 w-24 h-24 bg-gradient-to-br from-baby-pink/60 to-light-pink-fill/40 rounded-full blur-md animate-float" style={{animationDelay: "2.5s"}}></div>
          <div className="absolute top-1/4 right-1/3 w-30 h-30 bg-gradient-to-br from-powder-blue/50 to-baby-blue/40 rounded-full blur-lg animate-float" style={{animationDelay: "1.5s"}}></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-baby-pink/45 to-powder-blue/35 rounded-full blur-sm animate-float" style={{animationDelay: "4s"}}></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-gradient-to-br from-baby-blue/30 to-light-pink/35 rounded-full blur-xl animate-float" style={{animationDelay: "0.5s"}}></div>
          <div className="absolute top-3/4 right-1/5 w-34 h-34 bg-gradient-to-br from-blush-pink/35 to-baby-blue/30 rounded-full blur-lg animate-float" style={{animationDelay: "3.5s"}}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in-up">
          <div className="space-y-6">
            <div className={`flex items-center space-x-3 text-sm font-body transition-all duration-500 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-medium tracking-wide" style={{color: "#171717"}}>We ease motherhood journey - from bump to baby’s early years.</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-charcoal-text leading-tight tracking-tight transition-all duration-500 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="hover:text-warm-coral transition-colors duration-200">Everything</span>{" "}
              <span className="baby-cycle text-warm-coral animate-baby-color-cycle transition-colors duration-200">Baby</span>
            </h1>
            <p className={`text-xl md:text-2xl leading-relaxed font-body font-light max-w-xl transition-all duration-500 delay-200 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-charcoal-text`}>
              Supporting mums and their little ones from bump to baby's early years with comprehensive packages and personalized care.
            </p>
          </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button variant="default" size="lg" className="text-lg px-10 py-4 font-medium shadow-warm animate-scale-in" style={{animationDelay: "0.6s"}}>
                Explore Services
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{animationDelay: "0.4s"}}>
            <div className="relative rounded-3xl overflow-hidden shadow-elegant hover:shadow-warm transition-all duration-500 group">
              <img
                src={heroImage}
                alt="Happy mother with baby"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-coral/30 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Stats Section - Moved below hero content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in" style={{animationDelay: "1s"}}>
          <div className="group text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 border border-gray-200 hover:-translate-y-1.5 hover:shadow-warm">
            <Star className="h-8 w-8 text-primary mx-auto mb-3 fill-primary transition-colors duration-200 group-hover:text-warm-coral group-hover:fill-warm-coral" />
            <div className="text-3xl font-bold text-primary font-heading transition-colors duration-200 group-hover:text-warm-coral">5.0</div>
            <div className="text-sm font-body" style={{color: "#171717"}}>Customer Rating</div>
          </div>
          <div className="group text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 border border-gray-200 hover:-translate-y-1.5 hover:shadow-warm">
            <Heart className="h-8 w-8 text-primary mx-auto mb-3 transition-colors duration-200 group-hover:text-warm-coral" />
            <div className="text-3xl font-bold text-primary font-heading transition-colors duration-200 group-hover:text-warm-coral">Trusted</div>
            <div className="text-sm font-body" style={{color: "#171717"}}>Nationwide</div>
          </div>
          <div className="group text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 border border-gray-200 hover:-translate-y-1.5 hover:shadow-warm">
            <Baby className="h-8 w-8 text-primary mx-auto mb-3 transition-colors duration-200 group-hover:text-warm-coral" />
            <div className="text-3xl font-bold text-primary font-heading transition-colors duration-200 group-hover:text-warm-coral">0-3yrs</div>
            <div className="text-sm font-body" style={{color: "#171717"}}>Age Range</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;