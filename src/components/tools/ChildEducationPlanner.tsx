import React, { useState } from 'react';
import { GraduationCap, AlertCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
  onBookConsultation?: (futureCost: number) => void;
}

export const ChildEducationPlanner: React.FC<Props> = ({ language, onBookConsultation }) => {
  const [currentCost, setCurrentCost] = useState<number>(1000000); // 10 Lakhs current cost
  const [yearsUntilNeed, setYearsUntilNeed] = useState<number>(10);
  const [inflationRate, setInflationRate] = useState<number>(8); // 8% per annum education inflation

  // Required exact formula: Future cost = current cost * (1 + selected inflation rate)^years
  const futureCost = Math.round(
    currentCost * Math.pow(1 + inflationRate / 100, yearsUntilNeed)
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
          <GraduationCap className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಉಚಿತ ಆರ್ಥಿಕ ಸಾಧನ B' : 'Transparent Assessment Tool B'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          {isKn ? 'ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ ವೆಚ್ಚ ಪ್ಲಾನರ್' : 'Child Higher Education Cost Planner'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ಇಂದಿನ ಕಾಲೇಜು ಶುಲ್ಕದ ಆಧಾರದ ಮೇಲೆ, ಹಣದುಬ್ಬರವನ್ನು ಪರಿಗಣಿಸಿ ಮಗು ಕಾಲೇಜು ಪ್ರವೇಶಿಸುವ ಹೊತ್ತಿಗೆ ಎಷ್ಟು ವೆಚ್ಚವಾಗಬಹುದು ಎಂಬುದನ್ನು ಮುಂಚಿತವಾಗಿ ಅರಿಯಿರಿ.'
            : 'Forecast the future cost of higher education by applying realistic educational inflation over time.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Current Cost */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="current-cost">
                {isKn ? 'ಇಂದಿನ ಉನ್ನತ ಶಿಕ್ಷಣದ ಒಟ್ಟು ಅಂದಾಜು ವೆಚ್ಚ' : 'Estimated Cost of Course Today (₹)'}
              </label>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatINR(currentCost)}
              </span>
            </div>
            <input
              id="current-cost"
              type="range"
              min="200000"
              max="5000000"
              step="50000"
              value={currentCost}
              onChange={(e) => setCurrentCost(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹2,00,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* 2. Years to College */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="years-need">
                {isKn ? 'ಮಗು ಕಾಲೇಜು ಸೇರಲು ಉಳಿದಿರುವ ವರ್ಷಗಳು' : 'Years Until College / Higher Education'}
              </label>
              <span className="font-semibold text-slate-900 tabular-nums">
                {yearsUntilNeed} {isKn ? 'ವರ್ಷಗಳು' : 'Years'}
              </span>
            </div>
            <input
              id="years-need"
              type="range"
              min="1"
              max="20"
              step="1"
              value={yearsUntilNeed}
              onChange={(e) => setYearsUntilNeed(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>1 {isKn ? 'ವರ್ಷ' : 'Year'}</span>
              <span>20 {isKn ? 'ವರ್ಷಗಳು' : 'Years'}</span>
            </div>
          </div>

          {/* 3. Editable Inflation Rate */}
          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-teal-950">
              <label htmlFor="inflation-rate" className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-teal-700" />
                <span>{isKn ? 'ನಿರೀಕ್ಷಿತ ವಾರ್ಷಿಕ ಶಿಕ್ಷಣ ಹಣದುಬ್ಬರ ದರ (%)' : 'Annual Education Inflation Assumption (%)'}</span>
              </label>
              <span className="font-bold text-teal-900 tabular-nums">
                {inflationRate}% {isKn ? 'ಪ್ರತಿ ವರ್ಷ' : 'p.a.'}
              </span>
            </div>
            <input
              id="inflation-rate"
              type="range"
              min="4"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-teal-200 rounded-lg mt-2"
            />
            <div className="flex justify-between text-[11px] text-teal-800/70 mt-1">
              <span>4% (ಸಾಮಾನ್ಯ ದರ)</span>
              <span>8% - 10% (ಭಾರತೀಯ ವೃತ್ತಿಪರ ಶಿಕ್ಷಣದ ಸರಾಸರಿ)</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 bg-slate-50/80 rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {isKn ? `${yearsUntilNeed} ವರ್ಷಗಳ ನಂತರದ ಅಂದಾಜು ವೆಚ್ಚ` : `Future Estimated Cost in ${yearsUntilNeed} Years`}
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0F1D36] tracking-tight tabular-nums mb-3">
              {formatINR(futureCost)}
            </div>

            <div className="bg-white rounded-lg p-3 border border-slate-200 text-xs text-slate-700 space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{isKn ? 'ಇಂದಿನ ಮೂಲ ವೆಚ್ಚ:' : 'Today’s Baseline Cost:'}</span>
                <span className="font-medium tabular-nums">{formatINR(currentCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isKn ? 'ಹಣದುಬ್ಬರದಿಂದ ಕೂಡಿದ ಹೆಚ್ಚುವರಿ ವೆಚ್ಚ:' : 'Inflation Impact Amount:'}</span>
                <span className="font-medium text-amber-700 tabular-nums">+{formatINR(futureCost - currentCost)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-1 font-semibold text-slate-900">
                <span>{isKn ? 'ಒಟ್ಟು ಭವಿಷ್ಯದ ಅಗತ್ಯತೆ:' : 'Total Future Corpus:'}</span>
                <span className="tabular-nums">{formatINR(futureCost)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isKn
                ? `ವಾರ್ಷಿಕ ${inflationRate}% ರಷ್ಟು ಶಿಕ್ಷಣ ವೆಚ್ಚ ಹೆಚ್ಚಳವಾದರೆ, ಇಂದಿನ ₹${(currentCost / 100000).toFixed(1)} ಲಕ್ಷದ ಕೋರ್ಸ್‌ಗೆ ಭವಿಷ್ಯದಲ್ಲಿ ₹${(futureCost / 100000).toFixed(1)} ಲಕ್ಷ ಬೇಕಾಗಬಹುದು.`
                : `At an annual inflation rate of ${inflationRate}%, a ₹${(currentCost / 100000).toFixed(1)} Lakh course today will require approximately ₹${(futureCost / 100000).toFixed(1)} Lakh in ${yearsUntilNeed} years.`}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            {onBookConsultation && (
              <button
                type="button"
                onClick={() => onBookConsultation(futureCost)}
                className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>{isKn ? 'ಮಕ್ಕಳ ಉಳಿತಾಯ ಯೋಜನೆಯ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ' : 'Discuss Child Future Savings with Sofia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-start gap-1.5 mt-3 text-[11px] text-slate-500 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isKn
                  ? 'ಗಮನಿಸಿ: ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ವಿಮಾ ಪಾಲಿಸಿಯು ನಿಖರವಾಗಿ ಈ ಮೊತ್ತವನ್ನು ನೀಡುತ್ತದೆ ಎಂದು ಇದು ಅರ್ಥೈಸುವುದಿಲ್ಲ. ಇದು ಕೇವಲ ಶೈಕ್ಷಣಿಕ ವೆಚ್ಚದ ಅರಿವು ಮೂಡಿಸಲು ಸಿದ್ಧಪಡಿಸಿದ ಮುನ್ಸೂಚನೆಯಾಗಿದೆ.'
                  : 'Notice: This does not imply that any specific insurance product will deliver this exact amount. Pure educational calculation to help evaluate long-term educational discipline.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
