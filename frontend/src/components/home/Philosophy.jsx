import { values } from "../../data/site";

export default function Philosophy() {
  return (
    <section className="section dark-section">
      <div className="container split">
        <div>
          <span className="eyebrow">The AbaNtu approach</span>
          <h2>Appropriate technology is powerful technology.</h2>
          <p>We care about what happens after launch: who can use the system, who can maintain it, what it costs to operate and how it can evolve.</p>
        </div>
        <div className="value-list">
          {values.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}