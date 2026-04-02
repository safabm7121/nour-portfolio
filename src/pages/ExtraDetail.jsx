import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExtraDetail = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  
  useEffect(() => {
    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      navigate('/');
    }
  }, [location, navigate]);
  
  if (!experience) return null;
  
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
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-xl bg-[#f5f5f5] mb-8 max-w-4xl mx-auto">
          <img
            src={experience.image}
            alt={experience.title[language]}
            className="w-full object-cover"
          />
        </div>
        
        {/* Behind the Scene Image */}
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
        
        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto">
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