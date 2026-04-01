import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const WorkGrid = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const experiences = [
    {
      id: 1,
      title: { en: "Offer Optimization Manager", fr: "Chargée de l'optimisation de l'offre" },
      company: "M6 Publicité",
      period: "Juin 2025 - Août 2025",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800",
    },
    {
      id: 2,
      title: { en: "Radio Planning Manager", fr: "Chargée de Planning - RADIO" },
      company: "M6 Publicité",
      period: "Nov 2024 - Avr 2025",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800",
    },
    {
      id: 3,
      title: { en: "Media Assistant", fr: "Assistante chargée média" },
      company: "Havas Media",
      period: "Fév 2024 - Août 2024",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    },
    {
      id: 4,
      title: { en: "Junior Trader", fr: "Trader Junior" },
      company: "STB Tunis",
      period: "Juil 2021 - Août 2021",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    },
  ];
  
  return (
    <section id="work" className="py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-header">
            {language === 'en' ? 'Selected Work' : 'Travaux'}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="project-card"
            >
              <Link to={`/project/${exp.id}`}>
                <div className="relative overflow-hidden mb-4 bg-[#f5f5f5] rounded-xl">
                  <img
                    src={exp.image}
                    alt={exp.title[language]}
                    className="project-image"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;