import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import LA FLAMME images (all 6)
import laflamme1 from '../assets/images/laflamme1.JPEG';
import laflamme2 from '../assets/images/laflamme2.JPEG';
import laflamme3 from '../assets/images/laflamme3.JPEG';
import laflamme4 from '../assets/images/laflamme4.jpg';
import laflamme5 from '../assets/images/laflamme5.JPEG';
import laflamme6 from '../assets/images/laflamme6.JPG';

const ExtraDetail = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      navigate('/');
    }
  }, [location, navigate]);
  
  if (!experience) return null;
  
  // Check if it's LA FLAMME (id 3)
  const isLaFlamme = experience.id === 3;
  
  // All LA FLAMME images
  const laFlammeImages = [laflamme1, laflamme2, laflamme3, laflamme4, laflamme5, laflamme6];
  
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
      
      <div className="container-custom py-12">
        {/* Main Images - Multiple for LA FLAMME */}
        <div className="mb-8 max-w-4xl mx-auto">
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
          ) : (
            <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
              <img
                src={experience.image}
                alt={experience.title[language]}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Behind the Scene Image (for non-LA FLAMME items) */}
        {experience.behindScene && !isLaFlamme && (
          <div className="mb-8 max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-wider text-[#0066ff] mb-4">
              {language === 'en' ? 'Behind the Scenes' : 'Dans les Coulisses'}
            </p>
            <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5]">
              <img
                src={experience.behindScene}
                alt={`Behind the scenes - ${experience.title[language]}`}
                className="w-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto mt-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#1a1a1a]">
            {experience.title[language]}
          </h1>
          <p className="text-[#0066ff] text-lg mb-4">{experience.company}</p>
          <p className="text-[#1a1a1a]/50 mb-2">{experience.period} • {experience.location}</p>
          <p className="text-[#1a1a1a]/60 text-lg leading-relaxed mt-6">
            {experience.description[language]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraDetail;