import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import zainabImage from "@/assets/zainab-akepre.jpg";
import chikaImage from "@/assets/chika-anyanwu.jpg";
import taiwoImage from "@/assets/taiwo-raymond.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Zainab Akepre",
      text: "Everything Baby made my first pregnancy so much easier. Their hospital package was perfectly curated and saved me hours of research.",
      rating: 5,
      image: zainabImage
    },
    {
      name: "Chika Anyanwu",
      text: "The baby essentials package was a lifesaver! Everything I needed and nothing I didn't. Highly recommend to new moms.",
      rating: 5,
      image: chikaImage
    },
    {
      name: "Taiwo Raymond",
      text: "Their back-to-school package was amazing. My daughter had everything she needed for nursery. Such thoughtful curation!",
      rating: 5,
      image: taiwoImage
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
            <Card key={index} className="border-2 hover:shadow-elegant transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl animate-scale-in shadow-lg" style={{animationDelay: `${index * 0.1}s`, borderColor: "#171717", boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)'}}>
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 mx-auto mb-3 rounded-full object-cover" />
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{color: "#C2185B", fill: "#C2185B"}} />
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