import React from 'react';
import { Code, Github, Linkedin,Instagram, Twitter, Heart, Coffee, User, Link, Heart as Gear, DollarSign, Book, Mail, Send } from 'lucide-react';

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
      href: 'https://github.com/sayyedmohammadadil',
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
    <footer className="bg-gray-950 py-16 relative flex items-center justify-center">
      {/* Pattern */}
      <div className="absolute inset-0 bg-hero opacity-[.03]"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center gap-3">
              <Code className="text-green-400 text-3xl led-glow" />
              <span className="text-2xl font-bold text-white font-code">Sayyed Mohammad Adil</span>
            </div>
            <p className="text-gray-300 leading-relaxed pe-6 lg:pe-16">
              Building the future with clean code, creativity, and a passion for innovation.
            </p>
            <div className="flex gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-300 hover:text-green-400 text-xl transition-all transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-code text-white mb-6 flex items-center gap-2">
              <Link className="text-green-400" size={20} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    {link.icon} {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-code text-white mb-6 flex items-center gap-2">
              <Mail className="text-green-400" size={20} />
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">Stay updated with my latest projects and tech insights.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm flex items-center gap-2">
            &copy; {new Date().getFullYear()} Sayyed Mohammad Adil. Crafted with 
            <Heart className="text-green-400 fill-current" size={16} />
            and 
            <Coffee className="text-green-400" size={16} />
          </p>
          <div className="flex gap-6 text-gray-300 text-sm">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;