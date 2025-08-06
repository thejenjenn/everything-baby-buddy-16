import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const testimonials = [
    {
      name: "Zainab Akepre",
      text: "Everything Baby made my first pregnancy so much easier. Their hospital package was perfectly curated and saved me hours of research.",
      rating: 5,
      role: "New Mother",
      avatar: "/src/assets/zainab-akepre.jpg"
    },
    {
      name: "Chika Anyanwu", 
      text: "The baby essentials package was a lifesaver! Everything I needed and nothing I didn't. Highly recommend to new moms.",
      rating: 5,
      role: "Mother of Two",
      avatar: "/src/assets/chika-anyanwu.jpg"
    },
    {
      name: "Taiwo Raymond",
      text: "Their back-to-school package was amazing. My daughter had everything she needed for nursery. Such thoughtful curation!",
      rating: 5,
      role: "Working Mom",
      avatar: "/src/assets/taiwo-raymond.jpg"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
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
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            What Mothers Say
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-body leading-relaxed transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{color: "#171717"}}>
            Real experiences from mothers who trusted us with their precious journey.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="max-w-md mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Stacked Cards */}
          <div 
            className="relative w-full h-[360px] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isNext = index === (activeIndex + 1) % testimonials.length;
              const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
              
              let zIndex = 1;
              let transform = '';
              let opacity = 0.6;
              
              // Define different background colors and borders for each card
              const cardColors = [
                'bg-gradient-to-br from-baby-pink/20 to-light-pink/30', // First card
                'bg-gradient-to-br from-baby-blue/20 to-powder-blue/30', // Second card  
                'bg-gradient-to-br from-warm-coral/20 to-blush-pink/30'  // Third card
              ];
              
              const borderColors = [
                'border-baby-pink', // Matching first card
                'border-baby-blue', // Matching second card
                'border-warm-coral' // Matching third card
              ];
              
              if (isActive) {
                zIndex = 10;
                transform = 'translate(0, 0) scale(1)';
                opacity = 1;
              } else if (isNext) {
                zIndex = 9;
                transform = 'translate(8px, 8px) scale(0.95)';
                opacity = 0.8;
              } else if (isPrev) {
                zIndex = 8;
                transform = 'translate(-8px, 8px) scale(0.95)';
                opacity = 0.8;
              } else {
                zIndex = 7;
                transform = 'translate(16px, 16px) scale(0.9)';
                opacity = 0.4;
              }

              return (
                <Card
                  key={index}
                  className={`
                    absolute inset-0 w-full ${cardColors[index]} ${borderColors[index]} rounded-3xl shadow-sm
                    transition-all duration-500 ease-out cursor-pointer
                    ${isActive ? 'hover:scale-[1.03] hover:shadow-md' : ''}
                    ${isVisible && index <= 2 ? 'animate-fade-in' : 'opacity-0'}
                  `}
                  style={{
                    zIndex,
                    transform,
                    opacity,
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <CardContent className="p-8 h-full flex flex-col text-left">
                    {/* Quote mark */}
                    <div className="text-4xl text-primary/30 font-serif leading-none mb-4">"</div>
                    
                    {/* Star rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="text-gray-700 font-body leading-relaxed mb-6 flex-grow">
                      {testimonial.text}
                    </p>
                    
                    {/* Role only */}
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <div className="md:hidden text-center mt-4">
            <p className="text-sm text-gray-500">Swipe left or right to navigate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;