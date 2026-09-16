import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).replace('-', ' ').toUpperCase() || 'PAGE';

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#fbfaf8] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif uppercase tracking-wider">{pageName}</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 font-sans">
          This section is currently under construction. Please provide the content for this page!
        </p>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </motion.div>
    </div>
  );
}
