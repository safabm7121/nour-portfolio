import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

// M6 - Offer Optimization Manager (ID 1)
import m6_offer_1 from '../assets/images/M6 1.jpg';
import m6_offer_2 from '../assets/images/m6 2.JPG';

import m6_offer_4 from '../assets/images/M6 4.JPG';
import m6_offer_5 from '../assets/images/M6 5.JPG';

// M6 - Radio Planning Manager (ID 2)
import m6_radio_1 from '../assets/images/m6 radio.JPG';
import m6_radio_2 from '../assets/images/m6.png';

// HAVAS (ID 3)
import havas_1 from '../assets/images/HAVAS.JPEG';
import havas_2 from '../assets/images/havas1.JPEG';
import havas_3 from '../assets/images/HAVASs (2).jpg';
import havas_4 from '../assets/images/HAVASS.JPG';
import videohavas from '../assets/video/videohavas.MOV';

// STB (ID 4) - NO IMAGES

const ProjectDetail = ({ language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
  const opacity = useTransform(springX, [-200, 0, 200], [0, 1, 0]);
  
  // FIXED: Scroll to top when component mounts AND when id changes
  useEffect(() => {
    window.scrollTo(0, 0);
    // Also ensure any container scrolling is reset
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [id]); // Added id as dependency to trigger on project change
  
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
        title: { en: "Offer Optimization Manager - TV", fr: "Chargée de l'optimisation de l'offre - TV" },
        company: "M6 Publicité (Groupe M6)",
        period: "Juin 2025 - Août 2025",
        location: "Paris, France",
        description: {
          en: "Management and optimization of the advertising screen grid for PTNT (W9 and 6TER). Audience analysis and advertising screen pricing. Monitoring advertising time and establishing forecasts for upcoming weeks. Distribution of grids to the market at S-2.",
          fr: "Gestion et optimisation de la grille des écrans publicitaires pour PTNT (W9 et 6TER). Analyses des audiences et tarification des écrans publicitaires. Suivi du temps de publicité et établissement des prévisions pour les semaines à venir. Diffusion des grilles auprès du marché à S-2."
        },
        images: [m6_offer_1, m6_offer_2, m6_offer_4, m6_offer_5]
      },
      2: {
        title: { en: "Radio Planning Manager", fr: "Chargée de Planning Radio" },
        company: "M6 Publicité (Groupe M6)",
        period: "Nov 2024 - Avr 2025",
        location: "Paris, France",
        description: {
          en: "Sales, booking and daily optimization of advertising screens based on antenna grids. Strategic media planning advice for accounts including M6 Interaction, Groupe M, Médiabrands, Publicis, and Héroïks. Verification of general terms of sale and contract compliance. Budget management and specific agreements with sales teams.",
          fr: "Vente, réservation et optimisation quotidienne des écrans publicitaires en fonction des grilles des antennes. Conseil stratégiques en Média Planning pour les comptes M6 Interaction, Groupe M, Médiabrands, Publicis et Héroïks. Contrôle de la bonne application des conditions générales de vente et des contrats. Gestion des budgets et des accords spécifiques avec les commerciaux."
        },
        images: [m6_radio_1, m6_radio_2]
      },
      3: {
        title: { en: "Media Assistant", fr: "Assistante chargée média" },
        company: "Havas Media",
        period: "Fév 2024 - Août 2024",
        location: "Lyon, France",
        description: {
          en: "Media consumption analysis and competitive monitoring (quantitative and qualitative) across DOOH, OOH, TV, and Digital channels. End-of-campaign report development and strategic recommendations. Client briefs and media plan preparation for Groupe Naos, Les 2 Alpes, B&B Hôtels, and Euromaster. Development of cross-channel media consulting skills.",
          fr: "Analyses des consommations médias et veilles concurrentielles (piges quantitatives et qualitatives) sur DOOH, OOH, TV et Digital. Élaboration des bilans de fin de campagne et recommandations stratégiques. Briefs clients et plans média pour Groupe Naos, Les 2 Alpes, B&B Hôtels et Euromaster. Développement des compétences en conseil média cross-canal."
        },
        images: [havas_1, havas_2, havas_3, havas_4],
        video: videohavas
      },
      4: {
        title: { en: "Junior Trader", fr: "Trader Junior" },
        company: "Société Tunisienne de Banque (STB)",
        period: "Juil 2021 - Août 2021",
        location: "Tunis, Tunisie",
        description: {
          en: "Daily monitoring and reporting of political and economic news. Observation and analysis of trading floor activities with detailed documentation.",
          fr: "Suivi quotidien et reporting de l'actualité politique et économique. Observation et analyse des activités de la salle des marchés avec documentation détaillée."
        },
        images: []
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
  const hasImages = project.images && project.images.length > 0;
  
  return (
    <div className="min-h-screen bg-white overflow-y-auto" ref={contentRef}>
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
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x: springX, opacity }}
        className="pt-20 pb-32"
      >
        <div className="container-custom">
          {/* Text Content - AT THE TOP */}
          <div className="text-center max-w-3xl mx-auto mb-12">
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
          
          {/* Images Section - FIXED: Consistent sizing with aspect ratio */}
          {hasImages && (
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative overflow-hidden rounded-xl bg-[#f5f5f5]"
                  >
                    <div className="aspect-w-4 aspect-h-3 w-full">
                      <img
                        src={img}
                        alt={`${project.title[language]} - image ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: 'center' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Video Section - at the bottom, smaller size */}
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
                <div className="aspect-video w-full">
                  <video
                    ref={videoRef}
                    src={project.video}
                    poster={project.images?.[0]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
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