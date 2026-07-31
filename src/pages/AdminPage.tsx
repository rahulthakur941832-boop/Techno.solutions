import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Image as ImageIcon,
  Settings,
  Layout,
  Globe,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import BlogManager from "../components/admin/BlogManager";
import ContactManager from "../components/admin/ContactManager";
import MediaManager from "../components/admin/MediaManager";
import SiteSettingsManager from "../components/admin/SiteSettingsManager";
import HomepageContentManager from "../components/admin/HomepageContentManager";
import SeoSettingsManager from "../components/admin/SeoSettingsManager";
import SecurityManager from "../components/admin/SecurityManager";
import AdminShadowScope from "../components/admin/AdminShadowScope";

interface AdminPortalInnerProps {
  token: string;
  username: string;
  onLogout: () => void;
}

function AdminPortalInner({ token, username, onLogout }: AdminPortalInnerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Derives current active tab from route (e.g. "/admin/blogs" -> "blogs")
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentTab = pathParts.length > 1 ? pathParts[1] : "dashboard";

  const navItems = [
    { id: "dashboard", label: "Overview & Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Blog Posts & Studio", icon: FileText },
    { id: "contacts", label: "Contact Inquiries", icon: Mail },
    { id: "media", label: "Media Manager", icon: ImageIcon },
    { id: "homepage", label: "Homepage Editor", icon: Layout },
    { id: "site", label: "Site Settings", icon: Settings },
    { id: "seo", label: "SEO & Meta Tags", icon: Globe },
    { id: "security", label: "Security & Password", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col md:flex-row text-slate-900">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-slate-950 text-slate-300 hidden md:flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F2D63] to-[#1A448C] border border-white/10 text-[#E5AF2B] flex items-center justify-center font-bold text-sm shadow-md">
              TS
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Admin Portal</span>
              <span className="text-[10px] text-slate-400 block font-mono">Techno-Solutions</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/admin/${item.id}`)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0F2D63] text-white shadow-md border border-white/10"
                      : "hover:bg-slate-900 hover:text-white text-slate-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#E5AF2B]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-white">{username}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Logged in Administrator</span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header & Drawer */}
      <div className="md:hidden bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2D63] text-[#E5AF2B] font-bold text-xs flex items-center justify-center">
            TS
          </div>
          <span className="font-bold text-sm">Admin Control</span>
        </div>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 bg-slate-900 rounded-lg text-slate-300"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileNavOpen && (
        <div className="md:hidden bg-slate-950 text-slate-300 p-4 border-b border-slate-800 space-y-2 sticky top-[65px] z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(`/admin/${item.id}`);
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? "bg-[#0F2D63] text-white" : "text-slate-400"
                }`}
              >
                <Icon className="w-4 h-4 text-[#E5AF2B]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-semibold mt-4"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar for Desktop */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 hidden md:flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-bold text-slate-800 uppercase tracking-wider">Admin Panel</span>
            <span>/</span>
            <span className="font-semibold text-[#0F2D63] capitalize">{currentTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="w-[1px] h-5 bg-slate-200" />

            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <div className="w-7 h-7 rounded-full bg-[#0F2D63] text-white flex items-center justify-center text-[11px]">
                A
              </div>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        {/* Dynamic Sub-Routed Body */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route
              path="dashboard"
              element={<AdminDashboard token={token} onNavigateTab={(tab) => navigate(`/admin/${tab}`)} />}
            />
            <Route path="blogs" element={<BlogManager token={token} />} />
            <Route path="contacts" element={<ContactManager token={token} />} />
            <Route path="media" element={<MediaManager token={token} />} />
            <Route path="homepage" element={<HomepageContentManager token={token} />} />
            <Route path="site" element={<SiteSettingsManager token={token} />} />
            <Route path="seo" element={<SeoSettingsManager token={token} />} />
            <Route path="security" element={<SecurityManager token={token} username={username} />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [username, setUsername] = useState<string>(
    localStorage.getItem("admin_username") || "admin"
  );

  useEffect(() => {
    if (token) {
      if (token.startsWith("adm_fallback_") || token.startsWith("adm_sess_")) {
        return;
      }
      fetch("/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok && res.status === 401) {
            handleLogout();
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    localStorage.setItem("admin_token", newToken);
    localStorage.setItem("admin_username", newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const handleLogout = () => {
    if (token) {
      fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setToken(null);
  };

  return (
    <AdminShadowScope>
      {!token ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminPortalInner token={token} username={username} onLogout={handleLogout} />
      )}
    </AdminShadowScope>
  );
}
