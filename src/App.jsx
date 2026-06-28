import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Clear loader after 1.5 seconds to reveal website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'services':
        return <Services setActivePage={setActivePage} />;
      case 'projects':
        return <Projects />;
      case 'gallery':
        return <Gallery />;
      case 'testimonials':
        return <Testimonials />;
      case 'faqs':
        return <FAQs setActivePage={setActivePage} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200 transition-colors duration-300 selection:bg-brand-orange selection:text-white">
      {/* Premium Initial Loader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Main Website Wrapper */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen animate-fade-in">
          {/* Header Navigation */}
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          
          {/* Dynamic Page Router with Entrance/Exit Animation */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer Navigation */}
          <Footer setActivePage={setActivePage} />
          
          {/* Floating Actions Panel (WhatsApp, Call, Back-To-Top) */}
          <FloatingActions />
        </div>
      )}
    </div>
  );
}

export default App;
