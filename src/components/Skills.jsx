import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const skills = [
    "T-REX", "Hubspot", "Mxplorer", "Power BI", "Salesforce",
    "Programmation R", "Google Trends", "Medialand", "Google Analytics",
    "AdExpress", "Pack Office", "Mediapilot"
  ];
  
  const extraExp = [
    {
      title: { en: "Welcome Host", fr: "Hôtesse d'accueil" },
      company: "Welcome at work!",
      period: "Jan 2026 - Present",
      location: "Paris, France"
    },
    {
      title: { en: "Logistics Assistant", fr: "Aide logistique" },
      company: "voidstone Fashion Show",
      period: "Sept 2025 - Oct 2025",
      location: "Paris, France"
    },
    {
      title: { en: "Communication Assistant", fr: "Assistante en communication" },
      company: "LA FLAMME paris",
      period: "Avr 2023 - Sept 2023",
      location: "Tunis, Tunisie"
    },
    {
      title: { en: "Community Manager", fr: "Community Manager" },
      company: "TUNIVISION IHET",
      period: "Jan 2021 - Août 2021",
      location: "Tunis, Tunisie"
    },
    {
      title: { en: "Project Manager", fr: "Chef de projet" },
      company: "ENACTUS",
      period: "Oct 2019 - Août 2020",
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
          
          {/* Right Column - Extra Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">
              {language === 'en' ? 'Extra Experience' : 'Expériences Complémentaires'}
            </h2>
            <div className="space-y-6">
              {extraExp.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="experience-item"
                >
                  <h3 className="experience-title">
                    {exp.title[language]}
                  </h3>
                  <p className="experience-company">{exp.company}</p>
                  <div className="flex gap-4 text-sm text-[#1a1a1a]/50">
                    <span>{exp.period}</span>
                    <span>{exp.location}</span>
                  </div>
                </motion.div>
              ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { degree: "Master 2 Manager de la Communication", school: "Sup de Com Lyon", year: "2024" },
              { degree: "Master 1 Marketing Digital & analyse de données", school: "ESB Lyon", year: "2023" },
              { degree: "Licence Science de gestion - Finance", school: "IHET Tunis", year: "2022" },
            ].map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                className="education-card"
              >
                <span className="education-year">{edu.year}</span>
                <h3 className="text-xl font-bold mt-2 mb-1 text-[#1a1a1a]">{edu.degree}</h3>
                <p className="text-[#1a1a1a]/60">{edu.school}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;