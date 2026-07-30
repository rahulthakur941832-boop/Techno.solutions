import React, { useEffect, useState } from "react";
import {
  FileText,
  Mail,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Eye,
  Activity,
  Layers,
} from "lucide-react";

interface AdminDashboardProps {
  token: string;
  onNavigateTab: (tab: string) => void;
}

export default function AdminDashboard({ token, onNavigateTab }: AdminDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      let result: any = null;
      try {
        const text = await res.text();
        result = text ? JSON.parse(text) : null;
      } catch {
        result = null;
      }

      if (res.ok && result) {
        setData(result);
      } else {
        // Default structure fallback
        setData({
          stats: {
            totalBlogs: 0,
            publishedBlogs: 0,
            draftBlogs: 0,
            totalContacts: 0,
            unreadContacts: 0,
            totalMedia: 0,
            lastLogin: new Date().toISOString(),
          },
          activities: [],
          recentContacts: [],
          recentBlogs: [],
        });
      }
    } catch (err: any) {
      console.warn("Dashboard statistics notice:", err);
      setData({
        stats: {
          totalBlogs: 0,
          publishedBlogs: 0,
          draftBlogs: 0,
          totalContacts: 0,
          unreadContacts: 0,
          totalMedia: 0,
          lastLogin: new Date().toISOString(),
        },
        activities: [],
        recentContacts: [],
        recentBlogs: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-[#0F2D63] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading Dashboard Statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  const { stats, activities, recentContacts, recentBlogs } = data;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F2D63] via-[#1A448C] to-[#113069] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5AF2B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#E5AF2B] font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, Administrator
            </h1>
            <p className="text-white/80 text-sm mt-1 max-w-xl">
              Manage your blogs, contact submissions, media library, and global website content in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab("blogs")}
              className="px-4 py-2.5 rounded-xl bg-[#E5AF2B] text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-[#f0bd3b] transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Blog</span>
            </button>
            <button
              onClick={() => onNavigateTab("contacts")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>View Enquiries ({stats.unreadContacts})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Blogs */}
        <div
          onClick={() => onNavigateTab("blogs")}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Blog Posts
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2D63] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.totalBlogs}</span>
            <span className="text-xs text-slate-500">posts</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>{stats.publishedBlogs} Published</span>
            <span className="text-amber-600 font-semibold">{stats.draftBlogs} Drafts</span>
          </div>
        </div>

        {/* Contact Submissions */}
        <div
          onClick={() => onNavigateTab("contacts")}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Contact Enquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.totalContacts}</span>
            <span className="text-xs text-slate-500">total leads</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              {stats.unreadContacts} Unread
            </span>
            <span className="text-slate-400">Website leads</span>
          </div>
        </div>

        {/* Media Library */}
        <div
          onClick={() => onNavigateTab("media")}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Media Assets
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.totalMedia}</span>
            <span className="text-xs text-slate-500">uploaded items</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Images & Graphics</span>
            <span className="text-[#0F2D63] font-medium group-hover:underline">Manage</span>
          </div>
        </div>

        {/* System Session Status */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Admin Session
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Last Login
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {stats.lastLogin
                ? new Date(stats.lastLogin).toLocaleString()
                : "Active Session"}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Authenticated
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contact Enquiries */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Contact Enquiries</h2>
              <p className="text-xs text-slate-500">Submissions received from website contact form</p>
            </div>
            <button
              onClick={() => onNavigateTab("contacts")}
              className="text-xs font-bold text-[#0F2D63] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentContacts && recentContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email / Phone</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentContacts.map((contact: any) => (
                    <tr key={contact.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{contact.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{contact.email}</div>
                        <div className="text-[11px] text-slate-400">{contact.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F2D63] font-semibold text-[11px]">
                          {contact.service}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {new Date(contact.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            contact.status === "unread"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 text-xs">
              No contact enquiries received yet.
            </div>
          )}
        </div>

        {/* Recent Admin Activities */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-900">Recent System Activities</h2>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-4">
            {activities && activities.length > 0 ? (
              activities.map((act: any) => (
                <div key={act.id} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#0F2D63] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">{act.action}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">{act.details}</span>
                    <span className="text-slate-400 text-[10px] block mt-1">
                      {new Date(act.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No recent log entries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
