import { useEffect } from 'react';
import Lenis from 'lenis';
import Cursor from './Cursor';

const Layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);
  
  return (
    <>
      <Cursor />
      <main className="relative">
        {children}
      </main>
    </>
  );
};

export default Layout;