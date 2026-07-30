import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { STATS } from "../data";
import { Briefcase, Users, Award, Headset } from "lucide-react";

// CountUp Component for premium statistical animation
function CountUpValue({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1.5; // seconds
    const end = value;
    const increment = end / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
      {count}
      <span className="text-[#E5AF2B] font-sans">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  const renderIcon = (name: string, customClass?: string) => {
    const classStyle = customClass || "w-7 h-7 text-[#E5AF2B]";
    switch (name) {
      case "Briefcase":
        return <Briefcase className={classStyle} />;
      case "Users":
        return <Users className={classStyle} />;
      case "Award":
        return <Award className={classStyle} />;
      case "Headset":
        return <Headset className={classStyle} />;
      default:
        return <Briefcase className={classStyle} />;
    }
  };

  return (
    <section className="bg-[#0F2D63] py-8 md:py-20 relative overflow-hidden">
      {/* Visual Accents in Dark Background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/40 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      {/* Dashed alignment lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex flex-col items-center text-center pt-6 sm:pt-0 first:pt-0 px-4 sm:px-8"
            >
              {/* Gold Icon with circular border */}
              <div className="mb-2 md:mb-5 p-1.5 xs:p-2.5 md:p-4 rounded-full bg-white/5 border border-white/10 hover:border-[#E5AF2B]/40 hover:bg-white/10 transition-all duration-300">
                {renderIcon(stat.iconName, "w-4 h-4 xs:w-5 h-5 md:w-7 md:h-7 text-[#E5AF2B]")}
              </div>

              {/* Statistical Value */}
              <div className="flex items-baseline justify-center">
                <span className="font-serif text-sm xs:text-lg sm:text-2xl md:text-5xl font-bold text-white tracking-tight">
                  <CountUpValue value={stat.count} suffix="" />
                  <span className="text-[#E5AF2B] font-sans text-xs xs:text-sm sm:text-base md:text-4xl ml-0.5">{stat.suffix}</span>
                </span>
              </div>

              {/* Label */}
              <p className="text-white/70 text-[7px] xs:text-[9px] sm:text-xs md:text-sm font-bold tracking-wide uppercase mt-1 md:mt-2 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
