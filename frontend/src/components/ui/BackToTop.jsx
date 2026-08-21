import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "var(--primary, #1e2a3a)",
        color: "#fff",
        border: "2px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        transition: "opacity 0.35s ease, transform 0.3s ease, box-shadow 0.25s ease",
        pointerEvents: isVisible ? "auto" : "none",
        zIndex: 999,
        padding: "12px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img
        src="/images/logo-icon.svg"
        alt="AbaNtu Intelligence"
        style={{
          width: "70%",
          height: "70%",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
        onError={(e) => {
          e.target.style.display = "none";
          document.getElementById("back-to-top-fallback").style.display = "flex";
        }}
      />
      <span
        id="back-to-top-fallback"
        style={{
          display: "none",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          lineHeight: 1,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "28px", height: "28px", marginBottom: "2px" }}
        >
          <path d="M12 5v14M5 12l7-7 7 7" />
        </svg>
        <span style={{ fontSize: "0.45rem", fontWeight: "700", letterSpacing: "0.1em" }}>
          AbaNtu
        </span>
      </span>
    </button>
  );
}