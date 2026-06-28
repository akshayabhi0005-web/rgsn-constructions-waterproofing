import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  
  // Close lightbox on escape keypress, navigate using arrow keys
  useEffect(() => {
    if (currentIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Disable scroll behind modal
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 font-sans select-none">
        
        {/* Background Click to Close */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-55 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all shadow-md"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 z-55 p-3.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all shadow-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 z-55 p-3.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all shadow-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </>
        )}

        {/* Media Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center z-10 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt || 'Gallery item'}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-auto cursor-default"
          />

          {/* Details Bar */}
          <div className="w-full mt-4 text-center px-4">
            <h4 className="text-white text-base font-bold tracking-wide">
              {currentImage.title}
            </h4>
            {currentImage.description && (
              <p className="text-slate-400 text-xs mt-1 max-w-2xl mx-auto leading-relaxed">
                {currentImage.description}
              </p>
            )}
            {images.length > 1 && (
              <span className="text-[10px] tracking-widest text-slate-500 font-bold mt-2.5 block uppercase">
                Image {currentIndex + 1} of {images.length}
              </span>
            )}
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
