import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

// Import HAVAS images and video
import HAVAS from '../assets/images/HAVAS.JPEG';
import havas1 from '../assets/images/havas1.JPEG';
import videohavas from '../assets/video/videohavas.MOV';

const ProjectDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const videoRef = useRef(null);
  
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
  const opacity = useTransform(springX, [-200, 0, 200], [0, 1, 0]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  
  // Enable scrolling on body when component mounts
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);
  
  // Autoplay video when it comes into view
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(e => console.log('Autoplay prevented:', e));
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    
    observer.observe(videoElement);
    
    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, [project]);
  
  useEffect(() => {
    const projects = {
      1: {
        title: { en: "Offer Optimization Manager", fr: "Chargée de l'optimisation de l'offre" },
        company: "M6 Publicité",
        period: "Juin 2025 - Août 2025",
        description: {
          en: "Full management and optimization of advertising screen grid for PTNT (W9 and 6TER). Audience analysis and advertising screen pricing.",
          fr: "Gestion complète et optimisation de la grille des écrans publicitaires pour PTNT (W9 et 6TER). Analyses des audiences et tarification des écrans publicitaires."
        },
        images: [
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200",
        ]
      },
      2: {
        title: { en: "Radio Planning Manager", fr: "Chargée de Planning - RADIO" },
        company: "M6 Publicité",
        period: "Nov 2024 - Avr 2025",
        description: {
          en: "Sales, booking and daily optimization of advertising screens based on antenna grids. Campaign report development.",
          fr: "Vente, réservation et optimisation quotidienne des écrans publicitaires en fonction des grilles des antennes. Elaboration des bilans de campagnes."
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1200",
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
        ]
      },
      3: {
        title: { en: "Media Assistant", fr: "Assistante chargée média" },
        company: "Havas Media",
        period: "Fév 2024 - Août 2024",
        location: "Lyon, France",
        description: {
          en: "Media consumption analysis and competitive monitoring (quantitative & qualitative). Participation in end-of-campaign reports. Strategic recommendations for: Groupe Naos, Les 2 Alpes, B&B Hôtels. Development of cross-channel media consulting skills (TV, radio, digital, print, DOOH).",
          fr: "Analyses de la consommation média et veilles concurrentielles (piges quantitatives & qualitatives). Participation à l'élaboration de bilans de fin de campagne. Recommandations stratégiques pour : Groupe Naos, Les 2 Alpes, B&B Hôtels. Développement de compétences en conseil média cross-canal (TV, radio, digital, print, DOOH)."
        },
        images: [HAVAS, havas1],
        video: videohavas,
      },
      4: {
        title: { en: "Junior Trader", fr: "Trader Junior" },
        company: "STB Tunis",
        period: "Juil 2021 - Août 2021",
        description: {
          en: "Daily monitoring and reporting of political and economic news. Trading floor activities analysis.",
          fr: "Suivi quotidien et reporting de l'actualité politique et économique. Analyse des activités de la salle des marchés."
        },
        images: [
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200",
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200",
        ]
      }
    };
    setProject(projects[id] || projects[1]);
  }, [id]);
  
  const handleDragEnd = (e, info) => {
    if (Math.abs(info.offset.x) > 150) {
      navigate('/');
    }
  };
  
  if (!project) return null;
  
  const hasVideo = project.video;
  
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Close Button */}
      <div className="sticky top-6 z-50 flex justify-end px-6 pointer-events-none">
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md border border-[#0066ff]/20 flex items-center justify-center hover:bg-[#0066ff] hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Draggable Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x: springX, opacity }}
        className="pt-20 pb-32"
      >
        <div className="container-custom">
          {/* Images only (no video at top) */}
          <div className="grid gap-8 mb-12 max-w-4xl mx-auto">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative overflow-hidden rounded-xl bg-[#f5f5f5]"
              >
                <img
                  src={img}
                  alt={`${project.title[language]} - image ${idx + 1}`}
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          
          {/* Text Content */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#1a1a1a]">
              {project.title[language]}
            </h1>
            <p className="text-[#0066ff] text-lg mb-4">{project.company} • {project.period}</p>
            {project.location && (
              <p className="text-[#1a1a1a]/50 mb-4">{project.location}</p>
            )}
            <p className="text-[#1a1a1a]/60 text-lg leading-relaxed">
              {project.description[language]}
            </p>
          </div>
          
          {/* Video at the bottom - smaller size, autoplay, no sound */}
          {hasVideo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-sm uppercase tracking-wider text-[#0066ff] mb-4 text-center">
                {language === 'en' ? 'Behind the Scenes' : 'Dans les Coulisses'}
              </p>
              <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5] shadow-md">
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.images[0]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-h-[400px] object-cover"
                />
                {/* Play/Pause overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0066ff] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-center text-[#1a1a1a]/40 text-xs mt-3">
                {language === 'en' ? 'Video loop - no sound' : 'Vidéo en boucle - sans son'}
              </p>
            </motion.div>
          )}
          
          <p className="text-center text-[#1a1a1a]/30 text-sm mt-12">
            {language === 'en' ? '← Drag horizontally to close →' : '← Glissez horizontalement pour fermer →'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;