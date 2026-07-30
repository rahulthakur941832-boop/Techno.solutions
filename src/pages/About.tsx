import React from "react";
import { motion } from "motion/react";
import { Shield, Target, Eye, Award, Clock, Users, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import ProcessTimeline from "../components/ProcessTimeline";
import TechnologiesStack from "../components/TechnologiesStack";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>ABOUT TECHNO-SOLUTIONS</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Your Trusted Technology Partner
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
            Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions.
          </p>
        </div>
      </section>

      {/* Core Company Intro & Mission / Vision */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: text */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2D63]/5 border border-[#0F2D63]/10 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-start">
              <span>OUR STORY & PROFILE</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B1B1B] leading-tight">
              Empowering Success with High-Performance Tech
            </h2>
            <p className="text-[#5B6470] text-base md:text-lg leading-relaxed">
              Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions.
            </p>
            <p className="text-[#5B6470] text-base leading-relaxed">
              We combine business consulting, automation, Artificial Intelligence, blockchain technologies, IoT, renewable energy, and smart infrastructure to deliver measurable business outcomes.
            </p>
          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F2D63]/5 to-[#0F2D63]/10 border border-[#0F2D63]/10 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5AF2B]/5 rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl bg-[#0F2D63] text-white flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#E5AF2B]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#0F2D63] mb-2">Our Mission</h3>
              <p className="text-[#3B4450] text-base leading-relaxed font-medium">
                Helping organizations become faster, smarter, and more profitable through technology.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#06183B] to-[#041029] text-white text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
              <div className="w-12 h-12 rounded-xl bg-[#E5AF2B] text-[#06183B] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#E5AF2B] mb-2">Our Vision</h3>
              <p className="text-white/80 text-base leading-relaxed font-medium">
                To become a trusted global provider of intelligent business automation solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Technologies We Use (Combined Interactive Stack) */}
      <TechnologiesStack />

      {/* Our Process Section */}
      <ProcessTimeline />

      {/* Leadership & Corporate Hub Section */}
      <section className="py-20 bg-white border-t border-[#ECECEC]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#0F2D63] tracking-wider uppercase">OUR LEADERSHIP</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
              Guided by Industry Veterans
            </h2>
            <p className="text-[#5B6470] text-base">
              Our steering committee and technology architects bring decades of combined industrial experience to your operations.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#ECECEC] p-8 shadow-sm text-center flex flex-col items-center gap-6 group hover:shadow-md transition-all">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0F2D63]/10 group-hover:border-[#E5AF2B]/40 transition-all duration-300 bg-slate-50">
              <img 
                src="https://lh3.googleusercontent.com/d/1um71-j8a4UUlpBz_7R0HMzOgkCuXB4Un" 
                alt="Sanjeev Goel" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-serif font-bold text-2xl text-[#1B1B1B]">Sanjeev Goel</h3>
              <p className="text-sm font-semibold text-[#0F2D63] uppercase tracking-wider">Founder & Chief Consultant</p>
              <p className="text-xs text-[#5B6470] mt-2 max-w-sm">
                Sanjeev Goel guides digital strategies, renewable solar designs, and enterprise systems implementation across regional branches.
              </p>
            </div>

            <div className="w-full pt-6 border-t border-[#ECECEC] grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <MapPin className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <Phone className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>+91 9811841782</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#5B6470]">
                <Mail className="w-4 h-4 text-[#E5AF2B] shrink-0" />
                <span>mail@techno-solutions.tech</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
