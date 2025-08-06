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
                    {/* Image Section */}
                    <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-8 pt-12">
                      <div className="text-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg" 
                        />
                      </div>
                    </div>
                    
                    {/* Quote Section */}
                    <div className={`${testimonial.bgColor} p-8`}>
                      <div className="text-5xl text-gray-400 font-serif mb-4">"</div>
                      <p className="text-lg font-body leading-relaxed text-gray-800 mb-6">
                        {testimonial.text}
                      </p>
                      
                      <div className="border-l-4 border-gray-400 pl-4">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
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