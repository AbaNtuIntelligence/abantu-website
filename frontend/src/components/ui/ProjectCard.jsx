import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card project-card-rich">
      <div className="project-card-image">
        <img
          src={project.image || "/projects/project-placeholder.jpg"}
          alt={`${project.title} digital interface preview`}
          loading="lazy"
        />

        <span className="project-card-image-label">
          {project.status === "coming-soon"
            ? "In development"
            : project.status === "needs-verification"
              ? "Live link pending"
              : "Digital system"}
        </span>
      </div>

      <div className="project-card-body">
        <div className="project-card-top">
          <span className="tag">{project.tag || "Platform"}</span>
          <span className="project-sector">{project.sector}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="project-card-actions">
          <Link
            className="button button-small button-secondary"
            to={`/projects/${project.slug}`}
          >
            View case study
          </Link>
        </div>
      </div>
    </article>
  );
}
