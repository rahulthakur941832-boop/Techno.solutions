import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../data";
import { Calendar, Clock, ArrowLeft, Send, Sparkles, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { getStoredBlogs } from "../utils/adminStorage";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>(() => {
    const stored = getStoredBlogs();
    return stored.find((p) => p.slug === slug || p.id === slug) || BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
  });
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    async function loadPost() {
      if (!slug) return;

      // Check persistent local storage first
      const stored = getStoredBlogs();
      const localFound = stored.find((p) => p.slug === slug || p.id === slug);
      if (localFound) {
        setPost(localFound);
        setLoading(false);
      }

      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const text = await res.text();
          const data = text ? JSON.parse(text) : null;
          if (data && data.blog) {
            setPost(data.blog);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Error loading single blog from API:", err);
      }

      if (!localFound) {
        const found = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setPost(found);
        }
      }
      setLoading(false);
    }

    loadPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-36 pb-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-slate-500 mb-8">The requested blog post could not be located.</p>
        <Link to="/blog" className="px-6 py-2.5 rounded-xl bg-[#0F2D63] text-white font-bold text-sm">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Get other/recent posts
  const recentPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Article Navigation Bar */}
      <div className="bg-[#F8F9FC] border-b border-[#ECECEC] py-4">
        <div className="max-w-[1320px] mx-auto px-6 text-left">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO ALL BLOGS</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Area */}
          <article className="lg:col-span-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2D63]/5 border border-[#ECECEC] text-[10px] text-[#0F2D63] font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-3 h-3 text-[#E5AF2B]" />
              <span>{post.category}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-[#5B6470] text-lg leading-relaxed mb-8 font-medium border-l-4 border-[#E5AF2B] pl-4">
              {post.summary}
            </p>

            {/* Author info & stats */}
            <div className="flex items-center gap-6 pb-8 border-b border-[#ECECEC] mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1um71-j8a4UUlpBz_7R0HMzOgkCuXB4Un" 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1B1B1B]">{post.author}</span>
                  <span className="text-[10px] uppercase text-[#5B6470] font-semibold">Chief Consultant</span>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-[#ECECEC]" />

              <div className="flex items-center gap-4 text-xs text-[#5B6470]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E5AF2B]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E5AF2B]" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Large Cover Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 bg-slate-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Render formatted body text */}
            <div className="prose max-w-none text-[#1B1B1B] leading-relaxed space-y-6 text-base">
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("###")) {
                  return (
                    <h3 key={i} className="font-serif text-2xl font-bold text-[#0F2D63] pt-4 pb-2">
                      {para.replace("###", "").trim()}
                    </h3>
                  );
                } else if (para.startsWith("-") || para.startsWith("*")) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 text-[#5B6470]">
                      {para.split("\n").map((li, idx) => (
                        <li key={idx}>{li.replace(/^[-\*]\s+/, "").trim()}</li>
                      ))}
                    </ul>
                  );
                } else if (para.match(/^\d+\./)) {
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-2 text-[#5B6470]">
                      {para.split("\n").map((li, idx) => (
                        <li key={idx}>{li.replace(/^\d+\.\s+/, "").trim()}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className="text-[#5B6470]">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Keyword tags footer */}
            <div className="mt-12 pt-8 border-t border-[#ECECEC] flex flex-wrap gap-2">
              <span className="text-xs font-bold text-[#1B1B1B] mr-2 self-center">Keywords:</span>
              {post.keywords.map((kw, i) => (
                <span 
                  key={i} 
                  className="bg-[#F8F9FC] text-xs text-[#5B6470] font-mono px-3 py-1.5 rounded-lg border border-[#ECECEC]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8 text-left">
            {/* Consultation Card */}
            <div className="bg-[#0F2D63] text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">Need Expert Solutions?</h3>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Sanjeev Goel and our expert consultants offer direct digital strategies custom-built to increase your productivity and efficiency.
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex flex-col gap-3 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                    <span>+91 9811841782</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                    <span>mail@techno-solutions.tech</span>
                  </div>
                </div>

                <Link 
                  to="/contact"
                  className="w-full text-center py-3 bg-[#E5AF2B] text-[#0F2D63] font-bold text-sm rounded-xl hover:bg-amber-400 active:scale-95 transition-all mt-2"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="p-8 border border-[#ECECEC] rounded-3xl bg-white">
              <h3 className="font-serif font-bold text-lg text-[#1B1B1B] mb-6">Recent Articles</h3>
              <div className="flex flex-col gap-6">
                {recentPosts.map((rp) => (
                  <div key={rp.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#1B1B1B] hover:text-[#0F2D63] line-clamp-2 leading-snug">
                        <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                      </h4>
                      <span className="text-[10px] text-[#5B6470]">{rp.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
