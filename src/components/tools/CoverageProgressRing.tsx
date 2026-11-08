import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, ShieldAlert, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface CoverageProgressRingProps {
  language: Language;
  initialTargetGoal?: number;
  initialCurrentCover?: number;
  onBookConsultation?: () => void;
  onSelectDetailedCalculator?: () => void;
}

export const CoverageProgressRing: React.FC<CoverageProgressRingProps> = ({
  language,
  initialTargetGoal = 10000000, // ₹1 Crore
  initialCurrentCover = 3500000, // ₹35 Lakh
  onBookConsultation,
  onSelectDetailedCalculator,
}) => {
  const isKn = language === 'kn';

  const [targetGoal, setTargetGoal] = useState<number>(initialTargetGoal);
  const [currentCover, setCurrentCover] = useState<number>(initialCurrentCover);

  const safeTarget = Math.max(100000, targetGoal);
  const safeCover = Math.max(0, currentCover);
  const gap = Math.max(0, safeTarget - safeCover);
  const percentage = Math.min(100, Math.round((safeCover / safeTarget) * 100));

  // Chart data
  const data = [
    { name: isKn ? 'ಹಾಲಿ ರಕ್ಷಣೆ' : 'Current Cover', value: Math.min(safeCover, safeTarget), color: '#0D9488' }, // Teal
    { name: isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ (Gap)' : 'Coverage Gap', value: gap, color: '#E2E8F0' }, // Slate
  ];

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusBadge = () => {
    if (percentage >= 100) {
      return {
        label: isKn ? 'ಗುರಿ ತಲುಪಿದೆ · ಅತ್ಯುತ್ತಮ ರಕ್ಷಣೆ' : 'Goal Achieved · Fully Protected',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: CheckCircle2,
      };
    }
    if (percentage >= 60) {
      return {
        label: isKn ? 'ಉತ್ತಮ ಪ್ರಗತಿ · ಅಲ್ಪ ಕೊರತೆ ಉಳಿದಿದೆ' : 'Good Progress · Moderate Gap',
        bg: 'bg-teal-50 text-teal-800 border-teal-200',
        icon: ShieldCheck,
      };
    }
    return {
      label: isKn ? 'ಎಚ್ಚರಿಕೆ · ಗಣನೀಯ ರಕ್ಷಣಾ ಕೊರತೆ' : 'Action Recommended · Significant Gap',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: ShieldAlert,
    };
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Top Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-0.5">
            {isKn ? 'ಲೈಫ್ ಕವರ್ ಪ್ರಗತಿ ಸೂಚ್ಯಂಕ' : 'Life Cover Readiness Index'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isKn ? 'ನಿಮ್ಮ ರಕ್ಷಣಾ ಗುರಿ ಪ್ರಗತಿ ಉಂಗುರ' : 'Insurance Coverage Goal Progress Ring'}
          </h2>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.bg} self-start sm:self-center`}>
          <StatusIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{status.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Recharts Progress Ring Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-[240px] h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value) => [formatINR(Number(value) || 0), '']}
                  contentStyle={{
                    backgroundColor: '#0F1D36',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                    padding: '8px 12px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={96}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={true}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Ring Metric Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {percentage}%
              </span>
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider mt-0.5">
                {isKn ? 'ರಕ್ಷಿತ ಗುರಿ' : 'Covered'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                {formatINR(safeCover)} / {formatINR(safeTarget)}
              </span>
            </div>
          </div>

          {/* Color Key */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
              <span>{isKn ? 'ಹಾಲಿ ರಕ್ಷಣೆ' : 'Covered'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
              <span>{isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ' : 'Shortfall (Gap)'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Sliders & Metric Cards */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Target Coverage Goal */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium text-slate-800">
              <label htmlFor="target-goal-slider" className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-teal-700" />
                <span>{isKn ? 'ಅಗತ್ಯವಿರುವ ರಕ್ಷಣಾ ಗುರಿ' : 'Required Coverage Goal (Target)'}</span>
              </label>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatINR(targetGoal)}
              </span>
            </div>
            <input
              id="target-goal-slider"
              type="range"
              min="2500000"
              max="30000000"
              step="500000"
              value={targetGoal}
              onChange={(e) => setTargetGoal(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹25 Lakh</span>
              <span>₹3 Crore</span>
            </div>
          </div>

          {/* Slider 2: Current Existing Cover */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium text-slate-800">
              <label htmlFor="current-cover-slider" className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>{isKn ? 'ಹಾಲಿ ಇರುವ ಜೀವ ವಿಮೆ / ಸ್ವತ್ತುಗಳು' : 'Existing Life Cover & Liquid Assets'}</span>
              </label>
              <span className="font-bold text-slate-900 tabular-nums">
                {formatINR(currentCover)}
              </span>
            </div>
            <input
              id="current-cover-slider"
              type="range"
              min="0"
              max="20000000"
              step="250000"
              value={currentCover}
              onChange={(e) => setCurrentCover(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
              <span>₹0</span>
              <span>₹2 Crore</span>
            </div>
          </div>

          {/* Quick Metrics Summary Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {isKn ? 'ಹಾಲಿ ರಕ್ಷಣೆ' : 'Active Cover'}
              </span>
              <p className="text-base sm:text-lg font-extrabold text-teal-800 tabular-nums mt-0.5">
                {formatINR(safeCover)}
              </p>
            </div>

            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                {isKn ? 'ರಕ್ಷಣಾ ಕೊರತೆ (Gap)' : 'Net Protection Gap'}
              </span>
              <p className="text-base sm:text-lg font-extrabold text-amber-900 tabular-nums mt-0.5">
                {formatINR(gap)}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onSelectDetailedCalculator && (
              <button
                type="button"
                onClick={onSelectDetailedCalculator}
                className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1.5 cursor-pointer py-2 px-3 rounded-xl bg-teal-50 border border-teal-200 hover:bg-teal-100/70 transition-colors"
              >
                <span>{isKn ? 'ವಿವರವಾದ ರಕ್ಷಣಾ ಕೊರತೆ ಲೆಕ್ಕ ಹಾಕಿ' : 'Calculate Detailed Expenses Below'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onBookConsultation && gap > 0 && (
              <button
                type="button"
                onClick={onBookConsultation}
                className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 py-2 px-4 rounded-xl transition-colors cursor-pointer ml-auto"
              >
                {isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ' : 'Discuss Gap with Sofia'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageProgressRing;
