import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { insights } from "../../data/site";

export default function Insights() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="AbaNtu Intelligence Insights" title="We build in public through ideas." text="Perspectives on African digital transformation, education technology, SMME digitalisation and civic systems." />
        <div className="insight-grid">
          {insights.slice(0, 3).map((item) => (
            <article className="insight-card" key={item.slug}>
              <span className="tag">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <Link className="text-link" to={`/blog/${item.slug}`}>Read insight →</Link>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/blog">All insights →</Link>
      </div>
    </section>
  );
}