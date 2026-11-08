import React from 'react';
import { GraduationCap, TrendingUp, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { ChildEducationPlanner } from '../tools/ChildEducationPlanner';
import { CHILD_EDUCATION_FUTURE } from '../../assets/embeddedImages';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingWithEducationCost?: (cost: number) => void;
}

export const ChildrenFutureView: React.FC<Props> = ({
  language,
  onNavigate,
  onOpenBookingWithEducationCost,
}) => {
  const isKn = language === 'kn';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Hero Banner with Generated Image */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ ಯೋಜನೆ' : 'Higher Education Planning'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isKn
                ? 'ಶಿಕ್ಷಣ ಹಣದುಬ್ಬರವನ್ನು ಎದುರಿಸಿ: ಮಗುವಿನ ಕನಸುಗಳಿಗೆ ಶಿಸ್ತುಬದ್ಧ ಆರ್ಥಿಕ ಭದ್ರತೆ'
                : 'Defeating Education Inflation: Structured Financial Roadmaps for Your Child'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isKn
                ? 'ವೈದ್ಯಕೀಯ, ಎಂಜಿನಿಯರಿಂಗ್, ಕೃಷಿ ಸಂಶೋಧನೆ ಅಥವಾ ವಿದೇಶಿ ವ್ಯಾಸಂಗದ ಶುಲ್ಕಗಳು ಪ್ರತಿ 7-8 ವರ್ಷಕ್ಕೆ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತಿವೆ. ಕೊನೆ ಕ್ಷಣದಲ್ಲಿ ಸಾಲ ಪಡೆಯುವ ಬದಲು ಮುಂಚಿತವಾಗಿ ಶಿಸ್ತುಬದ್ಧ ಉಳಿತಾಯ ಮತ್ತು ಜೀವ ರಕ್ಷಣೆ ಮಾಡುವುದು ಬುದ್ಧಿವಂತಿಕೆ.'
                : 'Professional higher education inflation in India averages 8%–10% annually. Early, disciplined planning combined with insurance waiver-of-premium safeguards ensures your child’s ambition never gets derailed.'}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3]">
              <img
                src={CHILD_EDUCATION_FUTURE}
                alt="Young Indian student focused on education at study desk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Tool: Child Education Cost Planner */}
      <section className="space-y-4">
        <ChildEducationPlanner
          language={language}
          onBookConsultation={onOpenBookingWithEducationCost}
        />
      </section>

      {/* Strategic Milestones */}
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {isKn ? 'ಮಕ್ಕಳ ಯೋಜನೆ ರೂಪಿಸುವಾಗ ಗಮನಿಸಬೇಕಾದ 3 ಮುಖ್ಯ ಅಂಶಗಳು' : '3 Key Pillars of Child Future Security'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              {isKn ? '1. ಪ್ರೀಮಿಯಂ ಮನ್ನಾ ಸೌಲಭ್ಯ (Waiver of Premium)' : '1. Waiver of Premium (WOP) Rider'}
            </strong>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಪೋಷಕರಿಗೆ ಅನಿರೀಕ್ಷಿತ ಅಪಾಯವಾದರೆ ಭವಿಷ್ಯದ ಉಳಿದ ಕಂತುಗಳನ್ನು ಕಂಪನಿಯೇ ಭರಿಸಿ, ಮಗುವಿಗೆ ಕಾಲೇಜು ವಯಸ್ಸಿನಲ್ಲಿ ನಿಗದಿತ ಹಣ ತಲುಪುವಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.'
                : 'If an untimely tragedy befalls the parent, remaining future premiums are waived by the insurer, ensuring the college fund matures intact.'}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              {isKn ? '2. ಹಂತ-ಹಂತದ ಪಾವತಿ (Staggered Payouts)' : '2. Staggered Milestone Payouts'}
            </strong>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಮಗು 18, 20, 22 ನೇ ವಯಸ್ಸಿನಲ್ಲಿ ಕಾಲೇಜು ಸೇರುವಾಗ ಪ್ರತಿ ವರ್ಷವೂ ಕಾಲೇಜು ಶುಲ್ಕ ಪಾವತಿಸಲು ನಿಯಮಿತ ಹಣ ಬಿಡುಗಡೆಯಾಗುವ ಆಯ್ಕೆ.'
                : 'Structuring payouts to coincide with graduation semesters, entrance examinations, and postgraduate admissions.'}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">
              {isKn ? '3. ಶಿಸ್ತುಬದ್ಧ ಉಳಿತಾಯದ ರಕ್ಷಣೆ' : '3. Non-Negotiable Dedicated Fund'}
            </strong>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಸಾಮಾನ್ಯ ಉಳಿತಾಯವನ್ನು ಇತರ ತುರ್ತು ಕೆಲಸಗಳಿಗೆ ಖರ್ಚು ಮಾಡುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ವಿಮಾ ಆಧಾರಿತ ಉಳಿತಾಯವು ಮಗುವಿನ ಶಿಕ್ಷಣಕ್ಕೇ ಮೀಸಲಾಗಿರುತ್ತದೆ.'
                : 'Protects the education corpus from being casually liquidated for discretionary short-term family expenses.'}
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
          {isKn ? 'ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಯೋಜನೆ ಕುರಿತು ಸಮಾಲೋಚಿಸಿ' : 'Schedule a Child Education Advisory Call'}
        </button>
      </div>
    </div>
  );
};
