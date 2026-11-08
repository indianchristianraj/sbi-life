import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { TestimonialItem, Language } from '../types';
import { TestimonialCard } from './TestimonialCard';

export interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
  isPublished: boolean;
  language?: Language;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  isPublished,
  language = 'kn',
  className = '',
}) => {
  // CRITICAL REQUIREMENT: Render NOTHING if isPublished is false
  if (!isPublished) {
    return null;
  }

  // Filter approved entries or use list if provided
  const validTestimonials = (testimonials || []).filter(
    (t) => t.isApproved !== false
  );

  // If no testimonials to display, also return null
  if (validTestimonials.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const isKn = language === 'kn';

  // Keep index within bounds if list shrinks
  useEffect(() => {
    if (currentIndex >= validTestimonials.length) {
      setCurrentIndex(0);
    }
  }, [validTestimonials.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? validTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === validTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentItem = validTestimonials[currentIndex];

  return (
    <section
      aria-label={isKn ? 'ಗ್ರಾಹಕರ ಅನುಭವಗಳು' : 'Client Testimonials'}
      className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Top Header & Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
              {isKn ? 'ದೃಢೀಕರಿಸಿದ ಗ್ರಾಹಕರ ಅನುಭವಗಳು' : 'Verified Client Testimonials'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isKn
                ? 'ಗಂಗಾವತಿಯ ಕುಟುಂಬಗಳ ನೈಜ ಅಭಿಪ್ರಾಯಗಳು'
                : 'Real Experiences from Families in Gangavathi'}
            </h3>
          </div>

          {/* Carousel Navigation Arrows */}
          {validTestimonials.length > 1 && (
            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-xs text-slate-500 font-medium tabular-nums mr-2">
                {currentIndex + 1} / {validTestimonials.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label={isKn ? 'ಹಿಂದಿನ ಅಭಿಪ್ರಾಯ' : 'Previous Testimonial'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label={isKn ? 'ಮುಂದಿನ ಅಭಿಪ್ರಾಯ' : 'Next Testimonial'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Active Testimonial Card */}
        <div className="transition-opacity duration-300">
          <TestimonialCard
            testimonial={currentItem}
            language={language}
            className="border-0 shadow-none p-0 sm:p-2"
          />
        </div>

        {/* Carousel Pagination Dots */}
        {validTestimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100">
            {validTestimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-teal-800'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
