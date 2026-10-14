import React from 'react';
// import { Star } from 'lucide-react';
import StarRating from './StarRating';
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Riya Sharma',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'CTO, BharatTech',
      quote: "Sayyed's expertise in React and Node.js transformed our app's performance. His attention to detail is unmatched!",
      rating: 5
    },
    {
      name: 'Arjun Mehta',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Product Manager, CodeForge India',
      quote: 'Working with Sayyed was a breeze. He delivered clean, efficient code ahead of schedule.',
      rating: 4
    },
    {
      name: 'Priya Iyer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Founder, StartIndus',
      quote: 'Sayyed\'s creative solutions and dedication made our project a success. Highly recommend!',
      rating: 5
    },
    {
      name: 'Rohan Deshmukh',
      avatar: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Tech Lead, DevDynamos',
      quote: "Sayyed brought fresh ideas and robust architecture to our development team. He's a true professional.",
      rating: 5
    },
    {
      name: 'Sneha Kapoor',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Design Lead, PixelKraft',
      quote: 'His collaboration with the design team was seamless. The final UI exceeded expectations!',
      rating: 4
    },
    {
      name: 'Amit Reddy',
      avatar: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Marketing Director, DigiWave',
      quote: 'From code quality to communication, Sayyed delivers top-tier results every time.',
      rating: 5
    }
  ];
  

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-gray-100/50 dark:bg-gray-900/50 relative flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            What <span className="text-blue-500 dark:text-yellow-400">Clients Say</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 dark:bg-yellow-500 opacity-70"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Hear from those who've worked with me about the impact of my code and collaboration.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-950 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 ring-2 ring-blue-500/30 dark:ring-yellow-400/30">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-bold font-code text-gray-900 dark:text-white truncate">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
              <div className="flex gap-1 pt-2">
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;