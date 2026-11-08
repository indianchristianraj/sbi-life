import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
  onBookConsultation?: (calculatedGap: number) => void;
}

export const FamilyProtectionGap: React.FC<Props> = ({ language, onBookConsultation }) => {
  // Transparent state inputs
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(35000);
  const [supportYears, setSupportYears] = useState<number>(15);
  const [outstandingDebt, setOutstandingDebt] = useState<number>(1200000);
  const [futureGoalAmount, setFutureGoalAmount] = useState<number>(1500000);
  const [availableAssets, setAvailableAssets] = useState<number>(400000);
  const [existingLifeCover, setExistingLifeCover] = useState<number>(1000000);

  // Exact required transparent formula:
  // max(0, monthly expenses * 12 * support years + outstanding debt + future-goal amount - relevant available assets - existing life cover)
  const incomeReplacementNeeds = Math.max(0, monthlyExpenses * 12 * supportYears);
  const totalLiabilitiesAndGoals = Math.max(0, outstandingDebt + futureGoalAmount);
  const totalRequired = incomeReplacementNeeds + totalLiabilitiesAndGoals;
  const totalCoverAndAssets = Math.max(0, availableAssets + existingLifeCover);
  
  const protectionGap = Math.max(
    0,
    monthlyExpenses * 12 * supportYears +
      outstandingDebt +
      futureGoalAmount -
      availableAssets -
      existingLifeCover
  );

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const isKn = language === 'kn';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಉಚಿತ ಆರ್ಥಿಕ ಸಾಧನ A' : 'Transparent Assessment Tool A'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          {isKn ? 'ಕುಟುಂಬ ರಕ್ಷಣಾ ಕೊರತೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Family Protection Gap Calculator'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಅನಿರೀಕ್ಷಿತ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಸಾಲ ಮತ್ತು ಜೀವನ ವೆಚ್ಚಗಳನ್ನು ನಿಭಾಯಿಸಲು ಎಷ್ಟು ಜೀವ ರಕ್ಷಣೆಯ ಕೊರತೆ ಇದೆ ಎಂಬುದನ್ನು ಪಾರದರ್ಶಕವಾಗಿ ಅಳೆಯಿರಿ.'
            : 'Evaluate the exact shortfall between your family’s required financial security and existing provisions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Monthly Expenses */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="monthly-expenses">
                {isKn ? 'ಮಾಸಿಕ ಕುಟುಂಬದ ವೆಚ್ಚ (ರೂ.)' : 'Monthly Household Expenses (₹)'}
              </label>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatINR(monthlyExpenses)}
              </span>
            </div>
            <input
              id="monthly-expenses"
              type="range"
              min="10000"
              max="250000"
              step="2500"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹10,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* 2. Support Years */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="support-years">
                {isKn ? 'ಆರ್ಥಿಕ ಬೆಂಬಲ ಬೇಕಾದ ವರ್ಷಗಳು' : 'Years of Financial Support Needed'}
              </label>
              <span className="font-semibold text-slate-900 tabular-nums">
                {supportYears} {isKn ? 'ವರ್ಷಗಳು' : 'Years'}
              </span>
            </div>
            <input
              id="support-years"
              type="range"
              min="1"
              max="35"
              step="1"
              value={supportYears}
              onChange={(e) => setSupportYears(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>1 {isKn ? 'ವರ್ಷ' : 'Year'}</span>
              <span>35 {isKn ? 'ವರ್ಷಗಳು' : 'Years'}</span>
            </div>
          </div>

          {/* 3. Outstanding Debt */}
          <div>
            <label htmlFor="debt-input" className="block text-sm font-medium text-slate-800 mb-1">
              {isKn ? 'ಬಾಕಿ ಇರುವ ಸಾಲಗಳು (ಗೃಹ, ಕೃಷಿ, ವೈಯಕ್ತಿಕ ಸಾಲ)' : 'Outstanding Debt / Loans (Home, Agri, Personal)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₹</span>
              <input
                id="debt-input"
                type="number"
                min="0"
                step="50000"
                value={outstandingDebt}
                onChange={(e) => setOutstandingDebt(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-8 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
              />
            </div>
          </div>

          {/* 4. Future Goals */}
          <div>
            <label htmlFor="goals-input" className="block text-sm font-medium text-slate-800 mb-1">
              {isKn ? 'ಭವಿಷ್ಯದ ಪ್ರಮುಖ ವೆಚ್ಚಗಳು (ಮಕ್ಕಳ ಶಿಕ್ಷಣ / ಇತ್ಯಾದಿ)' : 'Future Milestones (Higher Education / Marriage)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 font-medium">₹</span>
              <input
                id="goals-input"
                type="number"
                min="0"
                step="50000"
                value={futureGoalAmount}
                onChange={(e) => setFutureGoalAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-8 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            {/* 5. Available Assets */}
            <div>
              <label htmlFor="assets-input" className="block text-xs font-medium text-slate-700 mb-1">
                {isKn ? 'ಲಭ್ಯವಿರುವ ಉಳಿತಾಯ & ಆಸ್ತಿ (FD, ಚಿನ್ನ, ಇತ್ಯಾದಿ)' : 'Available Savings & Assets (Liquid)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-500">₹</span>
                <input
                  id="assets-input"
                  type="number"
                  min="0"
                  step="50000"
                  value={availableAssets}
                  onChange={(e) => setAvailableAssets(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                />
              </div>
            </div>

            {/* 6. Existing Life Cover */}
            <div>
              <label htmlFor="cover-input" className="block text-xs font-medium text-slate-700 mb-1">
                {isKn ? 'ಈಗಾಗಲೇ ಇರುವ ಜೀವ ವಿಮಾ ರಕ್ಷಣೆ' : 'Existing Life Insurance Cover'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-500">₹</span>
                <input
                  id="cover-input"
                  type="number"
                  min="0"
                  step="50000"
                  value={existingLifeCover}
                  onChange={(e) => setExistingLifeCover(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Result Breakdown */}
        <div className="lg:col-span-5 bg-slate-50/80 rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {isKn ? 'ಅಂದಾಜು ರಕ್ಷಣಾ ಕೊರತೆ' : 'Estimated Net Protection Gap'}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F1D36] tracking-tight tabular-nums mb-3">
              {formatINR(protectionGap)}
            </div>

            {protectionGap > 0 ? (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 mb-4">
                {isKn
                  ? `ನಿಮ್ಮ ಕುಟುಂಬದ ಪ್ರಸ್ತುತ ಜೀವನ ಶೈಲಿ ಮತ್ತು ಸಾಲದ ಬಾಧ್ಯತೆಗಳನ್ನು ಪೂರೈಸಲು ಅಂದಾಜು ${formatINR(protectionGap)} ರಷ್ಟು ಜೀವ ವಿಮಾ ರಕ್ಷಣೆಯ ಕೊರತೆ ಕಂಡುಬರುತ್ತಿದೆ.`
                  : `Your family may have an estimated shortfall of ${formatINR(protectionGap)} to sustain regular household expenses and settle debt without distress.`}
              </div>
            ) : (
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3 text-xs text-emerald-900 mb-4">
                {isKn
                  ? 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಉಳಿತಾಯ ಮತ್ತು ವಿಮಾ ರಕ್ಷಣೆಯು ಪ್ರಾಥಮಿಕ ಲೆಕ್ಕಾಚಾರದ ಪ್ರಕಾರ ಸಾಕಷ್ಟು ಸಮರ್ಪಕವಾಗಿದೆ. ನಿಯಮಿತ ಪಾಲಿಸಿ ಪರಿಶೀಲನೆ ಮುಂದುವರಿಸಿ.'
                  : 'Based on this simplified calculation, your current assets and life cover meet the baseline requirements.'}
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
              <div className="flex justify-between">
                <span>{isKn ? 'ಜೀವನ ವೆಚ್ಚ ನಿರ್ವಹಣೆ (ವರ್ಷ x ತಿಂಗಳು):' : 'Household Support Needs:'}</span>
                <span className="font-medium text-slate-800 tabular-nums">{formatINR(incomeReplacementNeeds)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isKn ? 'ಸಾಲ & ಪ್ರಮುಖ ಗುರಿಗಳು:' : 'Debt & Future Milestones:'}</span>
                <span className="font-medium text-slate-800 tabular-nums">{formatINR(totalLiabilitiesAndGoals)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{isKn ? 'ಒಟ್ಟು ಅವಶ್ಯಕತೆ:' : 'Total Gross Need:'}</span>
                <span className="tabular-nums">{formatINR(totalRequired)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{isKn ? 'ಕಳೆ: ಲಭ್ಯವಿರುವ ಆಸ್ತಿ & ಹಾಲಿ ವಿಮೆ:' : 'Less: Assets & Existing Cover:'}</span>
                <span className="tabular-nums">- {formatINR(totalCoverAndAssets)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            {onBookConsultation && (
              <button
                type="button"
                onClick={() => onBookConsultation(protectionGap)}
                className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಈ ಲೆಕ್ಕಾಚಾರ ಚರ್ಚಿಸಿ' : 'Discuss This Calculation with Sofia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Clear transparency disclaimer */}
            <div className="flex items-start gap-1.5 mt-3 text-[11px] text-slate-500 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isKn
                  ? 'ಗಮನಿಸಿ: ಇದು ಕೇವಲ ಸರಳ ಶೈಕ್ಷಣಿಕ ಅಂದಾಜು. ಇದರಲ್ಲಿ ಹಣದುಬ್ಬರ, ಹೂಡಿಕೆಯ ಆದಾಯದ ಏರಿಳಿತಗಳು ಅಥವಾ ವಿಮಾ ಅನುಮೋದನೆಯ ವೈದ್ಯಕೀಯ ನಿಯಮಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ. ಇದು ಪ್ರೀಮಿಯಂ ದರ ಅಥವಾ ಪಾಲಿಸಿ ಶಿಫಾರಸು ಅಲ್ಲ.'
                  : 'Notice: Transparent simplified educational estimate. Does not model inflation, investment return fluctuations, or underwriting medical terms. Not a premium quote or insurance guarantee.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
