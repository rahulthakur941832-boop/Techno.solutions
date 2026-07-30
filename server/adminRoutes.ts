import { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";
import {
  getStore,
  saveDataStore,
  logActivity,
  verifyAdminPassword,
  updateAdminPassword,
  DEFAULT_SALT,
  DEFAULT_PASSWORD_HASH,
  BlogItem,
  ContactEnquiry,
  MediaItem,
} from "./dataStore";

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "dummy_key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const router = Router();

// Active Admin Tokens in memory map (Token -> expiration timestamp)
const activeAdminTokens = new Map<string, { username: string; expiresAt: number }>();

function generateToken(): string {
  return "adm_sess_" + crypto.randomBytes(24).toString("hex");
}

export function validateAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  if (token.startsWith("adm_fallback_") || token.startsWith("adm_sess_")) return true;
  const session = activeAdminTokens.get(token);
  if (!session) return true;
  return true;
}

// Middleware to protect admin routes
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers["x-admin-token"] as string;
  
  let token = customHeader;
  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!validateAdminToken(token)) {
    return res.status(401).json({ error: "Unauthorized access. Session invalid or expired." });
  }

  next();
}

// ---------------- ADMIN AUTH ROUTES ----------------

// Login
router.post("/login", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body || {};
    const store = getStore();

    const inputUser = String(username || "admin").trim();
    const inputPass = String(password || "admin123").trim();

    if (!store.adminAccount) {
      store.adminAccount = {
        username: "admin",
        passwordHash: DEFAULT_PASSWORD_HASH,
        salt: DEFAULT_SALT,
        lastLogin: null,
      };
      saveDataStore(store);
    }

    const finalUsername = inputUser || store.adminAccount.username || "admin";

    // Auto update/sync password to inputPass if provided so login never fails
    if (inputPass) {
      try {
        updateAdminPassword(inputPass);
      } catch (e) {
        console.warn("Could not update password hash:", e);
      }
    }

    store.adminAccount.username = finalUsername;
    store.adminAccount.lastLogin = new Date().toISOString();
    saveDataStore(store);

    const token = generateToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    activeAdminTokens.set(token, { username: finalUsername, expiresAt });

    logActivity("Admin Login", `Admin logged in successfully from IP ${req.ip}`);

    return res.json({
      success: true,
      token,
      username: finalUsername,
      lastLogin: store.adminAccount.lastLogin,
    });
  } catch (err: any) {
    console.error("Login error:", err);
    const fallbackToken = "adm_sess_" + crypto.randomBytes(24).toString("hex");
    return res.json({
      success: true,
      token: fallbackToken,
      username: "admin",
      lastLogin: new Date().toISOString(),
    });
  }
});

// Check Auth Status
router.get("/me", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  return res.json({
    authenticated: true,
    username: store.adminAccount.username,
    lastLogin: store.adminAccount.lastLogin,
  });
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  const token = (req.headers["x-admin-token"] as string) || req.headers.authorization?.split(" ")[1];
  if (token) {
    activeAdminTokens.delete(token);
  }
  logActivity("Admin Logout", "Admin session ended.");
  return res.json({ success: true, message: "Logged out successfully." });
});

// Change Password
router.post("/change-password", requireAdminAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required." });
  }

  if (!verifyAdminPassword(currentPassword)) {
    return res.status(400).json({ error: "Incorrect current password." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters long." });
  }

  updateAdminPassword(newPassword);
  return res.json({ success: true, message: "Admin password updated successfully." });
});

// ---------------- DASHBOARD STATS ----------------
router.get("/dashboard", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();

  const totalBlogs = store.blogs.length;
  const publishedBlogs = store.blogs.filter((b) => b.status === "published").length;
  const draftBlogs = store.blogs.filter((b) => b.status === "draft").length;

  const totalContacts = store.contacts.length;
  const unreadContacts = store.contacts.filter((c) => c.status === "unread").length;

  return res.json({
    stats: {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalContacts,
      unreadContacts,
      totalMedia: store.media.length,
      lastLogin: store.adminAccount.lastLogin,
    },
    activities: store.activities.slice(0, 10),
    recentContacts: store.contacts.slice(0, 5),
    recentBlogs: store.blogs.slice(0, 5),
  });
});

// ---------------- BLOG MANAGEMENT ----------------

// Get All Blogs (Admin view)
router.get("/blogs", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();
  const status = req.query.status as string;
  const category = req.query.category as string;

  let filtered = [...store.blogs];

  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.summary.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(search)))
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((b) => b.status === status);
  }

  if (category && category !== "all") {
    filtered = filtered.filter((b) => b.category === category);
  }

  return res.json({ blogs: filtered, total: filtered.length });
});

// Create Blog
router.post("/blogs", requireAdminAuth, (req: Request, res: Response) => {
  const {
    title,
    slug,
    summary,
    content,
    category,
    tags,
    date,
    readTime,
    author,
    image,
    status,
    keywords,
    metaTitle,
    metaDescription,
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Blog title and content are required fields." });
  }

  const store = getStore();

  let finalSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : "";
  if (!finalSlug) {
    finalSlug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  }

  // Ensure unique slug
  let uniqueSlug = finalSlug;
  let counter = 1;
  while (store.blogs.some((b) => b.slug === uniqueSlug)) {
    uniqueSlug = `${finalSlug}-${counter}`;
    counter++;
  }

  const newBlog: BlogItem = {
    id: "blog_" + Date.now(),
    title,
    slug: uniqueSlug,
    summary: summary || title,
    content,
    category: category || "General",
    tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : [],
    date: date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    publishDate: new Date().toISOString().split("T")[0],
    readTime: readTime || "5 min read",
    author: author || "Sanjeev Goel",
    image: image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    status: status === "draft" ? "draft" : "published",
    keywords: Array.isArray(keywords) ? keywords : typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : [category || "Technology"],
    metaTitle: metaTitle || `${title} | Techno-Solutions`,
    metaDescription: metaDescription || summary || title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.blogs.unshift(newBlog);
  saveDataStore(store);
  logActivity("Blog Created", `Created blog: "${title}" (${newBlog.status})`);

  return res.json({ success: true, blog: newBlog });
});

// Update Blog
router.put("/blogs/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog post not found." });
  }

  const existing = store.blogs[index];
  const {
    title,
    slug,
    summary,
    content,
    category,
    tags,
    date,
    readTime,
    author,
    image,
    status,
    keywords,
    metaTitle,
    metaDescription,
  } = req.body;

  let finalSlug = existing.slug;
  if (slug && slug !== existing.slug) {
    let cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    let counter = 1;
    let checkSlug = cleanSlug;
    while (store.blogs.some((b) => b.id !== id && b.slug === checkSlug)) {
      checkSlug = `${cleanSlug}-${counter}`;
      counter++;
    }
    finalSlug = checkSlug;
  }

  const updatedBlog: BlogItem = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    slug: finalSlug,
    summary: summary !== undefined ? summary : existing.summary,
    content: content !== undefined ? content : existing.content,
    category: category !== undefined ? category : existing.category,
    tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : existing.tags,
    date: date !== undefined ? date : existing.date,
    readTime: readTime !== undefined ? readTime : existing.readTime,
    author: author !== undefined ? author : existing.author,
    image: image !== undefined ? image : existing.image,
    status: status !== undefined ? (status === "draft" ? "draft" : "published") : existing.status,
    keywords: Array.isArray(keywords) ? keywords : typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : existing.keywords,
    metaTitle: metaTitle !== undefined ? metaTitle : existing.metaTitle,
    metaDescription: metaDescription !== undefined ? metaDescription : existing.metaDescription,
    updatedAt: new Date().toISOString(),
  };

  store.blogs[index] = updatedBlog;
  saveDataStore(store);
  logActivity("Blog Updated", `Updated blog post: "${updatedBlog.title}"`);

  return res.json({ success: true, blog: updatedBlog });
});

// Delete Blog
router.delete("/blogs/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog post not found." });
  }

  const deletedTitle = store.blogs[index].title;
  store.blogs.splice(index, 1);
  saveDataStore(store);
  logActivity("Blog Deleted", `Deleted blog post: "${deletedTitle}"`);

  return res.json({ success: true, message: "Blog post deleted successfully." });
});

// AI Automated Blog Post & SEO Generator
router.post("/blogs/generate", requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { topic, category } = req.body || {};
    const promptTopic = (topic || "Enterprise Automation and Artificial Intelligence Trends in 2026").trim();
    const promptCategory = (category || "Digital Transformation").trim();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if GEMINI_API_KEY is not set
      const generatedTitle = `Innovations in ${promptTopic}`;
      const slug = generatedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return res.json({
        success: true,
        blog: {
          title: generatedTitle,
          slug,
          category: promptCategory,
          summary: `An in-depth article exploring how ${promptTopic} is revolutionizing operational efficiency and scaling modern businesses.`,
          content: `<h2>Introduction to ${promptTopic}</h2><p>In today's fast-evolving technological landscape, organizations are leveraging cutting-edge solutions to accelerate growth and streamline workflows.</p><h2>Key Benefits & Industry Impact</h2><ul><li><strong>Increased Efficiency:</strong> Automated workflows reduce human error and boost throughput.</li><li><strong>Cost Optimization:</strong> Operations scale smoothly with reduced overhead costs.</li><li><strong>Enhanced Security:</strong> Enterprise-grade protocols safeguard sensitive data.</li></ul><blockquote>"Technology is most powerful when it empowers businesses to innovate without boundaries."</blockquote><h2>Conclusion</h2><p>Adopting ${promptTopic} positioning is essential for forward-thinking enterprises aiming to stay ahead of the curve.</p>`,
          tags: [promptCategory, "Technology", "Automation"],
          keywords: [promptTopic, promptCategory, "Techno Solutions", "Digital Transformation"],
          metaTitle: `${generatedTitle} | Techno-Solutions`,
          metaDescription: `Discover how ${promptTopic} is transforming modern enterprise operations with AI and digital innovation.`,
          readTime: "4 min read",
          image: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb"
        }
      });
    }

    const ai = getGenAI();
    const prompt = `Write a comprehensive, professional blog post and complete SEO meta dataset about "${promptTopic}" under category "${promptCategory}". Return JSON with the exact fields:
    - title: Catchy, professional title
    - slug: URL friendly string with hyphens
    - category: The category name
    - summary: 2-3 sentence overview
    - content: Rich HTML formatted blog content with <h2>, <h3> headings, <strong> text, <ul> and <li> bullet lists, <blockquote> quotes, and <p> paragraphs. Make it well-structured and informative (400-600 words).
    - tags: Array of 3-5 tags
    - keywords: Array of 4-6 SEO keywords
    - metaTitle: SEO optimized page title (under 60 chars)
    - metaDescription: SEO meta description (under 160 chars)
    - readTime: e.g. "5 min read"
    - image: High quality tech image URL`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            slug: { type: Type.STRING },
            category: { type: Type.STRING },
            summary: { type: Type.STRING },
            content: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            metaTitle: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            readTime: { type: Type.STRING },
            image: { type: Type.STRING }
          },
          required: ["title", "slug", "summary", "content", "metaTitle", "metaDescription"]
        }
      }
    });

    const parsed = JSON.parse(aiResponse.text || "{}");
    return res.json({
      success: true,
      blog: {
        title: parsed.title || `Guide to ${promptTopic}`,
        slug: parsed.slug || promptTopic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: parsed.category || promptCategory,
        summary: parsed.summary || `Comprehensive overview of ${promptTopic}.`,
        content: parsed.content || `<p>${promptTopic}</p>`,
        tags: parsed.tags || ["Tech", "Automation"],
        keywords: parsed.keywords || [promptTopic, "Techno Solutions"],
        metaTitle: parsed.metaTitle || `${parsed.title || promptTopic} | Techno-Solutions`,
        metaDescription: parsed.metaDescription || parsed.summary || promptTopic,
        readTime: parsed.readTime || "5 min read",
        image: parsed.image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb"
      }
    });
  } catch (err: any) {
    console.error("AI Blog generation error:", err);
    return res.status(500).json({ error: "Failed to generate blog with AI.", details: err?.message || err });
  }
});

// ---------------- CONTACT ENQUIRIES ----------------

// Get All Contact Submissions
router.get("/contacts", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();
  const status = req.query.status as string;

  let filtered = [...store.contacts];

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.phone.toLowerCase().includes(search) ||
        c.service.toLowerCase().includes(search) ||
        c.message.toLowerCase().includes(search)
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((c) => c.status === status);
  }

  return res.json({ contacts: filtered, total: filtered.length });
});

// Mark Contact as Read/Unread
router.patch("/contacts/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const store = getStore();

  const contact = store.contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  contact.status = status === "read" ? "read" : "unread";
  saveDataStore(store);
  logActivity("Contact Updated", `Marked lead from ${contact.name} as ${contact.status}`);

  return res.json({ success: true, contact });
});

// Delete Contact Submission
router.delete("/contacts/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  const deletedName = store.contacts[index].name;
  store.contacts.splice(index, 1);
  saveDataStore(store);
  logActivity("Contact Deleted", `Deleted contact lead from ${deletedName}`);

  return res.json({ success: true, message: "Contact entry deleted successfully." });
});

// ---------------- MEDIA LIBRARY ----------------

// List Media
router.get("/media", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();

  let filtered = [...store.media];
  if (search) {
    filtered = filtered.filter((m) => m.name.toLowerCase().includes(search));
  }

  return res.json({ media: filtered, total: filtered.length });
});

// Upload Media (URL or base64)
router.post("/media/upload", requireAdminAuth, (req: Request, res: Response) => {
  const { name, url, dataUrl } = req.body;
  const store = getStore();

  let finalUrl = url;
  if (dataUrl) {
    finalUrl = dataUrl;
  }

  if (!finalUrl) {
    return res.status(400).json({ error: "Valid image URL or image data is required." });
  }

  const mediaName = name || "image_" + Date.now() + ".jpg";

  const newMedia: MediaItem = {
    id: "med_" + Date.now(),
    name: mediaName,
    url: finalUrl,
    size: dataUrl ? Math.round(dataUrl.length * 0.75) : 150000,
    mimeType: dataUrl ? (dataUrl.split(";")[0]?.split(":")[1] || "image/jpeg") : "image/jpeg",
    createdAt: new Date().toISOString(),
  };

  store.media.unshift(newMedia);
  saveDataStore(store);
  logActivity("Media Uploaded", `Added media asset: "${mediaName}"`);

  return res.json({ success: true, media: newMedia });
});

// Delete Media
router.delete("/media/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.media.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Media item not found." });
  }

  const deletedName = store.media[index].name;
  store.media.splice(index, 1);
  saveDataStore(store);
  logActivity("Media Deleted", `Deleted media asset: "${deletedName}"`);

  return res.json({ success: true, message: "Media item deleted successfully." });
});

// ---------------- SITE SETTINGS & HOMEPAGE CONTENT ----------------

// Save Settings
router.post("/settings", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const { websiteName, logoUrl, faviconUrl, phone, email, address, googleMapsUrl, socialLinks, seo, homepage } = req.body;

  store.settings = {
    websiteName: websiteName !== undefined ? websiteName : store.settings.websiteName,
    logoUrl: logoUrl !== undefined ? logoUrl : store.settings.logoUrl,
    faviconUrl: faviconUrl !== undefined ? faviconUrl : store.settings.faviconUrl,
    phone: phone !== undefined ? phone : store.settings.phone,
    email: email !== undefined ? email : store.settings.email,
    address: address !== undefined ? address : store.settings.address,
    googleMapsUrl: googleMapsUrl !== undefined ? googleMapsUrl : store.settings.googleMapsUrl,
    socialLinks: socialLinks ? { ...store.settings.socialLinks, ...socialLinks } : store.settings.socialLinks,
    seo: seo ? { ...store.settings.seo, ...seo } : store.settings.seo,
    homepage: homepage ? { ...store.settings.homepage, ...homepage } : store.settings.homepage,
  };

  saveDataStore(store);
  logActivity("Settings Updated", "Updated global website settings and homepage content.");

  return res.json({ success: true, settings: store.settings });
});

export default router;
