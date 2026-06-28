import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, CheckSquare, Layers } from 'lucide-react';
import { getProjects } from '../utils/db';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects dynamically on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjectsData(data);
      } catch (e) {
        console.error("Failed to load projects", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Renovation', value: 'renovation' },
    { label: 'Waterproofing', value: 'waterproofing' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Our Project Portfolio
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            Delivering Civil Engineering Excellence Since 2018
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Browse our completed residential houses, luxury duplex villas, heavy commercial frameworks, and advanced chemical waterproofing projects.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'btn-gradient text-white shadow-md'
                    : 'bg-slate-100 dark:bg-brand-navy-light hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-10 h-10 border-4 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin"></div>
              <span className="text-xs text-slate-500 tracking-wider">Loading project catalog...</span>
            </div>
          ) : (
            /* Projects Grid */
            <motion.div 
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => {
                  // Safety split for database TEXT vs array scope formats
                  const scopeList = typeof project.scope === 'string' 
                    ? project.scope.split(',').map(s => s.trim()) 
                    : (Array.isArray(project.scope) ? project.scope : []);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      key={project.id}
                      className="bg-slate-50 dark:bg-brand-navy-light rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        {/* Project Image */}
                        <div className="relative overflow-hidden h-[260px] sm:h-[320px] group">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow">
                            {project.category}
                          </span>
                        </div>

                        {/* Metadata & Title */}
                        <div className="p-6 md:p-8 space-y-4">
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-4">
                            <div className="flex items-center space-x-1.5">
                              <MapPin className="w-4.5 h-4.5 text-brand-orange" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-4.5 h-4.5 text-brand-gold" />
                              <span>{project.date}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-brand-navy dark:text-white leading-tight pt-1">
                            {project.name}
                          </h3>

                          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Scope List */}
                          {scopeList.length > 0 && (
                            <div className="space-y-2 pt-2">
                              <h4 className="text-xs font-bold text-brand-navy dark:text-white flex items-center space-x-1.5">
                                <Layers className="w-4 h-4 text-brand-orange" />
                                <span className="uppercase tracking-wider">PROJECT WORK SCOPE</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                                {scopeList.map((scopeItem, idx) => (
                                  <div key={idx} className="flex items-center space-x-1.5">
                                    <CheckSquare className="w-4 h-4 text-brand-gold flex-shrink-0" />
                                    <span>{scopeItem}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Projects;
