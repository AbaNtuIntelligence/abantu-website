import Hero from "../components/home/Hero";
import Impact from "../components/home/Impact";
import Sectors from "../components/home/Sectors";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Philosophy from "../components/home/Philosophy";
import Insights from "../components/home/Insights";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <FeaturedProjects />
      <Sectors />
      <Philosophy />
      <Insights />
      <section className="cta-section">
        <div className="container center">
          <span className="eyebrow">Build something meaningful</span>
          <h2>Have a digital problem worth solving?</h2>
          <p>Tell us what is not working. We can explore the system, the users and the right path forward.</p>
          <Button to="/contact">Start a conversation</Button>
        </div>
      </section>
    </>
  );
}