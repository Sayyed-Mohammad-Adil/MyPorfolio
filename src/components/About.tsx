import React, { useState, useEffect } from 'react';
import { User, Code, Github } from 'lucide-react';
import ContributionGrid from './ContributionGrid';



const About = () => {
  const [skillProgress, setSkillProgress] = useState({ frontend: 0, backend: 0, devops: 0, mobile: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateSkills();
        }
      },
      { threshold: 0.3 }
    );

    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
    return () => observer.disconnect();
  }, [isVisible]);

  const animateSkills = () => {
    const targets = { frontend: 90, backend: 85, devops: 75, mobile: 65 };
    Object.keys(targets).forEach((skill) => {
      let current = 0;
      const target = targets[skill];
      const increment = target / 60;
      const animate = () => {
        current += increment;
        if (current >= target) {
          setSkillProgress((prev) => ({ ...prev, [skill]: target }));
        } else {
          setSkillProgress((prev) => ({ ...prev, [skill]: Math.round(current) }));
          requestAnimationFrame(animate);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), Math.random() * 500);
    });
  };

  const technologies = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Python', 'Docker', 'Git'];

  return (
    <section id="about" className="py-20 lg:py-20 px-4 sm:px-6 md:px-8 bg-gray-900/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-code inline-block relative text-white mb-1">
            About <span className="text-green-400">Me</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Passionate developer with a love for clean code, strong coffee, and open source contributions.
          </p>
        </div>

        <div className="bg-gray-950 rounded-lg p-4 sm:p-6 shadow-2xl border border-gray-800 mb-8 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 pb-4 mb-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-600 overflow-hidden">
                <img src="/723a59af-6724-4a39-9949-defb49f5695f.jpg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-gray-300 font-semibold text-sm sm:text-base">github.com/sayyedmohammadadil</span>
            </div>
          </div>

          <ContributionGrid />

          <div className="text-center mt-10 mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-code text-white mb-2">Sayyed Mohammad Adil</h3>
            <p className="text-green-400 text-base sm:text-lg lg:text-xl">Full-Stack Developer & Open Source Enthusiast</p>
          </div>

          <div className="flex justify-center mb-4">
            <a
              href="https://github.com/Sayyed-Mohammad-Adil/MyPorfolio"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg border border-gray-600 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <Github size={18} className="text-green-400" />
              Fork My Portfolio
              <span className="bg-gray-700 text-gray-300 text-xs rounded-full px-2 py-0.5 ml-1">14</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto ">
          <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold font-code text-white mb-4 flex items-center gap-2">
              <User className="text-green-400" size={20} /> Who I Am
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
              I'm a passionate developer with 4+ years of experience building web applications and contributing to open source projects.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              When I'm not coding, I explore tech trends, write blogs, or enjoy debugging with coffee.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-700/20 p-3 rounded">
                <div className="text-xl font-bold text-green-400">50</div>
                <div className="text-xs text-gray-400">Repositories</div>
              </div>
              <div className="bg-gray-700/20 p-3 rounded">
                <div className="text-xl font-bold text-green-400">1k</div>
                <div className="text-xs text-gray-400">Commits</div>
              </div>
              <div className="bg-gray-700/20 p-3 rounded">
                <div className="text-xl font-bold text-green-400">10</div>
                <div className="text-xs text-gray-400">PRs Merged</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold font-code text-white mb-4 flex items-center gap-2">
              <Code className="text-green-400" size={20} /> My Toolbox
            </h3>

            <div className="space-y-4">
              {Object.entries(skillProgress).map(([skill]) => (
                <div key={skill} className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
                  <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]"></span>
                    <span className="capitalize">{skill}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-xs sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;