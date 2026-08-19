import Button from "../components/ui/Button";

export default function Partnership() {
  return (
    <main className="page">
      <section className="dark-section partnership-hero">
        <div className="container narrow">
          <span className="eyebrow">Partnership & investment</span>
          <h1>Let's build digital infrastructure that can outlive a single project.</h1>
          <p>We are interested in strategic relationships with government, institutions, development organisations, technology partners and investors who see long-term value in African digital systems.</p>
          <Button to="/contact">Open a conversation</Button>
        </div>
      </section>
      <section className="section">
        <div className="container value-grid">
          <div className="value-card"><h3>Government & public institutions</h3><p>Explore practical digital transformation, citizen information systems and education infrastructure.</p></div>
          <div className="value-card"><h3>Development partners</h3><p>Collaborate on digital inclusion, capacity building and scalable community-facing platforms.</p></div>
          <div className="value-card"><h3>Technology partners</h3><p>Combine specialist capabilities to deliver stronger systems for organisations that need them.</p></div>
          <div className="value-card"><h3>Investors</h3><p>Explore productised platforms and reusable infrastructure emerging from real operational problems.</p></div>
        </div>
      </section>
    </main>
  );
}