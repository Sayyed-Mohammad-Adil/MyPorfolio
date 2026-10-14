import React from 'react';
import { CheckSquare, ShoppingCart, Layers, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Priortiq',
      description: 'A task management app with real-time collaboration, built using React, Node.js, and MongoDB.',
      image: '/images/projects/Priortiq.png',
      technologies: ['React', 'Node.js', 'MongoDB'],
      icon: <CheckSquare className="text-blue-400 dark:text-yellow-400 led-glow" />,
      githubUrl: 'https://github.com/Sayyed-Mohammad-Adil/Prioritiq',
      liveUrl: 'https://prioritiq.vercel.app/'
    },
    {
      title: 'EliteSell',
      description: 'A scalable e-commerce platform with Next.js, Node.js, Stripe payments, and TailwindCSS.',
      image: '/images/projects/elitesell.png',
      technologies: ['Next.js', 'Stripe', 'TailwindCSS'],
      icon: <ShoppingCart className="text-blue-400 dark:text-yellow-400 led-glow" />,
      githubUrl: 'https://github.com/Sayyed-Mohammad-Adil/EliteSell',
      liveUrl: 'https://elitesell.vercel.app/'
    },
    {
      title: 'MSQE',
      description: 'Lightweight, partition-based message queue engine with wildcard routing, QoS delivery levels, and zero external infrastructure.',
      image: '/images/projects/msqe.png',
      technologies: ['TypeScript', 'Node.js', 'WebSocket', 'npm'],
      icon: <Layers className="text-blue-400 dark:text-yellow-400 led-glow" />,
      githubUrl: 'https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise',
      liveUrl: 'http://msqe.org/'
    }
  ];

  return (
    <section id="projects" className="py-14 sm:py-20 bg-gray-100/50 dark:bg-gray-900/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            Latest <span className="text-blue-500 dark:text-yellow-400">Projects</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 dark:bg-yellow-500 opacity-70"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            A collection of my recent work, showcasing innovative solutions and clean code. Click to explore details.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 rounded-2xl flex flex-col border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-video bg-gray-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      title="Source Code"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-code text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    {project.icon} <span>{project.title}</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-850 gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 text-xs font-semibold transition-colors"
                  >
                    <Github size={15} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-yellow-400/10 text-blue-600 dark:text-yellow-400 hover:bg-blue-100 dark:hover:bg-yellow-400/20 text-xs font-semibold transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;