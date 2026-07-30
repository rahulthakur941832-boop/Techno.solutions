import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Play, X, Shield, Award, Users, CheckCircle2 } from "lucide-react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  const bullets = [
    "Custom Business Automation & Enterprise ERP APIs",
    "Generative AI Strategy & Agentic Automations",
    "Smart IoT Infrastructure & Smart Home Integration",
    "High-Conversion Solar Grid & Battery Storage Systems"
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden text-left">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-50/70 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2D63]/5 border border-[#0F2D63]/10 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-start">
              <Shield className="w-3.5 h-3.5 text-[#E5AF2B]" />
              <span>ABOUT TECHNO-SOLUTIONS</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
              Your Trusted Technology Partner
            </h2>

            <p className="text-[#5B6470] text-base leading-relaxed">
              Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions. We combine business consulting, automation, Artificial Intelligence, blockchain technologies, IoT, renewable energy, and smart infrastructure to deliver measurable business outcomes.
            </p>

            <p className="text-[#5B6470] text-sm italic border-l-4 border-[#E5AF2B] pl-4 py-1 bg-slate-50">
              Our mission is simple: Helping organizations become faster, smarter, and more profitable through technology.
            </p>

            {/* Bullet list with premium check circles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#E5AF2B]/10 text-[#E5AF2B] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                  <span className="text-xs text-[#1B1B1B] font-medium leading-tight">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#ECECEC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F2D63]/10 flex items-center justify-center text-[#0F2D63]">
                  <Award className="w-5 h-5 text-[#0F2D63]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B1B1B]">ISO 27001 Certified</p>
                  <p className="text-[10px] text-[#5B6470]">Security Compliant Code</p>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-[#ECECEC]" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5AF2B]/10 flex items-center justify-center text-[#E5AF2B]">
                  <Users className="w-5 h-5 text-[#0F2D63]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B1B1B]">Client-Authoritative</p>
                  <p className="text-[10px] text-[#5B6470]">Zero Vendor Lock-In</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Media Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Office Image */}
            <div className="relative rounded-[22px] overflow-hidden shadow-2xl aspect-[4/3] group border border-[#ECECEC]">
              <img
                src="https://lh3.googleusercontent.com/d/1SgWtbqvysiJKRRWRHqAinvfN8cPRc5vc"
                alt="Sanjeev Goel and Expert Consultant Collaboration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0F2D63]/20 transition-opacity duration-300 group-hover:opacity-10" />

              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white text-[#0F2D63] shadow-2xl flex items-center justify-center hover:bg-[#E5AF2B] hover:text-white transition-all group"
                  aria-label="Play commercial"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </motion.button>
              </div>

              {/* Accent Border for 3D layout */}
              <div className="absolute inset-4 rounded-[18px] border border-white/20 pointer-events-none" />
            </div>

            {/* Floating Experience Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-8 -left-8 md:bottom-6 md:-left-10 bg-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#ECECEC] max-w-xs flex items-start gap-4 text-left"
            >
              <div className="p-3 rounded-xl bg-[#E5AF2B]/10 text-[#E5AF2B] shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#E5AF2B]" />
              </div>
              <div>
                <p className="font-serif font-bold text-lg text-[#0F2D63] leading-tight">100% Client Retention</p>
                <p className="text-[11px] text-[#5B6470] mt-1">All custom-engineered nodes running at zero unexpected interruptions since 2021.</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal Player (Fully functioning mock!) */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-white hover:text-[#0F2D63] transition-all z-20"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Styled Mock Video Representation */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-left bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 bg-[#E5AF2B] rounded text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                    BLUEPRINT COMMERCIAL
                  </div>
                  <span className="text-white/60 text-xs font-mono">Length: 01:45</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-serif font-bold text-2xl md:text-4xl text-white">
                    Scaling Enterprise Performance
                  </h3>
                  <p className="text-white/80 text-sm max-w-xl">
                    See how our architectural pipeline shifts processing capacity, automates sensor data across highrises, and models green energy offsets in real-time.
                  </p>
                  
                  {/* Custom progress bar play slider */}
                  <div className="mt-4 flex items-center gap-4">
                    <button className="p-2 rounded-full bg-[#E5AF2B] text-slate-950">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="h-full bg-[#E5AF2B]" 
                      />
                    </div>
                    <span className="text-xs font-mono text-white/80">01:08 / 01:45</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
