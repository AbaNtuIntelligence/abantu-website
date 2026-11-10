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
      <section className="cta-section ai-cta">
        <div className="container center">
          <span className="eyebrow">A.I. starts with a real problem</span>
          <h2>What could become possible if your intelligence had a better system?</h2>
          <p>Bring us the problem, the process, the idea or the ambition. We will help determine what should be digital, what should be intelligent and what should remain human.</p>
          <Button to="/contact">Start a conversation</Button>
        </div>
      </section>
    </>
  );
}