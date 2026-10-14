import React, { useEffect, useRef, useState } from "react";
import { Code, Mail } from "lucide-react";
import WorkspaceIllustration from "./WorkspaceIllustration";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLineText, setCurrentLineText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const texts = [
    "Ubuntu v22.04.0",
    "ThinkPad X1 Carbon",
    "5.15.0-Jellyfish",
    "45 days, 17 hours",
    "JavaScript, Python, Go",
    "VSCode / Trae",
    "React, Next.js, TailwindCSS",
    "v-1.0.0",
  ];

  // GSAP Initial Landing Animation
  useGSAP(() => {
    const tl = gsap.timeline();

    if (preloaderRef.current) {
      tl.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }

    tl.fromTo(".hero-text-anim", {
      y: 40,
      opacity: 0,
      filter: "blur(10px)",
    }, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.2")
    .fromTo(".hero-btn-anim", {
      scale: 0.9,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.5)",
      stagger: 0.1
    }, "-=0.4")
    .to(workspaceRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setStartTyping(true);
      }
    }, "-=0.4");
  }, { scope: heroRef });

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
          setCurrentLineText("");
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
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative xl:min-h-screen flex items-center justify-center pt-4 sm:pt-8 pb-10 sm:pb-16"
      >
        {/* GSAP Preloader Overlay */}
        <div 
          ref={preloaderRef}
          className="fixed inset-0 z-[100] pointer-events-none backdrop-blur-2xl bg-white/70 dark:bg-black/70 flex items-center justify-center text-gray-900 dark:text-white overflow-hidden border-b border-white/20"
        >
          <h1 className="text-4xl md:text-7xl font-black font-code uppercase tracking-tighter">
            Loading
            <span className="animate-pulse">...</span>
          </h1>
        </div>
        {/* Light mode */}
        <div className="absolute inset-0 bg-hero-light dark:hidden opacity-[.20] z-0"></div>

        {/* Dark mode */}
        <div className="absolute inset-0 hidden dark:block bg-hero-dark dark:opacity-[.03] z-0"></div>

        <div className="w-full relative z-10 flex flex-col items-center gap-6 sm:gap-8 xl:gap-10">
          
          {/* Text Section - High z-index to stay above 3D canvas */}
          <div className="max-w-6xl mx-auto px-4 lg:px-12 w-full text-center space-y-4 sm:space-y-6 xl:pt-8 overflow-hidden relative z-20">
            <div className="overflow-hidden">
              <h2 className="hero-text-anim text-blue-500 dark:text-yellow-500 text-lg sm:text-xl md:text-2xl font-semibold">
                Hello, I'm
              </h2>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-text-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-code mb-2 sm:mb-4 tracking-tight">
                Sayyed Mohammad Adil
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="hero-text-anim text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                I create inclusive, scalable solutions focused on clarity,
                performance, and purpose.
              </p>
            </div>

            {/* Buttons - High z-index and explicit click handlers */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-xs sm:max-w-none mx-auto w-full relative z-30">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="hero-btn-anim relative z-30 cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 dark:hover:bg-yellow-600 text-white dark:text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/20 dark:shadow-yellow-500/20 active:scale-95"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="hero-btn-anim relative z-30 cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/80 dark:bg-gray-900/80 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-yellow-400 border border-blue-400/50 dark:border-yellow-400/50 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm active:scale-95"
              >
                <Code size={18} />
                <span>View Projects</span>
              </a>
            </div>
          </div>

          {/* 3D Illustration Section - Positioned cleanly below buttons */}
          <div
            ref={workspaceRef}
            className="w-full max-w-[1600px] px-3 sm:px-6 md:px-8 mx-auto relative z-10 opacity-0 mt-1 sm:mt-2 lg:mt-4" 
          >
            <WorkspaceIllustration
              typingLines={[...typedLines, currentLineText]}
              showLaptop={typedLines.length === texts.length}
            />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Hero;
