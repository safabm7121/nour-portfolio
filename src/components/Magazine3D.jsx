import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Magazine3D = ({ pages, currentPage, onPageChange, language }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const containerRef = useRef(null);
  const pageX = useMotionValue(0);
  const springX = useSpring(pageX, { stiffness: 300, damping: 30 });
  const rotateY = useTransform(springX, [-200, 0, 200], [-30, 0, 30]);
  const opacity = useTransform(springX, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    pageX.set(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const finalX = pageX.get();
    if (Math.abs(finalX) > 100) {
      if (finalX > 0 && currentPage > 0) {
        onPageChange(currentPage - 1);
      } else if (finalX < 0 && currentPage < pages.length - 1) {
        onPageChange(currentPage + 1);
      }
    }
    pageX.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative w-full aspect-[3/4] cursor-pointer"
        style={{
          x: springX,
          rotateY: rotateY,
          opacity: opacity,
          transformStyle: 'preserve-3d',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Front Cover */}
        <div
          className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {pages[currentPage]?.image ? (
            <img
              src={pages[currentPage].image}
              alt={pages[currentPage].title?.[language]}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta/20 to-sage/20 flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  {pages[currentPage]?.title?.[language]}
                </h2>
                <p className="text-dark/60">{pages[currentPage]?.company}</p>
                <p className="text-dark/40 text-sm mt-2">{pages[currentPage]?.period}</p>
              </div>
            </div>
          )}
          
          {/* Page number indicator */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            {currentPage + 1} / {pages.length}
          </div>
        </div>
        
        {/* Page curl effect */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent via-white/10 to-white/20 rounded-tr-2xl pointer-events-none"
          style={{
            boxShadow: '-4px 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </motion.div>
      
      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none">
        {currentPage > 0 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300"
          >
            ←
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300 ml-auto"
          >
            →
          </button>
        )}
      </div>
      
      {/* Instruction text */}
      <p className="text-center text-dark/40 text-sm mt-8">
        {language === 'en' ? 'Click and drag to flip pages' : 'Cliquez et faites glisser pour tourner les pages'}
      </p>
    </div>
  );
};

export default Magazine3D;