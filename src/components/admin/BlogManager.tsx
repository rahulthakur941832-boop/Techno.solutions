import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  AlertTriangle,
  Globe,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import {
  getStoredBlogs,
  saveOrUpdateBlog,
  deleteStoredBlog,
  saveStoredBlogs,
  StoredBlog,
} from "../../utils/adminStorage";

interface BlogManagerProps {
  token: string;
}

const categoriesList = [
  "Digital Transformation",
  "Automation",
  "AI",
  "Blockchain",
  "Smart Home",
  "Solar",
  "Industry Trends",
];

export default function BlogManager({ token }: BlogManagerProps) {
  const [blogs, setBlogs] = useState<StoredBlog[]>(() => getStoredBlogs());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Digital Transformation");
  const [tags, setTags] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [author, setAuthor] = useState("Sanjeev Goel");
  const [readTime, setReadTime] = useState("5 min read");

  // Delete modal state
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deleteBlogTitle, setDeleteBlogTitle] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const localBlogs = getStoredBlogs();
      setBlogs(localBlogs);

      const query = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
        category: categoryFilter,
      });
      const res = await fetch(`/api/admin/blogs?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if (data && Array.isArray(data.blogs) && data.blogs.length > 0) {
        // Sync server blogs with local storage
        const serverBlogs = data.blogs;
        const mergedMap = new Map<string, StoredBlog>();
        
        // Put local blogs first
        localBlogs.forEach((b) => mergedMap.set(b.id, b));
        // Add server blogs if not present locally
        serverBlogs.forEach((sb: any) => {
          if (!mergedMap.has(sb.id)) {
            mergedMap.set(sb.id, sb);
          }
        });

        const mergedList = Array.from(mergedMap.values());
        saveStoredBlogs(mergedList);
        setBlogs(mergedList);
      }
    } catch (err) {
      console.warn("Backend fetch blogs notice (using persistent local storage):", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, statusFilter, categoryFilter, token]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingBlogId) {
      const autoSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
      if (!metaTitle) setMetaTitle(`${newTitle} | Techno-Solutions`);
    }
  };

  const openCreateModal = () => {
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCategory("Digital Transformation");
    setTags("Automation, Tech, Solutions");
    setKeywords("Techno Solutions, Tech Delhi");
    setImage("https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb");
    setStatus("published");
    setMetaTitle("");
    setMetaDescription("");
    setAuthor("Sanjeev Goel");
    setReadTime("5 min read");
    setErrorMsg("");
    setIsFormOpen(true);
  };

  const openEditModal = (blog: any) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setSummary(blog.summary || "");
    setContent(blog.content || "");
    setCategory(blog.category || "General");
    setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "");
    setKeywords(Array.isArray(blog.keywords) ? blog.keywords.join(", ") : blog.keywords || "");
    setImage(blog.image || "");
    setStatus(blog.status || "published");
    setMetaTitle(blog.metaTitle || "");
    setMetaDescription(blog.metaDescription || "");
    setAuthor(blog.author || "Sanjeev Goel");
    setReadTime(blog.readTime || "5 min read");
    setErrorMsg("");
    setIsFormOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Validation Error: Blog title and content are required.");
      return;
    }

    setSaving(true);
    setErrorMsg("");

    const payload = {
      id: editingBlogId || undefined,
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim() || title.trim(),
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
      image: image.trim() || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
      status,
      metaTitle: metaTitle.trim() || `${title.trim()} | Techno-Solutions`,
      metaDescription: metaDescription.trim() || summary.trim() || title.trim(),
      author: author.trim() || "Sanjeev Goel",
      readTime,
    };

    try {
      // 1. Save and validate persistence step locally (with write verification read-back)
      const savedBlog = saveOrUpdateBlog(payload);

      // 2. Best-effort async sync to backend API
      try {
        const url = editingBlogId ? `/api/admin/blogs/${editingBlogId}` : "/api/admin/blogs";
        const method = editingBlogId ? "PUT" : "POST";

        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (backendErr) {
        console.warn("Backend API sync notice (persisted locally):", backendErr);
      }

      // 3. Update UI state only after persistence validation succeeds
      setBlogs(getStoredBlogs());
      setIsFormOpen(false);
    } catch (err: any) {
      console.error("Blog save validation/persistence error:", err);
      setErrorMsg(err.message || "Failed to validate and write blog post to storage.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBlogId) return;
    try {
      // Delete from persistent local storage with validation check
      deleteStoredBlog(deleteBlogId);

      // Async backend call
      fetch(`/api/admin/blogs/${deleteBlogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch((err) => console.warn("Backend delete notice:", err));

      setDeleteBlogId(null);
      setBlogs(getStoredBlogs());
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      setErrorMsg(err.message || "Failed to remove blog post.");
    }
  };

  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState("");
  const [showAiTopicPrompt, setShowAiTopicPrompt] = useState(false);

  // File Upload state for PNG/JPG
  const [imageUploadType, setImageUploadType] = useState<"file" | "url">("file");

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
      setErrorMsg("Please upload a PNG or JPG/JPEG image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Image file size exceeds 8MB. Please select a smaller PNG or JPG file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImage(dataUrl);
        setErrorMsg("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAIGeneratePost = async (customTopic?: string) => {
    const targetTopic = customTopic || title || "Enterprise Digital Transformation and AI Automation Trends";
    setGeneratingAI(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/blogs/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: targetTopic,
          category,
        }),
      });

      const data = await res.json();
      if (data && data.success && data.blog) {
        const b = data.blog;
        setTitle(b.title || title);
        setSlug(b.slug || slug);
        setSummary(b.summary || summary);
        setContent(b.content || content);
        if (b.category) setCategory(b.category);
        if (Array.isArray(b.tags)) setTags(b.tags.join(", "));
        if (Array.isArray(b.keywords)) setKeywords(b.keywords.join(", "));
        if (b.metaTitle) setMetaTitle(b.metaTitle);
        if (b.metaDescription) setMetaDescription(b.metaDescription);
        if (b.readTime) setReadTime(b.readTime);
        if (b.image && !image) setImage(b.image);
        setShowAiTopicPrompt(false);
      } else {
        throw new Error(data.error || "Failed to generate blog content.");
      }
    } catch (err: any) {
      console.warn("AI Generation fallback notice:", err);
      // Smart offline AI generator fallback
      const generatedTitle = `Mastering ${targetTopic} for Modern Enterprises`;
      const autoSlug = generatedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setTitle(generatedTitle);
      setSlug(autoSlug);
      setSummary(`Discover how ${targetTopic} is helping forward-thinking enterprises streamline operations, reduce overhead, and accelerate growth.`);
      setContent(`<h2>Understanding ${targetTopic}</h2>
<p>As technological landscapes evolve rapidly, enterprise decision-makers must deploy adaptable, future-proof strategies to retain market competitiveness.</p>

<h2>Core Advantages & Business Impact</h2>
<ul>
  <li><strong>Scalable Automation:</strong> Minimizes manual friction points while expanding operational capability.</li>
  <li><strong>Data-Driven Insights:</strong> Real-time telemetries provide high-precision visibility across operations.</li>
  <li><strong>Enhanced Customer Satisfaction:</strong> Faster resolution times foster long-term client retention.</li>
</ul>

<blockquote>"Investing in scalable technology architecture isn't just an expense — it's the single highest-yield growth leverage."</blockquote>

<h2>Conclusion & Next Steps</h2>
<p>Integrating ${targetTopic} positions your organization to achieve sustainable growth in 2026 and beyond. Connect with Techno-Solutions experts today to map out your implementation roadmap.</p>`);
      setTags(`${category}, Tech, Digital Transformation, Automation`);
      setKeywords(`${targetTopic}, Techno Solutions, Enterprise Tech`);
      setMetaTitle(`${generatedTitle} | Techno-Solutions`);
      setMetaDescription(`Learn how ${targetTopic} drives enterprise efficiency, digital transformation, and business growth.`);
      setReadTime("4 min read");
      setShowAiTopicPrompt(false);
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleAutoFormatSEO = () => {
    if (!title) {
      setErrorMsg("Please enter a Blog Title first before formatting SEO tags.");
      return;
    }
    const cleanTitle = title.trim();
    const autoSlug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setSlug(autoSlug);
    setMetaTitle(`${cleanTitle} | Techno-Solutions`);
    setMetaDescription(summary || `Read about ${cleanTitle} by Techno-Solutions IT & Engineering experts.`);
    setKeywords(`${cleanTitle}, Techno Solutions, ${category}, Tech Innovation`);
    setErrorMsg("");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0F2D63]" />
            <span>Blog Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish, edit, search, and manage website blog posts and articles.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-semibold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E5AF2B]" />
          <span>Add New Blog Post</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#0F2D63] focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading blog posts...</div>
        ) : blogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Post</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb"}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block line-clamp-1">
                            {blog.title}
                          </span>
                          <span className="text-slate-400 text-[11px] block mt-0.5 font-mono">
                            /blog/{blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F2D63] font-semibold text-[11px]">
                        {blog.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">{blog.author}</td>

                    <td className="py-4 px-4 text-slate-500 text-[11px]">{blog.date}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          blog.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {blog.status === "published" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{blog.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on public site"
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => openEditModal(blog)}
                          title="Edit post"
                          className="p-1.5 hover:bg-blue-50 rounded-lg text-[#0F2D63] transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteBlogId(blog.id);
                            setDeleteBlogTitle(blog.title);
                          }}
                          title="Delete post"
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            No blog posts found matching criteria. Click "Add New Blog Post" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Blog Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 md:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingBlogId ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {errorMsg}
              </div>
            )}

            {/* AI Automated Generator Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-[#0F2D63] to-slate-900 text-white shadow-md border border-blue-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      Automated AI Blog & SEO Creator
                    </h3>
                    <p className="text-[11px] text-blue-200">
                      Enter a topic or keywords below to auto-generate title, rich headings, HTML content, & SEO tags in 1 click.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAIGeneratePost(aiTopicInput || title)}
                  disabled={generatingAI}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{generatingAI ? "Generating Post..." : "Auto-Generate Post"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiTopicInput}
                  onChange={(e) => setAiTopicInput(e.target.value)}
                  placeholder="e.g. Artificial Intelligence in Enterprise Supply Chain 2026..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-blue-200/60 focus:bg-white/20 focus:outline-hidden"
                />
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Enterprise AI Trends in 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Slug (SEO friendly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="enterprise-ai-trends-2026"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Category, Status, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden bg-white"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Featured Image Section with PNG & JPG Upload */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#0F2D63]" />
                    <span>Featured Header Image (PNG / JPG / JPEG)</span>
                  </label>

                  <div className="flex bg-slate-200 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageUploadType("file")}
                      className={`px-3 py-1 rounded-md transition-all ${
                        imageUploadType === "file" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      Upload PNG/JPG
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadType("url")}
                      className={`px-3 py-1 rounded-md transition-all ${
                        imageUploadType === "url" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {imageUploadType === "file" ? (
                  <div className="space-y-3">
                    <label className="border-2 border-dashed border-slate-300 hover:border-[#0F2D63] bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                      <ImageIcon className="w-8 h-8 text-[#0F2D63] mb-1" />
                      <span className="text-xs font-bold text-slate-800">
                        Click to Choose PNG or JPG Image File
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        Supports PNG, JPG, JPEG, WEBP formats (Max 8MB)
                      </span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden bg-white"
                  />
                )}

                {image && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                    <img
                      src={image}
                      alt="Featured Preview"
                      className="w-16 h-12 rounded-xl object-cover border border-slate-300 shadow-xs shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                      <span className="text-xs font-bold text-slate-800 block">Image Selected</span>
                      <span className="text-[10px] text-slate-400 block truncate font-mono">{image.substring(0, 60)}...</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Short Summary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Short Description / Summary
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief 1-2 sentence overview shown on blog cards..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                />
              </div>

              {/* Full Content (Rich Text Editor) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Blog Content (Headings, Images, Lists & Formatting) *
                </label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              {/* Tags & Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI, Automation, Enterprise"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Digital Transformation Delhi, AI Consulting"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-[#0F2D63]" />
                    <span>SEO Meta Tags & Search Optimization</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoFormatSEO}
                    className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-[#0F2D63] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
                    <span>Auto-Format SEO</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="SEO Title shown in Google"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="150 character meta description"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white text-xs font-bold cursor-pointer transition-all shadow-md"
                >
                  {saving ? "Saving Post..." : editingBlogId ? "Update Blog Post" : "Publish Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteBlogId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Blog Post?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <strong className="text-slate-800">"{deleteBlogTitle}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Yes, Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
