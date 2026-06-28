import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ChevronRight, Construction } from 'lucide-react';

const Footer = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = [
    { name: 'Building Construction', id: 'services' },
    { name: 'Residential Construction', id: 'services' },
    { name: 'Commercial Construction', id: 'services' },
    { name: 'Building Planning', id: 'services' },
    { name: 'Waterproofing Solutions', id: 'services' },
    { name: 'Civil Consultancy', id: 'services' },
  ];

  return (
    <footer className="bg-brand-navy-dark text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans relative overflow-hidden">
      
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center text-white font-black text-xl shadow-md">
                R
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wider leading-none">R.G.S.N</h3>
                <span className="text-[10px] text-brand-gold uppercase font-bold tracking-widest mt-1 block">Constructions</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Premium building planners, general civil contractors, and specialist waterproofing providers in Bengaluru. Delivering engineering trust and excellence since 2018.
            </p>
            
            <div className="text-xs text-slate-500 pt-2 font-semibold">
              ESTD. 2018 | Owner: Naveen G (Civil Engineer)
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-orange text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-orange text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-orange text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold tracking-wider mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Services', 'Projects', 'Gallery', 'Testimonials', 'FAQs', 'Contact'].map((link, idx) => {
                const map = ['home', 'about', 'services', 'projects', 'gallery', 'testimonials', 'faqs', 'contact'];
                return (
                  <li key={idx}>
                    <button 
                      onClick={() => handleLinkClick(map[idx])}
                      className="hover:text-brand-orange transition-colors flex items-center group text-slate-400"
                    >
                      <ChevronRight className="w-4 h-4 mr-1 text-slate-600 group-hover:text-brand-orange transition-colors" />
                      <span>{link}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-white text-base font-bold tracking-wider mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              OUR SERVICES
            </h4>
            <ul className="space-y-3 text-sm">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleLinkClick(service.id)}
                    className="hover:text-brand-orange transition-colors flex items-center group text-slate-400 text-left"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 text-slate-600 group-hover:text-brand-orange transition-colors flex-shrink-0" />
                    <span>{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold tracking-wider mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>
                  #1457, 3rd Cross, Govindaraja Nagar, Vijayanagar, Bengaluru - 560079
                </span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <a href="tel:7022005017" className="hover:text-brand-orange transition-colors">
                  +91 7022005017
                </a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <a href="mailto:navee9980@gmail.com" className="hover:text-brand-orange transition-colors break-all">
                  navee9980@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-400 pt-2 border-t border-slate-800">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-slate-300">BUSINESS HOURS</span>
                  <span className="block text-xs text-slate-500">Mon - Sat: 9:00 AM - 7:00 PM</span>
                  <span className="block text-xs text-slate-500">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-medium">
          <div>
            &copy; {currentYear} R.G.S.N Constructions & Waterproofing. All Rights Reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span onClick={() => handleLinkClick('admin')} className="hover:text-brand-orange transition-colors cursor-pointer">Designed by Naveen G (Civil Engineer)</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-slate-700">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
