import React, { useState } from 'react';
import { Calculator, ArrowRight, AlertCircle, Sparkles, CheckCircle2, ShieldCheck, HeartPulse, User } from 'lucide-react';
import { Language } from '../../types';

export interface PremiumEstimateDetails {
  age: number;
  term: number;
  sumAssured: number;
  gender: 'male' | 'female';
  isTobaccoUser: boolean;
  baseAnnualPremium: number;
  taxGst: number;
  totalAnnualPremium: number;
  monthlyEquivalent: number;
}

interface QuickPremiumEstimatorProps {
  language: Language;
  onBookConsultation?: (details: PremiumEstimateDetails) => void;
  className?: string;
}

export const QuickPremiumEstimator: React.FC<QuickPremiumEstimatorProps> = ({
  language,
  onBookConsultation,
  className = '',
}) => {
  const isKn = language === 'kn';

  // Input states
  const [age, setAge] = useState<number>(30);
  const [termYears, setTermYears] = useState<number>(30);
  const [sumAssured, setSumAssured] = useState<number>(10000000); // ₹1 Crore default
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isTobaccoUser, setIsTobaccoUser] = useState<boolean>(false);
  const [frequencyView, setFrequencyView] = useState<'annual' | 'monthly'>('annual');

  // Realistic Actuarial Indian Term Mortality Benchmarks
  // Base rates per ₹1,000 Sum Assured per year for non-tobacco male
  const calculateBenchmarkRate = (currentAge: number, term: number): number => {
    let ratePerThousand = 0.85;

    if (currentAge <= 25) {
      ratePerThousand = 0.82;
    } else if (currentAge <= 30) {
      ratePerThousand = 0.82 + (currentAge - 25) * 0.055; // ~1.10 at age 30
    } else if (currentAge <= 35) {
      ratePerThousand = 1.10 + (currentAge - 30) * 0.095; // ~1.58 at age 35
    } else if (currentAge <= 40) {
      ratePerThousand = 1.58 + (currentAge - 35) * 0.165; // ~2.40 at age 40
    } else if (currentAge <= 45) {
      ratePerThousand = 2.40 + (currentAge - 40) * 0.260; // ~3.70 at age 45
    } else if (currentAge <= 50) {
      ratePerThousand = 3.70 + (currentAge - 45) * 0.380; // ~5.60 at age 50
    } else {
      ratePerThousand = 5.60 + (currentAge - 50) * 0.550; // 50+
    }

    // Term factor: covering into later decades (age + term > 65) carries modest longevity factor
    const maturityAge = currentAge + term;
    if (maturityAge > 70) {
      ratePerThousand *= 1.15;
    } else if (maturityAge > 60) {
      ratePerThousand *= 1.08;
    }

    return ratePerThousand;
  };

  // 1. Base pure mortality cost
  const baseRatePerThousand = calculateBenchmarkRate(age, termYears);
  let basePremium = (sumAssured / 1000) * baseRatePerThousand;

  // 2. High Sum Assured Rebate (Insurers offer discounts for cover >= ₹1 Cr)
  let highSumAssuredDiscount = 0;
  if (sumAssured >= 20000000) {
    highSumAssuredDiscount = basePremium * 0.12; // 12% rebate for ₹2 Cr+
  } else if (sumAssured >= 10000000) {
    highSumAssuredDiscount = basePremium * 0.08; // 8% rebate for ₹1 Cr+
  } else if (sumAssured >= 5000000) {
    highSumAssuredDiscount = basePremium * 0.04; // 4% rebate for ₹50L+
  }
  basePremium = Math.max(2500, basePremium - highSumAssuredDiscount);

  // 3. Gender Adjustment (Females enjoy ~12% lower mortality rate in India)
  if (gender === 'female') {
    basePremium *= 0.88;
  }

  // 4. Tobacco / Smoker Loading (~45% increase due to elevated medical risk)
  if (isTobaccoUser) {
    basePremium *= 1.45;
  }

  const roundedBaseAnnualPremium = Math.round(basePremium);
  // 5. Statutory GST on pure term insurance (18% as mandated by Govt of India)
  const gstAmount = Math.round(roundedBaseAnnualPremium * 0.18);
  const totalAnnualPremium = roundedBaseAnnualPremium + gstAmount;
  const monthlyEquivalent = Math.round(totalAnnualPremium / 12);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleBookingTransfer = () => {
    if (onBookConsultation) {
      onBookConsultation({
        age,
        term: termYears,
        sumAssured,
        gender,
        isTobaccoUser,
        baseAnnualPremium: roundedBaseAnnualPremium,
        taxGst: gstAmount,
        totalAnnualPremium,
        monthlyEquivalent,
      });
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <Calculator className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ತ್ವರಿತ ಪ್ರೀಮಿಯಂ ಅಂದಾಜು ಸಾಧನ' : 'Quick Indicative Premium Tool'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ವಾರ್ಷಿಕ ಪ್ರೀಮಿಯಂ ಅಂದಾಜುಗಾರ' : 'Term Insurance Quick Premium Estimator'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ನಿಮ್ಮ ವಯಸ್ಸು, ಕವರ್ ಅವಧಿ ಮತ್ತು ಬಯಸಿದ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ ಅಂದಾಜು ವಾರ್ಷಿಕ ಪ್ರೀಮಿಯಂ ಅನ್ನು ತಕ್ಷಣ ತಿಳಿಯಿರಿ. ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ನೀಡಬೇಕಿಲ್ಲ.'
            : 'Enter your age and coverage criteria to get an instant, transparent benchmark of annual premiums before consulting Sofia.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="estimator-age">
                {isKn ? 'ನಿಮ್ಮ ಹಾಲಿ ವಯಸ್ಸು (ವರ್ಷಗಳು)' : 'Your Current Age (Years)'}
              </label>
              <span className="font-bold text-slate-900 tabular-nums bg-teal-50 text-teal-900 px-2.5 py-0.5 rounded-lg border border-teal-200 text-sm">
                {age} {isKn ? 'ವರ್ಷ' : 'Yrs'}
              </span>
            </div>
            <input
              id="estimator-age"
              type="range"
              min="21"
              max="58"
              step="1"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>21 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>35 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>58 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
            </div>
          </div>

          {/* 2. Coverage Term Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="estimator-term">
                {isKn ? 'ರಕ್ಷಣೆಯ ಅವಧಿ (ವರ್ಷಗಳು)' : 'Policy Term Duration (Years)'}
              </label>
              <span className="font-bold text-slate-900 tabular-nums bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 text-sm">
                {termYears} {isKn ? 'ವರ್ಷಗಳು' : 'Years'} (Up to Age {age + termYears})
              </span>
            </div>
            <input
              id="estimator-term"
              type="range"
              min="10"
              max="40"
              step="5"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>10 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>25 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
              <span>40 {isKn ? 'ವರ್ಷ' : 'Yrs'}</span>
            </div>
          </div>

          {/* 3. Sum Assured Buttons & Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-sm font-medium text-slate-800">
              <label htmlFor="estimator-sum-assured">
                {isKn ? 'ಬಯಸಿದ ಜೀವ ರಕ್ಷಣಾ ಮೊತ್ತ (Sum Assured)' : 'Desired Life Cover (Sum Assured)'}
              </label>
              <span className="font-bold text-teal-900 tabular-nums text-base">
                {formatINR(sumAssured)}
              </span>
            </div>

            {/* Quick preset chips */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[5000000, 7500000, 10000000, 15000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSumAssured(preset)}
                  className={`py-1.5 px-2 text-xs rounded-xl font-medium border transition-colors cursor-pointer text-center ${
                    sumAssured === preset
                      ? 'bg-teal-800 text-white border-teal-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset >= 10000000 ? `₹${preset / 10000000} Cr` : `₹${preset / 100000} L`}
                </button>
              ))}
            </div>

            <input
              id="estimator-sum-assured"
              type="range"
              min="2500000"
              max="30000000"
              step="2500000"
              value={sumAssured}
              onChange={(e) => setSumAssured(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹25 Lakh</span>
              <span>₹1 Crore</span>
              <span>₹3 Crore</span>
            </div>
          </div>

          {/* 4. Gender & Tobacco Status Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Gender Toggle */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isKn ? 'ಲಿಂಗ' : 'Gender'}
              </span>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    gender === 'male'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ಪುರುಷ' : 'Male'}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    gender === 'female'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ಮಹಿಳೆ (-12%)' : 'Female (-12%)'}
                </button>
              </div>
            </div>

            {/* Tobacco User Toggle */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isKn ? 'ತಂಬಾಕು / ಧೂಮಪಾನ' : 'Tobacco / Smoker Status'}
              </span>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsTobaccoUser(false)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    !isTobaccoUser
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ಇಲ್ಲ (Standard)' : 'No (Standard)'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsTobaccoUser(true)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isTobaccoUser
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ಹೌದು (+45%)' : 'Yes (Tobacco)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Estimation Results & Direct Booking Workflow */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Frequency Toggle: Annual vs Monthly Equivalent */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isKn ? 'ಪ್ರೀಮಿಯಂ ಲೆಕ್ಕಾಚಾರ' : 'Estimated Outlay'}
              </span>
              <div className="inline-flex rounded-lg bg-white p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setFrequencyView('annual')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    frequencyView === 'annual'
                      ? 'bg-teal-800 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ವಾರ್ಷಿಕ' : 'Annual'}
                </button>
                <button
                  type="button"
                  onClick={() => setFrequencyView('monthly')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    frequencyView === 'monthly'
                      ? 'bg-teal-800 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isKn ? 'ಮಾಸಿಕ ಸಮಾನ' : 'Monthly'}
                </button>
              </div>
            </div>

            {/* Prominent Display Metric */}
            <div className="text-center py-2">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                {frequencyView === 'annual'
                  ? isKn
                    ? 'ಅಂದಾಜು ಒಟ್ಟು ವಾರ್ಷಿಕ ಪ್ರೀಮಿಯಂ (ತೆರಿಗೆ ಸೇರಿ)'
                    : 'Estimated Annual Premium (Incl. GST)'
                  : isKn
                    ? 'ಅಂದಾಜು ಮಾಸಿಕ ಬಜೆಟ್ ವೆಚ್ಚ (ತೆರಿಗೆ ಸೇರಿ)'
                    : 'Estimated Monthly Budget Equivalent'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-900 tabular-nums tracking-tight">
                {frequencyView === 'annual' ? formatINR(totalAnnualPremium) : formatINR(monthlyEquivalent)}
                <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1">
                  {frequencyView === 'annual' ? (isKn ? '/ ವರ್ಷಕ್ಕೆ' : '/ year') : (isKn ? '/ ತಿಂಗಳಿಗೆ' : '/ month')}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {isKn
                  ? `ದಿನಕ್ಕೆ ಕೇವಲ ₹${Math.round(totalAnnualPremium / 365)} ಉಳಿತಾಯಕ್ಕೆ ಸಮಾನ`
                  : `Equivalent to just ~₹${Math.round(totalAnnualPremium / 365)}/day`}
              </p>
            </div>

            {/* Breakdown itemization */}
            <div className="space-y-2 text-xs border-t border-b border-slate-200 py-3 text-slate-700">
              <div className="flex justify-between">
                <span>{isKn ? 'ಮೂಲ ವಾರ್ಷಿಕ ಪ್ರೀಮಿಯಂ:' : 'Base Indicative Premium:'}</span>
                <span className="font-semibold tabular-nums">{formatINR(roundedBaseAnnualPremium)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{isKn ? 'ಕಾನೂನುಬದ್ಧ GST (18%):' : 'Mandatory GST (18%):'}</span>
                <span className="tabular-nums">+ {formatINR(gstAmount)}</span>
              </div>
              {highSumAssuredDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>{isKn ? 'ಹೆಚ್ಚಿನ ಕವರ್ ರಿಯಾಯಿತಿ:' : 'High Cover Rebate Applied:'}</span>
                  <span className="tabular-nums">- {formatINR(Math.round(highSumAssuredDiscount))}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                <span>{isKn ? 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಪ್ರೀಮಿಯಂ:' : 'Gross Annual Payable:'}</span>
                <span className="tabular-nums text-teal-800">{formatINR(totalAnnualPremium)}</span>
              </div>
            </div>

            {/* Key Assumptions Pill List */}
            <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>
                  {isKn ? 'ವಯಸ್ಸು:' : 'Profile:'} <strong>{age} {isKn ? 'ವರ್ಷ' : 'Yrs'}</strong>, {gender === 'female' ? (isKn ? 'ಮಹಿಳೆ' : 'Female') : (isKn ? 'ಪುರುಷ' : 'Male')}, {isTobaccoUser ? (isKn ? 'ತಂಬಾಕು ಬಳಕೆದಾರ' : 'Tobacco User') : (isKn ? 'ಧೂಮಪಾನ ರಹಿತ' : 'Non-Smoker')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>
                  {isKn ? 'ರಕ್ಷಣೆ:' : 'Protection:'} <strong>{formatINR(sumAssured)}</strong> {isKn ? 'ಮೊತ್ತ' : 'Cover'} for <strong>{termYears} {isKn ? 'ವರ್ಷ' : 'Years'}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>{isKn ? 'ಸೆಕ್ಷನ್ 80C ಆದಾಯ ತೆರಿಗೆ ವಿನಾಯಿತಿ ಲಭ್ಯ' : 'Eligible for Section 80C Tax Deduction'}</span>
              </div>
            </div>
          </div>

          {/* Direct Booking Link Button */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            {onBookConsultation && (
              <button
                type="button"
                onClick={handleBookingTransfer}
                className="w-full py-3 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಈ ಅಂದಾಜು ಚರ್ಚಿಸಿ' : 'Discuss This Estimate with Sofia'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Regulatory Transparency Note */}
            <div className="flex items-start gap-1.5 mt-3 text-[11px] text-slate-500 leading-relaxed">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isKn
                  ? 'ಗಮನಿಸಿ: ಇದು ಕೇವಲ ಸಾರ್ವಜನಿಕ ಬೆಂಚ್‌ಮಾರ್ಕ್ ಆಧಾರಿತ ಅಂದಾಜು. ವಾಸ್ತವಿಕ ಪ್ರೀಮಿಯಂ ದರವು ನಿಮ್ಮ ನಿಖರ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ, ಉದ್ಯೋಗ ಮತ್ತು SBI Life ನಿಯಮಗಳಿಗೆ ಅನುಗುಣವಾಗಿರುತ್ತದೆ.'
                  : 'Notice: Indicative educational benchmark. Actual policy premium and issuance depend on official SBI Life underwriting, medical tests, and IRDAI-approved rate tables.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPremiumEstimator;
