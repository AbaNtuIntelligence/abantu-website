import { sectors } from "../data/site";

export default function Sectors() {
  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Intelligence across sectors</span>
        <h1>Different problems. The same A.I. principle.</h1>
        <p>Every sector has its own language, constraints and people. We design around those realities, then decide where digital systems, data, automation and artificial intelligence can create meaningful capability.</p>
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
