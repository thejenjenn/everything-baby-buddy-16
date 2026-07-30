import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import ShopCategory from "@/components/ShopCategory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Testimonials />
      <Services />
      <ShopCategory />
      <Contact />

      <Footer />
    </div>
  );
};

export default Index;
