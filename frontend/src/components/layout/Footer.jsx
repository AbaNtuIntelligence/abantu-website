import { Link } from "react-router-dom";
import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand" aria-label="AbaNtu Intelligence home">
            <div className="brand-logo">
  <img src="/logo.png" alt="AbaNtu Intelligence" />
  <span className="brand-trademark">™</span>
</div>
            <span className="brand-text">
    <small> A.I. </small>
    <strong>| AbaNtu </strong>
    <small>Intelligence™</small>
  </span>
          </Link>
          <p className="footer-ai-line">A.I. — human intelligence amplified by technology.</p>
        </div>
        <div><h4>Explore</h4><Link to="/about">Our Philosophy</Link><Link to="/projects">Intelligence in Practice</Link><Link to="/services">Applied Intelligence</Link><Link to="/blog">Insights</Link></div>
        <div><h4>Engage</h4><Link to="/partnership">Partnership</Link><Link to="/contact">Contact</Link></div>
        <div><h4>Contact</h4><a href={`mailto:${site.email}`}>{site.email}</a><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a><span>{site.location}</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} AbaNtu Intelligence. All rights reserved.</span><span>People · Intelligence · Systems · Impact</span></div>
    </footer>
  );
}
