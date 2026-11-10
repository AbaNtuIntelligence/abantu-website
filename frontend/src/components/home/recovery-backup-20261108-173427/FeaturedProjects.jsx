import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/site";

export default function FeaturedProjects() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Intelligence in practice" title="We build what the problem requires." text="From employment and education to commerce, civic systems, personal development and business software, our portfolio shows that digital capability is not limited to one type of website." />
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
        <Link className="text-link" to="/projects">Explore the full portfolio →</Link>
      </div>
    </section>
  );
}
