import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, PhoneCall } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activePage, setActivePage }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for header background style and scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Background effect
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Progress bar percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'FAQs', id: 'faqs' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 left-0 w-full z-40">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[4px] bg-gradient-to-r from-brand-orange to-brand-gold z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-lg py-3' 
          : 'bg-transparent py-5 dark:bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center text-white font-black text-xl shadow-md">
                  R
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight text-brand-navy dark:text-white leading-none">
                    R.G.S.N
                  </div>
                  <div className="text-[9px] tracking-wider text-brand-orange dark:text-brand-gold font-semibold uppercase mt-0.5">
                    Constructions
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                    activePage === link.id
                      ? 'text-brand-orange dark:text-brand-gold'
                      : 'text-slate-700 hover:text-brand-orange dark:text-slate-300 dark:hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                  {activePage === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange dark:bg-brand-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Buttons: Theme Toggle & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <a
                href="tel:7022005017"
                className="btn-gradient text-white px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider flex items-center space-x-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>CALL NOW</span>
              </a>
            </div>

            {/* Mobile buttons: Hamburger & Theme Toggle */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Full Screen Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark px-4 pt-4 pb-6 shadow-xl space-y-2 overflow-hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    activePage === link.id
                      ? 'bg-brand-orange/10 text-brand-orange dark:bg-brand-gold/10 dark:text-brand-gold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="tel:7022005017"
                  className="w-full btn-gradient text-white py-3 rounded-xl font-bold tracking-wide flex items-center justify-center space-x-2 shadow-md"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>CALL NOW (7022005017)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
