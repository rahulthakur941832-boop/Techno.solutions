import React, { useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface AdminShadowScopeProps {
  children: React.ReactNode;
}

/**
 * Scoped Shadow DOM Wrapper for the Admin Panel.
 * Encapsulates the entire Admin UI inside a Shadow Root, preventing global style
 * leakages (such as font-family: 'Verdana' !important on html/body in index.css)
 * while preserving full Tailwind CSS utility styles and modern Admin typography.
 */
export default function AdminShadowScope({ children }: AdminShadowScopeProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shadowContainer, setShadowContainer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!hostRef.current) return;

    let shadowRoot = hostRef.current.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = hostRef.current.attachShadow({ mode: "open" });
    }

    const syncStyles = () => {
      if (!shadowRoot) return;

      // Clean up previous dynamically attached styles
      const existing = shadowRoot.querySelectorAll("style[data-admin-style]");
      existing.forEach((el) => el.remove());

      // Clone stylesheet links and style tags from document.head (Tailwind, Fonts)
      const headNodes = document.querySelectorAll("style, link[rel='stylesheet']");
      headNodes.forEach((node) => {
        const clone = node.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-admin-style", "true");
        shadowRoot!.appendChild(clone);
      });

      // Inject strict scoped isolation reset stylesheet for the shadow root
      const resetStyle = document.createElement("style");
      resetStyle.setAttribute("data-admin-style", "isolation-reset");
      resetStyle.textContent = `
        :host {
          display: block;
          width: 100%;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: 14px !important;
          color: #0f172a;
          background-color: #f8fafc;
        }
        #admin-shadow-root-content {
          min-height: 100vh;
          width: 100%;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
        *, ::before, ::after {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          box-sizing: border-box;
        }
      `;
      shadowRoot.appendChild(resetStyle);
    };

    syncStyles();

    // Observe changes in head styles (e.g., Vite HMR updates)
    const observer = new MutationObserver(() => syncStyles());
    observer.observe(document.head, { childList: true, subtree: true });

    // Create shadow content container for React portal
    let container = shadowRoot.querySelector<HTMLDivElement>("#admin-shadow-root-content");
    if (!container) {
      container = document.createElement("div");
      container.id = "admin-shadow-root-content";
      shadowRoot.appendChild(container);
    }
    setShadowContainer(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      id="admin-shadow-host"
      style={{
        minHeight: "100vh",
        width: "100%",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {shadowContainer ? ReactDOM.createPortal(children, shadowContainer) : null}
    </div>
  );
}
