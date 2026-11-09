import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

export const DisclosuresView: React.FC<Props> = ({ language }) => {
  const isKn = language === 'kn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24 text-slate-800">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಶಾಸನಬದ್ಧ ನಿಯಮಗಳು' : 'Statutory Disclosures'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಕಾನೂನು ಬಹಿರಂಗಪಡಿಸುವಿಕೆ & ನಿಯಮಗಳು' : 'Mandatory Disclosures & Terms of Advisory'}
        </h1>
        <p className="text-xs text-slate-500">
          Individual Life Insurance Advisory Governance · Sindhanur, Raichur District, Karnataka
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        {/* 1. Independent Status */}
        <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200">
          <h2 className="text-sm font-bold text-teal-950 mb-1">
            {isKn ? '1. ಸ್ವತಂತ್ರ ವಿಮಾ ಸಲಹೆಗಾರರ ಸ್ಥಾನಮಾನ (Independent Status)' : '1. Independent Individual Advisory Status'}
          </h2>
          <p className="text-xs text-teal-900 leading-relaxed">
            {isKn ? ADVISOR_CONFIG.compliance.advisorNoticeKn : ADVISOR_CONFIG.compliance.advisorNoticeEn}
          </p>
        </div>

        {/* 2. No Speculative Guarantees */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '2. ಯಾವುದೇ ಅನುಮೋದನೆ ಅಥವಾ ಲಾಭದ ಖಾತರಿ ಇಲ್ಲ (No Speculative Guarantees)' : '2. No Underwriting Guarantees or Speculative Return Promises'}
          </h2>
          <p>
            {isKn
              ? 'ವಿಮಾ ಪಾಲಿಸಿಗಳ ಅನುಮೋದನೆ, ಪ್ರೀಮಿಯಂ ದರ ಹಾಗೂ ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥವು ಪೂರ್ಣವಾಗಿ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಕಂಪನಿಯ ವೈದ್ಯಕೀಯ ಮತ್ತು ಆರ್ಥಿಕ ಅಂಡರ್‌ರೈಟಿಂಗ್ ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ. ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಯಾವುದೇ ಪಾಲಿಸಿ ಅನುಮೋದನೆ ಅಥವಾ ಭವಿಷ್ಯದ ಆದಾಯದ ಬಗ್ಗೆ ಏಕಪಕ್ಷೀಯ ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ.'
              : 'Policy approval, underwriting terms, ratings, and claim determinations rest solely with SBI Life Insurance Co. Ltd. in accordance with IRDAI regulations. Sofia Rani does not represent or guarantee policy acceptance, investment returns, or tax outcome determinations.'}
          </p>
        </div>

        {/* 3. Zero Cash Collection */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <h2 className="text-sm font-bold text-amber-950 mb-1 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>{isKn ? '3. ಶೂನ್ಯ ನಗದು ಸ್ವೀಕಾರ ನೀತಿ (Zero Cash Policy)' : '3. Strict Zero Cash Collection Mandate'}</span>
          </h2>
          <p className="text-xs text-amber-900 leading-relaxed">
            {isKn ? ADVISOR_CONFIG.compliance.paymentGuidelineKn : ADVISOR_CONFIG.compliance.paymentGuidelineEn}
          </p>
        </div>

        {/* 4. Brand and Policy Claims Publication */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '4. ಬ್ರ್ಯಾಂಡ್ ಮತ್ತು ಪ್ರಚಾರ ನಿಯಮಗಳು (Brand Governance)' : '4. Brand Assets and Marketing Governance'}
          </h2>
          <p>
            {isKn
              ? 'ಎಸ್.ಬಿ.ಐ ಲೈಫ್‌ನ ಅಧಿಕೃತ ಲೋಗೋಗಳು, ಪಾಲಿಸಿ ಬ್ರೋಷರ್‌ಗಳು ಮತ್ತು ಪ್ರಚಾರ ಸಾಮಗ್ರಿಗಳನ್ನು ಕಂಪನಿಯ ನಿಯಮಾವಳಿಗಳ ಅನ್ವಯ ಪೂರ್ವಾನುಮೋದನೆ ಪಡೆದ ನಂತರವೇ ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುವುದು. ಪ್ರಸ್ತುತ ಪ್ರಕಟವಾಗಿರುವ ಎಲ್ಲಾ ಅಂಶಗಳು ಕೇವಲ ಕುಟುಂಬ ಆರ್ಥಿಕ ಭದ್ರತೆಯ ಸಾಮಾನ್ಯ ಗ್ರಾಹಕ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಮಾತ್ರ.'
              : 'All corporate trade names, policy brochures, and specific product literature are published strictly in accordance with approved corporate guidelines. Content on this site is currently curated for educational purposes.'}
          </p>
        </div>

        {/* 5. Section 41 of Insurance Act 1938 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <h3 className="font-bold text-slate-900 mb-1">
            Section 41 of Insurance Act 1938 (Prohibition of Rebates):
          </h3>
          <p className="text-slate-600 leading-relaxed italic">
            "No person shall allow or offer to allow, either directly or indirectly, as an inducement to any person to take out or renew or continue an insurance in respect of any kind of risk relating to lives in India, any rebate of the whole or part of the commission payable or any rebate of the premium shown on the policy..."
          </p>
        </div>
      </div>
    </div>
  );
};
