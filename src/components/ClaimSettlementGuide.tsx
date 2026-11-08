import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Building2,
  Calendar,
  Check,
  Scale,
  BadgeAlert,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface ClaimSettlementGuideProps {
  language: Language;
  className?: string;
  onBookAssistance?: () => void;
}

type ClaimType = 'natural' | 'accidental' | 'maturity';

interface StepDetail {
  number: number;
  titleEn: string;
  titleKn: string;
  timelineEn: string;
  timelineKn: string;
  descriptionEn: string;
  descriptionKn: string;
  actionsEn: string[];
  actionsKn: string[];
  keyTipsEn: string;
  keyTipsKn: string;
}

interface RequiredDoc {
  id: string;
  titleEn: string;
  titleKn: string;
  categoryEn: string;
  categoryKn: string;
  claimTypes: ClaimType[];
  isMandatory: boolean;
  tipEn: string;
  tipKn: string;
}

const REQUIRED_DOCS: RequiredDoc[] = [
  {
    id: 'death_cert',
    titleEn: 'Official Death Certificate',
    titleKn: 'ಅಧಿಕೃತ ಮರಣ ಪ್ರಮಾಣಪತ್ರ',
    categoryEn: 'Vital Record',
    categoryKn: 'ಪ್ರಮುಖ ದಾಖಲೆ',
    claimTypes: ['natural', 'accidental'],
    isMandatory: true,
    tipEn: 'Issued by the local Municipal Corporation, Town Municipality (CMC/TMC), or Gram Panchayat.',
    tipKn: 'ಸ್ಥಳೀಯ ಪುರಸಭೆ, ನಗರಸಭೆ ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ ನೀಡಿದ ಅಸಲಿ ಪ್ರಮಾಣಪತ್ರ.',
  },
  {
    id: 'policy_bond',
    titleEn: 'Original Policy Bond Document',
    titleKn: 'ಮೂಲ ಪಾಲಿಸಿ ಬಾಂಡ್ ಪತ್ರ',
    categoryEn: 'Contract Document',
    categoryKn: 'ವಿಮಾ ಕರಾರು ಪತ್ರ',
    claimTypes: ['natural', 'accidental', 'maturity'],
    isMandatory: true,
    tipEn: 'If misplaced, an Indemnity Bond on stamp paper with branch verification can be submitted.',
    tipKn: 'ಪಾಲಿಸಿ ಬಾಂಡ್ ಕಳೆದುಹೋಗಿದ್ದರೆ ಮುದ್ರಾಂಕ ಕಾಗದದಲ್ಲಿ ಇಂಡೆಮ್ನಿಟಿ ಬಾಂಡ್ ಸಲ್ಲಿಸಬಹುದು.',
  },
  {
    id: 'claim_forms',
    titleEn: 'Claim Forms 301 & 302 (Duly Signed by Nominee)',
    titleKn: 'ಅಧಿಕೃತ ಕ್ಲೈಮ್ ಫಾರ್ಮ್ (ನಾಮಿನಿಯ ಸಹಿಯೊಂದಿಗೆ)',
    categoryEn: 'Application Form',
    categoryKn: 'ಅರ್ಜಿ ಫಾರ್ಮ್',
    claimTypes: ['natural', 'accidental'],
    isMandatory: true,
    tipEn: 'Sofia Rani assists in filling and verifying the formal branch claim application.',
    tipKn: 'ಅರ್ಜಿ ನಮೂನೆಗಳನ್ನು ಭರ್ತಿ ಮಾಡಲು ಸೋಫಿಯಾ ರಾಣಿ ಸಂಪೂರ್ಣ ಉಚಿತ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.',
  },
  {
    id: 'nominee_kyc',
    titleEn: 'Nominee KYC (Aadhaar & PAN Card)',
    titleKn: 'ನಾಮಿನಿಯ ಕೆವೈಸಿ (ಆಧಾರ್ & ಪ್ಯಾನ್ ಕಾರ್ಡ್)',
    categoryEn: 'Identity Proof',
    categoryKn: 'ಗುರುತಿನ ಪುರಾವೆ',
    claimTypes: ['natural', 'accidental', 'maturity'],
    isMandatory: true,
    tipEn: 'Self-attested copies of nominee photo identity and address verification.',
    tipKn: 'ನಾಮಿನಿಯ ಸ್ವಯಂ ಸಹಿ ಮಾಡಿದ ಗುರುತಿನ ಮತ್ತು ವಿಳಾಸದ ನಕಲು ಪ್ರತಿ.',
  },
  {
    id: 'bank_proof',
    titleEn: 'Nominee Cancelled Cheque / Bank Passbook Copy',
    titleKn: 'ನಾಮಿನಿಯ ರದ್ದುಪಡಿಸಿದ ಚೆಕ್ / ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
    categoryEn: 'Direct Settlement',
    categoryKn: 'ನೇರ ಜಮೆ ವಿವರ',
    claimTypes: ['natural', 'accidental', 'maturity'],
    isMandatory: true,
    tipEn: 'Ensures direct NEFT credit into the nominee’s bank account without intermediary delay.',
    tipKn: 'ಕ್ಲೈಮ್ ಹಣ ನೇರವಾಗಿ ನಾಮಿನಿಯ ಖಾತೆಗೆ ಜಮೆಯಾಗಲು ಮುದ್ರಿತ ಹೆಸರುಳ್ಳ ಚೆಕ್ ಅಥವಾ ಪಾಸ್‌ಬುಕ್.',
  },
  {
    id: 'medical_records',
    titleEn: 'Hospital Discharge Summary & Diagnostic Reports',
    titleKn: 'ಆಸ್ಪತ್ರೆಯ ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ & ಚಿಕಿತ್ಸಾ ವರದಿಗಳು',
    categoryEn: 'Medical Record',
    categoryKn: 'ವೈದ್ಯಕೀಯ ದಾಖಲೆ',
    claimTypes: ['natural'],
    isMandatory: false,
    tipEn: 'Required only if the life assured underwent hospital admission or medical treatment before demise.',
    tipKn: 'ಮರಣಕ್ಕೂ ಮುನ್ನ ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಪಡೆದಿದ್ದರೆ ಮಾತ್ರ ಇದು ಅನ್ವಯಿಸುತ್ತದೆ.',
  },
  {
    id: 'fir_postmortem',
    titleEn: 'Police FIR, Panchanama & Post-Mortem Report',
    titleKn: 'ಪೊಲೀಸ್ ಎಫ್.ಐ.ಆರ್, ಪಂಚನಾಮೆ & ಮರಣೋತ್ತರ ಪರೀಕ್ಷಾ ವರದಿ',
    categoryEn: 'Accident Record',
    categoryKn: 'ಅಪಘಾತ ದಾಖಲೆ',
    claimTypes: ['accidental'],
    isMandatory: true,
    tipEn: 'Mandatory for accidental death claims and road mishaps to activate additional accident riders.',
    tipKn: 'ಅಪಘಾತ ಮರಣ ಕ್ಲೈಮ್ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಆಕ್ಸಿಡೆಂಟಲ್ ರೈಡರ್ ಸೌಲಭ್ಯ ಪಡೆಯಲು ಕಡ್ಡಾಯ.',
  },
  {
    id: 'dl_copy',
    titleEn: 'Driving License Copy (If driving at time of accident)',
    titleKn: 'ಚಾಲನಾ ಪರವಾನಗಿ (ಡಿಎಲ್) ಪ್ರತಿ (ಅಪಘಾತದ ವೇಳೆ ವಾಹನ ಚಾಲನೆ ಮಾಡುತ್ತಿದ್ದರೆ)',
    categoryEn: 'Legal Driving Record',
    categoryKn: 'ಚಾಲನಾ ಪರವಾನಗಿ',
    claimTypes: ['accidental'],
    isMandatory: false,
    tipEn: 'Required if the life assured was driving a vehicle during a road accident.',
    tipKn: 'ಸ್ವತಃ ವಾಹನ ಚಾಲನೆ ಮಾಡುತ್ತಿದ್ದಾಗ ಅಪಘಾತ ಸಂಭವಿಸಿದ್ದರೆ ಅಗತ್ಯ.',
  },
];

const STEPS: StepDetail[] = [
  {
    number: 1,
    titleEn: 'Immediate Claim Intimation',
    titleKn: 'ಹಂತ 1: ತಕ್ಷಣದ ಕ್ಲೈಮ್ ಮಾಹಿತಿ ನೀಡಿಕೆ',
    timelineEn: 'Within 3–7 days of event',
    timelineKn: 'ಘಟನೆ ನಡೆದ 3-7 ದಿನಗಳಲ್ಲಿ',
    descriptionEn:
      'Notify SBI Life regarding the demise of the life assured. Early intimation initiates the claim docket without pressure.',
    descriptionKn:
      'ಪಾಲಿಸಿದಾರರ ನಿಧನದ ಬಗ್ಗೆ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಶಾಖೆಗೆ ಅಥವಾ ಸಲಹೆಗಾರರಿಗೆ ಮೊದಲ ಮಾಹಿತಿ ನೀಡುವುದು. ಇದರಿಂದ ಕ್ಲೈಮ್ ಪ್ರಕ್ರಿಯೆ ತಕ್ಷಣ ಆರಂಭವಾಗುತ್ತದೆ.',
    actionsEn: [
      'Locate policy number and primary contact details of the nominee.',
      'Notify through the official toll-free line (1800 267 9090), official website, or contact Sofia Rani.',
      'Obtain the official Claim Intimation Reference ID.',
    ],
    actionsKn: [
      'ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಮತ್ತು ನಾಮಿನಿಯ ಮೊಬೈಲ್ ವಿವರಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.',
      'ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಉಚಿತ ಸಹಾಯವಾಣಿ (1800 267 9090), ಶಾಖೆ ಅಥವಾ ಸೋಫಿಯಾ ರಾಣಿ ಅವರ ಮೂಲಕ ಮಾಹಿತಿ ನೀಡಿ.',
      'ಅಧಿಕೃತ ಕ್ಲೈಮ್ ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನು (Claim Intimation ID) ಪಡೆದುಕೊಳ್ಳಿ.',
    ],
    keyTipsEn:
      'Do not panic if any paper is temporarily missing. The immediate step is merely notifying the insurer.',
    keyTipsKn:
      'ಯಾವುದಾದರೂ ಕಾಗದಪತ್ರಗಳು ತಕ್ಷಣಕ್ಕೆ ಸಿಗದಿದ್ದರೂ ಆತಂಕಪಡಬೇಡಿ. ಮೊದಲ ಹಂತ ಕೇವಲ ಕಂಪನಿಗೆ ಮಾಹಿತಿ ನೀಡುವುದು ಮಾತ್ರ.',
  },
  {
    number: 2,
    titleEn: 'Collate & Self-Attest Documents',
    titleKn: 'ಹಂತ 2: ದಾಖಲೆಗಳ ಸಂಗ್ರಹ & ಸ್ವಯಂ ದೃಢೀಕರಣ',
    timelineEn: 'Within 7–15 days',
    timelineKn: '7-15 ದಿನಗಳ ಒಳಗಾಗಿ',
    descriptionEn:
      'Gather the required identity, medical, and banking documents. Verify that the bank account name matches the nominee KYC.',
    descriptionKn:
      'ಮರಣ ಪ್ರಮಾಣಪತ್ರ, ಪಾಲಿಸಿ ಬಾಂಡ್ ಮತ್ತು ನಾಮಿನಿಯ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ. ಎಲ್ಲಾ ಜೆರಾಕ್ಸ್ ಪ್ರತಿಗಳ ಮೇಲೂ ನಾಮಿನಿಯ ಸ್ವಯಂ ಸಹಿ ಇರಬೇಕು.',
    actionsEn: [
      'Collect official Municipal / Panchayat Death Certificate.',
      'Gather nominee’s Aadhaar, PAN card, and cancelled bank cheque.',
      'Self-attest each photocopy (nominee signs "Self-Attested" with date).',
    ],
    actionsKn: [
      'ಪುರಸಭೆ ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯತಿ ನೀಡಿದ ಅಧಿಕೃತ ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.',
      'ನಾಮಿನಿಯ ಆಧಾರ್, ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಮತ್ತು ಮುದ್ರಿತ ಹೆಸರಿರುವ ರದ್ದುಪಡಿಸಿದ ಚೆಕ್ ಸಿದ್ಧಪಡಿಸಿ.',
      'ಪ್ರತಿಯೊಂದು ಜೆರಾಕ್ಸ್ ಪ್ರತಿಯ ಮೇಲೂ ನಾಮಿನಿಯು "ಸ್ವಯಂ ಸಹಿ" (Self-attested) ಮಾಡಬೇಕು.',
    ],
    keyTipsEn:
      'Always retain one complete set of photocopies for your home records before branch handover.',
    keyTipsKn:
      'ಶಾಖೆಗೆ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ಮನೆಯ ದಾಖಲೆಗಾಗಿ ಎಲ್ಲಾ ಪತ್ರಗಳ ಒಂದು ಜೆರಾಕ್ಸ್ ಸೆಟ್ ಇಟ್ಟುಕೊಳ್ಳಿ.',
  },
  {
    number: 3,
    titleEn: 'Branch Submission & Acknowledgment',
    titleKn: 'ಹಂತ 3: ಶಾಖೆಯಲ್ಲಿ ಸಲ್ಲಿಕೆ & ಸ್ವೀಕೃತಿ ರಶೀದಿ',
    timelineEn: 'Day 15–20',
    timelineKn: '15-20 ನೇ ದಿನಗಳಲ್ಲಿ',
    descriptionEn:
      'Submit the complete docket to the authorized SBI Life branch (Gangavathi / Koppal) and secure a stamped acknowledgment slip.',
    descriptionKn:
      'ಸಂಪೂರ್ಣ ಕಡತವನ್ನು ಗಂಗಾವತಿ ಅಥವಾ ಕೊಪ್ಪಳ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಶಾಖೆಯ ಕ್ಲೈಮ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಿ ಅಧಿಕೃತ ಸೀಲ್ ಇರುವ ಸ್ವೀಕೃತಿ ರಶೀದಿ ಪಡೆಯಿರಿ.',
    actionsEn: [
      'Submit the physical file at the authorized customer care counter.',
      'Branch officer verifies original documents on the spot and returns originals immediately.',
      'Collect formal stamped physical acknowledgment slip with tracking token.',
    ],
    actionsKn: [
      'ಅಧಿಕೃತ ಶಾಖೆಯ ಗ್ರಾಹಕ ಸೇವಾ ಕೌಂಟರ್‌ನಲ್ಲಿ ಕಡತವನ್ನು ಸಲ್ಲಿಸಿ.',
      'ಅಧಿಕಾರಿಗಳು ಮೂಲ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ ಪರಿಶೀಲಿಸಿ ತಕ್ಷಣವೇ ಮೂಲ ಪ್ರತಿಗಳನ್ನು ನಿಮಗೆ ಮರಳಿಸುತ್ತಾರೆ.',
      'ಸೀಲ್ ಮತ್ತು ದಿನಾಂಕವಿರುವ ಅಧಿಕೃತ ಸ್ವೀಕೃತಿ ರಶೀದಿಯನ್ನು (Acknowledgment Slip) ಪಡೆದುಕೊಳ್ಳಿ.',
    ],
    keyTipsEn:
      'Zero fee policy: Neither SBI Life nor any agent ever charges any fee or percentage commission for processing a claim.',
    keyTipsKn:
      'ಶೂನ್ಯ ಶುಲ್ಕ ನೀತಿ: ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥಕ್ಕಾಗಿ ಯಾವುದೇ ವ್ಯಕ್ತಿಗೆ ಅಥವಾ ಅಧಿಕಾರಿಗೆ ಒಂದು ರೂಪಾಯಿ ಶುಲ್ಕ ಅಥವಾ ಕಮಿಷನ್ ನೀಡಬೇಕಾಗಿಲ್ಲ.',
  },
  {
    number: 4,
    titleEn: 'Settlement via Direct NEFT',
    titleKn: 'ಹಂತ 4: ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ (NEFT Settlement)',
    timelineEn: 'Within 15–30 days (Statutory IRDAI SLA)',
    timelineKn: '15-30 ದಿನಗಳಲ್ಲಿ (IRDAI ಕಾನೂನುಬದ್ಧ ಗಡುವು)',
    descriptionEn:
      'Claims department completes verification and credits the full sum assured directly to the nominee’s bank account via NEFT.',
    descriptionKn:
      'ವಿಮಾ ಕಂಪನಿಯು ದಾಖಲೆಗಳನ್ನು ಅಂಗೀಕರಿಸಿ ಕ್ಲೈಮ್ ಮೊತ್ತವನ್ನು ನೇರವಾಗಿ ನಾಮಿನಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ NEFT ಮೂಲಕ ಜಮೆ ಮಾಡುತ್ತದೆ.',
    actionsEn: [
      'Track online progress using policy number and Claim Token ID on sbilife.co.in.',
      'Receive official SMS confirmation from SBI Life upon settlement approval.',
      'Funds reflect directly in the verified bank account with zero intermediary deductions.',
    ],
    actionsKn: [
      'sbilife.co.in ನಲ್ಲಿ ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಬಳಸಿ ಕ್ಲೈಮ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.',
      'ಕ್ಲೈಮ್ ಅನುಮೋದನೆಯಾದ ತಕ್ಷಣ ನೋಂದಾಯಿತ ಮೊಬೈಲ್‌ಗೆ ಅಧಿಕೃತ SMS ಬರುತ್ತದೆ.',
      'ಸಂಪೂರ್ಣ ವಿಮಾ ಮೊತ್ತವು ಯಾವುದೇ ಕಡಿತವಿಲ್ಲದೆ ನೇರವಾಗಿ ನಾಮಿನಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ತಲುಪುತ್ತದೆ.',
    ],
    keyTipsEn:
      'Under IRDAI regulations, interest is legally payable by the insurer if settlement is delayed beyond the statutory SLA without cause.',
    keyTipsKn:
      'IRDAI ನಿಯಮಗಳ ಪ್ರಕಾರ, ಕಾರಣವಿಲ್ಲದೆ ಕಾಲಮಿತಿ ಮೀರಿದರೆ ವಿಮಾ ಕಂಪನಿಯೇ ದಂಡದ ಬಡ್ಡಿಯನ್ನು ಪಾವತಿಸಬೇಕಾಗುತ್ತದೆ.',
  },
];

export const ClaimSettlementGuide: React.FC<ClaimSettlementGuideProps> = ({
  language,
  className = '',
  onBookAssistance,
}) => {
  const isKn = language === 'kn';
  const [claimType, setClaimType] = useState<ClaimType>('natural');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const currentStep = STEPS.find((s) => s.number === activeStep) || STEPS[0];

  const applicableDocs = REQUIRED_DOCS.filter((doc) =>
    doc.claimTypes.includes(claimType)
  );

  const totalDocsCount = applicableDocs.length;
  const checkedDocsCount = applicableDocs.filter((d) => checkedDocs[d.id]).length;
  const docReadiness =
    totalDocsCount > 0 ? Math.round((checkedDocsCount / totalDocsCount) * 100) : 0;

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShareOnWhatsApp = () => {
    const readyList = applicableDocs
      .filter((d) => checkedDocs[d.id])
      .map((d) => `✓ ${isKn ? d.titleKn : d.titleEn}`)
      .join('\n');

    const pendingList = applicableDocs
      .filter((d) => !checkedDocs[d.id])
      .map((d) => `⏳ ${isKn ? d.titleKn : d.titleEn}`)
      .join('\n');

    const text = isKn
      ? `ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, ನನ್ನ ಕುಟುಂಬದ ಜೀವ ವಿಮಾ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು ಮಾರ್ಗದರ್ಶನ ಕೋರುತ್ತೇನೆ.\n\n*ಕ್ಲೈಮ್ ಮಾದರಿ:* ${
          claimType === 'natural'
            ? 'ನೈಸರ್ಗಿಕ / ಅನಾರೋಗ್ಯ ಮರಣ ಕ್ಲೈಮ್'
            : claimType === 'accidental'
            ? 'ಅಪಘಾತ ಮರಣ ಕ್ಲೈಮ್'
            : 'ಮೆಚುರಿಟಿ ಕ್ಲೈಮ್'
        }\n\n*ಸಿದ್ಧವಿರುವ ದಾಖಲೆಗಳು (${checkedDocsCount}/${totalDocsCount}):*\n${readyList || 'ಯಾವುದೂ ಇಲ್ಲ'}\n\n*ಸಹಾಯ ಬೇಕಾಗಿರುವ ದಾಖಲೆಗಳು:*\n${pendingList || 'ಎಲ್ಲವೂ ಸಿದ್ಧವಾಗಿವೆ'}\n\nದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಶಾಖೆಯಲ್ಲಿ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಮಾಡಿ.`
      : `Hello Sofia Rani, I need assistance with filing an SBI Life insurance claim for my family.\n\n*Claim Type:* ${
          claimType === 'natural'
            ? 'Natural Demise / Illness Claim'
            : claimType === 'accidental'
            ? 'Accidental Demise Claim'
            : 'Maturity / Survival Benefit'
        }\n\n*Documents Ready (${checkedDocsCount}/${totalDocsCount}):*\n${readyList || 'None yet'}\n\n*Documents Requiring Assistance:*\n${pendingList || 'All documents prepared'}\n\nKindly guide me through the branch submission process.`;

    window.open(
      `https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
        text
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
            <HeartHandshake className="w-4 h-4 text-teal-700" />
            <span>
              {isKn ? 'ಪಾರದರ್ಶಕ ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶಿ' : 'Hassle-Free Beneficiary Roadmap'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isKn
              ? 'ಹಂತ-ಹಂತದ ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥ ಮಾರ್ಗದರ್ಶಿ'
              : 'Step-by-Step Claim Settlement Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isKn
              ? 'ಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಕುಟುಂಬದ ಸದಸ್ಯರಿಗೆ ಸ್ಪಷ್ಟ, ಸರಳ ಮತ್ತು ಅಧಿಕೃತ ಹಂತಗಳ ಮಾಹಿತಿ. ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ಶಾಖೆಯಿಂದ ಕ್ಲೈಮ್ ಪಡೆಯುವ ವಿಧಾನ.'
              : 'A transparent, reassuring roadmap for nominees and families. Understand exact timelines, document checklists, and IRDAI statutory rights.'}
          </p>
        </div>

        {/* Claim Readiness Progress Meter */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:min-w-[210px] text-center self-start sm:self-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isKn ? 'ದಾಖಲೆಗಳ ಸಿದ್ಧತೆಯ ಸ್ಥಿತಿ' : 'Document Readiness'}
          </span>
          <div className="flex items-center justify-center gap-2">
            <div className="w-full max-w-[100px] bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${docReadiness}%` }}
              />
            </div>
            <span className="text-sm font-bold text-teal-900 tabular-nums">
              {docReadiness}%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {checkedDocsCount} / {totalDocsCount}{' '}
            {isKn ? 'ದಾಖಲೆಗಳು ಸಿದ್ಧ' : 'documents ready'}
          </span>
        </div>
      </div>

      {/* Claim Type Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 block">
          {isKn ? 'ಕ್ಲೈಮ್ ಮಾದರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select Claim Type:'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setClaimType('natural')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              claimType === 'natural'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                claimType === 'natural'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ನೈಸರ್ಗಿಕ / ಅನಾರೋಗ್ಯ ಮರಣ' : 'Natural Demise / Illness'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ಸಾಮಾನ್ಯ ಮರಣ ಕ್ಲೈಮ್' : 'Standard Death Claim'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setClaimType('accidental')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              claimType === 'accidental'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                claimType === 'accidental'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <BadgeAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ಅಪಘಾತ ಮರಣ ಕ್ಲೈಮ್' : 'Accidental Demise Claim'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ಎಫ್.ಐ.ಆರ್ & ಪಂಚನಾಮೆ ಅಗತ್ಯ' : 'FIR & Police Panchanama'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setClaimType('maturity')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              claimType === 'maturity'
                ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                claimType === 'maturity'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold block">
                {isKn ? 'ಮೆಚುರಿಟಿ / ಅವಧಿ ಪೂರ್ಣತೆ' : 'Policy Maturity / Payout'}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {isKn ? 'ಪಾಲಿಸಿದಾರರು ಜೀವಂತವಿರುವಾಗ' : 'Survival Benefit on Term End'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 4-Step Interactive Timeline Stepper */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>{isKn ? 'ಪ್ರಕ್ರಿಯೆಯ ಹಂತಗಳು (Steps):' : 'Official Step-by-Step Flow:'}</span>
          <span className="text-teal-800 font-bold">
            {isKn ? `ಹಂತ ${activeStep} / 4` : `Step ${activeStep} of 4`}
          </span>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STEPS.map((s) => {
            const isCurrent = activeStep === s.number;
            const isCompleted = activeStep > s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActiveStep(s.number)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                    : isCompleted
                    ? 'bg-teal-50/70 border-teal-200 text-teal-950 hover:bg-teal-100/70'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      isCurrent
                        ? 'bg-white text-teal-900'
                        : isCompleted
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.number}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isCurrent ? 'text-teal-200' : 'text-slate-500'
                    }`}
                  >
                    {isKn ? s.timelineKn : s.timelineEn}
                  </span>
                </div>
                <span className="text-xs font-bold block truncate">
                  {isKn ? s.titleKn.split(':')[1] || s.titleKn : s.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-800 text-white font-bold text-xs flex items-center justify-center">
                {currentStep.number}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isKn ? currentStep.titleKn : currentStep.titleEn}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>{isKn ? currentStep.timelineKn : currentStep.timelineEn}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {isKn ? currentStep.descriptionKn : currentStep.descriptionEn}
          </p>

          {/* Action Points */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
              {isKn ? 'ಈ ಹಂತದಲ್ಲಿ ಮಾಡಬೇಕಾದ ಕೆಲಸಗಳು:' : 'Key Actions in this Stage:'}
            </span>
            <ul className="space-y-2 text-xs text-slate-700">
              {(isKn ? currentStep.actionsKn : currentStep.actionsEn).map((act, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sofia's Reassurance Tip */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-900 block">
                {isKn ? 'ಸೋಫಿಯಾ ಅವರ ಪ್ರಮುಖ ಸಲಹೆ:' : 'Important Advisory:'}
              </span>
              <p className="text-amber-800/90 leading-relaxed text-[11px]">
                {isKn ? currentStep.keyTipsKn : currentStep.keyTipsEn}
              </p>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeStep === 1
                  ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                  : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isKn ? 'ಹಿಂದಿನ ಹಂತ' : 'Previous Step'}</span>
            </button>

            <button
              type="button"
              disabled={activeStep === 4}
              onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                activeStep === 4
                  ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                  : 'text-white bg-teal-800 hover:bg-teal-900 cursor-pointer shadow-xs'
              }`}
            >
              <span>{isKn ? 'ಮುಂದಿನ ಹಂತ' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Required Documents Checklist for Selected Claim Type */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isKn
                ? 'ಕ್ಲೈಮ್‌ಗೆ ಅಗತ್ಯವಿರುವ ಅಧಿಕೃತ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ'
                : 'Required Documents Checklist for This Claim'}
            </h3>
            <span className="text-xs text-slate-500">
              {isKn
                ? 'ದಾಖಲೆಗಳು ಸಿದ್ಧವಿದ್ದಂತೆ ಗುರುತು ಮಾಡಿ (Check):'
                : 'Tick documents as you locate and verify them:'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                const all: Record<string, boolean> = {};
                applicableDocs.forEach((d) => (all[d.id] = true));
                setCheckedDocs(all);
              }}
              className="text-[11px] font-semibold text-teal-800 hover:text-teal-950 cursor-pointer"
            >
              {isKn ? 'ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ' : 'Select All'}
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => setCheckedDocs({})}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              {isKn ? 'ಮರುಹೊಂದಿಸಿ' : 'Clear'}
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {applicableDocs.map((doc) => {
            const isChecked = !!checkedDocs[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300/40'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-emerald-700 text-white'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {isKn ? doc.categoryKn : doc.categoryEn}
                    </span>
                    {doc.isMandatory && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {isKn ? 'ಕಡ್ಡಾಯ' : 'Mandatory'}
                      </span>
                    )}
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}
                    >
                      {isKn ? doc.titleKn : doc.titleEn}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isKn ? doc.tipKn : doc.tipEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statutory Protection Safeguards (IRDAI Section 45 & Zero Fees) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200/80 space-y-1 text-teal-950">
          <div className="flex items-center gap-1.5 font-bold text-teal-900">
            <Scale className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{isKn ? 'ಕಾನೂನುಬದ್ಧ ಸೆಕ್ಷನ್ 45 ರಕ್ಷಣೆ' : 'Section 45 Statutory Protection'}</span>
          </div>
          <p className="text-teal-800/90 text-[11px] leading-relaxed">
            {isKn
              ? 'ವಿಮಾ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 45 ರ ಅನ್ವಯ 3 ವರ್ಷ ಪೂರ್ಣಗೊಂಡ ಯಾವುದೇ ಜೀವ ವಿಮಾ ಪಾಲಿಸಿಯನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ನಿರಾಕರಿಸುವಂತಿಲ್ಲ (Incontestability Clause). ಕ್ಲೈಮ್ ಮೊತ್ತ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.'
              : 'Under Section 45 of the Insurance Act, no policy can be questioned or repudiated on any ground after 3 continuous years. Beneficiary proceeds remain legally safeguarded.'}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{isKn ? '100% ಉಚಿತ ಮಾರ್ಗದರ್ಶನ' : 'Zero Intermediary Commissions'}</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            {isKn
              ? 'ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥಕ್ಕೆ ಸೋಫಿಯಾ ರಾಣಿ ಅವರ ಸಹಾಯ ಸಂಪೂರ್ಣ ಉಚಿತವಾಗಿರುತ್ತದೆ. ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಕಮಿಷನ್ ನೀಡಬೇಡಿ. ನೇರವಾಗಿ ಅಧಿಕೃತ ಶಾಖೆಯ ಮೂಲಕವೇ ಹಣ ಜಮೆಯಾಗುತ್ತದೆ.'
              : 'Claim assistance provided by Sofia Rani is 100% complimentary. Never pay cash cuts or commissions. Funds are routed directly from SBI Life into the verified nominee bank account.'}
          </p>
        </div>
      </div>

      {/* Action Buttons: WhatsApp Assistance & Direct Branch Helpline */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={handleShareOnWhatsApp}
          className="w-full sm:flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>
            {isKn
              ? 'ಕ್ಲೈಮ್ ಸಹಾಯಕ್ಕಾಗಿ ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ವಾಟ್ಸಾಪ್ ಮಾಡಿ'
              : 'Get Dedicated Claim Guidance on WhatsApp'}
          </span>
        </button>

        <a
          href={`tel:${ADVISOR_CONFIG.contact.phone}`}
          className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರಿಗೆ ಕರೆ ಮಾಡಿ' : 'Call Sofia (+91 7899151230)'}</span>
        </a>

        {onBookAssistance && (
          <button
            type="button"
            onClick={onBookAssistance}
            className="w-full sm:w-auto py-3 px-5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isKn ? 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್' : 'Book In-Person Support'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClaimSettlementGuide;
