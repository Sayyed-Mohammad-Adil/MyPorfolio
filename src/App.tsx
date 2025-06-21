import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      <Header />
      <main className="w-full">
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
    </div>
  );
}

export default App;
