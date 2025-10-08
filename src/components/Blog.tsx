import React from 'react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

const Blog = () => {
  const posts = [

    {
      title: 'Low Code with IoT And Node.js',
      excerpt: 'Bridge the gap between hardware and software by using low-code tools with Node.js to rapidly develop and deploy IoT solutions.',
      image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1750383346704/04ed771b-ac47-485d-bfb9-819aa18b1934.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
      url: 'https://iotnodejs.hashnode.dev/low-code-with-iot-and-nodejs',
      date: 'June 20, 2025',
      tags: ['IoT', 'Node.js', 'Low Code']
    },
    {
      title: 'Logic Automation with Node.js',
      excerpt: 'Automate complex workflows using Node.js-based logic engines for improved efficiency in connected systems and smart devices.',
      image: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1750381415506/050b76f9-ef6a-443c-bf4c-957f8358d17b.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp',
      url: 'https://ruleenginenodejs.hashnode.dev/logic-automation-with-nodejs',
      date: 'June 20, 2025',
      tags: ['Node.js', 'Automation', 'IoT']
    }
  ];



  return (
    <section
      id="blog"
      className="py-20 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800 relative flex items-center justify-center"
    >
      {/* Pattern Background */}
{/* Light Mode Background */}
<div className="absolute inset-0 bg-square-light opacity-[.25] pointer-events-none z-0 dark:hidden"></div>

{/* Dark Mode Background */}
<div className="absolute inset-0  bg-square-dark opacity-[.05] pointer-events-none z-0 hidden dark:block"></div>

      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            My <span className="text-blue-400 dark:text-yellow-400">Blog</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 dark:bg-yellow-400 opacity-70"></div>
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Dive into my thoughts on coding, tech trends, and developer life. Explore my latest posts below.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Blog Posts */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-gray-300 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col md:flex-row overflow-hidden"
              >
                {/* Image */}
                <div className="md:w-1/3">
                  <a href={post.url}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform"
                    />
                  </a>
                </div>

                {/* Content */}
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-code text-gray-900 dark:text-white mb-2">
                      <a href={post.url} className="hover:text-blue-400 dark:hover:text-yellow-400 transition-colors">
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-700 dark:bg-gray-700/20 text-gray-100 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <a
                      href={post.url}
                      className="text-blue-400 dark:text-yellow-400 hover:text-blue-600 dark:hover:text-yellow-600 font-medium flex items-center gap-2"
                    >
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <a
              href="https://iotnodejs.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-500 dark:bg-yellow-400  dark:text-gray-900 text-white font-bold rounded-lg hover:bg-blue-600 dark:hover:bg-yellow-600 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              View All Posts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;