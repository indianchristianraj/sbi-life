import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, ArrowRight, AlertCircle, TrendingUp, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

export interface RetirementCalculationDetails {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  monthlyExpenseToday: number;
  futureMonthlyExpense: number;
  requiredCorpus: number;
  monthlyInvestmentNeeded: number;
}

interface RetirementPensionCalculatorProps {
  language: Language;
  onBookConsultation?: (details: RetirementCalculationDetails) => void;
  onCalculationChange?: (details: RetirementCalculationDetails) => void;
  className?: string;
}

export const RetirementPensionCalculator: React.FC<RetirementPensionCalculatorProps> = ({
  language,
  onBookConsultation,
  onCalculationChange,
  className = '',
}) => {
  const isKn = language === 'kn';

  // State inputs
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenseToday, setMonthlyExpenseToday] = useState<number>(35000);
  const [expectedInflation, setExpectedInflation] = useState<number>(6); // 6% annual inflation
  const [expectedAnnuityRate, setExpectedAnnuityRate] = useState<number>(6.5); // 6.5% lifelong annuity yield

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  
  // Future monthly expense at retirement = MonthlyExpense * (1 + inflation)^years
  const inflationMultiplier = Math.pow(1 + expectedInflation / 100, yearsToRetirement);
  const futureMonthlyExpense = Math.round(monthlyExpenseToday * inflationMultiplier);
  const futureAnnualExpense = futureMonthlyExpense * 12;

  // Required Corpus to generate future annual expense from lifelong annuity
  // Corpus = AnnualExpense / AnnuityRate
  const requiredCorpus = Math.round(futureAnnualExpense / (expectedAnnuityRate / 100));

  // Indicative monthly savings needed today (assuming ~10% blended long-term compounding pre-retirement)
  // Future Value of SIP: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
  const monthlyRate = 0.10 / 12;
  const totalMonths = yearsToRetirement * 12;
  const sipFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const monthlyInvestmentNeeded = Math.round(requiredCorpus / sipFactor);

  // Notify parent on changes
  useEffect(() => {
    if (onCalculationChange) {
      onCalculationChange({
        currentAge,
        retirementAge,
        yearsToRetirement,
        monthlyExpenseToday,
        futureMonthlyExpense,
        requiredCorpus,
        monthlyInvestmentNeeded,
      });
    }
  }, [
    currentAge,
    retirementAge,
    yearsToRetirement,
    monthlyExpenseToday,
    futureMonthlyExpense,
    requiredCorpus,
    monthlyInvestmentNeeded,
    onCalculationChange,
  ]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleBooking = () => {
    if (onBookConsultation) {
      onBookConsultation({
        currentAge,
        retirementAge,
        yearsToRetirement,
        monthlyExpenseToday,
        futureMonthlyExpense,
        requiredCorpus,
        monthlyInvestmentNeeded,
      });
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm ${className}`}>
      {/* Tool Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <Clock className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ನಿವೃತ್ತಿ & ಪಿಂಚಣಿ ಯೋಜನೆ' : 'Retirement Corpus & Pension Planner'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಖಾತರಿಯ ನಿವೃತ್ತಿ ಪಿಂಚಣಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Guaranteed Pension & Corpus Calculator'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ನಿವೃತ್ತಿಯ ನಂತರ ನಿಮ್ಮ ಇಂದಿನ ಜೀವನಶೈಲಿಯನ್ನು ಮುಂದುವರಿಸಲು ಹಣದುಬ್ಬರವನ್ನು ಪರಿಗಣಿಸಿ ಎಷ್ಟು ಕಾರ್ಪಸ್ ಮತ್ತು ಮಾಸಿಕ ಪಿಂಚಣಿ ಬೇಕು ಎಂಬುದನ್ನು ಅಳೆಯಿರಿ.'
            : 'Estimate your future living costs factoring in inflation, and determine the exact retirement corpus required for guaranteed lifelong pension.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Current Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="ret-current-age">
                {isKn ? 'ನಿಮ್ಮ ಹಾಲಿ ವಯಸ್ಸು' : 'Current Age'}
              </label>
              <span className="font-bold text-slate-900 tabular-nums bg-teal-50 text-teal-900 px-2 py-0.5 rounded-lg border border-teal-200 text-sm">
                {currentAge} {isKn ? 'ವರ್ಷ' : 'Yrs'}
              </span>
            </div>
            <input
              id="ret-current-age"
              type="range"
              min="22"
              max="55"
              step="1"
              value={currentAge}
              onChange={(e) => {
                const newAge = Number(e.target.value);
                setCurrentAge(newAge);
                if (newAge >= retirementAge) {
                  setRetirementAge(newAge + 5);
                }
              }}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>22 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>40 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>55 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
            </div>
          </div>

          {/* 2. Desired Retirement Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="ret-target-age">
                {isKn ? 'ಯೋಜಿತ ನಿವೃತ್ತಿ ವಯಸ್ಸು' : 'Target Retirement Age'}
              </label>
              <span className="font-bold text-slate-900 tabular-nums bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 text-sm">
                {retirementAge} {isKn ? 'ವರ್ಷ' : 'Yrs'} ({yearsToRetirement} {isKn ? 'ವರ್ಷಗಳ ನಂತರ' : 'years away'})
              </span>
            </div>
            <input
              id="ret-target-age"
              type="range"
              min={Math.max(45, currentAge + 1)}
              max="70"
              step="1"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>50 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>60 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>70 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
            </div>
          </div>

          {/* 3. Current Monthly Expenses */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="ret-monthly-expense">
                {isKn ? 'ಇಂದಿನ ಮಾಸಿಕ ಮನೆ ವೆಚ್ಚ (ರೂ.)' : 'Today’s Monthly Household Expenses (₹)'}
              </label>
              <span className="font-bold text-teal-900 tabular-nums text-base">
                {formatINR(monthlyExpenseToday)}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[25000, 35000, 50000, 75000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlyExpenseToday(preset)}
                  className={`py-1 text-xs rounded-xl font-medium border transition-colors cursor-pointer text-center ${
                    monthlyExpenseToday === preset
                      ? 'bg-teal-800 text-white border-teal-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{preset / 1000}k/mo
                </button>
              ))}
            </div>
            <input
              id="ret-monthly-expense"
              type="range"
              min="15000"
              max="200000"
              step="2500"
              value={monthlyExpenseToday}
              onChange={(e) => setMonthlyExpenseToday(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹15,000</span>
              <span>₹1,00,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* 4. Inflation & Annuity Rate Assumptions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label htmlFor="ret-inflation" className="text-[11px] font-semibold text-slate-700 block mb-1">
                {isKn ? 'ನಿರೀಕ್ಷಿತ ಹಣದುಬ್ಬರ (ವಾರ್ಷಿಕ)' : 'Expected Annual Inflation'}
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="ret-inflation"
                  type="number"
                  min="4"
                  max="10"
                  step="0.5"
                  value={expectedInflation}
                  onChange={(e) => setExpectedInflation(Number(e.target.value))}
                  className="w-16 p-1 text-xs font-bold border border-slate-300 rounded-md bg-white text-slate-800"
                />
                <span className="text-xs text-slate-500 font-semibold">% / yr</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label htmlFor="ret-annuity" className="text-[11px] font-semibold text-slate-700 block mb-1">
                {isKn ? 'ಖಚಿತ ಪಿಂಚಣಿ ದರ (Annuity)' : 'Lifelong Annuity Rate'}
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="ret-annuity"
                  type="number"
                  min="5"
                  max="9"
                  step="0.5"
                  value={expectedAnnuityRate}
                  onChange={(e) => setExpectedAnnuityRate(Number(e.target.value))}
                  className="w-16 p-1 text-xs font-bold border border-slate-300 rounded-md bg-white text-slate-800"
                />
                <span className="text-xs text-slate-500 font-semibold">% / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0F1D36] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block mb-1">
                {isKn ? 'ನಿವೃತ್ತಿ ಗುರಿ ಸಾರಾಂಶ' : 'Retirement Target Blueprint'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isKn ? `${retirementAge} ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಬೇಕಾದ ಮಾಸಿಕ ಪಿಂಚಣಿ` : `Monthly Pension Needed at Age ${retirementAge}`}
              </h4>
            </div>

            {/* Prominent Inflation-Adjusted Monthly Metric */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/15">
              <span className="text-xs text-slate-300 block mb-0.5">
                {isKn ? 'ಹಣದುಬ್ಬರ ಹೊಂದಿಸಿದ ಮಾಸಿಕ ವೆಚ್ಚ:' : 'Future Monthly Outlay (Inflation Adjusted):'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 tabular-nums">
                {formatINR(futureMonthlyExpense)}
                <span className="text-xs font-normal text-slate-300 ml-1">/ month</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                {isKn
                  ? `(ಇಂದಿನ ₹${monthlyExpenseToday.toLocaleString('en-IN')} ವೆಚ್ಚವು ${yearsToRetirement} ವರ್ಷಗಳ ನಂತರ)`
                  : `(Today's ₹${monthlyExpenseToday.toLocaleString('en-IN')} compounding over ${yearsToRetirement} years)`}
              </span>
            </div>

            {/* Total Required Corpus */}
            <div className="space-y-2 text-xs border-t border-b border-white/15 py-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">{isKn ? 'ಬೇಕಾದ ಒಟ್ಟು ನಿವೃತ್ತಿ ಕಾರ್ಪಸ್:' : 'Target Retirement Corpus:'}</span>
                <span className="text-base font-bold text-amber-300 tabular-nums">{formatINR(requiredCorpus)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{isKn ? 'ಉಳಿದಿರುವ ಉಳಿತಾಯದ ಕಾಲ:' : 'Investment Runway Remaining:'}</span>
                <span className="font-semibold text-white">{yearsToRetirement} {isKn ? 'ವರ್ಷಗಳು' : 'Years'} ({yearsToRetirement * 12} months)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{isKn ? 'ಸೂಚಿಸಲಾದ ಇಂದಿನ ಮಾಸಿಕ ಉಳಿತಾಯ:' : 'Indicative Monthly SIP Today:'}</span>
                <span className="font-semibold text-emerald-300 tabular-nums">~{formatINR(monthlyInvestmentNeeded)}/mo</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{isKn ? 'ಜೀವಿತಾವಧಿಯ ಖಾತರಿಯ ಮಾಸಿಕ ಪಿಂಚಣಿ ಆಯ್ಕೆಗಳು' : 'Lifelong guaranteed annuity pension payout'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{isKn ? 'ಪತಿ ಮತ್ತು ಪತ್ನಿ ಇಬ್ಬರಿಗೂ ಜಂಟಿ ಪಿಂಚಣಿ (Joint Life)' : 'Joint-life annuity covers spouse after primary demise'}</span>
              </div>
            </div>
          </div>

          {/* Booking CTA Button */}
          <div className="mt-6 pt-4 border-t border-white/15">
            {onBookConsultation && (
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ನಿವೃತ್ತಿ ಯೋಜನೆ ಚರ್ಚಿಸಿ' : 'Discuss Retirement Plan with Sofia'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            <div className="flex items-start gap-1.5 mt-3 text-[10px] text-slate-400 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isKn
                  ? 'ಗಮನಿಸಿ: ಇದು ನಿವೃತ್ತಿ ಯೋಜನೆಯ ಶೈಕ್ಷಣಿಕ ಅಂದಾಜು. ವಾಸ್ತವಿಕ ಆನ್ಯುಯಿಟಿ ದರಗಳು ಮತ್ತು ನಿವೃತ್ತಿ ಪಾಲಿಸಿಗಳು SBI Life ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.'
                  : 'Notice: Simplified projection tool. Actual annuity payout rates and pension returns depend on prevailing SBI Life annuity options and IRDAI regulations.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPensionCalculator;
