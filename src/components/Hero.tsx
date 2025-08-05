import { Button } from "@/components/ui/button";
import { Heart, Star, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative bg-background min-h-screen flex items-center overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-soft-lilac/30 to-powder-blue/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-blush-pink/40 to-warm-coral/20 rounded-full blur-lg animate-float" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-powder-blue/25 to-soft-lilac/25 rounded-full blur-md animate-float" style={{animationDelay: "2s"}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm text-muted-taupe font-body">
                <Star className="h-5 w-5 fill-primary text-primary animate-scale-in" style={{animationDelay: "0.3s"}} />
                <span className="font-medium tracking-wide">Supporting mothers from bump through their child's precious early years</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-charcoal-text leading-tight tracking-tight">
                Everything{" "}
                <span className="bg-gradient-to-r from-warm-coral via-dusty-rose to-primary bg-clip-text text-transparent animate-glow">
                  Baby
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-taupe leading-relaxed font-body font-light max-w-xl">
                We ease your motherhood journey — from bump to baby's early years.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button variant="default" size="lg" className="text-lg px-10 py-4 font-medium shadow-warm animate-scale-in" style={{animationDelay: "0.6s"}}>
                Explore Services
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 font-medium group animate-scale-in" style={{animationDelay: "0.8s"}}>
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in" style={{animationDelay: "1s"}}>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-blush-pink/50 hover:shadow-warm transition-all duration-300">
                <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary font-heading">100+</div>
                <div className="text-sm text-muted-taupe font-body">Happy Families</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-powder-blue/50 hover:shadow-warm transition-all duration-300">
                <Star className="h-6 w-6 text-primary mx-auto mb-2 fill-primary" />
                <div className="text-2xl font-bold text-primary font-heading">5★</div>
                <div className="text-sm text-muted-taupe font-body">Customer Rating</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-soft-lilac/50 hover:shadow-warm transition-all duration-300">
                <div className="text-primary mx-auto mb-2 text-2xl">👶</div>
                <div className="text-2xl font-bold text-primary font-heading">0-3yrs</div>
                <div className="text-sm text-muted-taupe font-body">Age Range</div>
              </div>
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
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-elegant border border-blush-pink/30 animate-scale-in" style={{animationDelay: "1.2s"}}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-warm-coral to-dusty-rose rounded-full">
                  <Heart className="h-6 w-6 text-white fill-white" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal-text font-heading text-lg">Trusted by Moms</div>
                  <div className="text-sm text-muted-taupe font-body">Nationwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;