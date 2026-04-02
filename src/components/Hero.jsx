import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, Suspense } from 'react';
import Lanyard3D from './Lanyard3D';

const Hero = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const content = {
    en: {
      name: "Nour Ben Miled",
      title: "Radio Planning Manager",
      description: "Double expertise TV & Radio | M6 Publicité & Havas Media",
      cta: "View Work",
    },
    fr: {
      name: "Nour Ben Miled",
      title: "Chargée planning radio",
      description: "Double expertise TV & Radio | M6 Publicité & Havas Media",
      cta: "Voir le travail",
    },
  };
  
  const c = content[language];
  
  return (
    <section className="min-h-screen flex items-center bg-white pt-24 md:pt-0">
      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-[#0066ff]">
                {language === 'en' ? 'Media Professional' : 'Professionnelle Média'}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-4 text-[#1a1a1a]"
            >
              {c.name}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-[#1a1a1a]/60 mb-6"
            >
              {c.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg text-[#1a1a1a]/50 max-w-md mb-10"
            >
              {c.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <a href="#work" className="btn-primary">
                {c.cta}
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right Column - 3D Lanyard Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-[450px] md:h-[550px] lg:h-[650px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5] rounded-2xl">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#0066ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[#1a1a1a]/60 text-sm">Loading 3D Card...</p>
                </div>
              </div>
            }>
              <Lanyard3D 
                position={[0, 0, isMobile ? 25 : 20]} 
                gravity={[0, -40, 0]} 
              />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;