import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['hero', 'about', 'projects', 'blog', 'reviews', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 80 && rect.bottom >= 80;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blogs' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`fixed top-0 z-50 transition-all duration-300 w-full ${
      isScrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 sm:py-5 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none"
        >
          <Code className="text-blue-500 dark:text-yellow-400 text-xl sm:text-2xl led-glow shrink-0" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white font-code truncate max-w-[210px] xs:max-w-[260px] sm:max-w-none">Sayyed Mohammad Adil</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors font-medium relative group text-sm lg:text-base ${
                activeSection === item.id ? 'text-blue-600 dark:text-yellow-400 font-semibold' : ''
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-yellow-400 transition-all ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 p-5 flex flex-col space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 px-3 rounded-lg text-sm sm:text-base transition-colors font-medium flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-blue-50 dark:bg-yellow-400/10 text-blue-600 dark:text-yellow-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-yellow-400"></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;