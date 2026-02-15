import React from 'react';
import { motion } from 'framer-motion';
import { POEM_TITLE, POEM_CONTENT } from '../../constants';

const PoemTab: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-white/50"
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-script text-romantic-500 mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {POEM_TITLE}
        </motion.h2>
        
        <div className="space-y-6 font-script text-2xl md:text-3xl text-romantic-900 leading-relaxed">
          {POEM_CONTENT.split('\n').map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className={line.trim() === '' ? 'h-4' : ''}
            >
              {line}
            </motion.p>
          ))}
        </div>
        
        <motion.div 
          className="mt-8 text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌹
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PoemTab;
