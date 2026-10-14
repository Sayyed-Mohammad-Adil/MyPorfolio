import React from 'react';
import { Code, Github, Linkedin, Instagram, Twitter, Heart, Coffee, User, Link, Heart as Gear, DollarSign, Book, Mail, Send } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about', icon: <User size={14} /> },
    { name: 'Projects', href: '#projects', icon: <Code size={14} /> },
    // { name: 'Services', href: '#', icon: <Gear size={14} /> },
    // { name: 'Pricing', href: '#', icon: <DollarSign size={14} /> },
    { name: 'Blogs', href: '#blog', icon: <Book size={14} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={14} /> },
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      name: 'GitHub',
      href: 'https://github.com/Sayyed-Mohammad-Adil',
      color: 'hover:text-gray-300',
    },
    {
      icon: <Linkedin size={20} />,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sayyed-mohammad-adil-md-adil/',
      color: 'hover:text-blue-500',
    },
    {
      icon: <Instagram size={20} />,
      name: 'Instagram',
      href: 'https://www.instagram.com/sayyedmohammadadil/',
      color: 'hover:text-pink-500',
    },
    {
      icon: <Twitter size={20} />,
      name: 'X',
      href: 'https://x.com/sayyedmohdadil',
      color: 'hover:text-sky-400',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-white dark:bg-gray-950 py-16 relative flex items-center justify-center">
      {/* Pattern */}
      {/* <div className="absolute inset-0 bg-hero opacity-[.03]"></div> */}
            <div className="absolute inset-0 bg-hero-light dark:hidden opacity-[.20] z-0"></div>

      {/* Dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-hero-dark dark:opacity-[.03] z-0"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6 md:col-span-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Code className="text-blue-500 dark:text-yellow-400 text-2xl sm:text-3xl led-glow shrink-0" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-code">Sayyed Mohammad Adil</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base pe-0 lg:pe-16">
              Building the future with clean code, creativity, and a passion for innovation.
            </p>
            <div className="flex gap-4 sm:gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-yellow-400 text-xl transition-all transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-code text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Link className="text-blue-500 dark:text-yellow-400" size={18} />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    {link.icon} <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-code text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
              <Mail className="text-blue-500 dark:text-yellow-400" size={18} />
              <span>Newsletter</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">Stay updated with my latest projects and tech insights.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 
             bg-gray-100 text-gray-900 
             dark:bg-gray-900 dark:text-gray-300 
             border border-gray-300 dark:border-gray-800 
             rounded-xl text-sm
             focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 
             transition-all"
              />

              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-blue-600 dark:bg-yellow-500 dark:text-gray-900 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <Send size={15} />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-850 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span>&copy; {new Date().getFullYear()} Sayyed Mohammad Adil. Crafted with</span>
            <Heart className="text-blue-500 dark:text-yellow-400 fill-current inline-block" size={14} />
            <span>and</span>
            <Coffee className="text-blue-500 dark:text-yellow-400 inline-block" size={14} />
          </p>
          <div className="flex gap-4 sm:gap-6 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 dark:hover:text-yellow-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;