import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const WorkGrid = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  const [forceShow, setForceShow] = useState(false);
  const location = useLocation();
  
  // Force re-animate when coming back from project detail
  useEffect(() => {
    if (location.state?.fromProject) {
      setForceShow(true);
      setTimeout(() => setForceShow(false), 100);
    }
  }, [location]);
  
  useEffect(() => {
    const checkMobile = () => {
      // Changed from 768 to 1024 to include iPads and tablets
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const experiences = [
    {
      id: 1,
      title: { en: "Offer Optimization Manager", fr: "Chargée de l'optimisation de l'offre" },
      company: "M6 Publicité",
      period: "Juin 2025 - Août 2025",
      image: "https://media.lesechos.com/api/v1/images/view/617826853e45460c046d8e26/1280x720/070198636623-web-tete.jpg",
    },
    {
      id: 2,
      title: { en: "Radio Planning Manager", fr: "Chargée de Planning - RADIO" },
      company: "M6 Publicité",
      period: "Nov 2024 - Avr 2025",
      image: "https://www.cbnews.fr/sites/cbnews.fr/files/styles/panoramic_w1200/public/images/m6pub-218143.jpg?itok=KwJv-OD8",
    },
    {
      id: 3,
      title: { en: "Media Assistant", fr: "Assistante chargée média" },
      company: "Havas Media",
      period: "Fév 2024 - Août 2024",
      image: "https://www.jggroup.com/sites/default/files/slide/7havas.jpg",
    },
    {
      id: 4,
      title: { en: "Junior Trader", fr: "Trader Junior" },
      company: "STB Tunis",
      period: "Juil 2021 - Août 2021",
      image: "https://kapitalis.com/tunisie/wp-content/uploads/2023/01/STB-Bank.jpg",
    },
  ];
  
  return (
    <section id="work" className="py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={(inView || forceShow) ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-header">
            {language === 'en' ? 'Selected Work' : 'Travaux'}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {experiences.map((exp, idx) => (
            <MobileColorReveal
              key={exp.id}
              exp={exp}
              language={language}
              idx={idx}
              inView={inView || forceShow}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component that handles mobile color reveal without breaking desktop hover
const MobileColorReveal = ({ exp, language, idx, inView, isMobile }) => {
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    setRevealed(false);
  }, [exp.id]);
  
  useEffect(() => {
    if (!isMobile) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile, revealed]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className="project-card"
    >
      <Link to={`/project/${exp.id}`} state={{ fromProject: true }}>
        <div className="relative overflow-hidden mb-4 bg-[#f5f5f5] rounded-xl">
          <img
            src={exp.image}
            alt={exp.title[language]}
            className="project-image"
            style={{
              filter: isMobile && revealed ? 'grayscale(0%)' : undefined,
            }}
          />
        </div>
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="project-title">
              {exp.title[language]}
            </h3>
            <p className="text-sm text-[#1a1a1a]/50 mt-1">{exp.company}</p>
          </div>
          <span className="text-xs text-[#1a1a1a]/40">{exp.period}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default WorkGrid;