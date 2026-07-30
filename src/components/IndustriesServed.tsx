import React from "react";
import { motion } from "motion/react";
import { INDUSTRIES } from "../data";
import { 
  Stethoscope, 
  GraduationCap, 
  Factory, 
  Landmark, 
  ShoppingBag, 
  Truck, 
  Building, 
  Building2, 
  Briefcase, 
  Sparkles,
  Wifi,
  Hotel,
  Sun
} from "lucide-react";

export default function IndustriesServed() {
  const getIcon = (name: string, className: string = "w-6 h-6") => {
    switch (name) {
      case "Healthcare":
        return <Stethoscope className={className} />;
      case "Education":
        return <GraduationCap className={className} />;
      case "Manufacturing":
        return <Factory className={className} />;
      case "Banking":
        return <Landmark className={className} />;
      case "Retail":
        return <ShoppingBag className={className} />;
      case "Telecom":
        return <Wifi className={className} />;
      case "Government":
        return <Building className={className} />;
      case "Logistics":
        return <Truck className={className} />;
      case "Hospitality":
        return <Hotel className={className} />;
      case "Real Estate":
        return <Building2 className={className} />;
      case "Energy":
        return <Sun className={className} />;
      case "SMEs":
        return <Briefcase className={className} />;
      default:
        return <Briefcase className={className} />;
    }
  };

  return (
    <section id="industries" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-50/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1320px] mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5AF2B]/10 border border-[#E5AF2B]/20 text-[#0F2D63] text-xs font-bold tracking-wider uppercase self-center">
            <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
            <span>INDUSTRIES WE SERVE</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B1B1B] leading-tight">
            Industries We Serve
          </h2>
          <p className="text-[#5B6470] text-lg">
            We provide customized technology solutions for:
          </p>
        </div>

        {/* Responsive Industries Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {INDUSTRIES.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(15, 45, 99, 0.05)", borderColor: "rgba(15, 45, 99, 0.1)" }}
              className="bg-[#F8F9FC] border border-[#ECECEC] p-3.5 md:p-8 rounded-[16px] md:rounded-2xl flex flex-col gap-2.5 md:gap-4 text-left transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <div className="p-1.5 md:p-3.5 rounded-xl bg-white text-[#0F2D63] shadow-sm transition-colors duration-300 group-hover:bg-[#0F2D63] group-hover:text-white shrink-0 w-fit">
                  {getIcon(industry.name, "w-4 h-4 md:w-6 md:h-6")}
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm md:text-lg text-[#1B1B1B] group-hover:text-[#0F2D63] transition-colors leading-tight">
                  {industry.name}
                </h3>
              </div>
              <p className="text-[#5B6470] text-[10px] sm:text-xs md:text-sm leading-relaxed">
                {industry.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
