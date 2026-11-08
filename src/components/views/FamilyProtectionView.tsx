import React from 'react';
import { ShieldCheck, AlertCircle, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { FamilyProtectionGap } from '../tools/FamilyProtectionGap';
import { QuickPremiumEstimator, PremiumEstimateDetails } from '../tools/QuickPremiumEstimator';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingWithGap?: (gap: number) => void;
  onOpenBookingWithPremiumEstimate?: (details: PremiumEstimateDetails) => void;
}

export const FamilyProtectionView: React.FC<Props> = ({
  language,
  onNavigate,
  onOpenBookingWithGap,
  onOpenBookingWithPremiumEstimate,
}) => {
  const [activeTool, setActiveTool] = React.useState<'gap' | 'premium'>('gap');
  const isKn = language === 'kn';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ಕುಟುಂಬ ಆರ್ಥಿಕ ಸುರಕ್ಷತೆ' : 'Core Family Security'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isKn
              ? 'ಕುಟುಂಬ ರಕ್ಷಣೆ (ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್): ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಅನುಪಸ್ಥಿತಿಯಲ್ಲೂ ಜೀವನಕ್ಕೆ ಭದ್ರತೆ'
              : 'Family Protection (Term Insurance): Guaranteeing Dignity When It Matters Most'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isKn
              ? 'ಟರ್ಮ್ ಜೀವ ವಿಮೆಯು ಯಾವುದೇ ಹೂಡಿಕೆಯಲ್ಲ. ಇದು ಕುಟುಂಬದ ದುಡಿಯುವ ವ್ಯಕ್ತಿಗೆ ಅನಿರೀಕ್ಷಿತ ಅಪಾಯವಾದಾಗ, ಕುಟುಂಬವು ಸಾಲದ ಸುಳಿಗೆ ಸಿಲುಕದಂತೆ ಹಾಗೂ ಮಕ್ಕಳ ಶಿಕ್ಷಣ ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳುವ ಅತ್ಯಂತ ಕಡಿಮೆ ವೆಚ್ಚದ ರಕ್ಷಣಾ ಕವಚ.'
              : 'Pure term life insurance is not an investment; it is an economic shield designed to instantly clear household liabilities and replace lost monthly income if an untimely tragedy occurs.'}
          </p>
        </div>
      </div>

      {/* 3 Core Reasons for Term Insurance */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಪ್ರತಿಯೊಬ್ಬ ಕುಟುಂಬದ ಯಜಮಾನ ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ 3 ಮುಖ್ಯ ಸತ್ಯಗಳು' : '3 Fundamental Truths About Pure Protection'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ಸಾಲಗಳ ತಕ್ಷಣದ ಬಿಡುಗಡೆ' : 'Immediate Debt Liquidation'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಗೃಹ ಸಾಲ, ಕೃಷಿ ಸಾಲ ಅಥವಾ ವೈಯಕ್ತಿಕ ಸಾಲಗಳು ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಸಾವಿನ ನಂತರ ಕುಟುಂಬದ ಉಳಿದವರ ಮೇಲೆ ಬೀಳದಂತೆ ವಿಮಾ ಮೊತ್ತವು ನೆರವಾಗುತ್ತದೆ.'
                : 'Mortgages, agricultural crop loans, and personal credit liabilities are settled immediately without draining family assets.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ಮಾಸಿಕ ಜೀವನ ವೆಚ್ಚದ ನಿರಂತರತೆ' : 'Household Income Replacement'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಮನೆ ಬಾಡಿಗೆ, ದವಸ ಧಾನ್ಯ, ಮಕ್ಕಳ ಶಾಲೆ ಶುಲ್ಕ ಮತ್ತು ವೈದ್ಯಕೀಯ ವೆಚ್ಚಗಳಿಗೆ 10-15 ವರ್ಷಗಳ ಕಾಲ ಕೊರತೆಯಾಗದಂತೆ ಆದಾಯ ಬರುತ್ತದೆ.'
                : 'Provides a financial corpus capable of generating regular monthly income to cover groceries, rent, utilities, and daily living.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ಕಡಿಮೆ ವೆಚ್ಚದಲ್ಲಿ ದೊಡ್ಡ ಮೊತ್ತದ ರಕ್ಷಣೆ' : 'High Sum Assured at Modest Premium'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ದಿನಕ್ಕೆ ಕೇವಲ ₹25-₹50 ರಷ್ಟು ಸಣ್ಣ ಮೊತ್ತದಲ್ಲಿ ₹50 ಲಕ್ಷದಿಂದ ₹1 ಕೋಟಿಯವರೆಗಿನ ದೊಡ್ಡ ಜೀವ ರಕ್ಷಣೆಯನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯ.'
                : 'Because it is pure risk cover without maturity bonuses, it offers substantial coverage (₹50L–₹1Cr+) at affordable annual rates.'}
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Live Tool: Protection Gap or Quick Premium Estimator */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-800" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isKn ? 'ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಲೆಕ್ಕಾಚಾರ' : 'Self-Assessment & Quick Premium Calculation'}
            </h2>
          </div>

          {/* Segmented Switch */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTool('gap')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTool === 'gap'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ (Gap)' : 'Protection Gap'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTool('premium')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTool === 'premium'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isKn ? 'ತ್ವರಿತ ಪ್ರೀಮಿಯಂ' : 'Quick Premium'}
            </button>
          </div>
        </div>

        {activeTool === 'gap' ? (
          <FamilyProtectionGap
            language={language}
            onBookConsultation={onOpenBookingWithGap}
          />
        ) : (
          <QuickPremiumEstimator
            language={language}
            onBookConsultation={onOpenBookingWithPremiumEstimate}
          />
        )}
      </section>

      {/* Common Misunderstandings */}
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {isKn ? 'ಸಾಮಾನ್ಯ ತಪ್ಪು ಕಲ್ಪನೆಗಳು ಮತ್ತು ವಾಸ್ತವ' : 'Common Misconceptions vs Regulatory Reality'}
        </h3>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">
              {isKn ? 'ತಪ್ಪು ಕಲ್ಪನೆ 1: "ಟರ್ಮ್ ಪಾಲಿಸಿಯಲ್ಲಿ ಹಣ ವಾಪಸ್ ಬರುವುದಿಲ್ಲ, ಹಾಗಾಗಿ ಇದು ನಷ್ಟ"' : 'Myth 1: "Term insurance has no maturity return, so the premium is wasted"'}
            </strong>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ವಾಸ್ತವ: ನಾವು ಕಾರು ಅಥವಾ ಬೈಕ್ ಇನ್ಶೂರೆನ್ಸ್‌ಗೆ ಹಣ ಕಟ್ಟುವಾಗ ಅಪಘಾತವಾಗದಿದ್ದರೆ ಹಣ ವಾಪಸ್ ಕೇಳುವುದಿಲ್ಲ. ಅದೇ ರೀತಿ ಕುಟುಂಬದ ಮುಖ್ಯ ಆದಾಯದಾರನ ಜೀವಕ್ಕೆ ನೀಡುವ ಪರಿಪೂರ್ಣ ಭದ್ರತೆಯೇ ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್.'
                : 'Reality: Just as vehicle insurance protects against loss, pure term life shields your family against financial ruin. The objective is protection, not investment.'}
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">
              {isKn ? 'ತಪ್ಪು ಕಲ್ಪನೆ 2: "ನನ್ನ ಬಳಿ ಈಗಾಗಲೇ ₹2 ಲಕ್ಷದ ಒಂದು ಪಾಲಿಸಿ ಇದೆ, ನನಗೆ ಇನ್ನೊಂದು ಬೇಡ"' : 'Myth 2: "I already have a ₹2 Lakh endowment policy, I am fully covered"'}
            </strong>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ವಾಸ್ತವ: ಇಂದಿನ ದಿನಗಳಲ್ಲಿ ₹2 ಲಕ್ಷದಿಂದ ಒಂದು ಕುಟುಂಬ 6 ತಿಂಗಳೂ ಜೀವನ ನಿರ್ವಹಣೆ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಕನಿಷ್ಠ ನಿಮ್ಮ ವಾರ್ಷಿಕ ವೆಚ್ಚದ 10 ಪಟ್ಟು ಮೊತ್ತ ರಕ್ಷಣೆಯಾಗಿರಬೇಕು.'
                : 'Reality: ₹2 Lakhs is depleted within a few months of normal household expenses. Adequate cover must equal 10–15 times annual household outflow.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('book')}
          className="px-8 py-3.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
        >
          {isKn ? 'ಕುಟುಂಬ ರಕ್ಷಣೆ ಕುರಿತು ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ' : 'Book a Family Protection Consultation'}
        </button>
      </div>
    </div>
  );
};
