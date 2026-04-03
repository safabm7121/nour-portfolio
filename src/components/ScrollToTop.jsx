import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of 'auto' for immediate scrolling
    });
    
    // Also try these methods to ensure it works
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // For any potential containers with overflow
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.scrollTop = 0;
    
    // Additional force for any motion components
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;