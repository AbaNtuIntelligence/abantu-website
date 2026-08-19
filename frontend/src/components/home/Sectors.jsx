import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { sectors } from "../../data/site";

export default function Sectors() {
  return (
    <section className="section section-muted">
      <div className="container">
        <SectionHeading eyebrow="Where we work" title="Digital infrastructure across sectors." text="Our work sits where technology meets institutional, commercial and community needs." />
        <div className="sector-grid">
          {sectors.map((sector, index) => (
            <div className="sector-card" key={sector.title}>
              <span>0{index + 1}</span>
              <h3>{sector.title}</h3>
              <p>{sector.text}</p>
            </div>
          ))}
        </div>
        <Link className="text-link" to="/sectors">Explore sectors →</Link>
      </div>
    </section>
  );
}