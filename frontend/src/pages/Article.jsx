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

  if (!article) return <main className="page"><div className="container narrow center"><h1>Article not found.</h1><Link className="text-link" to="/blog">Back to insights →</Link></div></main>;

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
            <p>This insight is being developed as part of the AbaNtu Intelligence knowledge platform.</p>
            <p>Our aim is to document practical lessons from designing and building digital systems for African organisations, institutions and communities.</p>
            <p>When the Django publishing API is connected, this page will render the full article authored and published through the administrative CMS.</p>
          </div>
        )}
      </article>
    </main>
  );
}