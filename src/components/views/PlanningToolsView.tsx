import React, { useState } from 'react';
import { ShieldAlert, GraduationCap, ClipboardCheck, ArrowRight, Calculator, Clock, Receipt } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { CoverageProgressRing } from '../tools/CoverageProgressRing';
import { FamilyProtectionGap } from '../tools/FamilyProtectionGap';
import { ChildEducationPlanner } from '../tools/ChildEducationPlanner';
import { PolicyReviewChecklist } from '../tools/PolicyReviewChecklist';
import { QuickPremiumEstimator, PremiumEstimateDetails } from '../tools/QuickPremiumEstimator';
import { RetirementPensionCalculator, RetirementCalculationDetails } from '../tools/RetirementPensionCalculator';
import { TaxBenefitEstimator, TaxBenefitDetails } from '../tools/TaxBenefitEstimator';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingWithGap?: (gap: number) => void;
  onOpenBookingWithEducationCost?: (cost: number) => void;
  onOpenBookingWithPremiumEstimate?: (details: PremiumEstimateDetails) => void;
  onOpenBookingWithRetirement?: (details: RetirementCalculationDetails) => void;
  onOpenBookingWithTax?: (details: TaxBenefitDetails) => void;
}

export const PlanningToolsView: React.FC<Props> = ({
  language,
  onNavigate,
  onOpenBookingWithGap,
  onOpenBookingWithEducationCost,
  onOpenBookingWithPremiumEstimate,
  onOpenBookingWithRetirement,
  onOpenBookingWithTax,
}) => {
  const [activeTool, setActiveTool] = useState<'gap' | 'premium' | 'tax' | 'education' | 'retirement' | 'checklist'>('gap');
  const isKn = language === 'kn';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          {isKn ? 'ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ ಸಾಧನಗಳು' : 'Self-Assessment Financial Suite'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಪಾರದರ್ಶಕ ಆರ್ಥಿಕ ಯೋಜನಾ ಸಾಧನಗಳು' : 'Transparent Life Advisory Planning Tools'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isKn
            ? 'ಯಾವುದೇ ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ನಮೂದಿಸದೆ ನಿಮ್ಮ ಕುಟುಂಬದ ನೈಜ ರಕ್ಷಣಾ ಕೊರತೆ, ಅಂದಾಜು ಪ್ರೀಮಿಯಂ ಹಾಗೂ ಶಿಕ್ಷಣ ಗುರಿಗಳನ್ನು ತಕ್ಷಣವೇ ಲೆಕ್ಕ ಹಾಕಿ.'
            : 'Zero registration or phone number required. Calculate your exact life cover needs, quick premium estimates, educational inflation, and policy hygiene instantly.'}
        </p>
      </div>

      {/* Visual Recharts Progress Ring Widget */}
      <CoverageProgressRing
        language={language}
        onSelectDetailedCalculator={() => {
          setActiveTool('gap');
          const element = document.getElementById('detailed-calculator-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onBookConsultation={() => onNavigate('book')}
      />

      {/* Tool Selector Buttons (Segmented Controls) */}
      <div id="detailed-calculator-section" className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-3xl mx-auto border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTool('gap')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'gap'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ (Gap)' : 'Protection Gap'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('premium')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'premium'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? 'ತ್ವರಿತ ಪ್ರೀಮಿಯಂ' : 'Quick Premium'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('tax')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'tax'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? '80C ತೆರಿಗೆ ಉಳಿತಾಯ' : '80C Tax Benefit'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('education')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'education'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? 'ಮಕ್ಕಳ ಶಿಕ್ಷಣ' : 'Child Education'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('retirement')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'retirement'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? 'ನಿವೃತ್ತಿ ಪಿಂಚಣಿ' : 'Retirement'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('checklist')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTool === 'checklist'
              ? 'bg-white text-teal-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardCheck className="w-4 h-4 text-teal-700" />
          <span className="truncate">{isKn ? 'ಪಾಲಿಸಿ ಚೆಕ್‌ಲಿಸ್ಟ್' : 'Policy Checklist'}</span>
        </button>
      </div>

      {/* Render Selected Tool */}
      <div>
        {activeTool === 'gap' && (
          <FamilyProtectionGap
            language={language}
            onBookConsultation={onOpenBookingWithGap}
          />
        )}

        {activeTool === 'premium' && (
          <QuickPremiumEstimator
            language={language}
            onBookConsultation={onOpenBookingWithPremiumEstimate}
          />
        )}

        {activeTool === 'tax' && (
          <TaxBenefitEstimator
            language={language}
            onBookConsultation={onOpenBookingWithTax || (() => onNavigate('book'))}
          />
        )}

        {activeTool === 'education' && (
          <ChildEducationPlanner
            language={language}
            onBookConsultation={onOpenBookingWithEducationCost}
          />
        )}

        {activeTool === 'retirement' && (
          <RetirementPensionCalculator
            language={language}
            onBookConsultation={onOpenBookingWithRetirement}
          />
        )}

        {activeTool === 'checklist' && (
          <PolicyReviewChecklist
            language={language}
            onBookConsultation={() => onNavigate('book')}
          />
        )}
      </div>
    </div>
  );
};
