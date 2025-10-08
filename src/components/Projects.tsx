import React from 'react';
import { CheckSquare, ShoppingCart, User, Github, ExternalLink } from 'lucide-react';

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
      title: 'Portfolio',
      description: 'My personal portfolio showcasing my work, built with HTML, TailwindCSS, and React.js.',
      image: '/images/projects/Portfolio.png',
      technologies: ['HTML', 'TailwindCSS', 'Alpine.js'],
      icon: <User className="text-blue-400 dark:text-yellow-400 led-glow" />,
      githubUrl: 'https://github.com/Sayyed-Mohammad-Adil/MyPorfolio',
      liveUrl: 'https://sma-dev.lovable.app/'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100/50 dark:bg-gray-900/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            Latest <span className="text-blue-400 dark:text-yellow-400">Projects</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 dark:bg-yellow-500 opacity-70"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A collection of my recent work, showcasing innovative solutions and clean code. Click to explore details.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-950 rounded-lg flex flex-col border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover object-center transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-code text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  {project.icon} {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700/20 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={project.githubUrl}
                    className="text-gray-600 hover:text-blue-600 dark:hover:text-yellow-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-yellow-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 dark:text-yellow-400 hover:text-blue-600 dark:hover:text-yellow-400  font-medium flex items-center gap-2"
                  >
                    <ExternalLink size={20} />
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