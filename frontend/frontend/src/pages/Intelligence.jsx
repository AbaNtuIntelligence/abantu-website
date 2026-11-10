
import { Link } from "react-router-dom";
import "./Intelligence.css";

const capabilities = [
  {
    number: "01",
    title: "Human Intelligence",
    description: "People, knowledge and insight at the centre of progress.",
    href: "/about",
  },
  {
    number: "02",
    title: "Digital Engineering",
    description: "Purpose-built digital systems for real-world challenges.",
    href: "/projects",
  },
  {
    number: "03",
    title: "Emerging AI",
    description: "Intelligent technology guided by human understanding.",
    href: "/services",
  },
  {
    number: "04",
    title: "African Innovation",
    description: "Solutions rooted in Africa, designed for wider impact.",
    href: "/sectors",
  },
];

export default function Intelligence() {
  return (
    <div className="genesis-page">
      <section className="genesis-stage" aria-labelledby="genesis-title">
        <div className="genesis-grid" aria-hidden="true" />
        <div className="genesis-ambient" aria-hidden="true" />

        <div className="genesis-heading">
          <span className="genesis-kicker">
            ABANTU INTELLIGENCE / GENESIS 2095
          </span>

          <h1 id="genesis-title">
            Intelligence begins with <em>people.</em>
          </h1>

          <p>
            Before artificial intelligence, there is human intelligence.
            The future is built by those who understand both.
          </p>
        </div>

        <div className="genesis-reactor">
          <div className="genesis-orbit genesis-orbit-one" aria-hidden="true" />
          <div className="genesis-orbit genesis-orbit-two" aria-hidden="true" />
          <div className="genesis-orbit genesis-orbit-three" aria-hidden="true" />

          <div className="genesis-logo-shell">
            <img
              src="/logo.png"
              alt="AbaNtu Intelligence official Warrior logo"
              className="genesis-logo"
            />
          </div>

          <div className="genesis-energy-base" aria-hidden="true" />
        </div>

        <div className="genesis-identity">
          <span className="genesis-code">&lt;ai&gt;</span>
          <span>AbaNtu Intelligence</span>
          <span className="genesis-code">&lt;/ai&gt;</span>
        </div>

        <p className="genesis-origin">· South Africa ·</p>

        <div className="genesis-actions">
          <Link to="/projects" className="genesis-action genesis-action-primary">
            Explore our work
          </Link>

          <Link to="/contact" className="genesis-action genesis-action-secondary">
            Start a conversation
          </Link>
        </div>
      </section>

      <section className="genesis-capabilities">
        <div className="genesis-section-heading">
          <span>OUR INTELLIGENCE FRAMEWORK</span>
          <h2>Four dimensions. One connected future.</h2>
        </div>

        <div className="genesis-capability-grid">
          {capabilities.map((item) => (
            <Link
              to={item.href}
              className="genesis-capability"
              key={item.number}
            >
              <span className="genesis-capability-number">
                {item.number}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="genesis-capability-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
