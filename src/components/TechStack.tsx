import React from 'react';
import Marquee from 'react-fast-marquee';

const TechStack = () => {
  const technologies = [
    { icon: '🟨', name: 'JavaScript', color: 'text-yellow-400' },
    { icon: '⚛️', name: 'React', color: 'text-blue-400' },
    { icon: '🟢', name: 'Node.js', color: 'text-green-500' },
    { icon: '🐍', name: 'Python', color: 'text-blue-500' },
    { icon: '🧡', name: 'HTML5', color: 'text-orange-500' },
    { icon: '🔵', name: 'CSS3', color: 'text-blue-500' },
    { icon: '🎨', name: 'SASS', color: 'text-pink-500' },
    { icon: '📦', name: 'Git', color: 'text-orange-600' },
    { icon: '🐳', name: 'Docker', color: 'text-blue-500' },
    { icon: '☁️', name: 'AWS', color: 'text-orange-400' },
    { icon: '🅱️', name: 'Bootstrap', color: 'text-blue-600' },
    { icon: '💚', name: 'Vue.js', color: 'text-green-400' },
    { icon: '🔺', name: 'Angular', color: 'text-red-500' },
    { icon: '🗄️', name: 'PostgreSQL', color: 'text-blue-700' },
    { icon: '🍃', name: 'MongoDB', color: 'text-green-600' },
    { icon: '📦', name: 'Npm', color: 'text-blue-400' },
  ];

  return (
    <section id="techstack" className="relative h-16 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <Marquee
        gradient={false}         // no fade at edges
        speed={50}               // adjust to taste
        pauseOnHover={true}      // hover to pause
        loop={0}                 // 0 = infinite
        className="flex items-center px-10"
      >
        {technologies.map((tech, i) => (
          <div key={i} className="flex items-center gap-10 text-gray-400 whitespace-nowrap">
            <span className={`text-2xl ${tech.color}`}>{tech.icon}</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TechStack;