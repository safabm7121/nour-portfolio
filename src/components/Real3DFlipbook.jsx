import React, { useEffect, useRef } from 'react';

// Add this to your index.html or install the library via npm
// For this example, we'll use a CDN approach
const Real3DFlipbook = ({ pdfUrl, width = '100%', height = '600px' }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Load Real3D Flipbook script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/real3d-flipbook@latest/dist/real3d-flipbook.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Real3DFlipbook && containerRef.current) {
        new window.Real3DFlipbook(containerRef.current, {
          pdf: pdfUrl,
          mode: 'real3d',
          backgroundColor: '#d2d2d2',
          toolbarColor: '#242424',
          toolbarTextColor: '#d2d2d2',
          pageColor: '#ffffff',
          pageShadow: true,
          lightColor: '#dfff00',
          lightIntensity: 0.5,
          pageFlipSound: true,
          pageFlipSpeed: 0.8,
          zoom: true,
          download: false,
          share: false,
          fullscreen: true,
          thumbnails: true,
        });
      }
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [pdfUrl]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full rounded-lg shadow-xl"
      style={{ width, height, backgroundColor: '#d2d2d2' }}
    />
  );
};

export default Real3DFlipbook;