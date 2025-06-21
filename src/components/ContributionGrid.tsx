import React, { useState } from 'react';

const ContributionGrid = () => {
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

  const getCellClass = (weekIndex: number, dayIndex: number) => {
    const index = (weekIndex * 7) + dayIndex + 1;
    return pattern.includes(index) ? 'bg-green-500' : 'bg-gray-700';
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
    <div className="overflow-x-auto max-w-5xl mx-auto">
      <div className="w-full flex flex-col">
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
