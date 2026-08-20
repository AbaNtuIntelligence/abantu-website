import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { insights as localInsights } from "../data/site";
import useApiResource from "../hooks/useApiResource";
import { getArticle } from "../services/blog";

export default function Article() {
  const { slug } = useParams();
  const local = localInsights.find((item) => item.slug === slug);
  const loader = useCallback(() => getArticle(slug), [slug]);
  const { data } = useApiResource(loader, null);
  const article = data || local;

  if (!article) return <main className="page"><div className="container narrow center"><h1>Insight not found.</h1><Link className="text-link" to="/blog">Back to insights →</Link></div></main>;

  return (
    <main className="page">
      <article className="container article">
        <span className="eyebrow">{article.category || "AbaNtu Intelligence"}</span>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.excerpt || article.summary}</p>
        {article.content ? (
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <div className="article-body">
            {article.scenario && <><h2>The real-world scenario</h2><p>{article.scenario}</p></>}
            {article.problem && <><h2>The intelligence gap</h2><p>{article.problem}</p></>}
            {article.perspective && <><h2>Our perspective</h2><p>{article.perspective}</p></>}
            {article.takeaway && <><h2>The takeaway</h2><p>{article.takeaway}</p></>}
            <div className="article-cms-note">
              <strong>A.I. in practice</strong>
              <p>When the Django publishing API is connected, this page will render the full article authored and published through the administrative CMS. The local catalogue currently provides the same real-world editorial structure so the experience is complete before the publishing layer is connected.</p>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
