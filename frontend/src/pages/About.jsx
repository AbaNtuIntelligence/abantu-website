import SectionHeading from "../components/ui/SectionHeading";
import { values } from "../data/site";

export default function About() {
  return (
    <main className="page">
      <div className="container narrow page-intro">
        <span className="eyebrow">About AbaNtu Intelligence</span>
        <h1>We believe technology should expand people's ability to participate.</h1>
        <p>Our work began with a simple question: what can practical technology do for organisations and communities that are often poorly served by conventional digital solutions?</p>
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="Our position" title="From digital presence to digital capability." />
          </div>
          <div>
            <p className="large-copy">We design websites, web applications and information systems—but the deliverable is never just software. The goal is improved access, clearer information, better workflows, stronger institutional capability and a foundation for future growth.</p>
            <p>Our portfolio reflects that progression: employment platforms, education infrastructure, product-data systems, commerce, municipal information and property technology.</p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow="How we think" title="Five principles guide the work." />
          <div className="value-grid">
            {values.map(([title, text]) => <div className="value-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}