import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">

      <div className="project-card-image">
        <img
          src={project.image || "/projects/project-placeholder.jpg"}
          alt={`${project.title} website preview`}
          loading="lazy"
        />
      </div>

      <div className="project-card-body">

        <div className="project-card-meta">
          <span className="project-card-tag">
            {project.tag}
          </span>

          <span className="project-card-sector">
            {project.sector}
          </span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.summary}</p>

        <Link
          to={`/projects/${project.slug}`}
          className="project-card-link"
        >
          View case study
          <ArrowUpRight size={16} />
        </Link>

      </div>

    </article>
  );
}