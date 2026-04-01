import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = ({ language }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('https://formsubmit.co/noureihoudahenmiled0@gmail.com', {
      method: 'POST',
      body: new FormData(form),
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };
  
  const content = {
    en: {
      title: "Let's Work Together",
      subtitle: "Get in touch",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sent: "Message sent!",
    },
    fr: {
      title: "Travaillons Ensemble",
      subtitle: "Contactez-moi",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      sent: "Message envoyé !",
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
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          
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
            className="btn-primary w-full"
          >
            {c.send}
          </button>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[#0066ff] text-sm"
            >
              {c.sent}
            </motion.div>
          )}
        </motion.form>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 text-[#1a1a1a]/40 text-sm"
        >
          <p>📍 Paris, France</p>
          <p>📧 noureihoudahenmiled0@gmail.com</p>
          <p>📱 +33 771 41 9585</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;