import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Everything Baby made my first pregnancy so much easier. Their hospital package was perfectly curated and saved me hours of research.",
      rating: 5
    },
    {
      name: "Priya Patel",
      text: "The baby essentials package was a lifesaver! Everything I needed and nothing I didn't. Highly recommend to new moms.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      text: "Their back-to-school package was amazing. My daughter had everything she needed for nursery. Such thoughtful curation!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            What Mothers Say
          </h2>
          <p className="text-xl text-muted-taupe max-w-3xl mx-auto font-body leading-relaxed">
            Real experiences from mothers who trusted us with their precious journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: "0.3s"}}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-blush-pink/30 hover:shadow-elegant transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <User className="h-12 w-12 text-powder-blue mx-auto mb-3 bg-blush-pink/30 rounded-full p-2" />
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                
                <p className="text-muted-taupe font-body leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <h4 className="font-semibold text-charcoal-text font-heading">
                  {testimonial.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;