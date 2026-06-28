import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage, heightClass = "h-[350px] md:h-[450px]" }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden rounded-2xl shadow-xl select-none cursor-ew-resize`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After Work" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute right-4 top-4 bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider backdrop-blur-sm shadow flex items-center space-x-1 uppercase z-20">
        <Sparkles className="w-3.5 h-3.5" />
        <span>After (Completed)</span>
      </div>

      {/* Before Image (Clipping Foreground) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Work" 
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
        />
      </div>
      <div 
        className="absolute left-4 top-4 bg-brand-navy/90 dark:bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider backdrop-blur-sm shadow uppercase z-20"
        style={{ opacity: sliderPosition > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        Before
      </div>

      {/* Slider Split Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Drag Handle Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-brand-orange">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
