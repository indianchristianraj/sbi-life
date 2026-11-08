import React from 'react';
import { ShieldCheck, Lock, AlertCircle, FileText } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

export const PrivacyView: React.FC<Props> = ({ language }) => {
  const isKn = language === 'kn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24 text-slate-800">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಡೇಟಾ ರಕ್ಷಣೆ & ಗೌಪ್ಯತೆ' : 'Data Privacy & Ethics'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಗೌಪ್ಯತೆ ನೀತಿ (Privacy Policy)' : 'Privacy Policy & Digital Protection Standards'}
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: November 2026 · Compliant with the Digital Personal Data Protection (DPDP) Act, 2023 (India)
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '1. ನಾವು ಯಾವ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ?' : '1. What Information Do We Collect?'}
          </h2>
          <p>
            {isKn
              ? 'ನಾವು ಕೇವಲ ನೀವು ಸ್ವಯಂಪ್ರೇರಿತವಾಗಿ ಒದಗಿಸುವ ಪ್ರಾಥಮಿಕ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಸಂಗ್ರಹಿಸುತ್ತೇವೆ: ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು, 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ವಾಸಿಸುವ ನಗರ/ತಾಲೂಕು, ಆದ್ಯತೆಯ ಭಾಷೆ, ಸಮಾಲೋಚನೆಯ ವಿಷಯ ಮತ್ತು ಸಂಪರ್ಕದ ಅನುಕೂಲಕರ ಸಮಯ.'
              : 'We collect only coarse, voluntary information necessary to fulfill your requested advisory callback: full name, 10-digit mobile number, city/taluk, preferred language, discussion topic, and preferred callback time window.'}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ನಾವು ಎಂದಿಗೂ ಸಂಗ್ರಹಿಸದ ಸೂಕ್ಷ್ಮ ವಿವರಗಳು:' : 'Explicitly Excluded Sensitive Data:'}</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isKn
              ? 'ಈ ಜಾಲತಾಣದಲ್ಲಿ ನಾವು ಆಧಾರ್ ಸಂಖ್ಯೆ (Aadhaar), ಪ್ಯಾನ್ ಕಾರ್ಡ್ (PAN), ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು, ಕ್ರೆಡಿಟ್/ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಮಾಹಿತಿ, ಒಟಿಪಿ (OTP), ವೈದ್ಯಕೀಯ ರಹಸ್ಯ ವರದಿಗಳು ಅಥವಾ ಪಾಲಿಸಿ ದಾಖಲೆಗಳನ್ನು ಎಂದಿಗೂ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕೇಳುವುದಿಲ್ಲ.'
              : 'We NEVER solicit, collect, or store Aadhaar numbers, PAN cards, bank account credentials, payment card details, OTPs, medical diagnostics, or uploaded policy bond scans on this web portal.'}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '2. ನಿಮ್ಮ ಮಾಹಿತಿಯ ಬಳಕೆ ಮತ್ತು ಉದ್ದೇಶ' : '2. Purpose of Data Processing'}
          </h2>
          <p>
            {isKn
              ? 'ಸಂಗ್ರಹಿಸಲಾದ ವಿವರಗಳನ್ನು ಕೇವಲ ಸೋಫಿಯಾ ರಾಣಿ (ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿ) ಅವರು ನಿಮ್ಮೊಂದಿಗೆ ನೇರ ಸಮಾಲೋಚನೆ ನಡೆಸಲು ಮಾತ್ರ ಬಳಸುತ್ತಾರೆ. ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿಗೆ, ಟೆಲಿ-ಮಾರ್ಕೆಟಿಂಗ್ ಏಜೆನ್ಸಿಗಳಿಗೆ ಮಾರಾಟ ಮಾಡಲಾಗುವುದಿಲ್ಲ.'
              : 'Your information is used exclusively by Sofia Rani to initiate your requested consultation. We do not sell, rent, license, or share your contact records with third-party telemarketers or external brokerages.'}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '3. ಸಮ್ಮತಿ ಹಿಂಪಡೆಯುವಿಕೆ ಮತ್ತು ಅಳಿಸುವ ಹಕ್ಕು' : '3. Consent Revocation & Data Deletion'}
          </h2>
          <p>
            {isKn
              ? 'ಭಾರತೀಯ ಡಿಜಿಟಲ್ ಡೇಟಾ ರಕ್ಷಣಾ ಕಾಯ್ದೆಯ ಅಡಿಯಲ್ಲಿ, ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ನಮ್ಮ ಸಮಾಲೋಚನಾ ದಾಖಲೆಗಳಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಅಳಿಸಲು (Right to Erasure) ವಿನಂತಿಸಬಹುದು. ಇದಕ್ಕಾಗಿ +91 7899151230 ಗೆ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಕರೆ ಮೂಲಕ ತಿಳಿಸಿದರೆ ಸಾಕು.'
              : 'In accordance with Indian data protection laws, you retain the full right to revoke consultation consent and demand the deletion of your enquiry record by notifying Sofia Rani directly via phone or WhatsApp.'}
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            {isKn ? '4. ಅಧಿಕೃತ ವಿಮಾ ಕಂತು ಪಾವತಿಗಳು' : '4. Official Insurer Transactions'}
          </h2>
          <p>
            {isKn
              ? 'ವಿಮಾ ಪಾಲಿಸಿ ಪ್ರಸ್ತಾವನೆ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಪಾವತಿಗಳನ್ನು ಗ್ರಾಹಕರು ನೇರವಾಗಿ ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಪೋರ್ಟಲ್ ಅಥವಾ ಅಧಿಕೃತ ಶಾಖೆಗಳ ಮೂಲಕವೇ ಪೂರ್ಣಗೊಳಿಸಬೇಕು. ಈ ವೆಬ್‌ಸೈಟ್ ಯಾವುದೇ ಹಣಕಾಸು ವಹಿವಾಟುಗಳನ್ನು ನಿರ್ವಹಿಸುವುದಿಲ್ಲ.'
              : 'All policy applications and statutory premium payments are finalized strictly through official SBI Life Insurance payment infrastructures and branches. No financial transactions take place on this domain.'}
          </p>
        </div>
      </div>
    </div>
  );
};
