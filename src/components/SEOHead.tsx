import { useEffect, useState } from "react";

interface SEOData {
  siteTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  author?: string;
}

export default function SEOHead() {
  const [seo, setSeo] = useState<SEOData | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.seo) {
          setSeo(data.settings.seo);
        }
      })
      .catch((err) => console.error("Error loading SEO settings:", err));
  }, []);

  useEffect(() => {
    if (!seo) return;

    // 1. Title
    if (seo.siteTitle) {
      document.title = seo.siteTitle;
    }

    // Helper to update or create meta tag
    const setMetaTag = (nameAttr: string, attrVal: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const setLinkTag = (relVal: string, hrefVal: string) => {
      if (!hrefVal) return;
      let el = document.querySelector(`link[rel="${relVal}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", relVal);
        document.head.appendChild(el);
      }
      el.setAttribute("href", hrefVal);
    };

    // Standard Meta
    setMetaTag("name", "description", seo.metaDescription || "");
    setMetaTag("name", "keywords", seo.keywords || "");
    setMetaTag("name", "author", seo.author || "Techno-Solutions");

    // Open Graph
    setMetaTag("property", "og:title", seo.ogTitle || seo.siteTitle || "");
    setMetaTag("property", "og:description", seo.ogDescription || seo.metaDescription || "");
    setMetaTag("property", "og:image", seo.ogImage || "");
    setMetaTag("property", "og:type", seo.ogType || "website");

    // Twitter Card
    setMetaTag("name", "twitter:card", seo.twitterCard || "summary_large_image");
    setMetaTag("name", "twitter:title", seo.ogTitle || seo.siteTitle || "");
    setMetaTag("name", "twitter:description", seo.ogDescription || seo.metaDescription || "");
    setMetaTag("name", "twitter:image", seo.ogImage || "");
    if (seo.twitterHandle) {
      setMetaTag("name", "twitter:site", seo.twitterHandle);
    }

    // Canonical URL
    if (seo.canonicalUrl) {
      setLinkTag("canonical", seo.canonicalUrl);
    }
  }, [seo]);

  return null;
}
