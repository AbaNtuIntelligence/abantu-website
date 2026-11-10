import { aiPhilosophy } from "../../data/site";

export default function Impact() {
  return (
    <section className="section ai-impact">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">How intelligence becomes infrastructure</span>
          <h2>We don't start with AI. We start with understanding.</h2>
          <p>Then we decide where software, data, automation and artificial intelligence can make the greatest difference.</p>
        </div>
        <div className="three-grid">
          {aiPhilosophy.flow.slice(0, 3).map(([number, title, text]) => (
            <article className="principle ai-principle" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
