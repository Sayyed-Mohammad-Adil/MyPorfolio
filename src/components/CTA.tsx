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
    <section id="cta" className="py-20 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800 relative flex items-center justify-center">
      {/* Pattern */}
      {/* <div className="absolute inset-0 bg-hero opacity-[.03]"></div>
       */}
      {/* Light mode */}
      <div className="absolute inset-0 bg-hero-light dark:hidden opacity-[.20] z-0"></div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-hero-dark dark:opacity-[.03] z-0"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            Ready to <span className="text-blue-400 dark:text-yellow-400">Collaborate?</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 dark:text-yellow-400 opacity-70"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            My life revolves around code, coffee, and creativity. Let's build something amazing together!
          </p>
        </div>

        {/* Rotating Circle with CTA */}
        <div className="flex justify-center items-center py-4">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
            {/* Neon */}
            <div className="absolute inset-0 bg-purple-500/40 sm:bg-purple-500/60 blur-2xl rounded-full animate-pulse"></div>

            {/* Rotating Circle */}
            <div className="absolute w-full h-full bg-gray-200 dark:bg-gray-950 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-700 animate-spin-slow pause-on-hover shadow-xl">
              {/* Rotating Circle Pattern */}

              {/* Light Mode Background */}
              <div className="absolute inset-0 rounded-full bg-square-light opacity-[.25] dark:hidden"></div>

              {/* Dark Mode Background */}
              <div className="absolute inset-0 rounded-full bg-square-dark opacity-[.05] hidden dark:block"></div>

              {/* CODE (Top) */}
              <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Code className="text-xl sm:text-2xl text-blue-500 dark:text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm mt-1 font-code">CODE</span>
              </div>

              {/* EAT (Left) */}
              <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 -rotate-90 flex flex-col items-center">
                <Utensils className="text-xl sm:text-2xl text-blue-500 dark:text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm mt-1 font-code">EAT</span>
              </div>

              {/* SLEEP (Bottom) */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 -rotate-180 flex flex-col items-center">
                <Bed className="text-xl sm:text-2xl text-blue-500 dark:text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm mt-1 font-code">SLEEP</span>
              </div>

              {/* REPEAT (Right) */}
              <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 rotate-90 flex flex-col items-center">
                <RotateCcw className="text-xl sm:text-2xl text-blue-500 dark:text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300 font-bold text-xs sm:text-sm mt-1 font-code">REPEAT</span>
              </div>
            </div>

            {/* Hire Me Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-6 py-2.5 sm:px-8 sm:py-3 bg-blue-500 dark:bg-yellow-500 text-white dark:text-gray-900 font-bold rounded-xl transition-all flex items-center gap-2 z-10 hover:bg-blue-600 dark:hover:bg-yellow-600 text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95"
            >
              <Briefcase size={18} className="text-white dark:text-gray-900 group-hover:scale-110 transition-transform" />
              <span>Hire Me</span>
            </button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32">
            <div className="w-full h-full grid grid-cols-8 gap-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-400"></div>
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