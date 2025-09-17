import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            My Story
          </Reveal>
          <Reveal as="p" delay={120} className="text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
            A personal journey that sparked a mission to support every mother's path.
          </Reveal>
        </div>

        {/* YouTube Video Section */}
        <Reveal as="div" delay={240} className="mb-12 w-full">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/6OfUBZ7Z7-M?autoplay=1&loop=1&mute=1&playlist=6OfUBZ7Z7-M&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Everything Baby Story"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>

        <div className="mb-8 animate-fade-in max-w-4xl mx-auto">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-pink-200/10">
            {/* Accordion inside the card */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="story" className="border-transparent">
                <AccordionTrigger className="text-left py-3 hover:no-underline group [&[data-state=open]>div]:text-pink-300 [&>svg]:text-pink-300">
                  <div className="text-lg font-heading font-semibold text-pink-300 transition-colors">
                    Read My Full Story
                  </div>
                </AccordionTrigger>
                
                {/* Preview text */}
                <p className="text-white/90 font-body leading-relaxed text-lg mb-6">
                  I remember being 35 weeks pregnant heavy, exhausted, and completely clueless about what I needed as a first-time mum. The thought of preparing for my baby's arrival felt overwhelming. I had so many questions but no clear answers.
                </p>
                
                <AccordionContent className="text-white/90 font-body leading-relaxed text-lg pt-2">
                  <div className="space-y-4">
                    <p>
                      What was I supposed to pack for the hospital? What items did I actually need at home? Was I even doing any of it right?
                    </p>
                    <p>
                      I found myself drowning in endless checklists, each one different from the last, and none of them seemed to truly speak to what I was going through. The advice online felt overwhelming, impersonal, and often contradictory.
                    </p>
                    <p>
                      That's when it hit me. There had to be a better way.
                    </p>
                    <p>
                      No mother should have to face this life-changing moment feeling confused, anxious, or unsupported. We deserve clarity. We deserve guidance. We deserve peace of mind.
                    </p>
                    <p>
                      That inspired me to create Everything Baby, to make the path a little smoother for the next mum standing where I once stood.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;