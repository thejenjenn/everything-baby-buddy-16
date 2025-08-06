import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import zainabImage from "@/assets/zainab-akepre.jpg";
import chikaImage from "@/assets/chika-anyanwu.jpg";
import taiwoImage from "@/assets/taiwo-raymond.jpg";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Zainab Akepre",
      text: "Everything Baby made my first pregnancy so much easier. Their hospital package was perfectly curated and saved me hours of research.",
      rating: 5,
      image: zainabImage,
      bgColor: "bg-pink-50",
      role: "New Mother"
    },
    {
      name: "Chika Anyanwu", 
      text: "The baby essentials package was a lifesaver! Everything I needed and nothing I didn't. Highly recommend to new moms.",
      rating: 5,
      image: chikaImage,
      bgColor: "bg-blue-50",
      role: "Mother of Two"
    },
    {
      name: "Taiwo Raymond",
      text: "Their back-to-school package was amazing. My daughter had everything she needed for nursery. Such thoughtful curation!",
      rating: 5,
      image: taiwoImage,
      bgColor: "bg-green-50",
      role: "Working Mom"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            What Mothers Say
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-body leading-relaxed" style={{color: "#171717"}}>
            Real experiences from mothers who trusted us with their precious journey.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
                    {/* Full Cover Image Section */}
                    <div className="relative h-80 p-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover rounded-2xl" 
                      />
                    </div>
                    
                    {/* Quote Section - Matching reference layout */}
                    <div className={`${testimonial.bgColor} px-8 py-12 text-center relative min-h-[320px] flex flex-col justify-center`}>
                      {/* Large quote mark */}
                      <div className="text-6xl text-gray-600 font-serif leading-none mb-6 text-left">"</div>
                      
                      {/* Testimonial text - centered and well spaced */}
                      <div className="flex-grow flex items-center justify-center">
                        <p className="text-lg font-body leading-relaxed text-gray-800 max-w-sm mx-auto">
                          {testimonial.text}
                        </p>
                      </div>
                      
                      {/* Name and role - bottom section */}
                      <div className="mt-8 pt-4">
                        <h4 className="font-bold text-xl text-gray-900 mb-2">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 font-medium text-base">
                          {testimonial.role}
                        </p>
                      </div>
                      
                      {/* Right border accent */}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-20 bg-gray-400 rounded-l-full"></div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator - Matching reference style */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gray-600 w-8' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;