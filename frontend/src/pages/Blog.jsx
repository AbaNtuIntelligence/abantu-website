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
        <span className="eyebrow">Intelligence in public</span>
        <h1>Ideas from the work, the world and the systems between them.</h1>
        <p>Perspectives on artificial intelligence, human intelligence, digital transformation, education, SMME digitalisation, civic technology and the realities of building in Africa.</p>
        {loading && <small className="api-note">Loading published insights… showing the local knowledge catalogue until the publishing API responds.</small>}
      </div>
      <section className="section">
        <div className="container insight-grid insight-grid-large">
          {items.map((item) => (
            <article className="insight-card" key={item.slug}>
              <span className="tag">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt || item.summary}</p>
              <Link className="text-link" to={`/blog/${item.slug}`}>Read insight →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
