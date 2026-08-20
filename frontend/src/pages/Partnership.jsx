import Button from "../components/ui/Button";

export default function Partnership() {
  return (
    <main className="page">
      <section className="dark-section partnership-hero ai-partnership-hero">
        <div className="container narrow">
          <span className="eyebrow">Partnership · A.I. · African digital infrastructure</span>
          <h1>Build systems where human intelligence and technology compound.</h1>
          <p>We are interested in strategic relationships with government, institutions, development organisations, technology partners, businesses and investors who see digital infrastructure as a long-term capability rather than a one-off project.</p>
          <Button to="/contact">Open a conversation</Button>
        </div>
      </section>
      <section className="section">
        <div className="container value-grid">
          <div className="value-card"><h3>Build with us</h3><p>Bring a real operational problem and explore what an intelligent digital system could make possible.</p></div>
          <div className="value-card"><h3>Scale with us</h3><p>Help turn proven solutions into reusable products and infrastructure for wider African markets.</p></div>
          <div className="value-card"><h3>Integrate with us</h3><p>Combine specialist technology, domain expertise and implementation capacity to deliver stronger systems.</p></div>
          <div className="value-card"><h3>Invest in the future</h3><p>Support products and platforms emerging from real problems, real users and a growing intelligence-led digital ecosystem.</p></div>
        </div>
      </section>
    </main>
  );
}
