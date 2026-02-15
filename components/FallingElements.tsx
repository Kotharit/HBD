import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart, Star } from 'lucide-react';
import { FallingItem } from '../types';

interface FallingElementsProps {
  type: 'note' | 'heart' | 'mix';
  count?: number;
}

const FallingElements: React.FC<FallingElementsProps> = ({ type, count = 15 }) => {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    const newItems: FallingItem[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      type: type === 'mix' ? (Math.random() > 0.5 ? 'heart' : 'note') : type,
    }));
    setItems(newItems);
  }, [type, count]);

  const getIcon = (itemType: string) => {
    if (itemType === 'note') return <Music className="text-romantic-400 opacity-60" fill="currentColor" />;
    return <Heart className="text-romantic-300 opacity-60" fill="currentColor" />;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={`${type}-${item.id}`}
            initial={{ y: -50, x: `${item.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '105vh',
              opacity: [0, 1, 1, 0],
              rotate: item.rotation + 360,
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute cursor-pointer pointer-events-auto"
            style={{ scale: item.scale }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              // Create a mini burst effect or just log interaction
              // In a more complex app, we could spawn particles here
            }}
          >
            {getIcon(item.type)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingElements;
