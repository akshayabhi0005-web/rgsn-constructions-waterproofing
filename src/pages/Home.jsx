import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone, Award, ShieldCheck, Clock, CheckCircle2, Star, Eye } from 'lucide-react';
import heroBg from '../assets/hero_construction_bg.jpg';
import resProject from '../assets/project_residential.jpg';
import commProject from '../assets/project_commercial.jpg';

// Animated CountUp Component
const CounterItem = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    // Cap minimum increment interval at 16ms (60fps)
    incrementTime = Math.max(incrementTime, 16);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Home = ({ setActivePage }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const whyChooseUs = [
    {
      icon: <Award className="w-8 h-8 text-brand-orange" />,
      title: "Engineering Excellence",
      desc: "Managed directly by Naveen G (Civil Engineer) with high standard structural integrity and structural detailing."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-orange" />,
      title: "Premium Waterproofing",
      desc: "5-stage high performance chemical coating waterproofing and membrane laying to ensure zero leakage for life."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-orange" />,
      title: "On-Time Completion",
      desc: "Strict project management milestones. We deliver promises without cost overruns or delay excuses."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-brand-orange" />,
      title: "Absolute Transparency",
      desc: "Detailed materials cost breakdown, clear site progress updates, and strict adherence to architectural plans."
    }
  ];

  return (
    <div className="font-sans">
      
      {/* 1. HERO PARALLAX BANNER */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom and Parallax Style */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundAttachment: 'fixed', // Creates the parallax effect on desktop browsers
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-950/75 dark:bg-slate-950/85"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-gold font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span>R.G.S.N Constructions & Waterproofing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight font-sans"
          >
            Building Your <span className="gold-gradient-text">Dreams</span> Into Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed font-light"
          >
            Bengaluru's premium civil engineering contractor. Since 2018, we build luxurious structures, design beautiful 2D/3D spaces, and execute bulletproof waterproofing solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
          >
            <button
              onClick={() => setActivePage('contact')}
              className="w-full sm:w-auto btn-gradient hover:shadow-lg text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="tel:7022005017"
              className="w-full sm:w-auto bg-slate-900/60 border border-slate-700 hover:bg-slate-900/80 text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wider uppercase transition-all backdrop-blur-sm transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => setActivePage('projects')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-sm tracking-wider uppercase transition-all backdrop-blur-sm transform hover:-translate-y-1"
            >
              View Projects
            </button>
          </motion.div>
        </div>

        {/* Diagonal Section Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 dark:bg-brand-navy-dark clip-path-diagonal pointer-events-none"></div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="bg-white dark:bg-brand-navy-light py-12 md:py-16 shadow-inner relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
            
            <div className="space-y-1 border-r border-slate-100 last:border-0 dark:border-slate-800">
              <h3 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white font-sans">
                <CounterItem target="150" suffix="+" />
              </h3>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Projects Completed
              </p>
            </div>

            <div className="space-y-1 border-r border-slate-100 last:border-0 dark:border-slate-800">
              <h3 className="text-4xl md:text-5xl font-black text-brand-orange dark:text-brand-gold font-sans">
                <CounterItem target="8" suffix="+" />
              </h3>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Years Experience
              </p>
            </div>

            <div className="space-y-1 border-r border-slate-100 last:border-0 dark:border-slate-800">
              <h3 className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white font-sans">
                <CounterItem target="300" suffix="+" />
              </h3>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Happy Clients
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-brand-orange dark:text-brand-gold font-sans">
                <CounterItem target="120" suffix="+" />
              </h3>
              <p className="text-xs md:text-sm font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                Waterproofing Works
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section ref={ref} className="bg-slate-50 dark:bg-brand-navy-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
              Core Strengths
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Why Homeowners Trust R.G.S.N
            </p>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We stand apart through structured civil engineering standards, bulletproof site supervision, and high-performance quality ingredients.
            </p>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white dark:bg-brand-navy-light p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-start space-x-5 hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-brand-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 4. PREMIUM SERVICE HIGHLIGHTS */}
      <section className="bg-white dark:bg-brand-navy-light py-20 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div className="space-y-3 max-w-2xl text-left">
              <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
                Expertise Area
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white tracking-tight">
                Our Premium Contracting Services
              </p>
              <div className="w-12 h-1 bg-brand-orange rounded-full"></div>
            </div>
            <button 
              onClick={() => setActivePage('services')}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-brand-orange dark:text-brand-gold hover:text-brand-orange-dark font-semibold text-sm transition-colors group"
            >
              <span>Explore All 15+ Services</span>
              <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-slate-50 dark:bg-brand-navy-dark border border-slate-100 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors"></div>
              <h4 className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">Structural Construction</h4>
              <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">Residential Construction</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Turnkey high-end duplex villas and apartments constructed to seismic standards. Solid foundations, high-strength concrete aggregates, and premium design detailing.
              </p>
              <button onClick={() => setActivePage('services')} className="text-xs font-bold tracking-wider text-slate-800 dark:text-white hover:text-brand-orange uppercase flex items-center">
                <span>Explore details</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-50 dark:bg-brand-navy-dark border border-slate-100 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors"></div>
              <h4 className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">Structural Engineering</h4>
              <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">Building & 3D Planning</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                RERA-compliant 2D architectural plans, gorgeous 3D perspective elevations, and detailed structural drawings optimized for steel reinforcement and load distribution.
              </p>
              <button onClick={() => setActivePage('services')} className="text-xs font-bold tracking-wider text-slate-800 dark:text-white hover:text-brand-orange uppercase flex items-center">
                <span>Explore details</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-50 dark:bg-brand-navy-dark border border-slate-100 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full group-hover:bg-brand-orange/10 transition-colors"></div>
              <h4 className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">Sealing Specialist</h4>
              <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3">Advanced Waterproofing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Specialized waterproofing for terrace, bathrooms, basement injection grouting, and water tanks. Over 120+ projects executed with certified warranty.
              </p>
              <button onClick={() => setActivePage('services')} className="text-xs font-bold tracking-wider text-slate-800 dark:text-white hover:text-brand-orange uppercase flex items-center">
                <span>Explore details</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. LATEST PROJECTS PREVIEW */}
      <section className="bg-slate-50 dark:bg-brand-navy-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
              Recent Works
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Featured Engineering Milestones
            </p>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Project 1 */}
            <div className="bg-white dark:bg-brand-navy-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-[300px] md:h-[350px]">
                <img 
                  src={resProject} 
                  alt="Duplex Villa" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setActivePage('projects')}
                    className="p-3 bg-white text-brand-navy rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                  Residential
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  Vijayanagar, Bengaluru | Completed 2025
                </div>
                <h3 className="text-xl font-bold text-brand-navy dark:text-white">
                  Modern 4-BHK Premium Duplex Villa
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Turnkey architectural planning, structural analysis, and construction. Finished with luxurious Italian marble flooring, false ceiling, and structural steel facade.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-brand-navy-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-[300px] md:h-[350px]">
                <img 
                  src={commProject} 
                  alt="Commercial Office" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setActivePage('projects')}
                    className="p-3 bg-white text-brand-navy rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-brand-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase dark:bg-slate-900">
                  Commercial
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  Whitefield, Bengaluru | Completed 2024
                </div>
                <h3 className="text-xl font-bold text-brand-navy dark:text-white">
                  Prestige Commercial Corporate Plaza
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Fast-track structural RCC framing, exterior glass curtain wall framing, and premium vitrified tiles laying. Executed on a strict 14-month schedule.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setActivePage('projects')}
              className="bg-brand-navy hover:bg-brand-navy-light dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-colors"
            >
              Browse Full Portfolio
            </button>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) SECTION */}
      <section className="bg-gradient-to-r from-brand-navy to-brand-navy-light text-white py-16 relative overflow-hidden">
        {/* Glow element */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Planning a Construction or Facing Waterproofing Leakages?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Get an expert on-site structural inspection and a detailed materials estimates quote from Naveen G, Civil Engineer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('contact')}
              className="btn-gradient text-white font-bold px-8 py-4 rounded-xl text-xs tracking-wider uppercase hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Schedule Free On-Site Inspection
            </button>
            <a
              href="https://wa.me/917022005017"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center space-x-2"
            >
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
