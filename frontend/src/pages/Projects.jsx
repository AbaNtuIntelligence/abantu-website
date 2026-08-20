import { useCallback } from "react";
import { projects as localProjects } from "../data/site";
import ProjectCard from "../components/ui/ProjectCard";
import useApiResource from "../hooks/useApiResource";
import { getProjects } from "../services/projects";

export default function Projects() {
  const loader = useCallback(() => getProjects(), []);
  const { data, loading } = useApiResource(loader, null);
  const apiItems = Array.isArray(data) ? data : data?.results;
  const items = apiItems?.length ? apiItems : localProjects;

  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Intelligence in practice</span>
        <h1>Not just websites. Digital capability.</h1>
        <p>Our portfolio demonstrates the range of systems AbaNtu Intelligence can build: institutional platforms, commerce engines, personal digital identities, education ecosystems, civic interfaces, business software and products still taking shape.</p>
        {loading && <small className="api-note">Loading live portfolio data… showing the local portfolio catalogue until the API responds.</small>}
      </div>
      <section className="section">
        <div className="container project-grid project-grid-large">
          {items.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
    </main>
  );
}
