import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveList = ({ language }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const collaborators = [
    "M6 PUBLICITÉ", "HAVAS MEDIA", "M6 INTERACTION", "GROUPE M",
    "MÉDIABRANDS", "PUBLICIS", "HÉROÏKS", "GROUPE NAOS",
    "LES 2 ALPES", "B&B HÔTELS", "STB TUNIS", "LA FLAMME PARIS"
  ];
  
  return (
    <div className="py-24 border-t border-[#242424]/10">
      <div className="container-custom">
        <h2 className="text-sm uppercase tracking-[0.2em] text-[#242424]/50 mb-12">
          {language === 'en' ? 'Global Collaborators' : 'Collaborateurs Mondiaux'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {collaborators.map((name, idx) => (
            <motion.div
              key={idx}
              className="relative cursor-pointer py-3 px-4 border-b border-[#242424]/10"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                x: hoveredIndex === idx ? 8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.span 
                className="text-sm font-medium"
                animate={{ color: hoveredIndex === idx ? '#dfff00' : '#242424' }}
              >
                {name}
              </motion.span>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute -top-5 left-0 text-[#dfff00] text-xs"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  ✦
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveList;