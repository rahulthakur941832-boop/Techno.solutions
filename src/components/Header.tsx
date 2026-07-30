import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, ArrowRight, ChevronDown, Sparkles, 
  Settings, Server, ShieldCheck, Home, Sun, Mail, Bot,
  ArrowLeft, Bell, Search, Wifi, Battery, LayoutGrid, BookOpen, PhoneCall
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Dynamic status bar clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hrs = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, "0");
      const ampm = hrs >= 12 ? "PM" : "AM";
      hrs = hrs % 12;
      hrs = hrs ? hrs : 12; // hour '0' should be '12'
      setCurrentTime(`${hrs}:${mins} ${ampm}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic back button and titles for app-style header
  const getMobileHeaderState = () => {
    const path = location.pathname;
    
    // Main tabs
    if (path === "/") {
      return { title: "Techno Solutions", isMainTab: true, backTo: null };
    }
    if (path === "/services" || path === "/services/") {
      return { title: "Our Solutions", isMainTab: true, backTo: null };
    }
    if (path === "/blog" || path === "/blog/") {
      return { title: "Knowledge Hub", isMainTab: true, backTo: null };
    }
    if (path === "/contact" || path === "/contact/") {
      return { title: "Contact Desk", isMainTab: true, backTo: null };
    }
    
    // Sub-pages with Back Button
    if (path === "/about") {
      return { title: "About Us", isMainTab: false, backTo: "/" };
    }
    if (path.startsWith("/blog/")) {
      return { title: "Knowledge Base", isMainTab: false, backTo: "/blog" };
    }
    
    // Services sub-pages
    const isServiceSubpage = [
      "/digital-transformation", 
      "/business-automation", 
      "/artificial-intelligence", 
      "/blockchain-solutions", 
      "/smart-home-installation-services", 
      "/solar-panel-installation"
    ].some(p => path === p) || path.startsWith("/services/");
    
    if (isServiceSubpage) {
      return { title: "Solution Detail", isMainTab: false, backTo: "/services" };
    }
    
    return { title: "Techno Solutions", isMainTab: false, backTo: "/" };
  };

  const mobileHeader = getMobileHeaderState();

  const services = [
    {
      id: "digital-transformation",
      path: "/digital-transformation",
      name: "Digital Transformation",
      desc: "Cloud migration & strategic roadmap",
      icon: <Server className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "business-automation",
      path: "/business-automation",
      name: "Business Automation",
      desc: "CRM, ERP & workflow automations",
      icon: <Settings className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "ai-solutions",
      path: "/artificial-intelligence",
      name: "AI Solutions",
      desc: "Generative AI, LLMs & Smart Agents",
      icon: <Bot className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "blockchain-crypto",
      path: "/blockchain-solutions",
      name: "Blockchain & Crypto",
      desc: "Smart contracts & consensus ledgers",
      icon: <ShieldCheck className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "smart-home",
      path: "/smart-home-installation-services",
      name: "Smart Home",
      desc: "IoT secure mesh & biometrics fitting",
      icon: <Home className="w-4 h-4 text-[#E5AF2B]" />
    },
    {
      id: "solar-energy",
      path: "/solar-panel-installation",
      name: "Solar Installation",
      desc: "Commercial rooftop & green telemetry",
      icon: <Sun className="w-4 h-4 text-[#E5AF2B]" />
    }
  ];

  const isLinkActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkColorClass = (path: string) => {
    const isActive = isLinkActive(path);
    return isActive 
      ? "text-[#0F2D63] font-bold text-[15px]" 
      : "text-[#1B1B1B] hover:text-[#0F2D63] font-medium text-[15px]";
  };

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          main {
            padding-top: 56px !important;
            padding-bottom: 64px !important;
          }
          #header-navigation {
            display: none !important;
          }
        }
      `}</style>

      {/* MOBILE APPLICATION APP SHELL HEADER (Visible ONLY on mobile/tablet below lg breakpoint) */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 flex flex-col bg-white">
        {/* Streamlined App Bar (Fixed top of screen on mobile devices) */}
        <div className="h-14 bg-white/95 backdrop-blur-md border-b border-[#ECECEC]/60 px-5 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
          {/* Left Action: Brand logo/name or Back button */}
          <div className="flex items-center">
            {!mobileHeader.isMainTab && mobileHeader.backTo ? (
              <Link 
                to={mobileHeader.backTo}
                className="flex items-center gap-1 text-xs font-bold text-[#0F2D63] py-1.5 px-3 rounded-full bg-[#0F2D63]/5 hover:bg-[#0F2D63]/10 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="https://lh3.googleusercontent.com/d/1bcaOeIYNdxuqxCd8-yPBHc5YiGUEYfRh" 
                  alt="TS Logo" 
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
            )}
          </div>

          {/* Center Action: App Title (Only on sub-pages to prevent logo overlap on home page) */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
            {!mobileHeader.isMainTab && (
              <span className="font-serif font-extrabold text-xs text-[#0F2D63] tracking-wide uppercase">
                {mobileHeader.title}
              </span>
            )}
          </div>

          {/* Right Action: Menu hamburger icon replacing bell & profile avatar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#0F2D63] bg-[#0F2D63]/5 hover:bg-[#0F2D63]/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE APPLICATION SIDE SLIDE-OUT MENU DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#06183B]/50 backdrop-blur-xs z-40"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
              className="lg:hidden fixed top-0 right-0 w-[80%] max-w-[300px] h-full bg-white shadow-2xl z-50 flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#ECECEC]/60 flex items-center justify-between">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1bcaOeIYNdxuqxCd8-yPBHc5YiGUEYfRh" 
                    alt="TS Logo" 
                    className="h-7 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-[#5B6470] bg-[#ECECEC]/40 hover:bg-[#ECECEC]/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5 text-left">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    location.pathname === "/" ? "bg-[#0F2D63]/5 text-[#0F2D63] font-bold" : "text-[#1B1B1B] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Home className="w-4 h-4 text-[#0F2D63]" />
                  <span className="text-sm">Home</span>
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    location.pathname === "/about" ? "bg-[#0F2D63]/5 text-[#0F2D63] font-bold" : "text-[#1B1B1B] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Bot className="w-4 h-4 text-[#0F2D63]" />
                  <span className="text-sm">About Us</span>
                </Link>

                {/* Services Accordion Trigger */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-[#1B1B1B] hover:bg-slate-50 font-medium text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutGrid className="w-4 h-4 text-[#E5AF2B]" />
                      <span>Our Solutions</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform text-[#5B6470] ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-9 flex flex-col gap-1 overflow-hidden"
                      >
                        {services.map((srv) => (
                          <Link
                            key={srv.id}
                            to={srv.path}
                            onClick={() => setIsOpen(false)}
                            className={`p-1.5 rounded-lg text-xs transition-colors block text-left ${
                              location.pathname === srv.path ? "text-[#0F2D63] font-bold bg-[#0F2D63]/5" : "text-[#5B6470] hover:text-[#0F2D63]"
                            }`}
                          >
                            {srv.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    location.pathname.startsWith("/blog") ? "bg-[#0F2D63]/5 text-[#0F2D63] font-bold" : "text-[#1B1B1B] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#0F2D63]" />
                  <span className="text-sm">Knowledge Hub</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    location.pathname === "/contact" ? "bg-[#0F2D63]/5 text-[#0F2D63] font-bold" : "text-[#1B1B1B] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <PhoneCall className="w-4 h-4 text-[#0F2D63]" />
                  <span className="text-sm">Contact Desk</span>
                </Link>
              </div>

              {/* Drawer Footer Consultation CTA */}
              <div className="p-4 border-t border-[#ECECEC]/60 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#0F2D63] text-white text-center font-bold text-xs shadow-md shadow-[#0F2D63]/10 hover:bg-[#1a448c] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="text-[9px] text-center text-[#5B6470] leading-snug">
                  Designed & Developed with ❤️ by <br />
                  <span className="text-[#E5AF2B] font-bold">Clickin DMA by Rahul Singh</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE APP PERSISTENT BOTTOM TAB BAR (Sticky Navigation) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#ECECEC]/70 flex items-center justify-around px-3 pb-safe shadow-[0_-4px_25px_rgba(0,0,0,0.05)] z-50">
        {/* Tab 1: Home */}
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center gap-1 w-16 py-1 transition-all ${
            location.pathname === "/" ? "text-[#0F2D63] scale-105" : "text-[#5B6470] hover:text-[#0F2D63]"
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${location.pathname === "/" ? "stroke-[2.5px] text-[#0F2D63]" : "stroke-[2px]"}`} />
          <span className={`text-[9px] font-bold tracking-tight ${location.pathname === "/" ? "text-[#0F2D63]" : "text-[#5B6470]"}`}>Home</span>
          {location.pathname === "/" && <span className="w-1 h-1 rounded-full bg-[#E5AF2B] -mt-0.5" />}
        </Link>

        {/* Tab 2: Solutions */}
        <Link 
          to="/services" 
          className={`flex flex-col items-center justify-center gap-1 w-16 py-1 transition-all ${
            location.pathname.startsWith("/services") || [
              "/digital-transformation", 
              "/business-automation", 
              "/artificial-intelligence", 
              "/blockchain-solutions", 
              "/smart-home-installation-services", 
              "/solar-panel-installation"
            ].includes(location.pathname) ? "text-[#0F2D63] scale-105" : "text-[#5B6470] hover:text-[#0F2D63]"
          }`}
        >
          <LayoutGrid className={`w-5 h-5 transition-transform ${
            location.pathname.startsWith("/services") || [
              "/digital-transformation", 
              "/business-automation", 
              "/artificial-intelligence", 
              "/blockchain-solutions", 
              "/smart-home-installation-services", 
              "/solar-panel-installation"
            ].includes(location.pathname) ? "stroke-[2.5px] text-[#0F2D63]" : "stroke-[2px]"
          }`} />
          <span className={`text-[9px] font-bold tracking-tight ${
            location.pathname.startsWith("/services") || [
              "/digital-transformation", 
              "/business-automation", 
              "/artificial-intelligence", 
              "/blockchain-solutions", 
              "/smart-home-installation-services", 
              "/solar-panel-installation"
            ].includes(location.pathname) ? "text-[#0F2D63]" : "text-[#5B6470]"
          }`}>Solutions</span>
          {(location.pathname.startsWith("/services") || [
            "/digital-transformation", 
            "/business-automation", 
            "/artificial-intelligence", 
            "/blockchain-solutions", 
            "/smart-home-installation-services", 
            "/solar-panel-installation"
          ].includes(location.pathname)) && <span className="w-1 h-1 rounded-full bg-[#E5AF2B] -mt-0.5" />}
        </Link>

        {/* Tab 3: Blog */}
        <Link 
          to="/blog" 
          className={`flex flex-col items-center justify-center gap-1 w-16 py-1 transition-all ${
            location.pathname.startsWith("/blog") ? "text-[#0F2D63] scale-105" : "text-[#5B6470] hover:text-[#0F2D63]"
          }`}
        >
          <BookOpen className={`w-5 h-5 transition-transform ${location.pathname.startsWith("/blog") ? "stroke-[2.5px] text-[#0F2D63]" : "stroke-[2px]"}`} />
          <span className={`text-[9px] font-bold tracking-tight ${location.pathname.startsWith("/blog") ? "text-[#0F2D63]" : "text-[#5B6470]"}`}>Knowledge</span>
          {location.pathname.startsWith("/blog") && <span className="w-1 h-1 rounded-full bg-[#E5AF2B] -mt-0.5" />}
        </Link>

        {/* Tab 4: Contact */}
        <Link 
          to="/contact" 
          className={`flex flex-col items-center justify-center gap-1 w-16 py-1 transition-all ${
            location.pathname === "/contact" ? "text-[#0F2D63] scale-105" : "text-[#5B6470] hover:text-[#0F2D63]"
          }`}
        >
          <PhoneCall className={`w-5 h-5 transition-transform ${location.pathname === "/contact" ? "stroke-[2.5px] text-[#0F2D63]" : "stroke-[2px]"}`} />
          <span className={`text-[9px] font-bold tracking-tight ${location.pathname === "/contact" ? "text-[#0F2D63]" : "text-[#5B6470]"}`}>Contact</span>
          {location.pathname === "/contact" && <span className="w-1 h-1 rounded-full bg-[#E5AF2B] -mt-0.5" />}
        </Link>
      </div>

      {/* DESKTOP HEADER NAVIGATION (Visible ONLY on lg screen size and above) */}
      <motion.header
        id="header-navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-[#ECECEC]/60 py-2.5" 
            : "bg-white border-b border-[#ECECEC]/75 py-4"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
          {/* Logo - transparent background, dynamic size, completely clean */}
          <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02] active:scale-98">
            <img 
              src="https://lh3.googleusercontent.com/d/1bcaOeIYNdxuqxCd8-yPBHc5YiGUEYfRh" 
              alt="Techno Solutions Logo" 
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-11 md:h-12" : "h-14 md:h-16"
              }`}
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {/* Home Link */}
            <Link
              to="/"
              className={`py-1 transition-colors duration-200 ${getLinkColorClass("/")}`}
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className={`py-1 transition-colors duration-200 ${getLinkColorClass("/about")}`}
            >
              About Us
            </Link>

            {/* Services Dropdown Trigger */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 font-semibold text-[15px] text-[#E5AF2B] hover:text-[#d49f24] py-1 transition-colors duration-200 focus:outline-hidden cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-[#E5AF2B] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Dropdown Card */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[450px] bg-white border border-[#ECECEC] shadow-xl rounded-2xl p-4 grid grid-cols-2 gap-2 text-left z-50"
                  >
                    <div className="col-span-2 px-3 pb-2 border-b border-[#F8F9FC] flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-[#5B6470] uppercase tracking-wider font-mono">Our Solutions</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#E5AF2B]" />
                    </div>
                    {services.map((srv) => (
                      <Link
                        key={srv.id}
                        to={srv.path}
                        className="p-2.5 rounded-xl hover:bg-[#F8F9FC] border border-transparent hover:border-[#ECECEC]/30 transition-all flex items-start gap-3 group/item"
                      >
                        <div className="p-2 rounded-lg bg-[#0F2D63]/5 text-[#0F2D63] group-hover/item:bg-[#0F2D63] group-hover/item:text-white transition-all">
                          {srv.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1B1B1B] group-hover/item:text-[#0F2D63] transition-colors leading-tight">
                            {srv.name}
                          </span>
                          <span className="text-[10px] text-[#5B6470] mt-0.5 leading-tight">
                            {srv.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Link */}
            <Link
              to="/blog"
              className={`py-1 transition-colors duration-200 ${getLinkColorClass("/blog")}`}
            >
              Blog
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`py-1 transition-colors duration-200 ${getLinkColorClass("/contact")}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F2D63] text-white font-bold text-[15px] transition-all duration-300 hover:bg-[#1a448c] hover:shadow-lg hover:shadow-blue-950/15 active:scale-95 group"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
}
