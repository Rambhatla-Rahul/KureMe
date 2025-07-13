import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}
