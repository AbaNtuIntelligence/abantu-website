import SectionHeading from "../components/ui/SectionHeading";
import { Link } from "react-router-dom";
// You may keep aiPhilosophy and values if you still need them elsewhere,
// but we'll override the content here for the About page.
// We'll import new data or define inline for clarity.
// For now, I'll use inline text, but you can move these to site.js.

export default function About() {
  return (
    <main className="page">
      {/* ===== 01 — HERO ===== */}
      <div className="container narrow page-intro">
        <span className="eyebrow">About AbaNtu Intelligence</span>
        <h1>We build technology for people.</h1>
        <p>
          AbaNtu Intelligence is a digital systems company focused on solving
          practical problems for organisations, institutions, and communities.
        </p>
      </div>

      {/* ===== 02 — THE PHILOSOPHY ===== */}
      <section className="section dark-section">
        <div className="container split ai-about-split">
          <div>
            <span className="eyebrow">Our philosophy</span>
            <h2>Technology is not the mission.<br />Solving the problem is.</h2>
          </div>
          <div>
            <p className="large-copy">
              We don’t begin with the question, <em>“What can we sell?”</em>
            </p>
            <p>
              We begin with: <strong>What problem are you trying to solve?</strong>
            </p>
            <p>
              Then: If the right solution happens to be a website, we build a website.
              If it requires a web application, we build an application.
              If it requires data infrastructure, automation, artificial intelligence,
              or an entirely new digital system, we build that.
            </p>
            <p>
              <strong>The technology follows the problem.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 03 — WHY ABANTU INTELLIGENCE? ===== */}
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow">The name</span>
          <h2>Before Artificial Intelligence, there is AbaNtu Intelligence.</h2>
          <p style={{ fontSize: "1.25rem", marginTop: "1.5rem" }}>
            <strong>AbaNtu</strong> — people. <strong>Intelligence</strong> — the ability
            to understand, adapt, create, and solve.
          </p>
          <p>
            In an era increasingly defined by Artificial Intelligence, we chose a name
            that reminds us where intelligence begins: with people.
          </p>
          <p>
            AbaNtu Intelligence is therefore both a company <em>and</em> a philosophy.
            We use technology — including AI — to amplify human capability rather than
            diminish it.
          </p>
          <blockquote style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "1.5rem", margin: "2rem 0" }}>
            <p style={{ fontSize: "1.4rem", fontWeight: "500" }}>
              “Artificial Intelligence is the technology.<br />
              AbaNtu Intelligence is the philosophy.”
            </p>
          </blockquote>
        </div>
      </section>

      {/* ===== 04 — THE HUMAN BEHIND IT ===== */}
     <section className="section section-muted">
  <div className="container">
    <SectionHeading
      eyebrow="The people behind the intelligence"
      title="Multiple intelligences, one philosophy."
    />
    <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 2.5rem auto", color: "var(--text-secondary)" }}>
      AbaNtu is founder-led and deliberately collaborative. Our leadership brings together 
      business vision and AI depth—keeping people at the centre of everything we build.
    </p>

    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
      gap: "2.5rem", 
      maxWidth: "900px", 
      margin: "0 auto" 
    }}>
      
      {/* --- FOUNDER / CEO --- */}
      <div style={{ 
        background: "var(--bg-card)", 
        padding: "2rem", 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <div style={{ 
          width: "120px", 
          height: "120px", 
          borderRadius: "50%", 
          background: "#ddd", 
          overflow: "hidden", 
          margin: "0 auto 1.25rem auto" 
        }}>
          <img
            src="/TEPP.jpeg" // Replace with actual path
            alt="Founder, Developer & Community Digital Strategist"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>Founder &amp; CEO</h3>
        <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
          Thabele Ka Plaatjie Phangalele
        </p>
        {/* --- EMAIL CHANNEL HANDLER (CEO) --- */}
        <a 
          href="mailto:hello@abantu-intelligence.com" 
          style={{ 
            display: "block", 
            textAlign: "center", 
            fontSize: "0.85rem", 
            color: "var(--primary)", 
            textDecoration: "none", 
            marginBottom: "0.75rem",
            fontWeight: "500"
          }}
        >
          ✉ hello@abantu-intelligence.com
        </a>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
          A builder at heart. Ka Plaatjie started AbaNtu Intelligence to prove that African organisations 
          don’t have to choose between affordability, dignity, and great technology. With a sharp focus 
          on product-market fit and sustainable growth, they lead the company’s vision, culture, and 
          fundraising—ensuring every solution we build solves a real, pressing problem before it tries 
          to impress anyone.
        </p>
        <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          <p><strong>Driven by</strong> — Resilience · Vision · Operational rigour · Team empowerment</p>
        </div>
      </div>

      {/* --- CHIEF AI OFFICER (CAIO) --- */}
      <div style={{ 
        background: "var(--bg-card)", 
        padding: "2rem", 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <div style={{ 
          width: "120px", 
          height: "120px", 
          borderRadius: "50%", 
          background: "#ddd", 
          overflow: "hidden", 
          margin: "0 auto 1.25rem auto" 
        }}>
          <img
            src="/caio.jfif" // Replace with actual path
            alt="Co-Founder & Chief AI Officer"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>Co-Founder &amp; Chief AI Officer (CAIO)</h3>
        <p style={{ textAlign: "center", fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
          Sibulelo Nicky Mahashana
        </p>
        {/* --- EMAIL CHANNEL HANDLER (CAIO) --- */}
        <a 
          href="mailto:ai@abantu-intelligence.com" 
          style={{ 
            display: "block", 
            textAlign: "center", 
            fontSize: "0.85rem", 
            color: "var(--primary)", 
            textDecoration: "none", 
            marginBottom: "0.75rem",
            fontWeight: "500"
          }}
        >
          ✉ ai@abantu-intelligence.com
        </a>
        <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
          The bridge between cutting-edge AI and genuine human impact. Nicky turns the 
          "AbaNtu Intelligence" philosophy into operational reality—governing ethical AI deployment, 
          mitigating bias, and ensuring every model we build amplifies human capability rather than 
          replacing it. Their focus is on making AI practical, safe, and scalable for South Africa's 
          unique education, civic, and SMME sectors.
        </p>
        <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          <p><strong>Driven by</strong> — Ethical AI · Operationalisation · Data strategy · Cultural change</p>
        </div>
      </div>

    </div>

    {/* Footer note */}
    <p style={{ 
      fontSize: "0.9rem", 
      color: "var(--text-secondary)", 
      textAlign: "center", 
      maxWidth: "600px", 
      margin: "2.5rem auto 0 auto" 
    }}>
      AbaNtu Intelligence is founder‑led and deliberately collaborative. We bring in the right technical, 
      creative, and strategic capability according to the problem we’re solving—but our leadership anchors 
      everything in trust, transparency, and a deep respect for the people we serve.
    </p>
  </div>
</section>

      {/* ===== 05 — HOW WE THINK (PRINCIPLES) ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our principles"
            title="Five principles keep technology human."
          />
          <div className="value-grid">
            {/* Replace with the new five principles */}
            {[
              ["Problem first", "Understand before building. Always start with the real need, not a predetermined solution."],
              ["People first", "Technology serves humans. Design for dignity, accessibility, and empowerment."],
              ["Appropriate technology", "Don't over‑engineer. Choose the simplest tool that genuinely solves the problem."],
              ["Build for reality", "Consider bandwidth, budgets, skills, maintenance, and the local context."],
              ["Build for tomorrow", "Create systems capable of evolving as needs and technologies change."]
            ].map(([title, text], index) => (
              <div className="value-card ai-value-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 06 — WHAT WE ACTUALLY DO ===== */}
      <section className="section section-muted">
        <div className="container narrow">
          <span className="eyebrow">Our work</span>
          <h2>Whatever the problem requires.</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 2rem", marginTop: "2rem" }}>
            <li>✓ Digital Presence</li>
            <li>✓ Platforms</li>
            <li>✓ Applications</li>
            <li>✓ Data &amp; Analytics</li>
            <li>✓ Automation</li>
            <li>✓ Artificial Intelligence</li>
            <li>✓ Infrastructure</li>
            <li>✓ Systems Integration</li>
          </ul>
          <div style={{ marginTop: "2rem", background: "var(--bg-card)", padding: "1.5rem", borderRadius: "8px" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
              Sometimes the answer is a website. Sometimes it is an application.
              Sometimes it is an information system. Sometimes it is artificial intelligence.
            </p>
            <p style={{ fontWeight: "600", marginTop: "0.5rem" }}>
              Sometimes the answer is knowing that technology isn’t the answer.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 07 — PROOF, NOT PROMISES ===== */}
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow">Portfolio</span>
          <h2>Proof, not promises.</h2>
          <p>
            We don’t want you to take our word for what we can build.
            Explore what we’ve already built.
          </p>
          {/* Link to your portfolio page */}
          <Link to="/projects" className="button" style={{ marginTop: "1.5rem", display: "inline-block" }}>
  See our work →
</Link>
        </div>
      </section>

      {/* ===== 08 — WHO WE BUILD FOR ===== */}
      <section className="section section-muted">
        <div className="container narrow">
          <span className="eyebrow">Our partners</span>
          <h2>Who we build for</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem 2.5rem", margin: "2rem 0" }}>
            {["Government", "Schools", "SMMEs", "Community organisations", "Institutions", "Individuals", "Strategic partners"].map(item => (
              <span key={item} style={{ fontWeight: "500", fontSize: "1.1rem" }}>{item}</span>
            ))}
          </div>
          <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
            <strong>You don’t have to know what technology you need.</strong><br />
            You only need to know the problem.
          </p>
        </div>
      </section>

      {/* ===== 09 — CLOSING CTA ===== */}
      <section className="section dark-section" style={{ textAlign: "center" }}>
        <div className="container narrow">
          <h2 style={{ fontSize: "2.5rem" }}>Bring us the problem.</h2>
          <p style={{ fontSize: "1.2rem", margin: "1.5rem 0" }}>
            You don’t need a perfect brief. You don’t need to understand software architecture.
            You don’t need to know whether the answer is AI, a website, an application, or something else.
          </p>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            Tell us what isn’t working. We’ll help you work out what comes next.
          </p>
          <a href="/contact" className="button button-primary">
            Start a conversation →
          </a>
        </div>
      </section>
    </main>
  );
}