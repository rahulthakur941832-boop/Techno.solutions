import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { ArrowRight, LayoutGrid, CheckCircle, ExternalLink, Sparkles } from "lucide-react";

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Dashboard", "Blockchain", "Automation", "IoT", "Solar"];

  const getFilteredProjects = () => {
    if (activeFilter === "All") return PROJECTS;
    if (activeFilter === "Dashboard") return PROJECTS.filter(p => p.category.includes("Dashboard"));
    if (activeFilter === "Blockchain") return PROJECTS.filter(p => p.category.includes("Blockchain"));
    if (activeFilter === "Automation") return PROJECTS.filter(p => p.category.includes("Automation"));
    if (activeFilter === "IoT") return PROJECTS.filter(p => p.category.includes("IoT") || p.category.includes("Smart Home"));
    if (activeFilter === "Solar") return PROJECTS.filter(p => p.category.includes("Solar") || p.category.includes("Infrastructure"));
    return PROJECTS;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Absolute Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AF2B]/10 border border-[#E5AF2B]/20 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
              <span>CASE STUDIES</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
              Our Selected Technical Deployments
            </h2>
            <p className="text-[#5B6470] text-sm leading-relaxed">
              Explore our recent custom-engineered platforms, private blockchains, automated routing grids, and clean telemetry dashboards.
            </p>
          </div>

          {/* Filtering Control Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                  activeFilter === filter
                    ? "bg-[#0F2D63] text-white shadow-md shadow-blue-900/10"
                    : "bg-[#F8F9FC] text-[#5B6470] border border-[#ECECEC] hover:bg-[#0F2D63]/5 hover:text-[#0F2D63]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid with AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="bg-white rounded-[22px] overflow-hidden border border-[#ECECEC] shadow-xs group flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Photo area with hover overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D63]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-[11px] font-mono tracking-wide bg-[#E5AF2B]/90 text-slate-950 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Live Control Interface
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0F2D63] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm border border-[#ECECEC]">
                      {project.category}
                    </span>
                  </div>

                  {/* Contents */}
                  <div className="p-6 text-left">
                    <h3 className="font-serif font-bold text-lg text-[#1B1B1B] mb-3 group-hover:text-[#0F2D63] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#5B6470] text-xs leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-4 border-t border-[#F8F9FC] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#5B6470]">NODE: ACTIVE</span>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors"
                  >
                    View System Blueprint
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
