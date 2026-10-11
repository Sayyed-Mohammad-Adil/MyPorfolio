import React, { useState, useEffect, useRef } from 'react';

interface ContributionGridProps {
  onCelebrate?: (isCelebrating: boolean) => void;
}

const ContributionGrid = ({ onCelebrate }: ContributionGridProps = {}) => {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const pattern = [
    23, 24, 25, 26, 27, 29, 35, 36, 42, 44, 48, 58, 59, 60, 61, 62, 64, 70, 71, 77, 79, 80,
    81, 82, 83, 92, 93, 94, 95, 96, 97, 98, 99, 105, 106, 112, 114, 115, 116, 117, 118,
    127, 128, 129, 130, 131, 132, 133, 141, 142, 143, 144, 145, 146, 147, 150, 158, 166,
    169, 170, 171, 172, 173, 174, 175, 184, 185, 186, 187, 188, 190, 193, 196, 197, 200,
    203, 205, 207, 208, 209, 228, 235, 240, 241, 242, 243, 244, 249, 256, 275, 276, 277,
    278, 279, 282, 287, 289, 294, 296, 301, 303, 308, 310, 315, 317, 318, 319, 320, 321,
    325, 328, 332, 335, 340, 341
  ];

  // Massive Horizontal Trophy (Rotated 90 degrees to be incredibly tall across the weeks)
  const trophyPattern = [
    // Base
    (16*7)+1, (16*7)+2, (16*7)+3, (16*7)+4, (16*7)+5,
    (17*7)+2, (17*7)+3, (17*7)+4,
    // Stem
    (18*7)+3, (19*7)+3, (20*7)+3, (21*7)+3, (22*7)+3, (23*7)+3,
    // Bowl Body (Rows 2, 3, 4)
    ...[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34].flatMap(w => [
      (w*7)+2, (w*7)+3, (w*7)+4
    ]),
    // Top Lip (Rows 1, 2, 3, 4, 5)
    ...[35, 36].flatMap(w => [
      (w*7)+1, (w*7)+2, (w*7)+3, (w*7)+4, (w*7)+5
    ]),
    // Top Handle (Row 0)
    (28*7)+0, (29*7)+0, (30*7)+0, (31*7)+0, (32*7)+0,
    // Top Handle Connectors (Row 1)
    (27*7)+1, (33*7)+1,
    // Bottom Handle (Row 6)
    (28*7)+6, (29*7)+6, (30*7)+6, (31*7)+6, (32*7)+6,
    // Bottom Handle Connectors (Row 5)
    (27*7)+5, (33*7)+5,
  ];

  // Sort patterns into a continuous vertical zig-zag path (y-axis / column by column)
  const verticalZigZagSort = (a: number, b: number) => {
    const weekA = Math.floor((a - 1) / 7);
    const dayA = (a - 1) % 7;
    const weekB = Math.floor((b - 1) / 7);
    const dayB = (b - 1) % 7;
    
    // Sort by column (y-axis) first
    if (weekA !== weekB) return weekA - weekB; 
    
    // Even columns go top to bottom, Odd columns go bottom to top to stay smooth
    return weekA % 2 === 0 ? dayA - dayB : dayB - dayA;
  };

  // Snake traverses every single block vertically line by line (364 blocks total)
  const fullSnakePath = Array.from({ length: 364 }, (_, i) => i + 1).sort(verticalZigZagSort);

  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [eatenPattern, setEatenPattern] = useState<number[]>([]);
  const [poopPattern, setPoopPattern] = useState<number[]>([]);
  const [snakeHead, setSnakeHead] = useState<number>(fullSnakePath[0]);
  const [snakeBody, setSnakeBody] = useState<number[]>([]);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    if (onCelebrate) {
      onCelebrate(isCelebrating);
    }
  }, [isCelebrating, onCelebrate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Reset state when restarting animation
    setSnakeHead(fullSnakePath[0]);
    setSnakeBody([]);
    setEatenPattern([]);
    setPoopPattern([]);
    setIsCelebrating(false);

    let step = -10; // ~3 second initial delay to show the greens
    const interval = setInterval(() => {
      const currentStep = step;
      const pathLength = fullSnakePath.length;
      
      if (currentStep < 0) {
        // Hold/Pause state - do nothing while greens are visible
      } else if (currentStep < pathLength) {
        // FORWARD PHASE: Eating the grid
        const itemToEat = fullSnakePath[currentStep];
        setSnakeHead(itemToEat);
        setEatenPattern(prev => [...prev, itemToEat]);
        
        // Snake grows by 1 every 4 blocks it eats
        const currentLength = 3 + Math.floor(currentStep / 4);
        const body = fullSnakePath.slice(Math.max(0, currentStep - currentLength), currentStep);
        setSnakeBody(body);
        
      } else if (currentStep < pathLength * 2) {
        // REVERSE PHASE: Going back and building the Trophy
        const reverseStep = currentStep - pathLength;
        const currentPos = pathLength - 1 - reverseStep;
        const itemPos = fullSnakePath[currentPos];
        
        setSnakeHead(itemPos);
        
        // If the current block is part of the Trophy, form it!
        if (trophyPattern.includes(itemPos)) {
          setPoopPattern(prev => {
            if (!prev.includes(itemPos)) return [...prev, itemPos];
            return prev;
          });
        }
        
        // Body trails behind the reverse movement
        const currentLength = 3 + Math.floor(pathLength / 4);
        const tailStart = Math.min(pathLength - 1, currentPos + currentLength);
        const body = fullSnakePath.slice(currentPos + 1, tailStart + 1).reverse();
        setSnakeBody(body);
        
      } else if (currentStep < (pathLength * 2) + 15) {
        // CELEBRATION PHASE: Sparkles!
        setIsCelebrating(true);
        setSnakeHead(-1);
        setSnakeBody([]);
      } else {
        // Reset and pause to show greens
        step = -10;
        setSnakeHead(fullSnakePath[0]);
        setSnakeBody([]);
        setEatenPattern([]);
        setPoopPattern([]);
        setIsCelebrating(false);
      }
      step++;
    }, 200); // Slowed down speed for a smoother, relaxed animation

    return () => clearInterval(interval);
  }, [isVisible]);

  const getCellClass = (weekIndex: number, dayIndex: number) => {
    const index = (weekIndex * 7) + dayIndex + 1;
    
    // 1. Snake Head (Red Oval/Round)
    if (index === snakeHead) return 'bg-red-500 scale-[2.5] relative z-30 shadow-[0_0_15px_#ef4444] rounded-full transition-all duration-200';
    
    // 2. Snake Body (Multi-color Rainbow effect, thick front, thin tail)
    const bodyIndex = snakeBody.indexOf(index);
    if (bodyIndex !== -1) {
      const ratio = bodyIndex / (snakeBody.length - 1 || 1);
      
      let scaleClass = 'scale-50';
      if (ratio > 0.85) scaleClass = 'scale-[1.35]';
      else if (ratio > 0.7) scaleClass = 'scale-125';
      else if (ratio > 0.5) scaleClass = 'scale-110';
      else if (ratio > 0.3) scaleClass = 'scale-90';
      else if (ratio > 0.15) scaleClass = 'scale-75';

      const colors = [
        'bg-purple-500', 'bg-indigo-500', 'bg-blue-500', 
        'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'
      ];
      // Tail is purple, segments closer to head go towards red
      const color = colors[(snakeBody.length - 1 - bodyIndex) % colors.length];
      return `${color} ${scaleClass} relative z-10 rounded-full transition-all duration-200 opacity-90 shadow-md`;
    }
    // 3. Trophy Pattern (Theme aware + Sparkles)
    if (poopPattern.includes(index)) {
      const sparkleClass = isCelebrating ? 'animate-sparkle' : '';
      return `bg-blue-500 shadow-[0_0_10px_#3b82f6] dark:bg-yellow-400 dark:shadow-[0_0_10px_#facc15] ${sparkleClass} transition-all duration-300`;
    }
    // 4. Eaten CODING
    if (pattern.includes(index) && eatenPattern.includes(index)) return 'bg-gray-700';
    // 5. Uneaten CODING
    if (pattern.includes(index)) return 'bg-green-500 shadow-[0_0_5px_#22c55e]';
    
    return 'bg-gray-700';
  };

  const showTooltip = (weekIndex: number, dayIndex: number, event: React.MouseEvent) => {
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + (weekIndex * 7) + dayIndex);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const index = (weekIndex * 7) + dayIndex + 1;
    const contributions = pattern.includes(index)
      ? Math.floor(Math.random() * 15) + 10
      : Math.floor(Math.random() * 10) + 5;

    setTooltip({
      show: true,
      text: `${contributions} contributions on ${formattedDate}`,
      x: event.pageX + 10,
      y: event.pageY + 10
    });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  return (
    <div ref={gridRef} className="overflow-x-auto max-w-5xl mx-auto">
      <div className="w-full flex flex-col relative">
        {/* Month Labels */}
        <div className="flex mb-1 pl-8">
          {months.map((month, index) => (
            <div key={index} className="text-xs text-gray-500 flex-shrink-0 w-[67.2px]">
              {month}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          {/* Day Labels */}
          <div className="flex flex-col justify-around h-full text-xs text-gray-500 pr-2 w-8">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>

          {/* Contribution Grid */}
          <div className="grid grid-flow-col auto-cols-min gap-1.5">
            {Array.from({ length: 52 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm cursor-pointer ${getCellClass(weekIndex, dayIndex)}`}
                    onMouseEnter={(e) => showTooltip(weekIndex, dayIndex, e)}
                    onMouseLeave={hideTooltip}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed bg-gray-800 text-white text-xs p-2 rounded shadow-lg border border-gray-700 z-20 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default ContributionGrid;
