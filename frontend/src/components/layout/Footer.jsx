import { Link } from "react-router-dom";
import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand" aria-label="AbaNtu Intelligence home">
            <div className="brand-logo">
              <img
                src="/logo.png"
                alt="AbaNtu Intelligence"
              />
            </div>

            <span className="brand-text">
              <strong>AbaNtu</strong>
              <small>INTELLIGENCE</small>
            </span>
          </Link>

          <p>
            Digital systems for people, institutions and opportunity.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/about">About</Link>
          <Link to="/projects">Our Work</Link>
          <Link to="/services">Services</Link>
          <Link to="/blog">Insights</Link>
        </div>

        <div>
          <h4>Engage</h4>
          <Link to="/partnership">Partnership</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
            {site.phone}
          </a>
          <span>{site.location}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} AbaNtu Intelligence. All rights reserved.
        </span>
        <span>Built in South Africa.</span>
      </div>
    </footer>
  );
}