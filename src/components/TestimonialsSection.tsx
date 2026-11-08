import React from 'react';
import { Lock } from 'lucide-react';
import { Language, TestimonialItem } from '../types';
import { TestimonialCarousel } from './TestimonialCarousel';

interface Props {
  language: Language;
  testimonials?: TestimonialItem[];
  isPublished?: boolean; // Controlled boolean flag to keep hidden until approved
  onOpenAdvisorPortal?: () => void;
}

export const TestimonialsSection: React.FC<Props> = ({
  language,
  testimonials = [],
  isPublished = false,
  onOpenAdvisorPortal,
}) => {
  const isKn = language === 'kn';

  // Filter only approved testimonials
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const shouldRenderContent = isPublished && approvedTestimonials.length > 0;

  // EMPTY STATE / HIDDEN HANDLER
  // Rendered whenever the published flag is false or no approved entries exist
  if (!shouldRenderContent) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 text-center max-w-3xl mx-auto">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-500">
            <Lock className="w-4 h-4 text-slate-600" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            {isKn ? 'ಗ್ರಾಹಕರ ನೈಜ ಅನುಭವಗಳು' : 'Client Testimonials & Feedback'}
          </span>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
            {isKn
              ? 'ಪರಿಶೀಲನೆ ಹಂತದಲ್ಲಿರುವ ಗ್ರಾಹಕರ ಅಭಿಪ್ರಾಯಗಳು'
              : 'Testimonials Hidden Pending Advisor Verification'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-4">
            {isKn
              ? 'ವಿಮಾ ನೀತಿ ಸಂಹಿತೆ ಮತ್ತು ಗ್ರಾಹಕ ರಕ್ಷಣಾ ನಿಯಮಾವಳಿಗಳ ಪ್ರಕಾರ, ಅಧಿಕೃತ ಲಿಖಿತ ಸಮ್ಮತಿ ಮತ್ತು ಕಂಪನಿ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಅನುಮೋದನೆ ಪಡೆದ ನೈಜ ಗ್ರಾಹಕರ ಅನುಭವಗಳನ್ನು ಮಾತ್ರ ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುವುದು. ಪ್ರಸ್ತುತ ನೈಜ ನಮೂನೆಗಳ ಪರಿಶೀಲನೆ ನಡೆಯುತ್ತಿದೆ.'
              : 'In accordance with IRDAI advertising standards and ethical advisory practices, client testimonials remain unpublished until genuine client consent is verified and approved through the applicable company review process.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 border-t border-slate-200/80 pt-3">
            <span>Status: Awaiting Company & Advisor Sign-off</span>
            <span aria-hidden="true">·</span>
            <span>Zero Fabricated Entries</span>
            {onOpenAdvisorPortal && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onOpenAdvisorPortal}
                  className="text-teal-800 hover:text-teal-950 font-medium underline cursor-pointer"
                >
                  {isKn ? 'ಅಡ್ಮಿನ್ ಕಂಟೆಂಟ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ' : 'Review in Advisor Portal'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ACTIVE APPROVED STATE: Render Reusable TestimonialCarousel
  return (
    <TestimonialCarousel
      testimonials={approvedTestimonials}
      isPublished={isPublished}
      language={language}
    />
  );
};
