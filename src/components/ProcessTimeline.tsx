import React from "react";
import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data";
import { Search, Clipboard, Settings, Headset, ArrowRight, Check, Award } from "lucide-react";

export default function ProcessTimeline() {
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    switch (name) {
      case "Search":
        return <Search className={className} />;
      case "Clipboard":
        return <Clipboard className={className} />;
      case "Settings":
        return <Settings className={className} />;
      case "Headset":
        return <Headset className={className} />;
      case "Award":
        return <Award className={className} />;
      default:
        return <Search className={className} />;
    }
  };

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Background aesthetic line */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AF2B]/10 border border-[#E5AF2B]/20 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-center">
            <span>OUR METHODOLOGY</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
            Our Six-Step Deployment Process
          </h2>
          <p className="text-[#5B6470] text-sm">
            We follow an exhaustive development audit sequence to construct, scale, and guarantee your cloud or clean energy node integrations.
          </p>
        </div>

        {/* Timeline Graphic Layout */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden xl:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#0F2D63]/5 via-[#E5AF2B]/20 to-[#0F2D63]/5 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#F8F9FC] rounded-2xl p-6 border border-[#ECECEC] shadow-xs relative group cursor-default text-left flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-white text-[#0F2D63] border border-[#ECECEC] transition-all duration-300 group-hover:bg-[#0F2D63] group-hover:text-white group-hover:shadow-md">
                      {renderIcon(step.iconName, "w-6 h-6 text-[#0F2D63] group-hover:text-[#E5AF2B]")}
                    </div>
                    <span className="font-serif font-black text-3xl text-[#0F2D63]/10 group-hover:text-[#E5AF2B]/20 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-base text-[#1B1B1B] mb-3 group-hover:text-[#0F2D63] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#5B6470] text-xs leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Micro-Interaction Indicator */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0F2D63]/40 group-hover:text-[#E5AF2B] transition-colors mt-auto pt-4 border-t border-white">
                  <Check className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Verified Step</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
