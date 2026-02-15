import React from 'react';
import { motion } from 'framer-motion';
import { PHOTOS } from '../../constants';

const LETTERS = ['I', 'L', 'O', 'V', 'E', 'Y', 'O', 'U'];

const GalleryTab: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 min-h-[80vh]">
      <motion.h2 
        className="text-4xl md:text-5xl font-serif text-center text-romantic-500 mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Our Moments
      </motion.h2>

      {/* Responsive Masonry Layout */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 px-2"
      >
        {PHOTOS.map((photo, index) => {
          const letter = LETTERS[index % LETTERS.length];
          
          return (
            <motion.div
              key={photo.id}
              variants={item}
              className="break-inside-avoid mb-6"
            >
              <div className="group perspective-[1000px]">
                {/* Flip Container */}
                <div className="relative w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* Front Face (Photo) */}
                  <div className="bg-white p-3 pb-5 rounded-[2px] shadow-md cursor-default relative overflow-hidden [backface-visibility:hidden]">
                    
                    {/* Image Container */}
                    <div className="overflow-hidden relative border-[0.5px] border-gray-100">
                      <img 
                        src={photo.src} 
                        alt={photo.caption}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Caption Section */}
                    <div className="mt-4 px-2 flex flex-col items-center">
                      <p className="font-serif italic text-sm text-gray-500 text-center tracking-wide">
                        {photo.caption}
                      </p>
                      <div className="h-[1px] bg-romantic-300 w-1/3 mt-2 opacity-60" />
                    </div>
                  </div>

                  {/* Back Face (Letter) */}
                  <div className="absolute inset-0 bg-romantic-50 p-4 rounded-[2px] shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center border-4 double border-romantic-200">
                    <div className="absolute inset-2 border border-romantic-100 rounded-sm"></div>
                    <span className="font-script text-8xl md:text-9xl text-romantic-400 drop-shadow-sm select-none">
                      {letter}
                    </span>
                    <span className="mt-4 text-2xl animate-bounce-slow">❤️</span>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Spacer for bottom navigation visibility on mobile */}
      <div className="h-24 md:h-12"></div>
    </div>
  );
};

export default GalleryTab;