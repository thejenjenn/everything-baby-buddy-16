import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import personalExperienceIcon from "@/assets/personal-experience-icon.jpg";
import expertNetworkIcon from "@/assets/expert-network-icon.jpg";
import extensiveResearchIcon from "@/assets/extensive-research-icon.jpg";
import provenResultsIcon from "@/assets/proven-results-icon.jpg";

const About = () => {
  const highlights = [
    {
      image: personalExperienceIcon,
      title: "Personal Experience",
      description: "First-time mother who understands the journey"
    },
    {
      image: expertNetworkIcon,
      title: "Expert Network",
      description: "Backed by nutritionists and pediatricians"
    },
    {
      image: extensiveResearchIcon,
      title: "Extensive Research",
      description: "Countless hours of study and experimentation"
    },
    {
      image: provenResultsIcon,
      title: "Proven Results",
      description: "Supporting families with confidence"
    }
  ];

  return (
    <section id="about" className="py-20" style={{backgroundColor: "hsl(var(--light-yellow))"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal-text mb-6 tracking-tight">
            My Story
          </h2>
          <p className="text-xl text-muted-taupe max-w-3xl mx-auto font-body leading-relaxed">
            A personal journey that sparked a mission to support every mother's path.
          </p>
        </div>

        <div className="mb-16 animate-fade-in">
          {/* Preview text shown before collapsing */}
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-blush-pink/30">
            <p className="text-muted-taupe font-body leading-relaxed text-lg mb-4">
              I remember being 35 weeks pregnant heavy, exhausted, and completely clueless about what I needed as a first-time mum. The thought of preparing for my baby's arrival felt overwhelming. I had so many questions but no clear answers.
            </p>
            <p className="text-muted-taupe font-body leading-relaxed text-lg">
              What exactly do I need for the hospital? What essentials should I have ready at home? How do I know if I'm buying the right things? The endless lists online were confusing and often contradictory.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AccordionItem value="story" className="border-blush-pink/30">
              <AccordionTrigger className="text-left py-6 hover:no-underline group">
                <div className="text-xl font-heading font-semibold text-charcoal-text group-hover:text-primary transition-colors">
                  Read My Full Story
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-taupe font-body leading-relaxed text-lg space-y-4">
                <p>
                  What exactly do I need for the hospital? What essentials should I have ready at home? How do I know if I'm buying the right things? The endless lists online were confusing and often contradictory.
                </p>
                <p>
                  That's when I realized there had to be a better way. New mothers shouldn't have to navigate this journey alone, feeling overwhelmed and unprepared. We deserve support, guidance, and peace of mind during one of life's most precious moments.
                </p>
                <p>
                  Everything Baby was born from this personal experience. We're here to take the guesswork out of motherhood, providing curated packages and expert guidance so you can focus on what truly matters - bonding with your little one.
                </p>
                <p>
                  Every package we create, every recommendation we make, comes from understanding exactly what you're going through. Because we've been there too.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{animationDelay: "0.3s"}}>
          {highlights.map((highlight, index) => (
            <Card key={index} className="border-blush-pink/30 hover:shadow-elegant transition-all duration-300 bg-white/70 backdrop-blur-sm rounded-2xl animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6 text-center">
                <img src={highlight.image} alt={highlight.title} className="h-10 w-10 mx-auto mb-4 rounded-lg object-cover" />
                <h3 className="font-semibold text-charcoal-text font-heading mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-taupe font-body">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;