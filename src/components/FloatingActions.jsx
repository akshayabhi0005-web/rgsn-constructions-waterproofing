import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll height to toggle the back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppNumber = "917022005017";
  const whatsAppMessage = encodeURIComponent("Hello R.G.S.N, I would like to request a quote or consultancy regarding construction/waterproofing services.");

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-3 items-end">
      
      {/* WhatsApp Float */}
      <motion.a
        href={`https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -left-32 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Chat on WhatsApp
        </span>
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping"></span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </motion.a>

      {/* Call Float */}
      <motion.a
        href="tel:7022005017"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-brand-orange hover:bg-brand-orange-light text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group"
        aria-label="Call RGSN"
      >
        <span className="absolute -left-24 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          Call: 7022005017
        </span>
        <Phone className="w-6 h-6 fill-current" />
      </motion.a>

      {/* Back to Top Arrow */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 bg-slate-900/80 hover:bg-slate-900 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default FloatingActions;
