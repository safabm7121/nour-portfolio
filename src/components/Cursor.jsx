import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [trail, setTrail] = useState([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { damping: 20, stiffness: 400 });
  const cursorYSpring = useSpring(cursorY, { damping: 20, stiffness: 400 });
  
  const trailWords = ["RADIO", "PLANNING", "MEDIA", "M6", "HAVAS", "TV", "AUDIENCE", "CAMPAIGN"];
  
  // Check if device is desktop (not mobile)
  useEffect(() => {
    const checkDevice = () => {
      const isDesktopDevice = window.innerWidth >= 768 && !('ontouchstart' in window);
      setIsDesktop(isDesktopDevice);
      
      // Reset cursor style for mobile
      if (!isDesktopDevice) {
        document.body.style.cursor = 'auto';
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  useEffect(() => {
    if (!isDesktop) return;
    
    let lastTime = 0;
    const interval = 60;
    
    const moveCursor = (e) => {
      const now = Date.now();
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (now - lastTime > interval) {
        const randomWord = trailWords[Math.floor(Math.random() * trailWords.length)];
        setTrail(prev => [...prev.slice(-12), { 
          x: e.clientX, y: e.clientY, word: randomWord, id: now, opacity: 0.5
        }]);
        lastTime = now;
      }
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isDesktop, cursorX, cursorY]);
  
  useEffect(() => {
    if (!isDesktop) return;
    
    const interval = setInterval(() => {
      setTrail(prev => prev.map(p => ({ ...p, opacity: p.opacity - 0.02 })).filter(p => p.opacity > 0));
    }, 40);
    return () => clearInterval(interval);
  }, [isDesktop]);
  
  // Don't render anything on mobile
  if (!isDesktop) return null;
  
  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        /* Make sure cursor stays above everything */
        .cursor-dot {
          z-index: 9999 !important;
        }
        .cursor-trail {
          z-index: 9998 !important;
        }
      `}</style>
      
      {/* Main cursor dot - highest z-index */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none rounded-full bg-[#0066ff] cursor-dot"
        style={{ x: cursorXSpring, y: cursorYSpring, zIndex: 9999 }}
      />
      
      {/* Trail words - lower opacity */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none cursor-trail"
          style={{ 
            left: point.x, 
            top: point.y, 
            opacity: point.opacity, 
            transform: 'translate(-50%, -50%)', 
            whiteSpace: 'nowrap',
            zIndex: 9998
          }}
          initial={{ scale: 0.7, y: 0 }}
          animate={{ scale: 1, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          <span className="text-[#0066ff]/60 text-[9px] tracking-wider font-mono font-medium">
            {point.word}
          </span>
        </motion.div>
      ))}
    </>
  );
};

export default Cursor;