import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [trail, setTrail] = useState([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 400 });
  const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 400 });
  
  const trailWords = ["RADIO", "PLANNING", "MEDIA", "M6", "HAVAS", "TV", "AUDIENCE", "CAMPAIGN"];
  
  useEffect(() => {
    let lastTime = 0;
    const interval = 60;
    
    const moveCursor = (e) => {
      const now = Date.now();
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (now - lastTime > interval) {
        const randomWord = trailWords[Math.floor(Math.random() * trailWords.length)];
        setTrail(prev => [...prev.slice(-15), { 
          x: e.clientX, y: e.clientY, word: randomWord, id: now, opacity: 0.85
        }]);
        lastTime = now;
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.map(p => ({ ...p, opacity: p.opacity - 0.02 })).filter(p => p.opacity > 0));
    }, 40);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-50 rounded-full bg-[#0066ff]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-40"
          style={{ left: point.x, top: point.y, opacity: point.opacity, transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap' }}
          initial={{ scale: 0.7, y: 0 }}
          animate={{ scale: 1, y: -12 }}
          transition={{ duration: 0.1 }}
        >
          <span className="text-[#0066ff]/80 text-[10px] tracking-wider font-mono font-medium">{point.word}</span>
        </motion.div>
      ))}
    </>
  );
};

export default Cursor;