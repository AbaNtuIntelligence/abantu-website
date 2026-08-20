import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { sectors } from "../../data/site";

export default function Sectors() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Where intelligence meets reality" title="One philosophy. Many environments." text="The problems change by sector. Our approach remains the same: understand context, structure intelligence and build technology that creates capability." />
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
