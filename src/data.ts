import { ServiceItem, StatItem, ProcessStep, ProjectItem, TestimonialItem, BlogPost } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "digital-transformation",
    title: "Digital Transformation Solutions",
    description: "Modernize your organization with digital-first strategies.",
    longDescription: "In today’s rapidly evolving digital landscape, businesses must adapt, innovate, and transform to stay competitive. Our Digital Transformation Consulting & Training Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.",
    iconName: "Monitor",
    image: "https://lh3.googleusercontent.com/d/1Eb9lrtVuN1YDIx7ZeC-u0Nsen7QR-tv4",
    badge: "Strategy & Advisory",
    details: [
      "Digital Transformation Consulting",
      "Enterprise Digitization",
      "Cloud Adoption",
      "AI Integration",
      "Process Optimization",
      "Customer Experience Transformation",
      "Digital Strategy Roadmaps"
    ]
  },
  {
    id: "business-automation",
    title: "Business Automation Solutions",
    description: "Automate repetitive tasks and increase productivity.",
    longDescription: "TECHNO-SOLUTIONS is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into zero-bottleneck organizations.",
    iconName: "Settings",
    image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
    badge: "Automation Core",
    details: [
      "Workflow Automation",
      "CRM Automation",
      "HR Automation",
      "Finance Automation",
      "Sales Automation",
      "Inventory Management",
      "Document Management",
      "ERP Integration",
      "AI Chatbots",
      "Robotic Process Automation (RPA)"
    ]
  },
  {
    id: "ai-solutions",
    title: "Artificial Intelligence Solutions",
    description: "Unlock the power of AI.",
    longDescription: "Bridge manual operational gaps with the power of modern artificial intelligence. We develop customized strategies, implement ChatGPT/Gemini APIs, deploy self-guided AI agents, build intelligent document parsers (OCR), and configure deep computer-vision models tailored to your industry's telemetry.",
    iconName: "Cpu",
    image: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z",
    badge: "Cognitive AI",
    details: [
      "AI Strategy",
      "Generative AI",
      "ChatGPT Integration",
      "AI Agents",
      "Predictive Analytics",
      "Intelligent Document Processing",
      "Computer Vision",
      "Machine Learning"
    ]
  },
  {
    id: "blockchain-crypto",
    title: "Blockchain & Crypto Solutions",
    description: "Secure, transparent, decentralized technology.",
    longDescription: "Construct private trustless transaction systems, automate multi-party compliance protocols, audit complex smart contracts, and build resilient distributed logistics networks with optimized security to prevent vulnerabilities and eliminate single-point operational failures.",
    iconName: "Database",
    image: "https://lh3.googleusercontent.com/d/1GKXj96wh-3gOlAr7ltk3ndI958XnyR9X",
    badge: "Distributed Web3",
    details: [
      "Blockchain Consulting",
      "Smart Contracts",
      "Crypto Wallet Development",
      "Token Development",
      "NFT Platforms",
      "Web3 Solutions",
      "Supply Chain Blockchain",
      "Identity Management"
    ]
  },
  {
    id: "smart-home",
    title: "Smart Home Installation",
    description: "Transform your home into an intelligent living space.",
    longDescription: "Deploy unified IoT meshes that sense, adapt, and respond dynamically. We integrate voice assistants, smart CCTV arrays, advanced biometric locks, automated HVAC climate routines, and tailored building dashboard monitors that help save substantial energy overhead.",
    iconName: "Home",
    image: "https://lh3.googleusercontent.com/d/1UMvm_FBS9b0zuUhPmi51g9veaCGzlbqJ",
    badge: "Intelligent IoT",
    details: [
      "Smart Lighting",
      "Smart Security",
      "CCTV",
      "Smart Door Locks",
      "Video Door Phones",
      "Home Automation",
      "Voice Control",
      "Smart Energy Management"
    ]
  },
  {
    id: "solar-energy",
    title: "Solar Panel Installation",
    description: "Save money while protecting the environment.",
    longDescription: "Design, construct, and balance high-conversion rooftop solar arrays tailored for residential, commercial, or industrial architectures. Our solutions include high-capacity battery bank integration, net-metering telemetry tracking, and comprehensive carbon-offset reporting.",
    iconName: "Sun",
    image: "https://lh3.googleusercontent.com/d/1F6j4zwTIDaAm7M66MobqoTYJBrk5Zbyp",
    badge: "Clean Tech",
    details: [
      "Residential Solar",
      "Commercial Solar",
      "Industrial Solar",
      "Rooftop Solar",
      "Solar Maintenance",
      "Battery Backup",
      "Hybrid Solar Systems",
      "Energy Audits"
    ]
  }
];

export const STATS: StatItem[] = [
  {
    count: 450,
    label: "Projects Completed",
    suffix: "+",
    iconName: "Briefcase"
  },
  {
    count: 220,
    label: "Enterprise Clients",
    suffix: "+",
    iconName: "Users"
  },
  {
    count: 12,
    label: "Years Experience",
    suffix: "+",
    iconName: "Award"
  },
  {
    count: 24,
    label: "Support Desk",
    suffix: "/7",
    iconName: "Headset"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Business Consultation",
    description: "We host deep-discovery workshops to map out your core current-state challenges and establish automation opportunities.",
    iconName: "Search"
  },
  {
    step: "02",
    title: "Requirement Analysis",
    description: "Our business consultants and technical architects audit your legacy software systems, security guidelines, and bottleneck structures.",
    iconName: "Clipboard"
  },
  {
    step: "03",
    title: "Solution Design",
    description: "We model tailored systems blueprints, cloud structures, dynamic dashboards, and high-security network architectures.",
    iconName: "Settings"
  },
  {
    step: "04",
    title: "Implementation",
    description: "Our elite engineers build, integrate, and deploy custom workflows, cognitive AI APIs, or solar arrays with strict quality checks.",
    iconName: "Settings"
  },
  {
    step: "05",
    title: "Training",
    description: "We run customized corporate workshops, hands-on tutorials, and documentation walkthroughs to ensure seamless adoption by all teams.",
    iconName: "Award"
  },
  {
    step: "06",
    title: "Support & Optimization",
    description: "We provide 24/7 SLA-backed monitoring, software upgrade cycles, system recalibrations, and proactive enhancements.",
    iconName: "Headset"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Automated Invoice Control Center",
    category: "Business Automation",
    image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
    description: "An end-to-end accounts payable automation module tracking financial receipts and routing approvals across multiple regional departments.",
    link: "#"
  },
  {
    id: "p2",
    title: "Hyperledger Logistics Ledger",
    category: "Blockchain Network",
    image: "https://lh3.googleusercontent.com/d/1GKXj96wh-3gOlAr7ltk3ndI958XnyR9X",
    description: "Decentralized consensus framework for a commercial shipping corporate, managing component transparency and identity metrics.",
    link: "#"
  },
  {
    id: "p3",
    title: "Cognitive AGV Assembler",
    category: "AI Solutions",
    image: "https://lh3.googleusercontent.com/d/1sB9Xo3ugUVafH2-dYYIY98jCmUbwXcGq",
    description: "A custom real-time computer vision algorithm coordinating automated robotic assembly arms inside an ISO-certified factory.",
    link: "#"
  },
  {
    id: "p4",
    title: "Smart Highrise IoT Mesh",
    category: "Smart Home",
    image: "https://lh3.googleusercontent.com/d/1K4e1WJ7Epet8iOK2pTWi6H86d1M8AsSU",
    description: "Seamless wireless mesh coordinating automated lighting networks, electronic access points, and security alarms in an urban real estate development.",
    link: "#"
  },
  {
    id: "p5",
    title: "High-Conversion Commercial Rooftop Solar",
    category: "Solar Installation",
    image: "https://lh3.googleusercontent.com/d/1cLkfGDVd5cX1GgKcOCsw2H5eYCqu39MQ",
    description: "High-capacity hybrid solar array providing net-metering telemetry tracking and backup storage for a 120kW healthcare clinic.",
    link: "#"
  },
  {
    id: "p6",
    title: "Digital Strategy & Enterprise Upskilling",
    category: "Digital Transformation",
    image: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    description: "Complete corporate digitization consulting and advanced leadership workshop series for a banking conglomerate.",
    link: "#"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    role: "Chief Operating Officer",
    company: "Vortex Logistics Solutions",
    quote: "Techno-Solutions transformed our manual operations into a completely automated workflow. The transition was incredibly seamless, and our inventory processing cycle times dropped by more than 40%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  },
  {
    id: "t2",
    name: "Sunita Sharma",
    role: "Director of Digital Strategy",
    company: "Apex Enterprise Group",
    quote: "Their AI and automation expertise significantly improved our business productivity. Integrating their customized neural document parser cut our data entry workflows down from 3 days to under 15 minutes.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  },
  {
    id: "t3",
    name: "Manish Goel",
    role: "Managing Director",
    company: "Goel Housing & Infrastructure",
    quote: "Deploying their localized smart building controls and high-conversion rooftop solar array has cut our monthly utilities overhead by 32%. Techno-Solutions delivers unparalleled engineering and clear ROI.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5
  }
];

export const INDUSTRIES = [
  { name: "Healthcare", desc: "Patient registration, appointment schedules, medical billing, and telemedicine automation." },
  { name: "Education", desc: "Smart learning management, automated examinations, and e-governance workflows." },
  { name: "Manufacturing", desc: "Production scheduling, predictive telemetry audits, and quality control vision systems." },
  { name: "Banking", desc: "Secured decentralized transactions, KYC validation, fraud triggers, and fintech tools." },
  { name: "Retail", desc: "Automated inventory management, POS integrations, and loyalty tracking." },
  { name: "Telecom", desc: "High-speed network architecture support, automated billing routing, and customer operations." },
  { name: "Government", desc: "Citizen portals, secure database integration, and transparent e-office filing." },
  { name: "Logistics", desc: "Real-time shipment telemetry, automated warehousing, and blockchain component chains." },
  { name: "Hospitality", desc: "Smart booking platforms, property management tools, and automated guest operations." },
  { name: "Real Estate", desc: "Smart lighting mesh, thermal management, and encrypted access hubs." },
  { name: "Energy", desc: "High-conversion solar energy grid management and intelligent battery monitoring." },
  { name: "SMEs", desc: "Affordable, customized business packages designed within budget boundaries." }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Professionals",
    desc: "Technology experts with industry knowledge."
  },
  {
    title: "Customized Solutions",
    desc: "Every business is unique. We build solutions that match your objectives."
  },
  {
    title: "End-to-End Services",
    desc: "From consulting to implementation and ongoing support."
  },
  {
    title: "Latest Technologies",
    desc: "AI, Automation, Cloud, IoT, Blockchain, and Smart Systems."
  },
  {
    title: "Affordable Pricing",
    desc: "Enterprise-quality solutions within your budget."
  },
  {
    title: "Customer First",
    desc: "Long-term partnerships focused on measurable business value."
  }
];

export const TECHNOLOGIES = [
  {
    category: "AI & Automation",
    items: ["Artificial Intelligence", "Machine Learning", "Generative AI", "Agentic AI", "RPA", "Microsoft Power Platform"]
  },
  {
    category: "Software & Web3",
    items: ["Blockchain", "Web3", "Python", "Java", "ERP", "CRM"]
  },
  {
    category: "Cloud & IoT",
    items: ["Cloud Computing", "AWS", "Azure", "Google Cloud", "Power BI", "IoT"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "The Ultimate Guide to Digital Transformation in Delhi NCR",
    slug: "digital-transformation-delhi",
    summary: "How top organizations in Delhi, Noida, and Gurgaon are leveraging digital consulting services to modernize their corporate upskilling and transition seamlessly to cloud operations.",
    category: "Digital Transformation",
    date: "June 28, 2026",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    keywords: ["Digital Transformation Company in Delhi", "Digital Consulting Services", "Enterprise Automation"],
    content: "In today’s rapidly evolving digital landscape, businesses in Delhi NCR must adapt, innovate, and transform to stay competitive. As a premier Digital Transformation Company in Delhi, Techno-Solutions is at the forefront of this revolution. Our Digital Consulting Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.\n\n### Why Digital Transformation Matters Now\n\nMany legacy businesses struggle with siloed systems, manual operations, and outdated technology stacks. By embracing enterprise automation, firms can reduce operational bottlenecks and enhance customer experience.\n\n### Our Strategic Framework\n\n1. **Comprehensive Mature Audits:** We evaluate your business models against leading industry standards.\n2. **Cloud Adoption & Migration:** Move safely to modern cloud structures like AWS, Azure, or Google Cloud with zero downtime.\n3. **AI & Analytics Integration:** Inject intelligent prediction models into your daily CRM and core decision pipelines."
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
    image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
    keywords: ["Business Automation Solutions", "Workflow Automation", "Enterprise Automation"],
    content: "Techno-Solutions is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into highly productive organizations.\n\n### The Direct ROI of Workflow Automation\n\n- **Reduced Error Rates:** Manual data entry and file transfers are prone to human mistakes. Automation reduces this to near-zero.\n- **Faster Approvals:** Routing invoice, leave, and expense claims automatically ensures rapid decision-making.\n- **Optimized Resources:** Employees can focus on high-value strategy rather than repetitive copy-paste jobs.\n\n### Scaling with Microsoft Power Platform & Low-Code\n\nWe utilize Microsoft Power Automate, Copilot Studio, and custom APIs to bridge gaps between HubSpot, Zoho, Salesforce, and Tally, ensuring complete, end-to-end operational visibility."
  },
  {
    id: "b3",
    title: "The Rise of Generative AI: Choosing an AI Solutions Provider in India",
    slug: "ai-solutions-provider-india",
    summary: "Harnessing neural networks, Agentic AI, and Gemini/ChatGPT API custom setups to build real-world productivity gains and secure automation.",
    category: "AI",
    date: "May 22, 2026",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z",
    keywords: ["AI Solutions Provider India", "Artificial Intelligence Consulting"],
    content: "AI has transitioned from a buzzword into a critical business driver. As an AI Solutions Provider India, Techno-Solutions helps corporate leaders design, implement, and audit cognitive solutions safely within their budget boundaries.\n\n### Key Pillars of Modern AI Implementation\n\n1. **Generative AI & LLM Integrations:** Connect the Gemini API or ChatGPT securely to parse corporate data, draft responses, or search documents.\n2. **Agentic AI & Custom Workflows:** Deploy autonomous, self-guided agents that trigger workflows, communicate across channels, and automate tasks.\n3. **Intelligent Document Processing (OCR):** Turn physical invoices, receipts, and forms into structured digital database entries in seconds."
  },
  {
    id: "b4",
    title: "Blockchain & Web3: Restructuring Security for Modern Enterprise Ledgers",
    slug: "blockchain-web3-enterprise-ledgers",
    summary: "Exploring audited smart contracts, decentralized consensus, and private ledger integrations for secure financial tracking and inventory validation.",
    category: "Blockchain",
    date: "May 05, 2026",
    readTime: "6 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1GKXj96wh-3gOlAr7ltk3ndI958XnyR9X",
    keywords: ["Blockchain Solutions", "Smart Contracts Delhi", "Web3 Integration"],
    content: "Secure decentralized technology is redefining trust in business transactions. At Techno-Solutions, we design audited blockchain networks and custom private consensus models that protect corporate IP, prevent inventory fraud, and create unalterable system logs.\n\n### The Security Core of Modern Blockchain Systems\n\n- **Consensus Mechanisms:** Distributing verification authority ensures no single point of network failure exists.\n- **Immutability:** Once logged, audit metrics cannot be altered or deleted, securing financial history.\n- **Smart Contract Automation:** Standardize and automate vendor escrow terms, royalty splits, and supply chain handshakes."
  },
  {
    id: "b5",
    title: "Intelligent Living: Smart Home Installation and IoT Security",
    slug: "intelligent-living-smart-home-installation",
    summary: "Upgrade your residential or commercial space with biometrics, mesh networks, and integrated CCTV for a secure environment.",
    category: "Smart Home",
    date: "April 18, 2026",
    readTime: "5 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1UMvm_FBS9b0zuUhPmi51g9veaCGzlbqJ",
    keywords: ["Smart Home Installation Delhi", "IoT Security Mesh", "Home Automation"],
    content: "Modern residential and commercial systems demand state-of-the-art security, ease of access, and ambient efficiency. Techno-Solutions delivers custom IoT integrations, secure biometrics, and intelligent lighting networks that blend into your architecture seamlessly.\n\n### Designing the Smart Home Environment\n\n1. **Unified Mesh Controls:** Control all local subsystems via an isolated, encrypted wireless mesh network.\n2. **Smart Security Locks:** Say goodbye to physical keys. Biometrics and temporary passcodes keep access fully recorded and highly secure.\n3. **Voice & Sensor Control:** Automate lighting schedules, air conditioning cycles, and backup power grids to maximize energy conservation."
  },
  {
    id: "b6",
    title: "Solar Power Integration: Reducing Overhead Expenses in Corporate Parks",
    slug: "solar-panel-installation-carbon-negative",
    summary: "Reduce monthly utility bills by up to 32% with commercial-grade hybrid solar panels and net-metering telemetry dashboards.",
    category: "Solar",
    date: "March 30, 2026",
    readTime: "7 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1F6j4zwTIDaAm7M66MobqoTYJBrk5Zbyp",
    keywords: ["Solar Panel Installation Services", "Green Tech Solutions", "Rooftop Solar Delhi"],
    content: "With rising energy tariffs, commercial and residential operations in Delhi NCR can significantly benefit from custom solar integration. Techno-Solutions provides comprehensive consulting, structural mapping, high-conversion panel configuration, and green energy monitoring.\n\n### Core Benefits of Solar Integration\n\n- **High Return on Investment:** Transitioning to clean tech saves direct utility costs and offers clean energy incentives.\n- **Carbon-Negative Footprint:** Do your part in global sustainability efforts by moving standard building consumption to renewable networks.\n- **Real-Time Telemetry:** Track every watt generated, stored, or back-fed into the local power grid through a secure dashboard."
  },
  {
    id: "b7",
    title: "2026 Enterprise Tech Trends: Adapting to the Digital Frontier",
    slug: "enterprise-tech-trends-2026",
    summary: "A deep dive into emerging tech paradigms, from agentic AI loops to decentralized web portals and green technology integrations.",
    category: "Industry Trends",
    date: "February 12, 2026",
    readTime: "8 min read",
    author: "Sanjeev Goel",
    image: "https://lh3.googleusercontent.com/d/1SgWtbqvysiJKRRWRHqAinvfN8cPRc5vc",
    keywords: ["Enterprise Tech Trends 2026", "Corporate Digital Strategy", "Future Tech Solutions"],
    content: "The year 2026 marks a milestone in deep tech integration. From standard cloud systems to highly proactive agent-based architectures, businesses must adapt fast or risk operational stagnation. Let’s explore the top paradigms driving corporate success this year.\n\n### Top 3 Paradigms to Watch\n\n1. **Agentic Workflows:** Moving beyond passive chat prompts into active systems that can manage research, email, and process automation with minimal human intervention.\n2. **Decentralized Data Anchors:** Securing critical company files and client transaction histories using unalterable cryptographically signed ledgers.\n3. **Hybrid Energy Networks:** Power power local servers and smart office parks using smart, carbon-negative local microgrids."
  }
];

