import React, { useEffect, useRef, useState } from 'react';
import { Code, Mail } from 'lucide-react';
import WorkspaceIllustration from './WorkspaceIllustration';

const Hero = () => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState('');
  const [startTyping, setStartTyping] = useState(false); // 👈 Trigger flag
  const workspaceRef = useRef<HTMLDivElement>(null);

  const texts = [
    'Ubuntu v22.04.0',
    'ThinkPad X1 Carbon',
    '5.15.0-Jellyfish',
    '45 days, 17 hours',
    'JavaScript, Python, Go',
    'VSCode / Trae',
    'React, Next.js, TailwindCSS',
    'v-1.0.0',
  ];

  // 👁️ Intersection Observer to trigger typing when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startTyping) {
          setStartTyping(true);
        }
      },
      { threshold: 0.5 }
    );

    if (workspaceRef.current) {
      observer.observe(workspaceRef.current);
    }

    return () => {
      if (workspaceRef.current) {
        observer.unobserve(workspaceRef.current);
      }
    };
  }, [startTyping]);

  // ✍️ Typing logic
  useEffect(() => {
    if (!startTyping || currentLineIndex >= texts.length) return;

    const fullText = texts[currentLineIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setCurrentLineText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTypedLines((prev) => [...prev, fullText]);
          setCurrentLineText('');
          setCurrentLineIndex((prev) => prev + 1);
        }, 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [startTyping, currentLineIndex]);

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
      {/* Light mode */}
      <div className="absolute inset-0 bg-hero-light dark:hidden opacity-[.20] z-0"></div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-hero-dark dark:opacity-[.03] z-0"></div>

      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col items-center gap-8 xl:gap-12">
          <div className="w-full text-center space-y-6 xl:pt-8">
            <h2 className="text-blue-500 dark:text-yellow-500 text-xl md:text-2xl font-semibold">Hello, I'm</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-code mb-4">
              Sayyed Mohammad Adil
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              I build exceptional and accessible digital experiences for the web. Focused on creating elegant solutions to complex problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 dark:hover:bg-yellow-600 text-white dark:text-gray-900 font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Me
              </a>
              <a
                href="#projects"
                className="px-8 py-3 bg-transparent hover:bg-gray-800 text-blue-400 dark:text-yellow-400 border border-blue-400 dark:border-yellow-400 font-bold rounded-lg transition-all flex items-center gap-2"
              >
                <Code size={20} />
                View Projects
              </a>
            </div>
          </div>

          <div ref={workspaceRef} className="w-full xl:w-20/100 mx-auto relative">
            <WorkspaceIllustration
              typingLines={[...typedLines, currentLineText]}
              showLaptop={typedLines.length === texts.length} // 👈 Show only after typing ends
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
