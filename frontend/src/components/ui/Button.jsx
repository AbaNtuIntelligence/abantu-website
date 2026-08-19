import { Link } from "react-router-dom";

export default function Button({ children, to, href, variant = "primary", className = "" }) {
  const classes = `button button-${variant} ${className}`.trim();
  if (to) return <Link className={classes} to={to}>{children}</Link>;
  if (href) return <a className={classes} href={href}>{children}</a>;
  return <button className={classes}>{children}</button>;
}