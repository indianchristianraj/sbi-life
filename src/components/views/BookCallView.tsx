import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language, PublicRoute, LeadRecord } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';
import { LeadCaptureForm } from '../LeadCaptureForm';

interface Props {
  language: Language;
  prefilledTopic?: string;
  prefilledNotes?: string;
  prefilledCity?: string;
  onLeadSubmitted: (lead: LeadRecord) => void;
}

export const BookCallView: React.FC<Props> = ({
  language,
  prefilledTopic,
  prefilledNotes,
  prefilledCity,
  onLeadSubmitted,
}) => {
  const isKn = language === 'kn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24 w-full max-w-full overflow-hidden">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          {isKn ? 'ವೈಯಕ್ತಿಕ ಸಮಾಲೋಚನೆ' : 'Confidential Consultation'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರೊಂದಿಗೆ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ' : 'Schedule a Conversation with Sofia Rani'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isKn
            ? 'ನಿಮ್ಮ ಕುಟುಂಬದ ರಕ್ಷಣಾ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸಿಂಧನೂರು ಹಾಗೂ ಸುತ್ತಮುತ್ತಲಿನ ಪ್ರದೇಶಗಳಿಗೆ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಲು ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ.'
            : 'Get clear, objective life advisory tailored to your family milestones without sales pressure in Sindhanur and surrounding areas.'}
        </p>
      </div>

      {/* Advisory Working Window Notice */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <Clock className="w-5 h-5 text-teal-800 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 block">{isKn ? 'ಕೆಲಸದ ಸಮಯ (IST)' : 'Working Hours (IST)'}</span>
            <span className="text-slate-500">
              {isKn ? ADVISOR_CONFIG.workingHours.timingsKn : ADVISOR_CONFIG.workingHours.timings}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-teal-800 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 block">{isKn ? 'ಕಾರ್ಯನಿರ್ವಹಣಾ ದಿನಗಳು' : 'Advisory Days'}</span>
            <span className="text-slate-500">
              {isKn ? ADVISOR_CONFIG.workingHours.daysKn : ADVISOR_CONFIG.workingHours.days}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-teal-800 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 block">{isKn ? 'ಸೇವಾ ಕೇಂದ್ರ' : 'Service Hub'}</span>
            <span className="text-slate-500">
              {ADVISOR_CONFIG.location.city}, {ADVISOR_CONFIG.location.district}
            </span>
          </div>
        </div>
      </div>

      {/* The Booking & Lead Capture Form */}
      <LeadCaptureForm
        language={language}
        prefilledTopic={prefilledTopic}
        prefilledNotes={prefilledNotes}
        prefilledCity={prefilledCity}
        onLeadSubmitted={onLeadSubmitted}
        isCallbackRequestOnly={false}
      />
    </div>
  );
};
