import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ language, setLanguage }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { en: 'Work', fr: 'Travail', path: '/' },
    { en: 'About', fr: 'À propos', path: '/about' },
    { en: 'Contact', fr: 'Contact', path: '/contact' },
  ];
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-6 flex items-center justify-between">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-xl font-medium tracking-tight hover:text-[#0066ff] transition-colors text-[#1a1a1a]"
          >
            NB
          </motion.div>
        </Link>
        
        <div className="flex items-center gap-8">
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
      </div>
    </motion.nav>
  );
};

export default Navigation;