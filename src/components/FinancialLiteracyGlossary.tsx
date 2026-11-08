import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Search,
  HelpCircle,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  X,
  ExternalLink,
  Receipt,
  Clock,
  Heart,
  Lightbulb,
} from 'lucide-react';
import { Language, PublicRoute } from '../types';

export interface GlossaryTerm {
  id: string;
  termEn: string;
  termKn: string;
  category: 'basics' | 'legal' | 'tax' | 'servicing';
  shortDefEn: string;
  shortDefKn: string;
  detailedDefEn: string;
  detailedDefKn: string;
  exampleEn?: string;
  exampleKn?: string;
  importanceEn: string;
  importanceKn: string;
  relatedRoute?: PublicRoute;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'sum-assured',
    termEn: 'Sum Assured',
    termKn: 'ವಿಮಾ ಮೊತ್ತ (Sum Assured)',
    category: 'basics',
    shortDefEn: 'The guaranteed fixed amount the insurer pays to your nominee upon death or maturity.',
    shortDefKn: 'ಪಾಲಿಸಿದಾರರ ನಿಧನದ ನಂತರ ಅಥವಾ ಅವಧಿ ಪೂರ್ಣಗೊಂಡಾಗ ವಿಮಾ ಕಂಪನಿಯು ನಾಮಿನಿಗೆ ಪಾವತಿಸಲು ಒಪ್ಪಿಕೊಂಡಿರುವ ಗ್ಯಾರಂಟಿ ಮೊತ್ತ.',
    detailedDefEn:
      'Sum Assured is the contractual foundation of any life insurance policy. It represents the financial shield replacing your economic value. Unlike market-linked returns, standard sum assured in term insurance does not fluctuate with market indices.',
    detailedDefKn:
      'ವಿಮಾ ಪಾಲಿಸಿಯ ಕರಾರಿನ ಪ್ರಕಾರ ನಾಮಿನಿಗೆ ಸಿಗುವ ಖಚಿತ ರಕ್ಷಣಾ ಮೊತ್ತ. ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಗಳಿಂದ ಇದು ಬದಲಾಗುವುದಿಲ್ಲ. ನಿಮ್ಮ ಗೈರುಹಾಜರಿಯಲ್ಲಿ ಕುಟುಂಬದ ಸಾಲ ತೀರಿಸಲು ಮತ್ತು ಜೀವನ ನಡೆಸಲು ಇದು ಆಧಾರವಾಗುತ್ತದೆ.',
    exampleEn: 'If Anand buys a ₹1 Crore term plan, ₹1 Crore is the Sum Assured payable to his nominee.',
    exampleKn: 'ಉದಾಹರಣೆಗೆ: ಆನಂದ್ ₹1 ಕೋಟಿ ಟರ್ಮ್ ಪ್ಲಾನ್ ಖರೀದಿಸಿದರೆ, ಅವರ ಅಕಾಲಿಕ ನಿಧನದ ನಂತರ ನಾಮಿನಿಗೆ ಸಿಗುವ ₹1 ಕೋಟಿ ಹಣವೇ ವಿಮಾ ಮೊತ್ತ.',
    importanceEn: 'Must be at least 10–15 times your annual income to effectively replace living costs.',
    importanceKn: 'ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯದ ಕನಿಷ್ಠ 10 ರಿಂದ 15 ಪಟ್ಟು ವಿಮಾ ಮೊತ್ತವನ್ನು ಹೊಂದಿರುವುದು ಸುರಕ್ಷಿತ.',
    relatedRoute: 'family-protection',
  },
  {
    id: 'nominee',
    termEn: 'Nominee',
    termKn: 'ನಾಮಿನಿ (Nominee / ವಾರಸುದಾರ)',
    category: 'legal',
    shortDefEn: 'The legal person authorized to receive the insurance claim proceeds under Section 39.',
    shortDefKn: 'ಪಾಲಿಸಿದಾರರ ಮರಣದ ನಂತರ ವಿಮಾ ಪರಿಹಾರದ ಮೊತ್ತವನ್ನು ಸ್ವೀಕರಿಸಲು ಅಧಿಕೃತವಾಗಿ ಹೆಸರಿಸಲಾದ ವ್ಯಕ್ತಿ.',
    detailedDefEn:
      'Under Section 39 of the Insurance Act, a nominee is the custodian or beneficiary designated to claim policy proceeds. Under amended laws, close family members (spouse, children, parents) act as "Beneficial Nominees", possessing exclusive title to the money over other legal heirs.',
    detailedDefKn:
      'ವಿಮಾ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 39 ರ ಪ್ರಕಾರ ಕ್ಲೈಮ್ ಮೊತ್ತ ಪಡೆಯಲು ನಮೂದಿಸಲಾದ ವ್ಯಕ್ತಿ. ಪತ್ನಿ, ಮಕ್ಕಳು ಅಥವಾ ಪೋಷಕರನ್ನು ನಾಮಿನಿ ಮಾಡಿದಾಗ ಅವರು "ಬೆನಿಫಿಷಿಯಲ್ ನಾಮಿನಿ" ಆಗಿ ಕಾನೂನುಬದ್ಧ ಸಂಪೂರ್ಣ ಹಕ್ಕು ಹೊಂದಿರುತ್ತಾರೆ.',
    exampleEn: 'Naming your spouse as the primary nominee with 100% entitlement.',
    exampleKn: 'ಪತ್ನಿ ಅಥವಾ ಪತಿಯನ್ನು 100% ಪೂರ್ಣ ಹಕ್ಕಿನ ಪ್ರಮುಖ ನಾಮಿನಿಯಾಗಿ ನೇಮಿಸುವುದು.',
    importanceEn: 'Ensures immediate financial relief without requiring an expensive court succession certificate.',
    importanceKn: 'ನ್ಯಾಯಾಲಯದ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರದ ಅಲೆದಾಟವಿಲ್ಲದೆ ಕುಟುಂಬಕ್ಕೆ ತಕ್ಷಣ ಪರಿಹಾರ ಸಿಗುತ್ತದೆ.',
    relatedRoute: 'customer-help',
  },
  {
    id: 'appointee',
    termEn: 'Appointee',
    termKn: 'ಅಪಾಯಿಂಟಿ (Appointee / ಪಾಲಕ)',
    category: 'legal',
    shortDefEn: 'A trusted adult appointed to hold claim funds in trust if the nominee is under 18 years.',
    shortDefKn: 'ನಾಮಿನಿಯು 18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನವರಾಗಿದ್ದರೆ (ಅಪ್ರಾಪ್ತ ವಯಸ್ಕರು) ಅವರ ಪರವಾಗಿ ಹಣ ಸ್ವೀಕರಿಸಲು ನೇಮಿಸಲಾದ ಪಾಲಕ.',
    detailedDefEn:
      'Indian law prohibits minors (under 18) from executing financial contracts or receiving direct claim cheques. An Appointee holds the sum assured in trust for the minor until they attain majority.',
    detailedDefKn:
      '18 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳಿಗೆ ನೇರವಾಗಿ ಕ್ಲೈಮ್ ಹಣ ನೀಡಲು ಕಾನೂನಿನಲ್ಲಿ ಅವಕಾಶವಿಲ್ಲ. ಮಗು ಮೇಜರ್ ಆಗುವವರೆಗೆ ಹಣವನ್ನು ಮಗುವಿನ ಹಿತಾಸಕ್ತಿಗೆ ಬಳಸಲು ಒಬ್ಬ ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಯನ್ನು ಅಪಾಯಿಂಟಿ ಎಂದು ನೇಮಿಸುವುದು ಕಡ್ಡಾಯ.',
    exampleEn: 'Naming your 8-year-old child as nominee and designating your sibling/grandparent as Appointee.',
    exampleKn: '8 ವರ್ಷದ ಮಗುವನ್ನು ನಾಮಿನಿ ಮಾಡಿದಾಗ ಅಜ್ಜ ಅಥವಾ ಸೋದರನನ್ನು ಅಪಾಯಿಂಟಿ ಎಂದು ದಾಖಲಿಸುವುದು.',
    importanceEn: 'Prevents claim delays and court custody proceedings when insuring for young children.',
    importanceKn: 'ಮಕ್ಕಳು ಅಪ್ರಾಪ್ತರಾಗಿದ್ದಾಗ ಕ್ಲೈಮ್ ಮೊತ್ತ ತಡೆಹಿಡಿಯಲ್ಪಡದಂತೆ ಮಾಡುತ್ತದೆ.',
    relatedRoute: 'customer-help',
  },
  {
    id: 'grace-period',
    termEn: 'Grace Period',
    termKn: 'ರಿಯಾಯಿತಿ ಕಾಲಾವಧಿ (Grace Period)',
    category: 'servicing',
    shortDefEn: 'Extra 15–30 days allowed past the premium due date during which full life cover remains active.',
    shortDefKn: 'ಪ್ರೀಮಿಯಂ ಕಟ್ಟುವ ದಿನಾಂಕ ಮುಗಿದ ನಂತರವೂ ಪಾಲಿಸಿ ಚಾಲ್ತಿಯಲ್ಲಿರಲು ನೀಡಲಾಗುವ ಹೆಚ್ಚುವರಿ 15-30 ದಿನಗಳ ಕಾಲಾವಕಾಶ.',
    detailedDefEn:
      'If you miss your premium due date, the insurer provides a statutory grace period (15 days for monthly mode, 30 days for quarterly/half-yearly/yearly). If an unfortunate demise occurs during the grace period, the claim is still honored in full (minus the unpaid premium).',
    detailedDefKn:
      'ನಿಗದಿತ ದಿನಾಂಕಕ್ಕೆ ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದಲ್ಲಿ ಕಂಪನಿಯು ನೀಡುವ ರಿಯಾಯಿತಿ ಕಾಲಾವಧಿ (ವಾರ್ಷಿಕ ಕಂತಿಗೆ 30 ದಿನಗಳು). ಈ ಸಮಯದಲ್ಲಿ ದುರ್ಘಟನೆ ಸಂಭವಿಸಿದರೂ ಸಂಪೂರ್ಣ ಕ್ಲೈಮ್ ಮೊತ್ತ ಕುಟುಂಬಕ್ಕೆ ದೊರೆಯುತ್ತದೆ.',
    exampleEn: 'If premium is due on Oct 1st, annual mode allows payment until Oct 31st with zero penalty.',
    exampleKn: 'ಅಕ್ಟೋಬರ್ 1 ರ ಗಡುವಿಗೆ ಹಣ ಕಟ್ಟದಿದ್ದರೂ ಅಕ್ಟೋಬರ್ 31 ರವರೆಗೆ ಪಾಲಿಸಿ ಚಾಲ್ತಿಯಲ್ಲಿದ್ದು ಯಾವುದೇ ದಂಡವಿಲ್ಲದೆ ಪಾವತಿಸಬಹುದು.',
    importanceEn: 'Prevents sudden policy lapse due to short-term liquidity crunches or bank holidays.',
    importanceKn: 'ಹಣದ ಕೊರತೆ ಅಥವಾ ರಜಾ ದಿನಗಳ ಕಾರಣದಿಂದ ಪಾಲಿಸಿ ದಿಢೀರನೆ ರದ್ದಾಗದಂತೆ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ.',
    relatedRoute: 'customer-help',
  },
  {
    id: 'section-80c',
    termEn: 'Section 80C',
    termKn: 'ಸೆಕ್ಷನ್ 80C ತೆರಿಗೆ ಕಡಿತ (Section 80C)',
    category: 'tax',
    shortDefEn: 'Income tax deduction allowing up to ₹1.5 Lakh per year for life insurance premiums.',
    shortDefKn: 'ಜೀವ ವಿಮಾ ಪ್ರೀಮಿಯಂ ಮೇಲೆ ವಾರ್ಷಿಕ ₹1.50 ಲಕ್ಷದವರೆಗೆ ಆದಾಯ ತೆರಿಗೆ ಕಡಿತ ಪಡೆಯಬಹುದಾದ ಕಾನೂನು ನಿಯಮ.',
    detailedDefEn:
      'Section 80C of the Income Tax Act allows taxpayers under the Old Tax Regime to deduct life insurance premiums paid for self, spouse, and children, up to ₹1,50,000 annually, reducing taxable income.',
    detailedDefKn:
      'ಹಳೆಯ ತೆರಿಗೆ ಪದ್ಧತಿಯಲ್ಲಿ (Old Tax Regime) ಪಾಲಿಸಿದಾರರು ತಮಗೆ, ಪತಿಗೆ/ಪತ್ನಿಗೆ ಮತ್ತು ಮಕ್ಕಳಿಗೆ ಪಾವತಿಸುವ ಜೀವ ವಿಮಾ ಪ್ರೀಮಿಯಂ ಮೊತ್ತವನ್ನು ವಾರ್ಷಿಕ ₹1.5 ಲಕ್ಷದ ಮಿತಿಯೊಳಗೆ ತೆರಿಗೆ ಮುಕ್ತಗೊಳಿಸಿಕೊಳ್ಳಬಹುದು.',
    exampleEn: 'Investing ₹50,000 in a policy saves up to ₹15,600 in tax for a person in the 30% tax bracket.',
    exampleKn: '30% ತೆರಿಗೆ ಸ್ಲ್ಯಾಬ್‌ನಲ್ಲಿರುವ ವ್ಯಕ್ತಿ ₹50,000 ಪ್ರೀಮಿಯಂ ಪಾವತಿಸಿದಾಗ ₹15,600 ರಷ್ಟು ತೆರಿಗೆ ಹಣ ಉಳಿತಾಯವಾಗುತ್ತದೆ.',
    importanceEn: 'Lowers the net out-of-pocket cost of life protection significantly.',
    importanceKn: 'ಸರ್ಕಾರದ ರಿಯಾಯಿತಿಯೊಂದಿಗೆ ರಕ್ಷಣಾ ಪಾಲಿಸಿಯ ವಾಸ್ತವಿಕ ವೆಚ್ಚ ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.',
    relatedRoute: 'tools',
  },
  {
    id: 'section-10-10d',
    termEn: 'Section 10(10D)',
    termKn: 'ಸೆಕ್ಷನ್ 10(10D) ತೆರಿಗೆ ಮುಕ್ತ ಲಾಭ (Section 10(10D))',
    category: 'tax',
    shortDefEn: '100% income tax exemption on death claim proceeds and qualifying maturity payouts.',
    shortDefKn: 'ನಾಮಿನಿಗೆ ಸಿಗುವ ಡೆತ್ ಬೆನಿಫಿಟ್ ಕ್ಲೈಮ್ ಮತ್ತು ಪಾಲಿಸಿಯ ಮೆಚುರಿಟಿ ಮೊತ್ತಕ್ಕೆ ಸಂಪೂರ್ಣ ತೆರಿಗೆ ವಿನಾಯಿತಿ.',
    detailedDefEn:
      'Under Section 10(10D), any sum received under a life insurance policy (including accrued bonus and death benefit) is completely exempt from income tax, provided the annual premium does not exceed 10% of the sum assured.',
    detailedDefKn:
      'ಜೀವ ವಿಮಾ ಪಾಲಿಸಿಯಿಂದ ಬರುವ ಕ್ಲೈಮ್ ಮೊತ್ತ ಮತ್ತು ಮೆಚುರಿಟಿ ಮೊತ್ತಕ್ಕೆ ಸರ್ಕಾರ ಯಾವುದೇ ಆದಾಯ ತೆರಿಗೆ ವಿಧಿಸುವುದಿಲ್ಲ (Exempt-Exempt-Exempt EEE ಸ್ಥಾನಮಾನ).',
    exampleEn: 'Nominee receiving ₹1 Crore death claim pays ₹0 income tax on the entire proceeds.',
    exampleKn: 'ನಾಮಿನಿಯು ಸ್ವೀಕರಿಸುವ ₹1 ಕೋಟಿ ಕ್ಲೈಮ್ ಮೊತ್ತಕ್ಕೆ ₹0 ತೆರಿಗೆ (ಸಂಪೂರ್ಣ ಮೊತ್ತ ಕುಟುಂಬದ ಕೈಗೆ ತಲುಪುತ್ತದೆ).',
    importanceEn: 'Ensures your family receives the entire financial shield without government tax deductions.',
    importanceKn: 'ಕುಟುಂಬದ ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಯಾವುದೇ ತೆರಿಗೆ ಕಡಿತವಿಲ್ಲದೆ ಪೂರ್ಣ ಮೊತ್ತ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
    relatedRoute: 'tools',
  },
  {
    id: 'section-45',
    termEn: 'Section 45 (Incontestability)',
    termKn: 'ಸೆಕ್ಷನ್ 45 (3 ವರ್ಷಗಳ ರಕ್ಷಣೆ - Section 45)',
    category: 'legal',
    shortDefEn: 'Law stating no life insurance policy can be questioned or rejected after 3 continuous years.',
    shortDefKn: 'ಪಾಲಿಸಿ ಪಡೆದು 3 ವರ್ಷ ಕಳೆದ ನಂತರ ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಕ್ಲೈಮ್ ನಿರಾಕರಿಸುವಂತಿಲ್ಲ ಎಂಬ ಕಾನೂನು ರಕ್ಷಣೆ.',
    detailedDefEn:
      'Section 45 of the Insurance Act provides absolute incontestability. Once a policy has completed 3 years from issuance or revival, the insurer cannot repudiate a death claim on any grounds whatsoever (even non-disclosure).',
    detailedDefKn:
      'ಭಾರತೀಯ ವಿಮಾ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 45 ರ ಪ್ರಕಾರ, ಪಾಲಿಸಿ ಜಾರಿಯಾಗಿ 3 ವರ್ಷ ಪೂರ್ಣಗೊಂಡ ಬಳಿಕ ಕಂಪನಿಯು ಯಾವುದೇ ಕಾರಣ ನೀಡಿ ಕ್ಲೈಮ್ ಅನ್ನು ತಿರಸ್ಕರಿಸುವಂತಿಲ್ಲ. ಇದು ನಾಮಿನಿಗೆ ಅತ್ಯುನ್ನತ ಕಾನೂನು ಭದ್ರತೆ ನೀಡುತ್ತದೆ.',
    exampleEn: 'A claim arising after 4 years of active policy cannot be rejected by the insurer.',
    exampleKn: 'ಪಾಲಿಸಿಯ 4ನೇ ಅಥವಾ 5ನೇ ವರ್ಷದಲ್ಲಿ ಮರಣ ಸಂಭವಿಸಿದರೆ ಕಂಪನಿಯು ದಾಖಲೆಗಳ ನೆಪವೊಡ್ಡಿ ಕ್ಲೈಮ್ ನಿರಾಕರಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.',
    importanceEn: 'Provides total peace of mind that genuine premiums translate to irrevocable family security.',
    importanceKn: 'ನಿಮ್ಮ ಕುಟುಂಬದ ರಕ್ಷಣೆ 100% ಖಾತರಿಯಾಗಿರುತ್ತದೆ ಎಂಬ ಪರಮ ನೆಮ್ಮದಿ ನೀಡುತ್ತದೆ.',
    relatedRoute: 'customer-help',
  },
  {
    id: 'free-look-period',
    termEn: 'Free-Look Period',
    termKn: 'ಉಚಿತ ಪರಿಶೀಲನಾ ಅವಧಿ (Free-Look Period)',
    category: 'servicing',
    shortDefEn: '15 to 30-day window after receiving policy bond to cancel for full refund if unsatisfied with terms.',
    shortDefKn: 'ಪಾಲಿಸಿ ಬಾಂಡ್ ಕೈ ಸೇರಿದ ನಂತರ ನಿಯಮಗಳು ಇಷ್ಟವಾಗದಿದ್ದರೆ ಹಣ ಮರಳಿ ಪಡೆದು ರದ್ದುಗೊಳಿಸಲು ನೀಡುವ 15-30 ದಿನಗಳ ಕಾಲಾವಕಾಶ.',
    detailedDefEn:
      'IRDAI mandates a 15-day free-look period for physical policies (30 days for digital/distance marketing). You can review all clauses, and if unsatisfied, return the policy for a full refund minus stamp duty and medical test charges.',
    detailedDefKn:
      'ಪಾಲಿಸಿ ಬಾಂಡ್ ಪತ್ರ ನಿಮ್ಮ ಕೈ ಸೇರಿದ ದಿನದಿಂದ 15 ರಿಂದ 30 ದಿನಗಳವರೆಗೆ ಷರತ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು. ಪಾಲಿಸಿ ಇಷ್ಟವಾಗದಿದ್ದರೆ ರದ್ದುಪಡಿಸಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಪ್ರೀಮಿಯಂ ಹಣವನ್ನು ಮರಳಿ ಪಡೆಯಬಹುದು.',
    exampleEn: 'Reviewing the printed document at home and discovering an unsuitable clause allows 100% cancellation.',
    exampleKn: 'ಮನೆಯಲ್ಲಿ ಪಾಲಿಸಿ ಬಾಂಡ್ ಓದಿದಾಗ ಯಾವುದೇ ಷರತ್ತು ಸರಿಬಾರದಿದ್ದರೆ 15 ದಿನಗಳಲ್ಲಿ ಹಣ ಮರಳಿ ಪಡೆಯುವ ಹಕ್ಕು.',
    importanceEn: 'Eliminates mis-selling risk and buyer remorse.',
    importanceKn: 'ಯಾರಾದರೂ ತಪ್ಪು ಮಾಹಿತಿ ನೀಡಿ ಪಾಲಿಸಿ ಮಾಡಿಸಿದ್ದರೂ ಗ್ರಾಹಕರ ಹಣ ನಷ್ಟವಾಗದಂತೆ ರಕ್ಷಿಸುತ್ತದೆ.',
    relatedRoute: 'customer-help',
  },
  {
    id: 'human-life-value',
    termEn: 'Human Life Value (HLV)',
    termKn: 'ಮಾನವ ಜೀವ ಮೌಲ್ಯ (HLV - Human Life Value)',
    category: 'basics',
    shortDefEn: 'Mathematical measure of your future earning power to calculate the required life cover.',
    shortDefKn: 'ದುಡಿಯುವ ವ್ಯಕ್ತಿಯ ಭವಿಷ್ಯದ ಆದಾಯ ಗಳಿಸುವ ಸಾಮರ್ಥ್ಯದ ಆಧಾರದ ಮೇಲೆ ಅಗತ್ಯವಿರುವ ಜೀವ ವಿಮಾ ರಕ್ಷಣೆಯ ಲೆಕ್ಕಾಚಾರ.',
    detailedDefEn:
      'Human Life Value calculates the present capitalized value of the net economic income you would contribute to your dependents across your remaining working career, adjusted for inflation and debt obligations.',
    detailedDefKn:
      'ನಿವೃತ್ತಿಯವರೆಗೆ ನೀವು ದುಡಿದು ಕುಟುಂಬಕ್ಕೆ ತಂದುಕೊಡಬಹುದಾದ ನಿವ್ವಳ ಆದಾಯದ ಮೌಲ್ಯ. ಕುಟುಂಬದ ಸಾಲಗಳು ಮತ್ತು ಮಾಸಿಕ ಖರ್ಚುಗಳನ್ನು ನಿಭಾಯಿಸಲು ಎಷ್ಟು ವಿಮೆ ಬೇಕು ಎಂಬುದನ್ನು ಇದು ನಿಖರವಾಗಿ ತಿಳಿಸುತ್ತದೆ.',
    exampleEn: 'A 35-year-old earning ₹8 Lakh/year supporting spouse and two children has an estimated HLV of ~₹1.2 Crore.',
    exampleKn: '35 ವರ್ಷದ ₹8 ಲಕ್ಷ ವಾರ್ಷಿಕ ಆದಾಯವಿರುವ ವ್ಯಕ್ತಿಗೆ ಸುಮಾರು ₹1.2 ಕೋಟಿ ಮೊತ್ತದ ಜೀವ ರಕ್ಷಣೆ (HLV) ಅಗತ್ಯವಿರುತ್ತದೆ.',
    importanceEn: 'Prevents under-insurance (buying an inadequate ₹5 Lakh cover when family needs ₹1 Crore).',
    importanceKn: 'ಕುಟುಂಬಕ್ಕೆ ₹1 ಕೋಟಿ ಬೇಕಾಗಿರುವಾಗ ಕೇವಲ ₹5 ಲಕ್ಷದ ಅಲ್ಪ ವಿಮೆ ತೆಗೆದುಕೊಂಡು ಮೋಸಹೋಗುವುದನ್ನು ತಪ್ಪಿಸುತ್ತದೆ.',
    relatedRoute: 'tools',
  },
  {
    id: 'rider',
    termEn: 'Policy Rider',
    termKn: 'ವಿಮಾ ರೈಡರ್ (Rider / ಹೆಚ್ಚುವರಿ ಸೌಲಭ್ಯ)',
    category: 'basics',
    shortDefEn: 'Optional add-on benefit attached to your base policy for critical illness or accidental death.',
    shortDefKn: 'ಮೂಲ ಪಾಲಿಸಿಯ ಜೊತೆಗೆ ಕಡಿಮೆ ವೆಚ್ಚದಲ್ಲಿ ಸೇರಿಸಿಕೊಳ್ಳಬಹುದಾದ ಹೆಚ್ಚುವರಿ ಅಪಘಾತ ಅಥವಾ ಗಂಭೀರ ಕಾಯಿಲೆಯ ರಕ್ಷಣಾ ಸೌಲಭ್ಯ.',
    detailedDefEn:
      'Riders provide supplementary risk coverage without purchasing a separate policy. Common riders include Accidental Death Benefit (paying double sum assured on accident), Critical Illness Rider, and Waiver of Premium.',
    detailedDefKn:
      'ಕಡಿಮೆ ಪ್ರೀಮಿಯಂನಲ್ಲಿ ಹೆಚ್ಚುವರಿ ರಕ್ಷಣೆ ನೀಡುವ ಸೌಲಭ್ಯ. ಅಪಘಾತ ಮರಣ ಪರಿಹಾರ ರೈಡರ್, ಗಂಭೀರ ಅನಾರೋಗ್ಯ ರೈಡರ್ (ಕ್ಯಾನ್ಸರ್, ಹಾರ್ಟ್ ಅಟ್ಯಾಕ್ ಇತ್ಯಾದಿ) ಹಾಗೂ ಪ್ರೀಮಿಯಂ ಮನ್ನಾ ರೈಡರ್ (Waiver of Premium) ಪ್ರಮುಖವಾದವು.',
    exampleEn: 'Adding an Accidental Death Rider pays an extra ₹50 Lakhs if demise occurs due to a road accident.',
    exampleKn: 'ಅಪಘಾತ ರೈಡರ್ ಸೇರಿಸಿದ್ದರೆ, ಸಾಮಾನ್ಯ ವಿಮೆಯ ಜೊತೆಗೆ ಹೆಚ್ಚುವರಿ ₹50 ಲಕ್ಷ ಹಣ ನಾಮಿನಿಗೆ ದೊರೆಯುತ್ತದೆ.',
    importanceEn: 'Extends comprehensive protection against permanent disability and grave illnesses at minimal cost.',
    importanceKn: 'ಅಂಗವೈಕಲ್ಯ ಅಥವಾ ಅನಿರೀಕ್ಷಿತ ಅಪಘಾತಗಳ ವಿರುದ್ಧ ಅಲ್ಪ ವೆಚ್ಚದಲ್ಲಿ ದ್ವಿಗುಣ ಭದ್ರತೆ ನೀಡುತ್ತದೆ.',
    relatedRoute: 'family-protection',
  },
  {
    id: 'waiver-of-premium',
    termEn: 'Waiver of Premium (WOP)',
    termKn: 'ಪ್ರೀಮಿಯಂ ಮನ್ನಾ ಸೌಲಭ್ಯ (Waiver of Premium - WOP)',
    category: 'basics',
    shortDefEn: 'Clause waiving future premiums while keeping policy benefits active if the parent/proposer passes away.',
    shortDefKn: 'ಪೋಷಕರು ನಿಧನರಾದರೆ ಮುಂದಿನ ಎಲ್ಲಾ ಪ್ರೀಮಿಯಂ ಕಂತುಗಳನ್ನು ಕಂಪನಿಯೇ ಮನ್ನಾ ಮಾಡಿ, ಮಗುವಿನ ಶಿಕ್ಷಣ ನಿಧಿಯನ್ನು ಮುಂದುವರಿಸುವ ರಕ್ಷಣೆ.',
    detailedDefEn:
      'Critical for child education plans. If the earning parent dies or suffers total permanent disability, all remaining premium installments are paid by the insurance company, and the maturity fund pays out as originally scheduled.',
    detailedDefKn:
      'ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಯೋಜನೆಗಳಿಗೆ ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ಸೌಲಭ್ಯ. ಪೋಷಕರು ನಿಧನರಾದರೆ ಮಗು ಅಥವಾ ತಾಯಿ ಪ್ರೀಮಿಯಂ ಕಟ್ಟಬೇಕಾಗಿಲ್ಲ. ಕಂಪನಿಯೇ ಎಲ್ಲಾ ಕಂತುಗಳನ್ನು ಭರಿಸಿ, ನಿಗದಿತ ವಯಸ್ಸಿನಲ್ಲಿ ಕಾಲೇಜು ಫೀಸ್ ಹಣವನ್ನು ಪೂರ್ಣವಾಗಿ ನೀಡುತ್ತದೆ.',
    exampleEn: 'Parent dies in year 4 of a 15-year education plan; the remaining 11 years of premiums are waived.',
    exampleKn: '15 ವರ್ಷದ ಪಾಲಿಸಿಯಲ್ಲಿ 4ನೇ ವರ್ಷ ತಂದೆ ತೀರಿಕೊಂಡರೆ, ಉಳಿದ 11 ವರ್ಷಗಳ ಪ್ರೀಮಿಯಂ ಅನ್ನು ಕಂಪನಿಯೇ ಭರಿಸುತ್ತದೆ.',
    importanceEn: 'Guarantees the child’s college fund matures unconditionally without burdening the widowed spouse.',
    importanceKn: 'ತಂದೆ ಇಲ್ಲದಿದ್ದರೂ ಮಗುವಿನ ವೈದ್ಯಕೀಯ ಅಥವಾ ಎಂಜಿನಿಯರಿಂಗ್ ಶಿಕ್ಷಣದ ಕನಸು ಯಾವುದೇ ಅಡೆತಡೆಯಿಲ್ಲದೆ ನನಸಾಗುತ್ತದೆ.',
    relatedRoute: 'children-education',
  },
  {
    id: 'revival',
    termEn: 'Policy Revival',
    termKn: 'ಸ್ಥಗಿತ ಪಾಲಿಸಿ ಮರುಚಾಲನೆ (Policy Revival)',
    category: 'servicing',
    shortDefEn: 'Restoring a lapsed policy to full life cover by paying unpaid arrears with interest.',
    shortDefKn: 'ಕಂತು ಕಟ್ಟದೆ ನಿಂತುಹೋದ ಪಾಲಿಸಿಯನ್ನು ಬಾಕಿ ಹಣ ಮತ್ತು ಬಡ್ಡಿ ಪಾವತಿಸಿ ಮರಳಿ ಸಕ್ರಿಯಗೊಳಿಸುವ ಪ್ರಕ್ರಿಯೆ.',
    detailedDefEn:
      'A policy lapses when premiums are not paid within the grace period. Underwriters permit revival within a 5-year window upon payment of arrears, concessional interest, and proof of good health (DGH).',
    detailedDefKn:
      'ರಿಯಾಯಿತಿ ಅವಧಿ ಮುಗಿದು ಲ್ಯಾಪ್ಸ್ ಆದ ಪಾಲಿಸಿಯನ್ನು 5 ವರ್ಷಗಳ ಒಳಗಾಗಿ ಬಾಕಿ ಕಂತುಗಳು ಹಾಗೂ ಕಡಿಮೆ ಬಡ್ಡಿಯನ್ನು ಪಾವತಿಸಿ ಮತ್ತೆ ಚಾಲನೆಗೊಳಿಸಬಹುದು. ಇದರಿಂದ ಈ ಹಿಂದೆ ಕಟ್ಟಿದ ಹಣ ವ್ಯರ್ಥವಾಗುವುದಿಲ್ಲ.',
    exampleEn: 'Reviving a 2-year lapsed policy during SBI Life’s special revival campaign with 25% interest discount.',
    exampleKn: 'ಕಂಪನಿಯ ವಿಶೇಷ ರಿವೈವಲ್ ಅಭಿಯಾನದಲ್ಲಿ ದಂಡದ ಬಡ್ಡಿಯಲ್ಲಿ 25% ರಿಯಾಯಿತಿ ಪಡೆದು ಪಾಲಿಸಿ ಮರುಚಾಲನೆ ಮಾಡುವುದು.',
    importanceEn: 'Cheaper than buying a new policy at an older age where mortality premium would be much higher.',
    importanceKn: 'ವಯಸ್ಸಾದ ಮೇಲೆ ಹೊಸ ಪಾಲಿಸಿ ತೆಗೆದುಕೊಂಡರೆ ದುಬಾರಿಯಾಗುತ್ತದೆ; ಹಳೆಯ ಪಾಲಿಸಿ ಮರುಚಾಲನೆ ಮಾಡುವುದೇ ಲಾಭದಾಯಕ.',
    relatedRoute: 'customer-help',
  },
];

interface FinancialLiteracyGlossaryProps {
  language: Language;
  onNavigate?: (route: PublicRoute) => void;
  className?: string;
  initialSelectedTermId?: string;
  externalSelectedTermId?: string | null;
  onCloseModal?: () => void;
}

export const FinancialLiteracyGlossary: React.FC<FinancialLiteracyGlossaryProps> = ({
  language,
  onNavigate,
  className = '',
  initialSelectedTermId,
  externalSelectedTermId,
  onCloseModal,
}) => {
  const isKn = language === 'kn';
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTerm, setActiveModalTerm] = useState<GlossaryTerm | null>(
    initialSelectedTermId
      ? GLOSSARY_TERMS.find((t) => t.id === initialSelectedTermId) || null
      : null
  );

  // Sync when external term is passed from in-text clicks
  React.useEffect(() => {
    if (externalSelectedTermId) {
      const match = GLOSSARY_TERMS.find((t) => t.id === externalSelectedTermId);
      if (match) {
        setActiveModalTerm(match);
      }
    }
  }, [externalSelectedTermId]);

  const handleCloseModal = () => {
    setActiveModalTerm(null);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  // Filtered terms based on search & category
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        term.termEn.toLowerCase().includes(q) ||
        term.termKn.toLowerCase().includes(q) ||
        term.shortDefEn.toLowerCase().includes(q) ||
        term.shortDefKn.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
            <BookMarked className="w-4 h-4 text-teal-700" />
            <span>{isKn ? 'ವಿಮಾ ಸಾಕ್ಷರತಾ ಕೋಶ' : 'Financial Literacy Dictionary'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isKn ? 'ವಿಮಾ ಪರಿಭಾಷಾ ಕೋಶ (Glossary of Key Terms)' : 'Essential Life Insurance Terms Demystified'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isKn
              ? 'ಕ್ಲಿಷ್ಟಕರವಾದ ವಿಮಾ ಪದಗಳನ್ನು ಸಾಮಾನ್ಯ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಯಾವುದೇ ಪದದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ಸಂಪೂರ್ಣ ವಿವರ ಮತ್ತು ಉದಾಹರಣೆಗಳನ್ನು ನೋಡಿ.'
              : 'Plain-English and Kannada definitions for everyday insurance concepts. Click any term to see real-world examples, legal rights, and actionable tips.'}
          </p>
        </div>

        {/* Term Count */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-center shrink-0 self-start sm:self-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            {isKn ? 'ಪದಕೋಶ ಸಂಗ್ರಹ' : 'Glossary Size'}
          </span>
          <span className="text-base font-bold text-teal-900 tabular-nums">
            {GLOSSARY_TERMS.length} {isKn ? 'ಪ್ರಮುಖ ಪದಗಳು' : 'Core Terms'}
          </span>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isKn ? 'ಪದ ಅಥವಾ ವಿವರಣೆ ಹುಡುಕಿ (ಉದಾ: ನಾಮಿನಿ, 80C)...' : 'Search terms (e.g., Sum Assured, Nominee, 80C)...'}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-teal-700 focus:outline-hidden text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
          {[
            { id: 'all', labelEn: 'All Terms', labelKn: 'ಎಲ್ಲವೂ' },
            { id: 'basics', labelEn: 'Policy Basics', labelKn: 'ಮೂಲಭೂತ' },
            { id: 'legal', labelEn: 'Legal & Rights', labelKn: 'ಕಾನೂನು & ಹಕ್ಕು' },
            { id: 'tax', labelEn: 'Tax Savings', labelKn: 'ತೆರಿಗೆ ಉಳಿತಾಯ' },
            { id: 'servicing', labelEn: 'Servicing', labelKn: 'ಪಾಲಿಸಿ ಸೇವೆ' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`py-1.5 px-3 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isKn ? cat.labelKn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            onClick={() => setActiveModalTerm(term)}
            className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold uppercase tracking-wider text-teal-800 text-[10px]">
                  {term.category.toUpperCase()}
                </span>
                <span className="text-slate-400 group-hover:text-teal-700 font-medium flex items-center gap-1 transition-colors">
                  <span>{isKn ? 'ವಿವರ' : 'Explain'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                {isKn ? term.termKn : term.termEn}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {isKn ? term.shortDefKn : term.shortDefEn}
              </p>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-800 font-semibold">
              <span className="truncate">
                💡 {isKn ? 'ಉದಾಹರಣೆ & ನಿಯಮಗಳು' : 'Real-world example'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Search Result */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">
            {isKn ? 'ಯಾವುದೇ ಪದ ಕಂಡುಬಂದಿಲ್ಲ' : 'No matching terms found'}
          </h4>
          <p className="text-xs text-slate-500">
            {isKn ? 'ದಯವಿಟ್ಟು ಬೇರೆ ಪದವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ.' : 'Try adjusting your search query or reset the category filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs text-teal-800 font-bold hover:underline cursor-pointer"
          >
            {isKn ? 'ಎಲ್ಲಾ ಪದಗಳನ್ನು ತೋರಿಸಿ' : 'Reset search & view all terms'}
          </button>
        </div>
      )}

      {/* Pop-up Dictionary Detail Modal */}
      {activeModalTerm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  {activeModalTerm.category.toUpperCase()} · DICTIONARY
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {isKn ? activeModalTerm.termKn : activeModalTerm.termEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Explanation Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-900 block">
                  {isKn ? 'ಸರಳ ವ್ಯಾಖ್ಯಾನ (Plain Definition):' : 'Plain-Language Meaning:'}
                </span>
                <p className="text-slate-800">
                  {isKn ? activeModalTerm.detailedDefKn : activeModalTerm.detailedDefEn}
                </p>
              </div>

              {/* Real World Example */}
              {(activeModalTerm.exampleEn || activeModalTerm.exampleKn) && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>{isKn ? 'ನೈಜ ಜೀವನದ ಉದಾಹರಣೆ:' : 'Real-Life Scenario:'}</span>
                  </span>
                  <p className="text-slate-600 text-xs">
                    {isKn ? activeModalTerm.exampleKn : activeModalTerm.exampleEn}
                  </p>
                </div>
              )}

              {/* Family Importance */}
              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-1">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isKn ? 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಇದು ಏಕೆ ಮುಖ್ಯ?' : 'Why This Matters for Your Family:'}</span>
                </span>
                <p className="text-emerald-900 text-xs">
                  {isKn ? activeModalTerm.importanceKn : activeModalTerm.importanceEn}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>

              {activeModalTerm.relatedRoute && onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    const route = activeModalTerm.relatedRoute!;
                    handleCloseModal();
                    onNavigate(route);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-teal-800 text-white text-xs font-semibold rounded-xl hover:bg-teal-900 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{isKn ? 'ಸಂಬಂಧಿತ ಯೋಜನಾ ಸಾಧನ ನೋಡಿ' : 'Explore Related Planning Tool'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLiteracyGlossary;
