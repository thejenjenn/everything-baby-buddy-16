import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
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

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
    setStartX(null);
  };

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

        {/* Testimonial Carousel Container */}
        <div className="relative max-w-md mx-auto">
          {/* Stacked Cards Container */}
          <div 
            ref={carouselRef}
            className="relative h-[400px] sm:h-[350px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              
              return (
                <div
                  key={index}
                  className={`testimonial-card absolute inset-0 transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transform: `translateY(${offset * 8}px) translateX(${offset * 8}px) scale(${isActive ? 1 : 0.95 - absOffset * 0.05})`,
                    zIndex: testimonials.length - absOffset,
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <Card 
                    className={`
                      group border-0 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm
                      transition-all duration-300 ease-in-out bg-white h-full
                      ${isActive ? 'hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer' : ''}
                    `}
                  >
                    <CardContent className="p-8 relative h-full flex flex-col">
                      {/* Hover overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                      )}
                      
                      {/* Quote mark */}
                      <div className="text-5xl text-primary/30 font-serif leading-none mb-4 relative z-10">"</div>
                      
                      {/* Star rating */}
                      <div className="flex gap-1 mb-6 relative z-10">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-all duration-200" 
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-gray-700 font-body leading-relaxed mb-6 relative z-10 flex-grow">
                        {testimonial.text}
                      </p>
                      
                      {/* Author info */}
                      <div className="relative z-10">
                        <p className="font-semibold text-gray-900 mb-1">{testimonial.name}</p>
                        <p className="text-gray-600 font-medium text-sm">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevCard}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeIndex 
                      ? 'bg-primary shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextCard}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;