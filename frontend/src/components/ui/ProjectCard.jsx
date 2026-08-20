import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const hasLive = project.liveUrl && project.liveUrl !== "#";
  return (
    <article className="project-card project-card-rich">
      <div className="project-card-image">
        <img src={project.image || "/projects/project-placeholder.jpg"} alt={`${project.title} digital interface preview`} loading="lazy" />
        <span className="project-card-image-label">{project.status === "coming-soon" ? "In development" : "Digital system"}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <span className="tag">{project.tag || "Platform"}</span>
          <span className="project-sector">{project.sector}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card-actions">
          <Link className="button button-small button-secondary" to={`/projects/${project.slug}`}>View case study →</Link>
          {hasLive && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`button button-small ${project.status === "coming-soon" ? "button-secondary" : "button-primary"}`}>
              {project.status === "coming-soon" ? "Preview Development" : "View Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
