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

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative xl:min-h-screen flex items-center justify-center pt-20 pb-16"
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

        <div className="w-full relative z-10 flex flex-col items-center gap-8 xl:gap-12">
          
          {/* Text Section */}
          <div className="max-w-6xl mx-auto px-4 lg:px-12 w-full text-center space-y-6 xl:pt-8 overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="hero-text-anim text-blue-500 dark:text-yellow-500 text-xl md:text-2xl font-semibold">
                Hello, I'm
              </h2>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-text-anim text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-code mb-4">
                Sayyed Mohammad Adil
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="hero-text-anim text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                I create inclusive, scalable solutions focused on clarity,
                performance, and purpose.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="hero-btn-anim px-8 py-3 bg-blue-500 dark:bg-yellow-500 hover:bg-blue-600 dark:hover:bg-yellow-600 text-white dark:text-gray-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Contact Me
              </a>
              <a
                href="#projects"
                className="hero-btn-anim px-8 py-3 bg-transparent hover:bg-gray-800 text-blue-400 dark:text-yellow-400 border border-blue-400 dark:border-yellow-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Code size={20} />
                View Projects
              </a>
            </div>
          </div>

          {/* 3D Illustration Section - Wide */}
          <div
            ref={workspaceRef}
            className="w-full max-w-[1600px] px-4 md:px-8 mx-auto relative opacity-0 -mt-10 lg:-mt-20" 
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
