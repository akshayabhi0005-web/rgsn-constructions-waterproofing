import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-navy dark:bg-brand-navy-dark text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Architectural Gear / Hexagon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-24 h-24 mb-6 flex items-center justify-center"
        >
          {/* Inner Hexagon outlines */}
          <svg className="w-full h-full text-brand-orange" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon 
              points="50,5 90,25 90,75 50,95 10,75 10,25" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="10 5 15 5"
            />
            <polygon 
              points="50,18 78,32 78,68 50,82 22,68 22,32" 
              stroke="#D97706" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
          {/* Central Dot */}
          <div className="absolute w-4 h-4 bg-white rounded-full"></div>
        </motion.div>

        {/* Brand Text Reveal */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-extrabold tracking-wider mb-2 font-sans"
        >
          R.G.S.N
        </motion.h1>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          className="w-32 h-[3px] bg-brand-orange origin-left mb-2"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xs tracking-widest text-brand-gold uppercase"
        >
          CONSTRUCTIONS & WATERPROOFING
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
