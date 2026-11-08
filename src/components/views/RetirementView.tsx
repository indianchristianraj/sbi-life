import React, { useState, useMemo } from 'react';
import { Clock, ShieldCheck, Heart, ArrowRight, CheckCircle2, Calculator, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Language, PublicRoute } from '../../types';
import { RetirementPensionCalculator, RetirementCalculationDetails } from '../tools/RetirementPensionCalculator';
import { RETIREMENT_SECURITY } from '../../assets/embeddedImages';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingWithRetirement?: (details: RetirementCalculationDetails) => void;
}

export const RetirementView: React.FC<Props> = ({
  language,
  onNavigate,
  onOpenBookingWithRetirement,
}) => {
  const isKn = language === 'kn';

  // Live calculation details synchronized from user's inputs in RetirementPensionCalculator
  const [calcDetails, setCalcDetails] = useState<RetirementCalculationDetails>({
    currentAge: 35,
    retirementAge: 60,
    yearsToRetirement: 25,
    monthlyExpenseToday: 35000,
    futureMonthlyExpense: 150215,
    requiredCorpus: 27732000,
    monthlyInvestmentNeeded: 20728,
  });

  // Calculate milestone growth projection dataset over time for the Recharts BarChart
  const chartData = useMemo(() => {
    const { currentAge, retirementAge, yearsToRetirement, requiredCorpus, monthlyInvestmentNeeded } = calcDetails;
    const monthlyRate = 0.10 / 12; // ~10% indicative pre-retirement blended compounding

    // Pick dynamic milestone intervals based on timeline span
    let step = 5;
    if (yearsToRetirement <= 5) step = 1;
    else if (yearsToRetirement <= 12) step = 2;
    else if (yearsToRetirement <= 20) step = 3;
    else step = 5;

    const milestones: number[] = [0];
    for (let t = step; t < yearsToRetirement; t += step) {
      milestones.push(t);
    }
    if (!milestones.includes(yearsToRetirement)) {
      milestones.push(yearsToRetirement);
    }

    return milestones.map((t) => {
      const age = currentAge + t;
      const months = t * 12;
      const invested = Math.round(monthlyInvestmentNeeded * months);
      let corpus = 0;

      if (t === 0) {
        corpus = 0;
      } else if (t === yearsToRetirement) {
        corpus = requiredCorpus;
      } else {
        const sipFactor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        corpus = Math.round(monthlyInvestmentNeeded * sipFactor);
      }

      const wealthGained = Math.max(0, corpus - invested);

      return {
        age,
        label: isKn ? `${age} ನೇ ವಯಸ್ಸು` : `Age ${age}`,
        invested,
        corpus,
        wealthGained,
      };
    });
  }, [calcDetails, isKn]);

  const formatYAxis = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(1)}Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(0)}L`;
    }
    if (val >= 1000) {
      return `₹${(val / 1000).toFixed(0)}k`;
    }
    return `₹${val}`;
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Custom accessible Tooltip for the Recharts BarChart
  interface TooltipPayloadItem {
    payload: {
      age: number;
      label: string;
      invested: number;
      corpus: number;
      wealthGained: number;
    };
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1.5 min-w-[210px]">
          <span className="font-bold text-teal-300 block border-b border-slate-700 pb-1">
            {data.label} ({data.age >= calcDetails.retirementAge ? (isKn ? 'ನಿವೃತ್ತಿ ವರ್ಷ' : 'Retirement Target') : `${data.age - calcDetails.currentAge} ${isKn ? 'ವರ್ಷಗಳ ನಂತರ' : 'years from now'}`})
          </span>
          <div className="flex justify-between items-center text-slate-300">
            <span>{isKn ? 'ಮೂಲ ಹೂಡಿಕೆ:' : 'Capital Invested:'}</span>
            <span className="font-bold text-white tabular-nums">{formatINR(data.invested)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>{isKn ? 'ಸಂಚಿತ ಕಾರ್ಪಸ್:' : 'Projected Corpus:'}</span>
            <span className="font-bold text-teal-300 tabular-nums">{formatINR(data.corpus)}</span>
          </div>
          {data.wealthGained > 0 && (
            <div className="flex justify-between items-center text-emerald-400 pt-1 border-t border-slate-800">
              <span>{isKn ? 'ಬಡ್ಡಿಯಿಂದ ಬೆಳವಣಿಗೆ:' : 'Compound Growth:'}</span>
              <span className="font-bold tabular-nums">+{formatINR(data.wealthGained)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const totalInvestedSum = calcDetails.monthlyInvestmentNeeded * calcDetails.yearsToRetirement * 12;
  const wealthGrowthSum = Math.max(0, calcDetails.requiredCorpus - totalInvestedSum);
  const wealthMultiplier = totalInvestedSum > 0 ? (calcDetails.requiredCorpus / totalInvestedSum).toFixed(1) : '1.0';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಉಳಿತಾಯ & ನಿವೃತ್ತಿ ಶಿಕ್ಷಣ' : 'Retirement & Long-term Savings'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isKn
                ? 'ಗೌರವಯುತ ನಿವೃತ್ತಿ: ಜೀವಿತಾವಧಿಯ ಖಾತರಿಯ ಮಾಸಿಕ ಆದಾಯದ ಯೋಜನೆ'
                : 'Guaranteed Lifelong Income: Safeguarding Your Financial Independence'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isKn
                ? 'ನಿವೃತ್ತಿಯ ನಂತರ ನಿಮ್ಮ ಸಂಬಳ ನಿಲ್ಲಬಹುದು, ಆದರೆ ದಿನನಿತ್ಯದ ಊಟ, ಔಷಧಿ ಮತ್ತು ವಿದ್ಯುತ್ ಬಿಲ್‌ಗಳು ನಿಲ್ಲುವುದಿಲ್ಲ. ವಯಸ್ಸಾದ ಕಾಲದಲ್ಲಿ ಯಾರ ಮೇಲೂ ಆರ್ಥಿಕವಾಗಿ ಅವಲಂಬಿತರಾಗದೆ ಸ್ವಾಭಿಮಾನದಿಂದ ಬದುಕಲು ನಿಗದಿತ ಆನ್ಯುಯಿಟಿ (Annuity) ಅತ್ಯಗತ್ಯ.'
                : 'Active employment ceases at retirement, but living costs and medical expenses continue unabated. Structuring guaranteed annuity pension income ensures unconditional self-reliance throughout your golden years.'}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3]">
              <img
                src={RETIREMENT_SECURITY}
                alt="Elderly South Indian couple enjoying peaceful retirement on veranda"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive Retirement Calculator */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-800" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {isKn ? 'ನಿಮ್ಮ ನಿವೃತ್ತಿ ಕಾರ್ಪಸ್ ಮತ್ತು ಪಿಂಚಣಿಯನ್ನು ಲೆಕ್ಕ ಹಾಕಿ' : 'Calculate Your Retirement Corpus & Pension Need'}
          </h2>
        </div>
        <RetirementPensionCalculator
          language={language}
          onBookConsultation={onOpenBookingWithRetirement}
          onCalculationChange={setCalcDetails}
        />
      </section>

      {/* Visual Recharts Bar Chart: Corpus Growth Over Time */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಕಾರ್ಪಸ್ ಬೆಳವಣಿಗೆಯ ದೃಶ್ಯೀಕರಣ' : 'Corpus Growth Over Time'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {isKn ? 'ಕಾಲಕ್ರಮೇಣ ನಿವೃತ್ತಿ ನಿಧಿಯ ಬೆಳವಣಿಗೆ' : 'Projected Corpus Accumulation Over Time'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isKn
                ? `ನಿಮ್ಮ ವಯಸ್ಸು ${calcDetails.currentAge} ರಿಂದ ${calcDetails.retirementAge} ರವರೆಗೆ ಮಾಸಿಕ ~₹${calcDetails.monthlyInvestmentNeeded.toLocaleString('en-IN')} ಉಳಿತಾಯ ಮಾಡಿದಾಗ ಚಕ್ರಬಡ್ಡಿಯೊಂದಿಗೆ ನಿಧಿಯ ಬೆಳವಣಿಗೆ.`
                : `Interactive Recharts bar chart tracking principal invested vs total corpus growth with compound returns from age ${calcDetails.currentAge} to ${calcDetails.retirementAge}.`}
            </p>
          </div>

          {/* Target Corpus Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              {isKn ? 'ಅಂತಿಮ ಗುರಿ ಕಾರ್ಪಸ್' : 'Target Corpus at Retirement'}
            </span>
            <span className="text-lg font-extrabold text-teal-900 tabular-nums">
              {formatINR(calcDetails.requiredCorpus)}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium block">
              {isKn ? `${calcDetails.yearsToRetirement} ವರ್ಷಗಳ ಹೂಡಿಕೆ ಅವಧಿ` : `${calcDetails.yearsToRetirement}-year investment runway`}
            </span>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#64748B', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: '#64748B', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: 16, fontSize: 12 }}
                formatter={(value) => {
                  if (value === 'invested') {
                    return isKn ? 'ಮೂಲ ಹೂಡಿಕೆ (Capital Invested)' : 'Capital Invested';
                  }
                  if (value === 'corpus') {
                    return isKn ? 'ಸಂಚಿತ ನಿವೃತ್ತಿ ಕಾರ್ಪಸ್ (Projected Corpus)' : 'Projected Corpus';
                  }
                  return value;
                }}
              />
              <Bar
                dataKey="invested"
                name="invested"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
                maxBarSize={44}
              />
              <Bar
                dataKey="corpus"
                name="corpus"
                fill="#0D9488"
                radius={[4, 4, 0, 0]}
                maxBarSize={44}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quantitative Insight Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
            <span className="text-slate-500 block text-[11px] font-medium">
              {isKn ? 'ಒಟ್ಟು ಅಂದಾಜು ಹೂಡಿಕೆ:' : 'Total Capital Invested:'}
            </span>
            <span className="text-base font-bold text-slate-800 tabular-nums">
              {formatINR(totalInvestedSum)}
            </span>
          </div>

          <div className="p-3.5 bg-teal-50/70 rounded-xl border border-teal-200/80 space-y-0.5">
            <span className="text-teal-800 block text-[11px] font-medium">
              {isKn ? 'ಬಡ್ಡಿಯಿಂದ ಬಂದ ನಿವ್ವಳ ಲಾಭ:' : 'Estimated Compound Wealth:'}
            </span>
            <span className="text-base font-bold text-teal-900 tabular-nums">
              +{formatINR(wealthGrowthSum)}
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-0.5">
            <span className="text-emerald-800 block text-[11px] font-medium">
              {isKn ? 'ಸಂಪತ್ತು ಗುಣಕ (Wealth Multiplier):' : 'Wealth Multiplier:'}
            </span>
            <span className="text-base font-bold text-emerald-950 tabular-nums">
              ~{wealthMultiplier}x
            </span>
          </div>
        </div>
      </section>

      {/* Educational Guidelines */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ನಿವೃತ್ತಿ ಯೋಜನೆಯಲ್ಲಿ ಪರಿಗಣಿಸಬೇಕಾದ 3 ವಾಸ್ತವಾಂಶಗಳು' : '3 Realities of Long-Term Retirement Planning'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ಹೆಚ್ಚುತ್ತಿರುವ ಜೀವಿತಾವಧಿ (Longevity)' : 'Extended Longevity'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಇಂದಿನ ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳಿಂದ 80-85 ವರ್ಷಗಳ ಕಾಲ ಬದುಕುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಅಂದರೆ ನಿವೃತ್ತಿಯ ನಂತರ 20-25 ವರ್ಷಗಳ ಕಾಲ ನಿಯಮಿತ ಆದಾಯ ಬೇಕಾಗುತ್ತದೆ.'
                : 'Life expectancy is steadily rising. A post-retirement lifespan of 25–30 years requires dependable, non-fluctuating monthly cash flows.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ವೈದ್ಯಕೀಯ ಹಣದುಬ್ಬರ (Healthcare Inflation)' : 'Rising Healthcare Expenditure'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ವೃದ್ಧಾಪ್ಯದಲ್ಲಿ ಔಷಧಿ ಮತ್ತು ಆಸ್ಪತ್ರೆ ವೆಚ್ಚಗಳು ಸಾಮಾನ್ಯ ಖರ್ಚಿಗಿಂತ ವೇಗವಾಗಿ ಹೆಚ್ಚಾಗುತ್ತವೆ. ಇದಕ್ಕೆ ಪ್ರತ್ಯೇಕ ಆರೋಗ್ಯ ಮತ್ತು ಪಿಂಚಣಿ ಭದ್ರತೆ ಇರಬೇಕು.'
                : 'Medical costs typically escalate faster than general consumer goods, necessitating a resilient guaranteed monthly budget.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {isKn ? 'ಖಾತರಿಯ ಆನ್ಯುಯಿಟಿ (Guaranteed Annuity)' : 'Guaranteed Lifelong Annuities'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಬ್ಯಾಂಕ್ ಬಡ್ಡಿದರಗಳು ಕಾಲಕ್ರಮೇಣ ಕಡಿಮೆಯಾದರೂ, ಜೀವ ವಿಮಾ ಪಿಂಚಣಿ ಪಾಲಿಸಿಗಳಲ್ಲಿ ಜೀವಿತಾವಧಿಯವರೆಗೆ ನಿಗದಿತ ದರದ ಪಿಂಚಣಿಯನ್ನು ಲಾಕ್ ಮಾಡಬಹುದು.'
                : 'While bank deposit interest rates may fluctuate downward over decades, guaranteed annuity options lock in fixed lifetime income.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('book')}
          className="px-8 py-3.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
        >
          {isKn ? 'ನಿವೃತ್ತಿ ಪಿಂಚಣಿ ಯೋಜನೆ ಕುರಿತು ಸಮಾಲೋಚಿಸಿ' : 'Schedule a Retirement Planning Call'}
        </button>
      </div>
    </div>
  );
};
