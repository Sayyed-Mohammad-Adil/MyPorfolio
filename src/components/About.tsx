import React, { useState, useEffect } from 'react';
import { User, Code, Github } from 'lucide-react';
import ContributionGrid from './ContributionGrid';

const About = () => {
  const [skillProgress, setSkillProgress] = useState({
    frontend: 0,
    backend: 0,
    devops: 0,
    mobile: 0,
  });

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
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateSkills = () => {
    const targets = { frontend: 90, backend: 85, devops: 75, mobile: 65 };

    Object.keys(targets).forEach((skill) => {
      let current = 0;
      const target = targets[skill as keyof typeof targets];
      const increment = target / 60; // 60 frames for smooth animation

      const animate = () => {
        current += increment;
        if (current >= target) {
          setSkillProgress(prev => ({ ...prev, [skill]: target }));
        } else {
          setSkillProgress(prev => ({ ...prev, [skill]: Math.round(current) }));
          requestAnimationFrame(animate);
        }
      };

      setTimeout(() => requestAnimationFrame(animate), Math.random() * 500);
    });
  };

  const technologies = [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Python', 'Docker', 'Git'
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-900/50 relative flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-white mb-1">
            About <span className="text-green-400">Me</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Passionate developer with a love for clean code, strong coffee, and open source contributions.
          </p>
        </div>

        <div className="relative lg:max-w-5xl mx-auto lg:px-12">
          {/* GitHub Contribution Grid */}
          <div className="bg-gray-950 rounded-lg p-4 lg:p-6 shadow-2xl border border-gray-800 mb-8">
            {/* GitHub-style Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <img
                    src="/723a59af-6724-4a39-9949-defb49f5695f.jpg"
                    alt="Client avatar"
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />

                </div>
                <span className="text-gray-300 font-semibold hidden sm:inline-block">github.com/sayyedmohammadadil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="hidden lg:flex items-center gap-1 text-gray-400">
                  <span className="w-3 h-3 rounded-sm bg-gray-600"></span>
                  <span>Less</span>
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span key={level} className={`w-3 h-3 rounded-sm bg-green-${level * 100 + 400}`}></span>
                  ))}
                </div>
                <div className="hidden lg:flex items-center gap-1 text-gray-400">
                  <span>More</span>
                </div>
              </div>
            </div>

            <ContributionGrid />

            {/* Name and Role */}
            <div className="text-center mt-10 mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold font-code text-white mb-2">
                Sayyed Mohammad Adil
              </h3>
              <p className="text-green-400 text-lg lg:text-xl">
                Full-Stack Developer & Open Source Enthusiast
              </p>
            </div>

            {/* Fork My Portfolio CTA */}
            <div className="flex justify-center mb-4">
              <a
                href="https://github.com/Sayyed-Mohammad-Adil/MyPorfolio"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg border border-gray-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Github size={20} className="text-green-400" />
                Fork My Portfolio
                <span className="bg-gray-700 text-gray-300 text-xs rounded-full px-2 py-0.5 ml-1">14</span>
              </a>
            </div>
          </div>

          {/* Skills and Technologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* About Me Text */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold font-code text-white mb-4 flex items-center gap-2">
                <User className="text-green-400" size={20} />
                Who I Am
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I'm a passionate developer with 4+ years of experience building web applications and contributing to open source projects. I specialize in creating clean, efficient, and maintainable code.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, writing tech articles, or enjoying a fresh cup of coffee while debugging complex problems.
              </p>

              {/* GitHub Stats */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">152</div>
                  <div className="text-xs text-gray-400">Repositories</div>
                </div>
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">4.2k</div>
                  <div className="text-xs text-gray-400">Commits</div>
                </div>
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">87</div>
                  <div className="text-xs text-gray-400">PRs Merged</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold font-code text-white mb-4 flex items-center gap-2">
                <Code className="text-green-400" size={20} />
                My Toolbox
              </h3>

              <div className="space-y-4">
                {Object.entries(skillProgress).map(([skill, progress]) => (
                  <div key={skill} className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
                    <span className="text-gray-300 capitalize">🔘 {skill}</span>
                    {/* <span className="text-green-400 font-mono">{progress}%</span> */}
                  </div>
                ))}

              </div>

              {/* Technology Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="absolute top-40 right-28 lg:right-40 w-48 h-48">
          <div className="w-full h-full grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-24 left-28 lg:left-40 w-48 h-48">
          <div className="w-full h-full grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;