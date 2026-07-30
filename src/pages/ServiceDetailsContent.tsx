import React from "react";
import { Check, Bot, Server, Settings, ShieldCheck, Home, Sun, Zap, Sparkles } from "lucide-react";

// 1. Digital Transformation Verbatim Content
export function DigitalTransformationContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* About Us */}
      <div className="bg-[#F8F9FC] border border-[#ECECEC] p-8 rounded-3xl">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63] mb-4">ABOUT US</h3>
        <p className="text-[#5B6470] text-sm leading-relaxed">
          We specialize in Digital Transformation Training & Consulting, helping organizations across various industries navigate technological advancements and integrate AI, Cloud, IoT, Big Data, and Industry 4.0 into their business operations. Our expert-led approach equips professionals with the skills and strategies needed to drive innovation, efficiency, and growth in the digital era.
        </p>
      </div>

      {/* Industries We Serve */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">INDUSTRIES WE SERVE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Telecom", desc: "AI-driven network optimization, 5G & IoT integration" },
            { name: "Banking & Finance", desc: "Fintech innovations, AI-powered fraud detection, automation" },
            { name: "Healthcare & Pharmaceuticals", desc: "AI in diagnostics, telemedicine, digital patient management" },
            { name: "Manufacturing & Industry 4.0", desc: "Smart factories, IoT-enabled automation, predictive maintenance" },
            { name: "Retail & E-Commerce", desc: "Personalized AI-driven marketing, digital payment solutions" },
            { name: "Education & E-Learning", desc: "AI-powered learning platforms, digital content automation" },
            { name: "Supply Chain & Logistics", desc: "Blockchain & IoT-based tracking, automated warehouses" },
            { name: "Government & Public Sector", desc: "E-Governance, smart city initiatives, digital citizen services" }
          ].map((ind, i) => (
            <div key={i} className="p-4 bg-white border border-[#ECECEC] rounded-xl hover:bg-slate-50 transition-colors">
              <span className="font-serif font-bold text-sm text-[#1B1B1B] block mb-1">{ind.name}</span>
              <span className="text-xs text-[#5B6470]">{ind.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Services */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR SERVICES</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Digital Transformation Consulting",
              items: [
                "Assess current digital maturity and identify gaps",
                "Develop a customized digital strategy roadmap",
                "Assist in technology selection & implementation",
                "Ensure business process optimization & automation",
                "Enable AI-driven decision-making & predictive analytics"
              ]
            },
            {
              title: "Digital Transformation Training Programs",
              items: [
                "Leadership & Strategy in Digital Transformation",
                "Emerging Technologies: AI, IoT, Cloud, Blockchain",
                "Data Analytics & Business Intelligence",
                "Industry 4.0 & Smart Manufacturing",
                "Cybersecurity & Digital Risk Management"
              ]
            },
            {
              title: "Corporate Digital Upskilling",
              items: [
                "Customized training programs tailored to industry-specific needs",
                "Hands-on workshops for technical & non-technical teams",
                "Case studies & real-world applications"
              ]
            },
            {
              title: "Technology Implementation Support",
              items: [
                "Guide organizations in adopting cloud computing & AI",
                "Assist with automation & process reengineering",
                "Ensure seamless digital integration"
              ]
            }
          ].map((srv, i) => (
            <div key={i} className="border border-[#ECECEC] p-6 rounded-2xl bg-white shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-3">{srv.title}</h4>
              <ul className="flex flex-col gap-2">
                {srv.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#5B6470]">
                    <Check className="w-3.5 h-3.5 text-[#E5AF2B] shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Training Program Details */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">TRAINING PROGRAM DETAILS</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              num: "1",
              title: "Digital Transformation Strategy & Leadership",
              obj: "Equip leaders with strategic digital insights",
              dur: "2-3 Days",
              who: "Executives, Managers, Decision-Makers",
              topics: [
                "Understanding Digital Disruption & Industry 4.0",
                "Building a Digital Transformation Roadmap",
                "Driving Organizational Change & Innovation"
              ]
            },
            {
              num: "2",
              title: "AI, IoT, and Emerging Technologies in Business",
              obj: "Help businesses leverage AI, IoT & Cloud",
              dur: "3-5 Days",
              who: "IT Managers, Tech Professionals, Business Leaders",
              topics: [
                "AI & Automation for Business Growth",
                "IoT & Smart Connected Devices",
                "Blockchain & Digital Trust"
              ]
            },
            {
              num: "3",
              title: "Digital Transformation for Industry 4.0",
              obj: "Enable manufacturers to integrate smart technologies",
              dur: "3 Days",
              who: "Operations & Supply Chain Managers, Engineers",
              topics: [
                "Smart Factories & IoT in Manufacturing",
                "Robotics, Automation & Predictive Maintenance",
                "Data Analytics for Operational Efficiency"
              ]
            }
          ].map((prog, i) => (
            <div key={i} className="border border-[#ECECEC] p-6 rounded-2xl bg-[#F8F9FC] relative overflow-hidden">
              <span className="absolute top-2 right-4 text-7xl font-serif font-bold text-[#0F2D63]/5">{prog.num}</span>
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-3 pr-10">{prog.title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <strong className="text-[#1B1B1B] block">Objective:</strong>
                  <span className="text-[#5B6470]">{prog.obj}</span>
                </div>
                <div>
                  <strong className="text-[#1B1B1B] block">Duration:</strong>
                  <span className="text-[#5B6470]">{prog.dur}</span>
                </div>
                <div className="sm:col-span-2">
                  <strong className="text-[#1B1B1B] block">Who Should Attend?</strong>
                  <span className="text-[#5B6470]">{prog.who}</span>
                </div>
              </div>
              <div className="border-t border-[#ECECEC] pt-3">
                <strong className="text-xs text-[#1B1B1B] block mb-2">Key Topics:</strong>
                <ul className="flex flex-col gap-1.5">
                  {prog.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#5B6470]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5AF2B] mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consulting Approach */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR CONSULTING APPROACH</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Assessment & Digital Readiness Check",
            "Strategy Development & Roadmap Design",
            "Technology Implementation & Change Management",
            "Performance Monitoring & Continuous Optimization"
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-[#ECECEC] rounded-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#0F2D63]/5 text-[#0F2D63] font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
              <span className="text-xs font-semibold text-[#1B1B1B]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">WHY CHOOSE US?</h3>
        <ul className="flex flex-col gap-3">
          {[
            "Industry Experts with real-world digital transformation experience",
            "Customized Solutions tailored to your business needs",
            "Hands-on Training & Workshops for practical learning",
            "Proven Track Record of helping companies adopt digital transformation"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl">
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-xs font-semibold text-[#1B1B1B]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Summary Verbatim */}
      <div className="border-t border-[#ECECEC] pt-8 text-[#5B6470] text-xs leading-relaxed flex flex-col gap-4">
        <p className="italic font-semibold text-[#1B1B1B] text-sm">
          "Transform your business with the power of digital innovation!"
        </p>
        <p>
          Digital transformation is a journey, not a destination. Companies that invest in expert consulting and workforce training are better positioned to thrive in the digital age. Whether you’re looking to optimize business operations, implement AI-driven solutions, or train your workforce, digital transformation consulting and training services provide the roadmap to success.
        </p>
      </div>
    </div>
  );
}

// 2. AI Solutions Verbatim Content
export function AISolutionsContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Overview Paragraphs */}
      <div className="text-[#5B6470] text-sm md:text-base leading-relaxed flex flex-col gap-4">
        <p>
          In today’s fast-evolving digital landscape, AI consulting and training have become essential for businesses looking to harness the power of artificial intelligence. AI consulting helps organizations identify high-impact AI use cases, develop AI strategies, and implement AI-driven solutions that enhance efficiency, automation, and decision-making. From predictive analytics and process automation to AI-powered customer engagement, consulting services enable companies to integrate AI seamlessly into their operations.
        </p>
        <p>
          On the other hand, AI training is crucial for upskilling teams and ensuring businesses can fully leverage AI capabilities. Through corporate AI workshops, executive training, and hands-on AI courses, professionals gain the knowledge and skills to implement AI technologies effectively. Whether it's training business leaders on AI strategy, upskilling IT teams in machine learning, or educating employees on AI adoption, a well-designed AI training program ensures organizations remain competitive, innovative, and AI-ready in the digital era.
        </p>
        <p className="font-semibold text-[#0F2D63]">
          AI can provide a wide range of solutions to industries, depending on their needs and challenges. Here are some key AI-driven solutions across various sectors:
        </p>
      </div>

      {/* Sectors Grid */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">AI SOLUTIONS ACROSS SECTORS</h3>
        <div className="flex flex-col gap-4">
          {[
            {
              num: "1",
              name: "Manufacturing & Industrial Automation",
              items: [
                "Predictive Maintenance: AI-powered sensors and analytics to predict machine failures and reduce downtime.",
                "Quality Control: Computer vision for defect detection and ensuring product quality.",
                "Supply Chain Optimization: AI-driven demand forecasting and inventory management.",
                "Robotic Process Automation (RPA): Automating repetitive tasks using AI-driven robots."
              ]
            },
            {
              num: "2",
              name: "Retail & E-commerce",
              items: [
                "Personalized Recommendations: AI-powered recommendation engines (like Amazon, Netflix).",
                "Chatbots & Virtual Assistants: AI-driven customer support for better engagement.",
                "Dynamic Pricing: AI adjusts prices based on demand, competitor pricing, and customer behavior.",
                "Fraud Detection: AI-driven fraud analytics to prevent financial losses."
              ]
            },
            {
              num: "3",
              name: "Healthcare & Pharmaceuticals",
              items: [
                "Medical Imaging & Diagnosis: AI-based image analysis for early disease detection (e.g., cancer).",
                "Drug Discovery: AI accelerates drug research and testing processes.",
                "Patient Monitoring & Telemedicine: AI-powered wearable devices and remote patient monitoring.",
                "Healthcare Chatbots: AI-driven symptom checkers and appointment scheduling."
              ]
            },
            {
              num: "4",
              name: "Banking & Finance",
              items: [
                "Fraud Detection: AI identifies suspicious transactions and prevents fraud.",
                "Credit Scoring & Risk Assessment: AI-based loan approvals and risk assessment.",
                "Algorithmic Trading: AI-driven stock market analysis and automated trading.",
                "Customer Support: AI-powered chatbots for banking inquiries and support."
              ]
            },
            {
              num: "5",
              name: "Telecom & IT",
              items: [
                "Network Optimization: AI enhances network performance and detects anomalies.",
                "Automated Customer Support: AI chatbots for instant customer query resolution.",
                "Churn Prediction: AI helps telecom companies predict and prevent customer churn.",
                "Fraud Prevention: AI detects SIM card cloning, call spoofing, and fraudulent activities."
              ]
            },
            {
              num: "6",
              name: "Marketing & Sales",
              items: [
                "Customer Segmentation: AI-driven insights to target the right customers.",
                "Sentiment Analysis: AI analyzes social media and customer feedback for brand insights.",
                "Lead Scoring: AI prioritizes high-value leads for sales teams.",
                "Automated Content Creation: AI-generated ad copies, social media posts, and emails."
              ]
            },
            {
              num: "7",
              name: "Logistics & Transportation",
              items: [
                "Route Optimization: AI-based real-time traffic analysis for better logistics.",
                "Autonomous Vehicles: AI-powered self-driving cars and trucks.",
                "Demand Forecasting: AI-driven logistics planning for cost savings.",
                "Warehouse Automation: AI robots for sorting and managing inventory."
              ]
            },
            {
              num: "8",
              name: "Education & E-Learning",
              items: [
                "Personalized Learning: AI customizes learning paths for students.",
                "AI Tutors & Chatbots: Virtual AI tutors for answering student queries.",
                "Automated Grading: AI evaluates assignments and exams efficiently.",
                "Plagiarism Detection: AI detects duplicate content in academic submissions."
              ]
            },
            {
              num: "9",
              name: "Energy & Utilities",
              items: [
                "Smart Grid Management: AI optimizes energy distribution and reduces waste.",
                "Predictive Maintenance: AI predicts failures in power plants and infrastructure.",
                "Energy Consumption Optimization: AI reduces electricity usage and costs.",
                "Renewable Energy Forecasting: AI predicts solar and wind energy output."
              ]
            },
            {
              num: "10",
              name: "Human Resources (HR) & Workforce Management",
              items: [
                "AI-Powered Hiring: Resume screening, candidate matching, and recruitment chatbots.",
                "Employee Engagement Analysis: AI analyzes employee sentiment and productivity.",
                "Performance Management: AI-driven analytics for employee performance evaluation.",
                "Learning & Development: AI recommends personalized training programs."
              ]
            }
          ].map((sec, i) => (
            <div key={i} className="p-6 border border-[#ECECEC] rounded-2xl bg-white shadow-xs text-left">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#E5AF2B]/10 text-[#E5AF2B] font-bold text-xs flex items-center justify-center shrink-0">{sec.num}</span>
                {sec.name}
              </h4>
              <ul className="flex flex-col gap-2 pl-8">
                {sec.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#5B6470]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5AF2B] mt-1.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Solutions Services Breakdown */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR DETAILED AI SERVICES</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "AI Strategy & Consulting",
              tagline: "Book an AI consultation Today!",
              items: [
                "Our AI experts help you define a clear AI roadmap, identify the best AI use cases, and align AI adoption with your business objectives.",
                "AI Readiness Assessment",
                "AI Strategy Development",
                "AI Use Case Identification",
                "AI Governance & Ethics"
              ]
            },
            {
              title: "AI Software Development",
              tagline: "Transform Your Business with AI!",
              items: [
                "We design and develop AI-powered applications to enhance business efficiency, automate processes, and improve decision-making.",
                "Custom AI Model Development",
                "AI-Powered Automation & RPA",
                "Predictive Analytics & Data Science Solutions",
                "AI Integration with ERP, CRM & Cloud"
              ]
            },
            {
              title: "AI Training & Corporate Upskilling",
              tagline: "Explore Our AI Training Programs!",
              items: [
                "Empower your workforce with AI knowledge and skills through our corporate training programs.",
                "AI for Executives & Business Leaders",
                "AI for IT & Data Science Teams",
                "AI for HR, Marketing, and Finance Professionals",
                "Hands-on AI Workshops & Certification"
              ]
            },
            {
              title: "AI Implementation & Support",
              tagline: "Let’s Bring AI into Your Business!",
              items: [
                "Seamlessly integrate AI into your existing workflows with our expert AI deployment services.",
                "AI System Deployment & Monitoring",
                "AI Workflow Automation",
                "AI Performance Optimization",
                "AI Compliance & Security"
              ]
            }
          ].map((srv, i) => (
            <div key={i} className="p-6 border border-[#ECECEC] rounded-2xl bg-[#F8F9FC] text-left">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-2">{srv.title}</h4>
              <p className="text-xs text-[#5B6470] mb-4 italic font-medium">{srv.items[0]}</p>
              <ul className="flex flex-col gap-2 mb-4">
                {srv.items.slice(1).map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#1B1B1B] font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#E5AF2B] tracking-wider uppercase">{srv.tagline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Verbatim */}
      <div className="p-8 border border-[#ECECEC] bg-white rounded-3xl text-left flex flex-col gap-4">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">ABOUT US</h3>
        <div>
          <strong className="text-sm text-[#1B1B1B] block mb-1">Who We Are</strong>
          <p className="text-xs text-[#5B6470] leading-relaxed">
            We are a leading AI consulting firm dedicated to helping businesses leverage Artificial Intelligence for transformation and growth. Our team of AI strategists, data scientists, and software engineers work with organizations across industries to implement cutting-edge AI solutions.
          </p>
        </div>
        <div className="border-t border-[#ECECEC] pt-4">
          <strong className="text-sm text-[#1B1B1B] block mb-2">Why Choose Us?</strong>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5B6470]">
            <li><strong>Industry Expertise</strong> – Deep AI knowledge across multiple sectors.</li>
            <li><strong>Customized AI Solutions</strong> – Tailored AI strategies for your unique business needs.</li>
            <li><strong>End-to-End AI Implementation</strong> – From strategy to execution.</li>
            <li><strong>Trusted by Businesses Worldwide</strong> – Proven success in AI adoption.</li>
          </ul>
        </div>
      </div>

      {/* Footer CTA Call Verbatim */}
      <div className="border-t border-[#ECECEC] pt-8 text-[#5B6470] text-xs leading-relaxed text-left flex flex-col gap-2">
        <strong className="text-sm text-[#0F2D63]">FOR OUR AI SERVICES, CONTACT US TODAY....</strong>
        <p>Let’s Unlock the Power of AI for Your Business!</p>
      </div>
    </div>
  );
}

// 3. Business Automation Verbatim Content
export function BusinessAutomationContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Company Profile Verbatim */}
      <div className="p-8 border border-[#ECECEC] bg-[#F8F9FC] rounded-3xl text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63] mb-4">COMPANY PROFILE</h3>
        <p className="text-[#5B6470] text-sm leading-relaxed mb-4">
          TECHNO-SOLUTIONS is a leading provider of Business Automation Solutions that help organizations streamline operations, eliminate repetitive tasks, improve productivity, reduce operational costs, and accelerate digital transformation.
        </p>
        <p className="text-[#5B6470] text-sm leading-relaxed">
          We combine business consulting expertise with Artificial Intelligence (AI), Robotic Process Automation (RPA), Cloud Computing, Low-Code Platforms, and Intelligent Workflow Automation to create future-ready organizations. Our automation solutions are designed for startups, SMEs, large enterprises, educational institutions, healthcare organizations, manufacturing companies, financial institutions, retail businesses, and government agencies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-[#ECECEC] pt-4 text-xs">
          <div>
            <strong className="text-[#0F2D63] block">Our Vision</strong>
            <span className="text-[#5B6470]">To become a trusted global provider of intelligent business automation solutions that transform the way organizations operate.</span>
          </div>
          <div>
            <strong className="text-[#0F2D63] block">Our Mission</strong>
            <span className="text-[#5B6470]">To help organizations automate business processes through innovative technologies that improve efficiency, productivity, compliance, and customer experience.</span>
          </div>
        </div>
      </div>

      {/* Core Services Verbatim */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR CORE SERVICES</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Business Process Automation",
              desc: "Workflow Automation, Business Process Reengineering, Digital Forms, Approval Workflows, Process Standardization, Electronic Document Routing, Automated Notifications, Escalation Management"
            },
            {
              title: "Robotic Process Automation (RPA)",
              desc: "Reduce manual effort using software robots. (Data Entry Automation, Invoice Processing, Report Generation, Banking Reconciliation, Payroll Processing, Customer Onboarding, Data Migration, ERP Data Updates)"
            },
            {
              title: "Artificial Intelligence Automation",
              desc: "Integrate AI into business operations. (AI Chatbots, AI Assistants, AI Agents, Intelligent Document Processing, OCR Automation, Email Automation, Predictive Analytics, AI Knowledge Bases)"
            },
            {
              title: "CRM Automation",
              desc: "Improve sales and customer engagement. (Lead Management, Opportunity Tracking, Sales Pipeline Automation, Customer Support Automation, Marketing Campaign Automation, Customer Feedback Management. Supported Platforms: Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics 365)"
            },
            {
              title: "HR Automation",
              desc: "Digitize human resource operations. (Recruitment Automation, Employee Onboarding, Attendance Management, Leave Management, Payroll Integration, Performance Management, Training Management, Employee Self-Service Portal)"
            },
            {
              title: "Finance Automation",
              desc: "Automate financial operations. (Invoice Automation, Accounts Payable, Accounts Receivable, Expense Management, Financial Reporting, Budget Tracking, Procurement Automation, Payment Approval Workflow)"
            },
            {
              title: "Procurement Automation",
              desc: "Digitize procurement lifecycle. (Purchase Requisition, Vendor Registration, RFQ Management, Purchase Order Automation, Contract Management, Vendor Performance Monitoring)"
            },
            {
              title: "Document Management Solutions",
              desc: "Manage business documents securely. (Digital Repository, OCR, Version Control, Electronic Signatures, Search & Retrieval, Access Control, Compliance Management)"
            },
            {
              title: "ERP Integration",
              desc: "Connect all business applications. (SAP, Oracle, Microsoft Dynamics, Tally, Odoo, Zoho, Custom ERP Systems)"
            },
            {
              title: "Microsoft Power Platform Solutions",
              desc: "Build intelligent business applications with minimal coding. (Power Apps, Power Automate, Power BI, Copilot Studio, Dataverse, Power Pages)"
            }
          ].map((srv, i) => (
            <div key={i} className="p-5 border border-[#ECECEC] rounded-2xl bg-white shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-2">{srv.title}</h4>
              <p className="text-xs text-[#5B6470] leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Solutions Verbatim */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">INDUSTRY SOLUTIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Manufacturing", desc: "Production Planning Automation, Inventory Automation, Quality Management, Vendor Management, Maintenance Scheduling" },
            { name: "Healthcare", desc: "Patient Registration, Appointment Management, Electronic Medical Records, Billing Automation, Laboratory Workflow" },
            { name: "Education", desc: "Student Admission, Attendance, Learning Management, Fee Collection, Examination Management" },
            { name: "Retail", desc: "Inventory Management, POS Integration, Customer Loyalty, Procurement, Supply Chain Automation" },
            { name: "Banking & Financial Services", desc: "Loan Processing, KYC Automation, Compliance Monitoring, Risk Assessment, Customer Service Automation" },
            { name: "Logistics", desc: "Shipment Tracking, Fleet Management, Warehouse Automation, Delivery Scheduling" },
            { name: "Government", desc: "Citizen Services, File Tracking, e-Office, Procurement, Document Management" }
          ].map((ind, i) => (
            <div key={i} className="p-4 bg-white border border-[#ECECEC] rounded-xl">
              <span className="font-serif font-bold text-sm text-[#1B1B1B] block mb-1">{ind.name}</span>
              <span className="text-xs text-[#5B6470]">{ind.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies We Install Verbatim */}
      <div className="flex flex-col gap-5 text-left bg-white border border-[#ECECEC] p-6 rounded-2xl">
        <h3 className="font-serif font-bold text-lg text-[#0F2D63]">TECHNOLOGIES WE LEVERAGE</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Artificial Intelligence (AI)", "Generative AI", "Agentic AI", "Robotic Process Automation (RPA)",
            "Microsoft Power Platform", "Power BI", "Python", "Java", ".NET", "Cloud Computing",
            "Microsoft Azure", "AWS", "Google Cloud", "API Integration", "Low-Code / No-Code Platforms",
            "OCR", "IoT", "Blockchain", "SQL & NoSQL Databases"
          ].map((tech) => (
            <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#0F2D63]/5 text-[#0F2D63] text-xs font-semibold border border-[#0F2D63]/10">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Business Automation Framework 7 Phases Verbatim */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR BUSINESS AUTOMATION FRAMEWORK</h3>
        <div className="relative border-l-2 border-[#ECECEC] ml-3 pl-6 flex flex-col gap-6">
          {[
            { phase: "Phase 1 – Business Discovery", desc: "Business Assessment, Process Mapping, Stakeholder Interviews, Opportunity Identification" },
            { phase: "Phase 2 – Process Analysis", desc: "Current State Analysis, Bottleneck Identification, ROI Analysis, Automation Readiness Assessment" },
            { phase: "Phase 3 – Solution Design", desc: "Future State Process Design, Automation Architecture, Technology Selection, Integration Planning" },
            { phase: "Phase 4 – Development", desc: "Workflow Development, AI Integration, API Integration, Dashboard Development" },
            { phase: "Phase 5 – Testing", desc: "Functional Testing, User Acceptance Testing, Performance Testing, Security Validation" },
            { phase: "Phase 6 – Deployment", desc: "Production Rollout, User Training, Documentation, Go-Live Support" },
            { phase: "Phase 7 – Continuous Improvement", desc: "Performance Monitoring, Optimization, AI Enhancements, Continuous Support" }
          ].map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-[#0F2D63] border-2 border-white flex items-center justify-center" />
              <strong className="text-xs text-[#0F2D63] block font-bold mb-1 uppercase">{item.phase}</strong>
              <span className="text-xs text-[#5B6470]">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Business Benefits Verbatim Comparison Table */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">BUSINESS BENEFITS</h3>
        <div className="border border-[#ECECEC] rounded-2xl overflow-hidden bg-white shadow-xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F8F9FC] border-b border-[#ECECEC] text-[#0F2D63] font-bold">
              <tr>
                <th className="px-4 py-3">PROCESS CHALLENGE</th>
                <th className="px-4 py-3">AUTOMATION SOLUTION</th>
                <th className="px-4 py-3">MEASURABLE OUTCOME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECECEC] text-[#5B6470]">
              {[
                { c: "Manual Data Entry", s: "RPA & AI Automation", o: "Up to 90% reduction in manual effort" },
                { c: "Slow Approvals", s: "Digital Workflow Automation", o: "Faster approvals and shorter cycle times" },
                { c: "Paper-Based Processes", s: "Document Management System", o: "Improved efficiency and traceability" },
                { c: "Disconnected Systems", s: "API & ERP Integration", o: "Unified business operations" },
                { c: "Limited Reporting", s: "Power BI Dashboards", o: "Real-time business insights" },
                { c: "Customer Support Delays", s: "AI Chatbots & Ticket Automation", o: "Faster response times and improved service" },
                { c: "HR Administration", s: "HR Automation", o: "Simplified employee lifecycle management" },
                { c: "Procurement Delays", s: "Procurement Automation", o: "Improved vendor management and compliance" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-[#1B1B1B]">{row.c}</td>
                  <td className="px-4 py-3">{row.s}</td>
                  <td className="px-4 py-3 text-emerald-600 font-bold">{row.o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Choose TECHNO-SOLUTIONS */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">WHY CHOOSE TECHNO-SOLUTIONS?</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { t: "Business-First Approach", d: "We align automation initiatives with measurable business outcomes." },
            { t: "Customized Solutions", d: "Every implementation is tailored to your organization's processes and goals." },
            { t: "Experienced Consultants", d: "Our team combines business consulting expertise with technical excellence." },
            { t: "Vendor-Neutral Expertise", d: "We recommend technologies based on your requirements rather than a single platform." },
            { t: "End-to-End Delivery", d: "From consulting and implementation to training and ongoing support." },
            { t: "Security & Compliance", d: "We build secure, scalable solutions aligned with industry standards and regulatory requirements." }
          ].map((item, i) => (
            <li key={i} className="p-4 bg-white border border-[#ECECEC] rounded-xl text-left">
              <strong className="text-xs font-bold text-[#1B1B1B] block mb-1">{item.t}</strong>
              <span className="text-xs text-[#5B6470]">{item.d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Representative Use Cases Verbatim */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">REPRESENTATIVE USE CASES</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { title: "Finance", items: ["Automated invoice processing", "Expense approvals", "Financial dashboards"] },
            { title: "Human Resources", items: ["Employee onboarding", "Leave approvals", "Performance management"] },
            { title: "Sales", items: ["Lead capture and qualification", "CRM workflow automation", "Sales forecasting"] },
            { title: "Customer Service", items: ["AI-powered chatbots", "Ticket routing", "SLA monitoring"] },
            { title: "Operations", items: ["Inventory monitoring", "Procurement workflows", "Asset management"] },
            { title: "Executive Management", items: ["KPI dashboards", "Automated reports", "Business performance analytics"] }
          ].map((uc, i) => (
            <div key={i} className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl">
              <strong className="text-xs text-[#0F2D63] block mb-2">{uc.title}</strong>
              <ul className="flex flex-col gap-1 text-[#5B6470]">
                {uc.items.map((it, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#E5AF2B] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Model */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR ENGAGEMENT MODEL</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            "1. Discovery Workshop", "2. Process Assessment", "3. Automation Roadmap", "4. Proof of Concept (PoC)",
            "5. Solution Development", "6. User Training", "7. Go-Live", "8. Managed Support & Optimization"
          ].map((m, i) => (
            <div key={i} className="p-3 border border-[#ECECEC] rounded-xl bg-white font-semibold text-xs text-[#1B1B1B]">
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Why Invest Verbatim */}
      <div className="border-t border-[#ECECEC] pt-8 text-[#5B6470] text-xs leading-relaxed text-left flex flex-col gap-3">
        <strong className="text-sm text-[#0F2D63]">Why Invest in Business Automation?</strong>
        <p>
          Organizations that embrace automation can achieve: Reduced operational costs, Increased employee productivity, Faster process execution, Improved customer satisfaction, Better regulatory compliance, Higher data accuracy, Enhanced visibility through real-time reporting, Scalable operations that support business growth.
        </p>
      </div>
    </div>
  );
}

// 4. Blockchain & Crypto Verbatim Content
export function BlockchainCryptoContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Hero Header Card */}
      <div className="bg-[#0F2D63] text-white p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#E5AF2B] bg-[#E5AF2B]/10 px-3 py-1 rounded-full border border-[#E5AF2B]/20 inline-block mb-4">
          Featured Solution
        </span>
        <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 text-white leading-tight">
          Blockchain & AI Solutions
        </h2>
        <p className="text-[#E5AF2B] text-sm md:text-base font-semibold mb-6">
          Your Technology Partner in Blockchain, AI, and Emerging Digital Innovation
        </p>
        <p className="text-white/85 text-xs md:text-sm leading-relaxed max-w-3xl">
          At the forefront of digital transformation, we specialize in delivering cutting-edge solutions in Blockchain, Artificial Intelligence, Web & Mobile App Development, and more. From idea to execution, we help startups and enterprises build secure, scalable, and future-ready tech products.
        </p>
      </div>

      {/* Our Vision */}
      <div className="bg-[#F8F9FC] border border-[#ECECEC] p-6 md:p-8 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌟</span>
          <h3 className="font-serif font-extrabold text-lg md:text-xl text-[#0F2D63]">Our Vision</h3>
        </div>
        <p className="text-[#5B6470] text-xs md:text-sm leading-relaxed">
          To empower businesses with intelligent, decentralized, and automated digital solutions that redefine industries and enhance user experiences.
        </p>
      </div>

      {/* Core Expertise Header */}
      <div className="flex flex-col gap-2 pt-4 border-t border-[#ECECEC]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">Our Core Expertise – At a Glance</h3>
        </div>
      </div>

      {/* 1. Blockchain & Cryptocurrency Development */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <span className="text-xl">🔗</span>
          <h4 className="font-serif font-bold text-lg text-[#1B1B1B]">
            Blockchain & Cryptocurrency Development
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "1",
              title: "Token & Coin Development",
              desc: "We design and deploy customized cryptocurrencies and tokens using Solidity and Rust on platforms like Ethereum, BSC, Polygon, and Solana. Use cases include utility tokens, security tokens, and governance tokens."
            },
            {
              num: "2",
              title: "Smart Contract Development",
              desc: "We build and audit secure, self-executing smart contracts using frameworks like Truffle and Hardhat to automate business logic, payments, or decentralized governance."
            },
            {
              num: "3",
              title: "Staking Platform Development",
              desc: "Our staking platforms allow users to lock tokens and earn rewards. We integrate features like APY calculators, liquidity pools, and validator dashboards."
            },
            {
              num: "4",
              title: "MLM Platform Development",
              desc: "We create transparent blockchain-based MLM systems with smart contract-based payout automation, multi-tier structures, and real-time tracking."
            },
            {
              num: "5",
              title: "ICO/IDO/IEO Platform Development",
              desc: "We provide complete fundraising platforms including token development, investor dashboards, KYC/AML integration, and marketing support for successful public sales."
            },
            {
              num: "6",
              title: "NFT Marketplace Development",
              desc: "We develop feature-rich NFT platforms supporting ERC-721/1155 tokens for digital art, music, real estate, gaming assets, and more with minting, trading, and wallet integration."
            },
            {
              num: "7",
              title: "Metaverse Development",
              desc: "We build immersive virtual environments for events, retail, learning, and social interaction using Web3, blockchain, and 3D technologies."
            },
            {
              num: "8",
              title: "Wallet Development",
              desc: "We design secure custodial and non-custodial wallets that support multi-chain, NFT, DeFi, and dApp interactions with private key encryption."
            },
            {
              num: "9",
              title: "dApp (Decentralized App) Development",
              desc: "We build user-centric decentralized applications across industries such as DeFi, healthcare, supply chain, and gaming that operate on blockchain infrastructure."
            },
            {
              num: "10",
              title: "Blockchain Consulting",
              desc: "From architecture design to security audits and use-case identification, we guide enterprises through their blockchain journey."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-white border border-[#ECECEC] rounded-2xl shadow-xs hover:border-[#0F2D63]/30 transition-all">
              <span className="font-mono text-xs font-bold text-[#E5AF2B] bg-[#E5AF2B]/10 px-2 py-0.5 rounded-md inline-block mb-2">
                {item.num}
              </span>
              <h5 className="font-serif font-bold text-sm text-[#0F2D63] mb-2">{item.title}</h5>
              <p className="text-xs text-[#5B6470] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. AI & Machine Learning Development */}
      <div className="flex flex-col gap-6 pt-6 border-t border-[#ECECEC]">
        <div className="flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <span className="text-xl">🤖</span>
          <h4 className="font-serif font-bold text-lg text-[#1B1B1B]">
            AI & Machine Learning Development
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "1",
              title: "AI & ML Development",
              desc: "We develop intelligent systems using TensorFlow, PyTorch, Scikit-learn, and OpenCV that enhance business automation and analytics."
            },
            {
              num: "2",
              title: "Deep Learning Solutions",
              desc: "Our team specializes in neural networks including CNNs (image processing), RNNs (sequence learning), GANs (content generation), and LSTMs (time-series forecasting)."
            },
            {
              num: "3",
              title: "Natural Language Processing (NLP)",
              desc: "We implement solutions like AI chatbots, sentiment analysis engines, text summarization, translation systems, and speech-to-text tools to improve user interaction."
            },
            {
              num: "4",
              title: "Computer Vision",
              desc: "We enable machines to interpret images through applications like facial recognition, OCR (Optical Character Recognition), object detection, and surveillance automation."
            },
            {
              num: "5",
              title: "Predictive Analytics & Data Science",
              desc: "We use big data platforms and analytics tools to deliver dashboards and insights for customer behavior, operational efficiency, and business forecasting."
            },
            {
              num: "6",
              title: "AI-Powered Blockchain Solutions",
              desc: "We enhance smart contracts and crypto systems using AI for fraud detection, market analysis, trading bots, and intelligent contract decision-making."
            },
            {
              num: "7",
              title: "AI for Web & Mobile Applications",
              desc: "We develop AI-driven UI/UX components, voice-enabled apps, AI chatbots, and personalization engines for mobile and web platforms."
            },
            {
              num: "8",
              title: "AI in Gaming",
              desc: "We apply AI for procedural content generation, player behavior prediction, and intelligent NPC (non-playable character) development, enhancing game interactivity and realism."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-white border border-[#ECECEC] rounded-2xl shadow-xs hover:border-[#0F2D63]/30 transition-all">
              <span className="font-mono text-xs font-bold text-[#E5AF2B] bg-[#E5AF2B]/10 px-2 py-0.5 rounded-md inline-block mb-2">
                {item.num}
              </span>
              <h5 className="font-serif font-bold text-sm text-[#0F2D63] mb-2">{item.title}</h5>
              <p className="text-xs text-[#5B6470] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Web & Mobile Application Development */}
      <div className="flex flex-col gap-6 pt-6 border-t border-[#ECECEC]">
        <div className="flex items-center gap-2 border-b border-[#ECECEC] pb-3">
          <span className="text-xl">💻</span>
          <h4 className="font-serif font-bold text-lg text-[#1B1B1B]">
            Web & Mobile Application Development
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "1",
              title: "Web Development",
              desc: "We build responsive, high-performance websites and web apps using HTML5, PHP, React.js, Node.js, and Laravel tailored for businesses, eCommerce, and custom portals."
            },
            {
              num: "2",
              title: "Mobile App Development",
              desc: "We develop native and cross-platform mobile apps using Kotlin, Swift, Java, Flutter, and React Native, ensuring performance, UX, and scalability across iOS and Android platforms."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-white border border-[#ECECEC] rounded-2xl shadow-xs hover:border-[#0F2D63]/30 transition-all">
              <span className="font-mono text-xs font-bold text-[#E5AF2B] bg-[#E5AF2B]/10 px-2 py-0.5 rounded-md inline-block mb-2">
                {item.num}
              </span>
              <h5 className="font-serif font-bold text-sm text-[#0F2D63] mb-2">{item.title}</h5>
              <p className="text-xs text-[#5B6470] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="flex flex-col gap-5 text-left bg-white border border-[#ECECEC] p-6 md:p-8 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🛠️</span>
          <h3 className="font-serif font-bold text-lg text-[#0F2D63]">Technology Stack</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { cat: "Blockchain Platforms", items: ["Ethereum", "Solana", "BSC", "Polygon"] },
            { cat: "Languages & Frameworks", items: ["Solidity", "Rust", "Truffle", "Hardhat"] },
            { cat: "AI/ML Tools", items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"] },
            { cat: "Web", items: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "PHP"] },
            { cat: "Mobile", items: ["Kotlin", "Swift", "Java", "Flutter", "React Native"] },
            { cat: "Data & Analytics", items: ["Python", "Power BI", "Hadoop", "SQL"] }
          ].map((st, i) => (
            <div key={i} className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl">
              <strong className="text-xs text-[#0F2D63] block mb-2">{st.cat}:</strong>
              <div className="flex flex-wrap gap-1.5">
                {st.items.map((it) => (
                  <span key={it} className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-[#1B1B1B] border border-[#ECECEC]">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="flex flex-col gap-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">Why Choose Us</h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Innovation-Focused", d: "Stay ahead with future-ready tech." },
            { t: "Expert Teams", d: "Blockchain, AI, and full-stack specialists." },
            { t: "End-to-End Delivery", d: "From consulting to deployment and maintenance." },
            { t: "Security & Scalability", d: "Enterprise-grade security & performance." },
            { t: "Business-Driven Results", d: "We align technology with your business goals." }
          ].map((item, i) => (
            <li key={i} className="p-4 bg-white border border-[#ECECEC] rounded-xl text-left hover:border-[#E5AF2B] transition-colors">
              <strong className="text-xs font-bold text-[#1B1B1B] block mb-1">{item.t}:</strong>
              <span className="text-xs text-[#5B6470]">{item.d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Partner with Us */}
      <div className="bg-[#E5AF2B]/10 border border-[#E5AF2B]/30 p-6 md:p-8 rounded-2xl flex flex-col gap-4 text-left">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤝</span>
          <strong className="text-base font-bold text-[#0F2D63] font-serif">Partner with Us</strong>
        </div>
        <p className="text-[#1B1B1B] text-xs md:text-sm leading-relaxed">
          Whether you're launching a Web3 product, building a next-gen mobile app, or leveraging AI to transform your operations — we’re your trusted development partner.
        </p>
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#E5AF2B]/20">
          <span className="text-xl">📞</span>
          <strong className="text-xs font-bold text-[#0F2D63] font-serif uppercase tracking-wider">Let's Talk</strong>
        </div>
        <p className="text-[#5B6470] text-xs">
          Connect with us today and turn your vision into a tech-powered reality.
        </p>
      </div>

      {/* Focus Portfolio */}
      <div className="flex flex-col gap-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌐</span>
          <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">Company Focus Portfolio</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "General Company Portfolio",
              desc: "Discover cutting-edge solutions in Blockchain, AI, and Digital Product Development. We specialize in token creation, smart contracts, NFT marketplaces, mobile apps, and AI-powered innovations for businesses worldwide."
            },
            {
              title: "Blockchain & Cryptocurrency Focus",
              desc: "Expert blockchain development company offering token development, smart contracts, NFT marketplaces, staking platforms, wallets, and decentralized applications built on Ethereum, BSC, Solana, and more."
            },
            {
              title: "AI & Machine Learning Focus",
              desc: "Empower your business with AI solutions including machine learning, deep learning, NLP, computer vision, and predictive analytics. We build intelligent systems for web, mobile, gaming, and blockchain applications."
            },
            {
              title: "Web & Mobile Development Focus",
              desc: "Custom web and mobile app development using React.js, Node.js, Kotlin, Swift, and Flutter. We deliver secure, scalable, and intuitive apps for businesses across industries."
            }
          ].map((port, idx) => (
            <div key={idx} className="p-5 bg-white border border-[#ECECEC] rounded-2xl flex flex-col gap-2">
              <h5 className="font-serif font-bold text-sm text-[#0F2D63] border-b border-[#ECECEC] pb-2 mb-1">
                {port.title}
              </h5>
              <p className="text-xs text-[#5B6470] leading-relaxed">{port.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. Smart Home Verbatim Content
export function SmartHomeContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Overview Paragraphs */}
      <div className="text-[#5B6470] text-sm md:text-base leading-relaxed flex flex-col gap-4">
        <p>
          At TECHNO-SOLUTIONS, we specialize in designing and installing intelligent Smart Home solutions that bring convenience, comfort, security, and energy efficiency to your home. Our advanced home automation systems allow you to control lighting, security, entertainment, appliances, and climate from anywhere using your smartphone, tablet, or voice assistant.
        </p>
        <p>
          Whether you are building a new home, renovating your existing property, or upgrading your lifestyle, our customized smart home solutions are designed to meet your unique requirements.
        </p>
        <p className="font-semibold text-[#0F2D63]">
          Why Choose Smart Home Automation? Modern homeowners are embracing smart technology to simplify daily life and improve safety. A smart home integrates multiple devices into one intelligent ecosystem, enabling seamless control and automation.
        </p>
      </div>

      {/* Benefits Verbatim */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">BENEFITS OF SMART HOME AUTOMATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            "Control your home from anywhere",
            "Enhanced home security",
            "Energy savings and lower electricity bills",
            "Greater convenience and comfort",
            "Voice-controlled smart devices",
            "Automated lighting and climate control",
            "Improved safety for family members",
            "Increased property value",
            "Real-time alerts and monitoring",
            "Personalized automation routines"
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white border border-[#ECECEC] rounded-xl">
              <Check className="w-4 h-4 text-[#E5AF2B] shrink-0" />
              <span className="font-semibold text-[#1B1B1B]">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Services Verbatim */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR SMART HOME SERVICES</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Smart Lighting Automation",
              desc: "Create the perfect ambiance while reducing energy consumption.",
              items: ["Remote lighting control", "Motion sensor lighting", "Scheduled lighting", "Mood lighting scenes", "Dimmable lighting", "Energy-efficient LED automation", "Outdoor lighting control", "Voice-controlled lighting"]
            },
            {
              title: "Smart Security Systems",
              desc: "Protect your home with advanced security technologies.",
              items: ["Smart CCTV Cameras", "Video Door Phones", "Motion Detection", "Intrusion Alarm Systems", "Smart Door Locks", "Window & Door Sensors", "Remote Security Monitoring", "Emergency Alerts", "Visitor Management"]
            },
            {
              title: "Smart Door Locks & Access Control",
              desc: "Secure your home with intelligent access solutions.",
              items: ["Fingerprint Access", "PIN Code Entry", "RFID Access", "Smartphone Unlock", "Temporary Guest Access", "Auto Lock & Unlock", "Access History", "Remote Door Control"]
            },
            {
              title: "Video Door Phone Systems",
              desc: "Know who's at your door before answering.",
              items: ["HD Video Monitoring", "Two-Way Audio Communication", "Mobile App Integration", "Visitor Recording", "Motion Alerts", "Night Vision", "Remote Door Unlock"]
            },
            {
              title: "Smart Climate Control",
              desc: "Maintain the perfect indoor environment while saving energy.",
              items: ["Smart Air Conditioner Control", "Smart Thermostats", "Smart Fans", "Automated Temperature Scheduling", "Energy Monitoring", "Remote Climate Management"]
            },
            {
              title: "Smart Entertainment Systems",
              desc: "Enjoy a connected entertainment experience throughout your home.",
              items: ["Home Theatre Installation", "Multi-Room Audio", "Smart TV Integration", "Streaming Device Setup", "Voice-Controlled Entertainment", "Universal Remote Systems"]
            },
            {
              title: "Smart Curtains & Blinds",
              desc: "Automate natural lighting with motorized window coverings.",
              items: ["Scheduled Opening & Closing", "Remote Operation", "Voice Control", "Sunlight Sensors", "Smartphone Control", "Energy Efficiency"]
            },
            {
              title: "Smart Kitchen Solutions",
              desc: "Bring intelligence into your kitchen.",
              items: ["Smart Appliances", "Smart Refrigerators", "Gas Leak Detection", "Water Leak Detection", "Smart Switches", "Energy Monitoring"]
            },
            {
              title: "Smart Energy Management",
              desc: "Optimize your home's energy usage.",
              items: ["Smart Energy Monitoring", "Smart Plugs", "Smart Switches", "Load Management", "Solar Integration", "Power Consumption Reports"]
            },
            {
              title: "Smart Home Networking",
              desc: "Reliable connectivity is the foundation of every smart home.",
              items: ["Wi-Fi Network Design", "Mesh Wi-Fi Installation", "Structured Cabling", "Router Configuration", "Network Security", "IoT Device Connectivity"]
            }
          ].map((srv, i) => (
            <div key={i} className="p-6 border border-[#ECECEC] rounded-2xl bg-[#F8F9FC] text-left">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-1">{srv.title}</h4>
              <p className="text-xs text-[#5B6470] mb-3">{srv.desc}</p>
              <ul className="grid grid-cols-2 gap-2">
                {srv.items.map((it, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#1B1B1B] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5AF2B] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Home Automation Solutions */}
      <div className="p-8 border border-[#ECECEC] bg-white rounded-3xl text-left flex flex-col gap-4">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">COMPLETE HOME AUTOMATION SOLUTIONS</h3>
        <p className="text-xs text-[#5B6470] leading-relaxed">
          We provide end-to-end automation solutions for: Villas, Independent Houses, Apartments, Luxury Homes, Farmhouses, Residential Communities, Home Offices, Holiday Homes.
        </p>
        <div className="border-t border-[#ECECEC] pt-4">
          <strong className="text-xs text-[#1B1B1B] block mb-2">Technologies We Install:</strong>
          <ul className="flex flex-col gap-2 text-xs text-[#5B6470]">
            <li><strong>Smart Devices:</strong> Smart Switches, Smart Sensors, Smart Cameras, Smart Locks, Smart Doorbells, Smart Speakers, Smart Plugs, Smart Thermostats, Smart Controllers.</li>
            <li><strong>Voice Assistants:</strong> Amazon Alexa, Google Assistant, Apple HomeKit.</li>
            <li><strong>Connectivity:</strong> Wi-Fi, Zigbee, Z-Wave, Bluetooth, Matter, Thread.</li>
          </ul>
        </div>
      </div>

      {/* Our Installation Process */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR INSTALLATION PROCESS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { n: "1. Consultation", d: "We understand your lifestyle, home layout, and automation requirements." },
            { n: "2. Site Survey", d: "Our experts assess your property and recommend suitable smart home solutions." },
            { n: "3. Solution Design", d: "We prepare a customized automation plan based on your budget and preferences." },
            { n: "4. Professional Installation", d: "Certified technicians install all devices with minimal disruption." },
            { n: "5. Configuration & Integration", d: "All smart devices are connected into a unified ecosystem and configured for seamless operation." },
            { n: "6. User Training", d: "We guide you on using your smart home system, mobile apps, and voice controls." },
            { n: "7. Maintenance & Support", d: "We provide ongoing technical support, upgrades, and maintenance services." }
          ].map((p, i) => (
            <div key={i} className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl">
              <strong className="text-xs text-[#0F2D63] block mb-1 uppercase">{p.n}</strong>
              <span className="text-xs text-[#5B6470]">{p.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal for */}
      <div className="p-6 border border-[#ECECEC] bg-white rounded-2xl text-left">
        <strong className="text-xs text-[#1B1B1B] block mb-2 font-bold uppercase">Ideal for:</strong>
        <p className="text-xs text-[#5B6470] leading-relaxed">
          New Home Construction, Home Renovation Projects, Luxury Villas, Apartments, Senior Citizen Safety, Families with Children, Vacation Homes, Home Offices, Rental Properties.
        </p>
      </div>
    </div>
  );
}

// 6. Solar Panel Verbatim Content
export function SolarPanelContent() {
  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Overview Paragraphs */}
      <div className="text-[#5B6470] text-sm md:text-base leading-relaxed flex flex-col gap-4">
        <p>
          At TECHNO-SOLUTIONS, we provide professional Solar Panel Installation Services that help homeowners, businesses, educational institutions, and industries reduce electricity costs, achieve energy independence, and contribute to a sustainable future. Our end-to-end solar solutions include consultation, system design, installation, commissioning, maintenance, and ongoing support.
        </p>
        <p>
          Whether you are looking to install a rooftop solar system for your home or a large-scale solar solution for your commercial or industrial facility, our experienced team delivers reliable, high-performance, and cost-effective solar energy systems tailored to your energy needs.
        </p>
        <p className="font-semibold text-[#0F2D63]">
          Power Your Future with Solar Energy: Solar energy is one of the most efficient and environmentally friendly ways to generate electricity. By harnessing the power of the sun, you can significantly lower your energy expenses while reducing your carbon footprint.
        </p>
      </div>

      {/* Benefits Verbatim */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">BENEFITS OF SOLAR ENERGY</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            "Lower monthly electricity bills",
            "Clean and renewable energy",
            "Reduced dependence on the power grid",
            "Long-term return on investment",
            "Increased property value",
            "Low maintenance costs",
            "Reliable energy generation",
            "Environmentally friendly solution",
            "Protection against rising electricity prices",
            "Government incentives and subsidies (where applicable)"
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white border border-[#ECECEC] rounded-xl">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-[#1B1B1B]">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Services Verbatim */}
      <div className="flex flex-col gap-5">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR SOLAR SERVICES</h3>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Residential Solar Panel Installation",
              desc: "Generate clean electricity for your home and enjoy long-term energy savings.",
              items: ["Rooftop Solar Systems", "Grid-Tied Solar Systems", "Hybrid Solar Systems", "Off-Grid Solar Systems", "Solar Battery Backup", "Solar Inverter Installation", "Energy Monitoring Systems", "Annual Maintenance Services"]
            },
            {
              title: "Commercial Solar Solutions",
              desc: "Reduce operating costs and improve sustainability for your business.",
              items: ["Lower operational costs for Office Buildings & Retails", "Enhanced corporate sustainability", "Reliable energy supply", "Reduced carbon emissions", "Improved brand image"]
            },
            {
              title: "Industrial Solar Solutions",
              desc: "Large-scale solar installations designed for manufacturing plants and industrial facilities.",
              items: ["Factory Rooftop Solar", "Ground-Mounted Solar Plants", "Captive Solar Power Systems", "Hybrid Energy Systems", "Solar Power Monitoring", "Industrial Battery Storage"]
            },
            {
              title: "Solar Water Heating Systems",
              desc: "Efficient hot water solutions for homes and commercial establishments.",
              items: ["Residential Buildings Sizing", "Hotels & Hostels Layouts", "Hospitals & Restaurants Setup", "Manufacturing Units Integration"]
            },
            {
              title: "Solar Street Lighting",
              desc: "Reliable and energy-efficient outdoor lighting solutions.",
              items: ["Residential Communities Networks", "Campus & Roads Lightings", "Parks & Parking Areas Setup", "Industrial Estates Lights"]
            },
            {
              title: "Solar Battery Storage Solutions",
              desc: "Store excess solar energy for use during evenings or power outages.",
              items: ["Lithium-Ion Battery Systems", "Hybrid Inverter Integration", "Backup Power Solutions", "Smart Battery Monitoring", "Energy Optimization"]
            },
            {
              title: "Solar System Maintenance & AMC",
              desc: "Maximize the performance and lifespan of your solar investment.",
              items: ["Preventive Maintenance", "Performance Monitoring", "Panel Cleaning", "Electrical Inspection", "Inverter Maintenance", "System Troubleshooting", "Annual Maintenance Contracts (AMC)"]
            }
          ].map((srv, i) => (
            <div key={i} className="p-6 border border-[#ECECEC] rounded-2xl bg-[#F8F9FC] text-left">
              <h4 className="font-serif font-bold text-base text-[#0F2D63] mb-1">{srv.title}</h4>
              <p className="text-xs text-[#5B6470] mb-3">{srv.desc}</p>
              <ul className="grid grid-cols-2 gap-2">
                {srv.items.map((it, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#1B1B1B] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5AF2B] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Solutions */}
      <div className="p-8 border border-[#ECECEC] bg-white rounded-3xl text-left flex flex-col gap-4">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR ROOFTOP & GRID SOLUTIONS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5B6470]">
          <div>
            <strong>Rooftop Solar Systems:</strong> Efficient rooftop installations for residential and commercial buildings.
          </div>
          <div>
            <strong>Grid-Connected Solar Systems:</strong> Generate electricity and feed surplus power back to the utility grid, subject to local regulations.
          </div>
          <div>
            <strong>Off-Grid Solar Systems:</strong> Independent solar power systems with battery storage for areas with limited or unreliable grid access.
          </div>
          <div>
            <strong>Hybrid Solar Systems:</strong> Combine grid power, solar energy, and battery storage for greater flexibility and energy resilience.
          </div>
        </div>
      </div>

      {/* Our Sizing and Installation Process */}
      <div className="flex flex-col gap-5 text-left">
        <h3 className="font-serif font-extrabold text-xl text-[#0F2D63]">OUR SOLAR INSTALLATION PROCESS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { n: "1. Free Consultation", d: "We understand your energy requirements, budget, and sustainability goals." },
            { n: "2. Site Survey", d: "Our experts assess your property's roof space, orientation, structural suitability, and energy consumption." },
            { n: "3. System Design", d: "We design a customized solar solution optimized for performance and future scalability." },
            { n: "4. Proposal & Cost Estimation", d: "Receive a transparent quotation with projected energy generation, estimated savings, and implementation timeline." },
            { n: "5. Professional Installation", d: "Certified technicians install solar panels, mounting structures, inverters, wiring, and safety systems." },
            { n: "6. Testing & Commissioning", d: "We verify system performance, conduct safety checks, and ensure compliance with applicable standards." },
            { n: "7. Monitoring & Support", d: "Ongoing maintenance, performance monitoring, and technical support to keep your system operating efficiently." }
          ].map((p, i) => (
            <div key={i} className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl">
              <strong className="text-xs text-[#0F2D63] block mb-1 uppercase">{p.n}</strong>
              <span className="text-xs text-[#5B6470]">{p.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Industries We Serve */}
      <div className="p-6 border border-[#ECECEC] bg-white rounded-2xl text-left">
        <strong className="text-xs text-[#1B1B1B] block mb-2 font-bold uppercase">Industries We Serve:</strong>
        <p className="text-xs text-[#5B6470] leading-relaxed">
          Residential Communities, Commercial Offices, Manufacturing Plants, Educational Institutions, Healthcare Facilities, Hotels & Resorts, Retail Stores, Warehouses, Government Organizations, Agricultural Farms, Religious Institutions, Housing Societies.
        </p>
      </div>
    </div>
  );
}
