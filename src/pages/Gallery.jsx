import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRightLeft } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Lightbox from '../components/Lightbox';
import { getGallery } from '../utils/db';

// Default static fallbacks for safety
import defaultBefore from '../assets/waterproof_before.jpg';
import defaultAfter from '../assets/waterproof_after.jpg';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch gallery items dynamically
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await getGallery();
        setGalleryItems(data);
      } catch (e) {
        console.error("Failed to load gallery items", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadGallery();
  }, []);

  const filters = [
    { label: 'All Photos', value: 'all' },
    { label: 'Construction Progress', value: 'progress' },
    { label: 'Completed Projects', value: 'completed' },
    { label: 'Waterproofing Works', value: 'waterproofing' },
  ];

  // Resolve before/after item (where is_before_after == 1) for the slider
  const beforeAfterItem = galleryItems.find(item => Number(item.is_before_after) === 1);

  // Filter out the before-after comparison sets from the standard grid view 
  // (unless they specifically filter by 'waterproofing' and we want to show the final result)
  const standardGalleryItems = galleryItems.filter(item => Number(item.is_before_after) !== 1);

  const filteredItems = activeFilter === 'all'
    ? standardGalleryItems
    : standardGalleryItems.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Media & Project Gallery
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            Visual Proof of Civil & Waterproofing Quality
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            View our on-site progress photos, completed structures, and compare before/after chemical waterproofing results.
          </p>
        </div>
      </section>

      {/* BEFORE / AFTER SLIDER SECTION */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-orange dark:text-brand-gold bg-brand-orange/5 dark:bg-brand-gold/10 px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Interactive Waterproofing Showcase</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Before / After Comparison
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Drag the central white slider handle left and right to inspect how R.G.S.N restores leaky concrete terraces using high-performance liquid membrane systems.
            </p>
          </div>

          <div className="border-4 border-slate-100 dark:border-slate-800 rounded-3xl p-1 shadow-md bg-slate-50 dark:bg-brand-navy-light">
            <BeforeAfterSlider 
              beforeImage={beforeAfterItem ? beforeAfterItem.before_src : defaultBefore} 
              afterImage={beforeAfterItem ? beforeAfterItem.after_src : defaultAfter} 
            />
          </div>
        </div>
      </section>

      {/* MASONRY GALLERY GRID */}
      <section className="py-16 bg-slate-50 dark:bg-brand-navy-light/30 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Project Media Grid
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Filter through construction phases and completed engineering details.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'btn-gradient text-white shadow-md'
                    : 'bg-white dark:bg-brand-navy-light hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-850'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin"></div>
              <span className="text-xs text-slate-500">Loading gallery photos...</span>
            </div>
          ) : (
            /* Gallery Grid */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="masonry-item relative group rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-brand-navy-light border border-slate-100 dark:border-slate-800 cursor-pointer break-inside-avoid"
                  onClick={() => handleOpenLightbox(idx)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white text-brand-navy rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-1 text-left">
                    <h4 className="font-bold text-sm text-brand-navy dark:text-white group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal overlay */}
      <Lightbox
        images={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

    </div>
  );
};

export default Gallery;
