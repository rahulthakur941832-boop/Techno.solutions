import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECHNOLOGIES, WHY_CHOOSE_US } from "../data";
import { Bot, Terminal, Cloud, Settings, Check, Sparkles } from "lucide-react";

export default function TechnologiesStack() {
  const [activeCategory, setActiveCategory] = useState(0);

  const icons = [
    <Bot className="w-5 h-5" />,
    <Terminal className="w-5 h-5" />,
    <Cloud className="w-5 h-5" />,
    <Settings className="w-5 h-5 text-[#0F2D63]" />
  ];

  return (
    <section id="technologies" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Double-column section structure: Left is Why Choose Us, Right is Tech Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Why Choose Us */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2D63]/5 border border-[#0F2D63]/10 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
              <span>WHY CHOOSE TECHNO-SOLUTIONS</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B1B1B] leading-tight">
              Why Choose Techno-Solutions?
            </h2>
            
            <p className="text-[#5B6470] text-sm md:text-base leading-relaxed">
              We engineer secure and stable platforms built to match your operational boundaries perfectly. Our focus is long-term business performance and cost reduction.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-2">
              {WHY_CHOOSE_US.map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl border border-[#ECECEC]">
                  <div className="w-5 h-5 rounded-full bg-[#E5AF2B]/10 text-[#E5AF2B] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1B1B1B]">{item.title}</h4>
                    <p className="text-xs text-[#5B6470] mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Tech Stack Hub */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left bg-white p-8 rounded-[24px] border border-[#ECECEC] shadow-sm">
            <div>
              <span className="text-xs font-bold text-[#0F2D63] tracking-wider uppercase">TECH ENGINE</span>
              <h3 className="font-serif font-bold text-2xl text-[#1B1B1B] mt-1">Our Technology Stack</h3>
              <p className="text-xs text-[#5B6470] mt-2">
                We stay on the absolute cutting edge, deploying verified codebases, robust secure networks, and sustainable renewable energy grids.
              </p>
            </div>

            {/* Interactive Tab Headers */}
            <div className="flex flex-wrap gap-2 border-b border-[#ECECEC] pb-4">
              {TECHNOLOGIES.map((tech, idx) => (
                <button
                  key={tech.category}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === idx
                      ? "bg-[#0F2D63] text-white shadow-md shadow-blue-900/10"
                      : "bg-[#F8F9FC] text-[#5B6470] border border-[#ECECEC] hover:bg-slate-50"
                  }`}
                >
                  <span className={activeCategory === idx ? "text-[#E5AF2B]" : "text-[#5B6470]"}>
                    {icons[idx]}
                  </span>
                  {tech.category}
                </button>
              ))}
            </div>

            {/* Tab Panel Content */}
            <div className="min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {TECHNOLOGIES[activeCategory].items.map((item, index) => (
                    <div 
                      key={item} 
                      className="flex items-center gap-3 bg-[#F8F9FC] border border-[#ECECEC] p-4 rounded-xl group hover:border-[#0F2D63]/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0F2D63]/5 text-[#0F2D63] font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm font-semibold text-[#1B1B1B] group-hover:text-[#0F2D63] transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Indicator */}
            <div className="pt-4 border-t border-[#ECECEC] text-[11px] text-[#5B6470] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All technologies optimized according to security compliances, clean code architectures, and direct CRM/ERP integrations.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
