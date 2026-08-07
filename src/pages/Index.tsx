import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ShopAndServices from "@/components/ShopAndServices";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <ShopAndServices />
      <Testimonials />
      <Contact />

      <Footer />
    </div>
  );
};

export default Index;
