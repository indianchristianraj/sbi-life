import React, { useState } from 'react';
import {
  HelpCircle,
  FileText,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  CreditCard,
  MapPin,
  Scale,
  ExternalLink,
  FileCheck,
  HeartHandshake,
} from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';
import { NewPolicyDocumentsChecklist } from '../NewPolicyDocumentsChecklist';
import { ClaimSettlementGuide } from '../ClaimSettlementGuide';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

interface ServiceGuide {
  id: string;
  titleKn: string;
  titleEn: string;
  docsKn: string[];
  docsEn: string[];
  processKn: string;
  processEn: string;
  prefilledMsgKn: string;
  prefilledMsgEn: string;
}

const SERVICE_GUIDES: ServiceGuide[] = [
  {
    id: 'nominee',
    titleKn: 'ನಾಮಿನಿ ಬದಲಾವಣೆ / ತಿದ್ದುಪಡಿ',
    titleEn: 'Nominee Update & Appointee',
    docsKn: [
      'ಮೂಲ ಪಾಲಿಸಿ ಬಾಂಡ್ ಪತ್ರ',
      'ಹೊಸ ನಾಮಿನಿಯ ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ವೋಟರ್ ಐಡಿ',
      'ನಾಮಿನಿಯು ಅಪ್ರಾಪ್ತ ವಯಸ್ಕರಾಗಿದ್ದರೆ (18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ) ಅಪಾಯಿಂಟಿಯ ಕೆವೈಸಿ',
      'ಅಧಿಕೃತ SBI Life ನಾಮಿನಿ ಬದಲಾವಣೆ ಅರ್ಜಿ ಫಾರ್ಮ್ (Section 39)',
    ],
    docsEn: [
      'Original policy bond document',
      'Government Photo ID proof of proposed nominee (Aadhaar / Voter ID)',
      'KYC proof of Appointee if nominee is a minor (under 18 years)',
      'Duly signed Section 39 Nomination Change Form',
    ],
    processKn:
      'ಅರ್ಜಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಶಾಖೆಯ ಗ್ರಾಹಕ ಸೇವಾ ಕೌಂಟರ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಬೇಕು. 7-10 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ನಾಮಿನಿ ವಿವರ ನವೀಕರಣವಾಗುತ್ತದೆ.',
    processEn:
      'Submit the physical nomination change form along with KYC to the nearest authorized SBI Life branch. Endorsement is completed within 7–10 working days.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಪಾಲಿಸಿಯಲ್ಲಿ ನಾಮಿನಿ ಬದಲಾವಣೆ ಮಾಡಲು ಮಾರ್ಗದರ್ಶನ ಬೇಕಾಗಿದೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need guidance for updating the nominee in my SBI Life policy.',
  },
  {
    id: 'address',
    titleKn: 'ವಿಳಾಸ & ಮೊಬೈಲ್ ನವೀಕರಣ',
    titleEn: 'Address & Mobile Update',
    docsKn: [
      'ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಮತ್ತು ಪಾಲಿಸಿದಾರರ ಜನ್ಮ ದಿನಾಂಕ',
      'ಹೊಸ ವಿಳಾಸದ ಅಧಿಕೃತ ಪುರಾವೆ (ಆಧಾರ್ ಕಾರ್ಡ್, ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ಪಾಸ್‌ಪೋರ್ಟ್)',
      'ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಬರುವ OTP (ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್‌ಗಾಗಿ)',
      'ವಿಳಾಸ ಬದಲಾವಣೆಯ ಸ್ವಯಂ ಸಹಿ ಮಾಡಿದ ಅರ್ಜಿ',
    ],
    docsEn: [
      'Policy Number and Life Assured Date of Birth',
      'Valid Address Proof with current address (Aadhaar, Electricity bill, or Passport)',
      'OTP on registered mobile number (for paperless portal updates)',
      'Signed physical change request form (for branch counter submission)',
    ],
    processKn:
      'ಅಧಿಕೃತ SBI Life ಗ್ರಾಹಕ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಮೂಲಕ ಕಾಗದರಹಿತವಾಗಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ವಿಳಾಸ ಮತ್ತು ಮೊಬೈಲ್ ನವೀಕರಿಸಬಹುದು, ಅಥವಾ ಗಂಗಾವತಿ ಶಾಖೆಯಲ್ಲಿ ನೇರವಾಗಿ ಸಲ್ಲಿಸಬಹುದು.',
    processEn:
      'Update instantly via the official SBI Life customer portal with Aadhaar OTP e-KYC, or submit verified physical copies at the nearest branch counter.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಪಾಲಿಸಿಯಲ್ಲಿ ವಿಳಾಸ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಲು ಸಹಾಯ ಬೇಕಾಗಿದೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need guidance regarding updating my contact address and mobile number.',
  },
  {
    id: 'receipt',
    titleKn: 'ತೆರಿಗೆ ಪ್ರಮಾಣಪತ್ರ (80C)',
    titleEn: 'Premium Receipt & 80C',
    docsKn: [
      'ಪಾಲಿಸಿ ಸಂಖ್ಯೆ (8 ಅಥವಾ 9 ಅಂಕಿಗಳು)',
      'ಪಾಲಿಸಿದಾರರ ಜನ್ಮ ದಿನಾಂಕ (DOB)',
      'ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (OTP ಸ್ವೀಕರಿಸಲು)',
    ],
    docsEn: [
      'Policy number (8 or 9 digits)',
      'Life Assured date of birth',
      'Registered mobile number for OTP login',
    ],
    processKn:
      'ಅಧಿಕೃತ SBI Life ಪೋರ್ಟಲ್ (sbilife.co.in) ಅಥವಾ m-Connect ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ "Premium Paid Certificate" ಅನ್ನು ತ್ವರಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು.',
    processEn:
      'Log into the official SBI Life portal or mobile application using your policy number and date of birth to instantly download the certificate.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಪಾಲಿಸಿಯ ವಾರ್ಷಿಕ ಪ್ರೀಮಿಯಂ ತೆರಿಗೆ ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಸಹಾಯ ಬೇಕಾಗಿದೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need help downloading my annual premium tax certificate.',
  },
  {
    id: 'payment',
    titleKn: 'ಅಧಿಕೃತ ಪಾವತಿ & ಶೂನ್ಯ ನಗದು',
    titleEn: 'Official Payments & Zero Cash',
    docsKn: [
      'ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಮತ್ತು ನಿಗದಿತ ಪ್ರೀಮಿಯಂ ಮೊತ್ತ',
      'ಅಧಿಕೃತ SBI Life ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್ / UPI / ಡೆಬಿಟ್ ಕಾರ್ಡ್',
      'ಬ್ಯಾಂಕ್ ಶಾಖೆಯಲ್ಲಿ ಪಾವತಿಸಲು ಪ್ರೀಮಿಯಂ ನೋಟಿಸ್ ಸ್ಲಿಪ್',
      'ಸ್ವಯಂಚಾಲಿತ ಪಾವತಿಗೆ NACH / e-Mandate ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ',
    ],
    docsEn: [
      'Policy number and exact renewal premium due',
      'Official NetBanking, UPI, or Debit Card on sbilife.co.in or SBI YONO',
      'Physical renewal notice slip for official SBI / SBI Life branch cashiers',
      'NACH bank mandate details for automated recurring debit without lapse risk',
    ],
    processKn:
      'ಯಾವುದೇ ವ್ಯಕ್ತಿಗೆ ನಗದು ನೀಡಬೇಡಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ಖಾತೆಗೆ ಹಣ ವರ್ಗಾವಣೆ ಮಾಡಬೇಡಿ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಪಾವತಿಸಿದಾಗ ತಕ್ಷಣ ಕಂಪನಿಯ ಕಂಪ್ಯೂಟರ್ ರಶೀದಿ ದೊರೆಯುತ್ತದೆ.',
    processEn:
      'Zero cash policy: Never transfer funds to any individual’s UPI or personal account. Official payments generate immediate computer receipts issued by SBI Life.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಪಾಲಿಸಿ ಪ್ರೀಮಿಯಂ ಅನ್ನು ಅಧಿಕೃತವಾಗಿ ಆನ್‌ಲೈನ್ ಮೂಲಕ ಪಾವತಿಸುವ ವಿಧಾನ ತಿಳಿಸಿ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need the official link or guidelines to pay my renewal premium securely.',
  },
  {
    id: 'revival',
    titleKn: 'ಸ್ಥಗಿತ ಪಾಲಿಸಿ ಮರುಚಾಲನೆ',
    titleEn: 'Lapsed Policy Revival',
    docsKn: [
      'ಬಾಕಿ ಇರುವ ಎಲ್ಲಾ ಪ್ರೀಮಿಯಂ ಕಂತುಗಳು + ನಿಗದಿತ ದಂಡದ ಬಡ್ಡಿ',
      'ಉತ್ತಮ ಆರೋಗ್ಯದ ಸ್ವಯಂ ಘೋಷಣಾ ಪತ್ರ (Declaration of Good Health - DGH)',
      'ಪಾಲಿಸಿ ಲ್ಯಾಪ್ಸ್ ಆಗಿ ಹೆಚ್ಚು ಸಮಯವಾಗಿದ್ದರೆ ವೈದ್ಯಕೀಯ ತಪಾಸಣಾ ವರದಿ (ಕಂಪನಿಯ ಸೂಚನೆಯಂತೆ)',
    ],
    docsEn: [
      'Payment of all unpaid premium arrears with applicable late interest',
      'Declaration of Good Health (DGH) signed by Life Assured',
      'Medical examination report if required based on revival duration and sum at risk',
    ],
    processKn:
      'ಕಂಪನಿಯು ವರ್ಷದಲ್ಲಿ 2 ಬಾರಿ ವಿಶೇಷ ರಿಯಾಯಿತಿ ರಿವೈವಲ್ ಅಭಿಯಾನಗಳನ್ನು ನಡೆಸುತ್ತದೆ. ಆ ಸಮಯದಲ್ಲಿ ದಂಡದ ಬಡ್ಡಿಯಲ್ಲಿ 20%-30% ರಿಯಾಯಿತಿ ದೊರೆಯುತ್ತದೆ.',
    processEn:
      'SBI Life holds periodic revival campaigns offering 20%–30% concessions on late interest penalties. Full coverage resumes upon formal underwriter acceptance.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಸ್ಥಗಿತಗೊಂಡ (Lapsed) ಪಾಲಿಸಿಯನ್ನು ಮರುಚಾಲನೆ (Revive) ಮಾಡಲು ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I would like information regarding reviving my lapsed SBI Life policy.',
  },
  {
    id: 'claim',
    titleKn: 'ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥ ಸಹಾಯ',
    titleEn: 'Death & Maturity Claims',
    docsKn: [
      'ಮೂಲ ಪಾಲಿಸಿ ಬಾಂಡ್ ಪತ್ರ',
      'ಸ್ಥಳೀಯ ಪುರಸಭೆ / ಗ್ರಾಮ ಪಂಚಾಯತಿ ನೀಡಿದ ಅಧಿಕೃತ ಮರಣ ಪ್ರಮಾಣಪತ್ರ (ಡೆತ್ ಕ್ಲೈಮ್‌ಗೆ)',
      'ನಾಮಿನಿಯ ಕೆವೈಸಿ ದಾಖಲೆಗಳು (ಆಧಾರ್, ಪ್ಯಾನ್)',
      'ನಾಮಿನಿಯ ರದ್ದುಪಡಿಸಿದ ಚೆಕ್ (Cancelled Cheque) ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್',
      'ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಪಡೆದಿದ್ದರೆ ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ / ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು',
    ],
    docsEn: [
      'Original policy bond booklet',
      'Official Death Certificate issued by the competent municipal authority (for death claims)',
      'Nominee KYC documents (Aadhaar & PAN card)',
      'Bank passbook copy or cancelled cheque for direct NEFT settlement',
      'Hospital discharge summary and diagnostic records if illness occurred',
    ],
    processKn:
      'ಕ್ಲೈಮ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಶುಲ್ಕ ನೀಡುವ ಅಗತ್ಯವಿಲ್ಲ. ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅಧಿಕೃತ ಶಾಖೆಯ ಕ್ಲೈಮ್ ಡೆಸ್ಕ್‌ಗೆ ಸಲ್ಲಿಸಲು ಉಚಿತವಾಗಿ ಸಹಾಯ ಮಾಡುತ್ತಾರೆ.',
    processEn:
      'Zero fee or intermediary commission is ever charged for claim settlement. Sofia Rani provides dedicated roadmap coordination directly with the official branch.',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ಜೀವ ವಿಮಾ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು ಕುಟುಂಬದ ಪರವಾಗಿ ಸಹಾಯ ಕೋರುತ್ತೇನೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need guidance regarding filing a death claim for an existing SBI Life policy.',
  },
  {
    id: 'grievance',
    titleKn: 'ದೂರು ಪರಿಹಾರ & ಒಂಬುಡ್ಸ್‌ಮನ್',
    titleEn: 'Grievances & Ombudsman',
    docsKn: [
      'ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಮತ್ತು ದೂರಿನ ಪೂರ್ಣ ವಿವರ',
      'ಶಾಖೆಗೆ ಈ ಹಿಂದೆ ಸಲ್ಲಿಸಿದ ಪತ್ರ ಅಥವಾ ಟೋಕನ್ ಸ್ವೀಕೃತಿ ರಶೀದಿ',
      'ಕಂಪನಿಯಿಂದ ಬಂದಿರುವ ಲಿಖಿತ ಉತ್ತರ (ಇದ್ದರೆ)',
      'ದೂರಿಗೆ ಪೂರಕವಾದ ಪಾವತಿ ಅಥವಾ ದಾಖಲೆಗಳ ಪ್ರತಿಗಳು',
    ],
    docsEn: [
      'Policy Number and registered correspondence details',
      'Written chronology of grievance with previous branch token/acknowledgment',
      'Insurer response letters or rejection communication (if any)',
      'Supporting receipts, bank statements, or policy schedules',
    ],
    processKn:
      'ಹಂತ 1: ಶಾಖೆಯ ದೂರು ಪರಿಹಾರ ಅಧಿಕಾರಿ (GRO). ಹಂತ 2: ಕಾರ್ಪೊರೇಟ್ ಕಚೇರಿ (grievance@sbilife.co.in / 1800 267 9090). ಹಂತ 3: IRDAI ಭೀಮಾ ಭರೋಸಾ ಪೋರ್ಟಲ್ (bimabharosa.irdai.gov.in). ಹಂತ 4: ವಿಮಾ ಒಂಬುಡ್ಸ್‌ಮನ್ ಕಚೇರಿ, ಬೆಂಗಳೂರು (ಕರ್ನಾಟಕ ವ್ಯಾಪ್ತಿ).',
    processEn:
      'Tier 1: Branch Grievance Redressal Officer. Tier 2: SBI Life Head Office GRO (grievance@sbilife.co.in / 1800 267 9090). Tier 3: IRDAI Bima Bharosa Portal (bimabharosa.irdai.gov.in). Tier 4: Office of the Insurance Ombudsman, Bengaluru (Karnataka jurisdiction).',
    prefilledMsgKn: 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ಅವರೇ, ನನ್ನ ಪಾಲಿಸಿಯ ಸೇವಾ ದೂರಿನ ಪರಿಹಾರಕ್ಕಾಗಿ ಅಧಿಕೃತ ಹಂತಗಳ ಮಾಹಿತಿ ಬೇಕಾಗಿದೆ.',
    prefilledMsgEn: 'Hello Sofia Rani, I need assistance understanding the grievance redressal escalation matrix.',
  },
];

export const CustomerHelpView: React.FC<Props> = ({ language, onNavigate }) => {
  const isKn = language === 'kn';
  const [activeCategory, setActiveCategory] = useState<'claim_guide' | 'new_policy' | 'existing_policy'>('claim_guide');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('nominee');

  const activeService =
    SERVICE_GUIDES.find((s) => s.id === selectedServiceId) || SERVICE_GUIDES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          {isKn ? 'ಗ್ರಾಹಕ ಬೆಂಬಲ & ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶಿ' : 'Customer Support & Claim Roadmap'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಗ್ರಾಹಕ ನೆರವು & ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥ ಕೇಂದ್ರ' : 'Customer Help & Claim Settlement Hub'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isKn
            ? 'ವಿಮಾ ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥದ ಪಾರದರ್ಶಕ ಹಂತಗಳು, ಹೊಸ ಪಾಲಿಸಿಯ ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಅಥವಾ ಹಾಲಿ ಪಾಲಿಸಿಯ ಸೇವೆಗಳ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.'
            : 'De-mystifying the claim settlement journey for beneficiaries, new policy document preparation, and official servicing roadmap.'}
        </p>
      </div>

      {/* Category Toggle: Claim Guide vs New Policy Documents vs Existing Servicing */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-xs max-w-2xl w-full">
          <button
            type="button"
            onClick={() => setActiveCategory('claim_guide')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'claim_guide'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span className="truncate">{isKn ? 'ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥ ಗೈಡ್' : 'Claim Settlement Guide'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('new_policy')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'new_policy'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span className="truncate">{isKn ? 'ಹೊಸ ಪಾಲಿಸಿ ದಾಖಲೆಗಳು' : 'New Policy Checklist'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('existing_policy')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'existing_policy'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="truncate">{isKn ? 'ಹಾಲಿ ಸೇವೆಗಳು & ದೂರು' : 'Policy Servicing'}</span>
          </button>
        </div>
      </div>

      {/* Conditional Content: Step-by-Step Claim Settlement Guide */}
      {activeCategory === 'claim_guide' && (
        <div className="space-y-6">
          <ClaimSettlementGuide
            language={language}
            onBookAssistance={() => onNavigate('book')}
          />

          {/* Quick jump to new policy checklist or other servicing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3 text-xs">
              <div className="text-slate-600">
                <span className="font-bold text-slate-800 block text-xs">
                  {isKn ? 'ಹೊಸ ಜೀವ ವಿಮೆಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿದ್ದೀರಾ?' : 'Applying for a new life insurance policy?'}
                </span>
                <span className="text-[11px]">
                  {isKn
                    ? 'ವೇತನದಾರರು, ವ್ಯಾಪಾರ ಹಾಗೂ ಕೃಷಿ ಕುಟುಂಬಗಳ ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ನೋಡಿ.'
                    : 'Check the interactive documents checklist tailored by profession.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCategory('new_policy')}
                className="py-2 px-3 bg-white border border-slate-200 text-teal-800 hover:bg-slate-100 rounded-xl font-bold self-start transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <span>{isKn ? 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ ನೋಡಿ' : 'View New Policy Checklist'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3 text-xs">
              <div className="text-slate-600">
                <span className="font-bold text-slate-800 block text-xs">
                  {isKn ? 'ನಾಮಿನಿ, ವಿಳಾಸ ಅಥವಾ ಪ್ರೀಮಿಯಂ ರಶೀದಿ ಸಹಾಯವೇ?' : 'Need nominee update, address change, or receipt?'}
                </span>
                <span className="text-[11px]">
                  {isKn
                    ? 'ಹಾಲಿ ಪಾಲಿಸಿದಾರರ ಸೇವಾ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಒಂಬುಡ್ಸ್‌ಮನ್ ದೂರು ಹಂತಗಳನ್ನು ನೋಡಿ.'
                    : 'Access step-by-step guides for regular policy servicing and grievances.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCategory('existing_policy')}
                className="py-2 px-3 bg-white border border-slate-200 text-teal-800 hover:bg-slate-100 rounded-xl font-bold self-start transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <span>{isKn ? 'ಹಾಲಿ ಸೇವೆಗಳನ್ನು ನೋಡಿ' : 'View Policy Servicing'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Content: New Policy Checklist */}
      {activeCategory === 'new_policy' && (
        <div className="space-y-6">
          <NewPolicyDocumentsChecklist
            language={language}
            onBookAssistance={() => onNavigate('book')}
          />

          {/* Quick jump to existing policyholder services */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-600 text-center sm:text-left">
              <span className="font-bold text-slate-800 block">
                {isKn ? 'ಈಗಾಗಲೇ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಪಾಲಿಸಿ ಹೊಂದಿದ್ದೀರಾ?' : 'Already have an existing SBI Life policy?'}
              </span>
              <span>
                {isKn
                  ? 'ನಾಮಿನಿ ಬದಲಾವಣೆ, ವಿಳಾಸ ನವೀಕರಣ, ರಶೀದಿ ಡೌನ್‌ಲೋಡ್ ಅಥವಾ ಮರುಚಾಲನೆಗೆ ಮಾರ್ಗದರ್ಶನ ನೋಡಿ.'
                  : 'Access step-by-step guides for nominee change, address update, premium receipts, and revival.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('existing_policy')}
              className="py-2 px-4 bg-white border border-slate-200 text-teal-800 hover:bg-slate-100 rounded-xl font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{isKn ? 'ಹಾಲಿ ಪಾಲಿಸಿ ಸೇವೆಗಳನ್ನು ನೋಡಿ' : 'View Existing Policy Servicing'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Conditional Content: Existing Policy Servicing */}
      {activeCategory === 'existing_policy' && (
        <div className="space-y-10">
          {/* Quick banner to switch to new policy documents */}
          <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-950">
            <div className="text-center sm:text-left">
              <span className="font-bold text-teal-900 block">
                {isKn ? 'ಹೊಸ ಜೀವ ವಿಮೆಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿದ್ದೀರಾ?' : 'Applying for a new life insurance policy?'}
              </span>
              <span className="text-teal-800/90">
                {isKn
                  ? 'ನಿಮ್ಮ ವೃತ್ತಿಯ ಪ್ರಕಾರ (ವೇತನದಾರರು, ವ್ಯಾಪಾರ, ಕೃಷಿ) ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.'
                  : 'Check the interactive documents checklist tailored to salaried employees, business, or agricultural families.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('new_policy')}
              className="py-2 px-4 bg-teal-800 text-white hover:bg-teal-900 rounded-xl font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{isKn ? 'ಹೊಸ ಪಾಲಿಸಿ ದಾಖಲೆಗಳ ಪಟ್ಟಿ' : 'Check Required Documents'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Service Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {SERVICE_GUIDES.map((s) => {
          const isActive = selectedServiceId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedServiceId(s.id)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-700 bg-white/70 hover:bg-white hover:text-slate-900'
              }`}
            >
              {isKn ? s.titleKn : s.titleEn}
            </button>
          );
        })}
      </div>

      {/* Dynamic Service Guidance Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
            {isKn ? 'ಸೇವಾ ಮಾರ್ಗದರ್ಶಿ' : 'Interactive Service Guide'}
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            {isKn ? activeService.titleKn : activeService.titleEn}
          </h2>
        </div>

        {activeService.id === 'claim' && (
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-950">
            <div className="flex items-center gap-2.5">
              <HeartHandshake className="w-5 h-5 text-teal-700 shrink-0" />
              <div>
                <span className="font-bold text-teal-900 block">
                  {isKn ? 'ಪೂರ್ಣ ಹಂತ-ಹಂತದ ಕ್ಲೈಮ್ ಗೈಡ್ ಲಭ್ಯವಿದೆ' : 'Interactive Step-by-Step Claim Guide Available'}
                </span>
                <span className="text-teal-800/90">
                  {isKn
                    ? 'ನಾಮಿನಿ ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ, IRDAI ಕಾಲಮಿತಿ ಮತ್ತು ಹಂತಗಳನ್ನು ದೃಶ್ಯೀಕರಿಸಿ.'
                    : 'View dynamic timeline stepper, IRDAI SLA deadlines, and live document checklist.'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('claim_guide')}
              className="py-2 px-4 bg-teal-800 text-white hover:bg-teal-900 rounded-xl font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>{isKn ? 'ಪೂರ್ಣ ಕ್ಲೈಮ್ ಗೈಡ್ ತೆರೆಯಿರಿ' : 'Open Complete Guide'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Required Documents */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ:' : 'Checklist of Required Documents:'}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {(isKn ? activeService.docsKn : activeService.docsEn).map((doc, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Process */}
        <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 text-xs text-teal-950 space-y-1">
          <h4 className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ಅಧಿಕೃತ ಪ್ರಕ್ರಿಯೆ & ಕಾಲಮಿತಿ:' : 'Official Branch Process:'}</span>
          </h4>
          <p className="leading-relaxed">
            {isKn ? activeService.processKn : activeService.processEn}
          </p>
        </div>

        {/* Direct Action */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              isKn ? activeService.prefilledMsgKn : activeService.prefilledMsgEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಈ ವಿಷಯ ಚರ್ಚಿಸಿ' : 'Discuss This Service via WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={`tel:${ADVISOR_CONFIG.contact.phone}`}
            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-teal-800" />
            <span>{isKn ? 'ಕರೆ ಮಾಡಿ' : 'Call Sofia'}</span>
          </a>
        </div>
      </div>

      {/* Free Assistance Notice */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{isKn ? 'ಗಮನಿಸಿ:' : 'Policyholder Advisory Protocol:'}</strong>{' '}
          {isKn
            ? 'ಹಾಲಿ ಗ್ರಾಹಕರ ಸೇವಾ ಮಾರ್ಗದರ್ಶನ ಸಂಪೂರ್ಣ ಉಚಿತವಾಗಿರುತ್ತದೆ. ಯಾವುದೇ ಅಧಿಕೃತ ಬದಲಾವಣೆಗಳನ್ನು ಎಸ್.ಬಿ.ಐ ಲೈಫ್‌ನ ಅಧಿಕೃತ ವ್ಯವಸ್ಥೆಯ ಮೂಲಕವೇ ಅಂತಿಮಗೊಳಿಸಲಾಗುತ್ತದೆ. ಯಾರೊಂದಿಗೂ ಒಟಿಪಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ರಹಸ್ಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.'
            : 'All policy servicing consultations are offered free of charge. Official contract modifications are finalized exclusively into certified SBI Life branch and portal systems. Never disclose OTP or passwords.'}
        </p>
      </div>

      {/* Statutory Escalation Matrix Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <Scale className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಕಾನೂನುಬದ್ಧ ದೂರು ನಿವಾರಣಾ ವ್ಯವಸ್ಥೆ' : 'Statutory Grievance Redressal Escalation Matrix'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          {isKn ? 'ಗ್ರಾಹಕರ ಹಕ್ಕುಗಳು ಮತ್ತು ದೂರು ಪರಿಹಾರ ಹಂತಗಳು' : 'Policyholder Rights & Statutory Escalation Protocol'}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {isKn
            ? 'ವಿಮಾ ನಿಯಂತ್ರಣ ಪ್ರಾಧಿಕಾರ (IRDAI) ನಿಯಮಾವಳಿಗಳ ಅನ್ವಯ ಪ್ರತಿಯೊಬ್ಬ ಪಾಲಿಸಿದಾರರಿಗೂ ನ್ಯಾಯೋಚಿತ ಸೇವೆ ಪಡೆಯುವ ಹಕ್ಕಿದೆ. ಒಂದು ವೇಳೆ ನಿಮ್ಮ ಪಾಲಿಸಿಯ ಕ್ಲೈಮ್ ಅಥವಾ ಸೇವೆಯಲ್ಲಿ ಅತೃಪ್ತಿ ಉಂಟಾದರೆ ಈ ಕೆಳಗಿನ ಕ್ರಮಾನುಗತ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ:'
            : 'Under IRDAI Protection of Policyholders’ Interests regulations, customers have defined escalation tiers to resolve disputes or delays:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block text-[12px]">
              {isKn ? 'ಹಂತ 1: ಶಾಖಾ ದೂರು ಅಧಿಕಾರಿ (Branch GRO)' : 'Level 1: Branch Grievance Redressal Officer'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {isKn
                ? 'ಗಂಗಾವತಿ ಅಥವಾ ಕೊಪ್ಪಳ ಶಾಖಾ ವ್ಯವಸ್ಥಾಪಕರಿಗೆ ಲಿಖಿತ ದೂರು ಸಲ್ಲಿಸಿ ಟೋಕನ್ ಸ್ವೀಕೃತಿ ರಶೀದಿ ಪಡೆಯಿರಿ. ಕಾಲಮಿತಿ: 15 ದಿನಗಳು.'
                : 'Submit physical grievance to the Gangavathi/Koppal Branch Manager with written acknowledgment. Resolution SLA: 15 days.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block text-[12px]">
              {isKn ? 'ಹಂತ 2: ಪ್ರಧಾನ ಕಚೇರಿ (SBI Life Corporate GRO)' : 'Level 2: SBI Life Head Office GRO'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {isKn
                ? 'ಇಮೇಲ್: grievance@sbilife.co.in | ಉಚಿತ ಸಹಾಯವಾಣಿ: 1800 267 9090 (ಬೆಳಗ್ಗೆ 9:00 ರಿಂದ ರಾತ್ರಿ 9:00 ರವರೆಗೆ).'
                : 'Email: grievance@sbilife.co.in | Toll-Free: 1800 267 9090 (9 AM to 9 PM daily). Dedicated corporate grievance cell.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block text-[12px]">
              {isKn ? 'ಹಂತ 3: IRDAI ಭೀಮಾ ಭರೋಸಾ ಪೋರ್ಟಲ್' : 'Level 3: IRDAI Bima Bharosa Portal'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {isKn
                ? 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್: bimabharosa.irdai.gov.in | ರಾಷ್ಟ್ರೀಯ ಟೋಲ್-ಫ್ರೀ: 155255 / 1800 4254 732.'
                : 'Online: bimabharosa.irdai.gov.in | National Toll-Free: 155255. Centralized regulatory grievance monitoring.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block text-[12px]">
              {isKn ? 'ಹಂತ 4: ವಿಮಾ ಒಂಬುಡ್ಸ್‌ಮನ್ (ಬೆಂಗಳೂರು)' : 'Level 4: Insurance Ombudsman (Bengaluru)'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {isKn
                ? 'ಕರ್ನಾಟಕ ವ್ಯಾಪ್ತಿ: ಜೀವನ್ ಸೌಧ ಕಟ್ಟಡ, ಬೆಂಗಳೂರು. ವಿಮಾ ಕ್ಲೈಮ್ ನಿರಾಕರಣೆ ಅಥವಾ ತಡವಾದಲ್ಲಿ ಉಚಿತ ಅರೆ-ನ್ಯಾಯಾಂಗ ಇತ್ಯರ್ಥ.'
                : 'Jurisdiction for Karnataka: Jeevan Soudha Building, Bengaluru. Free quasi-judicial dispute resolution for repudiated claims.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )}
  </div>
);
};
