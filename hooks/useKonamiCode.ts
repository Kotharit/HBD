import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  "j",
  "a",
  "m",
  "i",
  "l",
  "a"
];

export const useKonamiCode = (action: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // We accept any key, but we need to match the case or be case-insensitive.
      // Here we store the key as lower case to ensure "J" and "j" both work.
      const key = e.key.toLowerCase();
      const newInput = [...input, key];
      
      // Keep only the last n keys where n is the length of the Konami code
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      
      setInput(newInput);

      if (newInput.join('') === KONAMI_CODE.join('')) {
        action();
        setInput([]); // Reset after success
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, action]);
};