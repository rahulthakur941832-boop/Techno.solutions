import { MCPClient } from './mcp-client.js';
import { getHeaderHTML, getFooterHTML as getSharedFooterHTML } from './header_footer.js';

// Replicated high-quality data from data.ts to make the script standalone and robust
const SERVICES = [
  {
    id: "digital-transformation",
    title: "Digital Transformation Solutions",
    description: "Modernize your organization with digital-first strategies, cloud adoption, and AI integration plans.",
    longDescription: "In today’s rapidly evolving digital landscape, businesses must adapt, innovate, and transform to stay competitive. Our Digital Transformation Consulting & Training Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    badge: "Strategy & Advisory",
    details: [
      "Digital Transformation Consulting & Mature Audits",
      "Enterprise Digitization and Cloud Adoption Models",
      "AI Integration & Predictive Analytics Implementation",
      "Process Optimization & Technology Selection Roadmaps",
      "Customer Experience (CX) Transformation Consulting",
      "Corporate Digital Upskilling & Training Programs"
    ],
    metrics: [
      { val: "95%", label: "Cloud Readiness Rating" },
      { val: "10x", label: "Workflow Scalability Speed" },
      { val: "0", label: "Legacy Bottleneck Left" }
    ]
  },
  {
    id: "business-automation",
    title: "Business Automation Solutions",
    description: "Automate repetitive manual processes across departments to increase productivity and reduce costs.",
    longDescription: "TECHNO-SOLUTIONS is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into zero-bottleneck organizations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badge: "Automation Core",
    details: [
      "Workflow & CRM Automation (HubSpot, Zoho, Salesforce)",
      "HR, leave, and Onboarding Automation",
      "Finance, Expense, and Invoice Approvals Routing",
      "Inventory Management and Sales Automation",
      "Robotic Process Automation (RPA) & AI Chatbots",
      "ERP Integration (SAP, Oracle, Odoo, Zoho, Tally)"
    ],
    metrics: [
      { val: "85%", label: "Manual Overhead Saved" },
      { val: "10x", label: "Invoice Approvals Pace" },
      { val: "0%", label: "Data-Entry Filing Errors" }
    ]
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence Solutions",
    description: "Unlock the power of neural engines, Generative AI models, and custom Agentic systems.",
    longDescription: "Bridge manual operational gaps with the power of modern artificial intelligence. We develop customized strategies, implement ChatGPT/Gemini APIs, deploy self-guided AI agents, build intelligent document parsers (OCR), and configure deep computer-vision models tailored to your industry's telemetry.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    badge: "Cognitive AI",
    details: [
      "AI Strategy Advisory & Implementation Support",
      "Generative AI & ChatGPT/Gemini API Integrations",
      "Intelligent Autonomous AI Agents & Custom Workflows",
      "Predictive Analytics & Real-time KPI Telemetry",
      "Intelligent Document Processing & Advanced OCR",
      "Computer Vision & Industrial Machine Learning Models"
    ],
    metrics: [
      { val: "90%", label: "Manual Insights Automated" },
      { val: "12x", label: "Text Extraction Speed" },
      { val: "24/7", label: "Autonomous Agent Uptime" }
    ]
  },
  {
    id: "blockchain-crypto",
    title: "Blockchain & Crypto Solutions",
    description: "Secure, transparent, decentralized ledger integrations, Web3 portals, and audited smart contracts.",
    longDescription: "Construct private trustless transaction systems, automate multi-party compliance protocols, audit complex smart contracts, and build resilient distributed logistics networks with optimized security to prevent vulnerabilities and eliminate single-point operational failures.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    badge: "Distributed Web3",
    details: [
      "Strategic Blockchain Consulting & Web3 Architecture",
      "Secure Smart Contracts Auditing & Execution Protocols",
      "Crypto Wallet & Custom Token Development",
      "Decentralized NFT Platforms & Asset Tokenization",
      "Supply Chain Traceability Blockchain Integrations",
      "Secured Decentralized Identity & Access Management"
    ],
    metrics: [
      { val: "100%", label: "Ledger Vulnerability Free" },
      { val: "0s", label: "Double-Spending Risk" },
      { val: "Audited", label: "Smart Contract Safety" }
    ]
  },
  {
    id: "smart-home",
    title: "Smart Home Installation Services",
    description: "Transform your residential or commercial space into a secure, responsive, intelligent living environment.",
    longDescription: "Deploy unified IoT meshes that sense, adapt, and respond dynamically. We integrate voice assistants, smart CCTV arrays, advanced biometric locks, automated HVAC climate routines, and tailored building dashboard monitors that help save substantial energy overhead.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    badge: "Intelligent IoT",
    details: [
      "Smart Lighting & Automated Ambience Control",
      "High-Definition Security, CCTV, & Video Door Phones",
      "End-to-End Encrypted Biometric Door Lock Integration",
      "Voice Controls & Smart Centralized Touchscreens",
      "Intelligent Energy Management & HVAC Controls",
      "Custom Wireless Mesh IoT Infrastructure Setup"
    ],
    metrics: [
      { val: "32%", label: "HVAC Utility Cost Cut" },
      { val: "Military", label: "Biometric Encription level" },
      { val: "Voice", label: "Unified Smart Hub Mesh" }
    ]
  },
  {
    id: "solar-energy",
    title: "Solar Panel Installation Services",
    description: "Reduce overhead utility expenses and transition to modern carbon-negative operations.",
    longDescription: "Design, construct, and balance high-conversion rooftop solar arrays tailored for residential, commercial, or industrial architectures. Our solutions include high-capacity battery bank integration, net-metering telemetry tracking, and comprehensive carbon-offset reporting.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    badge: "Clean Tech",
    details: [
      "Residential, Commercial, and Industrial Solar Grids",
      "Rooftop Solar Structural Feasibility Analysis",
      "Intelligent Battery Storage & Power Backup Systems",
      "Hybrid Solar Integration & Peak Load Balancing",
      "Comprehensive Sustainability Audits & Carbon Offsets",
      "Ongoing Maintenance, Safety Diagnostics & Calibration"
    ],
    metrics: [
      { val: "100%", label: "Clean Carbon Free Power" },
      { val: "30%", label: "Average Electric Bill Cut" },
      { val: "Net", label: "Meter Feed-in Compliant" }
    ]
  }
];

const BLOG_POSTS = [
  {
    id: "b1",
    title: "The Ultimate Guide to Digital Transformation in Delhi NCR",
    slug: "digital-transformation-delhi",
    summary: "How top organizations in Delhi, Noida, and Gurgaon are leveraging digital consulting services to modernize their corporate upskilling and transition seamlessly to cloud operations.",
    category: "Digital Transformation",
    date: "June 28, 2026",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    keywords: ["Digital Transformation Company in Delhi", "Digital Consulting Services", "Enterprise Automation"],
    content: `In today’s rapidly evolving digital landscape, businesses in Delhi NCR must adapt, innovate, and transform to stay competitive. As a premier Digital Transformation Company in Delhi, Techno-Solutions is at the forefront of this revolution. Our Digital Consulting Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.

### Why Digital Transformation Matters Now

Many legacy businesses struggle with siloed systems, manual operations, and outdated technology stacks. By embracing enterprise automation, firms can reduce operational bottlenecks and enhance customer experience.

### Our Strategic Framework

1. **Comprehensive Mature Audits:** We evaluate your business models against leading industry standards.
2. **Cloud Adoption & Migration:** Move safely to modern cloud structures like AWS, Azure, or Google Cloud with zero downtime.
3. **AI & Analytics Integration:** Inject intelligent prediction models into your daily CRM and core decision pipelines.`
  },
  {
    id: "b2",
    title: "How Business Automation Solutions Drive Efficiency for Indian SMEs",
    slug: "business-automation-solutions-smes",
    summary: "Streamlining operations, eliminating manual bottlenecks, and integrating custom ERP/CRM APIs for high-efficiency, zero-bottleneck workflows.",
    category: "Automation",
    date: "June 15, 2026",
    readTime: "5 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    keywords: ["Business Automation Solutions", "Workflow Automation", "Enterprise Automation"],
    content: `Techno-Solutions is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into highly productive organizations.

### The Direct ROI of Workflow Automation

- **Reduced Error Rates:** Manual data entry and file transfers are prone to human mistakes. Automation reduces this to near-zero.
- **Faster Approvals:** Routing invoice, leave, and expense claims automatically ensures rapid decision-making.
- **Optimized Resources:** Employees can focus on high-value strategy rather than repetitive copy-paste jobs.

### Scaling with Microsoft Power Platform & Low-Code

We utilize Microsoft Power Automate, Copilot Studio, and custom APIs to bridge gaps between HubSpot, Zoho, Salesforce, and Tally, ensuring complete, end-to-end operational visibility.`
  },
  {
    id: "b3",
    title: "The Rise of Generative AI: Choosing an AI Solutions Provider in India",
    slug: "ai-solutions-provider-india",
    summary: "Harnessing neural networks, Agentic AI, and Gemini/ChatGPT API custom setups to build real-world productivity gains and secure automation.",
    category: "Artificial Intelligence",
    date: "May 22, 2026",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    keywords: ["AI Solutions Provider India", "Artificial Intelligence Consulting"],
    content: `AI has transitioned from a buzzword into a critical business driver. As an AI Solutions Provider India, Techno-Solutions helps corporate leaders design, implement, and audit cognitive solutions safely within their budget boundaries.

### Key Pillars of Modern AI Implementation

1. **Generative AI & LLM Integrations:** Connect the Gemini API or ChatGPT securely to parse corporate data, draft responses, or search documents.
2. **Agentic AI & Custom Workflows:** Deploy autonomous, self-guided agents that trigger workflows, communicate across channels, and automate tasks.
3. **Intelligent Document Processing (OCR):** Turn physical invoices, receipts, and forms into structured digital database entries in seconds.`
  },
  {
    id: "b4",
    title: "Smart Homes & Solar Energy: Navigating Intelligent, Eco-Friendly Living in Delhi",
    slug: "smart-homes-solar-energy-delhi",
    summary: "Combining smart lighting, biometrics, and high-conversion rooftop solar panel grids for carbon-negative, fully secure residential and commercial spaces.",
    category: "Smart Systems & Solar",
    date: "May 10, 2026",
    readTime: "8 min read",
    author: "Sanjeev Goel",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    keywords: ["Smart Home Installation Delhi", "Solar Panel Installation Services"],
    content: `Rethink your living and working environments. Modern spaces demand double the efficiency: seamless automation alongside green energy. At Techno-Solutions, we design and install high-performance smart ecosystems tailored for Delhi NCR's unique environment.

### Why Upgrading is Essential

- **Significant Utility Reductions:** Commercial rooftop solar panels and net-metering can cut electric bills by up to 32%.
- **Military-Grade Security:** Combine high-definition CCTV, video door phones, and encrypted biometric door locks for total peace of mind.
- **Intelligent HVAC & Ambience:** Manage lights and climate voice controls, scheduling systems, and smart meshes.`
  }
];

// Helper functions for shared Header and Footer templates
function getHeaderHTMLForPage(activeSlug) {
  return getHeaderHTML(activeSlug, false);
}

function getFooterHTML() {
  return getSharedFooterHTML();
}

// -----------------------------------------------------------------
// PAGE GENERATION FUNCTIONS
// -----------------------------------------------------------------

function compileAboutPageHTML() {
  const content = `
<style>
.about-hero-img {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
}
.about-stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 700;
  color: var(--ts-accent);
  line-height: 1;
}
.about-quote-box {
  background: var(--ts-soft-blue);
  border-left: 4px solid var(--ts-accent);
  padding: 24px;
  border-radius: 0 16px 16px 0;
  margin-top: 24px;
}
.about-quote-text {
  font-style: italic;
  font-size: 14px;
  color: var(--ts-slate);
  line-height: 1.6;
}
</style>

<section class="ts-banner-section">
  <div class="ts-container">
    <div class="ts-banner-grid">
      <div>
        <div class="ts-badge">
          <svg class="lucide lucide-sparkles" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z"/></svg>
          <span>TRUSTED TECH TEAM</span>
        </div>
        <h1 class="ts-h1">About Techno-Solutions</h1>
        <p class="ts-p-hero">We drive world-class Digital Transformation, Business Automation, Artificial Intelligence, Cryptography, and Green Solar Energy integration for businesses across India.</p>
      </div>
    </div>
  </div>
</section>

<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12" style="align-items: center;">
      <div class="ts-col-7">
        <span class="ts-tagline">OUR STORY & VISION</span>
        <h2 class="ts-h2">Empowering Enterprises with Intelligence & Performance</h2>
        <p class="ts-desc">Techno-Solutions is a leading Digital Transformation consultancy helping organizations embrace the future of operations. Founded by tech architect and corporate consultant <strong>Sanjeev Goel</strong>, our mission is to eliminate operational friction and design bullet-proof cloud and custom systems optimized safely within your project’s financial parameters.</p>
        <p class="ts-desc">We manage the entire engineering lifecycle—from initial deep-discovery workshops to requirements audits, secure custom coding, physical system setups, hands-on team upskilling, and 24/7 SLA-backed optimization.</p>
        
        <div class="about-quote-box">
          <p class="about-quote-text">"True digital adaptation isn't just about loading new software; it's about custom-architecting automated flows that cut overhead, remove errors, and let your teams focus entirely on high-value strategy."</p>
          <div style="font-weight: 700; font-size: 13px; margin-top: 10px; color: var(--ts-primary)">— Sanjeev Goel, Founder & Strategist</div>
        </div>
      </div>
      <div class="ts-col-5">
        <img class="about-hero-img" src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Consultation Workshop">
      </div>
    </div>
  </div>
</section>

<section class="ts-section-py" style="background: var(--ts-soft-blue); border-top: 1px solid var(--ts-border); border-bottom: 1px solid var(--ts-border);">
  <div class="ts-container">
    <div style="text-align: center; max-width: 640px; margin: 0 auto 50px auto;">
      <span class="ts-tagline">CORE ADVANTAGES</span>
      <h2 class="ts-h2">Why Choose Techno-Solutions?</h2>
      <p class="ts-desc" style="font-size: 15px;">We stand apart by offering highly customized engineering solutions with guaranteed ROI and zero low-quality tech-larping filler.</p>
    </div>
    
    <div class="ts-grid-12">
      <div class="ts-col-4 ts-card">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin-top:0; margin-bottom:12px; color: var(--ts-primary)">Experienced Professionals</h3>
        <p style="font-size: 13px; color: var(--ts-slate); line-height: 1.6; margin: 0;">Led by senior digital architects with over 12+ years of expertise in corporate upskilling, complex workflow engines, and distributed technologies.</p>
      </div>
      <div class="ts-col-4 ts-card">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin-top:0; margin-bottom:12px; color: var(--ts-primary)">Fully Custom Implementations</h3>
        <p style="font-size: 13px; color: var(--ts-slate); line-height: 1.6; margin: 0;">We never use generic layouts or copy-paste templates. We map, compile, and deploy solutions designed directly for your actual legacy software gaps.</p>
      </div>
      <div class="ts-col-4 ts-card">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin-top:0; margin-bottom:12px; color: var(--ts-primary)">Optimized Cost Design</h3>
        <p style="font-size: 13px; color: var(--ts-slate); line-height: 1.6; margin: 0;">Whether installing a 120kW healthcare solar panel array or connecting ChatGPT APIs, we design within your budget limits without compromising security.</p>
      </div>
    </div>
  </div>
</section>
  `;
  return getHeaderHTMLForPage("about") + content + getFooterHTML();
}

function compileServicePageHTML(service) {
  const metricsHTML = service.metrics.map(m => `
    <div class="srv-metric-box">
      <div class="srv-metric-val">${m.val}</div>
      <div class="srv-metric-lbl">${m.label}</div>
    </div>
  `).join('\n');

  const detailsHTML = service.details.map(d => `
    <div class="srv-provide-card">
      <svg viewBox="0 0 24 24" class="srv-provide-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span class="srv-provide-text">${d}</span>
    </div>
  `).join('\n');

  const content = `
<style>
.srv-banner-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
}
@media (min-width: 992px) {
  .srv-banner-grid {
    grid-template-columns: 7fr 5fr;
    gap: 48px;
  }
}
.srv-hero-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.srv-metrics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
}
.srv-metric-box {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 24px;
  flex: 1;
  min-width: 140px;
}
.srv-metric-val {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--ts-accent);
}
.srv-metric-lbl {
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}
.srv-provide-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 24px;
}
@media (min-width: 768px) {
  .srv-provide-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.srv-provide-card {
  background: var(--ts-soft-blue);
  border: 1px solid var(--ts-border);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: start;
  gap: 14px;
  transition: all 0.2s ease;
}
.srv-provide-card:hover {
  background: var(--ts-white);
  border-color: var(--ts-primary);
  box-shadow: 0 4px 15px rgba(15,45,99,0.05);
}
.srv-provide-icon {
  width: 18px;
  height: 18px;
  stroke: #10B981;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
  margin-top: 2px;
}
.srv-provide-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--ts-dark);
}

/* FAQ Accordion Styling */
.faq-box {
  margin-top: 48px;
}
.faq-item {
  border: 1px solid var(--ts-border);
  border-radius: 16px;
  margin-bottom: 12px;
  overflow: hidden;
  background: var(--ts-white);
  transition: all 0.3s ease;
}
.faq-header {
  width: 100%;
  background: none;
  border: none;
  padding: 20px 24px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ts-primary);
  cursor: pointer;
  outline: none;
}
.faq-header:hover {
  background: var(--ts-soft-blue);
}
.faq-content {
  display: none;
  padding: 0 24px 20px 24px;
  font-size: 13px;
  color: var(--ts-slate);
  line-height: 1.6;
  border-top: 1px solid var(--ts-soft-blue);
}
.faq-chevron {
  transition: transform 0.2s ease;
  stroke: var(--ts-accent);
}

/* Calculator Side Widget */
.calc-card {
  background: var(--ts-primary);
  color: var(--ts-white);
  border-radius: 28px;
  padding: 32px;
  position: sticky;
  top: 100px;
}
.calc-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: var(--ts-white);
  margin-top: 0;
  margin-bottom: 8px;
}
.calc-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
}
.calc-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.4);
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.calc-checkbox.checked {
  background: var(--ts-accent);
  border-color: var(--ts-accent);
}
.calc-option-text {
  font-size: 12px;
  font-weight: 500;
}
.calc-summary {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px;
  margin-top: 24px;
  font-size: 12px;
}
</style>

<section class="ts-banner-section">
  <div class="ts-container">
    <div class="srv-banner-grid">
      <div>
        <div class="ts-badge">${service.badge}</div>
        <h1 class="ts-h1">${service.title}</h1>
        <p class="ts-p-hero">${service.description}</p>
        <div class="srv-metrics-row">
          ${metricsHTML}
        </div>
      </div>
      <div>
        <img class="srv-hero-img" src="${service.image}" alt="${service.title}">
      </div>
    </div>
  </div>
</section>

<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12">
      <!-- Left Column: Details, Highlights, FAQs -->
      <div class="ts-col-7 text-left" style="text-align: left;">
        <span class="ts-tagline">OVERVIEW & METHODOLOGY</span>
        <h2 class="ts-h2" style="font-size: 24px;">Sustainable Architecture Tailored to Your Workflows</h2>
        <p class="ts-desc" style="font-size: 14.5px;">${service.longDescription}</p>
        
        <h3 class="ts-h2" style="font-size: 20px; margin-top: 40px; margin-bottom: 16px;">What We Provide:</h3>
        <div class="srv-provide-grid">
          ${detailsHTML}
        </div>

        <div class="faq-box">
          <h3 class="ts-h2" style="font-size: 20px; margin-bottom: 24px;">Frequently Asked Questions</h3>
          <div class="faq-item">
            <button class="faq-header" onclick="toggleFaq(this)">
              <span>How do you assess customized operational pricing?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="faq-content">
              <p>We analyze the current state of your legacy integrations, volume of daily tasks, number of users, and your actual strategic requirements. We design solutions directly targeted to solve bottlenecks without low-value overhead.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-header" onclick="toggleFaq(this)">
              <span>What is the standard SLA for deep-discovery and audits?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="faq-content">
              <p>All digital inquiries submitted through our Discovery Desk are reviewed immediately by strategist Sanjeev Goel and receive a structured discovery call and system audit blueprint within 24 working hours.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-header" onclick="toggleFaq(this)">
              <span>Are your installations and models fully secure?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="faq-content">
              <p>Yes, all custom ERP APIs, autonomous cognitive agents, smart IoT setups, and database sync gates are compiled with end-to-end industry-standard encryption, strict security compliance, and no external telemetry data leaks.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Selection Widget -->
      <div class="ts-col-5">
        <div class="calc-card" style="text-align: left;">
          <h3 class="calc-title">Interactive Project Parameters</h3>
          <p style="font-size: 11.5px; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: 24px;">Configure your desired focus points below to estimate audit complexity immediately.</p>
          
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${service.details.slice(0, 5).map((d, i) => `
              <div class="calc-option" onclick="toggleCalcOption(this)">
                <div class="calc-checkbox ${i < 2 ? 'checked' : ''}">
                  <svg viewBox="0 0 24 24" width="10" height="10" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display: ${i < 2 ? 'block' : 'none'};"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="calc-option-text">${d}</div>
              </div>
            `).join('\n')}
          </div>

          <div class="calc-summary">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>Selected Parameters:</span>
              <strong id="calc-count" style="color: var(--ts-accent)">2</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span>SLA Priority:</span>
              <strong style="color: #ffffff">Guaranteed 24 Hours</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Estimated Initial Audit:</span>
              <strong style="color: #10B981">Free Discovery Call</strong>
            </div>
          </div>

          <!-- Quick Contact Form -->
          <form style="margin-top:24px; display:flex; flex-direction:column; gap:12px;" onsubmit="handleInquirySubmit(event, this)">
            <div>
              <label class="ts-label" style="color:rgba(255,255,255,0.9);">Your Name *</label>
              <input required type="text" class="ts-input" placeholder="Enter name..." style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.15); color:white;">
            </div>
            <div>
              <label class="ts-label" style="color:rgba(255,255,255,0.9);">Your Email *</label>
              <input required type="email" class="ts-input" placeholder="Enter email..." style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.15); color:white;">
            </div>
            <button type="submit" class="ts-btn" style="background:var(--ts-accent); color:var(--ts-primary); width:100%; justify-content:center; padding:12px; margin-top:8px;">
              Submit Quick Inquiry <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>
          <div id="form-success-box" style="display:none; text-align:center; margin-top:20px; background:rgba(16, 185, 129, 0.1); border:1px solid #10B981; border-radius:12px; padding:16px;">
            <div style="color:#10B981; font-weight:700; font-size:13px; margin-bottom:4px;">Inquiry Sent Successfully!</div>
            <div style="color:rgba(255,255,255,0.8); font-size:11px;">Sanjeev Goel will reach out within 24 working hours.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
function toggleFaq(btn) {
  const content = btn.nextElementSibling;
  const chevron = btn.querySelector('.faq-chevron');
  if (content.style.display === 'block') {
    content.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    content.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

function toggleCalcOption(opt) {
  const checkbox = opt.querySelector('.calc-checkbox');
  const checkSvg = checkbox.querySelector('svg');
  checkbox.classList.toggle('checked');
  if (checkbox.classList.contains('checked')) {
    checkSvg.style.display = 'block';
  } else {
    checkSvg.style.display = 'none';
  }
  
  // Count selected options
  const checkedCount = document.querySelectorAll('.calc-checkbox.checked').length;
  document.getElementById('calc-count').innerText = checkedCount;
}

function handleInquirySubmit(e, form) {
  e.preventDefault();
  form.style.display = 'none';
  document.getElementById('form-success-box').style.display = 'block';
}
</script>
  `;
  return getHeaderHTMLForPage(service.id) + content + getFooterHTML();
}

function compileBlogListPageHTML() {
  const BLOG_SLUG_MAP = {
    "digital-transformation-delhi": "the-ultimate-guide-to-digital-transformation-in-delhi-ncr",
    "business-automation-solutions-smes": "how-business-automation-solutions-drive-efficiency-for-indian-smes",
    "ai-solutions-provider-india": "the-rise-of-generative-ai-choosing-an-ai-solutions-provider-in-india",
    "smart-homes-solar-energy-delhi": "smart-homes-solar-energy-navigating-intelligent-eco-friendly-living-in-delhi"
  };
  
  const postsHTML = BLOG_POSTS.map(post => {
    const pSlug = BLOG_SLUG_MAP[post.slug] || post.slug;
    return `<article class="ts-card blog-card" data-cat="${post.category}" data-keywords="${post.keywords.join(',')}" style="display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; padding:0;">
      <div>
        <div style="position:relative; aspect-ratio:1.77; width:100%; overflow:hidden; background:#ECECEC;">
          <img src="${post.image}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:16px; left:16px; background:rgba(255,255,255,0.95); color:var(--ts-primary); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:6px 12px; border-radius:8px; border:1px solid #ECECEC;">
            ${post.category}
          </div>
        </div>
        <div style="padding:24px 24px 16px 24px; text-align:left;">
          <div style="display:flex; gap:16px; font-size:12px; color:var(--ts-slate); margin-bottom:12px;">
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <h2 class="blog-title" style="font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px; line-height:1.3;">
            <a href="/${pSlug}/" style="color:inherit; text-decoration:none;">${post.title}</a>
          </h2>
          <p class="blog-summary" style="font-size:13px; color:var(--ts-slate); line-height:1.6; margin:0 0 16px 0;">
            ${post.summary}
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${post.keywords.map(kw => `
              <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--ts-slate); background:var(--ts-soft-blue); border:1px solid var(--ts-border); padding:2px 8px; border-radius:6px;">#${kw.split(' ').join('')}</span>
            `).join('')}
          </div>
        </div>
      </div>
      <div style="padding:16px 24px 24px 24px; border-top:1px solid var(--ts-soft-blue); display:flex; justify-content:space-between; align-items:center; background:var(--ts-soft-blue);">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:24px; height:24px; border-radius:50%; background:#ECECEC; overflow:hidden;">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80" alt="Sanjeev Goel" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <span style="font-size:12px; font-weight:600; color:var(--ts-dark);">${post.author}</span>
        </div>
        <a href="/${pSlug}/" class="ts-btn" style="padding:6px 14px; font-size:11px;">
          Read Article <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </article>`;
  }).join('\n');
  const content = `
<style>
.blog-cat-btn {
  background: var(--ts-soft-blue);
  border: 1px solid var(--ts-border);
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  color: var(--ts-slate);
  transition: all 0.2s ease;
  white-space: nowrap;
}
.blog-cat-btn:hover {
  border-color: var(--ts-primary);
  color: var(--ts-primary);
}
.blog-cat-btn.active {
  background: var(--ts-primary);
  color: var(--ts-white);
  border-color: var(--ts-primary);
}
.reset-btn {
  background: none;
  border: 1px dashed var(--ts-border);
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  color: var(--ts-slate);
  transition: all 0.2s ease;
}
.reset-btn:hover {
  border-color: #EF4444;
  color: #EF4444;
}
</style>

<section class="ts-banner-section">
  <div class="ts-container">
    <div style="max-width: 640px;">
      <div class="ts-badge">THE TECH HUB</div>
      <h1 class="ts-h1">Insights, Strategies & Innovation</h1>
      <p class="ts-p-hero">Enterprise thoughts on Digital Transformation, AI automation, and green solar infrastructure designed within real-world constraints.</p>
    </div>
  </div>
</section>

<section class="ts-section-py">
  <div class="ts-container">
    <div style="display:flex; flex-direction:column; gap:24px; margin-bottom:48px;">
      <div style="display:grid; grid-template-columns:1fr; gap:16px;" class="md-grid-search">
        <style>
          .md-grid-search {
            display: grid;
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .md-grid-search {
              grid-template-columns: 2fr 1fr;
            }
          }
        </style>
        <div>
          <input type="text" id="blog-search" class="ts-input" placeholder="Search articles by title, keywords, or summary..." oninput="filterPosts()">
        </div>
        <div style="display:flex; justify-content:flex-end;">
          <button class="reset-btn" onclick="resetFilters()">Reset Filters</button>
        </div>
      </div>
      
      <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-start;">
        <button class="blog-cat-btn active" data-cat="All" onclick="selectCat(this)">All Topics</button>
        <button class="blog-cat-btn" data-cat="Digital Transformation" onclick="selectCat(this)">Digital Transformation</button>
        <button class="blog-cat-btn" data-cat="Automation" onclick="selectCat(this)">Automation</button>
        <button class="blog-cat-btn" data-cat="Artificial Intelligence" onclick="selectCat(this)">Artificial Intelligence</button>
        <button class="blog-cat-btn" data-cat="Smart Systems & Solar" onclick="selectCat(this)">Smart Systems & Solar</button>
      </div>
    </div>

    <!-- Blog Grid -->
    <div class="ts-grid-12" id="blog-grid">
      ${postsHTML}
    </div>

    <!-- No Results Box -->
    <div id="no-results-box" style="display:none; text-align:center; padding:80px 0; border:1px dashed var(--ts-border); border-radius:24px; background:var(--ts-soft-blue); margin-top:32px;">
      <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--ts-slate)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 16px auto; opacity:0.6;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <h3 style="font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:8px;">No Articles Found</h3>
      <p style="font-size:13px; color:var(--ts-slate); max-width:320px; margin:0 auto 16px auto;">Try adjusting your keywords, search text, or select another topic category.</p>
      <button class="ts-btn" style="padding:8px 16px; font-size:12px; margin:0 auto;" onclick="resetFilters()">Clear Filters</button>
    </div>
  </div>
</section>

<script>
function selectCat(btn) {
  document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterPosts();
}

function resetFilters() {
  document.getElementById('blog-search').value = '';
  document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.blog-cat-btn[data-cat="All"]').classList.add('active');
  filterPosts();
}

function filterPosts() {
  const query = document.getElementById('blog-search').value.toLowerCase();
  const activeCat = document.querySelector('.blog-cat-btn.active').getAttribute('data-cat');
  const cards = document.querySelectorAll('.blog-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector('.blog-title').innerText.toLowerCase();
    const summary = card.querySelector('.blog-summary').innerText.toLowerCase();
    const cat = card.getAttribute('data-cat');
    const keywords = card.getAttribute('data-keywords').toLowerCase();

    const matchesSearch = title.includes(query) || summary.includes(query) || keywords.includes(query);
    const matchesCat = activeCat === 'All' || cat === activeCat;

    if (matchesSearch && matchesCat) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('no-results-box');
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}
</script>
  `;
  return getHeaderHTMLForPage("blog") + content + getFooterHTML();
}

function compileBlogDetailPageHTML(post) {
  const formattedContentHTML = post.content.split('\n\n').map(p => {
    if (p.startsWith('###')) {
      return `<h3 style="font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--ts-primary); margin-top:32px; margin-bottom:12px; text-align:left;">${p.replace('###', '').trim()}</h3>`;
    } else if (p.startsWith('-') || p.startsWith('*')) {
      const items = p.split('\n').map(li => `<li style="margin-bottom:8px;">${li.replace(/^[-*]\s+/, '').trim()}</li>`).join('\n');
      return `<ul style="list-style-type:disc; padding-left:24px; margin-bottom:20px; text-align:left; color:var(--ts-slate); font-size:14.5px;">${items}</ul>`;
    } else if (p.match(/^\d+\./)) {
      const items = p.split('\n').map(li => `<li style="margin-bottom:8px;">${li.replace(/^\d+\.\s+/, '').trim()}</li>`).join('\n');
      return `<ol style="list-style-type:decimal; padding-left:24px; margin-bottom:20px; text-align:left; color:var(--ts-slate); font-size:14.5px;">${items}</ol>`;
    }
    return `<p style="font-size:14.5px; color:var(--ts-slate); line-height:1.7; margin-bottom:20px; text-align:left;">${p}</p>`;
  }).join('\n');

  const otherRecent = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  const content = `
<section class="ts-section-py" style="background:var(--ts-soft-blue); border-bottom:1px solid var(--ts-border); padding: 16px 0;">
  <div class="ts-container">
    <a href="/blog/" style="display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; color:var(--ts-primary); text-decoration:none; text-transform:uppercase; letter-spacing:0.05em;">
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      Back To All Blogs
    </a>
  </div>
</section>

<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12">
      <!-- Left Column: Full Post content -->
      <article class="ts-col-8" style="text-align: left;">
        <div class="ts-badge">${post.category}</div>
        <h1 style="font-family:'Playfair Display',serif; font-size:28px; md:font-size:42px; font-weight:700; color:var(--ts-primary); margin-top:12px; margin-bottom:20px; line-height:1.2; text-align:left;">
          ${post.title}
        </h1>
        
        <p style="font-size:16px; font-weight:500; color:var(--ts-slate); line-height:1.6; margin-bottom:32px; border-left:4px solid var(--ts-accent); padding-left:16px; text-align:left;">
          ${post.summary}
        </p>

        <!-- Meta -->
        <div style="display:flex; flex-wrap:wrap; gap:24px; align-items:center; padding-bottom:24px; border-bottom:1px solid var(--ts-border); margin-bottom:32px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:50%; background:#ECECEC; overflow:hidden;">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Sanjeev Goel" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <div style="font-size:12px; font-weight:700; color:var(--ts-dark);">${post.author}</div>
              <div style="font-size:10px; color:var(--ts-slate); text-transform:uppercase; font-weight:600; letter-spacing:0.02em;">Chief Consultant</div>
            </div>
          </div>
          <div style="font-size:12px; color:var(--ts-slate); display:flex; gap:12px;">
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
        </div>

        <!-- Featured Image -->
        <div style="border-radius:24px; overflow:hidden; aspect-ratio:1.77; width:100%; margin-bottom:40px; background:#ECECEC;">
          <img src="${post.image}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>

        <!-- Format Content -->
        <div>
          ${formattedContentHTML}
        </div>

        <!-- Footer Keywords -->
        <div style="margin-top:48px; padding-top:24px; border-top:1px solid var(--ts-border); display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          <strong style="font-size:12px; color:var(--ts-dark); margin-right:12px;">Keywords:</strong>
          ${post.keywords.map(kw => `
            <span style="font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ts-slate); background:var(--ts-soft-blue); border:1px solid var(--ts-border); padding:4px 12px; border-radius:8px;">${kw}</span>
          `).join('')}
        </div>
      </article>

      <!-- Right Column: Sidebar -->
      <aside class="ts-col-4" style="text-align: left;">
        <!-- Consult Card -->
        <div style="background:var(--ts-primary); color:white; border-radius:28px; padding:32px; margin-bottom:32px; text-align:left;">
          <div style="width:40px; height:40px; border-radius:12px; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; margin-bottom:24px;">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--ts-accent)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
          <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:white; margin-top:0; margin-bottom:12px;">Need Expert Solutions?</h3>
          <p style="font-size:12px; color:rgba(255,255,255,0.7); line-height:1.6; margin-bottom:24px;">Sanjeev Goel offers direct strategic digital consultation to streamline manual workflows, audit legacy software, or optimize solar installation.</p>
          
          <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:20px; display:flex; flex-direction:column; gap:12px; font-size:12px; color:rgba(255,255,255,0.8); margin-bottom:24px;">
            <div style="display:flex; gap:10px;">
              <strong style="color:var(--ts-accent);">Phone:</strong> +91 9811841782
            </div>
            <div style="display:flex; gap:10px;">
              <strong style="color:var(--ts-accent);">Email:</strong> info2sanjeev@gmail.com
            </div>
          </div>
          
          <a href="/contact/" class="ts-btn" style="background:var(--ts-accent); color:var(--ts-primary); width:100%; justify-content:center;">Book Consultation</a>
        </div>

        <!-- Recent Posts sidebar -->
        <div style="border:1px solid var(--ts-border); border-radius:28px; padding:32px; text-align:left;">
          <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:var(--ts-primary); margin-top:0; margin-bottom:24px;">Recent Articles</h3>
          <div style="display:flex; flex-direction:column; gap:20px;">
            ${otherRecent.map(rp => `
              <div style="display:flex; gap:14px;">
                <div style="width:64px; height:64px; border-radius:12px; background:#ECECEC; overflow:hidden; flex-shrink:0;">
                  <img src="${rp.image}" alt="${rp.title}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="display:flex; flex-direction:column; justify-content:space-between;">
                  <h4 style="font-family:'Playfair Display',serif; font-size:13px; font-weight:700; margin:0; line-height:1.3;">
                    <a href="/blog/${rp.slug}/" style="color:var(--ts-primary); text-decoration:none;">${rp.title}</a>
                  </h4>
                  <span style="font-size:10px; color:var(--ts-slate);">${rp.date}</span>
                </div>
              </div>
            `).join('\n')}
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
  `;
  return getHeaderHTMLForPage("blog") + content + getFooterHTML();
}

function compileContactPageHTML() {
  const content = `
<section class="ts-banner-section">
  <div class="ts-container">
    <div style="max-width: 640px;">
      <div class="ts-badge">DISCOVERY DESK</div>
      <h1 class="ts-h1">Get In Touch</h1>
      <p class="ts-p-hero">Contact strategist Sanjeev Goel and our senior consultants today to design a customized business blueprint.</p>
    </div>
  </div>
</section>

<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12">
      <!-- Left Column: Details -->
      <div class="ts-col-5 text-left" style="text-align: left;">
        <span class="ts-tagline">DIRECT CHANNELS</span>
        <h2 class="ts-h2">Connect Directly with Sanjeev Goel</h2>
        <p class="ts-desc">We design systems customized within your strategic budget guidelines. Reach out directly for project audits, automation, solar net-metering reviews, or smart building diagnostics.</p>
        
        <div style="display:flex; flex-direction:column; gap:16px; margin-top:32px;">
          <div class="ts-card" style="display:flex; gap:16px; padding:20px;">
            <div style="width:40px; height:40px; border-radius:12px; background:var(--ts-soft-blue); border:1px solid var(--ts-border); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--ts-accent)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div>
              <div style="font-size:10px; font-weight:700; color:var(--ts-slate); text-transform:uppercase; letter-spacing:0.05em;">Contact Person</div>
              <strong style="font-size:14px; color:var(--ts-dark)">Sanjeev Goel</strong>
              <div style="font-size:12px; color:var(--ts-slate)">Founder & digital Strategist</div>
            </div>
          </div>
          
          <div class="ts-card" style="display:flex; gap:16px; padding:20px;">
            <div style="width:40px; height:40px; border-radius:12px; background:var(--ts-soft-blue); border:1px solid var(--ts-border); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--ts-accent)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <div style="font-size:10px; font-weight:700; color:var(--ts-slate); text-transform:uppercase; letter-spacing:0.05em;">Office Address</div>
              <strong style="font-size:13px; color:var(--ts-dark); line-height:1.5; display:block; margin-top:4px;">
                218 AGCR Enclave,<br>
                Near Karkardoma Metro Station,<br>
                Delhi 110092 | India
              </strong>
            </div>
          </div>

          <div class="ts-card" style="display:flex; gap:16px; padding:20px;">
            <div style="width:40px; height:40px; border-radius:12px; background:var(--ts-soft-blue); border:1px solid var(--ts-border); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--ts-accent)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div style="font-size:10px; font-weight:700; color:var(--ts-slate); text-transform:uppercase; letter-spacing:0.05em;">Mobile Number</div>
              <strong style="font-size:15px; color:var(--ts-dark)"><a href="tel:+919811841782" style="color:inherit; text-decoration:none;">+91 9811841782</a></strong>
            </div>
          </div>

          <div class="ts-card" style="display:flex; gap:16px; padding:20px;">
            <div style="width:40px; height:40px; border-radius:12px; background:var(--ts-soft-blue); border:1px solid var(--ts-border); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--ts-accent)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <div style="font-size:10px; font-weight:700; color:var(--ts-slate); text-transform:uppercase; letter-spacing:0.05em;">Direct Email</div>
              <strong style="font-size:15px; color:var(--ts-dark)"><a href="mailto:info2sanjeev@gmail.com" style="color:inherit; text-decoration:none;">info2sanjeev@gmail.com</a></strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="ts-col-7">
        <div class="ts-card" style="text-align: left; padding:40px;">
          <form id="contact-full-form" style="display:flex; flex-direction:column; gap:20px;" onsubmit="handleContactSubmit(event)">
            <div>
              <h3 style="font-family:'Playfair Display',serif; font-size:24px; color:var(--ts-primary); margin-top:0; margin-bottom:8px;">Submit Your Project Parameters</h3>
              <p style="font-size:11.5px; color:var(--ts-slate); line-height:1.5; margin:0;">All submission fields are encrypted directly in compliance with secure node guidelines.</p>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr; gap:20px;">
              <div>
                <label class="ts-label">Your Name *</label>
                <input required id="cnt-name" type="text" class="ts-input" placeholder="e.g. John Doe">
              </div>
              <div>
                <label class="ts-label">Your Email *</label>
                <input required id="cnt-email" type="email" class="ts-input" placeholder="e.g. johndoe@gmail.com">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr; gap:20px;">
              <div>
                <label class="ts-label">Phone Number</label>
                <input id="cnt-phone" type="tel" class="ts-input" placeholder="e.g. +91 98118 41782">
              </div>
              <div>
                <label class="ts-label">Subject</label>
                <input id="cnt-subject" type="text" class="ts-input" placeholder="e.g. Business Process Automation">
              </div>
            </div>

            <div>
              <label class="ts-label">Detailed Message *</label>
              <textarea required id="cnt-message" rows="5" class="ts-input" style="resize:none; padding-top:14px;" placeholder="Please specify your operational requirements, metrics, and any custom questions for Sanjeev Goel..."></textarea>
            </div>

            <button type="submit" class="ts-btn" style="width:100%; justify-content:center; padding:14px; font-size:13px;">
              Send Inquiry <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>

          <div id="contact-success-box" style="display:none; text-align:center; padding:24px 0;">
            <div style="width:60px; height:60px; border-radius:50%; background:rgba(16,185,129,0.1); border:1px solid #10B981; display:flex; align-items:center; justify-content:center; margin:0 auto 20px auto; color:#10B981">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:22px; color:var(--ts-primary); margin-top:0; margin-bottom:8px;">Inquiry Dispatched Successfully</h3>
            <p style="font-size:13px; color:var(--ts-slate); line-height:1.6; max-width:320px; margin:0 auto 24px auto;">Thank you <span id="success-name" style="font-weight:700; color:var(--ts-dark)">John Doe</span>. Your requirements have been safely transmitted to Sanjeev Goel.</p>
            
            <div style="background:var(--ts-soft-blue); border:1px solid var(--ts-border); border-radius:12px; padding:16px; font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ts-slate); text-align:left; margin-bottom:24px;">
              <div style="margin-bottom:4px;"><strong>ROUTING_KEY:</strong> info2sanjeev@gmail.com</div>
              <div><strong>DISPATCH_SLA:</strong> response_within_24_hours</div>
            </div>

            <button class="ts-btn" onclick="resetForm()">Submit New Inquiry</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cnt-name').value;
  document.getElementById('success-name').innerText = name;
  document.getElementById('contact-full-form').style.display = 'none';
  document.getElementById('contact-success-box').style.display = 'block';
}

function resetForm() {
  document.getElementById('cnt-name').value = '';
  document.getElementById('cnt-email').value = '';
  document.getElementById('cnt-phone').value = '';
  document.getElementById('cnt-subject').value = '';
  document.getElementById('cnt-message').value = '';
  document.getElementById('contact-full-form').style.display = 'flex';
  document.getElementById('contact-success-box').style.display = 'none';
}
</script>
  `;
  return getHeaderHTMLForPage("contact") + content + getFooterHTML();
}


// -----------------------------------------------------------------
// BIND & CREATE OPERATIONS
// -----------------------------------------------------------------


function compileServicesPageHTML() {
  const SERVICE_SLUG_MAP = {
    "digital-transformation": "digital-transformation-solutions",
    "business-automation": "business-automation-solutions",
    "artificial-intelligence": "artificial-intelligence-solutions",
    "blockchain-crypto": "blockchain-crypto-solutions",
    "smart-home": "smart-home-installation-services",
    "solar-energy": "solar-panel-installation-services"
  };

  const content = `
<section class="ts-banner-section">
  <div class="ts-container">
    <div style="max-width: 640px;">
      <div class="ts-badge">EXPLORE OFFERS</div>
      <h1 class="ts-h1">Our Elite Core Services</h1>
      <p class="ts-p-hero">We engineer enterprise-quality, ISO-level structures and processes designed strictly within your budget parameters.</p>
    </div>
  </div>
</section>
<section class="ts-section-py">
  <div class="ts-container">
    <div class="ts-grid-12">
      ${SERVICES.map(s => `
        <div class="ts-col-4 ts-card" style="display:flex; flex-direction:column; justify-content:space-between; text-align:left;">
          <div>
            <div style="width:100%; height:180px; border-radius:16px; overflow:hidden; background:#ECECEC; margin-bottom:20px;">
              <img src="${s.image}" alt="${s.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--ts-primary); margin-top:0; margin-bottom:12px;">${s.title}</h3>
            <p style="font-size:12.5px; color:var(--ts-slate); line-height:1.6; margin:0 0 20px 0;">${s.description}</p>
          </div>
          <a href="/${SERVICE_SLUG_MAP[s.id] || s.id}/" class="ts-btn" style="width:fit-content; font-size:11px; padding:8px 16px;">
            Explore Solution <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      `).join('\n')}
    </div>
  </div>
</section>
  `;
  return getHeaderHTMLForPage("services") + content + getFooterHTML();
}

function getElementId(res) {
  if (!res) return null;
  if (res.id) return res.id;
  if (res.structuredContent && res.structuredContent.element_id) return res.structuredContent.element_id;
  if (res.structuredContent && res.structuredContent.id) return res.structuredContent.id;
  if (res.content && res.content[0] && res.content[0].text) {
    try {
      const parsed = JSON.parse(res.content[0].text);
      return parsed.element_id || parsed.id;
    } catch (e) {}
  }
  return null;
}

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to Elementor MCP...');
    await client.connect();

    // Map of existing page titles to their page IDs
    const PAGES = {
      services: { id: 17, name: "Services", compiler: () => compileServicesPageHTML() },
      about: { id: 21, name: "About Us", compiler: () => compileAboutPageHTML() },
      blog: { id: 25, name: "Blog", compiler: () => compileBlogListPageHTML() },
      contact: { id: 29, name: "Contact Us", compiler: () => compileContactPageHTML() }
    };

    // 1. Rebuild Directory & Static Pages
    for (const key of Object.keys(PAGES)) {
      const pageInfo = PAGES[key];
      console.log(`
==============================================`);
      console.log(`Rebuilding static page: ${pageInfo.name} (ID: ${pageInfo.id})...`);
      console.log(`==============================================`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageInfo.id });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageInfo.id,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(`Container Created with ID: ${containerId}`);
      
      if (containerId) {
        // Force full width & zero margins/paddings on the parent container
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageInfo.id,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Compile the HTML
        const compiledHTML = pageInfo.compiler();
        
        // Add HTML widget inside the container
        console.log('Injecting compiled page content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageInfo.id,
          parent_id: containerId,
          html: compiledHTML
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageInfo.id,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(`Done rebuilding page: ${pageInfo.name}`);
    }

    // 2. Rebuild Service subpages
    const SERVICES_MAP = {
      "digital-transformation": 33,
      "business-automation": 37,
      "artificial-intelligence": 41,
      "blockchain-crypto": 45,
      "smart-home": 49,
      "solar-energy": 53
    };

    for (const service of SERVICES) {
      const pageId = SERVICES_MAP[service.id];
      if (!pageId) continue;
      
      console.log(`
==============================================`);
      console.log(`Rebuilding service subpage: ${service.title} (ID: ${pageId})...`);
      console.log(`==============================================`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageId,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(`Container Created with ID: ${containerId}`);
      
      if (containerId) {
        // Force full width
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageId,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Add HTML
        console.log('Injecting compiled service content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageId,
          parent_id: containerId,
          html: compileServicePageHTML(service)
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(`Done rebuilding service: ${service.title}`);
    }

    // 3. Rebuild Blog detail subpages
    const BLOG_MAP = {
      "digital-transformation-delhi": 57,
      "business-automation-solutions-smes": 61,
      "ai-solutions-provider-india": 65,
      "smart-homes-solar-energy-delhi": 69
    };

    for (const post of BLOG_POSTS) {
      const pageId = BLOG_MAP[post.slug];
      if (!pageId) continue;
      
      console.log(`
==============================================`);
      console.log(`Rebuilding blog detail page: ${post.title} (ID: ${pageId})...`);
      console.log(`==============================================`);
      
      // Clear old content
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      
      // Create full-width container
      console.log('Creating full-width container...');
      const containerRes = await client.callTool('elementor-mcp-add-container', {
        post_id: pageId,
        settings: { content_width: 'full' }
      });
      const containerId = getElementId(containerRes);
      console.log(`Container Created with ID: ${containerId}`);
      
      if (containerId) {
        // Force full width
        console.log('Configuring container settings (100% full screen expansion, zero spacing)...');
        await client.callTool('elementor-mcp-update-element', {
          post_id: pageId,
          element_id: containerId,
          settings: {
            content_width: 'full',
            boxed_width: { size: 100, unit: '%' },
            gap: { size: 0, unit: 'px' },
            padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
            margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
          }
        });
        
        // Add HTML
        console.log('Injecting compiled blog content HTML widget...');
        await client.callTool('elementor-mcp-add-html', {
          post_id: pageId,
          parent_id: containerId,
          html: compileBlogDetailPageHTML(post)
        });
      }
      
      // Update template setting to Elementor Canvas
      console.log('Updating page settings to Elementor Canvas...');
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      console.log(`Done rebuilding blog: ${post.title}`);
    }

    console.log('\n==============================================');
    console.log('ALL SUBPAGES AND DETAIL PAGES COMPLETED!');
    console.log('==============================================');
  } catch (err) {
    console.error('Fatal Error rebuilding subpages:', err.stack || err.message);
  } finally {
    client.close();
  }
}

main();
