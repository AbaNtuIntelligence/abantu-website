import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">AbaNtu Intelligence · South Africa</span>
          <h1>Digital systems built around <em>real problems.</em></h1>
          <p className="hero-lead">
            We design and build practical digital platforms, web applications and information systems
            for organisations, institutions and communities across Africa.
          </p>
          <div className="hero-actions">
            <Button to="/projects">Explore our work</Button>
            <Button to="/partnership" variant="ghost">Partner with us</Button>
          </div>
          <div className="hero-proof">
            <span>Strategy</span><i>·</i><span>Design</span><i>·</i><span>Engineering</span><i>·</i><span>Deployment</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="system-orbit">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="orbit-core">A</div>
            <span className="node node-one">Education</span>
            <span className="node node-two">Opportunity</span>
            <span className="node node-three">Commerce</span>
            <span className="node node-four">Civic Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
}