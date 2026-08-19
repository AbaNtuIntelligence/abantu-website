import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="tag">{project.tag}</span>
        <span className="project-sector">{project.sector}</span>
      </div>
      <div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <Link to={`/projects/${project.slug}`} className="text-link">View case study →</Link>
    </article>
  );
}