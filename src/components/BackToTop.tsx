import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-blue-500/40 dark:border-yellow-500/40 text-blue-600 dark:text-yellow-400 shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-30 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      title="Back to Top"
      aria-label="Back to Top"
    >
      <ArrowUp size={18} className="text-blue-500 dark:text-yellow-400" />
    </button>
  );
};

export default BackToTop;