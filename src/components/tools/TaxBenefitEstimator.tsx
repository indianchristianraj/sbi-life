import React, { useState } from 'react';
import {
  Receipt,
  ShieldCheck,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Scale,
  Sparkles,
  Info,
} from 'lucide-react';
import { Language } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';

export interface TaxBenefitDetails {
  annualIncome: number;
  insurancePremium: number;
  existingDeductions: number;
  eligible80CDeduction: number;
  taxSlabPercentage: number;
  totalTaxSaved: number;
  effectivePremiumCost: number;
}

interface TaxBenefitEstimatorProps {
  language: Language;
  onBookConsultation?: (details: TaxBenefitDetails) => void;
  className?: string;
}

export const TaxBenefitEstimator: React.FC<TaxBenefitEstimatorProps> = ({
  language,
  onBookConsultation,
  className = '',
}) => {
  const isKn = language === 'kn';

  // State inputs
  const [annualIncome, setAnnualIncome] = useState<number>(1000000); // ₹10 Lakhs default
  const [insurancePremium, setInsurancePremium] = useState<number>(60000); // ₹60,000 annual premium
  const [existingDeductions, setExistingDeductions] = useState<number>(40000); // ₹40,000 (EPF/PPF/Tuition)

  // 80C calculation logic (Old Tax Regime)
  const max80CLimit = 150000;
  const available80CHeadroom = Math.max(0, max80CLimit - existingDeductions);
  const eligible80CDeduction = Math.min(insurancePremium, available80CHeadroom);

  // Income Tax Slab determination (with 4% Health & Education Cess)
  let slabRate = 0;
  let slabLabelEn = '0% (Nil Slab)';
  let slabLabelKn = '0% (ತೆರಿಗೆ ಮುಕ್ತ)';

  if (annualIncome > 5000000) {
    slabRate = 30 * 1.10 * 1.04; // 30% + 10% surcharge + 4% cess = ~34.32%
    slabLabelEn = '30% + Surcharge (Effective 34.3%)';
    slabLabelKn = '30% + ಸರ್‌ಚಾರ್ಜ್ (ಅಂದಾಜು 34.3%)';
  } else if (annualIncome > 1000000) {
    slabRate = 30 * 1.04; // 31.2%
    slabLabelEn = '30% Slab (Effective 31.2% with cess)';
    slabLabelKn = '30% ಸ್ಲ್ಯಾಬ್ (ಸೆಸ್ ಸೇರಿದಂತೆ 31.2%)';
  } else if (annualIncome > 500000) {
    slabRate = 20 * 1.04; // 20.8%
    slabLabelEn = '20% Slab (Effective 20.8% with cess)';
    slabLabelKn = '20% ಸ್ಲ್ಯಾಬ್ (ಸೆಸ್ ಸೇರಿದಂತೆ 20.8%)';
  } else if (annualIncome > 250000) {
    slabRate = 5 * 1.04; // 5.2%
    slabLabelEn = '5% Slab (Effective 5.2% with cess)';
    slabLabelKn = '5% ಸ್ಲ್ಯಾಬ್ (ಸೆಸ್ ಸೇರಿದಂತೆ 5.2%)';
  }

  const totalTaxSaved = Math.round(eligible80CDeduction * (slabRate / 100));
  const effectivePremiumCost = Math.max(0, insurancePremium - totalTaxSaved);
  const discountPercentage = insurancePremium > 0 ? Math.round((totalTaxSaved / insurancePremium) * 100) : 0;

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
        annualIncome,
        insurancePremium,
        existingDeductions,
        eligible80CDeduction,
        taxSlabPercentage: slabRate,
        totalTaxSaved,
        effectivePremiumCost,
      });
    }
  };

  const handleWhatsAppConsult = () => {
    const text = isKn
      ? `ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ವಾರ್ಷಿಕ ಆದಾಯ ₹${(annualIncome / 100000).toFixed(1)} ಲಕ್ಷ. ನಾನು ಸೆಕ್ಷನ್ 80C ಅಡಿಯಲ್ಲಿ ವಾರ್ಷಿಕ ₹${insurancePremium.toLocaleString('en-IN')} ವಿಮಾ ಪ್ರೀಮಿಯಂ ಹೂಡಿಕೆ ಮಾಡಿ ಅಂದಾಜು ₹${totalTaxSaved.toLocaleString('en-IN')} ತೆರಿಗೆ ಉಳಿಸುವ ಸೂಕ್ತ ಪಾಲಿಸಿಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಇಷ್ಟಪಡುತ್ತೇನೆ.`
      : `Hello Sofia Rani, my annual income is ₹${(annualIncome / 100000).toFixed(1)} Lakhs. I calculated a tax saving of ~₹${totalTaxSaved.toLocaleString('en-IN')} under Section 80C with an insurance investment of ₹${insurancePremium.toLocaleString('en-IN')}. Please guide me on tax-efficient SBI Life plans.`;

    window.open(
      `https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm space-y-8 ${className}`}>
      {/* Tool Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <Receipt className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಆದಾಯ ತೆರಿಗೆ ಉಳಿತಾಯ ಅಂದಾಜು' : 'Income Tax Optimization Tool'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಸೆಕ್ಷನ್ 80C ತೆರಿಗೆ ಉಳಿತಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Section 80C Tax Benefit Estimator'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಹೂಡಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಎಷ್ಟು ತೆರಿಗೆ ಉಳಿಸಬಹುದು ಹಾಗೂ ಪಾಲಿಸಿಯ ವಾಸ್ತವಿಕ ವೆಚ್ಚ ಎಷ್ಟು ಕಡಿಮೆಯಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಲೆಕ್ಕ ಹಾಕಿ.'
            : 'Calculate exact income tax savings under Section 80C based on your annual income tax slab, reducing your net out-of-pocket insurance cost.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Annual Taxable Income Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="tax-income">
                {isKn ? 'ನಿಮ್ಮ ವಾರ್ಷಿಕ ಒಟ್ಟು ಆದಾಯ (ರೂ.)' : 'Your Annual Gross Taxable Income (₹)'}
              </label>
              <span className="font-bold text-slate-900 tabular-nums bg-teal-50 text-teal-900 px-2.5 py-0.5 rounded-lg border border-teal-200 text-sm">
                {formatINR(annualIncome)}
              </span>
            </div>

            {/* Income Presets */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[500000, 800000, 1200000, 2000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAnnualIncome(preset)}
                  className={`py-1 text-xs rounded-xl font-medium border transition-colors cursor-pointer text-center ${
                    annualIncome === preset
                      ? 'bg-teal-800 text-white border-teal-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{preset / 100000}L/yr
                </button>
              ))}
            </div>

            <input
              id="tax-income"
              type="range"
              min="300000"
              max="3500000"
              step="50000"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹3 Lakh</span>
              <span>₹15 Lakh</span>
              <span>₹35 Lakh</span>
            </div>
          </div>

          {/* 2. Planned Annual Life Insurance Premium */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-800">
              <label htmlFor="tax-premium">
                {isKn ? 'ಯೋಜಿತ ವಾರ್ಷಿಕ ವಿಮಾ ಪ್ರೀಮಿಯಂ (ರೂ.)' : 'Planned Annual Insurance Investment (₹)'}
              </label>
              <span className="font-bold text-teal-900 tabular-nums text-base">
                {formatINR(insurancePremium)}
              </span>
            </div>

            {/* Premium Presets */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[25000, 50000, 100000, 150000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInsurancePremium(preset)}
                  className={`py-1 text-xs rounded-xl font-medium border transition-colors cursor-pointer text-center ${
                    insurancePremium === preset
                      ? 'bg-teal-800 text-white border-teal-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{preset / 1000}k
                </button>
              ))}
            </div>

            <input
              id="tax-premium"
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={insurancePremium}
              onChange={(e) => setInsurancePremium(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹10,000</span>
              <span>₹75,000</span>
              <span>₹1,50,000 (80C Max)</span>
            </div>
          </div>

          {/* 3. Existing 80C Investments (EPF / PPF / Tuition) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
              <label htmlFor="tax-existing" className="flex items-center gap-1.5">
                <span>{isKn ? 'ಇತರ 80C ಉಳಿತಾಯಗಳು (EPF, PPF, ಶಾಲಾ ಫೀಸ್)' : 'Existing 80C Deductions (EPF, PPF, Tuition)'}</span>
              </label>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatINR(existingDeductions)}
              </span>
            </div>
            <input
              id="tax-existing"
              type="range"
              min="0"
              max="150000"
              step="5000"
              value={existingDeductions}
              onChange={(e) => setExistingDeductions(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
              <span>{isKn ? 'ಉಳಿದಿರುವ 80C ಮಿತಿ:' : 'Available 80C Headroom:'}</span>
              <span className="font-bold text-teal-800 tabular-nums">
                {formatINR(available80CHeadroom)} / ₹1,50,000
              </span>
            </div>
          </div>

          {/* Tax Slab Summary Card */}
          <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100 flex items-center justify-between text-xs text-teal-950">
            <div>
              <span className="text-slate-500 block text-[11px]">
                {isKn ? 'ನಿಮ್ಮ ಅನ್ವಯವಾಗುವ ಆದಾಯ ತೆರಿಗೆ ಸ್ಲ್ಯಾಬ್:' : 'Your Applicable Income Tax Slab:'}
              </span>
              <span className="font-bold text-teal-900 text-sm">
                {isKn ? slabLabelKn : slabLabelEn}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">
                {isKn ? 'ಅರ್ಹ 80C ಕಡಿತ:' : 'Eligible 80C Deduction:'}
              </span>
              <span className="font-bold text-slate-900 text-sm tabular-nums">
                {formatINR(eligible80CDeduction)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0F1D36] text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block mb-1">
                {isKn ? 'ನಿವ್ವಳ ತೆರಿಗೆ ಉಳಿತಾಯ ಸಾರಾಂಶ' : 'Net Tax Savings Blueprint'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isKn ? 'ವಾರ್ಷಿಕ ತೆರಿಗೆ ಉಳಿತಾಯದ ಅಂದಾಜು' : 'Estimated Annual Tax Saved'}
              </h4>
            </div>

            {/* Highlighted Annual Tax Saved Metric */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/15">
              <span className="text-xs text-slate-300 block mb-0.5">
                {isKn ? 'ಸೆಕ್ಷನ್ 80C ಅಡಿಯಲ್ಲಿ ಉಳಿಯುವ ತೆರಿಗೆ ಹಣ:' : 'Tax Dollars Saved under Section 80C:'}
              </span>
              <div className="text-3xl font-extrabold text-emerald-300 tabular-nums">
                {formatINR(totalTaxSaved)}
                <span className="text-xs font-normal text-slate-300 ml-1.5">/ year</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-teal-300 mt-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isKn
                    ? `ಪ್ರೀಮಿಯಂ ಮೊತ್ತದಲ್ಲಿ ~${discountPercentage}% ರಷ್ಟು ಸರ್ಕಾರದಿಂದ ತೆರಿಗೆ ರಿಯಾಯಿತಿ!`
                    : `~${discountPercentage}% effective discount on insurance premium via tax rebate!`}
                </span>
              </div>
            </div>

            {/* Effective Out-of-Pocket Cost */}
            <div className="space-y-2.5 text-xs border-t border-b border-white/15 py-3.5">
              <div className="flex justify-between items-center text-slate-300">
                <span>{isKn ? 'ಒಟ್ಟು ಪಾಲಿಸಿ ಪ್ರೀಮಿಯಂ:' : 'Gross Annual Premium:'}</span>
                <span className="font-semibold text-white tabular-nums">{formatINR(insurancePremium)}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>{isKn ? '(-) ನೇರ ತೆರಿಗೆ ಉಳಿತಾಯ:' : '(-) Direct Tax Rebate Saved:'}</span>
                <span className="font-bold tabular-nums">-{formatINR(totalTaxSaved)}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-white/10 font-bold">
                <span className="text-amber-300">{isKn ? 'ನಿಮ್ಮ ಕೈಯಿಂದ ಹೋಗುವ ನೈಜ ವೆಚ್ಚ:' : 'Net Out-of-Pocket Cost:'}</span>
                <span className="text-base text-amber-300 tabular-nums">{formatINR(effectivePremiumCost)}</span>
              </div>
            </div>

            {/* Section 10(10D) Tax-Free Returns Pill */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{isKn ? 'ಸೆಕ್ಷನ್ 10(10D) ತೆರಿಗೆ ಮುಕ್ತ ಲಾಭಗಳು' : 'Section 10(10D) Tax-Free Payouts'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isKn
                  ? 'ಪಾಲಿಸಿಯ ಮೆಚುರಿಟಿ ಮೊತ್ತ ಹಾಗೂ ನಾಮಿನಿಗೆ ಸಿಗುವ ಡೆತ್ ಬೆನಿಫಿಟ್ ಕ್ಲೈಮ್ ಮೊತ್ತ ಎರಡೂ ಸೆಕ್ಷನ್ 10(10D) ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ತೆರಿಗೆ ಮುಕ್ತ (100% Tax-Free).'
                  : 'Both life claim proceeds and maturity bonuses are 100% exempt from income tax under Section 10(10D) (Exempt-Exempt-Exempt tax status).'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppConsult}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>{isKn ? 'ತೆರಿಗೆ ಉಳಿಸುವ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ವಾಟ್ಸಾಪ್ ಮಾಡಿ' : 'Discuss Tax-Efficient Plan on WhatsApp'}</span>
            </button>

            {onBookConsultation && (
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/20"
              >
                <span>{isKn ? 'ತೆರಿಗೆ ಯೋಜನಾ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book Tax Consultation with Sofia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-start gap-1.5 text-[10px] text-slate-400 leading-relaxed pt-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isKn
                  ? 'ಗಮನಿಸಿ: ಸೆಕ್ಷನ್ 80C ಕಡಿತಗಳು ಹಳೆಯ ತೆರಿಗೆ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ (Old Tax Regime) ಲಭ್ಯವಿವೆ. ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ತೆರಿಗೆ ಸನ್ನಿವೇಶಕ್ಕೆ ಚಾರ್ಟರ್ಡ್ ಅಕೌಂಟೆಂಟ್ (CA) ಸಲಹೆ ಪಡೆಯಿರಿ.'
                  : 'Advisory: Section 80C deductions apply under the Old Tax Regime. Consult your tax professional for individual assessment.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxBenefitEstimator;
