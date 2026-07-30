import React, { useState, useEffect } from "react";
import { Layout, Save, CheckCircle2, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

interface HomepageContentManagerProps {
  token: string;
}

export default function HomepageContentManager({ token }: HomepageContentManagerProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaButtonLink, setCtaButtonLink] = useState("");
  const [aboutSummary, setAboutSummary] = useState("");
  const [servicesIntro, setServicesIntro] = useState("");
  const [footerContent, setFooterContent] = useState("");

  const fetchHomepageData = async () => {
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
      if (data.settings && data.settings.homepage) {
        const hp = data.settings.homepage;
        setHeroHeading(hp.heroHeading || "");
        setHeroSubheading(hp.heroSubheading || "");
        setCtaButtonText(hp.ctaButtonText || "");
        setCtaButtonLink(hp.ctaButtonLink || "");
        setAboutSummary(hp.aboutSummary || "");
        setServicesIntro(hp.servicesIntro || "");
        setFooterContent(hp.footerContent || "");
      }
    } catch (err) {
      console.error("Failed to load homepage content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const payload = {
      homepage: {
        heroHeading,
        heroSubheading,
        ctaButtonText,
        ctaButtonLink,
        aboutSummary,
        servicesIntro,
        footerContent,
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
        setSuccessMsg("Homepage content updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error updating homepage content:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 text-xs">Loading homepage content settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#0F2D63]" />
            <span>Homepage Content Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Easily update hero headlines, call-to-actions, about copy, and footer summaries without touching code.
          </p>
        </div>

        {successMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#0F2D63]" />
            <span>Hero Section Copy</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Main Heading</label>
              <textarea
                rows={2}
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Subheading</label>
              <textarea
                rows={2}
                value={heroSubheading}
                onChange={(e) => setHeroSubheading(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">CTA Button Link</label>
                <input
                  type="text"
                  value={ctaButtonLink}
                  onChange={(e) => setCtaButtonLink(e.target.value)}
                  placeholder="/contact"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About & Services Copy */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            About & Services Copy
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">About Section Summary</label>
              <textarea
                rows={3}
                value={aboutSummary}
                onChange={(e) => setAboutSummary(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Services Intro Subtitle</label>
              <textarea
                rows={2}
                value={servicesIntro}
                onChange={(e) => setServicesIntro(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Footer Copy */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Footer Copy
          </h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Footer Brand Statement</label>
            <textarea
              rows={2}
              value={footerContent}
              onChange={(e) => setFooterContent(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-[#E5AF2B]" />
            <span>{saving ? "Updating..." : "Save Homepage Copy"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
