import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Compass, HardHat, GraduationCap, Award, Phone } from 'lucide-react';
import engineerPortrait from '../assets/engineer_naveen.jpg';

const About = ({ setActivePage }) => {
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-brand-orange" />,
      title: "Engineered Trust",
      desc: "We stand on strict civil codes and structural design checklists. Every steel bar and mortar mix is audited."
    },
    {
      icon: <Target className="w-6 h-6 text-brand-orange" />,
      title: "Turnkey Accountability",
      desc: "From blueprint approvals to final tile polishing, we manage every layer. One single point of contact."
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-orange" />,
      title: "Transparent Costing",
      desc: "No hidden charges, no sudden escalation claims. We work on detailed item-rate agreements."
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Company Founded",
      desc: "Naveen G establishes R.G.S.N Constructions as a specialist building plan consultancy and structural designer in Bengaluru."
    },
    {
      year: "2020",
      title: "Waterproofing Integration",
      desc: "Recognizing severe terrace dampness issues in local structures, we build an in-house expert chemical waterproofing wing."
    },
    {
      year: "2022",
      title: "50+ Structures Completed",
      desc: "Completing 50 independent residential houses and structural layouts across Vijayanagar and West Bengaluru."
    },
    {
      year: "2024",
      title: "Commercial Contracting",
      desc: "Expanding execution footprint into premium commercial plazas, office structural frameworks, and warehouse designs."
    },
    {
      year: "2026",
      title: "Premium Turnkey Agency",
      desc: "Pioneering premium design-build workflows, offering 3D architectural modeling and high-tech waterproofing warranties."
    }
  ];

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            About R.G.S.N Constructions
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            ESTABLISHED 2018 | Bengaluru, India
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover our journey, values, and the expert engineering leadership that drives R.G.S.N to deliver lifetime structural durabilities.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
              Our Vision & Philosophy
            </h2>
            <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              We Don't Just Construct Walls. We Deliver Promises.
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              At R.G.S.N, our foundation is built on rigorous civil engineering calculations. Led by Naveen G, we focus on planning structures that withstand thermal stresses and soil shifts, while resolving waterproofing issues at the source.
            </p>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              For over 8 years, we have served Bengaluru homeowners, building safe, comfortable spaces and delivering peace of mind through careful attention to detail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-slate-50 dark:bg-brand-navy-light rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-brand-orange">
                  <Target className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider text-brand-navy dark:text-white">Our Mission</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To provide homeowners with structural safety, architectural beauty, and zero leakages through detailed, hands-on engineering supervision.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-brand-navy-light rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-brand-orange">
                  <Compass className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider text-brand-navy dark:text-white">Our Vision</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To be Bengaluru's most trusted turnkey design-build contracting agency, known for quality, integrity, and durable construction.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Columns */}
          <div className="bg-slate-50 dark:bg-brand-navy-light p-8 md:p-10 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-8">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
              Our Core Principles
            </h3>
            
            {values.map((val, idx) => (
              <div key={idx} className="flex space-x-4">
                <div className="p-2.5 h-fit bg-brand-orange/5 dark:bg-brand-orange/10 rounded-lg flex-shrink-0">
                  {val.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Meet the Engineer Section */}
      <section className="py-20 bg-slate-50 dark:bg-brand-navy-light border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
              Leadership
            </h2>
            <p className="text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Meet the Engineer
            </p>
            <div className="w-12 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-brand-navy-dark rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={engineerPortrait} 
                  alt="Naveen G, Civil Engineer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Biography Column */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div>
                <h3 className="text-2xl font-bold text-brand-navy dark:text-white">
                  Naveen G
                </h3>
                <span className="text-xs text-brand-orange dark:text-brand-gold font-bold uppercase tracking-wider">
                  Owner & Chief Civil Engineer
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Naveen G is a structural design specialist and civil engineer. He founded R.G.S.N in 2018 with a vision to eliminate structural cracking and leakage issues that affect structures in Bengaluru due to rapid, low-quality construction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                  <GraduationCap className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-xs font-medium">B.E. Civil Engineering</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                  <HardHat className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-xs font-medium">Structural Detailing Specialist</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                  <Award className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-xs font-medium">8+ Years Field Supervision Experience</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                  <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <a href="tel:7022005017" className="text-xs font-bold text-brand-navy dark:text-white hover:text-brand-orange transition-colors">
                    +91 7022005017
                  </a>
                </div>
              </div>

              <blockquote className="border-l-4 border-brand-orange pl-4 text-xs italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 py-3 pr-3 rounded-r-lg">
                "Our motto 'We Deliver Promises' means we stand behind the concrete we mix, the drawings we sketch, and the waterproofing we seal. Engineering is about building assets that last generations."
              </blockquote>
            </div>

          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-brand-orange dark:text-brand-gold tracking-widest uppercase">
              Chronology
            </h2>
            <p className="text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Our Journey Since 2018
            </p>
            <div className="w-12 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 max-w-3xl mx-auto pl-6 md:pl-8 space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Year Marker */}
                <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-brand-navy-dark bg-brand-orange flex items-center justify-center shadow-sm"></div>

                <div className="space-y-1.5 text-left">
                  <span className="inline-block text-sm font-extrabold text-brand-orange dark:text-brand-gold bg-brand-orange/5 dark:bg-brand-gold/10 px-2.5 py-0.5 rounded">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-bold text-brand-navy dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
