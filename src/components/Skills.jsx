import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Skills = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredExp, setHoveredExp] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create separate inView observers for each extra experience image
  const [expRefs, setExpRefs] = useState([]);
  const [expInViews, setExpInViews] = useState([]);
  
  useEffect(() => {
    setExpRefs(expRefs => Array(extraExp.length).fill().map((_, i) => expRefs[i] || null));
  }, []);
  
  const skills = [
    "T-REX", "Hubspot", "Mxplorer", "Power BI", "Salesforce",
    "Programmation R", "Google Trends", "Medialand", "Google Analytics",
    "AdExpress", "Pack Office", "Mediapilot"
  ];
  
  // Extra Experience with behind-the-scenes images
  const extraExp = [
    {
      id: 1,
      title: { en: "Welcome Host", fr: "Hôtesse d'accueil" },
      company: "Welcome at work!",
      period: "Jan 2026 - Present",
      location: "Paris, France",
      description: {
        en: "Resident and visitor welcome, package and mail management, badge management, event coordination.",
        fr: "Accueil résidents et visiteurs, gestion des colis et courriers, gestion des badges, coordination événementielle."
      },
      image: "https://media.licdn.com/dms/image/v2/D5622AQH3NN-MRFizcw/feedshare-shrink_800/feedshare-shrink_800/0/1733498978071?e=2147483647&v=beta&t=VlHozAZ1n0UxvRp0utvvqduBFoAbI2skErOn29CcJYA",
      behindScene: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800"
    },
    {
      id: 2,
      title: { en: "Logistics Assistant", fr: "Aide logistique" },
      company: "voidstone Fashion Show",
      period: "Sept 2025 - Oct 2025",
      location: "Paris, France",
      description: {
        en: "Logistics coordination, model coordination, technical setup and event execution.",
        fr: "Coordination logistique, coordination des mannequins, mise en place technique et déroulement du défilé."
      },
      image: "https://i.postimg.cc/zfj9ShQK/74.jpg",
      behindScene: "https://images.unsplash.com/photo-1533009199272-35f2b5ce8f9c?w=800"
    },
    {
      id: 3,
      title: { en: "Communication Assistant", fr: "Assistante en communication" },
      company: "LA FLAMME paris",
      period: "Avr 2023 - Sept 2023",
      location: "Tunis, Tunisie",
      description: {
        en: "Internal communication (mailing), social media monitoring, social media planning.",
        fr: "Communication interne (mailing), suivi des mentions sur les réseaux, planification social media."
      },
      image: "https://lh3.googleusercontent.com/p/AF1QipMpaNAT1J3rd6CEeijtA8suhaPYURqy4YvlCccB=s1360-w1360-h1020-rw",
      behindScene: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800"
    },
    {
      id: 4,
      title: { en: "Community Manager", fr: "Community Manager" },
      company: "TUNIVISION IHET",
      period: "Jan 2021 - Août 2021",
      location: "Tunis, Tunisie",
      description: {
        en: "Social media caption writing, brainstorming and event planning (Christmas market, Valentine's Day, etc.).",
        fr: "Rédaction des légendes pour les réseaux, brainstorming et planification des événements (marché de Noël, Saint-Valentin, etc.)."
      },
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKuWTh3uSqCvVbNW2VW21dcTG9Qarin4gJg&s",
      behindScene: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800"
    },
    {
      id: 5,
      title: { en: "Project Manager", fr: "Chef de projet" },
      company: "ENACTUS",
      period: "Oct 2019 - Août 2020",
      location: "Tunis, Tunisie",
      description: {
        en: "Project brainstorming (Project: BASMA), competitive monitoring, content creation.",
        fr: "Brainstorming projet (Projet: BASMA), veille concurrentielle, création de contenu."
      },
      image: "https://www.tustex.com/sites/default/files//styles/large/public/field/image/encatus.jpg?itok=Binyty9n",
      behindScene: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
    }
  ];
  
  // Education from PDF
  const education = [
    { 
      degree: "Master 2 Manager de la Communication", 
      school: "Sup de Com Lyon", 
      year: "2024",
      location: "Lyon, France"
    },
    { 
      degree: "Master 1 Marketing Digital & analyse de données", 
      school: "ESB Lyon - Esprit School of Business", 
      year: "2023",
      location: "Lyon, France"
    },
    { 
      degree: "Licence en Science de gestion - spécialité FINANCE", 
      school: "IHET - Institut des Hautes Etudes de Tunis", 
      year: "2022",
      location: "Tunis, Tunisie"
    },
    { 
      degree: "Formation Marketing Digital", 
      school: "GoMyCode", 
      year: "2021",
      location: "Tunis, Tunisie",
      duration: "3 mois"
    },
    { 
      degree: "Baccalauréat en MATHÉMATIQUES", 
      school: "Rue de Marseille", 
      year: "2019",
      location: "Tunis, Tunisie"
    }
  ];
  
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Skills */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              {language === 'en' ? 'Skills & Tools' : 'Compétences & Outils'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  className="skill-tag"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-[#1a1a1a]">
                {language === 'en' ? 'Languages' : 'Langues'}
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1a1a1a]">Français</span>
                    <span className="text-[#0066ff]">C2</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1a1a1a]">English</span>
                    <span className="text-[#0066ff]">C1</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill w-[90%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-[#1a1a1a]">العربية (Arabe)</span>
                    <span className="text-[#0066ff]">Natif</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Extra Experience with Behind Scene Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">
              {language === 'en' ? 'Extra Experience' : 'Expériences Complémentaires'}
            </h2>
            <div className="space-y-8">
              {extraExp.map((exp, idx) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [imgRef, imgInView] = useInView({ triggerOnce: true, threshold: 0.3 });
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="experience-item group cursor-pointer"
                    onMouseEnter={() => setHoveredExp(exp.id)}
                    onMouseLeave={() => setHoveredExp(null)}
                  >
                    <Link to={`/extra/${exp.id}`} state={{ experience: exp }}>
                      <div className="flex gap-4">
                        {/* Small preview image */}
                        <div ref={imgRef} className="w-20 h-20 rounded-lg overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                          <img
                            src={exp.image}
                            alt={exp.title[language]}
                            className={`w-full h-full object-cover transition-all duration-700 ${
                              isMobile 
                                ? (imgInView ? 'grayscale-0' : 'grayscale')
                                : 'grayscale group-hover:grayscale-0'
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="experience-title group-hover:text-[#0066ff] transition-colors">
                            {exp.title[language]}
                          </h3>
                          <p className="experience-company">{exp.company}</p>
                          <div className="flex gap-4 text-sm text-[#1a1a1a]/50">
                            <span>{exp.period}</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
        
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-[#1a1a1a]/10"
        >
          <h2 className="section-title text-center">
            {language === 'en' ? 'Education' : 'Formation'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                className="education-card"
              >
                <span className="education-year">{edu.year}</span>
                <h3 className="text-lg font-bold mt-2 mb-1 text-[#1a1a1a]">{edu.degree}</h3>
                <p className="text-[#0066ff] text-sm">{edu.school}</p>
                <p className="text-[#1a1a1a]/40 text-xs mt-2">{edu.location}</p>
                {edu.duration && (
                  <p className="text-[#1a1a1a]/40 text-xs mt-1">{edu.duration}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;