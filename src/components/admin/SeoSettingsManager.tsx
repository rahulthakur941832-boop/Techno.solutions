import React, { useState, useEffect } from "react";
import {
  Globe,
  Save,
  CheckCircle2,
  Search,
  Share2,
  FileText,
  ToggleLeft,
  ToggleRight,
  ImageIcon,
  Sparkles,
  ExternalLink,
  Info,
  Copy,
  RotateCcw,
  Sliders,
  Twitter,
  Facebook,
  ShieldAlert,
  X,
  Check,
} from "lucide-react";

interface SeoSettingsManagerProps {
  token: string;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export default function SeoSettingsManager({ token }: SeoSettingsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"general" | "social" | "robots" | "preview">("general");

  // SEO Form Fields
  const [siteTitle, setSiteTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogType, setOgType] = useState("website");

  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterHandle, setTwitterHandle] = useState("@TechnoSolutions");

  const [robotsTxt, setRobotsTxt] = useState("");
  const [sitemapEnabled, setSitemapEnabled] = useState(true);

  // Media Picker Modal State
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // Copy indicator
  const [copiedLink, setCopiedLink] = useState("");

  const fetchSeoData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if (data.settings && data.settings.seo) {
        const seo = data.settings.seo;
        setSiteTitle(seo.siteTitle || "Techno-Solutions | Digital Transformation & Web3 Engineering");
        setMetaDescription(
          seo.metaDescription ||
            "Leading technology partner providing AI solutions, business automation, blockchain, smart home, and solar installations."
        );
        setKeywords(
          seo.keywords ||
            "AI solutions, Digital Transformation, Web3 Development, Business Automation, Smart Home, Solar Energy"
        );
        setAuthor(seo.author || "Techno-Solutions Team");
        setCanonicalUrl(seo.canonicalUrl || "https://techno-solutions.tech");

        setOgTitle(seo.ogTitle || seo.siteTitle || "Techno-Solutions - Corporate Tech Solutions");
        setOgDescription(seo.ogDescription || seo.metaDescription || "");
        setOgImage(seo.ogImage || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb");
        setOgType(seo.ogType || "website");

        setTwitterCard(seo.twitterCard || "summary_large_image");
        setTwitterHandle(seo.twitterHandle || "@TechnoSolutions");

        setRobotsTxt(
          seo.robotsTxt ||
            "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://techno-solutions.tech/sitemap.xml"
        );
        setSitemapEnabled(seo.sitemapEnabled !== false);
      }
    } catch (err) {
      console.error("Failed to load SEO settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const fetchMediaAssets = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/admin/media", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.media) {
        setMediaList(data.media);
      }
    } catch (err) {
      console.error("Failed to fetch media assets:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const openMediaPicker = () => {
    setShowMediaModal(true);
    fetchMediaAssets();
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const payload = {
      seo: {
        siteTitle,
        metaDescription,
        keywords,
        author,
        canonicalUrl,
        ogTitle: ogTitle || siteTitle,
        ogDescription: ogDescription || metaDescription,
        ogImage,
        ogType,
        twitterCard,
        twitterHandle,
        robotsTxt,
        sitemapEnabled,
      },
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg("SEO & Meta Tags updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      }
    } catch (err) {
      console.error("Error updating SEO settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset SEO settings to system recommended defaults?")) {
      setSiteTitle("Techno-Solutions | Digital Transformation & Web3 Engineering");
      setMetaDescription(
        "Leading technology partner providing AI solutions, business automation, blockchain, smart home, and solar installations."
      );
      setKeywords("AI solutions, Digital Transformation, Web3 Development, Business Automation, Smart Home, Solar Energy");
      setAuthor("Techno-Solutions Team");
      setCanonicalUrl("https://techno-solutions.tech");
      setOgTitle("Techno-Solutions - Corporate Tech Solutions");
      setOgDescription(
        "Enterprise technology partner building AI automation, custom software, smart home systems, and solar installations."
      );
      setOgImage("https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb");
      setOgType("website");
      setTwitterCard("summary_large_image");
      setTwitterHandle("@TechnoSolutions");
      setRobotsTxt("User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://techno-solutions.tech/sitemap.xml");
      setSitemapEnabled(true);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  // SEO Health Score Calculation
  const calculateSeoScore = () => {
    let score = 0;
    const checks = [];

    // Title Check (15 pts)
    if (siteTitle.length >= 30 && siteTitle.length <= 65) {
      score += 20;
      checks.push({ text: "Site Title is optimal length (30-65 chars)", pass: true });
    } else if (siteTitle.length > 0) {
      score += 10;
      checks.push({ text: "Site Title present (adjust length to 30-65 chars)", pass: false });
    } else {
      checks.push({ text: "Site Title missing", pass: false });
    }

    // Description Check (20 pts)
    if (metaDescription.length >= 100 && metaDescription.length <= 160) {
      score += 20;
      checks.push({ text: "Meta Description is optimal length (100-160 chars)", pass: true });
    } else if (metaDescription.length > 0) {
      score += 10;
      checks.push({ text: "Meta Description present (adjust to 100-160 chars)", pass: false });
    } else {
      checks.push({ text: "Meta Description missing", pass: false });
    }

    // Keywords (10 pts)
    if (keywords.trim().length > 5) {
      score += 15;
      checks.push({ text: "Target Meta Keywords included", pass: true });
    } else {
      checks.push({ text: "No Meta Keywords defined", pass: false });
    }

    // Open Graph Image (20 pts)
    if (ogImage.startsWith("http")) {
      score += 20;
      checks.push({ text: "Valid Open Graph Social Image URL provided", pass: true });
    } else {
      checks.push({ text: "Open Graph Image URL missing or invalid", pass: false });
    }

    // Canonical URL (10 pts)
    if (canonicalUrl.startsWith("http")) {
      score += 15;
      checks.push({ text: "Canonical URL configured", pass: true });
    } else {
      checks.push({ text: "Canonical URL missing", pass: false });
    }

    // Sitemap (10 pts)
    if (sitemapEnabled) {
      score += 10;
      checks.push({ text: "XML Sitemap generator enabled", pass: true });
    } else {
      checks.push({ text: "XML Sitemap disabled", pass: false });
    }

    return { score, checks };
  };

  const { score: seoScore, checks: seoChecks } = calculateSeoScore();

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#0F2D63] animate-spin" />
        <span>Loading SEO configuration module...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-[#0F2D63]/10 text-[#0F2D63]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SEO & Metadata Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage search engine meta tags, Open Graph preview cards, indexing rules, and XML sitemaps.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Score Badge & Quick Actions */}
        <div className="flex items-center gap-4">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                SEO Audit Score
              </span>
              <span
                className={`text-lg font-black ${
                  seoScore >= 80 ? "text-emerald-600" : seoScore >= 50 ? "text-amber-600" : "text-red-600"
                }`}
              >
                {seoScore}/100
              </span>
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                seoScore >= 80 ? "bg-emerald-600" : seoScore >= 50 ? "bg-amber-500" : "bg-red-500"
              }`}
            >
              {seoScore}%
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset default SEO settings"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-[#E5AF2B]" />
            <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <span className="text-[10px] text-emerald-600">Changes active on public site</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-2xl pt-2 space-x-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab("general")}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "general"
              ? "border-[#0F2D63] text-[#0F2D63]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Search Engine Meta Tags</span>
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "social"
              ? "border-[#0F2D63] text-[#0F2D63]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Open Graph & Social Cards</span>
        </button>

        <button
          onClick={() => setActiveTab("robots")}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "robots"
              ? "border-[#0F2D63] text-[#0F2D63]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Robots.txt & XML Sitemap</span>
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "preview"
              ? "border-[#0F2D63] text-[#0F2D63]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#E5AF2B]" />
          <span>Live Search & Social Preview</span>
        </button>
      </div>

      {/* TAB 1: GENERAL META TAGS */}
      {activeTab === "general" && (
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Site Title */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800">Site Title Tag (`&lt;title&gt;`)</label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        siteTitle.length >= 30 && siteTitle.length <= 65
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {siteTitle.length} / 65 characters
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Appears in browser tabs and as the main headline in Google Search results.
                  </p>
                  <input
                    type="text"
                    required
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="e.g. Techno-Solutions | Digital Transformation & Web3 Engineering"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800">Global Meta Description</label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        metaDescription.length >= 100 && metaDescription.length <= 160
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {metaDescription.length} / 160 characters
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    A brief description summarizing your website for search engines and potential visitors.
                  </p>
                  <textarea
                    rows={3}
                    required
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="e.g. Leading technology partner providing AI solutions, business automation, blockchain, smart home, and solar installations."
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* Meta Keywords */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Meta Keywords (Comma separated)</label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Target search phrases separated by commas for search crawlers.
                  </p>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. AI solutions, Web3, Smart Home, Solar Energy, Digital Transformation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Advanced Technical Meta Tags */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0F2D63]" />
                  <span>Canonical URL & Site Author</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Canonical Base URL</label>
                    <input
                      type="url"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://techno-solutions.tech"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Prevents duplicate content issues in Google Index</p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Author / Publisher Tag</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Techno-Solutions Team"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Sets author metadata credit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Health Checklist Sidebar */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#0F2D63]" />
                  <span>SEO Quality Checklist</span>
                </h3>

                <div className="space-y-3">
                  {seoChecks.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      {item.pass ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <span className={item.pass ? "text-slate-700 font-medium" : "text-amber-800 font-semibold"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Search Endpoints</h3>
                <div className="space-y-2 text-xs">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                  >
                    <span className="font-mono text-[11px]">/sitemap.xml</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E5AF2B]" />
                  </a>

                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                  >
                    <span className="font-mono text-[11px]">/robots.txt</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E5AF2B]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: OPEN GRAPH & SOCIAL MEDIA CARDS */}
      {activeTab === "social" && (
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0F2D63]" />
                  <span>Open Graph Metadata (Facebook, WhatsApp, LinkedIn)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Controls how your website links appear when shared on social networks and messaging apps.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Open Graph Title (`og:title`)</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Techno-Solutions - Corporate Tech Solutions"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Open Graph Object Type (`og:type`)</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                >
                  <option value="website">website</option>
                  <option value="business.business">business.business</option>
                  <option value="article">article</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Open Graph Description (`og:description`)</label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Enterprise technology partner building AI automation, custom software, smart home systems, and solar installations."
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              {/* Open Graph Image Selection */}
              <div className="md:col-span-2 space-y-3">
                <label className="block font-bold text-slate-700">
                  Open Graph Featured Share Image (`og:image`)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="https://example.com/social-banner.jpg"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={openMediaPicker}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-2 shrink-0 cursor-pointer transition-all"
                  >
                    <ImageIcon className="w-4 h-4 text-[#E5AF2B]" />
                    <span>Select from Media Library</span>
                  </button>
                </div>

                {/* Image Preview Thumbnail */}
                {ogImage && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 max-w-xl">
                    <img
                      src={ogImage}
                      alt="OG Preview"
                      className="w-24 h-16 object-cover rounded-lg border border-slate-200 shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block">Social Banner Image Preview</span>
                      <span className="text-[10px] text-slate-400 block break-all">{ogImage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Twitter Card Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Twitter className="w-4 h-4 text-sky-500" />
              <span>Twitter / X Card Metadata</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Twitter Card Format</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                >
                  <option value="summary_large_image">summary_large_image (Recommended)</option>
                  <option value="summary">summary (Small Thumbnail)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Twitter Handle / Site Account</label>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@TechnoSolutions"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: ROBOTS.TXT & SITEMAP */}
      {activeTab === "robots" && (
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0F2D63]" />
                  <span>Robots.txt Crawler Directives</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instruction set served to Googlebot, Bingbot, and search indexers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setRobotsTxt(
                      "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://techno-solutions.tech/sitemap.xml"
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-all cursor-pointer"
                >
                  Default Rule
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRobotsTxt(
                      "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://techno-solutions.tech/sitemap.xml"
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-all cursor-pointer"
                >
                  Strict Rule
                </button>
              </div>
            </div>

            <div>
              <textarea
                rows={6}
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="w-full p-4 font-mono text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 leading-relaxed focus:ring-2 focus:ring-[#0F2D63]"
              />
              <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                <span>Direct endpoint served at `/robots.txt`</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(robotsTxt, "robots")}
                  className="text-[#0F2D63] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedLink === "robots" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === "robots" ? "Copied!" : "Copy Robots.txt"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Sitemap Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dynamic XML Sitemap (`/sitemap.xml`)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically includes homepage, main service pages, and all published blog posts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSitemapEnabled(!sitemapEnabled)}
                className="flex items-center gap-2 cursor-pointer text-xs font-bold"
              >
                {sitemapEnabled ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <ToggleRight className="w-6 h-6" /> Sitemap Active
                  </span>
                ) : (
                  <span className="text-slate-400 font-bold flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <ToggleLeft className="w-6 h-6" /> Sitemap Disabled
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: LIVE SEARCH & SOCIAL PREVIEW CARDS */}
      {activeTab === "preview" && (
        <div className="space-y-6 text-xs">
          {/* Google Search Live Snippet Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Google Search Engine Result Snippet Preview
                </h3>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold">
                Desktop & Mobile Google Result
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 max-w-2xl font-sans space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-[#0F2D63] text-white text-[9px] font-bold flex items-center justify-center">
                  T
                </div>
                <span className="font-semibold text-slate-900">Techno-Solutions</span>
                <span className="text-slate-400 text-[11px]">https://techno-solutions.tech</span>
              </div>
              <h4 className="text-base font-semibold text-blue-800 hover:underline cursor-pointer leading-tight">
                {siteTitle || "Techno-Solutions | Digital Transformation & Web3 Engineering"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {metaDescription ||
                  "Leading technology partner providing AI solutions, business automation, blockchain, smart home, and solar installations."}
              </p>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Facebook, LinkedIn & WhatsApp Share Card Preview
                </h3>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                Open Graph Card
              </span>
            </div>

            <div className="max-w-lg rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
              <div className="h-48 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                {ogImage ? (
                  <img src={ogImage} alt="OG Card Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 text-xs flex flex-col items-center gap-1">
                    <ImageIcon className="w-6 h-6" />
                    <span>No Open Graph image provided</span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  TECHNO-SOLUTIONS.TECH
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">
                  {ogTitle || siteTitle || "Techno-Solutions - Corporate Tech Solutions"}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-normal">
                  {ogDescription || metaDescription || "Enterprise technology partner..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#0F2D63]" />
                <span>Select Open Graph Image from Media Library</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[250px]">
              {loadingMedia ? (
                <div className="p-8 text-center text-slate-400 text-xs">Loading media assets...</div>
              ) : mediaList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No uploaded media files found. Upload images in the Media Library tab first.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
                  {mediaList.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setOgImage(m.url);
                        setShowMediaModal(false);
                      }}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video hover:border-[#0F2D63] transition-all cursor-pointer text-left"
                    >
                      <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-xs">
                        Select Asset
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
