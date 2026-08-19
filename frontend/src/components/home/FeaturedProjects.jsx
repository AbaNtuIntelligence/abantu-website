import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/site";

export default function FeaturedProjects() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Selected work" title="We build platforms, not just pages." text="Our recent work spans employment, education, commerce, civic technology and property systems." />
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
        <Link className="text-link" to="/projects">See the full portfolio →</Link>
      </div>
    </section>
  );
}