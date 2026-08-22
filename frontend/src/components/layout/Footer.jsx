import { Link } from "react-router-dom";
import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* --- Main Footer Content (Flex/Grid Layout) --- */}
        <div className="footer-grid">
          
          {/* Brand Section */}
          <div className="footer-brand-section">
           <Link to="/" className="brand" onClick={() => setOpen(false)}>
  <div className="brand-logo">
    <img
      src="/logo.png"
      alt="AbaNtu Intelligence"
    />
  </div>

   <span className="brand-text">
    <small> A.I. </small><strong>| AbaNtu </strong><small>Intelligence™</small>
    </span>
</Link>
            <p className="footer-ai-line">A.I. — human intelligence amplified by technology.</p>
          </div>

          {/* Explore Section */}
          <div className="footer-links-section">
            <h4>Explore</h4>
            <Link to="/about">Our Philosophy</Link>
            <Link to="/projects">Intelligence in Practice</Link>
            <Link to="/services">Applied Intelligence</Link>
            <Link to="/blog">Insights</Link>
          </div>

          {/* Engage Section */}
          <div className="footer-links-section">
            <h4>Engage</h4>
            <Link to="/partnership">Partnership</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Contact Section */}
          <div className="footer-contact-section">
            <h4>Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <span>{site.location}</span>
          </div>
        </div>

        {/* --- Footer Bottom (Flex Row) --- */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AbaNtu Intelligence. All rights reserved.</span>
          <span className="footer-tagline">Without Problems · We're out of Business</span>
          <span className="footer-values">People · Intelligence · Systems · Impact</span>
        </div>
      </div>
    </footer>
  );
}