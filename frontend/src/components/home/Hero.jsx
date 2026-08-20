import Button from "../ui/Button";

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  size: `${2 + (index % 4)}px`,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: `${(index % 9) * -1.2}s`,
  duration: `${8 + (index % 7) * 2}s`,
}));

export default function Hero() {
  return (
    <section className="hero hero-ai">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-visual" />
        <div className="hero-code hero-code-left">
          <span>const people = intelligence;</span>
          <span>const problem = understand(context);</span>
          <span>const insight = structure(knowledge);</span>
          <span>const system = build(insight);</span>
          <span>const impact = amplify(people, system);</span>
        </div>
        <div className="hero-code hero-code-right">
          <span>AI = human + machine</span>
          <span>purpose: meaningful</span>
          <span>context: African</span>
          <span>architecture: evolving</span>
        </div>
        <div className="hero-grid-background" />
        <div className="hero-particles">
          {particles.map((particle) => (
            <span key={particle.id} className="hero-particle" style={{
              "--particle-size": particle.size,
              "--particle-left": particle.left,
              "--particle-top": particle.top,
              "--particle-delay": particle.delay,
              "--particle-duration": particle.duration,
            }} />
          ))}
        </div>
        <div className="hero-background-glow hero-background-glow-one" />
        <div className="hero-background-glow hero-background-glow-two" />
      </div>
      <div className="hero-overlay" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">A.I. · AbaNtu Intelligence · South Africa</span>
          <div className="hero-ai-mark">A.I.</div>
          <h1>Before Artificial Intelligence, there is <em>AbaNtu Intelligence.</em></h1>
          <p className="hero-lead">
            We combine human intelligence, digital engineering and emerging AI to build systems that help people, institutions and businesses understand, connect, create and grow.
          </p>
          <div className="hero-actions">
            <Button to="/projects">See intelligence in practice</Button>
            <Button to="/partnership" variant="ghost">Build with us</Button>
          </div>
          <div className="hero-proof">
            <span>Human Intelligence</span><i>·</i><span>AI</span><i>·</i><span>Systems</span><i>·</i><span>Impact</span>
          </div>
        </div>
      </div>
    </section>
  );
}
