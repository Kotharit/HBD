import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import FallingElements from './components/FallingElements';
import PoemTab from './components/tabs/PoemTab';
import GalleryTab from './components/tabs/GalleryTab';
import ReasonsTab from './components/tabs/ReasonsTab';
import { useKonamiCode } from './hooks/useKonamiCode';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.I);
  
  // Easter egg trigger
  useKonamiCode(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert("❤️ Special Secret Mode Activated for Jamila! ❤️");
  });

  const renderContent = () => {
    switch (activeTab) {
      case TabType.I:
        return <PoemTab />;
      case TabType.LOVE:
        return <GalleryTab />;
      case TabType.YOU:
        return <ReasonsTab />;
      default:
        return <PoemTab />;
    }
  };

  const getBackgroundEffectType = () => {
    switch (activeTab) {
      case TabType.I:
        return 'note';
      case TabType.LOVE:
        return 'heart';
      case TabType.YOU:
        return 'mix';
      default:
        return 'mix';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-50 via-white to-romantic-100 overflow-x-hidden relative">
      {/* Background Falling Elements */}
      <FallingElements type={getBackgroundEffectType()} count={20} />

      {/* Main Music Player */}
      <MusicPlayer />

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="pt-4 md:pt-24 pb-20 md:pb-8 relative z-10 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;