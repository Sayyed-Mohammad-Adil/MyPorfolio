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
      className={`fixed bottom-6 right-6 bg-gray-800 border border-green-600 font-bold w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 z-50 hover:bg-gray-700 hover:scale-110 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      title="Back to Top"
    >
      <ArrowUp size={20} className="text-green-400" />
    </button>
  );
};

export default BackToTop;