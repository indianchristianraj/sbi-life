import React from 'react';
import { UserCheck, ShieldCheck, MapPin, Clock, Phone, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

export const AboutView: React.FC<Props> = ({ language, onNavigate }) => {
  const isKn = language === 'kn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Neutral dignified advisor portrait placeholder */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 border-2 border-teal-800/20 flex flex-col items-center justify-center text-slate-500 shrink-0 p-2 text-center">
            <UserCheck className="w-10 h-10 text-teal-800 mb-1" />
            <span className="text-[10px] font-semibold text-slate-600 leading-tight">
              {isKn ? 'ಅಧಿಕೃತ ಭಾವಚಿತ್ರ' : 'Verified Portrait'}
            </span>
            <span className="text-[8px] text-slate-400">
              {isKn ? 'ಪರಿಶೀಲನೆ ಹಂತದಲ್ಲಿದೆ' : 'Pending Company Approval'}
            </span>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಅಧಿಕೃತ ಜೀವ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿ' : 'Authorized Insurance Advisor'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {ADVISOR_CONFIG.name}
            </h1>
            <p className="text-sm font-medium text-teal-900">
              {ADVISOR_CONFIG.professionalTitle[language]}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {ADVISOR_CONFIG.location.city}, {ADVISOR_CONFIG.location.district} District
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {isKn ? ADVISOR_CONFIG.workingHours.timingsKn : ADVISOR_CONFIG.workingHours.timings}
              </span>
            </div>
          </div>
        </div>

        {/* Advisor Direct Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100">
          <a
            href={`tel:${ADVISOR_CONFIG.contact.phone}`}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-800" />
            <span>{isKn ? 'ನೇರ ಕರೆ: ' : 'Call Direct: '}{ADVISOR_CONFIG.contact.displayPhone}</span>
          </a>
          <a
            href={ADVISOR_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isKn ? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Message on WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* Philosophy & Local Commitment */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {isKn ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರ ಸಮಾಲೋಚನಾ ನೀತಿ' : 'Advisory Philosophy & Code of Conduct'}
        </h2>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 text-sm text-slate-700 space-y-4 leading-relaxed">
          <p>
            {isKn
              ? 'ಗಂಗಾವತಿ ಮತ್ತು ಕೊಪ್ಪಳ ಜಿಲ್ಲೆಯ ಕುಟುಂಬಗಳಿಗೆ ಜೀವ ವಿಮೆಯು ಕೇವಲ ತೆರಿಗೆ ಉಳಿತಾಯದ ಸಾಧನವಲ್ಲ, ಅದು ಕುಟುಂಬದ ಮುಖ್ಯ ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಅನುಪಸ್ಥಿತಿಯಲ್ಲಿ ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಮತ್ತು ಗೌರವಯುತ ಬದುಕನ್ನು ರಕ್ಷಿಸುವ ಬುನಾದಿ.'
              : 'For families across Gangavathi and Koppal district, life insurance is not merely a tax-saving transaction. It is the bedrock of family continuity, guaranteeing that children’s education and household dignity remain uninterrupted even in unexpected tragedies.'}
          </p>
          <p>
            {isKn
              ? 'ನನ್ನ ಸಮಾಲೋಚನೆಯಲ್ಲಿ ನಾನು ಅನಗತ್ಯ ಮಾರಾಟ ಒತ್ತಡವನ್ನು ಎಂದಿಗೂ ಹೇರುವುದಿಲ್ಲ. ಮೊದಲು ನಿಮ್ಮ ಕುಟುಂಬದ ನೈಜ ಆದಾಯ, ಬಾಕಿ ಇರುವ ಸಾಲಗಳು ಹಾಗೂ ಭವಿಷ್ಯದ ಜವಾಬ್ದಾರಿಗಳನ್ನು ಆಲಿಸಿ, ನಿಖರವಾದ ರಕ್ಷಣಾ ಅಗತ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ, ನಂತರ ನಿಮ್ಮ ಬಜೆಟ್‌ಗೆ ಸೂಕ್ತವಾದ ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಯೋಜನೆಗಳನ್ನು ಮಾತ್ರ ಪ್ರಸ್ತುತಪಡಿಸುತ್ತೇನೆ.'
              : 'In my advisory process, there is zero sales coercion. We begin by transparently assessing your monthly household expenses, outstanding debt, and milestone goals to establish your true protection gap before exploring suitable, approved SBI Life coverage options.'}
          </p>
        </div>
      </section>

      {/* Advisory Principles */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          {isKn ? 'ನಮ್ಮ 4 ಮುಖ್ಯ ಮೌಲ್ಯಗಳು' : 'Core Advisory Commitments'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{isKn ? '1. ಪಾರದರ್ಶಕ ರಕ್ಷಣಾ ಲೆಕ್ಕಾಚಾರ' : '1. Transparent Protection Gap Assessment'}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಯಾವುದೇ ಅಸ್ಪಷ್ಟ ಅಂದಾಜುಗಳಿಲ್ಲದೆ, ಕುಟುಂಬಕ್ಕೆ ಅಗತ್ಯವಿರುವ ನಿಖರ ಮೊತ್ತವನ್ನು ಮುಕ್ತವಾಗಿ ಲೆಕ್ಕ ಹಾಕಿ ತಿಳಿಸಲಾಗುತ್ತದೆ.'
                : 'Using simple, verifiable calculations to find the exact cover required to shield your family against distress.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{isKn ? '2. ಯಾವುದೇ ಸುಳ್ಳು ಲಾಭದ ಭರವಸೆಗಳಿಲ್ಲ' : '2. No Speculative Return Guarantees'}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಗ್ಯಾರಂಟಿ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಕಂಪನಿಯ ಬೋನಸ್ ಸೌಲಭ್ಯಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ವಿವರಿಸಲಾಗುತ್ತದೆ.'
                : 'Clear differentiation between contractual guaranteed benefits and variable non-guaranteed bonuses.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{isKn ? '3. ಶೂನ್ಯ ನಗದು ಪಾವತಿ ನೀತಿ' : '3. Strict Zero-Cash Collection Policy'}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಖಾತೆಗೆ ನಗದು ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ಪಾವತಿಗಳನ್ನು ನೇರವಾಗಿ ಅಧಿಕೃತ ಕಂಪನಿ ಖಾತೆಗೆ ಮಾತ್ರ ಮಾಡಿಸಲಾಗುತ್ತದೆ.'
                : 'All premium transactions are routed exclusively through official SBI Life counters and authorized banking gateways.'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>{isKn ? '4. ನಿರಂತರ ಕ್ಲೈಮ್ & ಸೇವಾ ಬೆಂಬಲ' : '4. Dedicated Nominee & Claim Assistance'}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isKn
                ? 'ಪಾಲಿಸಿ ನಂತರವೂ ನಾಮಿನಿ ವಿವರ ನವೀಕರಣ, ವಿಳಾಸ ಬದಲಾವಣೆ ಹಾಗೂ ಕ್ಲೈಮ್ ಸಂದರ್ಭದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ಪೂರ್ಣ ಸಹಕಾರ.'
                : 'Unconditional assistance with nominee updates, policy revivals, and end-to-end guidance during claim settlement.'}
            </p>
          </div>
        </div>
      </section>

      {/* Service Coverage Taluks */}
      <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-2">
          {isKn ? 'ಗಂಗಾವತಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಸೇವಾ ಪ್ರದೇಶಗಳು' : 'Local Service Coverage Area'}
        </h3>
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {isKn
            ? 'ಕೊಪ್ಪಳ, ಬಳ್ಳಾರಿ ಮತ್ತು ವಿಜಯನಗರ ಜಿಲ್ಲೆಗಳ ಕೆಳಗಿನ ತಾಲೂಕುಗಳಲ್ಲಿ ವಾಸಿಸುವ ನಾಗರಿಕರು ಮುಖಾಮುಖಿ ಅಥವಾ ದೂರವಾಣಿ ಸಮಾಲೋಚನೆಗೆ ಸಂಪರ್ಕಿಸಬಹುದು:'
            : 'Personal and telephone advisory available across the following regional taluks:'}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {ADVISOR_CONFIG.location.coverageAreas.map((area) => (
            <span
              key={area}
              className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* Compliance Note */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{isKn ? 'ಕಾನೂನು ನಿಯಮಾವಳಿ:' : 'Statutory Note:'}</strong>{' '}
          {isKn ? ADVISOR_CONFIG.compliance.advisorNoticeKn : ADVISOR_CONFIG.compliance.advisorNoticeEn}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('book')}
          className="px-8 py-3.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-sm"
        >
          {isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಮಾತನಾಡಿ' : 'Schedule a Conversation with Sofia'}
        </button>
      </div>
    </div>
  );
};
