import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Heart,
  Users,
  Wallet,
  Home,
  CheckSquare,
  Calculator,
  Compass,
  Clock,
  PiggyBank,
  GraduationCap,
  TrendingUp,
  Scale,
  Lock,
  AlertTriangle,
  Sun,
  FileCheck,
  UserCheck,
  Workflow,
  Headphones,
  Calendar,
  MessageCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Language, PublicRoute } from '../types';
import { ADVISOR_CONFIG } from '../config/advisorConfig';
import { GUIDE_SLIDES_TOPICS } from '../config/heroAndGuideConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingWithGap?: (gap: number) => void;
  onOpenBookingWithEducationCost?: (cost: number) => void;
}

export const FamilyPlanningGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onNavigate,
  onOpenBookingWithGap,
  onOpenBookingWithEducationCost,
}) => {
  const isKn = language === 'kn';
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 25;

  // Local state for interactive tools within the guide
  // Slide 4: Monthly expenses
  const [rent, setRent] = useState(12000);
  const [groceries, setGroceries] = useState(15000);
  const [utilities, setUtilities] = useState(5000);
  const [schoolFees, setSchoolFees] = useState(8000);
  const totalMonthlyExpense = rent + groceries + utilities + schoolFees;

  // Slide 7: Family Protection Gap
  const [gapMonthlyExp, setGapMonthlyExp] = useState(35000);
  const [gapYears, setGapYears] = useState(15);
  const [gapDebt, setGapDebt] = useState(1500000);
  const [gapGoals, setGapGoals] = useState(1000000);
  const [gapAssets, setGapAssets] = useState(800000);
  const [gapExistingCover, setGapExistingCover] = useState(1000000);

  const calculatedGap = Math.max(
    0,
    gapMonthlyExp * 12 * gapYears + gapDebt + gapGoals - gapAssets - gapExistingCover
  );

  // Slide 12: Child Education Planner
  const [eduCurrentCost, setEduCurrentCost] = useState(1000000);
  const [eduYears, setEduYears] = useState(10);
  const [eduInflation, setEduInflation] = useState(8);
  const calculatedFutureEduCost = Math.round(
    eduCurrentCost * Math.pow(1 + eduInflation / 100, eduYears)
  );

  // Modal reference for focus trapping
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus modal
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalSlides, onClose]);

  if (!isOpen) return null;

  const currentTopic = GUIDE_SLIDES_TOPICS.find((t) => t.slides.includes(currentSlide)) || GUIDE_SLIDES_TOPICS[0];

  const handleNext = () => setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
  const handlePrev = () => setCurrentSlide((prev) => Math.max(1, prev - 1));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto outline-none"
    >
      <div className="bg-[#FAF9F5] text-[#0F1D36] rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh] overflow-hidden border border-slate-200">
        {/* Header Bar */}
        <div className="bg-white px-5 sm:px-8 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center text-xs font-bold font-mono">
              {currentSlide < 10 ? `0${currentSlide}` : currentSlide}
            </span>
            <div>
              <div className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                {isKn ? currentTopic.titleKn : currentTopic.titleEn}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {isKn ? `ಹಂತ ${currentSlide} / ${totalSlides}` : `Slide ${currentSlide} of ${totalSlides}`}
              </div>
            </div>
          </div>

          {/* Quick topic navigation jump on desktop */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-md py-1">
            {GUIDE_SLIDES_TOPICS.map((topic) => {
              const isCurrent = topic.slides.includes(currentSlide);
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setCurrentSlide(topic.slides[0])}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? 'bg-teal-800 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isKn ? topic.titleKn : topic.titleEn}
                </button>
              );
            })}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close interactive guide"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Body Stage */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* SLIDE 01: WELCOME */}
          {currentSlide === 1 && (
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 mx-auto flex items-center justify-center shadow-xs">
                <Compass className="w-8 h-8 text-teal-800" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಪರಿಚಯ ಮತ್ತು ಸ್ವಾಗತ' : 'Welcome to Thoughtful Planning'}
                </span>
                <h2 id="guide-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {isKn ? 'ನಿಮ್ಮ ಕುಟುಂಬದ ಆದ್ಯತೆಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ.' : 'Start with your family’s priorities.'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isKn
                    ? 'ಜೀವ ವಿಮೆ ಕೇವಲ ಒಂದು ಕಾಗದವಲ್ಲ; ಅದು ನಿಮ್ಮ ಅನುಪಸ್ಥಿತಿಯಲ್ಲೂ ಕುಟುಂಬದ ಗೌರವಯುತ ಜೀವನ ಮತ್ತು ಮಕ್ಕಳ ಶಿಕ್ಷಣವನ್ನು ಕಾಪಾಡುವ ಆರ್ಥಿಕ ಭದ್ರತೆಯಾಗಿದೆ.'
                    : 'This 25-step interactive guide breaks down family protection, higher education milestones, and retirement planning into clear, practical principles.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1">
                  <span className="font-bold text-xs text-slate-900 block">{isKn ? '1. ಕುಟುಂಬ ರಕ್ಷಣೆ' : '1. Protection Gap'}</span>
                  <p className="text-[11px] text-slate-500">{isKn ? 'ಸಾಲ & ವೆಚ್ಚಗಳ ಸರಳ ಲೆಕ್ಕ' : 'Liabilities & living support'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1">
                  <span className="font-bold text-xs text-slate-900 block">{isKn ? '2. ಮಕ್ಕಳ ಶಿಕ್ಷಣ' : '2. Education Cost'}</span>
                  <p className="text-[11px] text-slate-500">{isKn ? 'ಹಣದುಬ್ಬರ ಸಹಿತ ಅಂದಾಜು' : 'Compounding college costs'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1">
                  <span className="font-bold text-xs text-slate-900 block">{isKn ? '3. ಪಾಲಿಸಿ ಪರಿಶೀಲನೆ' : '3. Policy Clarity'}</span>
                  <p className="text-[11px] text-slate-500">{isKn ? 'ಗ್ಯಾರಂಟಿಡ್ ಸೌಲಭ್ಯ & ನಾಮಿನಿ' : 'Contract terms & nominees'}</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{isKn ? 'ಮಾರ್ಗದರ್ಶಿ ಪ್ರಾರಂಭಿಸಿ (ಮುಂದೆ)' : 'Begin Family Guide'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 02: LIFE STAGE */}
          {currentSlide === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಜೀವನ ಹಂತಗಳು' : 'Milestones'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಪ್ರತಿಯೊಂದು ಜೀವನ ಹಂತವೂ ವಿಭಿನ್ನ ಜವಾಬ್ದಾರಿಗಳನ್ನು ತರುತ್ತದೆ.' : 'Every life stage brings different responsibilities.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಯಾವುದೇ ಪೂರ್ವನಿಯೋಜಿತ ಉತ್ಪನ್ನವನ್ನು ಶಿಫಾರಸು ಮಾಡದೆ, ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಂತವನ್ನು ಗುರುತಿಸಿ:' : 'Explore key responsibilities across different chapters of family life:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-teal-700" />
                    <span>{isKn ? 'ನವ ವಿವಾಹಿತರು' : 'Newly Married'}</span>
                  </span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಹೊಸ ಗೃಹಸಾಲ, ಆರಂಭಿಕ ಉಳಿತಾಯ ಮತ್ತು ಸಂಗಾತಿಯ ಆರ್ಥಿಕ ರಕ್ಷಣೆ.' : 'Joint financial goals, home loan commitments, and income security for the surviving partner.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-teal-700" />
                    <span>{isKn ? 'ಚಿಕ್ಕ ಮಕ್ಕಳಿರುವ ಪಾಲಕರು' : 'Young Parents'}</span>
                  </span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಮಕ್ಕಳ ಶಾಲೆ & ಕಾಲೇಜು ಶಿಕ್ಷಣ ನಿಧಿ, ಗರಿಷ್ಠ ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಕವರ್.' : 'Higher education provisions and maximum pure-term risk cover during key earning years.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-700" />
                    <span>{isKn ? 'ಸ್ಥಿರ ದುಡಿಯುವ ವಯಸ್ಕರು' : 'Peak Working Adults'}</span>
                  </span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಉದ್ಯಮ ಅಥವಾ ಉದ್ಯೋಗದ ಸಾಲಗಳನ್ನು ತೀರಿಸುವುದು ಮತ್ತು ನಿವೃತ್ತಿ ಉಳಿತಾಯ.' : 'Debt retirement, lifestyle stabilization, and growing guaranteed pension corpus.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-teal-700" />
                    <span>{isKn ? 'ನಿವೃತ್ತಿಯ ಸನಿಹದಲ್ಲಿರುವವರು' : 'Approaching Retirement'}</span>
                  </span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಖಚಿತ ಮಾಸಿಕ ಪಿಂಚಣಿ, ವೈದ್ಯಕೀಯ ತುರ್ತು ನಿಧಿ ಮತ್ತು ಬಂಡವಾಳ ಸುರಕ್ಷತೆ.' : 'Guaranteed monthly annuity stream, capital safety, and health contingency reserves.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 03: DEPENDANTS */}
          {currentSlide === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಆಶ್ರಿತರು' : 'Household Support'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಆದಾಯದ ಮೇಲೆ ಯಾರು ಅವಲಂಬಿತರಾಗಿದ್ದಾರೆ?' : 'Who depends on your income?'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ನಿಮ್ಮ ಮಾಸಿಕ ದುಡಿಮೆ ಇಲ್ಲದಿದ್ದರೆ ಯಾರಿಗೆ ತಕ್ಷಣ ಆರ್ಥಿಕ ಆಸರೆಯ ಅಗತ್ಯ ಬೀಳುತ್ತದೆ?' : 'Identifying who relies on your regular cashflow guides the required coverage horizon:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block">{isKn ? 'ಸಂಗಾತಿ' : 'Spouse'}</span>
                    <span className="text-[11px] text-slate-500">{isKn ? 'ದೈನಂದಿನ ಜೀವನ ವೆಚ್ಚ' : 'Living support'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block">{isKn ? 'ಮಕ್ಕಳು' : 'Children'}</span>
                    <span className="text-[11px] text-slate-500">{isKn ? 'ಶಿಕ್ಷಣ & ಪಾಲನೆ' : 'Education & care'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block">{isKn ? 'ವೃದ್ಧ ಪಾಲಕರು' : 'Parents'}</span>
                    <span className="text-[11px] text-slate-500">{isKn ? 'ಔಷಧ & ನೆಮ್ಮದಿ' : 'Healthcare support'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block">{isKn ? 'ಉದ್ಯಮ ಪಾಲುದಾರರು' : 'Partners'}</span>
                    <span className="text-[11px] text-slate-500">{isKn ? 'ವ್ಯಾಪಾರ ಹೊಣೆ' : 'Business continuity'}</span>
                  </div>
                </div>

                <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-[11px] text-teal-950 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>
                    {isKn
                      ? 'ನೆನಪಿಡಿ: ಯಾರೂ ನಿಮ್ಮ ಆದಾಯದ ಮೇಲೆ ಅವಲಂಬಿತರಾಗಿಲ್ಲದಿದ್ದರೆ, ದೊಡ್ಡ ಮೊತ್ತದ ಟರ್ಮ್ ಕವರ್‌ನ ಅಗತ್ಯ ಕಡಿಮೆ ಇರಬಹುದು. ಆದರೆ ಸಾಲ ಅಥವಾ ಆಶ್ರಿತರಿದ್ದರೆ, ಆದಾಯ ಬದಲಿ ರಕ್ಷಣೆ ಮೊದಲ ಆದ್ಯತೆಯಾಗಬೇಕು.'
                      : 'Rule of thumb: If no one depends on your income and you carry no debt, term protection needs are minimal. If dependants exist, protection must replace cashflow until they are independent.'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 04: MONTHLY EXPENSES (INTERACTIVE) */}
          {currentSlide === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಮಾಸಿಕ ಜೀವನ ವೆಚ್ಚ' : 'Cashflow Needs'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಪ್ರತಿ ತಿಂಗಳು ಎಷ್ಟು ಹಣದ ಅಗತ್ಯವಿದೆ?' : 'Understand what your household needs each month.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಕೆಳಗಿನ ಮಾಸಿಕ ವೆಚ್ಚಗಳನ್ನು ಹೊಂದಿಸಿ ಒಟ್ಟು ಅಗತ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ:' : 'Adjust these typical household costs to inspect your monthly baseline:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {isKn ? 'ಮನೆ ಬಾಡಿಗೆ / ನಿರ್ವಹಣೆ' : 'Rent / Home Maintenance'}
                    </label>
                    <input
                      type="number"
                      step={1000}
                      value={rent}
                      onChange={(e) => setRent(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {isKn ? 'ದವಸ-ಧಾನ್ಯ & ದಿನಸಿ ವೆಚ್ಚ' : 'Groceries & Provisions'}
                    </label>
                    <input
                      type="number"
                      step={1000}
                      value={groceries}
                      onChange={(e) => setGroceries(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {isKn ? 'ವಿದ್ಯುತ್, ನೀರು & ಮೊಬೈಲ್ ಬಿಲ್‌ಗಳು' : 'Utilities & Fuel'}
                    </label>
                    <input
                      type="number"
                      step={500}
                      value={utilities}
                      onChange={(e) => setUtilities(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {isKn ? 'ಮಕ್ಕಳ ಶಾಲಾ ಶುಲ್ಕ & ವ್ಯಾನ್ ವೆಚ್ಚ' : 'School / Education Expenses'}
                    </label>
                    <input
                      type="number"
                      step={1000}
                      value={schoolFees}
                      onChange={(e) => setSchoolFees(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                </div>

                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-teal-800 uppercase block">
                      {isKn ? 'ಒಟ್ಟು ಅಂದಾಜು ಮಾಸಿಕ ವೆಚ್ಚ' : 'Total Monthly Base Expense'}
                    </span>
                    <span className="text-xl font-bold text-teal-950 tabular-nums">
                      ₹{totalMonthlyExpense.toLocaleString('en-IN')} / {isKn ? 'ತಿಂಗಳು' : 'month'}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <span>{isKn ? 'ವಾರ್ಷಿಕ:' : 'Annual:'}</span>{' '}
                    <strong className="text-slate-800 tabular-nums font-semibold">
                      ₹{(totalMonthlyExpense * 12).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 05: OUTSTANDING LOANS */}
          {currentSlide === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಸಾಲದ ಹೊಣೆಗಾರಿಕೆಗಳು' : 'Liabilities'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಮುಂದುವರಿಯುವ ಹೊಣೆಗಾರಿಕೆಗಳನ್ನು ಪರಿಗಣಿಸಿ.' : 'Include the responsibilities that continue.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಅನುಪಸ್ಥಿತಿಯಲ್ಲೂ ಬ್ಯಾಂಕ್ ಇಎಂಐಗಳು ಮುಂದುವರಿಯುತ್ತವೆ:' : 'Debts and loans do not disappear; protection ensures family assets are not auctioned:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <Home className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಗೃಹ ಸಾಲ (Home Loan)' : 'Home Loan (EMI)'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {isKn ? 'ಕುಟುಂಬದ ನೆಲೆ ರಕ್ಷಿಸಲು ಸಾಲದ ಮೊತ್ತಕ್ಕೆ ಸಮನಾದ ಟರ್ಮ್ ಕವರ್ ಇರಬೇಕು.' : 'Prevents banks from taking possession of the family residence.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <Wallet className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಉದ್ಯಮ / ವ್ಯಾಪಾರ ಸಾಲ' : 'Business / APMC Loans'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {isKn ? 'ರೈಸ್ ಮಿಲ್, ವ್ಯಾಪಾರ ಅಥವಾ ಕ್ರೆಡಿಟ್ ಸಾಲಗಳು ಕುಟುಂಬದ ಮೇಲೆ ಬೀಳಬಾರದು.' : 'Protects commercial continuity and protects personal family guarantees.'}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <GraduationCap className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಶಿಕ್ಷಣ ಅಥವಾ ವೈಯಕ್ತಿಕ ಸಾಲ' : 'Education / Personal'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {isKn ? 'ಹೆಚ್ಚಿನ ಬಡ್ಡಿಯ ಸಾಲಗಳನ್ನು ತೀರಿಸಲು ತುರ್ತು ಕ್ಲೈಮ್ ಮೊತ್ತ ಸಿಗಬೇಕು.' : 'Eliminates high-interest unsecured borrowing burdens.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 06: EXISTING COVER */}
          {currentSlide === 6 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಹಾಲಿ ರಕ್ಷಣೆ ಪರಿಶೀಲನೆ' : 'Audit Existing Cover'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನೀವು ಈಗಾಗಲೇ ಹೊಂದಿರುವ ರಕ್ಷಣೆಯನ್ನು ಲೆಕ್ಕಕ್ಕೆ ತೆಗೆದುಕೊಳ್ಳಿ.' : 'Take stock of the protection you already have.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ; ಈ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ನೀವೇ ಪರಿಶೀಲಿಸಿ:' : 'No policy upload is needed. Review what you already have in force:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckSquare className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಮೊತ್ತ (Sum Assured):' : 'Pure Term Insurance Cover:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯದ ಕನಿಷ್ಠ 10 ರಿಂದ 15 ಪಟ್ಟು ಕವರ್ ಇದೆಯೇ?' : 'Is your pure life cover at least 10–15 times your current annual earnings?'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckSquare className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಉಳಿತಾಯ / ಎಂಡೋಮೆಂಟ್ ಪಾಲಿಸಿಗಳು:' : 'Endowment / Traditional Policies:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ಮೆಚುರಿಟಿ ಮೊತ್ತ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಮುಕ್ತಾಯದ ದಿನಾಂಕಗಳು ತಿಳಿದಿವೆಯೇ?' : 'Check maturity dates and whether the death benefit is sufficient.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckSquare className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಉದ್ಯೋಗದಾತರ ಗ್ರೂಪ್ ಇನ್ಶೂರೆನ್ಸ್ (GTLI):' : 'Employer Group Term Cover:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ಕೆಲಸ ಬದಲಾಯಿಸಿದರೆ ಅಥವಾ ನಿವೃತ್ತಿಯಾದರೆ ಈ ಕವರ್ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.' : 'Remember employer policies lapse immediately if you change employment.'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 07: PROTECTION GAP (INTERACTIVE CALCULATOR) */}
          {currentSlide === 7 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಟೂಲ್ A: ರಕ್ಷಣಾ ಕೊರತೆ ಲೆಕ್ಕಾಚಾರ' : 'Tool A: Protection Gap'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಕುಟುಂಬದ ನಿವ್ವಳ ರಕ್ಷಣಾ ಕೊರತೆಯನ್ನು ಲೆಕ್ಕ ಹಾಕಿ.' : 'Explore a starting estimate.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಪಾರದರ್ಶಕ ಸೂತ್ರ: max(0, ಮಾಸಿಕ ವೆಚ್ಚ × 12 × ವರ್ಷ + ಸಾಲ + ಗುರಿಗಳು − ಅಸೆಟ್ − ಹಾಲಿ ಕವರ್)' : 'Transparent formula: max(0, expenses * 12 * years + debt + goals - assets - cover)'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ಮಾಸಿಕ ವೆಚ್ಚ (₹)' : 'Monthly Expenses (₹)'}</label>
                    <input
                      type="number"
                      step={5000}
                      value={gapMonthlyExp}
                      onChange={(e) => setGapMonthlyExp(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ಬೆಂಬಲ ವರ್ಷಗಳು' : 'Support Years'}</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={gapYears}
                      onChange={(e) => setGapYears(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ಬಾಕಿ ಇರುವ ಸಾಲ (₹)' : 'Outstanding Debt (₹)'}</label>
                    <input
                      type="number"
                      step={100000}
                      value={gapDebt}
                      onChange={(e) => setGapDebt(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ಹಾಲಿ ಇರುವ ಜೀವ ವಿಮೆ (₹)' : 'Existing Life Cover (₹)'}</label>
                    <input
                      type="number"
                      step={100000}
                      value={gapExistingCover}
                      onChange={(e) => setGapExistingCover(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                </div>

                <div className="p-4 bg-teal-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-teal-300 text-[11px] uppercase tracking-wider block">
                      {isKn ? 'ಅಂದಾಜು ಕುಟುಂಬ ರಕ್ಷಣಾ ಕೊರತೆ' : 'Estimated Protection Gap'}
                    </span>
                    <span className="text-2xl font-extrabold text-white tabular-nums">
                      ₹{calculatedGap.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {onOpenBookingWithGap && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBookingWithGap(calculatedGap);
                      }}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {isKn ? 'ಈ ಮೊತ್ತದೊಂದಿಗೆ ಸಮಾಲೋಚನೆ' : 'Book with This Gap'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 08: TERM INSURANCE BASICS */}
          {currentSlide === 8 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಮೂಲ ತತ್ವ' : 'Pure Risk Cover'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ರಕ್ಷಣಾ ಕೇಂದ್ರಿತ ಜೀವ ವಿಮೆಯನ್ನು ಸರಿಯಾಗಿ ಅರ್ಥೈಸಿಕೊಳ್ಳಿ.' : 'Understand protection-focused life insurance.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಕಡಿಮೆ ಪ್ರೀಮಿಯಂನಲ್ಲಿ ಗರಿಷ್ಠ ಮೊತ್ತದ ಕುಟುಂಬ ರಕ್ಷಣೆ ನೀಡುವ ಶುದ್ಧ ಕವರ್:' : 'Term insurance is pure death benefit protection without savings mixing:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-teal-900">
                    <Shield className="w-4 h-4 text-teal-700" />
                    <span>{isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ವೈಶಿಷ್ಟ್ಯ' : 'Core Features'}</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    <li>• {isKn ? 'ಕಡಿಮೆ ಪ್ರೀಮಿಯಂನಲ್ಲಿ ₹1 ಕೋಟಿ ಅಥವಾ ಹೆಚ್ಚಿನ ಕವರ್ ಲಭ್ಯ.' : 'High sum assured (e.g. ₹1 Crore+) at affordable annual cost.'}</li>
                    <li>• {isKn ? 'ಪಾಲಿಸಿ ಅವಧಿಯಲ್ಲಿ ಮರಣ ಸಂಭವಿಸಿದರೆ ಪೂರ್ಣ ಮೊತ್ತ ನಾಮಿನಿಗೆ ಲಭ್ಯ.' : 'Full lump-sum payout directly to nominee upon untimely demise.'}</li>
                    <li>• {isKn ? 'ಸಾಲಗಳನ್ನು ತೀರಿಸಲು ಮತ್ತು ಕುಟುಂಬದ ವೆಚ್ಚಕ್ಕೆ ನೇರ ರಕ್ಷಣೆ.' : 'Directly settles outstanding liabilities without asset loss.'}</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>{isKn ? 'ತಿಳಿದಿರಬೇಕಾದ ಮಿತಿಗಳು' : 'Important Limitations'}</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    <li>• {isKn ? 'ಪಾಲಿಸಿದಾರರು ಬದುಕಿ ಉಳಿದರೆ ಯಾವುದೇ ಮೆಚುರಿಟಿ ಮೊತ್ತ ಇರುವುದಿಲ್ಲ (ROP ಯೋಜನೆಗಳನ್ನು ಹೊರತುಪಡಿಸಿ).' : 'No maturity refund if policyholder survives term (unless Return of Premium).'}</li>
                    <li>• {isKn ? 'ಇದು ಹೂಡಿಕೆಯಲ್ಲ, ಇದು ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಆದಾಯಕ್ಕೆ ಪರ್ಯಾಯ ಸುರಕ್ಷತೆ.' : 'Not an investment or wealth accumulator, but income replacement.'}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 09: COVER DURATION */}
          {currentSlide === 9 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ರಕ್ಷಣಾ ಅವಧಿ' : 'Tenure Horizons'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಎಷ್ಟು ವರ್ಷಗಳ ಬೆಂಬಲ ಅಗತ್ಯವಿದೆ?' : 'How long might your family need support?'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ವಯಸ್ಸು 60 ಅಥವಾ 65 ರವರೆಗಿನ ರಕ್ಷಣೆ ಸಾಮಾನ್ಯವಾಗಿ ಸೂಕ್ತವಾಗಿರುತ್ತದೆ:' : 'Match coverage tenure to your expected retirement and child independence milestones:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono">
                  <span>Age 30 (Starting)</span>
                  <span>Age 45 (Peak Debt)</span>
                  <span>Age 60 (Child Independent)</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-teal-700 h-full w-2/3" />
                  <div className="bg-slate-300 h-full w-1/3" />
                </div>
                <p className="text-slate-600 text-[11.5px] leading-relaxed">
                  {isKn
                    ? 'ಸಾಮಾನ್ಯವಾಗಿ ಮಕ್ಕಳು ಸ್ವಾವಲಂಬಿಗಳಾಗುವವರೆಗೆ ಮತ್ತು ಸಾಲಗಳು ತೀರುವವರೆಗೆ (ವಯಸ್ಸು 60 ರವರೆಗೆ) ರಕ್ಷಣೆ ಸಾಕು. ಅತಿ ದೀರ್ಘಾವಧಿಯ (99 ವರ್ಷಗಳವರೆಗೆ) ಕವರ್‌ಗೆ ದುಬಾರಿ ಪ್ರೀಮಿಯಂ ತೆರುವ ಅಗತ್ಯವಿಲ್ಲ.'
                    : 'Coverage up to age 60–65 is usually ideal. Once liabilities are cleared and children are financially independent, large life cover is rarely necessary.'}
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 10: AFFORDABILITY */}
          {currentSlide === 10 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಬಜೆಟ್ ಮತ್ತು ಸಾಮರ್ಥ್ಯ' : 'Budget Fit'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಯೋಜನೆಯು ನಿಮ್ಮ ನಿರಂತರ ಬಜೆಟ್‌ಗೆ ಹೊಂದಿಕೊಳ್ಳಬೇಕು.' : 'A plan should fit your ongoing budget.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಲು ಸಾಧ್ಯವಾಗದೆ ಪಾಲಿಸಿ ಲ್ಯಾಪ್ಸ್ ಆಗುವುದನ್ನು ತಪ್ಪಿಸಿ:' : 'Never commit to a premium that strains monthly living cashflow:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                  <PiggyBank className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಶಿಸ್ತುಬದ್ಧ ಕಂತು ಪಾವತಿ:' : 'Sustainable Commitments:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ಸಾಮಾನ್ಯವಾಗಿ ವಾರ್ಷಿಕ ಆದಾಯದ 5% ರಿಂದ 10% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪ್ರೀಮಿಯಂ ಹೊರೆಯಾಗಬಾರದು.' : 'Keep insurance premiums within 5%–10% of disposable household income.'}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಕಂತು ಪಾವತಿ ವಿಧಾನ:' : 'Flexible Frequencies:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ರೈತರು ಸುಗ್ಗಿ ಕಾಲಕ್ಕೆ ತಕ್ಕಂತೆ ವಾರ್ಷಿಕ ಪಾವತಿ ಆರಿಸಿಕೊಳ್ಳಬಹುದು; ಉದ್ಯೋಗಿಗಳು ಮಾಸಿಕ NACH ಆರಿಸಿಕೊಳ್ಳಬಹುದು.' : 'Choose annual or monthly NACH auto-debit based on your income rhythm.'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 11: CHILDREN’S GOALS */}
          {currentSlide === 11 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಮಕ್ಕಳ ಕನಸುಗಳು' : 'Education Milestones'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಭವಿಷ್ಯದ ಶಿಕ್ಷಣ ವೆಚ್ಚಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.' : 'Make future education costs easier to understand.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಇಂದು ₹10 ಲಕ್ಷದ ಕೋರ್ಸ್ ಮಗು ಕಾಲೇಜಿಗೆ ಹೋಗುವ ವೇಳೆಗೆ ₹20 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಬಹುದು:' : 'College fees in India inflate faster than ordinary inflation at 8%–10% annually:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಶಿಕ್ಷಣ ಹಣದುಬ್ಬರ ಪರಿಣಾಮ' : 'Inflation Multiplier'}</span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಪ್ರತಿ 8-9 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಉನ್ನತ ಶಿಕ್ಷಣದ ಶುಲ್ಕ ದುಪ್ಪಟ್ಟಾಗುತ್ತದೆ.' : 'College fee structures historically double every 8 to 9 years in India.'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಪ್ರೀಮಿಯಂ ಮನ್ನಾ ಸೌಲಭ್ಯ (WOP)' : 'Waiver of Premium (WOP)'}</span>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {isKn ? 'ಪಾಲಕರು ಇಲ್ಲದಿದ್ದರೂ ಕಂಪನಿಯೇ ಪ್ರೀಮಿಯಂ ಭರಿಸಿ ನಿಗದಿತ ಹಣವನ್ನು ಮಗುವಿಗೆ ನೀಡುತ್ತದೆ.' : 'Ensures the education fund matures fully even if the parent passes away prematurely.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 12: EDUCATION PLANNER (INTERACTIVE) */}
          {currentSlide === 12 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಟೂಲ್ B: ಶಿಕ್ಷಣ ವೆಚ್ಚ ಯೋಜಕ' : 'Tool B: Education Planner'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಭವಿಷ್ಯದ ಶಿಕ್ಷಣ ವೆಚ್ಚವನ್ನು ಅಂದಾಜಿಸಿ.' : 'Estimate a future education cost.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಸೂತ್ರ: ಪ್ರಸ್ತುತ ವೆಚ್ಚ × (1 + ಹಣದುಬ್ಬರ ದರ)^ವರ್ಷಗಳು' : 'Formula: current cost * (1 + inflation)^years'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ಇಂದಿನ ವೆಚ್ಚ (₹)' : 'Current Cost (₹)'}</label>
                    <input
                      type="number"
                      step={100000}
                      value={eduCurrentCost}
                      onChange={(e) => setEduCurrentCost(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ವರ್ಷಗಳು' : 'Years Remaining'}</label>
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={eduYears}
                      onChange={(e) => setEduYears(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">{isKn ? 'ವಾರ್ಷಿಕ ಹಣದುಬ್ಬರ (%)' : 'Inflation (%)'}</label>
                    <input
                      type="number"
                      min={4}
                      max={15}
                      value={eduInflation}
                      onChange={(e) => setEduInflation(Number(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg tabular-nums"
                    />
                  </div>
                </div>

                <div className="p-4 bg-teal-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-teal-300 text-[11px] uppercase tracking-wider block">
                      {isKn ? `${eduYears} ವರ್ಷಗಳ ನಂತರ ಅಂದಾಜು ವೆಚ್ಚ` : `Estimated Cost in ${eduYears} Years`}
                    </span>
                    <span className="text-2xl font-extrabold text-white tabular-nums">
                      ₹{calculatedFutureEduCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {onOpenBookingWithEducationCost && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBookingWithEducationCost(calculatedFutureEduCost);
                      }}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {isKn ? 'ಈ ಗುರಿಯೊಂದಿಗೆ ಸಮಾಲೋಚನೆ' : 'Book with This Goal'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 13: GOAL TIMELINE */}
          {currentSlide === 13 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಕಾಲಮಿತಿ ಹೊಂದಾಣಿಕೆ' : 'Horizon Matching'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಯೋಜನೆಯನ್ನು ಕಾಲಮಿತಿಗೆ ಹೊಂದಿಸಿ.' : 'Match your planning to your time horizon.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಹಣದ ಅಗತ್ಯವಿರುವ ವರ್ಷಕ್ಕೆ ಮುಂಚಿತವಾಗಿ ಮೆಚುರಿಟಿ ಬರುವಂತೆ ಯೋಜಿಸಬೇಕು:' : 'Align contractual milestone payouts to actual college admission years:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-900">{isKn ? 'ಮಗುವಿನ ವಯಸ್ಸು 18:' : 'Child Age 18:'}</span>
                  <span>{isKn ? 'ಪಿಯುಸಿ ಮುಗಿದು ಪದವಿ ಪ್ರವೇಶ' : 'Degree Admission Entrance'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-900">{isKn ? 'ಮಗುವಿನ ವಯಸ್ಸು 21:' : 'Child Age 21:'}</span>
                  <span>{isKn ? 'ಸ್ನಾತಕೋತ್ತರ / ವೃತ್ತಿಪರ ಕೋರ್ಸ್' : 'Post-Graduate / Higher Studies'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{isKn ? 'ಮಗುವಿನ ವಯಸ್ಸು 25:' : 'Child Age 25:'}</span>
                  <span>{isKn ? 'ವೃತ್ತಿ ಆರಂಭ ಅಥವಾ ಮದುವೆ ನಿಧಿ' : 'Career Setup / Marriage Support'}</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 14: SAVINGS-ORIENTED LIFE INSURANCE */}
          {currentSlide === 14 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಉಳಿತಾಯ ಆಧಾರಿತ ಯೋಜನೆಗಳು' : 'Endowment & Savings'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ರಕ್ಷಣೆ ಮತ್ತು ಉಳಿತಾಯದ ವ್ಯತ್ಯಾಸ ತಿಳಿಯಿರಿ.' : 'Understand how protection and savings features differ.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಎಂಡೋಮೆಂಟ್ ಯೋಜನೆಗಳು ಬಂಡವಾಳ ಸುರಕ್ಷತೆ ಮತ್ತು ಖಚಿತ ಉಳಿತಾಯಕ್ಕೆ ಪೂರಕವಾಗಿರುತ್ತವೆ:' : 'Traditional endowment plans prioritize disciplined savings and guaranteed capital safety:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-teal-900 block">{isKn ? 'ಟರ್ಮ್ ಕವರ್ (Term Cover)' : 'Pure Term Insurance'}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {isKn ? 'ಗರಿಷ್ಠ ರಕ್ಷಣೆ, ಕಡಿಮೆ ಪ್ರೀಮಿಯಂ, ಮೆಚುರಿಟಿ ಉಳಿತಾಯವಿಲ್ಲ.' : 'Maximum family protection for minimal cost, no maturity bonus.'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                  <strong className="text-teal-900 block">{isKn ? 'ಉಳಿತಾಯ ಯೋಜನೆ (Endowment)' : 'Savings / Endowment'}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {isKn ? 'ಜೀವ ರಕ್ಷಣೆಯೊಂದಿಗೆ ಕಾಲಮಿತಿಯ ಖಚಿತ ಮೆಚುರಿಟಿ ಮೊತ್ತ.' : 'Combines modest life cover with structured maturity payouts.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 15: BENEFIT TYPES */}
          {currentSlide === 15 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಗ್ಯಾರಂಟಿಡ್ vs ವೇರಿಯಬಲ್' : 'Benefit Types'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಯಾವುದು ಗ್ಯಾರಂಟಿಡ್ ಮತ್ತು ಯಾವುದು ಅಲ್ಲ ಎಂದು ತಿಳಿಯಿರಿ.' : 'Know what is guaranteed—and what is not.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಪಾಲಿಸಿ ಪ್ರಸ್ತಾಪ ಪತ್ರದಲ್ಲಿ ನೀಡುವ ವಿವರಣೆಯನ್ನು ಅರ್ಥೈಸಿಕೊಳ್ಳುವ ವಿಧಾನ:' : 'IRDAI mandates benefit illustrations showing guaranteed vs projected bonuses:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1.5">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-700" />
                    <span>{isKn ? 'ಗ್ಯಾರಂಟಿಡ್ ಪ್ರಯೋಜನಗಳು' : 'Guaranteed Benefits'}</span>
                  </span>
                  <p className="text-emerald-900 text-[11px] leading-relaxed">
                    {isKn
                      ? 'ಪಾಲಿಸಿ ಕರಾರು ಪತ್ರದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ನಮೂದಿಸಲಾದ ಡೆತ್ ಬೆನಿಫಿಟ್ ಮತ್ತು ಖಚಿತ ಮೆಚುರಿಟಿ ಬೋನಸ್. ಕಂಪನಿಯ ಲಾಭ-ನಷ್ಟಕ್ಕೆ ಒಳಪಟ್ಟಿರುವುದಿಲ್ಲ.'
                      : 'Contractually bound figures written in the policy bond, payable regardless of insurer market performance.'}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1.5">
                  <span className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-700" />
                    <span>{isKn ? 'ನಾನ್-ಗ್ಯಾರಂಟಿಡ್ ಬೋನಸ್‌ಗಳು' : 'Non-Guaranteed Bonuses'}</span>
                  </span>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    {isKn
                      ? '4% ಮತ್ತು 8% ಅಂಕಿಅಂಶಗಳು ಕೇವಲ ಕಂಪನಿಯ ಭವಿಷ್ಯದ ಅಂದಾಜುಗಳು (Projections). ಅವು ಭವಿಷ್ಯದ ಖಚಿತ ವಾಗ್ದಾನಗಳಲ್ಲ.'
                      : 'Projected rates at 4% and 8% are illustrative models. They depend on annual life fund bonuses declared by the insurer.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 16: ACCESS AND COMMITMENTS */}
          {currentSlide === 16 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಕಂತು ಬದ್ಧತೆ & ಸರೆಂಡರ್ ನಿಯಮ' : 'Commitment Terms'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಪ್ರೀಮಿಯಂ ಅವಧಿ ಮತ್ತು ಮಧ್ಯದಲ್ಲೇ ನಿಲ್ಲಿಸುವ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.' : 'Ask about premiums, access and early exit.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಪಾಲಿಸಿಯನ್ನು ಅರ್ಧದಲ್ಲೇ ನಿಲ್ಲಿಸಿದರೆ ನಷ್ಟವಾಗುವ ಸಂಭವವಿರುತ್ತದೆ:' : 'Understanding lock-in, surrender charges, and loan against policy:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? 'ಪ್ರೀಮಿಯಂ ಪಾವತಿ ಅವಧಿ (PPT):' : 'Premium Payment Term (PPT):'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಪಾಲಿಸಿ ಅವಧಿ 20 ವರ್ಷಗಳಿದ್ದರೂ, ಪ್ರೀಮಿಯಂ ಅನ್ನು 10 ಅಥವಾ 15 ವರ್ಷ ಮಾತ್ರ ಪಾವತಿಸುವ ಲಿಮಿಟೆಡ್ ಪೇ ಆಯ್ಕೆ ಇರಬಹುದು.' : 'Limited pay options allow paying premiums for 5, 10, or 12 years while cover runs longer.'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? 'ಸರೆಂಡರ್ ಮೌಲ್ಯ (Surrender Value):' : 'Surrender Value Penalty:'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಮೊದಲ 2-3 ವರ್ಷಗಳಲ್ಲಿ ಪಾಲಿಸಿ ನಿಲ್ಲಿಸಿದರೆ ಪಾವತಿಸಿದ ಬಹುಪಾಲು ಹಣ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ.' : 'Terminating policies early in the first few years incurs heavy penalties under IRDAI rules.'}</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 17: MARKET-LINKED PRODUCTS */}
          {currentSlide === 17 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಮಾರುಕಟ್ಟೆ ಆಧಾರಿತ ಯೋಜನೆಗಳು (ULIP)' : 'Market-Linked Products'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಮಾರುಕಟ್ಟೆ ರಿಸ್ಕ್ ಅರ್ಥಮಾಡಿಕೊಂಡು ಮುಂದುವರಿಯಿರಿ.' : 'Understand market risk before deciding.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಯುಲಿಪ್ (ULIP) ಯೋಜನೆಗಳಲ್ಲಿ ಹೂಡಿಕೆಯ ರಿಸ್ಕ್ ಪಾಲಿಸಿದಾರರದ್ದಾಗಿರುತ್ತದೆ:' : 'In Unit Linked Insurance Plans, investment risk in NAV is borne by the policyholder:'}
                </p>
              </div>

              <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>{isKn ? 'ಕಾನೂನುಬದ್ಧ ಮಾರುಕಟ್ಟೆ ಎಚ್ಚರಿಕೆ' : 'Regulatory Risk Notice'}</span>
                </div>
                <p className="text-[11.5px] leading-relaxed">
                  {isKn
                    ? 'ಯುಲಿಪ್ ಯೋಜನೆಗಳು ಮ್ಯೂಚುವಲ್ ಫಂಡ್‌ಗಳಂತೆ ಷೇರು ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ. ಗ್ಯಾರಂಟಿಡ್ ರಿಟರ್ನ್ಸ್‌ಗಳನ್ನು ಯಾರೂ ನೀಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಕನಿಷ್ಠ 5 ವರ್ಷಗಳ ಲಾಕ್-ಇನ್ ಅವಧಿ ಇರುತ್ತದೆ.'
                    : 'ULIPs are subject to market volatility. Fund values rise and fall based on equity market performance. They are not bank fixed deposits and carry a mandatory 5-year lock-in.'}
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 18: RETIREMENT PRIORITIES */}
          {currentSlide === 18 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ನಿವೃತ್ತಿ ಯೋಜನೆ' : 'Retirement Priorities'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ನಿವೃತ್ತಿ ಜೀವನ ಹೇಗಿರಬೇಕು ಎಂದು ಬಯಸುತ್ತೀರಿ?' : 'What would you like retirement to look like?'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಉದ್ಯೋಗ ನಿವೃತ್ತಿಯ ನಂತರವೂ ನಿಯಮಿತ ಮಾಸಿಕ ಆದಾಯ ಮುಂದುವರಿಯಬೇಕು:' : 'Securing lifelong cashflow so you never depend financially on children:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಖಚಿತ ಮಾಸಿಕ ಪಿಂಚಣಿ' : 'Guaranteed Annuity'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ಜೀವಿತಾವಧಿಯವರೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ಖಾತೆಗೆ ಜಮಾ.' : 'Lifelong fixed monthly pension to cover groceries.'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಆರೋಗ್ಯ ತುರ್ತು ನಿಧಿ' : 'Healthcare Buffer'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ವಯಸ್ಸಾದಂತೆ ಹೆಚ್ಚುವ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸಾ ವೆಚ್ಚ.' : 'Contingency fund for diagnostic tests and medicines.'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಸ್ವಾವಲಂಬಿ ನೆಮ್ಮದಿ' : 'Dignity & Autonomy'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ಮಕ್ಕಳ ಮೇಲಿನ ಆರ್ಥಿಕ ಅವಲಂಬನೆ ಇಲ್ಲದಿರುವುದು.' : 'Maintaining financial freedom and personal dignity.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 19: FUTURE EXPENSES */}
          {currentSlide === 19 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ನಿವೃತ್ತಿ ನಂತರದ ವೆಚ್ಚಗಳು' : 'Post-Retirement Outflows'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ವೆಚ್ಚಗಳು ಹೇಗೆ ಬದಲಾಗಬಹುದು ಎಂದು ಯೋಚಿಸಿ.' : 'Consider how your expenses may change.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಕೆಲವು ವೆಚ್ಚಗಳು ಕಡಿಮೆಯಾದರೆ (ಇಎಂಐ), ಇನ್ನು ಕೆಲವು ಹೆಚ್ಚಾಗುತ್ತವೆ (ವೈದ್ಯಕೀಯ):' : 'While commuting and home loans end, healthcare and food inflation expand:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>{isKn ? 'ಕಡಿಮೆಯಾಗುವ ವೆಚ್ಚಗಳು:' : 'Expenses that typically drop:'}</span>
                  <strong className="text-emerald-700">{isKn ? 'ಗೃಹಸಾಲ ಇಎಂಐ, ಮಕ್ಕಳ ಶಾಲಾ ಫೀಸ್' : 'Home Loan EMIs, Children Education'}</strong>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>{isKn ? 'ಹೆಚ್ಚಾಗುವ ವೆಚ್ಚಗಳು:' : 'Expenses that typically rise:'}</span>
                  <strong className="text-amber-800">{isKn ? 'ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ, ಔಷಧಿಗಳು, ಬೆಲೆ ಏರಿಕೆ' : 'Healthcare, Diagnostic Care, Inflation'}</strong>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 20: POLICY UNDERSTANDING */}
          {currentSlide === 20 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಪಾಲಿಸಿ ಪರಿಶೀಲನಾ ಚೆಕ್‌ಲಿಸ್ಟ್' : 'Terms Checklist'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಮುನ್ನ ವಿವರಗಳನ್ನು ಓದಿ.' : 'Read the details before you decide.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಪ್ರತಿಯೊಬ್ಬ ಗ್ರಾಹಕರೂ ಪರಿಶೀಲಿಸಬೇಕಾದ 4 ಅಂಶಗಳು:' : 'Always verify key clauses before signing an insurance proposal:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? '1. ವಿನಾಯಿತಿಗಳು (Exclusions):' : '1. Policy Exclusions:'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಯಾವ ಸಂದರ್ಭಗಳಲ್ಲಿ ಕ್ಲೈಮ್ ಸಿಗುವುದಿಲ್ಲ (ಉದಾ: ಆರಂಭಿಕ ವರ್ಷದ ಆತ್ಮಹತ್ಯೆ ನಿಯಮ).' : 'Check standard exclusions such as first-year suicide clause.'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? '2. ವೇಯ್ಟಿಂಗ್ ಪಿರಿಯಡ್:' : '2. Waiting Periods:'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಕ್ರಿಟಿಕಲ್ ಇಲ್ನೆಸ್ ಅಥವಾ ರೈಡರ್‌ಗಳಿಗೆ ಇರುವ ಕಾಯುವಿಕೆಯ ಅವಧಿ.' : 'Review critical illness and disability rider waiting periods.'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? '3. ಆರೋಗ್ಯ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ:' : '3. Medical Disclosure:'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಬಿಪಿ, ಶುಗರ್ ಅಥವಾ ಹಳೆಯ ಕಾಯಿಲೆಗಳನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ತಿಳಿಸಿ.' : 'Fully disclose all pre-existing medical history on proposal form.'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">{isKn ? '4. ಫ್ರೀ-ಲುಕ್ ಅವಧಿ (Free Look):' : '4. Free-Look Period:'}</strong>
                  <span className="text-slate-600 text-[11px]">{isKn ? 'ಪಾಲಿಸಿ ಬಾಂಡ್ ಬಂದ 15-30 ದಿನಗಳಲ್ಲಿ ಇಷ್ಟವಾಗದಿದ್ದರೆ ರದ್ದುಪಡಿಸಿ ಹಣ ಮರಳಿ ಪಡೆಯುವ ಹಕ್ಕು.' : '15–30 days to review physical policy bond and cancel if dissatisfied.'}</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 21: NOMINEE DETAILS */}
          {currentSlide === 21 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ನಾಮಿನಿ ನಿಯಮಗಳು' : 'Section 39 Nomination'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಮುಖ್ಯ ಪಾಲಿಸಿ ವಿವರಗಳನ್ನು ಸದಾ ಅಪ್‌ಡೇಟ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ.' : 'Keep important policy details current.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ನಾಮಿನಿ ಹೆಸರು ಸ್ಪಷ್ಟವಾಗಿದ್ದರೆ ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥದಲ್ಲಿ ಯಾವುದೇ ಅಡೆತಡೆ ಉಂಟಾಗುವುದಿಲ್ಲ:' : 'Ensures death benefits pass directly to chosen beneficiaries:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ಅಪ್ರಾಪ್ತ ವಯಸ್ಕ ನಾಮಿನಿ (Minor):' : 'Minor Nominee Appointee:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ಮಗುವಿಗೆ 18 ವರ್ಷ ತುಂಬುವ ಮುನ್ನ ನಾಮಿನಿ ಮಾಡಿದರೆ ಅಪಾಯಿಂಟಿ (ಟ್ರಸ್ಟ್ ಪೋಷಕರು) ನೇಮಕ ಕಡ್ಡಾಯ.' : 'If nominee is under 18, you must legally declare an adult Appointee.'}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isKn ? 'ವಿವಾಹದ ನಂತರ ಬದಲಾವಣೆ:' : 'Post-Marriage Updates:'}</strong>
                    <span className="text-slate-600 text-[11px]">{isKn ? 'ಮದುವೆಯ ನಂತರ ಪತ್ನಿ ಅಥವಾ ಗಂಡನ ಹೆಸರನ್ನು ಅಧಿಕೃತವಾಗಿ ನಾಮಿನಿಯಾಗಿ ಸೇರಿಸಿಕೊಳ್ಳಿ.' : 'Update marital records to designate spouse as primary beneficiary.'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 22: OFFICIAL PROCESS */}
          {currentSlide === 22 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಅಧಿಕೃತ ಪ್ರಕ್ರಿಯೆ' : 'Advisory Roadmap'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ವಿಚಾರಣೆಯ ನಂತರ ಏನಾಗುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ.' : 'Know what happens after an enquiry.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಪಾರದರ್ಶಕ 5 ಹಂತಗಳ ಪ್ರಕ್ರಿಯೆ; ಪಾಲಿಸಿ ವಿತರಣೆ ಕಂಪನಿಯ ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ:' : 'Step-by-step advisory flow from first consultation to policy bond dispatch:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-teal-800 block text-sm">01</span>
                  <span className="font-semibold text-slate-900 block mt-1">{isKn ? 'ಸಮಾಲೋಚನೆ' : 'Consultation'}</span>
                  <span className="text-[10px] text-slate-500">{isKn ? 'ಅಗತ್ಯ ವಿಶ್ಲೇಷಣೆ' : 'Needs Review'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-teal-800 block text-sm">02</span>
                  <span className="font-semibold text-slate-900 block mt-1">{isKn ? 'ಪ್ರಸ್ತಾಪ' : 'Proposal'}</span>
                  <span className="text-[10px] text-slate-500">{isKn ? 'ಅರ್ಜಿ & ಕೆವೈಸಿ' : 'KYC Form'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-teal-800 block text-sm">03</span>
                  <span className="font-semibold text-slate-900 block mt-1">{isKn ? 'ಅಂಡರ್‌ರೈಟಿಂಗ್' : 'Underwriting'}</span>
                  <span className="text-[10px] text-slate-500">{isKn ? 'ವೈದ್ಯಕೀಯ/ಆದಾಯ' : 'Medical Checks'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-teal-800 block text-sm">04</span>
                  <span className="font-semibold text-slate-900 block mt-1">{isKn ? 'ಪಾವತಿ' : 'Payment'}</span>
                  <span className="text-[10px] text-slate-500">{isKn ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್' : 'Direct to Insurer'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-teal-800 block text-sm">05</span>
                  <span className="font-semibold text-slate-900 block mt-1">{isKn ? 'ಪಾಲಿಸಿ ಬಾಂಡ್' : 'Bond Dispatch'}</span>
                  <span className="text-[10px] text-slate-500">{isKn ? 'ಮನೆ ಬಾಗಿಲಿಗೆ' : 'Delivered Home'}</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 23: ONGOING SERVICE */}
          {currentSlide === 23 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ನಿರಂತರ ಗ್ರಾಹಕ ಸೇವೆ' : 'Ongoing Support'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ಪಾಲಿಸಿ ಪ್ರಾರಂಭವಾದ ನಂತರವೂ ಸಂಘಟಿತವಾಗಿರಿ.' : 'Stay organised after your policy starts.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರ ಹಾಲಿ ಗ್ರಾಹಕ ಸೇವಾ ಬೆಂಬಲ:' : 'Complimentary lifecycle assistance across Gangavathi:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <Clock className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ನವೀಕರಣ ಜ್ಞಾಪನೆಗಳು' : 'Renewal Alerts'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ಪಾಲಿಸಿ ಲ್ಯಾಪ್ಸ್ ಆಗದಂತೆ ಮುಂಚಿತ ಸೂಚನೆ.' : 'Timely reminders before grace period expiry.'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <UserCheck className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ವಿಳಾಸ/ನಾಮಿನಿ ಅಪ್‌ಡೇಟ್' : 'Endorsements'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ಶಾಖಾ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ತಿದ್ದುಪಡಿ ನೆರವು.' : 'Assistance with official branch paperwork.'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                  <Headphones className="w-5 h-5 text-teal-800 mb-2" />
                  <span className="font-bold text-slate-900 block">{isKn ? 'ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶನ' : 'Claim Liaison'}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{isKn ? 'ಕುಟುಂಬಕ್ಕೆ ಶುಲ್ಕರಹಿತ ಪ್ರಾಮಾಣಿಕ ನೆರವು.' : 'Zero-fee guidance for surviving families.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 24: MEET SOFIA */}
          {currentSlide === 24 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ನಿಮ್ಮ ಸಲಹೆಗಾರ್ತಿ' : 'Advisor Profile'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಸೋಫಿಯಾ ರಾಣಿ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.' : 'Discuss your questions with Sofia Rani.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಗಂಗಾವತಿಯಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಲಭ್ಯವಿರುವ ವೃತ್ತಿಪರ ಸಲಹೆಗಾರ್ತಿ:' : 'Authorized individual advisor operating in Gangavathi, Karnataka:'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-teal-800 shadow-2xs">
                  <UserCheck className="w-10 h-10" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900">{ADVISOR_CONFIG.name}</h3>
                  <div className="text-xs text-teal-800 font-semibold">{ADVISOR_CONFIG.professionalTitle[language]}</div>
                  <div className="text-xs text-slate-600">
                    {ADVISOR_CONFIG.location.city}, Karnataka · {ADVISOR_CONFIG.workingHours.timings}
                  </div>
                  <div className="text-xs text-slate-500">
                    {isKn ? 'ಬೆಂಬಲಿತ ಭಾಷೆಗಳು: ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ (ತೆಲುಗು ಪೂರ್ವವೀಕ್ಷಣೆ)' : 'Supported Languages: Kannada and English (Telugu preview)'}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('book');
                  }}
                  className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isKn ? 'ಸಂಪರ್ಕ ಸಮಯ ಆರಿಸಿ' : 'Choose a Callback Time'}</span>
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 25: NEXT STEP */}
          {currentSlide === 25 && (
            <div className="space-y-6 max-w-2xl mx-auto text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 mx-auto flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-teal-800" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {isKn ? 'ಮುಂದಿನ ಹೆಜ್ಜೆ' : 'Action Options'}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ಮುಂದಿನ ಹೆಜ್ಜೆ ಇರಿಸಿ.' : 'Take the next step at your pace.'}
                </h2>
                <p className="text-xs text-slate-600">
                  {isKn ? 'ಯಾವುದೇ ಒತ್ತಡವಿಲ್ಲದೆ, ನಿಮ್ಮ ಸಮಯಕ್ಕೆ ತಕ್ಕಂತೆ ಆಯ್ಕೆ ಮಾಡಿ:' : 'No pressure, no mandatory form submission. Choose what suits your schedule:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('book');
                  }}
                  className="p-4 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isKn ? 'ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ' : 'Book a Callback'}</span>
                </button>

                <a
                  href={`${ADVISOR_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(
                    isKn
                      ? 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, 25-ಹಂತಗಳ ಮಾರ್ಗದರ್ಶಿ ಓದಿದ ನಂತರ ಕುಟುಂಬ ರಕ್ಷಣೆ ಕುರಿತು ಮಾತನಾಡಲು ಇಷ್ಟಪಡುತ್ತೇನೆ.'
                      : 'Hello Sofia Rani, after going through the family planning guide, I would like to consult with you.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>{isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ' : 'Open WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('tools');
                  }}
                  className="p-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-teal-800" />
                  <span>{isKn ? 'ಪ್ಲಾನಿಂಗ್ ಟೂಲ್ಸ್‌ಗೆ ಹಿಂತಿರುಗಿ' : 'Return to Planning Tools'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{isKn ? 'ಮಾರ್ಗದರ್ಶಿ ಮುಚ್ಚಿ' : 'Close Guide'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="bg-white px-5 sm:px-8 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentSlide === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isKn ? 'ಹಿಂದಿನದು' : 'Previous'}</span>
          </button>

          {/* Quick jump input / indicators */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-mono font-medium text-slate-500">
              <strong className="text-slate-900">{currentSlide}</strong> / {totalSlides}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentSlide === totalSlides}
            className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentSlide === totalSlides
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-teal-800 hover:bg-teal-900 text-white shadow-xs'
            }`}
          >
            <span>{isKn ? 'ಮುಂದಿನದು' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
