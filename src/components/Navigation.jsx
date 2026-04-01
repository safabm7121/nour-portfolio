import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ language, setLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const navItems = [
    { en: 'Work', fr: 'Travail', path: '/' },
    { en: 'About', fr: 'À propos', path: '/about' },
    { en: 'Contact', fr: 'Contact', path: '/contact' },
  ];
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-6 flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo - Blue only on mobile, dark gray on desktop */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-xl md:text-2xl font-medium tracking-tight transition-colors text-[#0066ff] md:text-[#1a1a1a] hover:text-[#0066ff]"
            >
              NB
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <span className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                  {language === 'en' ? item.en : item.fr}
                </span>
              </Link>
            ))}
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="nav-link"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            
            <a
              href="/resume-nour-ben-miled.pdf"
              download
              className="btn-primary"
            >
              CV
            </a>
          </div>
          
          {/* Mobile Menu Button - Blue */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 hover:bg-[#0066ff]/10 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-[#0066ff] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-[#0066ff] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-[#0066ff] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Overlay - Full screen with blue links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
            style={{ top: '72px' }}
          >
            <div className="flex flex-col items-start justify-start gap-6 p-8 pt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium tracking-tight hover:text-[#0066ff]/80 transition-colors text-[#0066ff]"
                >
                  {language === 'en' ? item.en : item.fr}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  setLanguage(language === 'en' ? 'fr' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-medium tracking-tight hover:text-[#0066ff]/80 transition-colors text-[#0066ff]"
              >
                {language === 'en' ? 'FR' : 'EN'}
              </button>
              
              <a
                href="/resume-nour-ben-miled.pdf"
                download
                className="btn-primary mt-4 inline-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;