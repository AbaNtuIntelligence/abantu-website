import { useCallback } from "react";
import { projects as localProjects } from "../data/site";
import ProjectCard from "../components/ui/ProjectCard";
import useApiResource from "../hooks/useApiResource";
import { getProjects } from "../services/projects";

export default function Projects() {
  const loader = useCallback(() => getProjects(), []);
  const { data, loading } = useApiResource(loader, null);

  const apiItems = Array.isArray(data)
    ? data
    : data?.results;

  const items = apiItems?.length
    ? apiItems
    : localProjects;

  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Our work</span>

        <h1>Evidence of what we can build.</h1>

        <p>
          Selected projects and platform concepts developed across
          employment, education, commerce, civic technology and property.
        </p>

        {loading && (
          <small className="api-note">
            Loading live portfolio data… showing the local portfolio
            catalogue until the API responds.
          </small>
        )}
      </div>

      <section className="section">
        <div className="container project-grid project-grid-large">
          {items.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </section>
    </main>
  );
}