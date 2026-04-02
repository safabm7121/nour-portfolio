import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    // Create form data for FormSubmit
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('_captcha', 'false');
    formDataToSend.append('_template', 'table');
    formDataToSend.append('_subject', `Portfolio: New message from ${formData.name}`);
    formDataToSend.append('_replyto', formData.email);
    
    try {
      // CORRECTED EMAIL: nourelhoudabenmiled0@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/nourelhoudabenmiled0@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const content = {
    en: {
      title: "Let's Work Together",
      subtitle: "Get in touch",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try again or email me directly.",
    },
    fr: {
      title: "Travaillons Ensemble",
      subtitle: "Contactez-moi",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours...",
      sent: "Message envoyé ! Je vous répondrai bientôt.",
      error: "Une erreur est survenue. Veuillez réessayer ou m'envoyer un email directement.",
    },
  };
  
  const c = content[language];
  
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container-custom max-w-2xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">{c.title}</h2>
          <div className="blue-underline"></div>
          <p className="mt-6 text-[#1a1a1a]/60">{c.subtitle}</p>
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm uppercase tracking-wider mb-2 text-[#1a1a1a]">{c.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm uppercase tracking-wider mb-2 text-[#1a1a1a]">{c.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm uppercase tracking-wider mb-2 text-[#1a1a1a]">{c.message}</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-input resize-none"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? c.sending : c.send}
          </button>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[#0066ff] text-sm p-4 bg-[#0066ff]/5 rounded-lg"
            >
              {c.sent}
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 text-sm p-4 bg-red-50 rounded-lg"
            >
              {c.error}
            </motion.div>
          )}
        </motion.form>
        
        {/* Alternative direct email contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-[#1a1a1a]/10"
        >
          <p className="text-sm text-[#1a1a1a]/40 mb-4">
            {language === 'en' ? 'Or reach me directly at:' : 'Ou contactez-moi directement à :'}
          </p>
          <a 
            href="mailto:nourelhoudabenmiled0@gmail.com"
            className="text-[#0066ff] hover:text-[#0066ff]/80 transition-colors text-lg font-medium"
          >
            nourelhoudabenmiled0@gmail.com
          </a>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0066ff]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm text-[#1a1a1a]/60">Paris, France</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0066ff]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+33771419585" className="text-sm text-[#1a1a1a]/60 hover:text-[#0066ff] transition-colors">
                +33 771 41 9585
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;