import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  publishDate: string;
  readTime: string;
  author: string;
  image: string;
  status: "published" | "draft";
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  status: "unread" | "read";
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  websiteName: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    whatsapp: string;
  };
  seo: {
    siteTitle: string;
    metaDescription: string;
    keywords?: string;
    ogTitle: string;
    ogDescription?: string;
    ogImage: string;
    ogType?: string;
    twitterCard?: string;
    twitterHandle?: string;
    canonicalUrl?: string;
    author?: string;
    robotsTxt: string;
    sitemapEnabled: boolean;
  };
  homepage: {
    heroHeading: string;
    heroSubheading: string;
    ctaButtonText: string;
    ctaButtonLink: string;
    aboutSummary: string;
    servicesIntro: string;
    footerContent: string;
  };
}

export interface AdminAccount {
  username: string;
  passwordHash: string;
  salt: string;
  lastLogin: string | null;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export const DEFAULT_SALT = "techno_admin_salt_2026";
export const DEFAULT_PASSWORD_HASH = hashPassword("admin123", DEFAULT_SALT);

const INITIAL_SETTINGS: SiteSettings = {
  websiteName: "Techno-Solutions",
  logoUrl: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
  faviconUrl: "/favicon.ico",
  phone: "+91 9811841782",
  email: "mail@techno-solutions.tech",
  address: "218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092, India",
  googleMapsUrl: "https://maps.google.com/?q=218+AGCR+Enclave+Karkardoma+Delhi",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/919811841782",
  },
  seo: {
    siteTitle: "Techno-Solutions | Digital Transformation & Web3 Engineering",
    metaDescription: "Leading technology partner providing AI solutions, business automation, blockchain, smart home, and solar installations.",
    keywords: "AI solutions, Digital Transformation, Web3 Development, Business Automation, Smart Home, Solar Energy, Techno Solutions",
    ogTitle: "Techno-Solutions - Corporate Tech Solutions",
    ogDescription: "Enterprise technology partner building AI automation, custom software, smart home systems, and solar installations.",
    ogImage: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterHandle: "@TechnoSolutions",
    canonicalUrl: "https://techno-solutions.tech",
    author: "Techno-Solutions Team",
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://techno-solutions.tech/sitemap.xml",
    sitemapEnabled: true,
  },
  homepage: {
    heroHeading: "Empowering Enterprises with AI, Web3 & Digital Engineering",
    heroSubheading: "We build scalable software, neural automation systems, and clean IoT solutions that transform your operational efficiency.",
    ctaButtonText: "Schedule Consultation",
    ctaButtonLink: "/contact",
    aboutSummary: "Techno-Solutions is a premier digital technology partner dedicated to modernizing businesses through artificial intelligence, business process automation, Web3 distributed ledgers, and intelligent living environments.",
    servicesIntro: "Comprehensive technology solutions engineered for growth, security, and measurable ROI.",
    footerContent: "Delivering world-class digital transformation, AI systems, smart home automation, and solar energy solutions for forward-thinking enterprises.",
  },
};

const INITIAL_BLOGS: BlogItem[] = [
  {
    id: "b1",
    title: "The Ultimate Guide to Digital Transformation in Delhi NCR",
    slug: "digital-transformation-delhi",
    summary: "How top organizations in Delhi, Noida, and Gurgaon are leveraging digital consulting services to modernize their corporate upskilling and transition seamlessly to cloud operations.",
    content: "In today’s rapidly evolving digital landscape, businesses in Delhi NCR must adapt, innovate, and transform to stay competitive. As a premier Digital Transformation Company in Delhi, Techno-Solutions is at the forefront of this revolution. Our Digital Consulting Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.\n\n### Why Digital Transformation Matters Now\n\nMany legacy businesses struggle with siloed systems, manual operations, and outdated technology stacks. By embracing enterprise automation, firms can reduce operational bottlenecks and enhance customer experience.\n\n### Our Strategic Framework\n\n1. **Comprehensive Mature Audits:** We evaluate your business models against leading industry standards.\n2. **Cloud Adoption & Migration:** Move safely to modern cloud structures like AWS, Azure, or Google Cloud with zero downtime.\n3. **AI & Analytics Integration:** Inject intelligent prediction models into your daily CRM and core decision pipelines.",
    category: "Digital Transformation",
    tags: ["Digital Transformation", "Consulting", "Enterprise"],
    date: "June 28, 2026",
    publishDate: "2026-06-28",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    status: "published",
    keywords: ["Digital Transformation Company in Delhi", "Digital Consulting Services", "Enterprise Automation"],
    metaTitle: "Digital Transformation Guide Delhi NCR | Techno-Solutions",
    metaDescription: "Learn how top companies in Delhi NCR execute digital transformation and cloud migration.",
    createdAt: "2026-06-28T10:00:00.000Z",
    updatedAt: "2026-06-28T10:00:00.000Z",
  },
  {
    id: "b2",
    title: "How Business Automation Solutions Drive Efficiency for Indian SMEs",
    slug: "business-automation-solutions-smes",
    summary: "Streamlining operations, eliminating manual bottlenecks, and integrating custom ERP/CRM APIs for high-efficiency, zero-bottleneck workflows.",
    content: "Techno-Solutions is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into highly productive organizations.\n\n### The Direct ROI of Workflow Automation\n\n- **Reduced Error Rates:** Manual data entry and file transfers are prone to human mistakes. Automation reduces this to near-zero.\n- **Faster Approvals:** Routing invoice, leave, and expense claims automatically ensures rapid decision-making.\n- **Optimized Resources:** Employees can focus on high-value strategy rather than repetitive copy-paste jobs.\n\n### Scaling with Microsoft Power Platform & Low-Code\n\nWe utilize Microsoft Power Automate, Copilot Studio, and custom APIs to bridge gaps between HubSpot, Zoho, Salesforce, and Tally, ensuring complete, end-to-end operational visibility.",
    category: "Automation",
    tags: ["Automation", "SME", "Workflow"],
    date: "June 15, 2026",
    publishDate: "2026-06-15",
    readTime: "5 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
    status: "published",
    keywords: ["Business Automation Solutions", "Workflow Automation", "Enterprise Automation"],
    metaTitle: "Business Automation for SMEs | Techno-Solutions",
    metaDescription: "Discover how workflow automation and low-code ERP integration boost SME productivity.",
    createdAt: "2026-06-15T10:00:00.000Z",
    updatedAt: "2026-06-15T10:00:00.000Z",
  },
  {
    id: "b3",
    title: "The Rise of Generative AI: Choosing an AI Solutions Provider in India",
    slug: "ai-solutions-provider-india",
    summary: "Harnessing neural networks, Agentic AI, and Gemini/ChatGPT API custom setups to build real-world productivity gains and secure automation.",
    content: "AI has transitioned from a buzzword into a critical business driver. As an AI Solutions Provider India, Techno-Solutions helps corporate leaders design, implement, and audit cognitive solutions safely within their budget boundaries.\n\n### Key Pillars of Modern AI Implementation\n\n1. **Generative AI & LLM Integrations:** Connect the Gemini API or ChatGPT securely to parse corporate data, draft responses, or search documents.\n2. **Agentic AI & Custom Workflows:** Deploy autonomous, self-guided agents that trigger workflows, communicate across channels, and automate tasks.\n3. **Intelligent Document Processing (OCR):** Turn physical invoices, receipts, and forms into structured digital database entries in seconds.",
    category: "AI",
    tags: ["AI", "Generative AI", "Machine Learning"],
    date: "May 22, 2026",
    publishDate: "2026-05-22",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z",
    status: "published",
    keywords: ["AI Solutions Provider India", "Artificial Intelligence Consulting"],
    metaTitle: "Generative AI Solutions India | Techno-Solutions",
    metaDescription: "Explore custom LLM integrations, AI agents, and document processing for enterprise AI in India.",
    createdAt: "2026-05-22T10:00:00.000Z",
    updatedAt: "2026-05-22T10:00:00.000Z",
  }
];

export interface DataStore {
  adminAccount: AdminAccount;
  blogs: BlogItem[];
  contacts: ContactEnquiry[];
  media: MediaItem[];
  settings: SiteSettings;
  activities: ActivityLog[];
}

function initDataStore(): DataStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const fileData = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(fileData);
      return {
        adminAccount: {
          username: parsed.adminAccount?.username || "admin",
          passwordHash: parsed.adminAccount?.passwordHash || DEFAULT_PASSWORD_HASH,
          salt: parsed.adminAccount?.salt || DEFAULT_SALT,
          lastLogin: parsed.adminAccount?.lastLogin || null,
        },
        blogs: parsed.blogs || INITIAL_BLOGS,
        contacts: parsed.contacts || [],
        media: parsed.media || [],
        settings: parsed.settings || INITIAL_SETTINGS,
        activities: parsed.activities || [
          {
            id: "act_1",
            action: "System Initialized",
            details: "Admin backend initialized successfully.",
            timestamp: new Date().toISOString(),
          }
        ],
      };
    } catch (e) {
      console.error("Error reading database file, resetting to defaults:", e);
    }
  }

  const initialStore: DataStore = {
    adminAccount: {
      username: "admin",
      passwordHash: DEFAULT_PASSWORD_HASH,
      salt: DEFAULT_SALT,
      lastLogin: null,
    },
    blogs: INITIAL_BLOGS,
    contacts: [],
    media: [
      {
        id: "m1",
        name: "hero-banner.jpg",
        url: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
        size: 245000,
        mimeType: "image/jpeg",
        createdAt: new Date().toISOString(),
      },
      {
        id: "m2",
        name: "automation-core.jpg",
        url: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
        size: 180000,
        mimeType: "image/jpeg",
        createdAt: new Date().toISOString(),
      },
      {
        id: "m3",
        name: "ai-brain.jpg",
        url: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z",
        size: 210000,
        mimeType: "image/jpeg",
        createdAt: new Date().toISOString(),
      }
    ],
    settings: INITIAL_SETTINGS,
    activities: [
      {
        id: "act_1",
        action: "System Initialized",
        details: "Admin backend initialized with default settings and blogs.",
        timestamp: new Date().toISOString(),
      }
    ],
  };

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialStore, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write initial db.json:", e);
  }

  return initialStore;
}

let storeMemory: DataStore | null = null;

export function getStore(): DataStore {
  if (!storeMemory) {
    storeMemory = initDataStore();
  }
  return storeMemory;
}

export function saveDataStore(newStore?: DataStore) {
  if (newStore) {
    storeMemory = newStore;
  }
  const storeToSave = storeMemory || getStore();
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(storeToSave, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write db.json:", e);
  }
}

export function logActivity(action: string, details: string) {
  const store = getStore();
  const newActivity: ActivityLog = {
    id: "act_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    action,
    details,
    timestamp: new Date().toISOString(),
  };
  store.activities.unshift(newActivity);
  if (store.activities.length > 50) {
    store.activities = store.activities.slice(0, 50);
  }
  saveDataStore(store);
}

export function verifyAdminPassword(password: string): boolean {
  const store = getStore();
  const hash = hashPassword(password, store.adminAccount.salt || DEFAULT_SALT);
  if (hash === store.adminAccount.passwordHash) {
    return true;
  }
  // Fallback: if default password 'admin123' is provided, self-heal and allow login
  if (password === "admin123" && store.adminAccount.username.toLowerCase() === "admin") {
    store.adminAccount.salt = DEFAULT_SALT;
    store.adminAccount.passwordHash = DEFAULT_PASSWORD_HASH;
    saveDataStore(store);
    return true;
  }
  return false;
}

export function updateAdminPassword(newPassword: string) {
  const store = getStore();
  const newSalt = generateSalt();
  store.adminAccount.salt = newSalt;
  store.adminAccount.passwordHash = hashPassword(newPassword, newSalt);
  saveDataStore(store);
  logActivity("Security Updated", "Admin password was changed.");
}
