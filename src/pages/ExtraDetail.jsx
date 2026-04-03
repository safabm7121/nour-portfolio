import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// LA FLAMME images (6 images - stacked 2x2 grid)
import laflamme1 from '../assets/images/laflamme1.JPEG';
import laflamme2 from '../assets/images/laflamme2.JPEG';
import laflamme3 from '../assets/images/laflamme3.JPEG';
import laflamme4 from '../assets/images/laflamme4.jpg';
import laflamme5 from '../assets/images/laflamme5.JPEG';
import laflamme6 from '../assets/images/laflamme6.JPG';

// voidstone video + image
import voidstoneVideo from '../assets/video/voidstone video.mov';
import voidstoneImage from '../assets/images/voidstone.jpeg';

// Street Marketing image
import streetMarketingImg from '../assets/images/INTERIM LYON.jpg';

const ExtraDetail = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const voidstoneVideoRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      navigate('/');
    }
  }, [location, navigate]);
  
  useEffect(() => {
    if (experience?.id === 2 && voidstoneVideoRef.current) {
      voidstoneVideoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, [experience]);
  
  if (!experience) return null;
  
  const isLaFlamme = experience.id === 4;
  const isVoidstone = experience.id === 2;
  const isStreetMarketing = experience.id === 3;
  const laFlammeImages = [laflamme1, laflamme2, laflamme3, laflamme4, laflamme5, laflamme6];
  
  // Detailed descriptions based on CV
  const getDetailedDescription = () => {
    if (experience.id === 1) {
      return {
        en: "As a Welcome Host at Welcome at work! in partnership with La Belle Equipe, I manage the reception area, coordinate internal events, and maintain supplier relations. My responsibilities include welcoming residents and visitors, managing packages and mail, handling badge management, and ensuring smooth event coordination. This role has strengthened my organizational skills and ability to handle multiple tasks simultaneously in a fast-paced environment.",
        fr: "En tant qu'Hôtesse d'accueil chez Welcome at work! en partenariat avec La Belle Equipe, je gère l'espace d'accueil, coordonne les événements internes et entretiens les relations avec les prestataires. Mes responsabilités incluent l'accueil des résidents et visiteurs, la gestion des colis et courriers, la gestion des badges et la coordination des événements. Ce rôle a renforcé mes compétences organisationnelles et ma capacité à gérer plusieurs tâches simultanément dans un environnement dynamique."
      };
    }
    if (experience.id === 2) {
      return {
        en: "For the voidstone Fashion Show during Paris Fashion Week, I handled logistics coordination, model coordination, technical setup, and event execution. I managed backstage operations, ensured smooth runway flow, and coordinated with designers, stylists, and production teams. This experience gave me invaluable insight into the fast-paced world of fashion events and taught me how to remain calm under pressure.",
        fr: "Pour le défilé de mode voidstone pendant la Fashion Week de Paris, j'ai assuré la coordination logistique, la coordination des mannequins, la mise en place technique et le déroulement de l'événement. J'ai géré les opérations backstage, assuré la fluidité du défilé et coordonné avec les créateurs, stylistes et équipes de production. Cette expérience m'a donné un aperçu précieux du monde trépidant des événements de mode et m'a appris à rester calme sous pression."
      };
    }
    if (experience.id === 3) {
      return {
        en: "I participated in a street marketing campaign for the City of Lyon focused on the participatory budget initiative. I engaged with citizens directly in public spaces to promote community initiatives and encourage participation in local decision making. This experience developed my communication skills and ability to connect with diverse audiences while promoting civic engagement. The campaign successfully raised awareness about the participatory budget process and encouraged more residents to get involved in shaping their city's future.",
        fr: "J'ai participé à une campagne de street marketing pour la Ville de Lyon sur le thème du budget participatif. J'ai engagé des citoyens directement dans les espaces publics pour promouvoir les initiatives communautaires et encourager la participation à la prise de décision locale. Cette expérience a développé mes compétences en communication et ma capacité à me connecter avec des publics divers tout en promouvant l'engagement civique. La campagne a réussi à sensibiliser au processus de budget participatif et à encourager davantage de résidents à s'impliquer dans l'avenir de leur ville."
      };
    }
    if (experience.id === 4) {
      return {
        en: "At LA FLAMME Paris, I managed internal communication campaigns including mailing campaigns, social media monitoring, and social media planning. I created engaging content and developed community engagement strategies. This role allowed me to combine my creativity with strategic thinking to build brand awareness and foster community interaction.",
        fr: "Chez LA FLAMME Paris, j'ai géré des campagnes de communication interne incluant des campagnes mailing, la veille sur les réseaux sociaux et la planification social media. J'ai créé du contenu engageant et développé des stratégies d'engagement communautaire. Ce rôle m'a permis de combiner ma créativité avec une réflexion stratégique pour développer la notoriété de la marque et favoriser l'interaction communautaire."
      };
    }
    if (experience.id === 5) {
      return {
        en: "As Community Manager for TUNIVISION IHET, I was responsible for social media caption writing, content creation, and event planning. I organized successful events including a Christmas market and Valentine's Day celebrations. This role taught me how to build online communities and create content that resonates with target audiences.",
        fr: "En tant que Community Manager pour TUNIVISION IHET, j'étais responsable de la rédaction des légendes pour les réseaux sociaux, de la création de contenu et de la planification d'événements. J'ai organisé des événements réussis incluant un marché de Noël et des célébrations de la Saint-Valentin. Ce rôle m'a appris à bâtir des communautés en ligne et à créer du contenu qui résonne avec les publics cibles."
      };
    }
    if (experience.id === 6) {
      return {
        en: "As Project Manager for ENACTUS, I led project BASMA from conception to execution. I was responsible for competitive monitoring, market research, content creation, and team coordination. This project focused on developing sustainable business solutions for local communities, and I learned valuable lessons in leadership, project management, and social entrepreneurship.",
        fr: "En tant que Chef de projet pour ENACTUS, j'ai dirigé le projet BASMA de la conception à l'exécution. J'étais responsable de la veille concurrentielle, de la recherche de marché, de la création de contenu et de la coordination d'équipe. Ce projet visait à développer des solutions commerciales durables pour les communautés locales, et j'ai appris de précieuses leçons en matière de leadership, de gestion de projet et d'entrepreneuriat social."
      };
    }
    return experience.description;
  };
  
  const detailedDesc = getDetailedDescription();
  
  // NO MEDIA for Welcome Host (id:1), Community Manager (id:5), Project Manager (id:6)
  const hasNoMedia = experience.id === 1 || experience.id === 5 || experience.id === 6;
  
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
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
      
      <div className="container-custom py-12">
        {/* Title and Description at the TOP */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#1a1a1a]">
            {experience.title[language]}
          </h1>
          <p className="text-[#0066ff] text-lg mb-2">{experience.company}</p>
          <p className="text-[#1a1a1a]/50 mb-6">{experience.period} • {experience.location}</p>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed">
            {detailedDesc[language]}
          </p>
        </div>
        
        {/* Media Section - ONLY if there are actual media files */}
        {!hasNoMedia && (
          <div className="max-w-4xl mx-auto">
            {isLaFlamme ? (
              <>
                <p className="text-sm uppercase tracking-wider text-[#0066ff] mb-6">
                  {language === 'en' ? 'Gallery' : 'Galerie'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {laFlammeImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative overflow-hidden rounded-xl bg-[#f5f5f5]"
                    >
                      <img
                        src={img}
                        alt={`LA FLAMME Paris - Communication Assistant ${idx + 1}`}
                        className="w-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : isVoidstone ? (
              <>
                <p className="text-sm uppercase tracking-wider text-[#0066ff] mb-4">
                  {language === 'en' ? 'Fashion Show' : 'Défilé de Mode'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <img
                      src={voidstoneImage}
                      alt="voidstone Fashion Show"
                      className="w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
                    <video
                      ref={voidstoneVideoRef}
                      src={voidstoneVideo}
                      poster={voidstoneImage}
                      controls
                      loop
                      muted
                      playsInline
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </>
            ) : isStreetMarketing ? (
              <>
                <p className="text-sm uppercase tracking-wider text-[#0066ff] mb-4">
                  {language === 'en' ? 'Street Marketing Campaign' : 'Campagne Street Marketing'}
                </p>
                <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
                  <img
                    src={streetMarketingImg}
                    alt="Street Marketing - Ville de Lyon - Budget Participatif"
                    className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraDetail;