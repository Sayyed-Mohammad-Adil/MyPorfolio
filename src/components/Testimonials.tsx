import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'CEO, TechTrend',
      quote: 'Sayyed\'s expertise in React and Node.js transformed our app\'s performance. His attention to detail is unmatched!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Product Manager, InnovateCo',
      quote: 'Working with Sayyed was a breeze. He delivered clean, efficient code ahead of schedule.',
      rating: 4
    },
    {
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Founder, StartUpX',
      quote: 'Sayyed\'s creative solutions and dedication made our project a success. Highly recommend!',
      rating: 5
    },
    {
      name: 'David Johnson',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'CTO, WebCore Solutions',
      quote: 'Sayyed brought fresh ideas and robust architecture to our development team. He\'s a true professional.',
      rating: 5
    },
    {
      name: 'Anna Lee',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Design Lead, Creativa',
      quote: 'His collaboration with the design team was seamless. The final UI exceeded expectations!',
      rating: 4
    },
    {
      name: 'Vivian Gomez',
      avatar: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      role: 'Marketing Director, BrandReach',
      quote: 'From code quality to communication, Sayyed delivers top-tier results every time.',
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gray-900/50 relative flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-white mb-1">
            What <span className="text-green-400">Clients Say</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Hear from those who've worked with me about the impact of my code and collaboration.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-950 p-6 rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700 overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-bold font-code text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{testimonial.quote}</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16}
                    className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;