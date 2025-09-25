import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // e.g., 4.5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1); // fraction 0-1
        return (
          <div key={i} className="relative w-4 h-4">
            {/* Empty star */}
            <Star size={16} className="absolute text-gray-400 dark:text-gray-600" />
            {/* Filled portion */}
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={16} className="text-blue-400 dark:text-yellow-400 fill-current" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
