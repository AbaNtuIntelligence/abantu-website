import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        /* =====================================================
           BACK TO TOP
           ===================================================== */

        .back-to-top-wrapper {
          position: fixed;
          right: 2rem;
          bottom: 2rem;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transform: translateY(12px);

          transition:
            opacity 0.3s ease,
            visibility 0.3s ease,
            transform 0.3s ease;
        }

        .back-to-top-wrapper.visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateY(0);
        }


        /* =====================================================
           BUTTON
           ===================================================== */

        .back-to-top-button {
          position: relative;

          width: 60px;
          height: 60px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 12px;

          border: 2px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;

          background: var(--primary, #1e2a3a);
          color: #ffffff;

          cursor: pointer;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.25);

          transform: scale(1);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .back-to-top-button:hover {
          transform: scale(1.06);

          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.35);
        }

        .back-to-top-button:active {
          transform: scale(0.96);
        }

        .back-to-top-button:focus-visible {
          outline: 3px solid rgba(30, 42, 58, 0.35);
          outline-offset: 4px;
        }


        /* =====================================================
           LOGO
           ===================================================== */

        .back-to-top-logo {
          width: 100%;
          height: 100%;

          object-fit: contain;

          filter: brightness(0) invert(1);

          transition: transform 0.25s ease;
        }

        .back-to-top-button:hover .back-to-top-logo {
          transform: scale(1.05);
        }


        /* =====================================================
           FALLBACK LOGO
           ===================================================== */

        .back-to-top-fallback {
          display: flex;

          width: 100%;
          height: 100%;

          align-items: center;
          justify-content: center;

          flex-direction: column;

          line-height: 1;
        }

        .back-to-top-fallback-logo {
          width: 32px;
          height: 32px;

          object-fit: contain;
        }

        .back-to-top-brand {
          margin-top: 2px;

          color: #ffffff;

          font-size: 0.45rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }


        /* =====================================================
           TOOLTIP
           ===================================================== */

        .back-to-top-tooltip {
          position: absolute;

          right: 50%;
          bottom: calc(100% + 0.75rem);

          transform: translate(50%, 8px);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0.55rem 0.9rem;

          background: #111827;
          color: #ffffff;

          border-radius: 7px;

          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.04em;

          white-space: nowrap;

          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.25);

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition:
            opacity 0.2s ease,
            visibility 0.2s ease,
            transform 0.2s ease;
        }


        /* =====================================================
           TOOLTIP SHOW
           ===================================================== */

        .back-to-top-wrapper:hover .back-to-top-tooltip,
        .back-to-top-button:focus-visible + .back-to-top-tooltip {
          opacity: 1;
          visibility: visible;

          transform: translate(50%, 0);
        }


        /* =====================================================
           TOOLTIP ARROW
           ===================================================== */

        .back-to-top-tooltip-arrow {
          position: absolute;

          left: 50%;
          bottom: -6px;

          width: 0;
          height: 0;

          transform: translateX(-50%);

          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #111827;
        }


        /* =====================================================
           TABLET
           ===================================================== */

        @media (max-width: 768px) {
          .back-to-top-wrapper {
            right: 1rem;
            bottom: 1rem;
          }

          .back-to-top-button {
            width: 54px;
            height: 54px;
            padding: 10px;
          }

          .back-to-top-tooltip {
            font-size: 0.7rem;
            padding: 0.5rem 0.75rem;
          }
        }


        /* =====================================================
           SMALL PHONES
           ===================================================== */

        @media (max-width: 480px) {
          .back-to-top-wrapper {
            right: 0.75rem;
            bottom: 0.75rem;
          }

          .back-to-top-button {
            width: 50px;
            height: 50px;
            padding: 9px;
          }

          .back-to-top-tooltip {
            font-size: 0.68rem;
          }
        }


        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .back-to-top-wrapper,
          .back-to-top-button,
          .back-to-top-tooltip,
          .back-to-top-logo {
            transition: none;
          }
        }
      `}</style>

      <div
        className={`back-to-top-wrapper ${
          isVisible ? "visible" : ""
        }`}
      >
        <button
          type="button"
          className="back-to-top-button"
          onClick={scrollToTop}
          aria-label="Back to top"
          tabIndex={isVisible ? 0 : -1}
        >
          {!logoFailed ? (
            <img
              src="/images/logo-icon.svg"
              alt=""
              className="back-to-top-logo"
              aria-hidden="true"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="back-to-top-fallback" aria-hidden="true">
              <img
                src="/logo.png"
                alt=""
                className="back-to-top-fallback-logo"
              />

              <span className="back-to-top-brand">
                AbaNtu
              </span>
            </span>
          )}
        </button>

        <div className="back-to-top-tooltip" role="tooltip">
          <span>↑ Back to top</span>
          <span className="back-to-top-tooltip-arrow" />
        </div>
      </div>
    </>
  );
}