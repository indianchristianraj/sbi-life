import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
  Briefcase,
  Tractor,
  Download,
  Share2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Check,
  Printer,
} from 'lucide-react';
import { Language } from '../types';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface NewPolicyDocumentsChecklistProps {
  language: Language;
  className?: string;
  onBookAssistance?: () => void;
}

type ApplicantType = 'salaried' | 'business' | 'agriculture';

interface DocumentItem {
  id: string;
  category: string;
  categoryKn: string;
  titleEn: string;
  titleKn: string;
  descriptionEn: string;
  descriptionKn: string;
  isRequired: boolean;
  appliesTo: ApplicantType[];
  tipsEn?: string;
  tipsKn?: string;
}

const DOCUMENT_ITEMS: DocumentItem[] = [
  // 1. Identity Proof
  {
    id: 'pan',
    category: 'Identity Proof',
    categoryKn: 'ಗುರುತಿನ ಪುರಾವೆ (Photo ID)',
    titleEn: 'PAN Card (Permanent Account Number)',
    titleKn: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ (PAN Card)',
    descriptionEn: 'Mandatory for all life insurance proposals under IRDAI and IT guidelines. Ensures tax exemption linking under Section 10(10D).',
    descriptionKn: 'ಆದಾಯ ತೆರಿಗೆ ಮತ್ತು IRDAI ನಿಯಮಾವಳಿಗಳ ಪ್ರಕಾರ ಎಲ್ಲಾ ಜೀವ ವಿಮಾ ಪ್ರಸ್ತಾವನೆಗಳಿಗೂ ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಕಡ್ಡಾಯ.',
    isRequired: true,
    appliesTo: ['salaried', 'business', 'agriculture'],
    tipsEn: 'Ensure name matches with Aadhaar card and bank account.',
    tipsKn: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ಹೆಸರು ಆಧಾರ್ ಕಾರ್ಡ್‌ಗೆ ಸರಿಯಾಗಿ ತಾಳೆಯಾಗಬೇಕು.',
  },
  {
    id: 'aadhaar',
    category: 'Identity & Address Proof',
    categoryKn: 'ವಿಳಾಸ ಮತ್ತು ಗುರುತಿನ ಪುರಾವೆ',
    titleEn: 'Aadhaar Card (UIDAI)',
    titleKn: 'ಆಧಾರ್ ಕಾರ್ಡ್',
    descriptionEn: 'Primary e-KYC document. Mobile number linked with Aadhaar facilitates instant paperless OTP verification.',
    descriptionKn: 'ಪ್ರಾಥಮಿಕ ಇ-ಕೆವೈಸಿ ದಾಖಲೆ. ಆಧಾರ್‌ಗೆ ಲಿಂಕ್ ಆಗಿರುವ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಒಟಿಪಿ ಬರುವುದರಿಂದ ತ್ವರಿತವಾಗಿ ಅನುಮೋದನೆ ದೊರೆಯುತ್ತದೆ.',
    isRequired: true,
    appliesTo: ['salaried', 'business', 'agriculture'],
    tipsEn: 'Keep registered mobile phone handy to receive e-KYC OTP.',
    tipsKn: 'ಇ-ಕೆವೈಸಿ ಒಟಿಪಿ ಪಡೆಯಲು ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಫೋನ್ ಲಭ್ಯವಿರಲಿ.',
  },
  // 2. Age Proof
  {
    id: 'age_proof',
    category: 'Age Proof',
    categoryKn: 'ಜನ್ಮ ದಿನಾಂಕ ಪುರಾವೆ',
    titleEn: 'Standard Age Proof (SSLC / 10th Marks Card or Passport)',
    titleKn: 'ಅಧಿಕೃತ ಜನ್ಮ ದಿನಾಂಕ ಪುರಾವೆ (SSLC ಅಂಕಪಟ್ಟಿ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ)',
    descriptionEn: 'Critical for mortality risk calculation. 10th Marks card, Passport, or Municipal Birth Certificate accepted as standard proof.',
    descriptionKn: 'ನಿಖರ ವಯಸ್ಸು ಮತ್ತು ಪ್ರೀಮಿಯಂ ದರ ಲೆಕ್ಕಾಚಾರಕ್ಕೆ SSLC ಅಂಕಪಟ್ಟಿ, ಪಾಸ್‌ಪೋರ್ಟ್ ಅಥವಾ ಪುರಸಭೆಯ ಜನನ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯ.',
    isRequired: true,
    appliesTo: ['salaried', 'business', 'agriculture'],
    tipsEn: 'Non-standard age proof (e.g. school transfer certificate) may attract additional underwriting review.',
    tipsKn: 'ಅಧಿಕೃತ ಅಂಕಪಟ್ಟಿ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರವಿದ್ದರೆ ಯಾವುದೇ ತೊಡಕಿಲ್ಲದೆ ಪಾಲಿಸಿ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ.',
  },
  // 3. Bank Verification
  {
    id: 'bank_proof',
    category: 'Bank Account Verification',
    categoryKn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ (Direct Credit)',
    titleEn: 'Cancelled Cheque or Bank Passbook Copy',
    titleKn: 'ರದ್ದುಪಡಿಸಿದ ಚೆಕ್ (Cancelled Cheque) ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
    descriptionEn: 'Required for automated direct NEFT settlement of claim/maturity proceeds and NACH auto-debit setup.',
    descriptionKn: 'ಕ್ಲೈಮ್ ಅಥವಾ ಮೆಚುರಿಟಿ ಮೊತ್ತ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗಲು ಹಾಗೂ ವಾರ್ಷಿಕ ಕಂತುಗಳ ಸ್ವಯಂಚಾಲಿತ ಪಾವತಿಗೆ (NACH) ಅಗತ್ಯ.',
    isRequired: true,
    appliesTo: ['salaried', 'business', 'agriculture'],
    tipsEn: 'Account holder’s printed name, account number, and IFSC code must be clearly legible.',
    tipsKn: 'ಖಾತೆದಾರರ ಮುದ್ರಿತ ಹೆಸರು, ಖಾತೆ ಸಂಖ್ಯೆ ಮತ್ತು IFSC ಕೋಡ್ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸುತ್ತಿರಬೇಕು.',
  },
  // 4. Income Proof - Salaried
  {
    id: 'salaried_income',
    category: 'Income Proof',
    categoryKn: 'ಆದಾಯದ ಪುರಾವೆ (ಉದ್ಯೋಗಿಗಳಿಗೆ)',
    titleEn: 'Latest 3 Months Salary Slips & Form 16',
    titleKn: 'ಕಳೆದ 3 ತಿಂಗಳ ವೇತನ ಚೀಟಿ (Salary Slips) ಮತ್ತು ಫಾರ್ಮ್ 16',
    descriptionEn: 'Required for pure term cover exceeding ₹25 Lakhs to determine permissible financial underwriting eligibility (Human Life Value).',
    descriptionKn: 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್‌ನಲ್ಲಿ ₹25 ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚಿನ ದೊಡ್ಡ ರಕ್ಷಣಾ ಕವರ್ ಪಡೆಯಲು ಆದಾಯ ಅರ್ಹತೆಯನ್ನು ಸಾಬೀತುಪಡಿಸಲು ಅಗತ್ಯ.',
    isRequired: false,
    appliesTo: ['salaried'],
    tipsEn: 'Bank statement reflecting salary credits can serve as supplementary support.',
    tipsKn: 'ವೇತನ ಜಮೆಯಾಗುವ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಕೂಡ ಉಪಯುಕ್ತ.',
  },
  // 5. Income Proof - Business / Self-Employed
  {
    id: 'business_income',
    category: 'Income Proof',
    categoryKn: 'ಆದಾಯದ ಪುರಾವೆ (ವ್ಯಾಪಾರ / ಸ್ವಉದ್ಯೋಗಿಗಳಿಗೆ)',
    titleEn: 'Latest 2-3 Years ITR with Computation of Income & Audit Report',
    titleKn: 'ಕಳೆದ 2-3 ವರ್ಷಗಳ ಆದಾಯ ತೆರಿಗೆ ರಿಟರ್ನ್ಸ್ (ITR) ಮತ್ತು ಕಂಪ್ಯೂಟೇಶನ್ ಪ್ರತಿ',
    descriptionEn: 'Demonstrates net business income, business continuity, and financial capacity for higher sum assured term coverage.',
    descriptionKn: 'ವ್ಯಾಪಾರಸ್ಥರು ಮತ್ತು ಸ್ವಉದ್ಯೋಗಿಗಳು ತಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತ ಟರ್ಮ್ ಕವರ್ ಪಡೆಯಲು ಐಟಿಆರ್ ಪ್ರತಿ ಅಗತ್ಯ.',
    isRequired: false,
    appliesTo: ['business'],
    tipsEn: 'Form 26AS or GST returns may also be requested for high sum assured proposals.',
    tipsKn: 'ದೊಡ್ಡ ಮೊತ್ತದ ವಿಮೆಗೆ ಫಾರ್ಮ್ 26AS ಅಥವಾ ಜಿಎಸ್‌ಟಿ ರಿಟರ್ನ್ಸ್ ನೆರವಾಗುತ್ತದೆ.',
  },
  // 6. Income Proof - Farmers / Agriculture (Gangavathi & Koppal basin)
  {
    id: 'agri_income',
    category: 'Agricultural Income Proof',
    categoryKn: 'ಕೃಷಿ ಆದಾಯದ ಪುರಾವೆ (ರೈತ ಕುಟುಂಬಗಳಿಗೆ)',
    titleEn: 'Land Records (Pahani / RTC), Sugar/Paddy Factory Bills & Tahsildar Income Certificate',
    titleKn: 'ಜಮೀನಿನ ಪಹಣಿ (RTC), ಭತ್ತ / ಕಬ್ಬು ಮಾರಾಟದ ಬಿಲ್‌ಗಳು & ತಹಶೀಲ್ದಾರ್ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ',
    descriptionEn: 'Specially structured for farming families across Gangavathi, Karatagi, and Tungabhadra irrigation belt to substantiate agricultural landholding and crop yields.',
    descriptionKn: 'ಗಂಗಾವತಿ, ಕಾರಟಗಿ ಹಾಗೂ ಕೊಪ್ಪಳ ಭಾಗದ ರೈತ ಕುಟುಂಬಗಳು ತಮ್ಮ ಜಮೀನಿನ ಪಹಣಿ ಮತ್ತು ಭತ್ತ/ಬೆಳೆ ಮಾರಾಟದ ರಶೀದಿಗಳ ಮೂಲಕ ರಕ್ಷಣಾ ಪಾಲಿಸಿ ಪಡೆಯಬಹುದು.',
    isRequired: false,
    appliesTo: ['agriculture'],
    tipsEn: 'Irrigated wetland (Thari) landholdings provide strong financial underwriting eligibility.',
    tipsKn: 'ನೀರಾವರಿ ಜಮೀನಿನ ಪಹಣಿ ಮತ್ತು ಖಾತೆಯ ದಾಖಲೆಗಳು ಉತ್ತಮ ರಕ್ಷಣಾ ಕವರ್ ಪಡೆಯಲು ಸಹಕಾರಿ.',
  },
  // 7. Photographs
  {
    id: 'photos',
    category: 'Photograph',
    categoryKn: 'ಭಾವಚಿತ್ರ',
    titleEn: '2 Recent Passport-Size Photographs',
    titleKn: 'ಇತ್ತೀಚಿನ 2 ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು',
    descriptionEn: 'Color photographs taken with clear background. Physical prints or high-resolution digital copy for digital proposal login.',
    descriptionKn: 'ಸ್ಪಷ್ಟ ಹಿನ್ನೆಲೆಯುಳ್ಳ ಇತ್ತೀಚಿನ ಬಣ್ಣದ ಭಾವಚಿತ್ರಗಳು. ಡಿಜಿಟಲ್ ಪ್ರಸ್ತಾವನೆಗೂ ಇದು ಅಗತ್ಯ.',
    isRequired: true,
    appliesTo: ['salaried', 'business', 'agriculture'],
  },
];

export const NewPolicyDocumentsChecklist: React.FC<NewPolicyDocumentsChecklistProps> = ({
  language,
  className = '',
  onBookAssistance,
}) => {
  const isKn = language === 'kn';
  const [applicantType, setApplicantType] = useState<ApplicantType>('salaried');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Filter items matching active applicant profile
  const applicableItems = DOCUMENT_ITEMS.filter((item) =>
    item.appliesTo.includes(applicantType)
  );

  const totalCount = applicableItems.length;
  const checkedCount = applicableItems.filter((item) => checkedItems[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAll = () => {
    const allChecked: Record<string, boolean> = {};
    applicableItems.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedItems(allChecked);
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const handleShareOnWhatsApp = () => {
    const checkedTitles = applicableItems
      .filter((i) => checkedItems[i.id])
      .map((i) => `✓ ${isKn ? i.titleKn : i.titleEn}`)
      .join('\n');

    const pendingTitles = applicableItems
      .filter((i) => !checkedItems[i.id])
      .map((i) => `⏳ ${isKn ? i.titleKn : i.titleEn}`)
      .join('\n');

    const text = isKn
      ? `ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, ನನ್ನ ಹೊಸ ಜೀವ ವಿಮಾ ಪಾಲಿಸಿಗೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳ ಸಿದ್ಧತೆಯ ವಿವರ:\n\n*ಸಿದ್ಧವಿರುವ ದಾಖಲೆಗಳು (${checkedCount}/${totalCount}):*\n${checkedTitles || 'ಯಾವುದೂ ಇಲ್ಲ'}\n\n*ಸಿದ್ಧಪಡಿಸಬೇಕಾದ ದಾಖಲೆಗಳು:*\n${pendingTitles || 'ಎಲ್ಲವೂ ಸಿದ್ಧವಾಗಿವೆ'}\n\nದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮಾರ್ಗದರ್ಶನ ನೀಡಿ.`
      : `Hello Sofia Rani, here is my document readiness checklist for applying for a new SBI Life policy:\n\n*Ready Documents (${checkedCount}/${totalCount}):*\n${checkedTitles || 'None yet'}\n\n*Pending Documents:*\n${pendingTitles || 'All documents ready'}\n\nKindly guide me through the next proposal submission step.`;

    window.open(
      `https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
            <FileCheck className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ಹೊಸ ಪಾಲಿಸಿ ದಾಖಲೆಗಳ ಸಿದ್ಧತೆ' : 'New Policy Application Checklist'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isKn ? 'ಹೊಸ ಪಾಲಿಸಿಗೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳ ಪಟ್ಟಿ' : 'Documents Required for New Life Insurance Policy'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isKn
              ? 'ನಿಮ್ಮ ವೃತ್ತಿಯ ಪ್ರಕಾರ ಪರಿಶೀಲಿಸಿ. ದಾಖಲೆಗಳು ಸರಿಯಾಗಿದ್ದರೆ ಯಾವುದೇ ತಡವಿಲ್ಲದೆ 24-48 ಗಂಟೆಗಳಲ್ಲಿ ಪಾಲಿಸಿ ಅನುಮೋದನೆ ದೊರೆಯುತ್ತದೆ.'
              : 'Interactive readiness checklist. Having verified documents prepared ensures swift underwriting and instant policy issuance.'}
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:min-w-[200px] text-center self-start sm:self-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isKn ? 'ದಾಖಲೆ ಸಿದ್ಧತೆಯ ಸ್ಥಿತಿ' : 'Readiness Progress'}
          </span>
          <div className="flex items-center justify-center gap-2">
            <div className="w-full max-w-[100px] bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-teal-900 tabular-nums">
              {progressPercent}%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {checkedCount} / {totalCount} {isKn ? 'ದಾಖಲೆಗಳು ಸಿದ್ಧ' : 'documents ready'}
          </span>
        </div>
      </div>

      {/* Applicant Profile Selector Tabs */}
      <div>
        <span className="block text-xs font-semibold text-slate-700 mb-2">
          {isKn ? 'ನಿಮ್ಮ ವೃತ್ತಿ / ಆದಾಯದ ಮೂಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select Your Primary Income Profile:'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setApplicantType('salaried')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              applicantType === 'salaried'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              applicantType === 'salaried' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ವೇತನ ಪಡೆಯುವ ನೌಕರರು' : 'Salaried Employees'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ಸರ್ಕಾರಿ / ಖಾಸಗಿ ಉದ್ಯೋಗಿಗಳು' : 'Govt / Private Sector'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setApplicantType('business')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              applicantType === 'business'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              applicantType === 'business' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ವ್ಯಾಪಾರ & ಸ್ವಉದ್ಯೋಗ' : 'Business & Self-Employed'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ವರ್ತಕರು, ಅಂಗಡಿ ಮಾಲೀಕರು' : 'Traders, Professionals, MSME'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setApplicantType('agriculture')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              applicantType === 'agriculture'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              applicantType === 'agriculture' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              <Tractor className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ರೈತರು & ಕೃಷಿಕ ಕುಟುಂಬಗಳು' : 'Agricultural Families'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ಗಂಗಾವತಿ, ಕೊಪ್ಪಳ ಭಾಗದ ರೈತರು' : 'Landholders & Paddy/Cotton Farmers'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Checklist Actions Bar */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="font-semibold text-slate-700">
          {isKn ? 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳನ್ನು ಗುರುತು ಮಾಡಿ (Check):' : 'Tick off documents as you prepare them:'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-[11px] font-medium text-teal-800 hover:text-teal-950 cursor-pointer"
          >
            {isKn ? 'ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ' : 'Select All'}
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={resetAll}
            className="text-[11px] font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            {isKn ? 'ಮರುಹೊಂದಿಸಿ' : 'Clear'}
          </button>
        </div>
      </div>

      {/* Checklist Items Grid */}
      <div className="space-y-3">
        {applicableItems.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300/40'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Checkbox indicator */}
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked
                    ? 'bg-emerald-700 text-white'
                    : 'border-2 border-slate-300 bg-white'
                }`}
              >
                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
              </div>

              {/* Item Content */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                    {isKn ? item.categoryKn : item.category}
                  </span>
                  {item.isRequired && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      {isKn ? 'ಕಡ್ಡಾಯ' : 'Mandatory'}
                    </span>
                  )}
                  <h3 className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                    {isKn ? item.titleKn : item.titleEn}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isKn ? item.descriptionKn : item.descriptionEn}
                </p>

                {(item.tipsEn || item.tipsKn) && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                    <span className="font-semibold text-teal-800">💡 {isKn ? 'ಸೂಚನೆ:' : 'Tip:'}</span>
                    <span>{isKn ? item.tipsKn : item.tipsEn}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Zero-Cash and Security Guidelines */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-900">
            {isKn ? 'ಪ್ರಮುಖ ಭದ್ರತಾ ನಿಯಮಗಳು (Zero Cash & Privacy Policy):' : 'Mandatory Customer Protection Rules:'}
          </strong>
          <p className="text-amber-800/90 leading-relaxed text-[11px]">
            {isKn
              ? '1. ಸ್ವಯಂ ಸಹಿ ಮಾಡಿದ (Self-attested) ನಕಲು ಪ್ರತಿಗಳನ್ನು ಮಾತ್ರ ನೀಡಿ. ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಯಾರ ಬಳಿಯೂ ಬಿಡಬೇಡಿ.\n2. ಯಾವುದೇ ವ್ಯಕ್ತಿಗೆ ನಗದು ಅಥವಾ ವೈಯಕ್ತಿಕ UPI ಗೆ ಪ್ರೀಮಿಯಂ ಹಣ ನೀಡಬೇಡಿ. ಎಲ್ಲಾ ಪ್ರೀಮಿಯಂ ಅಧಿಕೃತ SBI Life ರಶೀದಿಯೊಂದಿಗೆ ಮಾತ್ರ ಪಾವತಿಯಾಗಬೇಕು.\n3. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಅಥವಾ ಗೌಪ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.'
              : '1. Submit only self-attested copies; never surrender your original documents to anyone.\n2. Zero Cash Policy: Never transfer premium funds to any individual’s personal account or UPI. Remit exclusively through certified SBI Life banking channels with official computer receipts.\n3. Never disclose OTPs or banking passwords.'}
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons: WhatsApp Share & Book Assistance */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleShareOnWhatsApp}
          className="w-full sm:flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>{isKn ? 'ದಾಖಲೆಗಳ ಪಟ್ಟಿಯನ್ನು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ' : 'Send Checklist to Sofia on WhatsApp'}</span>
        </button>

        {onBookAssistance && (
          <button
            type="button"
            onClick={onBookAssistance}
            className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <span>{isKn ? 'ದಾಖಲೆ ಪರಿಶೀಲನೆಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book In-Person Document Review'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewPolicyDocumentsChecklist;
