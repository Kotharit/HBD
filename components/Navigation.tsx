import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: TabType.I, label: "I" },
    { id: TabType.LOVE, label: "LOVE" },
    { id: TabType.YOU, label: "YOU" },
  ];

  return (
    <nav className="fixed bottom-0 md:bottom-auto md:top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-lg border-t md:border-t-0 md:border-b border-romantic-200">
      <div className="max-w-4xl mx-auto flex justify-center items-center h-16 md:h-20">
        <div className="flex space-x-2 md:space-x-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-6 md:px-12 py-2 md:py-3 rounded-full text-lg md:text-xl font-serif tracking-widest transition-all duration-300
                  ${isActive 
                    ? 'text-romantic-500 font-bold bg-romantic-100 shadow-inner' 
                    : 'text-gray-500 hover:text-romantic-400 hover:bg-romantic-50 hover:-translate-y-0.5'
                  }
                `}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-romantic-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
