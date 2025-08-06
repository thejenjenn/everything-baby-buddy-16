import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const testimonials = [
    {
      name: "Zainab Akepre",
      text: "Everything Baby made my first pregnancy so much easier. Their hospital package was perfectly curated and saved me hours of research.",
      rating: 5,
      bgColor: "bg-pink-50/70",
      role: "New Mother"
    },
    {
      name: "Chika Anyanwu", 
      text: "The baby essentials package was a lifesaver! Everything I needed and nothing I didn't. Highly recommend to new moms.",
      rating: 5,
      bgColor: "bg-blue-50/70",
      role: "Mother of Two"
    },
    {
      name: "Taiwo Raymond",
      text: "Their back-to-school package was amazing. My daughter had everything she needed for nursery. Such thoughtful curation!",
      rating: 5,
      bgColor: "bg-green-50/70",
      role: "Working Mom"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            What Mothers Say
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-body leading-relaxed" style={{color: "#171717"}}>
            Real experiences from mothers who trusted us with their precious journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`
                group border-0 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10
                bg-white
                ${isVisible ? 
                  index === 0 ? 'animate-slide-up-fade' :
                  index === 1 ? 'animate-slide-up-fade-delay-1' :
                  'animate-slide-up-fade-delay-2'
                  : 'opacity-0 translate-y-8'
                }
              `}
            >
              <CardContent className="p-8 relative">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                
                {/* Quote mark */}
                <div className="text-5xl text-primary/30 font-serif leading-none mb-4 relative z-10">"</div>
                
                {/* Star rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-all duration-200 group-hover:scale-110" 
                      style={{animationDelay: `${i * 100}ms`}}
                    />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-gray-700 font-body leading-relaxed mb-6 relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {testimonial.text}
                </p>
                
                {/* Author info */}
                <div className="relative z-10">
                  <p className="text-gray-600 font-medium text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;