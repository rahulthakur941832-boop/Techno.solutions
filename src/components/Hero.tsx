import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Settings, Server, ShieldCheck, Home, Sun, Bot } from "lucide-react";

export default function Hero() {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const sliderServices = [
    { name: "Digital Transformation", icon: <Server className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
    { name: "Business Automation", icon: <Settings className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
    { name: "Robotic AI Solutions", icon: <Bot className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
    { name: "Blockchain & Crypto", icon: <ShieldCheck className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
    { name: "Smart Home Mesh", icon: <Home className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
    { name: "Solar Power Grid", icon: <Sun className="w-3.5 h-3.5 text-[#E5AF2B]" /> },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-36 pb-20 flex items-center bg-[#06183B] text-white overflow-hidden">
      {/* Dynamic Marquee & Text Masking Styles */}
      <style>{`
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 30s linear infinite;
        }
        .animate-slide-right {
          animation: slide-right 30s linear infinite;
        }
        @keyframes animate-background {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .hero-masked-heading {
          background-image: linear-gradient(
            to right,
            #ffffff 0%,
            #E5AF2B 25%,
            #60A5FA 50%,
            #E5AF2B 75%,
            #ffffff 100%
          );
          background-size: 200% auto;
          background-position: 0% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: animate-background 6s infinite alternate linear;
          display: block;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(1.02); }
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>

      {/* Futuristic dark blue and purple digital landscape of a holographic neural network */}
      <div className="absolute inset-0 z-0 bg-[#06183B] w-full overflow-hidden pointer-events-none">
        <img 
          src="https://lh3.googleusercontent.com/d/1ieakaI_VI6a73hTk611Porf_BF5yzMxT" 
          alt="Hero Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 scale-102 animate-pulse-slow block"
        />
        {/* Deep navy, purple, and gold ambient light overlay to keep text 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06183B]/40 via-[#06183B]/75 to-[#06183B] pointer-events-none" />
      </div>

      {/* Decorative Glowing Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl z-0 pointer-events-none" />
      
      {/* High-tech subtle cybergrid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left-Side Contents */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          {/* Subtle Accent Gold Sparkle Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/12 text-xs text-[#E5AF2B] font-semibold tracking-wider font-mono uppercase">
              <span>TRANSFORM YOUR BUSINESS</span>
            </div>
          </motion.div>

          {/* Majestic Hero Primary Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-[54px] font-extrabold leading-[1.12] tracking-tight hero-masked-heading"
          >
            Transform Your Business with Intelligent Digital Solutions
          </motion.h1>

          {/* Subheadline / Core Solutions */}
          <motion.h2 
            variants={itemVariants}
            className="font-sans text-lg sm:text-xl text-[#E5AF2B] font-semibold tracking-wide"
          >
            Digital Transformation | Business Automation | AI | Blockchain | Solar | Smart Homes
          </motion.h2>

          {/* Primary Text */}
          <motion.p 
            variants={itemVariants}
            className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl font-sans"
          >
            At Techno-Solutions, we help businesses modernize, automate, and grow using cutting-edge technologies. Whether you are a startup, SME, enterprise, educational institution, or government organization, we deliver innovative solutions that improve efficiency, reduce costs, and accelerate digital transformation.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-[#E5AF2B] text-[#06183B] font-bold text-base transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/15 active:scale-97 text-center flex items-center justify-center gap-2 group"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 text-[#06183B] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl bg-white/5 text-white border border-white/15 font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-97 text-center flex items-center justify-center gap-2"
            >
              Explore Our Services
            </a>
          </motion.div>

          {/* Brand/Trust Section */}
          <motion.div 
            variants={itemVariants}
            className="pt-6 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <span className="text-[10px] text-white/50 font-semibold tracking-wider uppercase font-mono">TRUSTED BY LEADING BRANDS:</span>
            <div className="flex flex-wrap items-center gap-6 text-white/40 font-bold font-serif text-xs">
              <span className="hover:text-white transition-colors">VORTEX CORP</span>
              <span className="hover:text-white transition-colors">APEX LOGICS</span>
              <span className="hover:text-white transition-colors">INNOVA SMART</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right-Side Column: Image + Robotic Slider */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative w-full max-w-[460px] aspect-square"
          >
            {/* Glowing Center Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#E5AF2B]/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Premium Animated Glass Card Wrapping the Image */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-2 rounded-3xl bg-white/5 backdrop-blur-md border border-white/15 p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex items-center justify-center group"
            >
              {/* Inner Glossy Light Glow Effect */}
              <div className="absolute -inset-x-20 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent -rotate-12 transform pointer-events-none group-hover:translate-y-full transition-transform duration-1000" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <img 
                  src="https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z" 
                  alt="Intelligent Deep Learning Systems (Neural AI)" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06183B]/80 via-transparent to-transparent pointer-events-none" />

                {/* Micro Tech HUD Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#E5AF2B]/20 text-[#E5AF2B]">
                      <Bot className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-white/50 font-mono">SYSTEM METRICS</p>
                      <p className="font-serif font-bold text-[11px] text-white">Robotic Neural Core</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#E5AF2B] font-semibold bg-[#E5AF2B]/10 px-2 py-0.5 rounded border border-[#E5AF2B]/20 animate-pulse">
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 1 */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -top-4 left-6 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-[#E5AF2B]/15 text-[#E5AF2B]">
                <Settings className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">AUTOMATE</p>
                <p className="text-[11px] font-bold text-white">Workflows</p>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 2 */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-28 -right-4 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">SECURITY</p>
                <p className="text-[11px] font-bold text-white">Smart Nodes</p>
              </div>
            </motion.div>

            {/* Mini Floating Tech Icon Accent 3 */}
            <motion.div
              animate={{ y: [0, 6, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 -left-4 p-2.5 rounded-xl bg-[#0A224E]/90 border border-white/12 shadow-lg flex items-center gap-2.5 backdrop-blur-sm pointer-events-none"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-left pr-1.5">
                <p className="text-[9px] text-white/50 font-bold font-mono">ENERGY</p>
                <p className="text-[11px] font-bold text-white">Solar Grid</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Elegant Scrolling Services Slider (Right side under the image) */}
          <div className="mt-14 w-full max-w-[460px] bg-[#0A224E]/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl text-left overflow-hidden">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] text-white/60 font-semibold tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Bot className="w-3 h-3 text-[#E5AF2B]" />
                CAPABILITIES TICKER
              </span>
              
              {/* Direction Controls */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setSlideDirection('right')}
                  className={`px-2 py-0.5 rounded-md transition-all text-[10px] font-semibold font-mono ${
                    slideDirection === 'right' 
                      ? 'bg-[#E5AF2B] text-[#06183B] shadow-sm font-bold' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Slide Left to Right"
                >
                  L → R
                </button>
                <button
                  onClick={() => setSlideDirection('left')}
                  className={`px-2 py-0.5 rounded-md transition-all text-[10px] font-semibold font-mono ${
                    slideDirection === 'left' 
                      ? 'bg-[#E5AF2B] text-[#06183B] shadow-sm font-bold' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Slide Right to Left"
                >
                  R ← L
                </button>
              </div>
            </div>

            {/* Slider Viewport with smooth slow marquee */}
            <div className="relative w-full overflow-hidden rounded-xl bg-black/30 py-3 border border-white/5">
              {/* Fade Edges */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#06183B] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#06183B] to-transparent z-10 pointer-events-none" />
              
              <div 
                className={`flex gap-3.5 whitespace-nowrap ${
                  slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                }`}
                style={{ width: 'max-content' }}
              >
                {/* Triple the list to enable seamless infinite scroll looping */}
                {[...sliderServices, ...sliderServices, ...sliderServices].map((srv, idx) => (
                  <div 
                    key={idx} 
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  >
                    {srv.icon}
                    <span className="text-[11px] font-bold text-white font-sans tracking-wide">{srv.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
