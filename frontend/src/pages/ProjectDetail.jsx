import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { projects as localProjects } from "../data/site";
import useApiResource from "../hooks/useApiResource";
import { getProject } from "../services/projects";

export default function ProjectDetail() {
  const { slug } = useParams();

  const loader = useCallback(
    () => getProject(slug),
    [slug]
  );

  const { data, loading } = useApiResource(loader, null);

  const localProject = localProjects.find(
    (project) => project.slug === slug
  );

  const project = data || localProject;

  if (loading && !project) {
    return (
      <main className="page">
        <div className="container page-intro">
          <p>Loading project…</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="page">
        <div className="container page-intro">
          <span className="eyebrow">Our work</span>
          <h1>Project not found.</h1>
          <Link to="/projects">
            Back to our work →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page project-detail-page">
      <div className="container">
        <Link to="/projects" className="back-link">
          ← Back to our work
        </Link>

        <div className="project-detail-hero">
          <span className="eyebrow">
            {project.sector || project.category}
          </span>

          <h1>{project.title}</h1>

          <p>{project.summary}</p>

          {project.image && (
            <div className="project-detail-image">
              <img
                src={project.image}
                alt={`${project.title} website preview`}
              />
            </div>
          )}
        </div>

        <div className="project-detail-content">
          {(project.challenge || project.problem) && (
            <section>
              <h2>The challenge</h2>
              <p>{project.challenge || project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2>The solution</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {(project.strategic || project.outcome) && (
            <section>
              <h2>The outcome</h2>
              <p>{project.strategic || project.outcome}</p>
            </section>
          )}

          {project.technology?.length > 0 && (
            <section>
              <h2>Technology</h2>

              <div className="project-technologies">
                {project.technology.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              View Live Website ↗
            </a>
          )}
        </div>
      </div>
    </main>
  );
}