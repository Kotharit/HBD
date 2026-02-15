import React, { useEffect, useRef, useState } from 'react';
import { MUSIC_SRC, BACKGROUND_MUSIC_VOLUME } from '../constants';
import { Music, Pause, Play } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = BACKGROUND_MUSIC_VOLUME;
    }
    
    // Attempt auto-play
    const tryPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay blocked, waiting for interaction", err);
          setIsPlaying(false);
        }
      }
    };

    tryPlay();

    // Add global click listener to start music if autoplay failed
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} src={MUSIC_SRC} loop />
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-2 border-romantic-200 text-romantic-500 hover:bg-romantic-100 transition-all hover:scale-110"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-romantic-500 font-bold whitespace-nowrap">
        {isPlaying ? "Playing 🎵" : "Paused"}
      </div>
    </div>
  );
};

export default MusicPlayer;
