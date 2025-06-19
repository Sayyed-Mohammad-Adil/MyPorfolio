import React, { useEffect, useState } from 'react';
import { Code, Mail } from 'lucide-react';
import WorkspaceIllustration from './WorkspaceIllustration';

const Hero = () => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');

  const texts = [
    'Ubuntu v22.04.0',
    'ThinkPad X1 Carbon',
    '5.15.0-dev',
    '45 days, 17 hours',
    'JavaScript, Python, Go',
    'VSCode / Neovim',
    'React, Next.js, TailwindCSS',
  ];

  useEffect(() => {
    if (currentLineIndex >= texts.length) return;

    const fullText = texts[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setCurrentLineText(fullText.slice(0, charIndex + 1));

        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTypedLines(prev => [...prev, fullText]);
          setCurrentLineText('');
          setCurrentLineIndex(prev => prev + 1);
        }, 500);
        
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative xl:min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 bg-hero opacity-[.03]"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col items-center gap-8 xl:gap-12">
          <div className="w-full text-center space-y-6 xl:pt-8">
            <div className="space-y-2">
              <h2 className="text-green-500 text-xl md:text-2xl font-semibold">Hello, I'm</h2>
              <h1 className="text-4xl lg:text-6xl font-bold font-code tracking-tight text-white">
                Sayyed Mohammad Adil
              </h1>
            </div>

            <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              Crafting elegant solutions to complex problems with clean code and innovative thinking.
              Welcome to my personal dev workspace where ideas come to life.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 py-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-gray-900 font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Code size={20} />
                View Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-transparent hover:bg-gray-800 text-green-400 border border-green-400 font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Me
              </button>
            </div>
          </div>

          <div className="w-full xl:w-20/100 mx-auto relative mb-12">
            <WorkspaceIllustration typingLines={[...typedLines, currentLineText]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
