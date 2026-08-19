import SectionHeading from "../components/ui/SectionHeading";
import { sectors } from "../data/site";

export default function Sectors() {
  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Sectors</span>
        <h1>Technology where institutional and human needs meet.</h1>
        <p>We focus on sectors where better digital infrastructure can improve access, operations, opportunity and organisational capacity.</p>
      </div>
      <section className="section">
        <div className="container sector-grid sector-grid-large">
          {sectors.map((sector, index) => (
            <article className="sector-card" key={sector.title}>
              <span>0{index + 1}</span>
              <h2>{sector.title}</h2>
              <p>{sector.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}