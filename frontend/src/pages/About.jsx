import SectionHeading from "../components/ui/SectionHeading";
import { aiPhilosophy, values } from "../data/site";

export default function About() {
  return (
    <main className="page">
      <div className="container narrow page-intro">
        <span className="eyebrow">About AbaNtu Intelligence</span>
        <h1>We are building a company where A.I. means more than artificial intelligence.</h1>
        <p>{aiPhilosophy.lead}</p>
      </div>

      <section className="section dark-section">
        <div className="container split ai-about-split">
          <div>
            <span className="eyebrow">Our identity</span>
            <h2>AbaNtu means people. Intelligence gives the name its direction.</h2>
          </div>
          <div>
            <p className="large-copy">Artificial intelligence is one of the defining technologies of this era. But the organisations and communities we work with already contain enormous intelligence: experience, relationships, institutional memory, creativity and local knowledge.</p>
            <p>Our role is to connect that intelligence with technology. Sometimes that means a website. Sometimes it means a full platform, an information system, an automated workflow or an AI-enabled product. The medium changes. The purpose does not.</p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow="The A.I. standard" title="Five principles keep technology human." />
          <div className="value-grid">
            {values.map(([title, text], index) => (
              <div className="value-card ai-value-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
