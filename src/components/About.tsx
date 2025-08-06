import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            My Story
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
            A personal journey that sparked a mission to support every mother's path.
          </p>
        </div>

        <div className="mb-16 animate-fade-in">
          {/* Preview text shown first */}
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-white/90 font-body leading-relaxed text-lg">
              I remember being 35 weeks pregnant heavy, exhausted, and completely clueless about what I needed as a first-time mum. The thought of preparing for my baby's arrival felt overwhelming. I had so many questions but no clear answers…..
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto mb-8">
            <AccordionItem value="story" className="border-white/20">
              <AccordionTrigger className="text-left py-6 hover:no-underline group [&[data-state=open]>div]:text-pink-300 [&>svg]:text-pink-300">
                <div className="text-xl font-heading font-semibold text-pink-300 transition-colors">
                  Read My Full Story
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-white/90 font-body leading-relaxed text-lg space-y-4">
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
          
          {/* Image after accordion */}
          <div className="max-w-4xl mx-auto flex justify-center">
            <img 
              src="/lovable-uploads/c85ff976-5688-4e47-be12-3bd2fde12341.png" 
              alt="Portrait" 
              className="rounded-2xl shadow-lg max-w-md w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;