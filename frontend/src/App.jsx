import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Sectors from "./pages/Sectors";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Partnership from "./pages/Partnership";
import SocialOrbit from "./components/SocialOrbit";


export default function App() {
  return (
    <SiteLayout>

      <SocialOrbit />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </SiteLayout>
  );
}

function NotFound() {
  return (
    <main className="page">
      <section className="container narrow center">
        <span className="eyebrow">404</span>
        <h1>We couldn't find that page.</h1>
        <p>Return to the AbaNtu Intelligence home page and continue exploring our work.</p>
        <a className="button button-primary" href="/">Return home</a>
      </section>
    </main>
  );
}