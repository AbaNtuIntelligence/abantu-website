import { Link } from "react-router-dom";

export default function MobileMenu({ links, onClose }) {
  return (
    <div className="mobile-menu">
      {links.map(([href, label]) => (
        <Link key={href} to={href} onClick={onClose}>{label}</Link>
      ))}
      <Link className="button button-primary" to="/contact" onClick={onClose}>Start a Conversation</Link>
    </div>
  );
}