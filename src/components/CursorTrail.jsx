import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = ({ 
  trailWords = ["RADIO", "PLANNING", "MEDIA", "M6", "HAVAS", "✦", "TV", "OPTIMIZE", "AUDIENCE", "CAMPAIGN"],
  fadeDuration = 600,
  maxTrailLength = 12
}) => {
  const [trail, setTrail] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lastUpdateRef = useRef(Date.now());

  // Color palette inspired by Studio Dialect - soft, sophisticated colors
  const colorPalette = [
    '#E07A5F', // terracotta
    '#87A96B', // sage
    '#6C9EBF', // muted teal
    '#BC6C25', // clay
    '#D4A5A5', // dusty rose
    '#9B9B7A', // olive
    '#C17B7B', // rosewood
    '#7D9D8C', // seafoam
  ];

  const getRandomWord = () => {
    return trailWords[Math.floor(Math.random() * trailWords.length)];
  };

  const getRandomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add new trail word on movement
      if (now - lastUpdateRef.current > 40) {
        lastUpdateRef.current = now;
        
        const newWord = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          word: getRandomWord(),
          color: getRandomColor(),
          createdAt: now,
          yOffset: 0,
        };
        
        setTrail(prev => [newWord, ...prev].slice(0, maxTrailLength));
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [maxTrailLength]);

  // Animate trail particles floating upward
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.map(word => ({
        ...word,
        yOffset: word.yOffset - 2,
      })).filter(word => {
        const age = Date.now() - word.createdAt;
        return age < fadeDuration;
      }));
    }, 30);
    
    return () => clearInterval(interval);
  }, [fadeDuration]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Custom cursor dot with glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-terracotta/60 blur-sm" />
          <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-terracotta" />
        </div>
      </motion.div>
      
      {/* Trail words floating upward */}
      <AnimatePresence>
        {trail.map((word) => (
          <motion.div
            key={word.id}
            className="fixed pointer-events-none z-[99]"
            initial={{ opacity: 0.9, scale: 0.6 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: word.x,
              y: word.y + word.yOffset,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span
              className="text-sm md:text-base font-medium whitespace-nowrap tracking-wide"
              style={{
                color: word.color,
                textShadow: '0 0 8px rgba(0,0,0,0.1)',
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
              }}
            >
              {word.word}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorTrail;