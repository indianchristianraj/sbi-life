import React from 'react';
import {
  ShieldCheck,
  MessageCircle,
  Calendar,
  Phone,
  ArrowRight,
  Calculator,
  UserCheck,
  BookOpen,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
  Lock,
} from 'lucide-react';
import { Language, PublicRoute, LeadRecord, TestimonialItem, HeroSlideConfig, HeroSliderGlobalConfig } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';
import { DEFAULT_HERO_SLIDES, DEFAULT_HERO_SLIDER_GLOBAL_CONFIG } from '../../config/heroAndGuideConfig';
import { HeroCarousel } from '../HeroCarousel';
import { LeadCaptureForm } from '../LeadCaptureForm';
import { TestimonialCarousel } from '../TestimonialCarousel';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onLeadCaptured: (lead: LeadRecord) => void;
  testimonials?: TestimonialItem[];
  isTestimonialsPublished?: boolean;
  heroSlides?: HeroSlideConfig[];
  globalConfig?: HeroSliderGlobalConfig;
  isPausedExternal?: boolean;
  onOpenGuide: () => void;
}

export const HomeView: React.FC<Props> = ({
  language,
  onNavigate,
  onLeadCaptured,
  testimonials = [],
  isTestimonialsPublished = false,
  heroSlides = DEFAULT_HERO_SLIDES,
  globalConfig = DEFAULT_HERO_SLIDER_GLOBAL_CONFIG,
  isPausedExternal = false,
  onOpenGuide,
}) => {
  const t = TRANSLATIONS[language];
  const isKn = language === 'kn';

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PREMIUM FIVE-SLIDE HOMEPAGE HERO WITH AUTOMATIC ROTATION */}
      <HeroCarousel
        language={language}
        slides={heroSlides}
        globalConfig={globalConfig}
        isPausedExternal={isPausedExternal}
        onNavigate={onNavigate}
        onOpenGuide={onOpenGuide}
      />

      {/* 2. GOAL SELECTOR: 4 DISTINCT LIFE PLANNING GOALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
            {isKn ? 'ಆರ್ಥಿಕ ಭದ್ರತೆಯ ನೆಲೆಗಟ್ಟು · 4 ಪ್ರಮುಖ ಗುರಿಗಳು' : 'Foundations of Security · 4 Key Planning Goals'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.lifeGoalsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t.lifeGoalsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Family Protection */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isKn ? '1. ಕುಟುಂಬ ರಕ್ಷಣೆ' : '1. Family Protection'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.goalProtectionDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('family-protection')}
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ ಲೆಕ್ಕ ಹಾಕಿ' : 'Explore Protection'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Children Future */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isKn ? '2. ಮಕ್ಕಳ ಭವಿಷ್ಯ' : "2. Children's Future"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.goalChildDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('children-education')}
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{isKn ? 'ಶಿಕ್ಷಣ ಪ್ಲಾನರ್ ನೋಡಿ' : 'Explore Education'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Savings Education */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isKn ? '3. ಉಳಿತಾಯ ಶಿಕ್ಷಣ' : '3. Savings Education'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isKn
                  ? 'ರಕ್ಷಣೆ ಮತ್ತು ಉಳಿತಾಯದ ವ್ಯತ್ಯಾಸವನ್ನು ಅರಿಯಿರಿ. ಖಚಿತ ಮೆಚುರಿಟಿ ಲಾಭಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಆಧಾರಿತ ಯೋಜನೆಗಳ ನಡುವಿನ ಸ್ಪಷ್ಟ ತಿಳುವಳಿಕೆ.'
                  : 'Understand the distinct roles of pure risk protection versus guaranteed milestone savings and market-linked endowments.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tools')}
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{isKn ? 'ಉಳಿತಾಯ ಪರಿಕರಗಳು' : 'Explore Savings'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Retirement Planning */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-indigo-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isKn ? '4. ನಿವೃತ್ತಿ ಯೋಜನೆ' : '4. Retirement Planning'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.goalRetirementDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('retirement')}
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{isKn ? 'ಪಿಂಚಣಿ ವಿವರ ಅರಿಯಿರಿ' : 'Explore Retirement'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. CALCULATOR CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              {isKn ? 'ಶುಲ್ಕವಿಲ್ಲ · ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿಲ್ಲ' : 'No Phone Number Required · Instant Results'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isKn
                ? 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಎಷ್ಟು ಜೀವ ವಿಮಾ ರಕ್ಷಣೆ ಅಗತ್ಯವಿದೆ?'
                : 'How Much Life Cover Does Your Family Truly Need?'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              {isKn
                ? 'ನಿಮ್ಮ ಮಾಸಿಕ ವೆಚ್ಚ, ಬಾಕಿ ಸಾಲಗಳು ಮತ್ತು ಉಳಿತಾಯದ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ನಿಜವಾದ ಕುಟುಂಬ ರಕ್ಷಣಾ ಕೊರತೆ (Protection Gap) ಯನ್ನು 2 ನಿಮಿಷಗಳಲ್ಲಿ ಉಚಿತವಾಗಿ ಲೆಕ್ಕ ಹಾಕಿ.'
                : 'Use our transparent calculation model to estimate your exact protection gap based on household liabilities, support years, and existing provisions.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('tools')}
                className="px-6 py-3 bg-white text-teal-950 font-bold text-xs rounded-xl hover:bg-teal-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Calculator className="w-4 h-4 text-teal-800" />
                <span>{isKn ? 'ಆರ್ಥಿಕ ಸಾಧನಗಳನ್ನು ತೆರೆಯಿರಿ' : 'Launch Planning Tools Suite'}</span>
              </button>
              {onOpenGuide && (
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="px-5 py-3 bg-teal-800/80 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl border border-teal-600/60 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-teal-300" />
                  <span>{isKn ? '25-ಹಂತಗಳ ಮಾರ್ಗದರ್ಶಿ' : '25-Slide Family Guide'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONSULTATION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
            {isKn ? 'ಪಾರದರ್ಶಕತೆ ನಮ್ಮ ಧ್ಯೇಯ' : 'Transparent Advisory Journey'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.processTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t.processSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90">
            <div className="text-xs font-bold text-teal-800 mb-1">01.</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1.5">{t.step1Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90">
            <div className="text-xs font-bold text-teal-800 mb-1">02.</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1.5">{t.step2Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90">
            <div className="text-xs font-bold text-teal-800 mb-1">03.</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1.5">{t.step3Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step3Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90">
            <div className="text-xs font-bold text-teal-800 mb-1">04.</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1.5">{t.step4Title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* 5. EDUCATIONAL MEDIA SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-0.5">
                {isKn ? 'ಗ್ರಾಹಕ ಜಾಗೃತಿ' : 'Educational Series'}
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {isKn ? 'ಆಯ್ಕೆ ಮಾಡುವ ಮುನ್ನ ಸರಿಯಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ' : 'Key Concepts Explained Simply'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('learn')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{isKn ? 'ಎಲ್ಲಾ ಲೇಖನಗಳು ಮತ್ತು ವಿಡಿಯೋಗಳು' : 'Browse All Educational Guides'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide 1 */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <div className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                {isKn ? 'ವಿಡಿಯೋ ಸಾರಾಂಶ' : 'Video Summary'} · 3 min
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {isKn
                  ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಪಾಲಿಸಿಯಲ್ಲಿ ನಾಮಿನಿ ಆಯ್ಕೆ ಮಾಡುವಾಗ ಮಾಡುವ 3 ತಪ್ಪುಗಳು'
                  : '3 Common Mistakes People Make While Choosing a Policy Nominee'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isKn
                  ? 'ಅಪ್ರಾಪ್ತ ವಯಸ್ಕರನ್ನು ನಾಮಿನಿ ಮಾಡಿದಾಗ ಅಪಾಯಿಂಟಿ (Appointee) ನೇಮಿಸುವುದು ಹೇಗೆ, ಮತ್ತು ಮದುವೆಯ ನಂತರ ನಾಮಿನಿ ಬದಲಾಯಿಸುವುದು ಏಕೆ ಕಡ್ಡಾಯ.'
                  : 'Guidance on minor nominees, appointing a guardian, and maintaining updated legal nominee records under Section 39 of the Insurance Act.'}
              </p>
            </div>

            {/* Guide 2 */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <div className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                {isKn ? 'ಶೈಕ್ಷಣಿಕ ಮಾರ್ಗದರ್ಶಿ' : 'Educational Guide'} · 4 min
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {isKn
                  ? 'ಗ್ಯಾರಂಟಿಡ್ ಮೆಚುರಿಟಿ ಮತ್ತು ವೇರಿಯಬಲ್ ಬೋನಸ್: ಎರಡರ ವ್ಯತ್ಯಾಸವೇನು?'
                  : 'Understanding Guaranteed Benefits vs Non-Guaranteed Projected Bonuses'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isKn
                  ? 'ಪಾಲಿಸಿ ಪ್ರಸ್ತಾಪ ಪತ್ರದಲ್ಲಿ ನೀಡಲಾದ 4% ಮತ್ತು 8% ವಿವರಣಾ ಕೋಷ್ಟಕಗಳನ್ನು ಹೇಗೆ ಸರಿಯಾಗಿ ಅರ್ಥೈಸಿಕೊಳ್ಳಬೇಕು.'
                  : 'How to read IRDAI-mandated benefit illustration tables (4% & 8% rates) without confusing projected values for contractual promises.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL CAROUSEL (Placed below educational video section; renders only when isTestimonialsPublished is true) */}
      {isTestimonialsPublished && (
        <TestimonialCarousel
          testimonials={testimonials}
          isPublished={isTestimonialsPublished}
          language={language}
        />
      )}

      {/* 7. FAQS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
            {isKn ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಪ್ರಾಮಾಣಿಕ ಉತ್ತರ' : 'Clarity First'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.faqsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{t.faq1Q}</span>
            </h4>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{t.faq1A}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{t.faq2Q}</span>
            </h4>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{t.faq2A}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{t.faq3Q}</span>
            </h4>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{t.faq3A}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{t.faq4Q}</span>
            </h4>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{t.faq4A}</p>
          </div>
        </div>
      </section>

      {/* 8. SHORT ENQUIRY FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadCaptureForm
          language={language}
          onLeadSubmitted={onLeadCaptured}
          isCallbackRequestOnly={false}
        />
      </section>
    </div>
  );
};
