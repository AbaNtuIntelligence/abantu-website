
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";





const slides = [
  // Original AbaNtu Intelligence image
  "/hero-ai-visual.png",

  // Existing futuristic collection
  "/images/hero/abantu-future-city.webp",
  "/images/hero/abantu-neural-intelligence.webp",
  "/images/hero/abantu-digital-engineering.webp",
  "/images/hero/abantu-african-innovation.webp",
  "/images/hero/abantu-connected-intelligence.webp",
  "/images/hero/abantu-beyond-ai.webp",

  // Alienic 2095 collection
  "/images/hero/abantu-2095-orbital-city.webp",
  "/images/hero/abantu-2095-cybernetic-mind.webp",
  "/images/hero/abantu-2095-skyline.webp",
  "/images/hero/abantu-2095-africa-command.webp",
  "/images/hero/abantu-2095-transit-plaza.webp",
  "/images/hero/abantu-2095-orbital-network.webp",
  "/images/hero/abantu-2095-future-vision.webp",
];





const navLinks = [
  ["/about", "About"],
  ["/sectors", "Sectors"],
  ["/projects", "Our Work"],
  ["/blog", "Insights"],
];

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  size: `${2 + (index % 4)}px`,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: `${(index % 9) * -1.2}s`,
  duration: `${8 + (index % 7) * 2}s`,
}));

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <section className="hero hero-ai hero-cinematic">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-slides">
          {slides.map((src, index) => (
            <div
              key={src}
              className={`hero-slide ${
                activeSlide === index ? "is-active" : ""
              }`}
              style={{ backgroundImage: `url("${src}")` }}
            />
          ))}
        </div>

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
            <span
              key={particle.id}
              className="hero-particle"
              style={{
                "--particle-size": particle.size,
                "--particle-left": particle.left,
                "--particle-top": particle.top,
                "--particle-delay": particle.delay,
                "--particle-duration": particle.duration,
              }}
            />
          ))}
        </div>

        <div className="hero-background-glow hero-background-glow-one" />
        <div className="hero-background-glow hero-background-glow-two" />
      </div>

      <div className="hero-overlay" />

      <div className="hero-topbar">
        <Link to="/" className="hero-brand">
          AbaNtu <span>Intelligence</span>
        </Link>

        <button
          type="button"
          className="hero-menu-button"
          aria-expanded={menuOpen}
          aria-controls="hero-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <span className={`hero-menu-icon ${menuOpen ? "is-open" : ""}`}>
            <i />
            <i />
          </span>
        </button>
      </div>

      <nav
        id="hero-navigation"
        className={`hero-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="hero-navigation-inner">
          <span className="hero-navigation-label">
            EXPLORE ABANTU INTELLIGENCE
          </span>

          {navLinks.map(([href, label], index) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className="hero-navigation-link"
            >
              <small>0{index + 1}</small>
              <span>{label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}

          <Link
            to="/contact"
            className="hero-navigation-contact"
            onClick={() => setMenuOpen(false)}
          >
            Start a Conversation →
          </Link>
        </div>
      </nav>

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow">
              <span className="ai-brand">
                <span className="ai-tag">&lt;ai&gt;</span>
                AbaNtu Intelligence
                <span className="ai-tag">&lt;/ai&gt;</span>
              </span>
            </span>

            <span className="eyebrow hero-location">
              · South Africa ·
            </span>
          </div>

          <h1>
            Before Artificial Intelligence, there is{" "}
            <em>AbaNtu Intelligence.</em>
          </h1>

          <p className="hero-lead">
            We combine human intelligence, digital engineering and
            emerging AI to build systems that help people,
            institutions and businesses understand, connect,
            create and grow.
          </p>

          <div className="hero-actions">
            <Button to="/projects">See intelligence in practice</Button>
            <Button to="/partnership" variant="ghost">
              Build with us
            </Button>
          </div>

          <div className="hero-proof">
            <span>Human Intelligence</span><i>·</i>
            <span>AI</span><i>·</i>
            <span>Systems</span><i>·</i>
            <span>Impact</span>
          </div>
        </div>
      </div>

      <div className="hero-slide-controls" aria-label="Choose hero slide">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero-slide-dot ${
              activeSlide === index ? "is-active" : ""
            }`}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={activeSlide === index}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
