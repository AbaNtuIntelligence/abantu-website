import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-image">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} website preview`}
            loading="lazy"
          />
        ) : (
          <div className="project-image-placeholder">
            <span>AbaNtu Intelligence</span>
          </div>
        )}
      </div>

      <div className="project-card-body">
        <div className="project-card-meta">
          <span className="project-card-category">
            {project.sector || project.category}
          </span>

          {project.tag && (
            <span className="project-card-tag">
              {project.tag}
            </span>
          )}
        </div>

        <h3>{project.title}</h3>

        <p className="project-summary">
          {project.summary}
        </p>

        {project.challenge && (
          <div className="project-detail">
            <strong>The challenge</strong>
            <p>{project.challenge}</p>
          </div>
        )}

        {project.solution && (
          <div className="project-detail">
            <strong>The solution</strong>
            <p>{project.solution}</p>
          </div>
        )}

        {project.strategic && (
          <div className="project-detail">
            <strong>Strategic value</strong>
            <p>{project.strategic}</p>
          </div>
        )}

        {project.technology?.length > 0 && (
          <div className="project-technologies">
            {project.technology.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        )}

        <div className="project-card-actions">
          <Link
            to={`/projects/${project.slug}`}
            className="button button-small button-secondary"
          >
            View Project
            <ArrowUpRight size={16} />
          </Link>

          {project.liveUrl && project.liveUrl !== "#" && (
  project.status === "coming-soon" ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="button button-small button-secondary"
    >
      Preview Development
    </a>
  ) : (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="button button-small button-primary"
    >
      View Live
    </a>
  )
)}
        </div>
      </div>
    </article>
  );
}