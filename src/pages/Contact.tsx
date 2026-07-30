import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck, UserCheck, Sparkles, Building2, User, ChevronDown } from "lucide-react";
import { addContactSubmission } from "../utils/adminStorage";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterested: "Digital Transformation Solutions",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Validation Error: Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Save locally to persistent storage with validation read-back check
      addContactSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.serviceInterested,
        message: formData.message,
      });

      // 2. Send to backend server endpoint
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            serviceInterested: formData.serviceInterested,
            message: formData.message,
          }),
        });
      } catch (backendErr) {
        console.warn("Backend email dispatch notice (saved locally):", backendErr);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact form submission error:", err);
      setErrorMessage(err?.message || "Failed to validate and save submission.");
    } finally {
      setLoading(false);
    }
  };

  const servicesList = [
    "Digital Transformation Solutions",
    "Business Automation Solutions",
    "Artificial Intelligence Solutions",
    "Blockchain & Crypto Solutions",
    "Smart Home Installation",
    "Solar Panel Installation",
    "General / Other Inquiry"
  ];

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Contact Page Header */}
      <section className="relative py-24 bg-gradient-to-br from-[#06183B] via-[#0A224E] to-[#113069] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-10 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVERY DESK</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Get In Touch With Us
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mt-2">
            Let's discuss your project parameters. Get a custom technology audit, solution blueprinting session, or quick project estimate.
          </p>
        </div>
      </section>

      {/* Main Form and details grid */}
      <section className="py-20 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: contact information cards */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#0F2D63] tracking-widest uppercase">CONTACT DETAILS</span>
              <h2 className="font-serif text-3xl font-bold text-[#1B1B1B] leading-tight">
                Our Office Information
              </h2>
              <p className="text-[#5B6470] text-sm leading-relaxed">
                Connect directly with our team of elite technology architects. We plan, engineer, and deploy future-proof solutions optimized to your financial constraints.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="flex flex-col gap-5">
              {/* Office Address */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <MapPin className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Address</h4>
                  <p className="text-sm font-semibold text-[#1B1B1B] mt-1 leading-relaxed">
                    218 AGCR Enclave,<br />
                    Near Karkardoma Metro Station,<br />
                    Delhi 110092
                  </p>
                </div>
              </div>

              {/* Call Number */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <Phone className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Phone</h4>
                  <a href="tel:+919811841782" className="text-base font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors block mt-0.5">
                    +91 9811841782
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#ECECEC] flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-white text-[#0F2D63] border border-[#ECECEC]">
                  <Mail className="w-5 h-5 text-[#E5AF2B]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider">Email</h4>
                  <a href="mailto:mail@techno-solutions.tech" className="text-base font-bold text-[#0F2D63] hover:text-[#E5AF2B] transition-colors block mt-0.5">
                    mail@techno-solutions.tech
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Assurance Badges */}
            <div className="p-6 rounded-2xl border border-dashed border-[#ECECEC] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B1B1B]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Response SLA Guarantee</span>
              </div>
              <p className="text-xs text-[#5B6470] leading-relaxed">
                All requests are prioritized and routed directly to active consultants. Expect a comprehensive callback or full system proposal outline within 24 working hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form container */}
          <div className="lg:col-span-7 bg-white border border-[#ECECEC] rounded-[32px] p-8 md:p-10 shadow-xs text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif font-bold text-2xl text-[#1B1B1B]">Request Free Technology Blueprint</h3>
                    <p className="text-xs text-[#5B6470]">
                      Specify your operational objectives and we will engineer a custom implementation proposal.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Phone *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98118 41782"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all"
                      />
                    </div>

                    {/* Service Interested In Selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Service Interested In</label>
                      <div className="relative">
                        <select
                          value={formData.serviceInterested}
                          onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all appearance-none cursor-pointer text-slate-800 font-medium"
                        >
                          {servicesList.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Specify details about your technical problems, your scope, desired goals, and any timelines..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#ECECEC] text-sm focus:outline-hidden focus:border-[#0F2D63] focus:ring-1 focus:ring-[#0F2D63] transition-all resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#0F2D63] text-white font-bold text-sm transition-all duration-300 hover:bg-[#1a448c] active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer group hover:shadow-lg hover:shadow-blue-900/10"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="w-4 h-4 text-[#E5AF2B] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10 gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <CheckCircle className="w-10 h-10 stroke-[2px]" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-2xl text-[#0F2D63]">Inquiry Submitted Successfully</h3>
                    <p className="text-sm text-[#5B6470] max-w-sm leading-relaxed">
                      Thank you <span className="font-bold text-[#1b1b1b]">{formData.name}</span>. Your technology consultation request is safe with us. We will contact you shortly.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F9FC] border border-[#ECECEC] rounded-2xl text-left w-full text-xs font-mono flex flex-col gap-1.5 text-slate-600">
                    <p><strong>SENDER:</strong> {formData.email}</p>
                    <p><strong>SERVICE:</strong> {formData.serviceInterested}</p>
                    <p><strong>ROUTING_KEY:</strong> mail@techno-solutions.tech</p>
                    <p><strong>DISPATCH_SLA:</strong> response_within_24_hours</p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", serviceInterested: "Digital Transformation Solutions", message: "" });
                    }}
                    className="px-6 py-3 rounded-xl border border-[#ECECEC] text-[#0F2D63] text-xs font-semibold hover:bg-[#F8F9FC] transition-colors"
                  >
                    Submit New Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Google Map Embed Section */}
      <section className="w-full h-[450px] border-t border-[#ECECEC] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.4429983758364!2d77.291771!3d28.6465492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5cd79fa60b%3A0xe5faf4f89fb3dfa8!2sAGCR%20Enclave%2C%20Anand%20Vihar%2C%20Delhi%2C%20110092!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Techno-Solutions Location Map"
        />
      </section>
    </div>
  );
}
