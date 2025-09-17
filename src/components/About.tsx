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

      </div>
    </section>
  );
};

export default About;