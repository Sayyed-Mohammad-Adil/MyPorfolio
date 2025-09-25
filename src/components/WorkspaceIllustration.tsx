
import React, { useEffect, useState } from "react";

interface WorkspaceIllustrationProps {
  typingLines: string[];
  showLaptop: boolean;
}

const WorkspaceIllustration: React.FC<WorkspaceIllustrationProps> = ({
  typingLines,
  showLaptop,
}) => {
  const getLine = (index: number) => typingLines[index] || "";
  const [isAnimating, setIsAnimating] = useState(false);

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const radius = 25;
  const center = 30;
  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = (360 / 12) * hour + (30 / 60) * minute;
  const minuteAngle = (360 / 60) * minute;
  const secondAngle = (360 / 60) * second;

  const getHandCoords = (angle: number, length: number) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: center + length * Math.sin(rad),
      y: center - length * Math.cos(rad),
    };
  };

  const hourCoords = getHandCoords(hourAngle, radius * 0.5);
  const minuteCoords = getHandCoords(minuteAngle, radius * 0.8);
  const secondCoords = getHandCoords(secondAngle, radius * 0.9);

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimating(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full xl:w-1/100 mx-auto relative mb-12">
      <div className="workspace-container relative w-full aspect-video">
        {/* Enhanced Neon Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/50 blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/50 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/30 blur-2xl animate-pulse delay-500"></div>

        {/* Desk Surface */}
        <div className="absolute -bottom-8 w-full h-40 rounded-lg bg-gradient-to-br from-gray-300 dark:from-gray-700 via-gray-350 dark:via-gray-800 to-gray-500 dark:to-gray-900 shadow-2xl neon-border border-2">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        {/* Monitor */}

        <div
          className="
    absolute top-0 left-1/2
    w-4/5 aspect-video
    bg-black rounded-lg border border-gray-600 shadow-2xl
    flex flex-col mb-0
    transform -translate-x-1/2
    origin-top
    
  "
        >
          {/* Monitor Stand */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-1/2 h-4 bg-gray-200  border border-gray-600 dark:bg-gray-600 rounded-b-sm"></div>

          {/* Monitor Screen */}
          <div className="flex-1 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
            {/* Terminal Window */}
            <div className="absolute inset-2 bg-white dark:bg-black rounded border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-100 dark:bg-gray-800 p-1 md:p-2 flex items-center justify-between">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3  bg-blue-500  dark:bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>

                <div
                  className=" text-blue-400 dark:text-yellow-300   font-mono
          text-[6px]    /* default on very small screens */
          sm:text-xs    /* ≥640px */
          lg:text-sm    /* ≥1024px */
          flex flex-col gap-2"
                >
                  adil@dev-workspace
                </div>
              </div>

              {/* Terminal Content */}
              <div
                className="
          p-2 flex-1 font-mono
          text-[6px]    /* default on very small screens */
          sm:text-xs    /* ≥640px */
          lg:text-sm    /* ≥1024px */
          flex flex-col gap-2
        "
              >
                {/* Top Row: Info Left, Clock Right */}
                <div className="flex justify-between items-start">
                  {/* Terminal Info on Left */}
                  <div>
                    <pre className="text-green-500">
                      <span className="text-blue-400 dark:text-yellow-400 font-mono
          text-[6px]    /* default on very small screens */
          sm:text-xs    /* ≥640px */
          lg:text-sm    /* ≥1024px */">
                        adil@dev-workspace
                      </span>
                      {`\n`}
                      <span className="text-gray-400 font-mono
          text-[6px]    /* default on very small screens */
          sm:text-xs    /* ≥640px */
          lg:text-sm    /* ≥1024px */ ">------------------</span>
                      
                    </pre>
                    <pre>
                      <span className="text-purple-400">OS:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(0)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Host:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(1)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Kernel:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(2)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Uptime:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(3)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Languages:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(4)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Editor:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(5)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Frameworks:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(6)}</span>
                    </pre>
                    <pre>
                      <span className="text-purple-400">Version:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">{getLine(7)}</span>
                    </pre>
                  </div>

                  {/* Clock on Right */}
                  <div className="flex justify-end ">
                    <svg
                      viewBox="0 0 60 60"
                      className="
                           text-gray-900 dark:text-white
                            w-12 h-12        
                             sm:w-16 sm:h-16  
                           md:w-20 md:h-20 
                           lg:w-24 lg:h-24  
 "
                    >
                      {/* Outer Circle */}
                      <circle
                        cx="30"
                        cy="30"
                        r="33"
                        className="stroke-gray-400 dark:stroke-gray-600 fill-gray-200 dark:fill-gray-400"
                      />

                      {/* Clock Numbers */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i + 1) * 30 * (Math.PI / 180);
                        const radius = 23;
                        const x = 30 + radius * Math.sin(angle);
                        const y = 30 - radius * Math.cos(angle);
                        return (
                          <text
                            key={i}
                            x={x}
                            y={y + 2}
                            textAnchor="middle"
                            fontSize="4"
                            className="fill-gray-900 dark:fill-white"
                          >
                            {i + 1}
                          </text>
                        );
                      })}

                      {/* Arrow-shaped Hour Hand */}
                      <polygon
                        points={`${30},${30} ${hourCoords.x - 1},${
                          hourCoords.y
                        } ${hourCoords.x + 1},${hourCoords.y}`}
                        className="fill-gray-900 dark:fill-white"
                      />

                      {/* Arrow-shaped Minute Hand */}
                      <polygon
                        points={`${30},${30} ${minuteCoords.x - 1},${
                          minuteCoords.y
                        } ${minuteCoords.x + 1},${minuteCoords.y}`}
                        fill="white"
                      />

                      {/* Arrow-shaped Second Hand */}
                      <polygon
                        points={`${30},${30} ${secondCoords.x - 0.5},${
                          secondCoords.y
                        } ${secondCoords.x + 0.5},${secondCoords.y}`}
                        fill="red"
                      />

                      {/* Center Dot */}
                      <circle cx="30" cy="30" r="2" className="fill-gray-900 dark:fill-white" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop */}
        <div
          className={`absolute -bottom-12 right-0 w-2/5 aspect-video transition-all duration-[2000ms] ease-in-out ${
            showLaptop ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          {/* Laptop Stand */}
          <div className="absolute bottom-2 sm:bottom-8 w-full h-4 bg-gray-700 rounded-b-sm"></div>

          {/* Laptop Screen */}
          <div className="absolute bottom-[calc(25%-1px)] w-full aspect-video bg-gray-700 border border-gray-700 rounded-t-sm flex flex-col px-1">
            {/* Laptop Header */}
            <div className="h-1 bg-gray-700 flex items-center justify-center">
              <div className="w-1 h-1 bg-gray-300 rounded-full border border-black"></div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 bg-white dark:bg-black flex rounded-b">
              {/* Sidebar */}
              <div className="w-2 bg-gray-200 dark:bg-gray-800 flex flex-col items-center py-1 gap-0.5">
                <div className="w-1 h-1.5 bg-gray-700 rounded border border-gray-900 "></div>
                <div className="w-1 h-1.5 bg-gray-700 rounded  border border-gray-900"></div>
                <div className="w-1 h-1.5 bg-yellow-500 dark:bg-blue-500 rounded border border-gray-900"></div>
                <div className="w-1 h-1.5 bg-gray-700 rounded  border border-gray-900"></div>
              </div>

              {/* Code Editor (Prettified Static Display) */}
              <div className="flex-1 p-1 overflow-hidden">
                <pre className="font-mono text-[0.3rem] lg:text-[0.4rem] leading-tight text-left whitespace-pre-wrap">
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-blue-400">React</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-yellow-400">'react'</span>;
                  <br />
                  <br />
                  <div className="bg-blue-800/40 px-1 rounded select-none">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-yellow-400">DevWorkspace</span> = ()
                    =&gt; &#123;
                  </div>
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">const</span> [
                  <span className="text-blue-400">isLoading</span>,{" "}
                  <span className="text-blue-400">setIsLoading</span>] ={" "}
                  <span className="text-yellow-400">React</span>.
                  <span className="text-blue-400">useState</span>(
                  <span className="text-orange-400">true</span>);
                  <br />
                  &nbsp;&nbsp;<span className="text-purple-400">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-blue-400">div</span>{" "}
                  <span className="text-yellow-400">className</span>=
                  <span className="text-yellow-400">"workspace"</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
                  <span className="text-blue-400">isLoading</span> ? (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-blue-400">LoadingScreen</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) : (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="text-blue-400">Projects</span> /&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&#125;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                  <span className="text-blue-400">div</span>&gt;
                  <br />
                  &nbsp;&nbsp;);
                  <br />
                  &#125;;
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Notes */}
        <div
          className={`relative top-10 left-2 md:left-6 w-6 h-6 md:w-12 md:h-12  bg-blue-200 dark:bg-yellow-200 rounded shadow-lg transform transition-all duration-700 ${
            isAnimating ? "opacity-100 rotate-[-15deg]" : "opacity-0 rotate-0"
          }`}
          style={{ transformOrigin: "top left" }}
        >
          <div className="w-full h-full p-1">
            <div className="text-center text-gray-800 font-bold text-[0.4rem] lg:text-[0.5rem]">
              TODO:
            </div>
            <div className="text-center text-gray-800 text-[0.4rem] leading-tight">
              Fix navbar
            </div>
          </div>
        </div>

        <div
          className={`absolute top-24 md:top-32 left-3 md:left-8 w-6 h-6 md:w-12 md:h-12 bg-yellow-200 dark:bg-blue-200 rounded shadow-lg transform transition-all duration-700  ${
            isAnimating ? "opacity-100 rotate-[10deg]" : "opacity-0 rotate-0"
          }`}
          style={{ transformOrigin: "top left" }}
        >
          <div className="w-full h-full p-1">
            <div className="text-center text-gray-800 font-bold text-[0.4rem] lg:text-[0.5rem]">
              IDEA:
            </div>
            <div className="text-center text-gray-800 text-[0.4rem] leading-tight">
              Portfolio
            </div>
          </div>
        </div>

        {/* Coffee Cup with Steam Animation */}
       <div
  className={`
    absolute -bottom-4 md:-bottom-2 left-10
    w-12 h-16
    transition-all duration-1000 delay-300
    transform origin-bottom-left
    scale-75       /* mobile: 75% size */
    md:scale-100   /* ≥768px: 100% size */
    ${isAnimating
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4"
    }
  `}
>
  {/* Coffee Cup Handle */}
  <div className="absolute -right-3 top-6 h-6 w-6 border-2 border-gray-700 rounded-r-full"></div>

  {/* Coffee Cup Base */}
  <div className="absolute bottom-0 w-full h-8 bg-gray-700 rounded-b-lg"></div>

  {/* Coffee */}
  <div className="absolute bottom-6 w-full h-6 bg-gray-600 rounded-lg">
    <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900"></div>
  </div>

  {/* Cup Highlight */}
  <div className="absolute w-4 h-1 bg-white/20 rounded-full left-2 top-2"></div>

  {/* Animated Steam */}
  <div className="absolute w-1 h-3 bg-white bg-opacity-40 rounded-full left-3 -top-2 animate-pulse"></div>
  <div className="absolute w-1 h-4 bg-white bg-opacity-30 rounded-full left-5 -top-3 animate-pulse delay-300"></div>
  <div className="absolute w-1 h-3 bg-white bg-opacity-35 rounded-full left-7 -top-2 animate-pulse delay-700"></div>

  {/* Coffee Label */}
  <div className="absolute left-1 bottom-2 text-[6px] text-gray-300 font-bold tracking-widest">
    COFFEE
  </div>
</div>
      </div>
    </div>
  );
};

export default WorkspaceIllustration;
