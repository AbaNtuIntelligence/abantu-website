import SectionHeading from "../components/ui/SectionHeading";
import { services } from "../data/site";

export default function Services() {
  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Capabilities</span>
        <h1>From strategy to deployed digital systems.</h1>
        <p>We work across the full product lifecycle: understanding the problem, designing the experience, engineering the platform and supporting the path to production.</p>
      </div>
      <section className="section">
        <div className="container service-grid">
          {services.map((service, i) => (
            <article className="service-card" key={service.title}>
              <span>0{i + 1}</span>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}