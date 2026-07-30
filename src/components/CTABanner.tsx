import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, ArrowRight, Lock, Mail, ChevronDown } from "lucide-react";

export default function CTABanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "digital-transformation",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message || "Consultation requested via CTABanner form.",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error("CTA submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Double-layered card layout (Blue and Gold accent border) */}
        <div className="relative rounded-[32px] bg-[#0F2D63] text-white p-8 md:p-16 overflow-hidden shadow-2xl border-4 border-double border-[#E5AF2B]/40">
          
          {/* Subtle gold circles in background */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E5AF2B]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-blue-900/40 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 text-left flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#E5AF2B] text-xs font-bold tracking-wider uppercase self-start">
                <Send className="w-3.5 h-3.5 animate-bounce" />
                <span>FREE CONSULTATION</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                Ready to Digitally Transform Your Business?
              </h2>

              <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                Whether you need business automation, AI implementation, blockchain consulting, smart home installation, or solar solutions, our experts are ready to help.
              </p>

              {/* Secure certifications */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 border-t border-white/10 text-white/50 text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#E5AF2B]" />
                  <span>256-bit Secure Layer Transmission</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E5AF2B]" />
                  <span>Direct SLA Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Column */}
            <div className="lg:col-span-6 relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 text-[#1b1b1b] shadow-xl flex flex-col gap-4 text-left border border-[#ECECEC]"
                  >
                    <h3 className="font-serif font-bold text-lg text-[#0F2D63] mb-2">Request System Blueprint</h3>
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#5B6470] tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Business Email */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#5B6470] tracking-wider">Business Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@enterprise.com"
                        className="px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Target Service Selector */}
                    <div className="flex flex-col gap-1 relative">
                      <label className="text-[10px] uppercase font-bold text-[#5B6470] tracking-wider">Primary Service Node</label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all appearance-none cursor-pointer"
                        >
                          <option value="digital-transformation">Digital Transformation Solutions</option>
                          <option value="business-automation">Business Automation Solutions</option>
                          <option value="ai-solutions">Artificial Intelligence Solutions</option>
                          <option value="blockchain-crypto">Blockchain & Crypto Solutions</option>
                          <option value="smart-home">Smart Home Installation</option>
                          <option value="solar-energy">Solar Panel Installation</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6470] pointer-events-none" />
                      </div>
                    </div>

                    {/* Scope Message */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#5B6470] tracking-wider">Project Scope (Optional)</label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail any system parameters or hardware volume constraints..."
                        className="px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 w-full px-6 py-4 rounded-xl bg-[#0F2D63] text-white font-semibold text-sm transition-all duration-300 hover:bg-[#1a448c] disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 group active:scale-95"
                    >
                      {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Schedule a Free Consultation
                          <ArrowRight className="w-4 h-4 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl p-8 text-[#1b1b1b] shadow-xl border border-[#ECECEC] text-center flex flex-col items-center justify-center gap-5 min-h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                      <CheckCircle className="w-8 h-8 stroke-[2px]" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#0F2D63]">Inquiry Submitted</h3>
                    <p className="text-sm text-[#5B6470] max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-[#1b1b1b]">{formData.name}</span>. Your request has been successfully processed and submitted to our consultants.
                    </p>
                    <div className="p-3 bg-[#F8F9FC] border border-[#ECECEC] rounded-xl text-left w-full text-xs font-mono flex flex-col gap-1 text-slate-600">
                      <p><strong>RECIPIENT:</strong> mail@techno-solutions.tech</p>
                      <p><strong>ENCRYPT:</strong> AES-256 SECURE SHIELD</p>
                      <p><strong>SLA:</strong> response_within_24_hours</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", service: "digital-transformation", message: "" });
                      }}
                      className="px-6 py-2.5 rounded-xl border border-[#ECECEC] text-[#0F2D63] text-xs font-semibold hover:bg-[#F8F9FC] transition-colors"
                    >
                      Submit New Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
