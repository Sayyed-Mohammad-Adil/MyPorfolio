import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import About from './components/About';
import CTA from './components/CTA';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AsciiProfileModal from './components/AsciiProfileModal';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {!isLoaded && <LoadingScreen key="loading-screen" onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>
      
      <div 
        className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}
      >
        <Header />
        <main className="w-full pt-20">
          {/* Each section is full width and internally responsive */}
          <Hero />
          <TechStack />
          <About />
          <CTA />
          <Projects />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <AsciiProfileModal />
      </div>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
