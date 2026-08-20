import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { insights } from "../../data/site";

export default function Insights() {
  return (
    <section className="section section-muted">
      <div className="container">
        <SectionHeading eyebrow="Intelligence in public" title="Ideas for a more intelligent digital future." text="We document what we learn about people, technology, institutions, AI and digital transformation in the real world." />
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
