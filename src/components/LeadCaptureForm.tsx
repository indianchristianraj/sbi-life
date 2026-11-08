import React, { useState } from 'react';
import { Phone, CheckCircle, AlertCircle, Calendar, Clock, Shield, ArrowRight } from 'lucide-react';
import { Language, LeadRecord } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  language: Language;
  prefilledTopic?: string;
  prefilledNotes?: string;
  prefilledCity?: string;
  onLeadSubmitted?: (lead: LeadRecord) => void;
  isCallbackRequestOnly?: boolean;
}

export const LeadCaptureForm: React.FC<Props> = ({
  language,
  prefilledTopic,
  prefilledNotes,
  prefilledCity,
  onLeadSubmitted,
  isCallbackRequestOnly = false,
}) => {
  const isKn = language === 'kn';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(prefilledCity || 'Gangavathi');
  const [prefLanguage, setPrefLanguage] = useState<Language>(language);
  const [topic, setTopic] = useState(prefilledTopic || 'Family Protection (Term Insurance)');
  const [callbackTime, setCallbackTime] = useState('Morning (9:30 AM - 12:00 PM IST)');
  
  // Consent controls - NEVER PRESELECTED
  const [consultationConsent, setConsultationConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Honeypot spam field
  const [botField, setBotField] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptLead, setReceiptLead] = useState<LeadRecord | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = isKn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : 'Please enter your full name (minimum 2 characters)';
    }

    // Indian 10-digit mobile number validation
    const cleanedPhone = phone.replace(/\D/g, '');
    const validIndianMobile = /^[6-9]\d{9}$/.test(cleanedPhone);
    if (!validIndianMobile) {
      errs.phone = isKn
        ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ (6, 7, 8 ಅಥವಾ 9 ರಿಂದ ಪ್ರಾರಂಭವಾಗುವ)'
        : 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)';
    }

    if (!consultationConsent) {
      errs.consent = isKn
        ? 'ಮುಂದುವರಿಯಲು ಸಮಾಲೋಚನಾ ಸಂಪರ್ಕ ಸಮ್ಮತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ'
        : 'Mandatory: Please provide consent to receive a callback from Sofia Rani regarding this enquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam check
    if (botField) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const nowIso = new Date().toISOString();
    const newLead: LeadRecord = {
      id: `lead_${Date.now()}`,
      createdAt: nowIso,
      name: name.trim(),
      phone: phone.replace(/\D/g, ''),
      city,
      preferredLanguage: prefLanguage,
      topic,
      preferredCallbackTime: callbackTime,
      notes: prefilledNotes || 'Direct enquiry from public website',
      stage: 'New',
      consultationConsent: true,
      consultationConsentTimestamp: nowIso,
      marketingConsent,
      marketingConsentTimestamp: marketingConsent ? nowIso : undefined,
      leadSource: 'Web Form (Gangavathi Hub)',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptLead(newLead);
      if (onLeadSubmitted) {
        onLeadSubmitted(newLead);
      }
    }, 400);
  };

  if (receiptLead) {
    return (
      <div className="bg-white rounded-2xl border border-teal-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
              {isKn ? 'ಮನವಿ ಸ್ವೀಕೃತಿ ರಶೀದಿ' : 'Enquiry Receipt Generated'}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              {isKn ? 'ನಿಮ್ಮ ಸಮಾಲೋಚನಾ ಮನವಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ' : 'Consultation Request Logged'}
            </h3>
          </div>
        </div>

        {/* Phase 1 Preview Honest Explanation */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 mb-6 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{isKn ? 'ಫೇಸ್ 1 ಪೂರ್ವವೀಕ್ಷಣೆ ಮಾಹಿತಿ (Phase 1 Preview)' : 'Phase 1 Functional Preview Notice'}</span>
          </div>
          <p className="leading-relaxed">
            {isKn
              ? 'ಇದು ವೆಬ್‌ಸೈಟ್‌ನ ಮೊದಲ ಹಂತದ ಪೂರ್ವವೀಕ್ಷಣೆಯಾಗಿದೆ. ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸ್ಥಳೀಯ ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ. ಯಾವುದೇ ಸುಳ್ಳು SMS ಅಥವಾ ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗಿಲ್ಲ ಎಂದು ನಾವು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಸ್ಪಷ್ಟಪಡಿಸುತ್ತೇವೆ. ಫೇಸ್ 2 ರಲ್ಲಿ ಸರ್ವರ್ ದೃಢೀಕರಣ ಮತ್ತು ನೇರ ಡೇಟಾಬೇಸ್ ಸಂಪರ್ಕಗೊಳ್ಳಲಿದೆ.'
              : 'This is the Phase 1 functional preview. Your enquiry has been added to the session lead manager. In accordance with strict integrity rules, no automated SMS or email was simulated. Sofia Rani will review during working hours.'}
          </p>
        </div>

        {/* Receipt Details */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">{isKn ? 'ಹೆಸರು:' : 'Enquirer Name:'}</span>
            <span className="font-semibold text-slate-800">{receiptLead.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">{isKn ? 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ:' : 'Contact Phone:'}</span>
            <span className="font-semibold text-slate-800">XXXXXX{receiptLead.phone.slice(-4)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">{isKn ? 'ಆದ್ಯತೆಯ ವಿಷಯ:' : 'Discussion Topic:'}</span>
            <span className="font-semibold text-slate-800">{receiptLead.topic}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-2">
            <span className="text-slate-500">{isKn ? 'ಸೂಚಿಸಿದ ಸಮಯ:' : 'Requested Window:'}</span>
            <span className="font-semibold text-teal-800">{receiptLead.preferredCallbackTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{isKn ? 'ಸೇವಾ ಸ್ಥಳ:' : 'Location:'}</span>
            <span className="font-semibold text-slate-800">{receiptLead.city}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-xs text-slate-600 space-y-2 mb-6">
          <h4 className="font-semibold text-slate-800">{isKn ? 'ಮುಂದಿನ ಹಂತಗಳು:' : 'Next Steps:'}</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
            <li>
              {isKn
                ? `ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಅಧಿಕೃತ ಕೆಲಸದ ಸಮಯದಲ್ಲಿ (${ADVISOR_CONFIG.workingHours.timingsKn}) ನಿಮ್ಮೊಂದಿಗೆ ಫೋನ್ ಮೂಲಕ ಸಂಪರ್ಕ ಸಾಧಿಸಲಿದ್ದಾರೆ.`
                : `Sofia Rani will initiate contact during official hours (${ADVISOR_CONFIG.workingHours.timings}).`}
            </li>
            <li>
              {isKn
                ? 'ಸಮಾಲೋಚನೆ ಸಂಪೂರ್ಣ ಉಚಿತವಾಗಿರುತ್ತದೆ. ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕ ಅಥವಾ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.'
                : 'Initial advisory discussions are free and confidential. Never share OTP or banking passwords.'}
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setReceiptLead(null)}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {isKn ? 'ಮತ್ತೊಂದು ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ' : 'Submit Another Enquiry'}
          </button>
          <a
            href={`https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              `Hello Sofia Rani, I just requested a callback regarding ${receiptLead.topic}. Name: ${receiptLead.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>{isKn ? 'ತಕ್ಷಣ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Message on WhatsApp Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <Calendar className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಸ್ವಯಂಪ್ರೇರಿತ ಸಮಾಲೋಚನೆ' : 'Voluntary Advisory Request'}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          {isCallbackRequestOnly
            ? isKn
              ? 'ಮರಳಿ ಕರೆ ಮಾಡಲು ವಿನಂತಿಸಿ (Callback Request)'
              : 'Request a Callback from Sofia Rani'
            : isKn
            ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರೊಂದಿಗೆ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ'
            : 'Schedule a Conversation with Sofia Rani'}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 mt-1">
          {isKn
            ? 'ಯಾವುದೇ ಮಾರಾಟ ಒತ್ತಡವಿಲ್ಲ. ನಿಮ್ಮ ಕುಟುಂಬದ ಭದ್ರತೆಗೆ ಅಗತ್ಯವಾದ ಪಾರದರ್ಶಕ ಮಾಹಿತಿಯನ್ನು ಮುಕ್ತವಾಗಿ ಚರ್ಚಿಸಿ.'
            : 'Clear, confidential discussion without sales pressure. We respect your time and privacy.'}
        </p>
      </div>

      {/* Hidden honeypot field for bot spam detection */}
      <input
        type="text"
        name="company_reference_check"
        tabIndex={-1}
        autoComplete="off"
        value={botField}
        onChange={(e) => setBotField(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Full Name */}
        <div>
          <label htmlFor="lead-name" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ನಿಮ್ಮ ಹೆಸರು *' : 'Full Name *'}
          </label>
          <input
            id="lead-name"
            type="text"
            required
            placeholder={isKn ? 'ಉದಾ: ರಮೇಶ್ ಕುಮಾರ್' : 'e.g. Ramesh Kumar'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3.5 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 ${
              errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* 10-digit Phone */}
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (10 ಅಂಕಿಗಳು) *' : 'Mobile Number (10 digits) *'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-sm text-slate-500 font-medium">+91</span>
            <input
              id="lead-phone"
              type="tel"
              required
              maxLength={10}
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className={`w-full pl-12 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums ${
                errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
              }`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
        </div>

        {/* City / Taluk */}
        <div>
          <label htmlFor="lead-city" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ನಿಮ್ಮ ಊರು / ತಾಲೂಕು *' : 'City / Taluk *'}
          </label>
          <select
            id="lead-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="Gangavathi">Gangavathi (ಗಂಗಾವತಿ)</option>
            <option value="Karatagi">Karatagi (ಕಾರಟಗಿ)</option>
            <option value="Kanakagiri">Kanakagiri (ಕನಕಗಿರಿ)</option>
            <option value="Kampli">Kampli (ಕಂಪ್ಲಿ)</option>
            <option value="Anegundi">Anegundi (ಆನೆಗೊಂದಿ)</option>
            <option value="Koppal">Koppal (ಕೊಪ್ಪಳ)</option>
            <option value="Sindhanoor">Sindhanoor (ಸಿಂಧನೂರು)</option>
            <option value="Hospet">Hospet / Vijayanagara (ಹೊಸಪೇಟೆ)</option>
            <option value="Other">Other Region in Karnataka</option>
          </select>
        </div>

        {/* Preferred Language */}
        <div>
          <label htmlFor="lead-pref-lang" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಮಾತನಾಡಲು ಬಯಸುವ ಭಾಷೆ *' : 'Preferred Language *'}
          </label>
          <select
            id="lead-pref-lang"
            value={prefLanguage}
            onChange={(e) => setPrefLanguage(e.target.value as Language)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu - Subject to schedule)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Topic */}
        <div>
          <label htmlFor="lead-topic" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಸಮಾಲೋಚನೆಯ ಮುಖ್ಯ ವಿಷಯ *' : 'Primary Discussion Topic *'}
          </label>
          <select
            id="lead-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="Family Protection (Term Insurance)">
              {isKn ? 'ಕುಟುಂಬ ರಕ್ಷಣೆ (ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್)' : 'Family Protection (Term Insurance)'}
            </option>
            <option value="Child Higher Education Planning">
              {isKn ? 'ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ ಉಳಿತಾಯ' : 'Child Higher Education Planning'}
            </option>
            <option value="Retirement & Pension Planning">
              {isKn ? 'ಸುರಕ್ಷಿತ ನಿವೃತ್ತಿ & ಪಿಂಚಣಿ' : 'Retirement & Pension Planning'}
            </option>
            <option value="Existing Policy Review">
              {isKn ? 'ಹಾಲಿ ಪಾಲಿಸಿ ಪರಿಶೀಲನೆ (ನಾಮಿನಿ/ಸ್ಟೇಟಸ್)' : 'Existing Policy Health Review'}
            </option>
            <option value="Claim Settlement Guidance">
              {isKn ? 'ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶನ ಸಹಾಯ' : 'Claim Settlement Guidance'}
            </option>
            <option value="General Enquiry">
              {isKn ? 'ಸಾಮಾನ್ಯ ಮಾಹಿತಿ' : 'General Enquiry'}
            </option>
          </select>
        </div>

        {/* Preferred Callback Time */}
        <div>
          <label htmlFor="lead-time" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಅನುಕೂಲಕರ ಸಮಯದ ಕಿಟಕಿ (Asia/Kolkata) *' : 'Convenient Time Window (Asia/Kolkata) *'}
          </label>
          <select
            id="lead-time"
            value={callbackTime}
            onChange={(e) => setCallbackTime(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="Morning (9:30 AM - 12:00 PM IST)">
              {isKn ? 'ಬೆಳಗ್ಗೆ (9:30 AM – 12:00 PM IST)' : 'Morning (9:30 AM – 12:00 PM IST)'}
            </option>
            <option value="Afternoon (12:00 PM - 3:30 PM IST)">
              {isKn ? 'ಮಧ್ಯಾಹ್ನ (12:00 PM – 3:30 PM IST)' : 'Afternoon (12:00 PM – 3:30 PM IST)'}
            </option>
            <option value="Evening (3:30 PM - 6:30 PM IST)">
              {isKn ? 'ಸಂಜೆ (3:30 PM – 6:30 PM IST)' : 'Evening (3:30 PM – 6:30 PM IST)'}
            </option>
          </select>
        </div>
      </div>

      {/* Mandatory Regulatory & Privacy Notices: No Aadhaar / PAN notice */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 mb-5 flex items-start gap-2">
        <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{isKn ? 'ಗೌಪ್ಯತೆ ರಕ್ಷಣೆ:' : 'Privacy Assurance:'}</strong>{' '}
          {isKn
            ? 'ನಾವು ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ, ಒಟಿಪಿ ಅಥವಾ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಈ ಜಾಲತಾಣದಲ್ಲಿ ಎಂದಿಗೂ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಕೇವಲ ಪ್ರಾಥಮಿಕ ಸಮಾಲೋಚನೆಗಾಗಿ ಮಾತ್ರ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.'
            : 'We never collect Aadhaar, PAN, bank account details, OTP, or medical files on this website. Information is used strictly for scheduling your advisory call.'}
        </p>
      </div>

      {/* Mandatory Consent Checkbox - NEVER PRESELECTED */}
      <div className="space-y-3 mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consultationConsent}
            onChange={(e) => setConsultationConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-700 cursor-pointer"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">
              {isKn ? 'ಸಮಾಲೋಚನಾ ಸಮ್ಮತಿ (ಕಡ್ಡಾಯ) *' : 'Consultation Callback Consent (Mandatory) *'}
            </strong>{' '}
            {isKn
              ? 'ನನ್ನ ಈ ವಿಚಾರಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಸೋಫಿಯಾ ರಾಣಿ (ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿ) ಅವರು ನನ್ನನ್ನು ಫೋನ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ.'
              : 'I voluntarily agree that Sofia Rani may contact me via phone or WhatsApp regarding this specific life insurance enquiry.'}
          </span>
        </label>
        {errors.consent && <p className="text-[11px] text-red-600 pl-7">{errors.consent}</p>}

        {/* Separate Optional Marketing Consent - NEVER PRESELECTED */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-700 cursor-pointer"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">
              {isKn ? 'ಶೈಕ್ಷಣಿಕ ಅಪ್‌ಡೇಟ್ ಸಮ್ಮತಿ (ಐಚ್ಛಿಕ)' : 'Educational Updates Consent (Optional)'}
            </strong>{' '}
            {isKn
              ? 'ಕುಟುಂಬದ ಆರ್ಥಿಕ ಭದ್ರತೆಯ ಕುರಿತಾದ ಉಪಯುಕ್ತ ಶೈಕ್ಷಣಿಕ ಲೇಖನಗಳನ್ನು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಾಂದರ್ಭಿಕವಾಗಿ ಸ್ವೀಕರಿಸಲು ನಾನು ಇಷ್ಟಪಡುತ್ತೇನೆ.'
              : 'I would like to receive occasional educational articles on family financial protection via WhatsApp.'}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span>{isKn ? 'ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Logging Request...'}</span>
        ) : (
          <>
            <span>
              {isCallbackRequestOnly
                ? isKn
                  ? 'ಮರಳಿ ಕರೆ ಮಾಡಲು ವಿನಂತಿ ಕಳುಹಿಸಿ'
                  : 'Submit Callback Request'
                : isKn
                ? 'ಸಮಾಲೋಚನೆ ವಿನಂತಿ ಸಲ್ಲಿಸಿ'
                : 'Confirm Advisory Request'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center mt-3 text-[11px] text-slate-500">
        {isKn
          ? 'ಕೆಲಸದ ಸಮಯ: ಸೋಮವಾರ – ಶನಿವಾರ | 9:30 AM – 6:30 PM (Asia/Kolkata)'
          : 'Working Hours: Monday – Saturday | 9:30 AM – 6:30 PM IST'}
      </div>
    </form>
  );
};
