import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { REASONS_TITLE, LOVE_REASONS, VIDEO_SRC, BIRTHDAY_NAME } from '../../constants';
import { Heart } from 'lucide-react';

const ReasonsTab: React.FC = () => {
  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#ff69b4', '#fff0f5']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#ff69b4', '#fff0f5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-12 pb-24 md:pb-8">
      
      {/* SECTION 1: BIRTHDAY TITLE */}
      <motion.div 
        className="text-center py-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-romantic-400 to-romantic-600 drop-shadow-sm mb-2">
          Happy Birthday
        </h1>
        <h2 className="text-4xl md:text-6xl font-script text-romantic-500">
          {BIRTHDAY_NAME}
        </h2>
      </motion.div>

      {/* SECTION 2: VIDEO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black/5"
      >
        <div className="absolute top-0 left-0 w-full bg-black/50 p-2 text-white text-center z-10 font-serif">
          A Special Message for You
        </div>
        <video 
          src={VIDEO_SRC} 
          controls 
          className="w-full aspect-video object-cover"
          poster="https://picsum.photos/800/450?blur=2"
        >
            Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* SECTION 3: REASONS LIST */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl">
        <h3 className="text-3xl md:text-4xl font-serif text-center text-romantic-500 mb-8 underline decoration-wavy decoration-romantic-200">
          {REASONS_TITLE}
        </h3>
        <ul className="grid gap-4">
          {LOVE_REASONS.map((reason, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start md:items-center space-x-3 p-3 rounded-lg hover:bg-romantic-50 transition-colors"
            >
              <Heart className="flex-shrink-0 text-romantic-400 mt-1 md:mt-0" size={24} fill="currentColor" />
              <span className="text-lg md:text-xl font-sans text-gray-700">{reason}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="text-center pt-8">
        <p className="font-script text-2xl text-gray-400">Created with love ❤️</p>
      </div>
    </div>
  );
};

export default ReasonsTab;
