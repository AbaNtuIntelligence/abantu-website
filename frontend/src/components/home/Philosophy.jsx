import { aiPhilosophy } from "../../data/site";

export default function Philosophy() {
  return (
    <section className="section dark-section ai-philosophy">
      <div className="container">
        <div className="ai-philosophy-intro">
          <div>
            <span className="eyebrow">{aiPhilosophy.label}</span>
            <h2>{aiPhilosophy.title}</h2>
          </div>
          <div>
            <p className="large-copy">{aiPhilosophy.lead}</p>
            <p>{aiPhilosophy.statement}</p>
          </div>
        </div>

        <div className="ai-flow" aria-label="AbaNtu Intelligence philosophy">
          {aiPhilosophy.flow.map(([number, title, text], index) => (
            <div className="ai-flow-item" key={number}>
              <div className="ai-flow-number">{number}</div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < aiPhilosophy.flow.length - 1 && <span className="ai-flow-arrow">→</span>}
            </div>
          ))}
        </div>

        <div className="ai-manifesto">
          <span>A.I. / OUR POSITION</span>
          <strong>Artificial intelligence is the technology. AbaNtu Intelligence is the philosophy.</strong>
        </div>
      </div>
    </section>
  );
}
