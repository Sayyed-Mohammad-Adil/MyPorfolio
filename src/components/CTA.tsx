import React from 'react';
import { Code, Utensils, Bed, RotateCcw, Briefcase } from 'lucide-react';

const CTA = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="py-20 bg-gray-950 border-y border-gray-800 relative flex items-center justify-center">
      {/* Pattern */}
      <div className="absolute inset-0 bg-hero opacity-[.03]"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-white mb-1">
            Ready to <span className="text-green-400">Collaborate?</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My life revolves around code, coffee, and creativity. Let's build something amazing together!
          </p>
        </div>

        {/* Rotating Circle with CTA */}
        <div className="flex justify-center items-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
            {/* Neon */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/40 animate-pulse blur-3xl"></div>

            {/* Rotating Circle */}
            <div className="absolute w-full h-full bg-gray-950 rounded-full flex items-center justify-center border-2 border-gray-700 animate-spin-slow pause-on-hover">
              <div className="absolute inset-0 bg-square opacity-[.05] rounded-full"></div>
              
              {/* CODE (Top) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Code className="text-2xl text-green-400" />
                <span className="text-gray-300 font-bold text-sm mt-1 font-code">CODE</span>
              </div>
              
              {/* EAT (Left) */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 flex flex-col items-center">
                <Utensils className="text-2xl text-green-400" />
                <span className="text-gray-300 font-bold text-sm mt-1 font-code">EAT</span>
              </div>
              
              {/* SLEEP (Bottom) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 -rotate-180 flex flex-col items-center">
                <Bed className="text-2xl text-green-400" />
                <span className="text-gray-300 font-bold text-sm mt-1 font-code">SLEEP</span>
              </div>
              
              {/* REPEAT (Right) */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 flex flex-col items-center">
                <RotateCcw className="text-2xl text-green-400" />
                <span className="text-gray-300 font-bold text-sm mt-1 font-code">REPEAT</span>
              </div>
            </div>

            {/* Hire Me Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-3 bg-green-500 text-gray-900 font-bold rounded-lg transition-all flex items-center gap-2 z-10 hover:bg-green-600"
            >
              <Briefcase className="text-gray-900 group-hover:scale-110 transition-transform" />
              Hire Me
            </button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32">
            <div className="w-full h-full grid grid-cols-8 gap-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-20 left-20 w-32 h-32">
            <div className="w-full h-full grid grid-cols-8 gap-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;