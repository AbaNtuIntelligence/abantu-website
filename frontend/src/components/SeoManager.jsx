import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ROOT = "https://abantu-intelligence.co.za";
const pages = {
  "/": ["AbaNtu Intelligence | Software Development South Africa", "AbaNtu Intelligence builds custom software, websites, business applications and digital solutions for organisations in South Africa."],
  "/about": ["About AbaNtu Intelligence | Digital Problem Solvers", "Learn about AbaNtu Intelligence and our approach to software engineering and practical digital solutions."],
  "/services": ["Software Development Services | AbaNtu Intelligence", "Explore custom software, website development, integrations and digital business solutions from AbaNtu Intelligence."],
  "/sectors": ["Industries & Sectors | AbaNtu Intelligence", "Discover the sectors supported by AbaNtu Intelligence through software and digital technology."],
  "/projects": ["Software Projects & Portfolio | AbaNtu Intelligence", "Explore software, website and digital platform projects from AbaNtu Intelligence."],
  "/blog": ["Technology Insights & Articles | AbaNtu Intelligence", "Read insights on software engineering, digital products and technology from AbaNtu Intelligence."],
  "/contact": ["Contact AbaNtu Intelligence | Software Enquiries", "Contact AbaNtu Intelligence to discuss your software, website or digital business project."],
  "/partnership": ["Technology Partnerships | AbaNtu Intelligence", "Explore collaboration and technology partnership opportunities with AbaNtu Intelligence."],
};
function upsertMeta(attribute, key, content) {
  let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!node) { node = document.createElement("meta"); node.setAttribute(attribute, key); document.head.appendChild(node); }
  node.setAttribute("content", content);
}
export default function SeoManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const known = Object.prototype.hasOwnProperty.call(pages, path);
    const project = /^\/projects\/[^/]+$/.test(path);
    const article = /^\/blog\/[^/]+$/.test(path);
    const [title, description] = pages[path] || (project
      ? ["Project Details | AbaNtu Intelligence", "Explore a digital project by AbaNtu Intelligence."]
      : article ? ["Technology Article | AbaNtu Intelligence", "Read a technology article from AbaNtu Intelligence."]
      : ["Page Not Found | AbaNtu Intelligence", "The requested page could not be found."]);
    const canonical = ROOT + (path === "/" ? "/" : path);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", known || project || article ? "index,follow" : "noindex,follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [pathname]);
  return null;
}
