import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
  onBookConsultation?: () => void;
}

interface ChecklistItem {
  id: string;
  questionKn: string;
  questionEn: string;
  descriptionKn: string;
  descriptionEn: string;
  recommendationKn: string;
  recommendationEn: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'nominee',
    questionKn: 'ನಿಮ್ಮ ಪಾಲಿಸಿಯಲ್ಲಿ ನಾಮಿನಿ (ವಾರಸುದಾರರ) ಹೆಸರು ಮತ್ತು ಸಂಬಂಧ ಸರಿಯಾಗಿದೆಯೇ?',
    questionEn: 'Are your policy nominee details and relationship updated correctly?',
    descriptionKn: 'ಹಳೆಯ ಪಾಲಿಸಿಗಳಲ್ಲಿ ಮದುವೆಯ ನಂತರ ಅಥವಾ ಮಗುವಿನ ಜನನದ ನಂತರ ನಾಮಿನಿ ವಿವರಗಳನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡದೆ ಇರುವುದು ಕ್ಲೈಮ್ ಸಮಯದಲ್ಲಿ ತೊಂದರೆ ಉಂಟುಮಾಡಬಹುದು.',
    descriptionEn: 'Outdated nominees (e.g. not updated post-marriage or childbirth) can complicate claim settlements significantly.',
    recommendationKn: 'ನಾಮಿನಿಯ ಇತ್ತೀಚಿನ ವಯಸ್ಸು, ವಿಳಾಸ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು ಸರಿಯಾಗಿವೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    recommendationEn: 'Ensure the nominee’s legal name matches their Aadhaar/PAN, and assign a major appointee if the nominee is a minor.',
  },
  {
    id: 'dates',
    questionKn: 'ಪ್ರೀಮಿಯಂ ಪಾವತಿಯ ನಿಖರ ದಿನಾಂಕ ಮತ್ತು ಗ್ರೇಸ್ ಪೀರಿಯಡ್ (Grace Period) ನಿಮಗೆ ತಿಳಿದಿದೆಯೇ?',
    questionEn: 'Do you know your exact premium due dates and grace period limits?',
    descriptionKn: 'ಪ್ರೀಮಿಯಂ ಕಟ್ಟಲು ತಡವಾದರೆ ಪಾಲಿಸಿ ಲ್ಯಾಪ್ಸ್ (Lapse) ಆಗಿ ಜೀವ ರಕ್ಷಣೆ ರದ್ದಾಗುವ ಅಪಾಯವಿರುತ್ತದೆ.',
    descriptionEn: 'Delaying beyond the 30-day grace period can cause the policy to lapse, voiding death protection.',
    recommendationKn: 'ಆಟೋ-ಡೆಬಿಟ್ (NACH/e-mandate) ಸಕ್ರಿಯಗೊಳಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಮೊಬೈಲ್ ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ಜ್ಞಾಪನೆ ಇಟ್ಟುಕೊಳ್ಳಿ.',
    recommendationEn: 'Enable automatic bank mandates (e-NACH) or mark recurring calendar alerts 15 days before the due date.',
  },
  {
    id: 'coverage',
    questionKn: 'ನಿಮ್ಮ ಪಾಲಿಸಿಯ ವಿಮಾ ರಕ್ಷಣಾ ಮೊತ್ತ (Sum Assured) ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸಾಕಷ್ಟಿದೆಯೇ?',
    questionEn: 'Does the actual Sum Assured cover your family’s real living costs and debt?',
    descriptionKn: 'ಅನೇಕ ಜನರು ₹1 ಲಕ್ಷ ಅಥವಾ ₹2 ಲಕ್ಷದ ಸಣ್ಣ ಪಾಲಿಸಿಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಇದೆ ಎಂದು ಭಾವಿಸುತ್ತಾರೆ, ಆದರೆ ಇಂದಿನ ಜೀವನ ವೆಚ್ಚಕ್ಕೆ ಇದು ಸಾಲುವುದಿಲ್ಲ.',
    descriptionEn: 'Many families hold small policies of ₹1–2 Lakhs, which fall drastically short of replacing household income.',
    recommendationKn: 'ಕನಿಷ್ಠ ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯದ 10 ರಿಂದ 15 ಪಟ್ಟು ರಕ್ಷಣಾ ಮೊತ್ತ ಇರುವ ಟರ್ಮ್ ಪಾಲಿಸಿಯನ್ನು ಹೊಂದಲು ಆದ್ಯತೆ ನೀಡಿ.',
    recommendationEn: 'Target a life cover of at least 10–15 times your annual family expenses via pure term protection.',
  },
  {
    id: 'benefits',
    questionKn: 'ಗ್ಯಾರಂಟಿಡ್ (ಖಾತರಿಯ) ಸೌಲಭ್ಯಗಳು ಮತ್ತು ನಾನ್-ಗ್ಯಾರಂಟಿಡ್ ಬೋನಸ್‌ಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ ಸ್ಪಷ್ಟವಾಗಿದೆಯೇ?',
    questionEn: 'Do you clearly understand guaranteed benefits versus non-guaranteed bonuses?',
    descriptionKn: 'ಕೆಲವು ಪಾಲಿಸಿಗಳಲ್ಲಿ ಬೋನಸ್ ಕಂಪನಿಯ ಲಾಭಾಂಶದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ನಿಖರ ಗ್ಯಾರಂಟಿ ಎಷ್ಟು ಎಂಬುದನ್ನು ತಿಳಿದುಕೊಳ್ಳುವುದು ಮುಖ್ಯ.',
    descriptionEn: 'Traditional participating endowment plans declare variable annual bonuses, whereas pure term and non-par plans offer fixed terms.',
    recommendationKn: 'ಪಾಲಿಸಿ ಕರಾರಿನ "Benefits Payable" ವಿಭಾಗವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಓದಿ ಅಥವಾ ಅಧಿಕೃತ ವಿವರಣೆ ಪಡೆಯಿರಿ.',
    recommendationEn: 'Check the Policy Benefit Illustration table to distinguish guaranteed maturity values from projected returns.',
  },
  {
    id: 'safeStorage',
    questionKn: 'ಪಾಲಿಸಿ ಬಾಂಡ್ (ಮೂಲ ಪತ್ರ) ಮನೆಯಲ್ಲಿ ತುರ್ತು ಸಮಯದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ಸಿಗುವ ಸ್ಥಳದಲ್ಲಿದೆಯೇ?',
    questionEn: 'Is your original policy document stored where your family can easily locate it?',
    descriptionKn: 'ಅನಿರೀಕ್ಷಿತ ಸಂದರ್ಭದಲ್ಲಿ ಕುಟುಂಬದ ಸದಸ್ಯರಿಗೆ ಪಾಲಿಸಿ ಸಂಖ್ಯೆ ಮತ್ತು ಪತ್ರ ಎಲ್ಲಿದೆ ಎಂಬುದು ತಕ್ಷಣವೇ ತಿಳಿಯಬೇಕು.',
    descriptionEn: 'In an unfortunate event, family members must not struggle to locate policy documents and branch details.',
    recommendationKn: 'ಮೂಲ ಪತ್ರವನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಿ ಮತ್ತು ಇ-ವಿಮಾ ಖಾತೆ (e-IA) ಮೂಲಕ ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲೂ ಇಟ್ಟುಕೊಳ್ಳಿ.',
    recommendationEn: 'Maintain an electronic insurance account (e-IA) and share policy numbers with your trusted nominee.',
  },
];

export const PolicyReviewChecklist: React.FC<Props> = ({ language, onBookConsultation }) => {
  // Store true for yes (healthy), false for no (needs review)
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    nominee: null,
    dates: null,
    coverage: null,
    benefits: null,
    safeStorage: null,
  });

  const isKn = language === 'kn';

  const handleToggle = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const needsAttentionCount = Object.values(answers).filter((v) => v === false).length;
  const healthyCount = Object.values(answers).filter((v) => v === true).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <ClipboardCheck className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಉಚಿತ ಶೈಕ್ಷಣಿಕ ಸಾಧನ C' : 'Transparent Assessment Tool C'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          {isKn ? 'ಹಾಲಿ ಪಾಲಿಸಿ ಪರಿಶೀಲನಾ ಚೆಕ್‌ಲಿಸ್ಟ್' : 'Existing Policy Health Checklist'}
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {isKn
            ? 'ಯಾವುದೇ ಪಾಲಿಸಿ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ. ಕೆಳಗಿನ 5 ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ನಿಮ್ಮ ಪಾಲಿಸಿಯ ಸ್ಥಿತಿಯನ್ನು ನೀವೇ ಪರಿಶೀಲಿಸಿ.'
            : 'No policy uploads required. Answer these 5 educational checkpoints to verify if your existing coverage is truly active and secure.'}
        </p>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {CHECKLIST_ITEMS.map((item, index) => {
          const state = answers[item.id];
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-colors ${
                state === false
                  ? 'border-amber-300 bg-amber-50/40'
                  : state === true
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {isKn ? item.questionKn : item.questionEn}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {isKn ? item.descriptionKn : item.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, true)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      state === true
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isKn ? 'ಹೌದು, ಸರಿಯಾಗಿದೆ' : 'Yes, Verified'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, false)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      state === false
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{isKn ? 'ಗೊತ್ತಿಲ್ಲ / ಇಲ್ಲ' : 'No / Unsure'}</span>
                  </button>
                </div>
              </div>

              {state === false && (
                <div className="mt-3 pt-2.5 border-t border-amber-200/60 text-xs text-amber-900 flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{isKn ? 'ಸಲಹೆ: ' : 'Recommendation: '}</span>
                    <span>{isKn ? item.recommendationKn : item.recommendationEn}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review summary outcome */}
      {answeredCount > 0 && (
        <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-800" />
                <h4 className="text-sm font-bold text-slate-900">
                  {isKn ? 'ನಿಮ್ಮ ಪಾಲಿಸಿ ಪರಿಶೀಲನಾ ಸಾರಾಂಶ' : 'Checklist Assessment Result'}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {isKn
                  ? `ಒಟ್ಟು 5 ಅಂಶಗಳಲ್ಲಿ ${healthyCount} ಸರಿಯಾಗಿವೆ, ${needsAttentionCount} ಅಂಶಗಳು ಪರಿಶೀಲನೆಗೆ ಅಗತ್ಯವಾಗಿವೆ.`
                  : `${healthyCount} of 5 checkpoints verified healthy. ${needsAttentionCount} area(s) require prompt attention.`}
              </p>
            </div>

            {onBookConsultation && (
              <button
                type="button"
                onClick={onBookConsultation}
                className="py-2 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>{isKn ? 'ಸೋಫಿಯಾ ಅವರೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ' : 'Get Guided Policy Review'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-start gap-1.5 text-[11px] text-slate-500">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          {isKn
            ? 'ಗಮನಿಸಿ: ಈ ಪರಿಶೀಲನಾ ಸಾಧನವು ಕೇವಲ ಸಾಮಾನ್ಯ ಜಾಗೃತಿಗಾಗಿ. ಯಾವುದೇ ಪಾಲಿಸಿ ದಾಖಲೆಗಳನ್ನು ಇಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡುವಂತಿಲ್ಲ.'
            : 'Notice: This educational tool is for family awareness. Policy document uploads are never accepted on this portal.'}
        </span>
      </div>
    </div>
  );
};
