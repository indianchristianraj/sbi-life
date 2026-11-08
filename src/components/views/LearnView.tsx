import React, { useState } from 'react';
import { BookOpen, Video, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Clock, Play, Sparkles, BookMarked, HelpCircle } from 'lucide-react';
import { Language, EducationalArticle, PublicRoute } from '../../types';
import { PlanTypeComparison } from '../tools/PlanTypeComparison';
import { FinancialLiteracyGlossary } from '../FinancialLiteracyGlossary';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

interface EducationalVideo {
  id: string;
  titleKn: string;
  titleEn: string;
  duration: string;
  category: string;
  summaryKn: string;
  summaryEn: string;
  keyPointsKn: string[];
  keyPointsEn: string[];
  reviewedDate: string;
}

const ARTICLES_DATA: EducationalArticle[] = [
  {
    id: 'art-1',
    category: 'family',
    titleKn: 'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಪಾಲಿಸಿಯಲ್ಲಿ ನಾಮಿನಿ ಆಯ್ಕೆ ಮಾಡುವಾಗ ಮಾಡುವ 3 ತಪ್ಪುಗಳು',
    titleEn: '3 Critical Mistakes to Avoid When Registering Your Life Insurance Nominee',
    summaryKn: 'ನಾಮಿನಿ ಹೆಸರು ತಪ್ಪಾಗಿದ್ದರೆ ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥದಲ್ಲಿ ಉಂಟಾಗುವ ತೊಡಕುಗಳು ಮತ್ತು ಅಪಾಯಿಂಟಿ (Appointee) ನೇಮಕದ ನಿಯಮಗಳು.',
    summaryEn: 'Understanding legal requirements for minor nominees, appointee declarations, and Section 39 compliance.',
    bodyKn: `ಜೀವ ವಿಮಾ ಪಾಲಿಸಿಯಲ್ಲಿ ನಾಮಿನಿ (ವಾರಸುದಾರರ) ಹೆಸರು ದಾಖಲಿಸುವುದು ಕೇವಲ ಒಂದು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡುವ ಕೆಲಸವಲ್ಲ. ಇದು ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಅನುಪಸ್ಥಿತಿಯಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ಸುಲಭವಾಗಿ ಹಣ ಸಿಗುವಂತೆ ಮಾಡುವ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆ.

ಮುಖ್ಯ ಅಂಶಗಳು:
1. ಅಪ್ರಾಪ್ತ ವಯಸ್ಕ ನಾಮಿನಿ: 18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಗುವನ್ನು ನಾಮಿನಿ ಮಾಡಿದರೆ, ಮಗುವಿನ ರಕ್ಷಣೆಗಾಗಿ ಒಬ್ಬ ಮೇಜರ್ ವ್ಯಕ್ತಿಯನ್ನು 'ಅಪಾಯಿಂಟಿ' (Appointee) ಎಂದು ನೇಮಿಸುವುದು ಕಡ್ಡಾಯ.
2. ವಿವಾಹದ ನಂತರ ಬದಲಾವಣೆ: ವಿವಾಹಕ್ಕೆ ಮುನ್ನ ತಂದೆ/ತಾಯಿಯನ್ನು ನಾಮಿನಿ ಮಾಡಿದ್ದರೆ, ಮದುವೆಯ ನಂತರ ಪತ್ನಿ/ಗಂಡನ ಹೆಸರನ್ನು ಅಧಿಕೃತವಾಗಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಬೇಕು.
3. ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಪ್ಯಾನ್ ದಾಖಲೆ: ನಾಮಿನಿಯ ಹೆಸರಿನ ಅಕ್ಷರಗಳು ಅವರ ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ತಾಳೆಯಾಗಬೇಕು.

ಸಲಹೆ: ವರ್ಷಕ್ಕೊಮ್ಮೆಯಾದರೂ ನಿಮ್ಮ ಪಾಲಿಸಿಯ ನಾಮಿನಿ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ.`,
    bodyEn: `Registering a nominee in your life insurance contract is not merely paperwork—it dictates whether your surviving family receives the death claim proceeds without administrative obstacles.

Key Considerations:
1. Minor Nominees: If your nominee is under 18 years of age, you must legally declare an Appointee (guardian) who would act in trust for the child until majority.
2. Post-Marriage Updates: Many individuals purchase coverage while unmarried, naming parents. Updating the nominee to include a spouse or children after marriage prevents jurisdictional disputes.
3. Documentation Matching: Ensure the nominee’s official spelling precisely matches their government ID (PAN/Aadhaar) and primary bank account.`,
    readTime: '3 min read',
    status: 'Approved',
    reviewer: 'Sofia Rani (Advisor)',
    lastReviewedDate: '2026-10-15',
    approvalReference: 'IRDAI-GEN-EDU-01',
  },
  {
    id: 'art-2',
    category: 'claims',
    titleKn: 'ಜೀವ ವಿಮಾ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸುವ ಸರಳ ಹಂತಗಳು: ಕುಟುಂಬಕ್ಕೆ ಮಾರ್ಗದರ್ಶಿ',
    titleEn: 'Step-by-Step Claim Settlement Roadmap for Families in Karnataka',
    summaryKn: 'ಅನಿರೀಕ್ಷಿತ ದುರ್ಘಟನೆ ಸಂಭವಿಸಿದಾಗ ಕುಟುಂಬದವರು ಯಾವ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳಬೇಕು ಮತ್ತು ಅಧಿಕೃತ ಶಾಖೆಯನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸಬೇಕು.',
    summaryEn: 'Essential documents, timeline benchmarks, and official branch liaison procedures for death claims.',
    bodyKn: `ದುಃಖದ ಸಮಯದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ಆರ್ಥಿಕ ಪರಿಹಾರವು ಯಾವುದೇ ಅಡೆತಡೆಯಿಲ್ಲದೆ ತಲುಪಬೇಕು. 

ಅಗತ್ಯ ದಾಖಲೆಗಳು:
1. ಮೂಲ ಪಾಲಿಸಿ ಬಾಂಡ್ ಪತ್ರ.
2. ಸ್ಥಳೀಯ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಅಥವಾ ಪುರಸಭೆಯಿಂದ ನೀಡಲಾದ ಅಧಿಕೃತ ಮರಣ ಪ್ರಮಾಣಪತ್ರ (Death Certificate).
3. ನಾಮಿನಿಯ ಕೆವೈಸಿ (ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ / ರದ್ದುಪಡಿಸಿದ ಚೆಕ್).
4. ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಪಡೆದಿದ್ದರೆ ಆಸ್ಪತ್ರೆಯ ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ ಅಥವಾ ದಾಖಲೆಗಳು.

ಯಾರೊಂದಿಗೂ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬೇಡಿ. ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಶಾಖೆಯ ಕ್ಲೈಮ್ ಡೆಸ್ಕ್‌ಗೆ ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು. ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಈ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಉಚಿತವಾಗಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.`,
    bodyEn: `During moments of deep bereavement, a claim settlement must be swift and frictionless.

Mandatory Filing Documents:
1. Original policy bond.
2. Official Death Certificate issued by the local Municipal Corporation or Gram Panchayat.
3. Nominee's verified KYC (Aadhaar, PAN card, and cancelled cheque for NEFT settlement).
4. Medical treatment records or hospital discharge summary if illness preceded demise.

No third-party fees or agent commissions are ever payable for claim settlements. Sofia Rani provides complimentary claim roadmap support for all policyholders.`,
    readTime: '4 min read',
    status: 'Approved',
    reviewer: 'Sofia Rani (Advisor)',
    lastReviewedDate: '2026-10-20',
    approvalReference: 'IRDAI-CLM-GUIDE-04',
  },
  {
    id: 'art-3',
    category: 'child',
    titleKn: 'ಕಾಲೇಜು ಶಿಕ್ಷಣದ ಹಣದುಬ್ಬರ: 10 ವರ್ಷಗಳಲ್ಲಿ ₹10 ಲಕ್ಷದ ಕೋರ್ಸ್ ಎಷ್ಟು ಆಗಬಹುದು?',
    titleEn: 'Understanding Higher Education Inflation in India Over a 10-Year Horizon',
    summaryKn: 'ವಾರ್ಷಿಕ 8% ರಿಂದ 10% ರಷ್ಟು ಶಿಕ್ಷಣ ವೆಚ್ಚ ಹೆಚ್ಚಳವಾದಾಗ ಭವಿಷ್ಯದ ಉಳಿತಾಯವನ್ನು ಹೇಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಬೇಕು.',
    summaryEn: 'Mathematical review of compounding educational inflation and disciplined savings allocation.',
    bodyKn: `ಭಾರತದಲ್ಲಿ ಸಾಮಾನ್ಯ ಗ್ರಾಹಕ ಹಣದುಬ್ಬರಕ್ಕಿಂತ ಉನ್ನತ ಶಿಕ್ಷಣದ ವೆಚ್ಚವು ಹೆಚ್ಚು ವೇಗವಾಗಿ ಹೆಚ್ಚುತ್ತಿದೆ.

ಉದಾಹರಣೆಗೆ:
- ಇಂದು ₹10 ಲಕ್ಷ ವೆಚ್ಚವಾಗುವ 4-ವರ್ಷದ ಎಂಜಿನಿಯರಿಂಗ್ ಅಥವಾ ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣ.
- ವಾರ್ಷಿಕ 8% ಹಣದುಬ್ಬರ ದರದಲ್ಲಿ, 10 ವರ್ಷಗಳ ನಂತರ ಅದೇ ಕೋರ್ಸ್‌ಗೆ ಸುಮಾರು ₹21.6 ಲಕ್ಷ ಬೇಕಾಗುತ್ತದೆ.
- 15 ವರ್ಷಗಳ ನಂತರ ಸುಮಾರು ₹31.7 ಲಕ್ಷ ಬೇಕಾಗುತ್ತದೆ.

ಇದಕ್ಕಾಗಿ ಕೇವಲ ಬ್ಯಾಂಕ್ ಉಳಿತಾಯ ಖಾತೆಯಲ್ಲಿ ಹಣ ಇಡುವುದು ಸಾಲದು. ಶಿಸ್ತುಬದ್ಧ ವಿಮಾ ಉಳಿತಾಯ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಮನ್ನಾ (Waiver of Premium) ಸೌಲಭ್ಯವಿರುವ ಯೋಜನೆಗಳನ್ನು ಮುಂಚಿತವಾಗಿ ಪರಿಗಣಿಸುವುದು ಸೂಕ್ತ.`,
    bodyEn: `Tuition and hostel fees across Indian colleges expand at 8%–10% compounded annually.

Illustrative Impact:
- A professional degree costing ₹10 Lakhs today will require approximately ₹21.6 Lakhs in 10 years at an 8% inflation rate.
- In 15 years, the cost compounds to nearly ₹31.7 Lakhs.

Relying solely on low-yield savings accounts erodes purchasing power. Structuring an education fund with guaranteed milestone maturity and waiver-of-premium protection ensures the fund completes even in parental absence.`,
    readTime: '3 min read',
    status: 'Approved',
    reviewer: 'Sofia Rani (Advisor)',
    lastReviewedDate: '2026-11-01',
    approvalReference: 'IRDAI-EDU-INF-02',
  },
];

const VIDEOS_DATA: EducationalVideo[] = [
  {
    id: 'vid-1',
    titleKn: 'ಕುಟುಂಬ ರಕ್ಷಣಾ ಕೊರತೆ (Protection Gap) ಎಂದರೇನು? ಲೆಕ್ಕಾಚಾರ ಹೇಗೆ?',
    titleEn: 'What is a Family Protection Gap? Transparent Calculation Walkthrough',
    duration: '3:15 min',
    category: 'Term Insurance',
    summaryKn: 'ನಿಮ್ಮ ಸಾಲ, ಕುಟುಂಬದ ಮಾಸಿಕ ವೆಚ್ಚ ಮತ್ತು ಮಕ್ಕಳ ಗುರಿಗಳ ಆಧಾರದ ಮೇಲೆ ಅಗತ್ಯವಿರುವ ಜೀವ ರಕ್ಷಣೆಯನ್ನು ಹೇಗೆ ನಿರ್ಧರಿಸುವುದು.',
    summaryEn: 'A clear mathematical breakdown showing how liabilities, living expenses, and goals determine true life cover.',
    keyPointsKn: [
      'ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ಪಾಲಿಸಿ ಕೇವಲ ಉಳಿತಾಯವಲ್ಲ, ಅದು ಕುಟುಂಬಕ್ಕೆ ಆರ್ಥಿಕ ಆದಾಯದ ಪರ್ಯಾಯ.',
      'ಮಾಸಿಕ ವೆಚ್ಚ × 12 × ಬೆಂಬಲ ವರ್ಷಗಳು + ಒಟ್ಟು ಸಾಲಗಳ ಸೂತ್ರದ ವಿವರಣೆ.',
      'ಲಭ್ಯವಿರುವ ಅಸೆಟ್‌ಗಳನ್ನು ಕಳೆದು ನಿವ್ವಳ ಕೊರತೆಯನ್ನು ನಿರ್ಧರಿಸುವ ಪಾರದರ್ಶಕ ವಿಧಾನ.',
    ],
    keyPointsEn: [
      'Term insurance is pure income replacement, not speculative investment.',
      'Understanding the core formula: Annual Household Living Expenses × Support Years + Outstanding Debt.',
      'Accounting for existing liquid assets and provident funds before deciding policy sum assured.',
    ],
    reviewedDate: '2026-10-25',
  },
  {
    id: 'vid-2',
    titleKn: 'ಗ್ಯಾರಂಟಿಡ್ ಮೆಚುರಿಟಿ vs ವೇರಿಯಬಲ್ ಬೋನಸ್: ಎರಡರ ವ್ಯತ್ಯಾಸವೇನು?',
    titleEn: 'Guaranteed Benefits vs Variable Bonuses: How to Read 4% & 8% Tables',
    duration: '4:20 min',
    category: 'Savings & Policy Review',
    summaryKn: 'IRDAI ನಿಯಮದಂತೆ ಪಾಲಿಸಿ ವಿವರಣೆಯಲ್ಲಿ ತೋರಿಸುವ 4% ಮತ್ತು 8% ಅಂಕಿಅಂಶಗಳ ನೈಜ ಅರ್ಥ ಮತ್ತು ನಿಯಮಗಳು.',
    summaryEn: 'Demystifying statutory benefit illustrations so policyholders never mistake projected rates for guarantees.',
    keyPointsKn: [
      'ಗ್ಯಾರಂಟಿಡ್ ಸೌಲಭ್ಯಗಳು ಪಾಲಿಸಿ ಬಾಂಡ್‌ನಲ್ಲಿ ಮುದ್ರಿತವಾಗಿರುತ್ತವೆ.',
      '4% ಮತ್ತು 8% ದರಗಳು ಕೇವಲ ಕಂಪನಿಯ ಭವಿಷ್ಯದ ಕಾರ್ಯಕ್ಷಮತೆಯ ಅಂದಾಜುಗಳು (Projections).',
      'ಪಾಲಿಸಿ ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಕರಾರು ಪತ್ರದ ಕಾಲಂಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ವಿಧಾನ.',
    ],
    keyPointsEn: [
      'Guaranteed benefits are contractually bound on the stamp-stamped policy bond.',
      'The 4% and 8% gross investment rates are illustrative scenarios mandated by IRDAI.',
      'How to verify non-guaranteed bonuses against historical declaration records.',
    ],
    reviewedDate: '2026-10-28',
  },
  {
    id: 'vid-3',
    titleKn: 'ಶೂನ್ಯ ನಗದು ನೀತಿ: ಪ್ರೀಮಿಯಂ ಹಣವನ್ನು ಯಾರ ವೈಯಕ್ತಿಕ ಖಾತೆಗೂ ನೀಡಬೇಡಿ',
    titleEn: 'Zero-Cash Protocol: Why Premiums Must Always Go Direct to SBI Life',
    duration: '2:45 min',
    category: 'Consumer Protection',
    summaryKn: 'ವಿಮಾ ವಂಚನೆಗಳಿಂದ ರಕ್ಷಣೆ ಪಡೆಯಲು ಅಧಿಕೃತ ಬ್ಯಾಂಕಿಂಗ್ ಗೇಟ್‌ವೇ ಅಥವಾ ಅಧಿಕೃತ ಶಾಖೆ ಕೌಂಟರ್ ಬಳಸುವ ನಿಯಮ.',
    summaryEn: 'Critical anti-fraud advisory on never paying cash or personal UPI transfers to advisors or agents.',
    keyPointsKn: [
      'ಯಾವುದೇ ಸಲಹೆಗಾರರಿಗೆ ಅಥವಾ ಏಜೆಂಟರಿಗೆ ನಗದು ನೀಡುವಂತಿಲ್ಲ.',
      'ಅಧಿಕೃತ sbilife.co.in ಅಥವಾ ಬ್ಯಾಂಕ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಪಾವತಿಸಿ.',
      'ಪಾವತಿಸಿದ ತಕ್ಷಣ ಕಂಪ್ಯೂಟರ್ ರಶೀದಿ ಪರಿಶೀಲಿಸಿ ಪಡೆಯುವುದು ನಿಮ್ಮ ಹಕ್ಕು.',
    ],
    keyPointsEn: [
      'No advisor or representative is authorized to collect personal cash.',
      'Always pay via sbilife.co.in, authorized SBI NetBanking, or branch cashiers.',
      'Immediate computer-generated receipts are the only legal proof of premium payment.',
    ],
    reviewedDate: '2026-11-02',
  },
];

export const LearnView: React.FC<Props> = ({ language, onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'videos' | 'glossary'>('all');
  const [activeGlossaryTermId, setActiveGlossaryTermId] = useState<string | null>(null);
  const isKn = language === 'kn';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          {isKn ? 'ಗ್ರಾಹಕ ಶಿಕ್ಷಣ & ಜಾಗೃತಿ' : 'Consumer Education & Knowledge Base'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಉಪಯುಕ್ತ ಲೇಖನಗಳು ಮತ್ತು ವಿಡಿಯೋ ಮಾರ್ಗದರ್ಶಿಗಳು' : 'Reviewed Educational Articles & Explainer Guides'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isKn
            ? 'ವಿಮಾ ನಿಯಮಗಳು, ನಾಮಿನಿ ಅಪ್‌ಡೇಟ್, ಕ್ಲೈಮ್ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಶಿಕ್ಷಣ ಯೋಜನೆಗಳ ಕುರಿತು ಪರಿಶೀಲಿಸಿದ ನಿಖರ ಮಾಹಿತಿ.'
            : 'Clear, ethical guidance on nominee updates, claims facilitation, and family protection mechanics.'}
        </p>
      </div>

      {/* Governance Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900 block">
            {isKn ? 'ವಿಷಯ ಪರಿಶೀಲನಾ ನೀತಿ (Content Governance):' : 'Editorial & Regulatory Content Protocol:'}
          </span>
          <p className="leading-relaxed">
            {isKn
              ? 'ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾದ ಎಲ್ಲಾ ಶೈಕ್ಷಣಿಕ ಲೇಖನ ಮತ್ತು ವಿಡಿಯೋ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಸಾಮಾನ್ಯ ಗ್ರಾಹಕ ಜಾಗೃತಿಗಾಗಿ ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಪರಿಶೀಲಿಸಿದ್ದಾರೆ. ನಿರ್ದಿಷ್ಟ ಉತ್ಪನ್ನ ಬ್ರೋಷರ್‌ಗಳು ಮತ್ತು ಕಂಪನಿಯ ಅಧಿಕೃತ ಜಾಹೀರಾತುಗಳು ಕಂಪನಿಯ ಅನುಮೋದನೆ ಪಡೆದ ನಂತರವೇ ಪ್ರಕಟವಾಗುತ್ತವೆ.'
              : 'All articles and video explainers are reviewed for factual accuracy and consumer awareness under IRDAI guidelines. Product-specific claims, brochures, and commercial benefit illustrations remain subject to company approval.'}
          </p>
        </div>
      </div>

      {/* Media Type Filter Tabs */}
      <div className="flex justify-center gap-2">
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isKn ? 'ಎಲ್ಲವೂ (All)' : 'All Resources'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'articles'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isKn ? 'ಲೇಖನಗಳು (Articles)' : 'Articles'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'videos'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{isKn ? 'ವಿಡಿಯೋ ಸರಣಿ (Videos)' : 'Video Explainers'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'glossary'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>{isKn ? 'ಪದಕೋಶ (Glossary)' : 'Term Glossary'}</span>
          </button>
        </div>
      </div>

      {/* Video Explainers Section */}
      {(activeTab === 'all' || activeTab === 'videos') && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
            <Video className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ವಿಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ ಸರಣಿ' : 'Educational Video Explainer Series'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS_DATA.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Thumbnail Placeholder */}
                  <div className="w-full aspect-[16/9] bg-slate-900 rounded-xl relative flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 opacity-90" />
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      className="w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center relative z-10 transition-transform group-hover:scale-105 cursor-pointer shadow-md"
                    >
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </button>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-white font-medium">
                      {video.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="font-semibold text-teal-800 uppercase tracking-wider">
                      {video.category}
                    </span>
                    <span>Reviewed: {video.reviewedDate}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {isKn ? video.titleKn : video.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isKn ? video.summaryKn : video.summaryEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  className="mt-5 w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isKn ? 'ವಿಡಿಯೋ ಸಾರಾಂಶ ವೀಕ್ಷಿಸಿ' : 'View Explainer Highlights'}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Articles Grid */}
      {(activeTab === 'all' || activeTab === 'articles') && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ಶೈಕ್ಷಣಿಕ ಲೇಖನಗಳು' : 'Reviewed Educational Articles'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES_DATA.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-teal-800 uppercase tracking-wider">
                      {article.category.toUpperCase()}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {isKn ? article.titleKn : article.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isKn ? article.summaryKn : article.summaryEn}
                  </p>

                  <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                    <span>Reviewed: {article.lastReviewedDate}</span>
                    <span className="text-emerald-700 font-semibold">{article.status}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="mt-5 w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-800" />
                  <span>{isKn ? 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ' : 'Read Full Guide'}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Plan Type Comparison Matrix */}
      <PlanTypeComparison
        language={language}
        onNavigate={onNavigate}
      />

      {/* Financial Literacy Glossary Component */}
      {(activeTab === 'all' || activeTab === 'glossary' || activeGlossaryTermId !== null) && (
        <FinancialLiteracyGlossary
          language={language}
          onNavigate={onNavigate}
          externalSelectedTermId={activeGlossaryTermId}
          onCloseModal={() => setActiveGlossaryTermId(null)}
        />
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-xl">
            <div className="flex justify-between items-start gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {isKn ? selectedArticle.titleKn : selectedArticle.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* In-Article Interactive Glossary Term Chips */}
            <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100/90 text-xs text-teal-950 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-teal-900 uppercase tracking-wider">
                <BookMarked className="w-3.5 h-3.5 text-teal-700" />
                <span>
                  {isKn
                    ? 'ಈ ಲೇಖನದಲ್ಲಿರುವ ಪ್ರಮುಖ ವಿಮಾ ಪದಗಳು (ಪದಕೋಶ ತೆರೆಯಲು ಕ್ಲಿಕ್ ಮಾಡಿ):'
                    : 'Key Glossary Terms in this Article (Click for Pop-up Dictionary):'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'nominee', labelEn: 'Nominee', labelKn: 'ನಾಮಿನಿ' },
                  { id: 'appointee', labelEn: 'Appointee', labelKn: 'ಅಪಾಯಿಂಟಿ' },
                  { id: 'sum-assured', labelEn: 'Sum Assured', labelKn: 'ವಿಮಾ ಮೊತ್ತ' },
                  { id: 'grace-period', labelEn: 'Grace Period', labelKn: 'ರಿಯಾಯಿತಿ ಅವಧಿ' },
                  { id: 'section-80c', labelEn: 'Section 80C', labelKn: 'ಸೆಕ್ಷನ್ 80C' },
                  { id: 'section-10-10d', labelEn: 'Section 10(10D)', labelKn: 'ಸೆಕ್ಷನ್ 10(10D)' },
                  { id: 'waiver-of-premium', labelEn: 'Waiver of Premium', labelKn: 'ಪ್ರೀಮಿಯಂ ಮನ್ನಾ' },
                ].map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setActiveGlossaryTermId(term.id)}
                    className="py-1 px-2.5 bg-white hover:bg-teal-700 hover:text-white border border-teal-200/80 rounded-lg text-[11px] font-semibold text-teal-900 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>{isKn ? term.labelKn : term.labelEn}</span>
                    <span className="text-[10px] opacity-60">📖</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed py-2">
              {isKn ? selectedArticle.bodyKn : selectedArticle.bodyEn}
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-1">
              <span>Reviewer: {selectedArticle.reviewer}</span>
              <span>Approval Ref: {selectedArticle.approvalReference}</span>
              <span>Last Checked: {selectedArticle.lastReviewedDate}</span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                {isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  onNavigate('book');
                }}
                className="px-4 py-2 bg-teal-800 text-white text-xs font-semibold rounded-lg hover:bg-teal-900 cursor-pointer flex items-center gap-1.5"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ' : 'Discuss with Sofia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Explainer Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 shadow-xl">
            <div className="flex justify-between items-start gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {selectedVideo.category} · {selectedVideo.duration}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {isKn ? selectedVideo.titleKn : selectedVideo.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Visual Interface */}
            <div className="w-full aspect-[16/9] bg-slate-950 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-6 text-center text-white">
              <div className="w-14 h-14 rounded-full bg-teal-600/90 flex items-center justify-center mb-3">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </div>
              <span className="font-bold text-sm">
                {isKn ? selectedVideo.titleKn : selectedVideo.titleEn}
              </span>
              <span className="text-xs text-slate-300 mt-1">
                {isKn ? 'ಶೈಕ್ಷಣಿಕ ವಿಡಿಯೋ ಸಾರಾಂಶ (3-4 ನಿಮಿಷ)' : 'Key Takeaways & Educational Summary (3-4 mins)'}
              </span>
            </div>

            {/* Key Takeaways Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>{isKn ? 'ಈ ವಿಡಿಯೋದ ಮುಖ್ಯ ಅಂಶಗಳು:' : 'Key Video Highlights & Takeaways:'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(isKn ? selectedVideo.keyPointsKn : selectedVideo.keyPointsEn).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-teal-800 font-bold">0{i + 1}.</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                {isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedVideo(null);
                  onNavigate('book');
                }}
                className="px-4 py-2 bg-teal-800 text-white text-xs font-semibold rounded-lg hover:bg-teal-900 cursor-pointer flex items-center gap-1.5"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ' : 'Discuss with Sofia'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
