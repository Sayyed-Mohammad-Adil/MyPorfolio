import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Coffee, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      content: 'sayyed.adil@smadev.com',
      link: 'mailto:adil@smadev.com'
    },
    // {
    //   icon: <Phone size={20} />,
    //   title: 'Phone',
    //   content: '+1 (234) 567-890',
    //   link: 'tel:+1234567890'
    // },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      content: 'Mumbai, India',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      link: 'https://github.com/sayyedmohammadadil',
      color: 'hover:text-gray-300',
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/sayyed-mohammad-adil-md-adil/',
      color: 'hover:text-blue-500',
    },
    {
      icon: <Instagram size={24} />,
      name: 'Instagram',
      link: 'https://www.instagram.com/sayyedmohammadadil/',
      color: 'hover:text-pink-500',
    },
    {
      icon: <Twitter size={24} />,
      name: 'X',
      link: 'https://x.com/sayyedmohdadil',
      color: 'hover:text-sky-400',
    },
  ];
  return (
    <section id="contact" className="py-16 bg-gray-100/50 dark:bg-gray-900/50 relative flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-code inline-block relative text-gray-900 dark:text-white mb-1">
            Get in <span className="text-blue-400 dark:text-yellow-400">Contact</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400 dark:bg-yellow-400 opacity-70"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about code? Drop me a message, and let's make things happen!
          </p>
        </div>

        {/* Contact Content */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg flex items-center justify-center">
          {/* Table decoration */}
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-gray-100/20 dark:bg-gray-800/20 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center overflow-hidden">
            {/* <div className="w-full h-full bg-hero opacity-[.03] bg-cover bg-center"></div> */}
            {/* Light Mode Background */}
            <div className="w-full h-full bg-hero-light opacity-[.40] bg-cover bg-center dark:hidden"></div>

            {/* Dark Mode Background */}
            <div className="w-full h-full bg-hero-dark opacity-[.03] bg-cover bg-center hidden dark:block"></div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative w-full">
            {/* Contact Form */}
            <div className="relative">
              <h3 className="text-xl font-bold font-code text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Mail className="text-blue-600 dark:text-yellow-400 led-glow" />
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-400 dark:focus:border-yellow-400 transition-colors"
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-400 dark:focus:border-yellow-400 transition-colors"
                    placeholder="Your Email"
                    required
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-300 focus:outline-none focus:border-blue-400 dark:focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Your Message"
                    required
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
                {success && <p className="text-blue-400 dark:text-yellow-400 text-center mt-4">Message sent successfully!</p>}
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="relative">
                <h3 className="text-xl font-bold font-code text-white mb-6">
                  Contact Info
                </h3>
                <ul className="space-y-4 text-gray-300">
                  {contactInfo.map((info, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="text-blue-400 dark:text-yellow-400">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-300">{info.title}</h4>
                        <a href={info.link} className="text-gray-400 hover:text-blue-400 dark:hover:text-yellow-400 transition-colors">
                          {info.content}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="relative">
                <h3 className="text-xl font-bold font-code text-white mb-6">
                  Connect with Me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-300 ${social.color} text-2xl transition-all transform hover:scale-110`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coffee decoration */}
          <div className="absolute bottom-10 right-10 w-12 h-16 ">
            <div className="absolute -right-4 top-6 h-8 w-8 border-4 border-gray-700 rounded-r-full"></div>
            <div className="absolute bottom-0 w-full h-10 bg-gray-700 rounded-b-lg"></div>
            <div className="absolute bottom-8 w-full h-8 bg-gray-600 rounded-lg">
              <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900"></div>
            </div>
            <div className="absolute w-6 h-1 bg-white/20 rounded-full left-3 top-3"></div>
            {/* Steam Elements */}
<div className="absolute w-1.5 h-4 bg-gray-700 bg-opacity-30 dark:bg-white dark:bg-opacity-30 rounded-full left-4 -top-2 steam steam1"></div>
<div className="absolute w-1.5 h-4 bg-gray-700 bg-opacity-30 dark:bg-white dark:bg-opacity-30 rounded-full left-6 -top-4 steam steam2"></div>
<div className="absolute w-1.5 h-4 bg-gray-700 bg-opacity-30 dark:bg-white dark:bg-opacity-30 rounded-full left-8 -top-3 steam steam3"></div>

            <div className="absolute left-2 bottom-3 text-[8px] tracking-widest">COFFEE</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;