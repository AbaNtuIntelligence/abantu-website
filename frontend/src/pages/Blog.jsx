import { useCallback } from "react";
import { Link } from "react-router-dom";
import { insights as localInsights } from "../data/site";
import useApiResource from "../hooks/useApiResource";
import { getArticles } from "../services/blog";

export default function Blog() {
  const loader = useCallback(() => getArticles(), []);
  const { data, loading } = useApiResource(loader, null);
  const apiItems = Array.isArray(data) ? data : data?.results;
  const items = apiItems?.length ? apiItems : localInsights;

  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Insights</span>
        <h1>Ideas behind the systems we build.</h1>
        <p>Research, practical perspectives and lessons from building digital products in an African context.</p>
        {loading && <small className="api-note">Live publishing API will take over automatically when available.</small>}
      </div>
      <section className="section">
        <div className="container insight-grid insight-grid-large">
          {items.map((item) => (
            <article className="insight-card" key={item.slug}>
              <span className="tag">{item.category || "AbaNtu Intelligence"}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt || item.summary}</p>
              <Link className="text-link" to={`/blog/${item.slug}`}>Read article →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}