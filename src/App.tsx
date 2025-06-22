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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main>
      <div className="max-w-8xl mx-auto">
      <Hero />
          <TechStack />
          <About />
          <CTA />
          <Projects />
          <Blog />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;