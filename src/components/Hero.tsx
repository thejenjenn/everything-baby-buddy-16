import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-warm-cream via-background to-baby-pink min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>Supporting mothers from bump to baby's first birthday</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Everything{" "}
                <span className="bg-gradient-to-r from-primary to-soft-coral bg-clip-text text-transparent">
                  Baby
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Making motherhood smoother and less daunting. We walk with you every step of the way, 
                taking the stress off your shoulders so you can focus on what truly matters—you and your baby.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="warm" size="lg" className="text-lg px-8">
                Explore Services
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Read My Story
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1-12m</div>
                <div className="text-sm text-muted-foreground">Age Range</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm">
              <img
                src={heroImage}
                alt="Happy mother with baby"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-soft border border-border">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-primary fill-primary" />
                <div>
                  <div className="font-semibold text-foreground">Trusted by Moms</div>
                  <div className="text-sm text-muted-foreground">Nationwide</div>
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