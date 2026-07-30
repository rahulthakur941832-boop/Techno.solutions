import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919811841782";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello!%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more.`;

  // Handle the recurring gentle popup behavior
  useEffect(() => {
    // Initial delay before first popup
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    // Loop to keep popping up gently every 15 seconds if closed
    const interval = setInterval(() => {
      setIsOpen((prev) => {
        if (!prev) {
          return true;
        }
        return prev;
      });
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans" id="whatsapp-widget-container">
      {/* Gentle professional pop-up notification */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="bg-white text-[#1B1B1B] p-4 rounded-2xl shadow-xl border border-[#ECECEC] max-w-[260px] relative text-left"
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Content info */}
            <div className="flex gap-3 items-start">
              {/* Animated waving avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#E8F8F0] flex items-center justify-center text-lg border border-[#25D366]/20 shadow-inner">
                  💬
                </div>
                {/* Waving hand floating status */}
                <motion.span
                  animate={{
                    rotate: [0, 14, -8, 14, -4, 10, 0, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute -bottom-1 -right-1 text-base select-none leading-none inline-block origin-[70%_70%]"
                >
                  👋
                </motion.span>
              </div>

              <div className="flex flex-col gap-1 pr-4">
                <span className="text-xs font-bold text-[#0F2D63]">Techno-Solutions</span>
                <span className="text-[11px] text-gray-500 font-medium">WhatsApp Agent</span>
                <p className="text-xs text-gray-700 font-medium mt-1 leading-normal">
                  How may I help you?
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-3 flex justify-end">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all hover:shadow-md"
              >
                Chat Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(false)}
        className="relative group w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/10"
        id="whatsapp-fab-button"
        title="Chat with us on WhatsApp"
      >
        {/* Animated outer waves for attention */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/45 animate-ping -z-10 pointer-events-none opacity-75" />

        {/* WhatsApp Vector Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.386 9.805-9.782.002-2.614-1.012-5.071-2.859-6.92C16.32 2.055 13.865 1.04 11.251 1.04c-5.409 0-9.81 4.398-9.812 9.793-.001 1.93.502 3.81 1.454 5.416l-.993 3.628 3.715-.973zm11.532-6.52c-.299-.15-1.77-.874-2.043-.974-.275-.1-.475-.15-.675.15-.2.3-.775.974-.95 1.174-.175.2-.35.225-.65.075-1.127-.565-1.922-1.03-2.684-2.338-.2-.345-.02-.531.15-.681.153-.135.299-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.624-.925-2.225-.244-.589-.493-.51-.675-.52l-.574-.01c-.2 0-.525.075-.8 1.05-.275 1.2-1.4 1.15-1.4 2.1 0 .6.225 1.175.325 1.35.1.15 2.15 3.284 5.207 4.6 1.196.515 1.838.647 2.457.535.69-.125 1.77-.724 2.02-1.424.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
        </svg>

        {/* Floating waving hand tooltip indicator on hover */}
        <span className="absolute right-16 bg-[#0F2D63] text-[#E5AF2B] font-semibold text-xs py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#E5AF2B]/20">
          Chat with us! 👋
        </span>
      </motion.a>
    </div>
  );
}
