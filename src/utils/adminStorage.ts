import { BLOG_POSTS } from "../data";

export interface StoredBlog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  keywords: string[];
  image: string;
  status: "published" | "draft";
  metaTitle: string;
  metaDescription: string;
  author: string;
  readTime: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoredContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  status: "unread" | "read";
}

const KEYS = {
  BLOGS: "ts_admin_blogs",
  CONTACTS: "ts_admin_contacts",
};

/**
 * Retrieves all stored blogs from localStorage.
 * Seeds from static data if empty.
 */
export function getStoredBlogs(): StoredBlog[] {
  try {
    const raw = localStorage.getItem(KEYS.BLOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load blogs from localStorage:", e);
  }

  // Seed default blogs if localStorage is empty or uninitialized
  const initialBlogs: StoredBlog[] = BLOG_POSTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    content: p.content,
    category: p.category,
    tags: (p as any).tags || [],
    keywords: p.keywords || [],
    image: p.image,
    status: "published",
    metaTitle: `${p.title} | Techno-Solutions`,
    metaDescription: p.summary,
    author: p.author || "Sanjeev Goel",
    readTime: p.readTime || "5 min read",
    date: p.date,
  }));

  try {
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(initialBlogs));
  } catch (e) {
    console.warn("Failed to seed initial blogs in localStorage:", e);
  }

  return initialBlogs;
}

/**
 * Saves and validates blog list persistence in localStorage.
 * Reads back from localStorage to ensure data was written successfully.
 */
export function saveStoredBlogs(blogs: StoredBlog[]): boolean {
  if (!Array.isArray(blogs)) {
    throw new Error("Validation Error: Blogs data must be a valid array.");
  }

  const jsonString = JSON.stringify(blogs);
  localStorage.setItem(KEYS.BLOGS, jsonString);

  // Validation step: Read back from storage to ensure correct write
  const verificationRaw = localStorage.getItem(KEYS.BLOGS);
  if (!verificationRaw) {
    throw new Error("Storage Verification Failed: Data could not be read back from local storage.");
  }

  const verificationParsed = JSON.parse(verificationRaw);
  if (!Array.isArray(verificationParsed) || verificationParsed.length !== blogs.length) {
    throw new Error("Storage Verification Failed: Local storage record count mismatch.");
  }

  return true;
}

/**
 * Validates, saves, and verifies a single blog post creation or update.
 * Ensures data is correctly written before caller updates component state.
 */
export function saveOrUpdateBlog(blog: Partial<StoredBlog>): StoredBlog {
  // 1. Validation Step
  if (!blog.title || !blog.title.trim()) {
    throw new Error("Validation Error: Blog title cannot be empty.");
  }
  if (!blog.content || !blog.content.trim()) {
    throw new Error("Validation Error: Blog content cannot be empty.");
  }

  const currentBlogs = getStoredBlogs();
  const titleTrimmed = blog.title.trim();
  const cleanSlug = blog.slug && blog.slug.trim()
    ? blog.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : titleTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const blogId = blog.id || `blog_${Date.now()}`;
  const now = new Date();

  const formattedBlog: StoredBlog = {
    id: blogId,
    title: titleTrimmed,
    slug: cleanSlug,
    summary: blog.summary?.trim() || titleTrimmed,
    content: blog.content,
    category: blog.category || "Digital Transformation",
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    keywords: Array.isArray(blog.keywords) ? blog.keywords : [],
    image: blog.image?.trim() || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    status: blog.status === "draft" ? "draft" : "published",
    metaTitle: blog.metaTitle?.trim() || `${titleTrimmed} | Techno-Solutions`,
    metaDescription: blog.metaDescription?.trim() || blog.summary?.trim() || titleTrimmed,
    author: blog.author?.trim() || "Sanjeev Goel",
    readTime: blog.readTime || "5 min read",
    date: blog.date || now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    createdAt: blog.createdAt || now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const existingIndex = currentBlogs.findIndex((b) => b.id === blogId || b.slug === cleanSlug);
  let updatedBlogsList: StoredBlog[];

  if (existingIndex >= 0) {
    updatedBlogsList = [...currentBlogs];
    updatedBlogsList[existingIndex] = { ...updatedBlogsList[existingIndex], ...formattedBlog };
  } else {
    updatedBlogsList = [formattedBlog, ...currentBlogs];
  }

  // Save with validation read-back
  saveStoredBlogs(updatedBlogsList);

  // Secondary verification step: Read item back from localStorage
  const verificationBlogs = getStoredBlogs();
  const savedItem = verificationBlogs.find((b) => b.id === blogId || b.slug === cleanSlug);
  if (!savedItem) {
    throw new Error("Storage Verification Failed: Created blog post could not be verified in local storage.");
  }

  return savedItem;
}

/**
 * Deletes a stored blog post with validation read-back.
 */
export function deleteStoredBlog(id: string): boolean {
  const currentBlogs = getStoredBlogs();
  const filtered = currentBlogs.filter((b) => b.id !== id);
  saveStoredBlogs(filtered);

  // Verification step
  const verify = getStoredBlogs();
  if (verify.some((b) => b.id === id)) {
    throw new Error("Storage Verification Failed: Blog item was not successfully removed.");
  }
  return true;
}

/**
 * Contact Submissions Storage Handlers
 */
export function getStoredContacts(): StoredContact[] {
  try {
    const raw = localStorage.getItem(KEYS.CONTACTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load contacts from localStorage:", e);
  }
  return [];
}

export function saveStoredContacts(contacts: StoredContact[]): boolean {
  if (!Array.isArray(contacts)) {
    throw new Error("Validation Error: Contacts data must be an array.");
  }
  const jsonString = JSON.stringify(contacts);
  localStorage.setItem(KEYS.CONTACTS, jsonString);

  // Read-back verification
  const verificationRaw = localStorage.getItem(KEYS.CONTACTS);
  if (!verificationRaw) {
    throw new Error("Storage Verification Failed: Contact data could not be verified in local storage.");
  }
  return true;
}

export function addContactSubmission(submission: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}): StoredContact {
  if (!submission.name || !submission.name.trim()) {
    throw new Error("Validation Error: Name is required.");
  }
  if (!submission.email || !submission.email.trim()) {
    throw new Error("Validation Error: Email is required.");
  }
  if (!submission.message || !submission.message.trim()) {
    throw new Error("Validation Error: Message is required.");
  }

  const currentContacts = getStoredContacts();
  const newContact: StoredContact = {
    id: `lead_${Date.now()}`,
    name: submission.name.trim(),
    email: submission.email.trim(),
    phone: submission.phone?.trim() || "Not Provided",
    service: submission.service?.trim() || "General Inquiry",
    message: submission.message.trim(),
    timestamp: new Date().toISOString(),
    status: "unread",
  };

  const updatedList = [newContact, ...currentContacts];
  saveStoredContacts(updatedList);

  // Verification read-back check
  const verifiedList = getStoredContacts();
  const verifiedItem = verifiedList.find((c) => c.id === newContact.id);
  if (!verifiedItem) {
    throw new Error("Storage Verification Failed: Contact lead was not correctly saved.");
  }

  return verifiedItem;
}

export function updateContactStatus(id: string, status: "unread" | "read"): boolean {
  const current = getStoredContacts();
  const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
  saveStoredContacts(updated);
  return true;
}

export function deleteStoredContact(id: string): boolean {
  const current = getStoredContacts();
  const filtered = current.filter((c) => c.id !== id);
  saveStoredContacts(filtered);

  const verify = getStoredContacts();
  if (verify.some((c) => c.id === id)) {
    throw new Error("Storage Verification Failed: Contact item was not deleted.");
  }
  return true;
}
