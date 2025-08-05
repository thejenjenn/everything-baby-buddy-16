import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Users, BookOpen, Award } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Heart,
      title: "Personal Experience",
      description: "First-time mother who understands the journey"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Backed by nutritionists and pediatricians"
    },
    {
      icon: BookOpen,
      title: "Extensive Research",
      description: "Countless hours of study and experimentation"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Supporting families with confidence"
    }
  ];

  return (
    <section id="about" className="py-20 bg-powder-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey from overwhelmed first-time mum to passionate advocate for mothers everywhere
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="my-story" className="border-none">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-xl font-semibold text-foreground">Read My Full Story</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="prose prose-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      I remember being 35 weeks pregnant—heavy, exhausted, and completely clueless about what I needed as a first-time mum. 
                      The thought of walking through Eko Market to hunt for baby essentials was just too overwhelming.
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      That's when I realized how many mothers face this same struggle. The endless research, the overwhelming choices, 
                      the fear of missing something important for your precious little one. It shouldn't be this hard.
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      Thankfully, I had amazing mothers around me who helped me create a detailed checklist that guided my shopping. 
                      Even with that, it was still quite stressful trying to gather everything I needed, stick to a budget, and come home to sort it all out.
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      Fast forward to when my baby turned six months—I was hit with a whole new challenge: starting solids. 
                      I was overwhelmed by all the options of purées and meals. I had to dive deep into research, talk to experienced mums, 
                      and experiment again and again just to discover what worked best for my baby.
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      That journey sparked a deep passion in me—for newborns and for mothers. I couldn't ignore the growing desire to support 
                      other women walking this same path. Backed by the wisdom of experienced mums, certified nutritionists, pediatricians, 
                      and countless hours of personal research, I've poured everything into this venture.
                    </p>
                    
                    <p className="text-foreground font-semibold">
                      This is more than just a business—it's a movement. A mission to make motherhood smoother and less daunting for both you and me.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <highlight.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;