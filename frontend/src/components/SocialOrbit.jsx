import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SocialOrbit.css";

/*
|--------------------------------------------------------------------------
| SOCIAL LINKS
|--------------------------------------------------------------------------
| Replace the placeholder URLs below with your real company profiles.
|--------------------------------------------------------------------------
*/

const socialLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    short: "in",
    description: "Connect with us",
    url: "https://www.linkedin.com/company/YOUR-COMPANY",
    type: "linkedin",
  },

  {
    id: "github",
    name: "GitHub",
    short: "GH",
    description: "Explore our code",
    url: "https://github.com/YOUR-COMPANY",
    type: "github",
  },

  {
    id: "youtube",
    name: "YouTube",
    short: "▶",
    description: "Watch our work",
    url: "https://www.youtube.com/@YOUR-COMPANY",
    type: "youtube",
  },

  {
    id: "x",
    name: "X",
    short: "𝕏",
    description: "Follow our updates",
    url: "https://x.com/YOUR-COMPANY",
    type: "x",
  },

  {
    id: "instagram",
    name: "Instagram",
    short: "◎",
    description: "See our visual world",
    url: "https://www.instagram.com/YOUR-COMPANY",
    type: "instagram",
  },

  {
    id: "whatsapp",
    name: "WhatsApp",
    short: "WA",
    description: "Start a conversation",
    url: "https://wa.me/27730862149",
    type: "whatsapp",
  },
];
/*
|--------------------------------------------------------------------------
| ICON
|--------------------------------------------------------------------------
*/

const SocialIcon = ({ type }) => {
  switch (type) {
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <path
            fill="currentColor"
            d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.25 7 2 2 0 0 0 5.25 3ZM20.44 13.4c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.09-3.38 1.86V8.5H9.36V20h3.38v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.72 1.86 3.05V20h3.38l.32-6.6Z"
          />
        </svg>
      );

    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <path
            fill="currentColor"
            d="M12 .7A11.3 11.3 0 0 0 8.43 22.9c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.34-3.8-1.34-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.7 2.63 1.21 3.27.93.1-.72.39-1.21.71-1.49-2.5-.28-5.13-1.25-5.13-5.55 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.17-1.46 3.12-1.16 3.12-1.16.61 1.55.23 2.69.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.31-2.63 5.26-5.14 5.54.4.35.76 1.04.76 2.1v3.12c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z"
          />
        </svg>
      );

    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <path
            fill="currentColor"
            d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.4 3.8-6.4 3.8Z"
          />
        </svg>
      );

    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <path
            fill="currentColor"
            d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.87h1.73L8.48 4.02H6.62L17.8 19.87Z"
          />
        </svg>
      );

    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="social-orbit-svg"
        >
          <path
            fill="currentColor"
            d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.55 0 .23 5.32.23 11.87c0 2.09.55 4.13 1.59 5.93L.12 24l6.35-1.66a11.85 11.85 0 0 0 5.62 1.43h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.47-8.4ZM12.1 21.7h-.01a9.82 9.82 0 0 1-5-1.36l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.84 9.84 0 1 1 8.36 4.63Zm5.4-7.37c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"
          />
        </svg>
      );

    default:
      return null;
  }
};

/*
|--------------------------------------------------------------------------
| CONNECT ICON
|--------------------------------------------------------------------------
*/

const ConnectIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="connect-orbit-icon"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 15.5 15.5 8.5M7 7h4M17 17h-4M7 7v4M17 17v-4"
    />
    <circle
      cx="7"
      cy="7"
      r="2"
      fill="currentColor"
    />
    <circle
      cx="17"
      cy="17"
      r="2"
      fill="currentColor"
    />
  </svg>
);

/*
|--------------------------------------------------------------------------
| SOCIAL ORBIT
|--------------------------------------------------------------------------
*/

const SocialOrbit = () => {
  const [active, setActive] = useState(null);

  const handleEnter = (id) => {
    setActive(id);
  };

  const handleLeave = () => {
    setActive(null);
  };

  return (
    <aside
      className="social-orbit"
      aria-label="Social media and contact links"
      onMouseLeave={handleLeave}
    >
      {/* Decorative vertical label */}
      <div className="social-orbit-label">
        <span className="social-orbit-label-line" />
        <span className="social-orbit-label-text">
          CONNECT
        </span>
      </div>

      <div className="social-orbit-rail">

        {/* Top connection action */}
        <Link
  to="/contact"
  className="social-orbit-connect"
  aria-label="Start a conversation"
  onMouseEnter={() => handleEnter("connect")}
>
  <span className="social-orbit-connect-icon">
    <ConnectIcon />
  </span>

  <span className="social-orbit-tooltip">
    Start a conversation
  </span>
</Link>

        <div className="social-orbit-divider" />

        {/* Social network links */}
        <div className="social-orbit-links">
          {socialLinks.map((social, index) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-orbit-item social-orbit-${social.type} ${
                active === social.id ? "is-active" : ""
              }`}
              style={{
                "--orbit-index": index,
              }}
              aria-label={`${social.name}: ${social.description}`}
              onMouseEnter={() => handleEnter(social.id)}
            >
              <span className="social-orbit-icon">
                <SocialIcon type={social.type} />
              </span>

              <span className="social-orbit-name">
                {social.name}
              </span>

              <span className="social-orbit-description">
                {social.description}
              </span>
            </a>
          ))}
        </div>

        <div className="social-orbit-divider" />

        {/* Direct communication */}
        <a
          href="https://wa.me/27664374898"
          target="_blank"
          rel="noopener noreferrer"
          className="social-orbit-direct"
          aria-label="Contact us directly on WhatsApp"
          onMouseEnter={() => handleEnter("whatsapp-direct")}
        >
          <span className="social-orbit-direct-pulse" />

          <span className="social-orbit-direct-icon">
            <SocialIcon type="whatsapp" />
          </span>

          <span className="social-orbit-direct-text">
            <strong>DIRECT</strong>
            <small>WhatsApp</small>
          </span>

          <span className="social-orbit-direct-arrow">
            ↗
          </span>
        </a>

      </div>

      {/* Ambient glow */}
      <div className="social-orbit-ambient" />
    </aside>
  );
};

export default SocialOrbit;