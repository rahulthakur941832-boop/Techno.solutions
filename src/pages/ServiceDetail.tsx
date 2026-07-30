import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Check, Send, Sparkles, AlertCircle, CheckCircle, 
  Settings, Server, Cpu, ShieldCheck, Home, Sun, HelpCircle, ArrowLeft,
  ChevronDown, BarChart, Clock, Award, Bot
} from "lucide-react";
import {
  DigitalTransformationContent,
  AISolutionsContent,
  BusinessAutomationContent,
  BlockchainCryptoContent,
  SmartHomeContent,
  SolarPanelContent
} from "./ServiceDetailsContent";

interface ServiceContent {
  title: string;
  badge: string;
  heroDesc: string;
  longDesc: string;
  icon: string;
  image: string;
  highlights: string[];
  subServices: string[];
  metrics: { value: string; label: string }[];
  accentColor: string;
  faq: { q: string; a: string }[];
}

const SERVICES_DATA: Record<string, ServiceContent> = {
  "digital-transformation": {
    title: "Digital Transformation Consulting & Training Services",
    badge: "Strategic Advisory & Upskilling",
    heroDesc: "Empowering businesses for the future. Assess, upskill, and transform with expert-led digital solutions.",
    longDesc: "In today’s rapidly evolving digital landscape, businesses must adapt, innovate, and transform to stay competitive. Digital transformation is no longer a luxury—it’s a necessity. However, many organizations struggle with implementing digital strategies effectively due to outdated infrastructure, workforce resistance, and unclear transformation roadmaps.\n\nWith expert guidance, businesses can leverage AI, cloud computing, automation, and data analytics to enhance efficiency, customer experience, and profitability. We help organizations across various industries navigate technological advancements and integrate AI, Cloud, IoT, Big Data, and Industry 4.0 into their business operations.",
    icon: "Server",
    image: "https://lh3.googleusercontent.com/d/1Eb9lrtVuN1YDIx7ZeC-u0Nsen7QR-tv4",
    highlights: [
      "Assess current digital maturity and identify operational gaps",
      "Develop customized digital strategy roadmaps",
      "Assist in technology selection & implementation",
      "Ensure business process optimization & automation",
      "Enable AI-driven decision-making & predictive analytics",
      "Corporate Digital Upskilling & hands-on workshops",
      "Guide organizations in adopting Cloud Computing & AI",
      "Seamless integration support with change management"
    ],
    subServices: [
      "Strategy & Leadership Program (2-3 Days)",
      "AI, IoT & Emerging Technologies in Business (3-5 Days)",
      "Digital Transformation for Industry 4.0 (3 Days)",
      "Corporate Digital Upskilling & Workshops"
    ],
    metrics: [
      { value: "4 Steps", label: "Consulting Approach" },
      { value: "2-5 Days", label: "Workshop Duration" },
      { value: "Industry 4.0", label: "Ready Solutions" }
    ],
    accentColor: "from-blue-600 to-indigo-700",
    faq: [
      { q: "What is your Consulting Approach?", a: "We follow a 4-step framework: 1. Assessment & Digital Readiness Check, 2. Strategy Development & Roadmap Design, 3. Technology Implementation & Change Management, and 4. Performance Monitoring & Continuous Optimization." },
      { q: "Who should attend the Digital Transformation Strategy & Leadership training?", a: "This 2-3 day program is designed for Executives, Managers, and Decision-Makers to equip them with strategic insights on digital disruption, roadmap building, and driving organizational change." },
      { q: "What emerging technologies are covered in the training programs?", a: "Our courses cover AI & Automation for business growth, IoT & Smart Connected Devices, Cloud Computing, Blockchain & Digital Trust, and Cybersecurity & Digital Risk Management." },
      { q: "Why should we invest in Digital Transformation Training & Consulting?", a: "Companies that invest in expert consulting and workforce training are better positioned to thrive in the digital age. It helps you optimize operations, implement AI, and ensure your team is ready to leverage modern systems effectively." }
    ]
  },
  "business-automation": {
    title: "Business Automation Solutions",
    badge: "Automating Businesses. Accelerating Growth.",
    heroDesc: "Streamline operations, eliminate repetitive tasks, and accelerate digital enterprise growth.",
    longDesc: "TECHNO-SOLUTIONS is a leading provider of Business Automation Solutions. We help startups, SMEs, large enterprises, and public organizations streamline operations, eliminate repetitive tasks, improve productivity, reduce operational costs, and accelerate digital transformation.\n\nWe combine business consulting expertise with Artificial Intelligence (AI), Robotic Process Automation (RPA), Cloud Computing, Low-Code Platforms, and Intelligent Workflow Automation to create future-ready, agile organizations.",
    icon: "Settings",
    image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1",
    highlights: [
      "Business Process Automation (Workflows, Approval routing, Digital forms)",
      "Robotic Process Automation (RPA for Data Entry, Payroll, Reconciliations)",
      "Artificial Intelligence Automation (AI Chatbots, AI Agents, Intelligent OCR)",
      "CRM Automation (Sales Pipeline & Support for Salesforce, HubSpot, Zoho)",
      "HR Automation (Recruitment, Onboarding, Attendance, Self-Service portals)",
      "Finance Automation (Invoice Automation, Accounts Payable/Receivable, Expenses)",
      "Procurement Automation (Vendor Registration, PO Automation, RFQs)",
      "Microsoft Power Platform (Power Apps, Power Automate, Power BI, Dataverse)",
      "ERP Integration (Seamless connections for SAP, Oracle, Tally, Odoo, Zoho)",
      "Secure Document Management (Version control, e-Signatures, Search & Retrieval)"
    ],
    subServices: [
      "Business Process & Workflow Automation",
      "Robotic Process Automation (RPA) Bots",
      "CRM & ERP Systems Integration Services",
      "Microsoft Power Platform Custom Development"
    ],
    metrics: [
      { value: "Up to 90%", label: "Manual Effort Saved" },
      { value: "Faster", label: "Cycle & Approval Times" },
      { value: "Real-time", label: "Power BI Analytics" }
    ],
    accentColor: "from-purple-600 to-pink-700",
    faq: [
      { q: "What business benefits can we expect from automation?", a: "RPA and AI can reduce manual effort by up to 90%. Digital Workflows ensure faster approvals and shorter cycle times. Document Management Systems improve compliance, and ERP Integrations unify disconnected legacy systems." },
      { q: "Which ERPs and CRMs can you integrate with?", a: "We provide end-to-end integration for SAP, Oracle, Microsoft Dynamics 365, Tally, Odoo, Zoho, Salesforce, HubSpot, and custom built-in-house ERP platforms." },
      { q: "What is your Business Automation Framework?", a: "Our process has 7 clear phases: 1. Business Discovery & Process Mapping, 2. Process Analysis & ROI Calculation, 3. Solution Design & Technology Selection, 4. Workflow & API Development, 5. Functional & Security Testing, 6. Deployment & User Training, and 7. Continuous SLA Optimization." },
      { q: "Why Choose TECHNO-SOLUTIONS for business automation?", a: "We align our efforts with clear business outcomes, customize solutions exactly to your processes, are vendor-neutral, and build secure, scalable solutions in full compliance with industry standards." }
    ]
  },
  "ai-solutions": {
    title: "Artificial Intelligence (AI) Training & Consulting",
    badge: "Cognitive AI Core",
    heroDesc: "Unlock the power of AI. Identify high-impact AI use cases, develop AI strategies, and upskill your teams.",
    longDesc: "In today’s fast-evolving digital landscape, AI consulting and training have become essential for businesses looking to harness the power of artificial intelligence. Our AI consulting helps organizations identify high-impact AI use cases, develop robust AI strategies, and implement AI-driven solutions that enhance efficiency, automation, and decision-making.\n\nSimultaneously, our corporate AI training programs, hands-on workshops, and executive coaching ensure your teams are fully upskilled and ready to utilize artificial intelligence to maintain competitive advantage.",
    icon: "Cpu",
    image: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z",
    highlights: [
      "AI Strategy & Consulting (AI Readiness & Roadmap Design)",
      "Custom AI Software & Model Development",
      "Corporate AI Training & Hands-on Upskilling Workshops",
      "AI System Deployment, Monitoring, & Support Services",
      "Predictive Analytics & Enterprise Data Science Solutions",
      "AI-Powered Automation & Robotic Process Automation (RPA)",
      "Integration with existing ERP, CRM, and Cloud Workflows",
      "AI Governance, Ethics, Compliance & Security Standards"
    ],
    subServices: [
      "AI Consulting & Strategy Roadmap",
      "Custom AI Software Development",
      "AI Training & Executive Upskilling",
      "AI Deployment, Compliance & Security"
    ],
    metrics: [
      { value: "10+", label: "Industries Served" },
      { value: "End-to-End", label: "Implementation" },
      { value: "Custom", label: "Model Architecture" }
    ],
    accentColor: "from-teal-600 to-cyan-700",
    faq: [
      { q: "How can AI help my industry/sector?", a: "AI provides custom solutions across sectors. For instance, in Manufacturing we implement Predictive Maintenance and Quality Control; in Retail, Personalized Recommendations and Chatbots; in Finance, Fraud Detection and Credit Scoring; and in HR, AI-Powered Hiring and Employee Sentiment Analysis." },
      { q: "What does your AI Software Development service cover?", a: "We design and develop custom AI-powered models, automate repetitive workflows using RPA, build predictive analytics solutions, and integrate AI features seamlessly into your existing ERP, CRM, and cloud architectures." },
      { q: "What does your AI Training Program cover?", a: "We offer customized upskilling for corporate teams, including: AI for Executives & Business Leaders, AI for IT & Data Science Teams, and AI for HR, Marketing, & Finance professionals, supported by hands-on workshops." },
      { q: "Why Choose Techno-Solutions for Artificial Intelligence?", a: "We combine deep cross-industry expertise, deliver tailored AI strategies mapped strictly to your objectives, handle end-to-end implementation from strategy to execution, and ensure data privacy and security." }
    ]
  },
  "blockchain-crypto": {
    title: "Blockchain & Crypto Solutions",
    badge: "Decentralized Trust & Web3",
    heroDesc: "Establish secure, transparent, and decentralized technology architectures for your organization.",
    longDesc: "At TECHNO-SOLUTIONS, we build decentralized architectures that establish immutable trust, automate multi-party compliance, and protect vital transaction logs. From deploying audited smart contracts to building custom Web3 portals and token networks, we help organizations eliminate single-point operational failures.",
    icon: "ShieldCheck",
    image: "https://lh3.googleusercontent.com/d/1GKXj96wh-3gOlAr7ltk3ndI958XnyR9X",
    highlights: [
      "Blockchain Advisory & Consulting services",
      "Audited Smart Contracts Development & Deployment",
      "Crypto Wallet Development & API Integrations",
      "Custom Token Development (Utility, Security, Governance)",
      "NFT Platforms & Digital Asset Tokenization Solutions",
      "Secure Web3 Business Applications & Interfaces",
      "Supply Chain Traceability & Blockchain Ledger Solutions",
      "Decentralized Identity & Access Management (DID)"
    ],
    subServices: [
      "Solidity & Rust Smart Contract Dev",
      "Private Consortium Ledger Architecture",
      "Web3 API & Crypto Wallet Integration",
      "Supply Chain Tracking Ledger Setup"
    ],
    metrics: [
      { value: "100%", label: "Immutable Ledger Logs" },
      { value: "0ms", label: "Double-spending Latency" },
      { value: "Secured", label: "Smart Contracts Auditing" }
    ],
    accentColor: "from-amber-600 to-orange-700",
    faq: [
      { q: "Can we deploy private blockchain ledgers?", a: "Yes. We develop secure, private consortium blockchain networks (such as Hyperledger, private EVM, or Corda) with fine-grained access control lists optimized specifically for enterprise operations." },
      { q: "What is smart contract auditing?", a: "Every smart contract we compile goes through intensive automated and manual security testing to identify vulnerabilities, logical loopholes, or gas inefficiencies before mainnet deployment." }
    ]
  },
  "smart-home": {
    title: "Smart Home Installation Services",
    badge: "Smarter, Safer, Connected",
    heroDesc: "Transform Your Home into a Smarter, Safer, and More Connected Living Space with certified automation specialists.",
    longDesc: "At TECHNO-SOLUTIONS, we design and install intelligent Smart Home solutions that bring convenience, comfort, security, and energy efficiency to your living space. Our advanced home automation systems integrate lighting, security, entertainment, climate, and kitchen appliances into one seamless, unified ecosystem controlled from anywhere via your smartphone, tablet, or voice assistants.",
    icon: "Home",
    image: "https://lh3.googleusercontent.com/d/1UMvm_FBS9b0zuUhPmi51g9veaCGzlbqJ",
    highlights: [
      "Smart Lighting Automation (Mood scenes, schedule timers, voice lights)",
      "Smart Security Systems (CCTV Cameras, intrusion alarms, alerts)",
      "Smart Door Locks & Access Control (Fingerprint, PIN, remote lock)",
      "Video Door Phone Systems (HD camera, two-way audio, app lock)",
      "Smart Climate Control (Automated temperature schedules, energy saving AC)",
      "Smart Entertainment Systems (Multi-room audio, Home Theatre setup)",
      "Smart Curtains & Blinds (Motorized opening/closing via sensors)",
      "Smart Kitchen & Energy Management (Gas/water leak detectors, smart plugs)",
      "Smart Home Networking (Mesh Wi-Fi installation, Structured cabling)",
      "Voice Assistant Integration (Amazon Alexa, Google Assistant, Apple HomeKit)"
    ],
    subServices: [
      "Smart Lighting & Ambience Design",
      "Comprehensive Smart Security & Locks",
      "Climate & Motorized Curtain Controls",
      "Whole-Home Mesh Wi-Fi & IoT Setup"
    ],
    metrics: [
      { value: "7 Steps", label: "Installation Process" },
      { value: "Alexa/Google", label: "Voice Enabled" },
      { value: "Mesh Wi-Fi", label: "Seamless Cover" }
    ],
    accentColor: "from-violet-600 to-indigo-700",
    faq: [
      { q: "Can I control my smart home remotely?", a: "Yes. Our solutions allow you to monitor and control your home's lighting, locks, climate, and security feeds from anywhere in the world using a secure mobile application." },
      { q: "Can I automate my existing home?", a: "Absolutely. Most existing homes can be retrofitted and upgraded with modern smart switches, sensors, and cameras without requiring major structural changes or rewiring." },
      { q: "Will smart home devices work during internet outages?", a: "Many core automation functions and local sensor communications continue to work reliably on your local home network, while remote access and cloud-based features will require an active internet connection." },
      { q: "What is your Smart Home installation process?", a: "Our process consists of 7 professional steps: 1. Consultation, 2. Site Survey, 3. Customized Solution Design, 4. Professional Certified Installation, 5. Configuration & Device Integration, 6. User Hands-on Training, and 7. Maintenance & After-Sales Support." }
    ]
  },
  "solar-energy": {
    title: "Solar Panel Installation Services",
    badge: "Clean Energy Solutions",
    heroDesc: "Power your future with solar energy. Custom solar grids for homes, offices, schools, and heavy industries.",
    longDesc: "At TECHNO-SOLUTIONS, we provide professional Solar Panel Installation Services that help homeowners, businesses, educational institutions, and industries reduce electricity costs, achieve energy independence, and contribute to a sustainable future.\n\nOur end-to-end solar solutions include personalized consultation, detailed site assessments, optimal structural engineering design, certified installation, grid integration net-metering commissioning, and long-term preventive Maintenance contracts.",
    icon: "Sun",
    image: "https://lh3.googleusercontent.com/d/1F6j4zwTIDaAm7M66MobqoTYJBrk5Zbyp",
    highlights: [
      "Residential Solar Panel Installation (On-grid, Off-grid, or Hybrid setups)",
      "Commercial Solar Solutions (Offices, Hotels, Schools, Hospitals, Malls)",
      "Industrial Solar Solutions (Factory roofs, Ground-mounted solar plants)",
      "Solar Water Heating Systems & Solar Street Lighting applications",
      "Solar Battery Storage Solutions (Lithium-ion systems, Smart monitors)",
      "Solar System Maintenance, Performance Sizing, & Annual Contracts (AMC)",
      "Grid-Connected Systems (Route surplus power back via net-metering)",
      "Hybrid Systems combining grid electricity, solar, and battery backup",
      "Complete Energy Audits, Structural Load checks, and Shading Analysis"
    ],
    subServices: [
      "Residential Rooftop Solar System",
      "Commercial & Industrial Solar Plant",
      "Solar Battery Storage & Hybrid Inverter",
      "System Sizing, AMC, & Panel Maintenance"
    ],
    metrics: [
      { value: "Up to 85%", label: "Electricity Savings" },
      { value: "25+ Years", label: "Panel Lifetime" },
      { value: "4.5 Years", label: "Avg Payback Period" }
    ],
    accentColor: "from-emerald-600 to-green-700",
    faq: [
      { q: "How much can I save with a solar power system?", a: "Savings depend on your electricity consumption, local tariffs, system size, and sunlight availability. During our consultation, we provide an estimated return on investment and projected energy savings." },
      { q: "How long do solar panels last?", a: "Most high-quality monocrystalline solar panels are designed to operate efficiently for 25 years or more with proper care and maintenance." },
      { q: "Do solar panels work on cloudy days?", a: "Yes. Solar panels continue to generate electricity under cloudy conditions, although output is generally lower than on bright sunny days." },
      { q: "Do I need battery storage?", a: "Battery storage is optional. It is recommended if you require backup power during outages, want to maximize self-generated solar energy, or reside in areas with limited grid access." },
      { q: "What is your Solar installation process?", a: "Our process consists of: 1. Free Consultation, 2. Site Survey & Shading analysis, 3. Customized System Design, 4. Proposal & Cost Estimation, 5. Professional Installation, 6. Testing & Commissioning, and 7. Monitoring & AMC support." }
    ]
  }
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const getResolvedServiceId = () => {
    if (id) return id;
    const fullPath = location.pathname + location.hash;
    
    if (fullPath.includes("digital-transformation")) return "digital-transformation";
    if (fullPath.includes("business-automation")) return "business-automation";
    if (fullPath.includes("artificial-intelligence")) return "ai-solutions";
    if (fullPath.includes("blockchain-solutions")) return "blockchain-crypto";
    if (fullPath.includes("smart-home-installation-services")) return "smart-home";
    if (fullPath.includes("solar-panel-installation")) return "solar-energy";
    
    return "digital-transformation";
  };

  const serviceId = getResolvedServiceId();
  const service = SERVICES_DATA[serviceId];

  // Form submission state
  const [formData, setFormData] = useState({ name: "", email: "", selectedRequirements: [] as string[], text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSubmitted(false);
    setFormData({ name: "", email: "", selectedRequirements: [], text: "" });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="pt-36 pb-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-slate-500 mb-8">The requested service page does not exist.</p>
        <Link to="/" className="px-6 py-2.5 rounded-xl bg-[#0F2D63] text-white font-bold text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  const renderIcon = (name: string) => {
    const cls = "w-10 h-10 text-[#E5AF2B]";
    switch (name) {
      case "Server": return <Server className={cls} />;
      case "Settings": return <Settings className={cls} />;
      case "Cpu": return <Bot className={cls} />;
      case "ShieldCheck": return <ShieldCheck className={cls} />;
      case "Home": return <Home className={cls} />;
      case "Sun": return <Sun className={cls} />;
      default: return <Server className={cls} />;
    }
  };

  const handleCheckboxChange = (sub: string) => {
    setFormData(prev => {
      const exists = prev.selectedRequirements.includes(sub);
      if (exists) {
        return { ...prev, selectedRequirements: prev.selectedRequirements.filter(x => x !== sub) };
      } else {
        return { ...prev, selectedRequirements: [...prev.selectedRequirements, sub] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const renderVerbatimContent = () => {
    switch (serviceId) {
      case "digital-transformation":
        return <DigitalTransformationContent />;
      case "ai-solutions":
        return <AISolutionsContent />;
      case "business-automation":
        return <BusinessAutomationContent />;
      case "blockchain-crypto":
        return <BlockchainCryptoContent />;
      case "smart-home":
        return <SmartHomeContent />;
      case "solar-energy":
        return <SolarPanelContent />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Service Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-6 font-semibold">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
            <span>/</span>
            <span className="text-[#E5AF2B]">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#E5AF2B] font-bold tracking-wider uppercase self-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.badge}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                {service.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
                {service.heroDesc}
              </p>
              
              {/* Quick metrics badges for desktop */}
              <div className="hidden sm:flex items-center gap-8 mt-4 pt-6 border-t border-white/10">
                {service.metrics.map((met, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-2xl font-serif font-bold text-[#E5AF2B]">{met.value}</span>
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{met.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right cover image */}
            <div className="lg:col-span-5">
              <div className="aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details and Calculator Panel */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Detailed Content */}
          <div className="lg:col-span-7 flex flex-col gap-10 text-left">
            {renderVerbatimContent() || (
              <>
                <div className="flex flex-col gap-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1B1B1B]">
                    Overview & Methodology
                  </h2>
                  <p className="text-[#5B6470] text-sm md:text-base leading-relaxed">
                    {service.longDesc}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="flex flex-col gap-5">
                  <h3 className="font-serif font-bold text-lg text-[#0F2D63]">What We Provide:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span className="text-xs font-semibold text-[#1B1B1B]">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Metrics view */}
                <div className="sm:hidden grid grid-cols-3 gap-4 border-y border-[#ECECEC] py-6">
                  {service.metrics.map((met, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1">
                      <span className="text-xl font-serif font-bold text-[#0F2D63]">{met.value}</span>
                      <span className="text-[9px] text-[#5B6470] font-bold uppercase tracking-wide leading-none">{met.label}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive FAQs */}
                <div className="flex flex-col gap-4 pt-4">
                  <h3 className="font-serif font-bold text-lg text-[#0F2D63]">Frequently Asked Questions</h3>
                  <div className="flex flex-col gap-3">
                    {service.faq.map((f, i) => (
                      <div key={i} className="border border-[#ECECEC] rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="w-full px-5 py-4 text-left flex justify-between items-center bg-[#F8F9FC] hover:bg-slate-50 transition-colors font-semibold text-xs md:text-sm text-[#1B1B1B]"
                        >
                          <span>{f.q}</span>
                          <ChevronDown className={`w-4 h-4 text-[#5B6470] transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {activeFaq === i && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 py-4 text-xs md:text-sm text-[#5B6470] leading-relaxed border-t border-[#ECECEC]">
                                {f.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Interactive Specification & Discovery Blueprint Request Form */}
          <div className="lg:col-span-5 bg-white border border-[#ECECEC] rounded-[32px] p-8 shadow-xs text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="spec-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-[#E5AF2B] uppercase tracking-widest">INTERACTIVE SELECTION</span>
                    <h3 className="font-serif font-bold text-xl text-[#0F2D63]">Select Parameters</h3>
                    <p className="text-xs text-[#5B6470]">
                      Check the sub-services you require. Our systems will estimate customized SLA benchmarks for your blueprint.
                    </p>
                  </div>

                  {/* Checkable Sub-services */}
                  <div className="flex flex-col gap-2.5 bg-[#F8F9FC] border border-[#ECECEC] p-4 rounded-xl">
                    <span className="text-[10px] font-bold text-[#1B1B1B] uppercase tracking-wider block mb-1">Target Areas:</span>
                    {service.subServices.map((sub, i) => (
                      <label key={i} className="flex items-start gap-2.5 cursor-pointer select-none group">
                        <input
                          type="checkbox"
                          checked={formData.selectedRequirements.includes(sub)}
                          onChange={() => handleCheckboxChange(sub)}
                          className="w-4 h-4 rounded-sm accent-[#0F2D63] border-[#ECECEC] mt-0.5 cursor-pointer"
                        />
                        <span className="text-xs text-slate-700 font-medium group-hover:text-[#0F2D63] transition-colors">
                          {sub}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Estimation Panel (Dynamic calculation depending on checkboxes!) */}
                  <div className="p-4 rounded-xl bg-[#0F2D63]/5 border border-[#ECECEC] text-xs text-slate-700 flex flex-col gap-2">
                    <div className="flex justify-between font-bold text-[#0F2D63] border-b border-[#ECECEC] pb-1.5">
                      <span>PROJECT METRIC</span>
                      <span>ESTIMATION</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Focus Areas:</span>
                      <span className="font-semibold text-[#1B1B1B]">{formData.selectedRequirements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Priority:</span>
                      <span className="font-semibold text-emerald-600">Standard SLA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Initial Audit:</span>
                      <span className="font-semibold text-[#E5AF2B]">Within 24 Hours</span>
                    </div>
                  </div>

                  {/* Name and Email inputs */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-xs focus:outline-hidden focus:border-[#0F2D63]"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Your Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-xs focus:outline-hidden focus:border-[#0F2D63]"
                      />
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3.5 bg-[#0F2D63] text-white font-bold text-xs rounded-xl hover:bg-[#1a448c] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Service Blueprint
                        <ArrowRight className="w-3.5 h-3.5 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="spec-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-6 gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle className="w-8 h-8 stroke-[2px]" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif font-bold text-xl text-[#0F2D63]">Parameters Received</h3>
                    <p className="text-xs text-[#5B6470] max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-[#1b1b1b]">{formData.name}</span>. Your custom selection is now being audited by Sanjeev Goel.
                    </p>
                  </div>

                  <div className="p-3 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl text-left w-full text-[10px] font-mono flex flex-col gap-1 text-slate-600">
                    <p><strong>RECIPIENT:</strong> mail@techno-solutions.tech</p>
                    <p><strong>SERVICE_TYPE:</strong> {serviceId}</p>
                    <p><strong>ITEMS:</strong> {formData.selectedRequirements.length || "Standard Full Package"}</p>
                    <p><strong>SLA:</strong> compilation_in_progress...</p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", selectedRequirements: [], text: "" });
                    }}
                    className="px-5 py-2 rounded-xl border border-[#ECECEC] text-[#0F2D63] text-xs font-semibold hover:bg-[#F8F9FC] transition-colors"
                  >
                    Adjust Parameters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
