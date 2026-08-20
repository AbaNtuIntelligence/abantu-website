import SectionHeading from "../components/ui/SectionHeading";
import { services } from "../data/site";

export default function Services() {
  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Applied intelligence</span>
        <h1>We use the right layer of technology for the problem.</h1>
        <p>Not every problem needs AI. Not every problem needs a website. Our job is to understand the system and build the appropriate digital capability—from identity and information architecture to intelligent automation and full platforms.</p>
      </div>
      <section className="section">
        <div className="container service-grid">
          {services.map((service, i) => (
            <article className="service-card ai-service-card" key={service.title}>
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
