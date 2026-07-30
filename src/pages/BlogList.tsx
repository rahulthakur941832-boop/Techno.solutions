import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data";
import { Search, Calendar, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { getStoredBlogs } from "../utils/adminStorage";

export default function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPosts, setAllPosts] = useState<any[]>(() => {
    const stored = getStoredBlogs();
    const published = stored.filter((p) => p.status === "published");
    return published.length > 0 ? published : BLOG_POSTS;
  });

  useEffect(() => {
    async function loadBlogs() {
      // Load local stored blogs first
      const stored = getStoredBlogs().filter((p) => p.status === "published");
      
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const text = await res.text();
          const data = text ? JSON.parse(text) : null;
          if (data && Array.isArray(data.blogs) && data.blogs.length > 0) {
            const serverBlogs = data.blogs.filter((b: any) => b.status === "published");
            const mergedMap = new Map<string, any>();
            stored.forEach((sb) => mergedMap.set(sb.id, sb));
            serverBlogs.forEach((sb: any) => {
              if (!mergedMap.has(sb.id)) {
                mergedMap.set(sb.id, sb);
              }
            });
            setAllPosts(Array.from(mergedMap.values()));
            return;
          }
        }
      } catch (err) {
        console.warn("Using persistent local blog list:", err);
      }

      setAllPosts(stored);
    }
    loadBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.category)))];

  const filteredPosts = allPosts.filter((post) => {
    const titleMatch = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const summaryMatch = post.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const keywordsMatch = Array.isArray(post.keywords)
      ? post.keywords.some((kw: string) => kw.toLowerCase().includes(searchTerm.toLowerCase()))
      : false;

    const matchesSearch = titleMatch || summaryMatch || keywordsMatch;
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Blog Page Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KNOWLEDGE HUB & INSIGHTS</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Insights & Latest Updates
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Stay updated with corporate insights on workflow automation, AI development, smart IoT, and solar sustainability.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-[1320px] mx-auto px-6">
        
        {/* Search and Filters bar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 mb-12 bg-[#F8F9FC] border border-[#ECECEC] p-6 rounded-2xl">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6470]" />
            <input
              type="text"
              placeholder="Search by keywords or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-[#5B6470] uppercase mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0F2D63] text-white"
                    : "bg-white text-[#5B6470] border border-[#ECECEC] hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white border border-[#ECECEC] rounded-[24px] overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Article image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0F2D63] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-100">
                      {post.category}
                    </div>
                  </div>

                  {/* Article Text */}
                  <div className="p-8 text-left">
                    <div className="flex items-center gap-4 text-xs text-[#5B6470] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E5AF2B]" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E5AF2B]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="font-serif font-bold text-xl md:text-2xl text-[#1B1B1B] mb-3 leading-tight hover:text-[#0F2D63] transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-sm text-[#5B6470] leading-relaxed mb-6">
                      {post.summary}
                    </p>

                    {/* Keywords Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.keywords.map((kw, i) => (
                        <span 
                          key={i} 
                          className="bg-[#F8F9FC] text-[10px] font-mono text-[#5B6470] px-2 py-1 rounded-md border border-[#ECECEC]"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-8 pb-8 pt-4 text-left border-t border-[#F8F9FC] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1um71-j8a4UUlpBz_7R0HMzOgkCuXB4Un" 
                        alt="Author" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#1B1B1B]">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors group"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F8F9FC] rounded-2xl border border-dashed border-[#ECECEC]">
            <p className="text-[#5B6470] text-base mb-4">No posts found matching your search parameters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="px-6 py-2.5 rounded-xl bg-[#0F2D63] text-white text-xs font-bold transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
