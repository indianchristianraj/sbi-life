import React, { useState } from 'react';
import { ShieldCheck, Sparkles, TrendingUp, Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Language, PublicRoute } from '../../types';

interface PlanTypeComparisonProps {
  language: Language;
  onNavigate?: (route: PublicRoute) => void;
  className?: string;
}

export const PlanTypeComparison: React.FC<PlanTypeComparisonProps> = ({
  language,
  onNavigate,
  className = '',
}) => {
  const isKn = language === 'kn';
  const [selectedPlan, setSelectedPlan] = useState<'term' | 'endowment' | 'annuity'>('term');

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-sm ${className}`}>
      {/* Title */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
          {isKn ? 'ಪಾರದರ್ಶಕ ಜ್ಞಾನ ಮಾರ್ಗದರ್ಶಿ' : 'Objective Comparison Matrix'}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ vs ಎಂಡೋಮೆಂಟ್ vs ನಿವೃತ್ತಿ ಪಿಂಚಣಿ' : 'Term Insurance vs. Endowment Savings vs. Pension Annuity'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ಯಾವ ಪಾಲಿಸಿ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸೂಕ್ತ? ಪ್ರತಿಯೊಂದು ವಿಮಾ ಮಾದರಿಯ ಉದ್ದೇಶ, ರಕ್ಷಣೆ ಮತ್ತು ಲಾಭಗಳ ಪಾರದರ್ಶಕ ಹೋಲಿಕೆ.'
            : 'Clear, unbiased educational comparison of primary life insurance categories to help you select what aligns with your financial priorities.'}
        </p>
      </div>

      {/* Plan Type Selector for Mobile Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6 border border-slate-200">
        <button
          type="button"
          onClick={() => setSelectedPlan('term')}
          className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedPlan === 'term'
              ? 'bg-teal-800 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>{isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್' : 'Pure Term Life'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedPlan('endowment')}
          className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedPlan === 'endowment'
              ? 'bg-teal-800 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{isKn ? 'ಉಳಿತಾಯ / ಎಂಡೋಮೆಂಟ್' : 'Guaranteed Savings'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedPlan('annuity')}
          className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedPlan === 'annuity'
              ? 'bg-teal-800 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
          <span>{isKn ? 'ಪಿಂಚಣಿ / ಆನ್ಯುಯಿಟಿ' : 'Pension Annuity'}</span>
        </button>
      </div>

      {/* Comparison Grid (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plan 1: Pure Term Life */}
        <div
          className={`rounded-2xl p-6 border transition-all ${
            selectedPlan === 'term'
              ? 'border-teal-700 ring-2 ring-teal-700/20 bg-teal-50/30'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5 text-teal-800" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            {isKn ? '1. ಪ್ಯೂರ್ ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್' : '1. Pure Term Insurance'}
          </h4>
          <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block mb-3">
            {isKn ? 'ಗರಿಷ್ಠ ರಕ್ಷಣೆ · ಕಡಿಮೆ ಪ್ರೀಮಿಯಂ' : 'High Cover · Low Cost Risk Protection'}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {isKn
              ? 'ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಅಕಾಲಿಕ ನಿಧನದ ಸಂದರ್ಭದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ದೊಡ್ಡ ಮೊತ್ತದ (ಉದಾ: ₹1 ಕೋಟಿ) ಹಣಕಾಸಿನ ನೆರವು ನೀಡುವ ಶುದ್ಧ ರಕ್ಷಣಾ ಯೋಜನೆ.'
              : 'Pure risk replacement designed to liquidate household debts and support dependent family members in the untimely absence of the earner.'}
          </p>

          <div className="space-y-2.5 text-xs border-t border-slate-200/80 pt-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಅತಿ ಕಡಿಮೆ ಪ್ರೀಮಿಯಂಗೆ ಕೋಟಿಗಟ್ಟಲೆ ಕವರ್' : 'Extremely high sum assured for low annual premium'}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಸಾಲ & ಮನೆ ಖರ್ಚುಗಳ ಸಂಪೂರ್ಣ ಭದ್ರತೆ' : 'Immediate debt clearance and living expense buffer'}</span>
            </div>
            <div className="flex items-start gap-2 text-slate-500">
              <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಮೆಚುರಿಟಿ ನಂತರ ಹಣ ವಾಪಸ್ ಬರುವುದಿಲ್ಲ (Pure Risk)' : 'Zero savings / survival maturity refund'}</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              {isKn ? 'ಯಾರಿಗೆ ಸೂಕ್ತ?' : 'Ideal For:'}
            </span>
            <p className="text-xs text-slate-600">
              {isKn
                ? 'ಸಾಲ, ಮಕ್ಕಳು ಅಥವಾ ಅವಲಂಬಿತ ಕುಟುಂಬವಿರುವ ಪ್ರತಿಯೊಬ್ಬ ದುಡಿಯುವ ವ್ಯಕ್ತಿಗೆ ಇದು ಮೊದಲ ಆದ್ಯತೆಯಾಗಬೇಕು.'
                : 'Any primary income earner with dependent parents, young children, or home/business loans.'}
            </p>
          </div>
        </div>

        {/* Plan 2: Guaranteed Endowment / Savings */}
        <div
          className={`rounded-2xl p-6 border transition-all ${
            selectedPlan === 'endowment'
              ? 'border-teal-700 ring-2 ring-teal-700/20 bg-teal-50/30'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-amber-800" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            {isKn ? '2. ಉಳಿತಾಯ & ಎಂಡೋಮೆಂಟ್' : '2. Guaranteed Savings / Endowment'}
          </h4>
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block mb-3">
            {isKn ? 'ಖಚಿತ ಮೆಚುರಿಟಿ · ಕಾಲಮಿತಿಯ ಉಳಿತಾಯ' : 'Capital Protection · Milestone Savings'}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {isKn
              ? 'ಮಕ್ಕಳ ಕಾಲೇಜು ಪ್ರವೇಶ, ಮದುವೆ ಅಥವಾ ಸ್ವಂತ ಮನೆ ಖರೀದಿಯಂತಹ ನಿರ್ದಿಷ್ಟ ಗುರಿಗಳಿಗಾಗಿ ಖಚಿತ ಹಣದ ಸಂಗ್ರಹ.'
              : 'Combines moderate life cover with disciplined, guaranteed maturity returns for predictable milestone objectives.'}
          </p>

          <div className="space-y-2.5 text-xs border-t border-slate-200/80 pt-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಅವಧಿ ಮುಗಿದಾಗ ಖಾತರಿಯ ಹಣ ವಾಪಸಾತಿ' : 'Guaranteed capital return with declared bonuses'}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಮಕ್ಕಳ ಕಾಲೇಜು & ಮದುವೆಗೆ ಸೂಕ್ತ' : 'Disciplined milestone fund accumulation'}</span>
            </div>
            <div className="flex items-start gap-2 text-slate-500">
              <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಟರ್ಮ್ ಪಾಲಿಸಿಯಷ್ಟು ದೊಡ್ಡ ಕವರ್ ಸಿಗುವುದಿಲ್ಲ' : 'Moderate life cover compared to pure term insurance'}</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              {isKn ? 'ಯಾರಿಗೆ ಸೂಕ್ತ?' : 'Ideal For:'}
            </span>
            <p className="text-xs text-slate-600">
              {isKn
                ? 'ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕೆ ಮಾರುಕಟ್ಟೆಯ ರಿಸ್ಕ್ ಇಲ್ಲದೆ ನಿಗದಿತ ದಿನಕ್ಕೆ ಖಚಿತ ಹಣ ಬಯಸುವ ಪಾಲಕರಿಗೆ.'
                : 'Parents seeking guaranteed milestone funds for higher education without stock market volatility.'}
            </p>
          </div>
        </div>

        {/* Plan 3: Retirement Pension Annuity */}
        <div
          className={`rounded-2xl p-6 border transition-all ${
            selectedPlan === 'annuity'
              ? 'border-teal-700 ring-2 ring-teal-700/20 bg-teal-50/30'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-indigo-800" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            {isKn ? '3. ನಿವೃತ್ತಿ ಪಿಂಚಣಿ (Annuity)' : '3. Retirement Pension Annuity'}
          </h4>
          <span className="text-[11px] font-semibold text-indigo-800 uppercase tracking-wider block mb-3">
            {isKn ? 'ಜೀವಿತಾವಧಿ ಮಾಸಿಕ ಪಿಂಚಣಿ' : 'Lifelong Monthly Cash Flow'}
          </span>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {isKn
              ? 'ನಿವೃತ್ತಿಯ ನಂತರ ನಿಮ್ಮ ಜೀವಿತಾವಧಿಯವರೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ಖಾತರಿಯಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುವ ಪಿಂಚಣಿ.'
              : 'Guaranteed pension contract that pays uninterrupted monthly income for life, ensuring dignity and self-reliance.'}
          </p>

          <div className="space-y-2.5 text-xs border-t border-slate-200/80 pt-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ನೀವು ಬದುಕಿರುವವರೆಗೂ ಮಾಸಿಕ ಪಿಂಚಣಿ ಖಚಿತ' : 'Non-fluctuating monthly pension guaranteed for life'}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಪತಿ-ಪತ್ನಿ ಜಂಟಿ ಪಿಂಚಣಿ (Joint Life Option)' : 'Joint life annuity option to protect surviving spouse'}</span>
            </div>
            <div className="flex items-start gap-2 text-slate-500">
              <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{isKn ? 'ಮಧ್ಯಂತರದಲ್ಲಿ ಪೂರ್ತಿ ಹಣ ಹಿಂಪಡೆಯಲು ಮಿತಿಗಳು' : 'Restricted mid-term liquidity to protect lifetime annuity'}</span>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              {isKn ? 'ಯಾರಿಗೆ ಸೂಕ್ತ?' : 'Ideal For:'}
            </span>
            <p className="text-xs text-slate-600">
              {isKn
                ? '40 ವರ್ಷ ದಾಟಿದವರು ಮತ್ತು ನಿವೃತ್ತಿಯ ನಂತರ ಮಕ್ಕಳ ಮೇಲೆ ಅವಲಂಬಿತರಾಗದೆ ಬದುಕಲು ಬಯಸುವವರು.'
                : 'Working adults aged 40+ preparing for uninterrupted post-retirement monthly living income.'}
            </p>
          </div>
        </div>
      </div>

      {/* Direct Booking CTA */}
      {onNavigate && (
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-600">
            {isKn
              ? 'ಯಾವ ಪಾಲಿಸಿ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸೂಕ್ತವೆಂದು ತಿಳಿಯಲು ಸೋಫಿಯಾ ರಾಣಿ ಅವರೊಂದಿಗೆ ಉಚಿತವಾಗಿ ಚರ್ಚಿಸಿ.'
              : 'Unsure which product category fits your current life stage? Schedule a non-binding conversation with Sofia.'}
          </span>
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <span>{isKn ? 'ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ' : 'Schedule a Conversation'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanTypeComparison;
