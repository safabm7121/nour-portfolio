import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkGrid from './components/WorkGrid';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ProjectDetail from './pages/ProjectDetail';
import ExtraDetail from './pages/ExtraDetail';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const [language, setLanguage] = useState('fr');
  const location = useLocation();
  
  return (
    <Layout>
      <ScrollToTop />
      <Navigation language={language} setLanguage={setLanguage} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero language={language} />
              <WorkGrid language={language} />
              <Skills language={language} />
              <Contact language={language} />
            </>
          } />
          <Route path="/about" element={
            <>
              <div className="pt-32 min-h-screen container-custom">
                <h1 className="text-6xl font-bold mb-8">About</h1>
                <Skills language={language} />
              </div>
            </>
          } />
          <Route path="/contact" element={
            <>
              <div className="pt-32">
                <Contact language={language} />
              </div>
            </>
          } />
          <Route path="/project/:id" element={<ProjectDetail language={language} />} />
          <Route path="/extra/:id" element={<ExtraDetail language={language} />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;