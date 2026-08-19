import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const links = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/sectors", "Sectors"],
  ["/projects", "Our Work"],
  ["/blog", "Insights"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
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

        <nav className="desktop-nav">
          {links.map(([href, label]) => (
            <NavLink key={href} to={href} className={({ isActive }) => isActive ? "active" : ""}>
              {label}
            </NavLink>
          ))}
          <Link className="button button-small button-primary" to="/contact">Start a Conversation</Link>
        </nav>

        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      {open && <MobileMenu links={links} onClose={() => setOpen(false)} />}
    </header>
  );
}