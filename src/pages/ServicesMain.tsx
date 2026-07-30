import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Server, Settings, Cpu, ShieldCheck, Home, Sun, ArrowRight, Sparkles, Bot } from "lucide-react";

export default function ServicesMainPage() {
  const services = [
    {
      id: "digital-transformation",
      path: "/digital-transformation",
      title: "Digital Transformation Solutions",
      desc: "Modernize your organization with digital-first strategies, cloud adoption, and AI integration plans.",
      icon: <Server className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Strategy & Advisory",
      image: "https://lh3.googleusercontent.com/d/1Eb9lrtVuN1YDIx7ZeC-u0Nsen7QR-tv4"
    },
    {
      id: "business-automation",
      path: "/business-automation",
      title: "Business Automation Solutions",
      desc: "Automate repetitive manual processes across departments to increase productivity and reduce costs.",
      icon: <Settings className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Automation Core",
      image: "https://lh3.googleusercontent.com/d/10GF06bLKTywpp22R52W1EsH1ryhAHAc1"
    },
    {
      id: "ai-solutions",
      path: "/artificial-intelligence",
      title: "Artificial Intelligence Solutions",
      desc: "Unlock the power of neural engines, Generative AI models, and custom Agentic systems.",
      icon: <Bot className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Cognitive AI",
      image: "https://lh3.googleusercontent.com/d/1aHBor2vvoOA5re8GchzgLnkxe9E-n60z"
    },
    {
      id: "blockchain-crypto",
      path: "/blockchain-solutions",
      title: "Blockchain & Crypto Solutions",
      desc: "Secure, transparent, decentralized ledger integrations, Web3 portals, and audited smart contracts.",
      icon: <ShieldCheck className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Distributed Web3",
      image: "https://lh3.googleusercontent.com/d/1GKXj96wh-3gOlAr7ltk3ndI958XnyR9X"
    },
    {
      id: "smart-home",
      path: "/smart-home-installation-services",
      title: "Smart Home Installation",
      desc: "Transform your residential or commercial space into a secure, responsive, intelligent living environment.",
      icon: <Home className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Intelligent IoT",
      image: "https://lh3.googleusercontent.com/d/1UMvm_FBS9b0zuUhPmi51g9veaCGzlbqJ"
    },
    {
      id: "solar-energy",
      path: "/solar-panel-installation",
      title: "Solar Panel Installation",
      desc: "Reduce overhead utility expenses and transition to modern carbon-negative operations.",
      icon: <Sun className="w-6 h-6 text-[#E5AF2B]" />,
      badge: "Clean Tech",
      image: "https://lh3.googleusercontent.com/d/1F6j4zwTIDaAm7M66MobqoTYJBrk5Zbyp"
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Services Hero Section */}
      <section className="relative py-32 bg-[#06183B] text-white overflow-hidden">
        {/* Futuristic dark blue and purple digital landscape of a holographic neural network */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1ieakaI_VI6a73hTk611Porf_BF5yzMxT" 
            alt="Futuristic cyber technology network background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-20 scale-102"
          />
          {/* Glowing blue and purple ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06183B] via-[#0A224E]/90 to-[#2A0E4E]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06183B]/50 to-white" />
        </div>

        {/* High-tech subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,175,43,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,175,43,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-[#E5AF2B] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>OUR SOLUTIONS</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            Our Comprehensive Technology Solutions
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
            Techno-Solutions offers high-performance digital architectures, intelligent automation systems, and state-of-the-art clean energy integrations tailored for your operations.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-12 md:py-20 max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 15px 30px rgba(15, 45, 99, 0.06)",
                borderColor: "rgba(15, 45, 99, 0.12)"
              }}
              className="bg-white rounded-[16px] md:rounded-[24px] p-3.5 md:p-6 border border-[#ECECEC] flex flex-col justify-between transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Image header with relative badge */}
                <div className="relative w-full h-20 xs:h-24 sm:h-36 md:h-44 rounded-xl overflow-hidden mb-3 md:mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0F2D63]/20 mix-blend-multiply" />
                  <span className="absolute top-1.5 left-1.5 md:top-3 md:left-3 bg-white/90 backdrop-blur-xs text-[#0F2D63] text-[7px] md:text-[10px] font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full shadow-xs">
                    {service.badge}
                  </span>
                </div>

                {/* Service Icon and Title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-2 md:mb-4 text-left">
                  <div className="p-1.5 md:p-2.5 rounded-xl bg-[#0F2D63]/5 text-[#0F2D63] transition-colors duration-300 group-hover:bg-[#0F2D63] group-hover:text-white shrink-0 w-fit">
                    {service.icon}
                  </div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm md:text-lg text-[#1B1B1B] group-hover:text-[#0F2D63] transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Brief description */}
                <p className="text-[#5B6470] text-[10px] sm:text-xs leading-relaxed mb-3 md:mb-6 text-left">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <Link 
                to={service.path}
                className="w-full inline-flex items-center justify-between text-[10px] md:text-xs font-semibold text-[#0F2D63] group-hover:text-[#E5AF2B] transition-colors mt-auto pt-2.5 md:pt-4 border-t border-[#F8F9FC]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
