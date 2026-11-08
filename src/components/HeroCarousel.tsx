import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
} from 'lucide-react';
import { Language, PublicRoute, HeroSlideConfig, HeroSliderGlobalConfig } from '../types';
import { ADVISOR_CONFIG } from '../config/advisorConfig';
import { DEFAULT_HERO_SLIDER_GLOBAL_CONFIG } from '../config/heroAndGuideConfig';

export interface HeroCarouselProps {
  slides: HeroSlideConfig[];
  language?: Language;
  onNavigate?: (route: PublicRoute) => void;
  onOpenGuide?: () => void;
  globalConfig?: HeroSliderGlobalConfig;
  isPausedExternal?: boolean;
  className?: string;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  language = 'kn',
  onNavigate,
  onOpenGuide,
  globalConfig = DEFAULT_HERO_SLIDER_GLOBAL_CONFIG,
  isPausedExternal = false,
  className = '',
}) => {
  const isKn = language === 'kn';
  const visibleSlides = slides.filter((s) => s.isVisible);
  const totalSlides = visibleSlides.length;

  // Active slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // User explicit pause state (defaults to false so autoplay is enabled by default)
  const [userExplicitPaused, setUserExplicitPaused] = useState(false);

  // Transient pause triggers
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Framer Motion hook to detect OS prefers-reduced-motion preference
  const systemPrefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion || !!systemPrefersReducedMotion;

  // Announcer text for assistive technology (updated only on manual change)
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Touch Swipe Handlers (supporting mobile gestures)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect user's reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Mark carousel ready after mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Observe page visibility (pause when browser tab is hidden, restart with full duration when visible)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === 'hidden');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Observe carousel visibility in viewport (pause when scrolled out of view)
  useEffect(() => {
    if (!carouselRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  // Guarantee only one active timer runs across re-renders and StrictMode
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // Navigation handlers
  const handleNext = useCallback(
    (isManual = false) => {
      if (totalSlides === 0) return;
      setCurrentIndex((prev) => {
        if (prev >= totalSlides - 1) {
          if (globalConfig.loop === false) {
            setUserExplicitPaused(true);
            return prev;
          }
          return 0;
        }
        const nextIdx = prev + 1;
        if (isManual) {
          const slide = visibleSlides[nextIdx];
          const title = isKn ? slide.titleKn || slide.headlineKn : slide.titleEn || slide.headlineEn;
          setLiveAnnouncement(
            isKn ? `ಸ್ಲೈಡ್ ${nextIdx + 1} / ${totalSlides}: ${title}` : `Slide ${nextIdx + 1} of ${totalSlides}: ${title}`
          );
        }
        return nextIdx;
      });
      if (isManual && globalConfig.pauseOnInteraction !== false) {
        // Stop automatic rotation on manual interaction until visitor presses Play
        setUserExplicitPaused(true);
      }
    },
    [totalSlides, visibleSlides, isKn, globalConfig.loop, globalConfig.pauseOnInteraction]
  );

  const handlePrev = useCallback(
    (isManual = false) => {
      if (totalSlides === 0) return;
      setCurrentIndex((prev) => {
        let prevIdx = prev - 1;
        if (prevIdx < 0) {
          if (globalConfig.loop === false) {
            return 0;
          }
          prevIdx = totalSlides - 1;
        }
        if (isManual) {
          const slide = visibleSlides[prevIdx];
          const title = isKn ? slide.titleKn || slide.headlineKn : slide.titleEn || slide.headlineEn;
          setLiveAnnouncement(
            isKn ? `ಸ್ಲೈಡ್ ${prevIdx + 1} / ${totalSlides}: ${title}` : `Slide ${prevIdx + 1} of ${totalSlides}: ${title}`
          );
        }
        return prevIdx;
      });
      if (isManual && globalConfig.pauseOnInteraction !== false) {
        setUserExplicitPaused(true);
      }
    },
    [totalSlides, visibleSlides, isKn, globalConfig.loop, globalConfig.pauseOnInteraction]
  );

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    if (globalConfig.pauseOnInteraction !== false) {
      setUserExplicitPaused(true);
    }
    const slide = visibleSlides[index];
    if (slide) {
      const title = isKn ? slide.titleKn || slide.headlineKn : slide.titleEn || slide.headlineEn;
      setLiveAnnouncement(
        isKn ? `ಸ್ಲೈಡ್ ${index + 1} / ${totalSlides}: ${title}` : `Slide ${index + 1} of ${totalSlides}: ${title}`
      );
    }
  };

  // Determine whether autoplay is actively running
  const isAutoplayEnabled =
    globalConfig.autoplay &&
    !shouldReduceMotion &&
    totalSlides > 1 &&
    isReady;

  const pauseOnHoverActive = (globalConfig.pauseOnHover ?? true) && isHovered;
  const pauseOnFocusActive = (globalConfig.pauseOnFocus ?? true) && isFocused;

  const isPaused =
    !isAutoplayEnabled ||
    userExplicitPaused ||
    pauseOnHoverActive ||
    pauseOnFocusActive ||
    isTabHidden ||
    !isInViewport ||
    isPausedExternal;

  // Single-timer autoplay management
  useEffect(() => {
    // Strictly clear any previous timer first
    clearTimer();

    // Do not schedule rotation if paused or disabled
    if (isPaused || shouldReduceMotion || totalSlides <= 1 || !isReady) {
      return;
    }

    const currentSlide = visibleSlides[currentIndex];
    const duration = currentSlide?.durationOverrideMs || globalConfig.slideDurationMs || 8000;

    // Use a single timeout for each slide rotation
    timerRef.current = setTimeout(() => {
      handleNext(false);
    }, duration);

    return () => {
      clearTimer();
    };
  }, [
    isPaused,
    shouldReduceMotion,
    totalSlides,
    isReady,
    currentIndex,
    visibleSlides,
    globalConfig.slideDurationMs,
    handleNext,
    clearTimer,
  ]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext(true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev(true);
    }
  };

  // Touch Swipe Handlers (supporting mobile gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Ensure horizontal gesture is intentional and exceeds vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext(true);
      } else {
        handlePrev(true);
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  const handleAction = (destination: PublicRoute | 'open-guide' | 'whatsapp') => {
    if (destination === 'open-guide') {
      if (onOpenGuide) onOpenGuide();
    } else if (destination === 'whatsapp') {
      const waText = isKn
        ? 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, ಕುಟುಂಬದ ಜೀವ ವಿಮಾ ಯೋಜನೆ ಕುರಿತು ಮಾತನಾಡಲು ಇಷ್ಟಪಡುತ್ತೇನೆ.'
        : 'Hello Sofia Rani, I would like to consult about family protection planning.';
      window.open(
        `${ADVISOR_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(waText)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (onNavigate) {
      onNavigate(destination);
    }
  };

  if (totalSlides === 0) return null;

  return (
    <section
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={isKn ? 'ಜೀವ ವಿಮಾ ಯೋಜನಾ ಮುಖ್ಯಾಂಶಗಳು' : 'Featured Life Insurance Planning Topics'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => {
        if (globalConfig.pauseOnHover !== false) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (globalConfig.pauseOnHover !== false) setIsHovered(false);
      }}
      onFocus={(e) => {
        setIsFocused(true);
        if (globalConfig.pauseOnFocus !== false && globalConfig.pauseOnInteraction !== false) {
          // Stop automatic rotation on keyboard focus until visitor explicitly clicks Play
          setUserExplicitPaused(true);
        }
      }}
      onBlur={(e) => {
        if (!carouselRef.current?.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      className={`relative overflow-hidden bg-[#0F1D36] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${className}`}
    >
      {/* Visually hidden assertive announcer for manual slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Visual Slide Stage with Framer Motion Crossfade */}
      <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-center overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          {visibleSlides.map((slide, idx) => {
            if (idx !== currentIndex) return null;

            // Focal alignment classes
            const focalClass =
              slide.desktopFocalPoint === 'left'
                ? 'object-left'
                : slide.desktopFocalPoint === 'right'
                ? 'object-right'
                : slide.desktopFocalPoint === 'top'
                ? 'object-top'
                : 'object-center';

            // Overlay darkness setting
            const overlayClass =
              slide.overlayStrength === 'strong'
                ? 'from-[#0F1D36]/98 via-[#0F1D36]/85 to-black/60'
                : slide.overlayStrength === 'subtle'
                ? 'from-[#0F1D36]/85 via-[#0F1D36]/55 to-black/20'
                : 'from-[#0F1D36]/95 via-[#0F1D36]/75 sm:via-[#0F1D36]/65 to-black/35';

            const transitionDuration = shouldReduceMotion
              ? 0
              : (globalConfig.crossfadeDurationMs ?? 600) / 1000;

            return (
              <motion.div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${totalSlides}: ${slide.titleEn || slide.headlineEn}`}
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                transition={{
                  duration: transitionDuration,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 z-10 w-full h-full flex items-center"
              >
                {/* Asymmetrical Editorial Layout: Photographic Focal Carrier & Clean Text-Safe Zone */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <picture>
                    {slide.mobileImage && (
                      <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                    )}
                    <img
                      src={slide.desktopImage}
                      alt={isKn ? slide.imageAltKn : slide.imageAltEn}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className={`w-full h-full object-cover ${focalClass} scale-[1.01] ${
                        shouldReduceMotion ? '' : 'transition-transform duration-700'
                      }`}
                    />
                  </picture>
                  {/* Editorial Dual-Gradient: Deep Navy backing text on left, cinematic shade across focal subject on right */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${overlayClass}`}
                  />
                </div>

                {/* Text-safe Area Content Container */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-center">
                  <div className="max-w-2xl space-y-6">
                    {/* Category Pill Tagline */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-xs border border-teal-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="font-bold text-white">
                        {isKn ? slide.titleKn || slide.titleEn : slide.titleEn}
                      </span>
                      <span className="text-teal-400/60">·</span>
                      <span className="text-teal-200 font-normal">
                        {isKn ? slide.taglineKn : slide.taglineEn}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-white text-balance drop-shadow-xs">
                      {isKn ? (slide.headlineKn || slide.headline) : (slide.headlineEn || slide.headline)}
                    </h1>

                    {/* Supporting Copy */}
                    <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-2xs">
                      {isKn ? (slide.supportingKn || slide.subHeadlineKn || slide.subHeadline) : (slide.supportingEn || slide.subHeadlineEn || slide.subHeadline)}
                    </p>

                    {/* Actions Area */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleAction(slide.primaryActionDestination)}
                        className="min-h-[44px] px-6 py-3.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-teal-400"
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
                          className="min-h-[44px] px-6 py-3.5 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white backdrop-blur-md border border-white/25 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls & Numbered Progress Bar */}
      {totalSlides > 1 && (
        <div className="relative z-30 bg-[#0F1D36]/90 border-t border-slate-800/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Controls: Prev / Play-Pause / Next / Numbered Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prev button with 44x44px touch target */}
            {globalConfig.showArrows && (
              <button
                type="button"
                onClick={() => handlePrev(true)}
                aria-label={isKn ? 'ಹಿಂದಿನ ಸ್ಲೈಡ್' : 'Previous slide'}
                className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-700/80 focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Play/Pause control with 44px min touch target */}
            <button
              type="button"
              onClick={() => {
                if (userExplicitPaused) {
                  setUserExplicitPaused(false);
                } else {
                  setUserExplicitPaused(true);
                }
              }}
              aria-label={
                !userExplicitPaused && !isPaused
                  ? isKn
                    ? 'ಸ್ಲೈಡ್‌ಶೋ ವಿರಾಮಗೊಳಿಸಿ'
                    : 'Pause slideshow'
                  : isKn
                  ? 'ಸ್ಲೈಡ್‌ಶೋ ಪ್ಲೇ ಮಾಡಿ'
                  : 'Play slideshow'
              }
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-2 transition-colors cursor-pointer border border-slate-700/80 focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {!userExplicitPaused && !isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-xs font-semibold">{isKn ? 'ವಿರಾಮ' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-teal-400 fill-current" />
                  <span className="text-xs font-semibold">{isKn ? 'ಸ್ವಯಂ ಚಲನೆ' : 'Play'}</span>
                </>
              )}
            </button>

            {/* Next button with 44x44px touch target */}
            {globalConfig.showArrows && (
              <button
                type="button"
                onClick={() => handleNext(true)}
                aria-label={isKn ? 'ಮುಂದಿನ ಸ್ಲೈಡ್' : 'Next slide'}
                className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-700/80 focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Numbered Progress */}
            {globalConfig.showProgress && (
              <span className="text-slate-400 font-mono tracking-widest text-[11px] ml-2 select-none" aria-hidden="true">
                <strong className="text-white text-xs font-semibold">0{currentIndex + 1}</strong> / 0{totalSlides}
              </span>
            )}
          </div>

          {/* Bullet Pagination Tabs */}
          {globalConfig.showProgress && (
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
              {visibleSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Slide ${i + 1}: ${slide.titleEn || slide.headlineEn}`}
                  onClick={() => handleSelectSlide(i)}
                  className={`min-h-[36px] px-1 flex items-center cursor-pointer transition-all ${
                    i === currentIndex ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === currentIndex ? 'w-8 bg-teal-400' : 'w-2.5 bg-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Guide Quick Trigger Link */}
          {onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="hidden sm:inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200 font-medium transition-colors cursor-pointer py-1"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>{isKn ? '25-ಹಂತಗಳ ಕುಟುಂಬ ಯೋಜನಾ ಮಾರ್ಗದರ್ಶಿ' : 'Interactive 25-Slide Family Guide'}</span>
            </button>
          )}
        </div>
      </div>
      )}

      {/* Advisor Persistent Identity Strip */}
      <div className="bg-[#0A1324] border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-3">
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
