import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Globe, Phone, Mail, MapPin, Share2 } from "lucide-react";

interface SiteSettingsManagerProps {
  token: string;
}

export default function SiteSettingsManager({ token }: SiteSettingsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [websiteName, setWebsiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const fetchSettings = async () => {
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
      if (data.settings) {
        const s = data.settings;
        setWebsiteName(s.websiteName || "");
        setLogoUrl(s.logoUrl || "");
        setFaviconUrl(s.faviconUrl || "");
        setPhone(s.phone || "");
        setEmail(s.email || "");
        setAddress(s.address || "");
        setGoogleMapsUrl(s.googleMapsUrl || "");

        if (s.socialLinks) {
          setFacebook(s.socialLinks.facebook || "");
          setInstagram(s.socialLinks.instagram || "");
          setLinkedin(s.socialLinks.linkedin || "");
          setYoutube(s.socialLinks.youtube || "");
          setWhatsapp(s.socialLinks.whatsapp || "");
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const payload = {
      websiteName,
      logoUrl,
      faviconUrl,
      phone,
      email,
      address,
      googleMapsUrl,
      socialLinks: {
        facebook,
        instagram,
        linkedin,
        youtube,
        whatsapp,
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
        setSuccessMsg("Website Settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 text-xs">Loading website settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#0F2D63]" />
            <span>Website & Contact Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit global website information, phone numbers, email, addresses, and social links.
          </p>
        </div>

        {successMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Brand Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-[#0F2D63]" />
            <span>Brand & Identity</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Website Name</label>
              <input
                type="text"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Logo URL</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Favicon URL</label>
              <input
                type="text"
                value={faviconUrl}
                onChange={(e) => setFaviconUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Phone className="w-4 h-4 text-[#0F2D63]" />
            <span>Contact Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Office Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Maps Embed / Link</label>
              <input
                type="text"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-[#0F2D63]" />
            <span>Social Media Handles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">LinkedIn</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">YouTube</label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Link</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="https://wa.me/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-[#E5AF2B]" />
            <span>{saving ? "Saving Changes..." : "Save Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
