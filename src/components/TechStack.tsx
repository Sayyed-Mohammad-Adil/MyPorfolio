import React from "react";
import Marquee from "react-fast-marquee";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiVuedotjs,
  SiAngular,
  SiElectron,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiAmazon,
  SiNpm,
  SiBun,
  SiPnpm,
} from "react-icons/si";

interface Technology {
  icon: React.ReactNode;
  name: string;
  color: string;
}

const TechStack: React.FC = () => {
  const technologies: Technology[] = [
    // 🧱 Frontend Core
    { icon: <SiHtml5 />, name: "HTML5", color: "text-orange-500" },
    { icon: <SiCss3 />, name: "CSS3", color: "text-blue-500" },
    { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-400" },
    { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-400" },

    // ⚛️ Frontend Libraries & Frameworks
    { icon: <SiReact />, name: "React", color: "text-sky-400" },
    { icon: <SiRedux />, name: "Redux", color: "text-purple-500" },
    { icon: <SiVuedotjs />, name: "Vue.js", color: "text-green-400" },
    { icon: <SiAngular />, name: "Angular", color: "text-red-500" },
    { icon: <SiElectron />, name: "Electron", color: "text-sky-400" },
    { icon: <SiBootstrap />, name: "Bootstrap", color: "text-purple-600" },
    { icon: <SiTailwindcss />, name: "TailwindCSS", color: "text-sky-400" },
    { icon: <SiSass />, name: "SASS", color: "text-pink-500" },

    // 🖥️ Backend
    { icon: <SiNodedotjs />, name: "Node.js", color: "text-green-500" },
    { icon: <SiPython />, name: "Python", color: "text-blue-500" },

    // 🗄️ Databases
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "text-blue-700" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-600" },

    // 🧰 DevOps / Tools
    { icon: <SiGit />, name: "Git", color: "text-orange-600" },
    { icon: <SiDocker />, name: "Docker", color: "text-blue-500" },
    { icon: <SiAmazon />, name: "AWS", color: "text-orange-400" },
    { icon: <SiNpm />, name: "NPM", color: "text-red-500" },
    { icon: <SiPnpm />, name: "pnpm", color: "text-yellow-500" },
    { icon: <SiBun />, name: "Bun", color: "text-black-700 dark:text-white" },
  ];

  return (
    <section
      id="techstack"
      className="relative h-20 bg-gray-300 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center overflow-hidden"
    >
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover
        loop={0}
        className="flex items-center px-10"
      >
        {technologies.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-8 text-gray-900 dark:text-gray-300 whitespace-nowrap hover:opacity-90"
          >
            <span
              className={`text-2xl transition-transform duration-300 hover:scale-125 ${tech.color}`}
            >
              {tech.icon}
            </span>
            <span className="text-xl">{tech.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TechStack;
