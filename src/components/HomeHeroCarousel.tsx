import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ShieldCheck,
  UserCheck,
  Compass,
  Calculator,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Language, PublicRoute, HeroSlideConfig } from '../types';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  language: Language;
  slides: HeroSlideConfig[];
  onNavigate: (route: PublicRoute) => void;
  onOpenGuide: () => void;
}

export const HomeHeroCarousel: React.FC<Props> = ({
  language,
  slides,
  onNavigate,
  onOpenGuide,
}) => {
  const isKn = language === 'kn';
  const visibleSlides = slides.filter((s) => s.isVisible);
  const totalSlides = visibleSlides.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Default to manual navigation as requested
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeSlide = visibleSlides[currentIndex] || visibleSlides[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer handling
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 8000); // At least 8 seconds per slide as specified

    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
      setIsPlaying(false);
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
      setIsPlaying(false);
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
      setIsPlaying(false);
    }
    setTouchStartX(null);
  };

  const handleAction = (destination: PublicRoute | 'open-guide' | 'whatsapp') => {
    if (destination === 'open-guide') {
      onOpenGuide();
    } else if (destination === 'whatsapp') {
      const waText = isKn
        ? 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, ಕುಟುಂಬದ ಜೀವ ವಿಮಾ ಯೋಜನೆ ಕುರಿತು ಮಾತನಾಡಲು ಇಷ್ಟಪಡುತ್ತೇನೆ.'
        : 'Hello Sofia Rani, I would like to consult about family protection planning.';
      window.open(
        `${ADVISOR_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(waText)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      onNavigate(destination);
    }
  };

  return (
    <section
      aria-label="Homepage Hero Carousel"
      className="relative overflow-hidden bg-[#0F1D36] text-white focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Visual Slide Stage */}
      <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[650px] flex items-center">
        {visibleSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Media */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={slide.desktopImage}
                  alt={isKn ? slide.imageAltKn : slide.imageAltEn}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover object-center scale-[1.01]"
                />
                {/* Refined gradient overlay for text legibility without obscuring faces */}
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0F1D36]/95 via-[#0F1D36]/75 sm:via-[#0F1D36]/65 to-black/30" />
              </div>

              {/* Text-safe Area and Content Overlay */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-[580px] sm:min-h-[620px] lg:min-h-[650px] flex items-center">
                <div className="max-w-2xl space-y-6">
                  {/* Category Pill Tagline */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-xs border border-teal-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isKn ? slide.taglineKn : slide.taglineEn}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-white text-balance drop-shadow-xs">
                    {isKn ? slide.headlineKn : slide.headlineEn}
                  </h1>

                  {/* Supporting Copy */}
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-2xs">
                    {isKn ? slide.supportingKn : slide.supportingEn}
                  </p>

                  {/* Actions Area */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleAction(slide.primaryActionDestination)}
                      className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform active:scale-[0.98]"
                    >
                      <span>
                        {isKn ? slide.primaryActionLabelKn : slide.primaryActionLabelEn}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {slide.secondaryActionLabelEn && slide.secondaryActionDestination && (
                      <button
                        type="button"
                        onClick={() => handleAction(slide.secondaryActionDestination!)}
                        className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        {slide.secondaryActionDestination === 'open-guide' && (
                          <Compass className="w-4 h-4 text-teal-300" />
                        )}
                        {slide.secondaryActionDestination === 'whatsapp' && (
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                        )}
                        <span>
                          {isKn
                            ? slide.secondaryActionLabelKn
                            : slide.secondaryActionLabelEn}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Controls & Numbered Progress */}
      <div className="relative z-30 bg-[#0F1D36]/90 border-t border-slate-800/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Controls: Prev / Play-Pause / Next / Numbered Indicator */}
          <div className="flex items-center gap-3">
            {/* Prev button */}
            <button
              type="button"
              onClick={() => {
                handlePrev();
                setIsPlaying(false);
              }}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-700/80"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play/Pause control */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700/80"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-teal-400" />
                  <span className="text-[11px] font-medium">{isKn ? 'ವಿರಾಮ' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-teal-400 fill-current" />
                  <span className="text-[11px] font-medium">{isKn ? 'ಪ್ಲೇ' : 'Auto'}</span>
                </>
              )}
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={() => {
                handleNext();
                setIsPlaying(false);
              }}
              aria-label="Next slide"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-700/80"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Numbered Progress */}
            <span className="text-slate-400 font-mono tracking-widest text-[11px] ml-2">
              <strong className="text-white text-xs font-semibold">0{currentIndex + 1}</strong> / 0{totalSlides}
            </span>
          </div>

          {/* Quick interactive bullets */}
          <div className="flex items-center gap-1.5">
            {visibleSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrentIndex(i);
                  setIsPlaying(false);
                }}
                aria-label={`Jump to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-7 bg-teal-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Guide Quick-Trigger Badge */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="hidden sm:inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200 font-medium transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>{isKn ? '25-ಹಂತಗಳ ಕುಟುಂಬ ಯೋಜನಾ ಮಾರ್ಗದರ್ಶಿ' : 'Interactive 25-Slide Family Guide'}</span>
          </button>
        </div>
      </div>

      {/* Advisor Persistent Identity Strip Below Hero */}
      <div className="bg-[#0A1324] border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            {/* Non-Personal Portrait Placeholder until verified photo is supplied */}
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-teal-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{ADVISOR_CONFIG.name}</span>
                <span className="text-slate-500">·</span>
                <span className="text-teal-300 font-medium text-[11px]">
                  {ADVISOR_CONFIG.professionalTitle[language]}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {ADVISOR_CONFIG.location.city}, Karnataka · {ADVISOR_CONFIG.workingHours.timings} · {isKn ? 'ಕನ್ನಡ & ಇಂಗ್ಲಿಷ್ ಸಮಾಲೋಚನೆ' : 'Languages: Kannada & English'}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right max-w-xl">
            {isKn ? ADVISOR_CONFIG.compliance.advisorNoticeKn : ADVISOR_CONFIG.compliance.advisorNoticeEn}
          </div>
        </div>
      </div>
    </section>
  );
};
