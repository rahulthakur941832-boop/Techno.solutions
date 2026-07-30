import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      {/* Decorative BG Accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-50/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2D63]/5 border border-[#0F2D63]/10 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-center">
            <MessageSquare className="w-3.5 h-3.5 text-[#E5AF2B]" />
            <span>CLIENT ASSURANCES</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
            Trusted by Leaders of Industry
          </h2>
          <p className="text-[#5B6470] text-sm">
            Read case-proven feedback from directors of global logistics, commercial builders, and clean energy developers.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative bg-white rounded-3xl p-8 md:p-14 border border-[#ECECEC] shadow-md">
          {/* Quote icon banner background */}
          <div className="absolute top-8 right-8 text-[#0F2D63]/5 select-none pointer-events-none">
            <Quote className="w-24 h-24 stroke-[4px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
            >
              {/* Photo Side */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#E5AF2B] shadow-lg mb-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1b1b1b]">{current.name}</h3>
                <p className="text-[#5B6470] text-xs font-semibold">{current.role}</p>
                <p className="text-[#0F2D63] text-[10px] font-bold mt-1 uppercase tracking-wider bg-[#0F2D63]/5 px-2.5 py-0.5 rounded-full inline-block">
                  {current.company}
                </p>
              </div>

              {/* Quote Side */}
              <div className="md:col-span-8 flex flex-col justify-center">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E5AF2B] text-[#E5AF2B]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif italic text-[#1B1B1B] text-lg md:text-xl leading-relaxed mb-6">
                  "{current.quote}"
                </p>

                {/* Badge indicator */}
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-max flex items-center gap-1.5 font-bold uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Testimonial
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#F8F9FC]">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-[#ECECEC] text-[#0F2D63] hover:bg-[#0F2D63] hover:text-white hover:border-[#0F2D63] transition-all active:scale-90"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#5B6470]">
              {activeIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-[#ECECEC] text-[#0F2D63] hover:bg-[#0F2D63] hover:text-white hover:border-[#0F2D63] transition-all active:scale-90"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
