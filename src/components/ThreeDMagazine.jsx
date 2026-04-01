import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const ThreeDMagazine = ({ pages, currentPage, onPageChange, language }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
  const springY = useSpring(dragY, { stiffness: 300, damping: 30 });
  
  const rotateY = useTransform(springX, [-200, 0, 200], [-45, 0, 45]);
  const rotateX = useTransform(springY, [-100, 0, 100], [15, 0, -15]);
  const opacity = useTransform(springX, [-150, 0, 150], [0.3, 1, 0.3]);
  const scale = useTransform(springX, [-200, 0, 200], [0.95, 1, 0.95]);

  const handleDragEnd = (e, info) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0 && currentPage > 0) {
        flipToPage(currentPage - 1, 'prev');
      } else if (info.offset.x < 0 && currentPage < pages.length - 1) {
        flipToPage(currentPage + 1, 'next');
      }
    }
    dragX.set(0);
    dragY.set(0);
  };

  const flipToPage = (pageIndex, direction) => {
    setIsFlipping(true);
    setFlipDirection(direction);
    setTimeout(() => {
      onPageChange(pageIndex);
      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 300);
    }, 200);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        ref={pageRef}
        className="relative w-full cursor-grab active:cursor-grabbing"
        style={{
          x: springX,
          y: springY,
          rotateY: rotateY,
          rotateX: rotateX,
          scale: scale,
          opacity: opacity,
          transformStyle: 'preserve-3d',
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        {/* Current Page */}
        <motion.div
          className="relative w-full aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: '#FCF9F2',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateY: isFlipping && flipDirection === 'next' ? -180 : 
                     isFlipping && flipDirection === 'prev' ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front Cover Image */}
          {pages[currentPage]?.image ? (
            <img
              src={pages[currentPage].image}
              alt={pages[currentPage].title?.[language]}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-terracotta/10 to-sage/10 flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-dark">
                  {pages[currentPage]?.title?.[language]}
                </h3>
                {pages[currentPage]?.company && (
                  <p className="text-terracotta text-lg">{pages[currentPage].company}</p>
                )}
                {pages[currentPage]?.period && (
                  <p className="text-dark/40 text-sm mt-2">{pages[currentPage].period}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Page Corner Fold Effect */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-white/5 to-white/10 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-bl-2xl pointer-events-none" />
          
          {/* Page Number */}
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
            {currentPage + 1} / {pages.length}
          </div>
        </motion.div>
        
        {/* Page Shadow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            opacity: 0.5,
          }}
        />
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none">
        {currentPage > 0 && (
          <motion.button
            onClick={() => flipToPage(currentPage - 1, 'prev')}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
        {currentPage < pages.length - 1 && (
          <motion.button
            onClick={() => flipToPage(currentPage + 1, 'next')}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-300 ml-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}
      </div>
      
      {/* Instruction Text */}
      <motion.p 
        className="text-center text-dark/40 text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {language === 'en' ? '← Drag to flip pages →' : '← Glissez pour tourner les pages →'}
      </motion.p>
    </div>
  );
};

export default ThreeDMagazine;