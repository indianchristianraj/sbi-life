import React from 'react';
import { Quote, CheckCircle2, MapPin, Tag } from 'lucide-react';
import { TestimonialItem, Language } from '../types';

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
  language?: Language;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  language = 'kn',
  className = '',
}) => {
  const isKn = language === 'kn';
  const feedback = isKn ? testimonial.feedbackKn : testimonial.feedbackEn;

  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between relative overflow-hidden group ${className}`}
    >
      {/* Decorative subtle accent band */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-700 to-amber-600 opacity-80" />

      <div className="space-y-4">
        {/* Quote mark and category pill */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
            <Quote className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-teal-800 bg-teal-50/70 border border-teal-100/80 px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3 text-teal-700" />
            <span>{testimonial.serviceCategory}</span>
          </div>
        </div>

        {/* Client feedback text */}
        <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal italic">
          "{feedback}"
        </blockquote>
      </div>

      {/* Client details footer */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
            {testimonial.clientName}
          </h4>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{testimonial.city}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{isKn ? 'ದೃಢೀಕೃತ' : 'Verified'}</span>
          </div>
          <span className="text-[10px] text-slate-400 tabular-nums">
            {testimonial.verifiedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
