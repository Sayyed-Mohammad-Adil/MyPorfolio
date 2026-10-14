import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "Low Code with IoT And Node.js",
    image: "/images/blogs/iot.jpg",
    url: "https://iotnodejs.hashnode.dev/low-code-with-iot-and-nodejs",
    excerpt: "Bridge the gap between hardware and software by using low-code tools with Node.js to rapidly develop and deploy IoT solutions.",
    content: "Low-code platforms combined with Node.js are revolutionizing how connected devices communicate and scale. In this article, we explore building resilient MQTT bridges, managing hardware event loops with asynchronous JavaScript, and designing high-performance IoT middleware.\n\nFrom rapid prototyping with visual Node-RED nodes to production microservices on edge devices, discover how developers can build and deploy industrial-strength IoT solutions in record time.",
    date: "June 20, 2025",
    readTime: "5 min read",
    tag: "IoT & Node"
  },
  {
    id: 2,
    title: "Logic Automation with Node.js",
    image: "/images/blogs/automation.jpg",
    url: "https://ruleenginenodejs.hashnode.dev/logic-automation-with-nodejs",
    excerpt: "Automate complex workflows using Node.js-based logic engines for improved efficiency in connected systems and smart devices.",
    content: "Automating business rules and complex workflows is crucial for modern enterprise systems. In this article, we break down custom rule parser architectures, stateful condition evaluators, and asynchronous execution pipelines built on Node.js.\n\nLearn how to create scalable automation engines that decouple business rules from code, enabling dynamic runtime decisions and frictionless integrations.",
    date: "June 20, 2025",
    readTime: "6 min read",
    tag: "Automation"
  },
  {
    id: 3,
    title: "Mastering React 19",
    image: "/images/blogs/react.jpg",
    excerpt: "Explore the newest features of React 19 and how it changes the game for modern web development.",
    content: "React 19 introduces concurrent rendering at its core, bringing performance improvements to complex applications. In this post, we'll dive deep into useTransition, useDeferredValue, and Server Components. By leveraging these features, you can build applications that feel instant, even on slower devices. We'll also cover the new form actions API which simplifies data mutation drastically. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel accumsan odio, non vehicula diam. In in pulvinar libero, ac vestibulum arcu. Curabitur vel magna sed lectus lacinia hendrerit ut ut dolor.",
    date: "Sep 12, 2026",
    readTime: "5 min read",
    tag: "React"
  },
  {
    id: 4,
    title: "Advanced GSAP Animations",
    image: "/images/blogs/gsap.jpg",
    excerpt: "Learn how to orchestrate complex timelines and scroll-driven animations with GSAP.",
    content: "GSAP is the industry standard for performant, robust animations. In this deep dive, we'll explore ScrollTrigger, ScrollSmoother, and Flip plugins. We'll create a complex page transition that maintains state across routes. Understanding the timeline and easing functions is crucial for creating that 'premium' feel in your websites. Quisque non diam euismod, interdum mauris quis, egestas ipsum. Integer elementum, leo ac convallis sollicitudin, nunc risus vulputate purus, congue porta turpis metus ac turpis.",
    date: "Aug 28, 2026",
    readTime: "7 min read",
    tag: "Animation"
  },
  {
    id: 5,
    title: "Three.js & WebGL Basics",
    image: "/images/blogs/threejs.jpg",
    excerpt: "Step into the 3D web. A beginner-friendly guide to rendering your first 3D scene.",
    content: "Web development is moving into the third dimension. With Three.js and React Three Fiber, building 3D experiences is easier than ever. We'll start by setting up a Canvas, adding lighting, and importing our first 3D model. We'll discuss materials, meshes, and geometries. By the end, you'll have a rotating 3D object on your screen. Vestibulum tristique sapien dui, in sagittis nunc posuere vitae. Praesent vel dolor eu tellus convallis dictum nec eget sapien.",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    tag: "3D"
  },
  {
    id: 6,
    title: "Next.js Architecture Patterns",
    image: "/images/blogs/nextjs.jpg",
    excerpt: "Best practices for structuring large-scale applications using the App Router.",
    content: "The Next.js App Router fundamentally shifts how we build React applications. This article covers advanced routing patterns, intercepting routes, and parallel routes. We'll look at organizing your folder structure for scalability and maintainability. Error handling and loading states will also be discussed. Donec efficitur, nulla a eleifend aliquet, lacus nunc finibus lorem, ut tincidunt risus quam sed felis.",
    date: "Jun 02, 2026",
    readTime: "6 min read",
    tag: "Next.js"
  },
  {
    id: 7,
    title: "Tailwind CSS Pro Tips",
    image: "/images/blogs/react.jpg",
    excerpt: "Move beyond the basics and master Tailwind's arbitrary values and plugins.",
    content: "Tailwind CSS is powerful, but many developers only scratch the surface. We'll dive into creating custom plugins, using arbitrary variants, and optimizing your build size. We'll also explore strategies for maintaining clean markup when dealing with complex responsive designs. Suspendisse potenti. Nam non accumsan eros. Nulla rhoncus mauris a metus ultrices dignissim.",
    date: "May 20, 2026",
    readTime: "4 min read",
    tag: "CSS"
  },
  {
    id: 8,
    title: "The Future of TypeScript",
    image: "/images/blogs/typescript.jpg",
    excerpt: "What's coming in TypeScript 6.0 and how to prepare your codebase.",
    content: "TypeScript continues to evolve, bringing more expressive types and better inference. We'll look at the proposed features for version 6.0, including advanced pattern matching and tighter integration with ECMAScript standards. We'll also cover best practices for migrating legacy JS projects. Aliquam id interdum arcu. Sed sodales elit at odio interdum, sit amet lacinia ipsum lacinia.",
    date: "Apr 10, 2026",
    readTime: "6 min read",
    tag: "TypeScript"
  },
  {
    id: 9,
    title: "Building Micro-Frontends",
    image: "/images/blogs/nextjs.jpg",
    excerpt: "Scaling frontend development across multiple teams using Module Federation.",
    content: "As applications grow, monolithic frontends become hard to manage. Micro-frontends offer a solution. We'll explore Webpack Module Federation, sharing dependencies, and orchestrating deployment across different teams. We'll discuss the pros and cons and when it's appropriate to adopt this architecture. Phasellus in varius libero. Mauris euismod nulla sed tortor ultricies, sit amet sodales eros semper.",
    date: "Mar 05, 2026",
    readTime: "9 min read",
    tag: "Architecture"
  }
];

const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.blog-card');
    
    if (panels.length === 0 || !scrollWrapperRef.current || !containerRef.current) return;

    gsap.to(scrollWrapperRef.current, {
      x: () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + scrollWrapperRef.current!.offsetWidth
      }
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.modal-content', 
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPost]);

  const closeModal = () => {
    gsap.to('.modal-content', {
      y: '100%', 
      opacity: 0, 
      duration: 0.4, 
      ease: "power3.in",
      onComplete: () => setSelectedPost(null)
    });
  };

  return (
    <section id="blog" ref={containerRef} className="py-12 bg-gray-50 dark:bg-gray-950 overflow-hidden relative min-h-screen flex flex-col justify-between">
      {/* Light mode background pattern (Matches live site) */}
      <div className="absolute inset-0 bg-square-light opacity-[.25] pointer-events-none z-0 dark:hidden"></div>

      {/* Dark mode background pattern (Matches live site) */}
      <div className="absolute inset-0 bg-square-dark opacity-[.05] pointer-events-none z-0 hidden dark:block"></div>

      {/* Background Watermark */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-7xl md:text-9xl font-black text-blue-500/[0.03] dark:text-yellow-500/[0.03] tracking-widest pointer-events-none select-none uppercase z-0">
        MY BLOGS
      </div>

      {/* Section Header & Content Hub */}
      <div className="w-full max-w-3xl mx-auto px-4 text-center z-10 pt-4 pb-2 relative">
        {/* Title */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-2">
            My <span className="text-blue-500 dark:text-yellow-400">Blogs</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 dark:bg-yellow-500 opacity-70"></div>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Dive into my thoughts on coding, tech trends, and developer life. Explore my latest posts below.
        </p>

        {/* Tech Topics Pills & Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-4">
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-blue-600 dark:bg-yellow-500 text-white dark:text-gray-950 shadow-sm cursor-default">
            All Articles (9)
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm cursor-default hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-colors">
            🌐 IoT & Node.js
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm cursor-default hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-colors">
            ⚙️ Automation
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm cursor-default hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-colors">
            ⚛️ React 19
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm cursor-default hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-colors">
            ✨ GSAP & 3D
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm cursor-default hover:border-blue-500/50 dark:hover:border-yellow-500/50 transition-colors hidden sm:inline-block">
            📐 System Design
          </span>
        </div>

        {/* Interactive Guide Strip */}
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-400 mt-3.5">
          <span className="inline-flex items-center gap-1 text-blue-500 dark:text-yellow-400">
            <span>✦</span> Verified on Hashnode
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <span>←</span> Swipe / Scroll to Explore <span>→</span>
          </span>
        </div>
      </div>
      
      <div ref={scrollWrapperRef} className="flex w-max items-center px-6 md:px-14 py-4 my-auto">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="blog-card w-[85vw] sm:w-[350px] md:w-[370px] lg:w-[390px] flex-shrink-0 h-[470px] mx-3 md:mx-4 rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800/90 hover:border-blue-500 dark:hover:border-yellow-400 p-5 md:p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            onClick={() => setSelectedPost(post)}
          >
            {/* Top-Right Corner Ambient Glow extending deep into the card */}
            <div className="absolute -right-8 -top-8 w-80 h-80 bg-blue-500/25 dark:bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 dark:group-hover:bg-yellow-500/35 group-hover:scale-110 transition-all duration-500 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/20 via-blue-500/5 to-transparent dark:from-yellow-400/25 dark:via-yellow-400/5 dark:to-transparent rounded-tr-3xl pointer-events-none group-hover:opacity-100 opacity-75 transition-opacity duration-500"></div>
            
            <div>
              {/* Blog Post Cover Image */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative mb-4 border border-gray-200/80 dark:border-gray-800 group-hover:border-blue-500 dark:group-hover:border-yellow-400 transition-colors shadow-md bg-gray-950 flex-shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 dark:bg-yellow-500/90 text-white dark:text-black rounded-full text-xs font-bold tracking-wide uppercase shadow-md backdrop-blur-md">
                  {post.tag}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/70 text-gray-200 rounded-md text-xs font-mono backdrop-blur-md">
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold font-code text-gray-900 dark:text-white mb-2 leading-snug tracking-tight group-hover:text-blue-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-blue-500 dark:text-yellow-400 font-semibold text-sm pt-3 border-t border-gray-100 dark:border-gray-800/80 group-hover:gap-4 transition-all mt-auto">
              <span>Read Article</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </div>
        ))}

        {/* View All on Hashnode End Card */}
        <div className="blog-card w-[85vw] sm:w-[350px] md:w-[370px] lg:w-[390px] flex-shrink-0 h-[470px] mx-3 md:mx-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-yellow-500 dark:to-amber-600 text-white dark:text-gray-950 shadow-xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden group">
          <div className="my-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg">
              📚
            </div>
            <h3 className="text-2xl font-black font-code leading-tight">
              Want to read more?
            </h3>
            <p className="text-white/80 dark:text-gray-900/80 text-xs sm:text-sm max-w-xs">
              Explore all technical publications, system architectures, and IoT tutorials on Hashnode.
            </p>
            <a
              href="https://iotnodejs.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-950 text-gray-900 dark:text-yellow-400 font-bold rounded-xl hover:scale-105 transition-transform shadow-xl mt-3 text-sm"
            >
              <span>View All on Hashnode</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-8">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={closeModal}></div>
          <div className="modal-content relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-gray-950 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-y-auto flex flex-col">
            
            <div className="sticky top-0 w-full flex justify-end p-3 sm:p-5 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-10 pointer-events-none">
              <button 
                onClick={closeModal}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full flex items-center justify-center pointer-events-auto transition-colors shadow-lg border border-gray-200 dark:border-gray-800"
                aria-label="Close article"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-4 sm:p-8 md:p-14 pt-0">
              {/* Modal Cover Image - Full Uncropped View */}
              <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden relative mb-4 sm:mb-8 border border-gray-200 dark:border-gray-800 shadow-xl bg-gray-950 flex items-center justify-center p-1 sm:p-2">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-auto max-h-[50vh] sm:max-h-[65vh] object-contain rounded-lg sm:rounded-xl shadow-lg"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm">
                <span className="text-blue-500 dark:text-yellow-400 font-bold tracking-widest uppercase">{selectedPost.tag}</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                <span className="text-gray-500 font-mono">{selectedPost.date}</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                <span className="text-gray-500 font-mono">{selectedPost.readTime}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                {selectedPost.title}
              </h2>
              
              <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium">
                  {selectedPost.excerpt}
                </p>
                <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mb-6"></div>
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm md:text-base">
                  {selectedPost.content}
                </p>
              </div>

              {(selectedPost as any).url && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                  <a
                    href={(selectedPost as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 dark:bg-yellow-500 text-white dark:text-gray-950 font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg text-xs sm:text-sm"
                  >
                    <span>Read Original on Hashnode</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
