import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const location = useLocation();
  const rawPath = location.pathname.substring(1).replace(/-/g, ' ').replace(/\//g, ' / ');
  const pageName = rawPath.toUpperCase() || 'PAGE';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbfaf8] text-black text-center px-4 overflow-hidden relative">
      {/* Subtle background glow */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-black/5 rounded-full blur-[80px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl"
      >
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="text-[10px] md:text-xs font-bold text-gray-400 mb-6 uppercase"
          style={{ letterSpacing: '0.2em' }}
        >
          {pageName}
        </motion.p>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-serif uppercase tracking-tight flex flex-col items-center" style={{ lineHeight: '1.1' }}>
          <span className="block overflow-hidden pb-1 text-[#1a1a1a]">
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              COMING
            </motion.span>
          </span>
          <span className="block overflow-hidden italic text-gray-500 font-light mt-[-10px] md:mt-[-20px]">
            <motion.span 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              SOON
            </motion.span>
          </span>
        </h1>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          className="w-12 h-[1px] bg-black/20 mx-auto my-8 origin-center"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-sm md:text-base text-gray-500 max-w-sm mx-auto leading-relaxed"
        >
          We are currently crafting this experience. Check back shortly as we prepare to launch this section.
        </motion.p>
      </motion.div>
    </div>
  );
}
