import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, AlertCircle, Calendar, Clock, Shield, ArrowRight, MessageCircle } from 'lucide-react';
import { Language, LeadRecord } from '../types';
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
  const isTe = language === 'te';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(prefilledCity || 'Sindhanur');
  const [prefLanguage, setPrefLanguage] = useState<Language>(language);
  const [topic, setTopic] = useState(prefilledTopic || 'Family Protection (Term Insurance)');
  const [callbackTime, setCallbackTime] = useState('Morning (9:30 AM - 12:00 PM IST)');
  const [contactMethod, setContactMethod] = useState<'Phone Call' | 'WhatsApp' | 'In-person'>('Phone Call');
  
  // Consent controls - NEVER PRESELECTED
  const [consultationConsent, setConsultationConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Honeypot spam field
  const [botField, setBotField] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptLead, setReceiptLead] = useState<LeadRecord | null>(null);

  // Synchronize city when user clicks location cards
  useEffect(() => {
    if (prefilledCity) {
      setCity(prefilledCity);
    }
  }, [prefilledCity]);

  // Synchronize topic when passed as prop
  useEffect(() => {
    if (prefilledTopic) {
      setTopic(prefilledTopic);
    }
  }, [prefilledTopic]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = isKn
        ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು)'
        : isTe
        ? 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి (కనీసం 2 అక్షరాలు)'
        : 'Please enter your full name (minimum 2 characters)';
    }

    // Indian 10-digit mobile number validation
    const cleanedPhone = phone.replace(/\D/g, '');
    const validIndianMobile = /^[6-9]\d{9}$/.test(cleanedPhone);
    if (!validIndianMobile) {
      errs.phone = isKn
        ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ (6, 7, 8 ಅಥವಾ 9 ರಿಂದ ಪ್ರಾರಂಭವಾಗುವ)'
        : isTe
        ? 'దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి'
        : 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)';
    }

    if (!consultationConsent) {
      errs.consent = isKn
        ? 'ಮುಂದುವರಿಯಲು ಸಮಾಲೋಚನಾ ಸಂಪರ್ಕ ಸಮ್ಮತಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ'
        : isTe
        ? 'ముందుకు సాగడానికి సంప్రదింపు సమ్మతిని ఎంచుకోవడం తప్పనిసరి'
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
      preferredCallbackTime: `${callbackTime} via ${contactMethod}`,
      notes: prefilledNotes || `Direct enquiry from public website for ${city} (Preferred Method: ${contactMethod})`,
      stage: 'New',
      consultationConsent: true,
      consultationConsentTimestamp: nowIso,
      marketingConsent,
      marketingConsentTimestamp: marketingConsent ? nowIso : undefined,
      leadSource: 'Web Form (Sindhanur Advisory Base)',
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
      <div className="bg-white rounded-2xl border border-teal-200/80 p-6 md:p-8 shadow-sm w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
              {isKn ? 'ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ' : isTe ? 'అభ్యర్థన నమోదు చేయబడింది' : 'Enquiry Recorded Successfully'}
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              {isKn ? 'ಧನ್ಯವಾದಗಳು, ನಿಮ್ಮ ಸಮಾಲೋಚನೆ ನಿಗದಿಯಾಗಿದೆ' : isTe ? 'ధన్యవాదాలు, మీ అభ్యర్థన అందింది' : 'Thank you, Sofia Rani will connect with you'}
            </h4>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2 mb-4">
          <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span className="text-slate-500">{isKn ? 'ವಿಚಾರಣಾ ಸಂಖ್ಯೆ' : isTe ? 'రిఫరెన్స్ నంబర్' : 'Reference ID'}:</span>
            <span className="font-mono font-bold text-slate-800">{receiptLead.id}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span className="text-slate-500">{isKn ? 'ಹೆಸರು' : isTe ? 'పేరు' : 'Name'}:</span>
            <span className="font-semibold text-slate-800">{receiptLead.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span className="text-slate-500">{isKn ? 'ಮೊಬೈಲ್' : isTe ? 'మొబైల్' : 'Mobile'}:</span>
            <span className="font-mono text-slate-800 tabular-nums">+91 {receiptLead.phone}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span className="text-slate-500">{isKn ? 'ಸ್ಥಳ' : isTe ? 'ప్రాంతం' : 'Location'}:</span>
            <span className="font-semibold text-slate-800">{receiptLead.city}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
            <span className="text-slate-500">{isKn ? 'ವಿಷಯ' : isTe ? 'విషయం' : 'Topic'}:</span>
            <span className="font-semibold text-teal-800">{receiptLead.topic}</span>
          </div>
          <div className="flex justify-between pt-0.5">
            <span className="text-slate-500">{isKn ? 'ಸಮಯ & ಮಾಧ್ಯಮ' : isTe ? 'సమయం & విధానం' : 'Scheduled Window'}:</span>
            <span className="text-slate-800">{receiptLead.preferredCallbackTime}</span>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200/80 text-xs text-emerald-950 mb-5">
          <p className="leading-relaxed">
            {isKn
              ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ನಿಮ್ಮ ಆಯ್ಕೆಯ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮೊಂದಿಗೆ ಸಮಾಲೋಚನೆ ನಡೆಸಲಿದ್ದಾರೆ. ನಿಮಗೆ ತಕ್ಷಣವೇ ಮಾತನಾಡಬೇಕಿದ್ದಲ್ಲಿ, ಕೆಳಗಿನ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ನೇರವಾಗಿ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಬಹುದು.'
              : isTe
              ? 'సోఫియా రాణి గారు మీరు ఎంచుకున్న సమయంలో సంప్రదిస్తారు. అత్యవసరమైతే క్రింది బటన్ ద్వారా నేరుగా వాట్సాప్ చేయవచ్చు.'
              : 'Sofia Rani will review your requirements and reach out during your preferred window. For immediate assistance, message directly on WhatsApp.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              setReceiptLead(null);
              setName('');
              setPhone('');
              setConsultationConsent(false);
              setMarketingConsent(false);
            }}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
          >
            {isKn ? 'ಮತ್ತೊಂದು ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ' : isTe ? 'మరొక అభ్యర్థన' : 'Submit Another Request'}
          </button>
          <a
            href={`https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              `Hello Sofia Rani, I just requested a consultation regarding ${receiptLead.topic} for ${receiptLead.city}. Name: ${receiptLead.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isKn ? 'ತಕ್ಷಣ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ' : isTe ? 'వాట్సాప్‌లో సందేశం' : 'Message on WhatsApp Now'}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm w-full max-w-full overflow-hidden">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
          <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            {isKn
              ? 'ಸ್ವಯಂಪ್ರೇರಿತ ಸಮಾಲೋಚನೆ · ಸಿಂಧನೂರು ಕೇಂದ್ರ'
              : isTe
              ? 'స్వచ్ఛంద సలహా అభ్యర్థన · సింధనూరు'
              : 'Voluntary Advisory Request · Sindhanur Base'}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          {isCallbackRequestOnly
            ? isKn
              ? 'ಮರಳಿ ಕರೆ ಮಾಡಲು ವಿನಂತಿಸಿ (Callback Request)'
              : isTe
              ? 'కాల్‌బ్యాక్ అభ్యర్థించండి'
              : 'Request a Callback from Sofia Rani'
            : isKn
            ? 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರೊಂದಿಗೆ ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ'
            : isTe
            ? 'సోఫియా రాణి గారితో సమాలోచన షెడ్యూల్ చేయండి'
            : 'Schedule a Consultation with Sofia Rani'}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 mt-1">
          {isKn
            ? 'ಯಾವುದೇ ಮಾರಾಟ ಒತ್ತಡವಿಲ್ಲ. ನಿಮ್ಮ ಕುಟುಂಬದ ಭದ್ರತೆಗೆ ಅಗತ್ಯವಾದ ಪಾರದರ್ಶಕ ಮಾಹಿತಿಯನ್ನು ಮುಕ್ತವಾಗಿ ಚರ್ಚಿಸಿ.'
            : isTe
            ? 'ఎలాంటి అమ్మకాల ఒత్తిడి లేకుండా మీ కుటుంబానికి సరైన బీమా వివరాలను ప్రశాంతంగా తెలుసుకోండి.'
            : 'Clear, confidential discussion without sales pressure. Serving Sindhanur and surrounding areas.'}
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
            {isKn ? 'ನಿಮ್ಮ ಹೆಸರು *' : isTe ? 'మీ పేరు *' : 'Full Name *'}
          </label>
          <input
            id="lead-name"
            type="text"
            required
            placeholder={isKn ? 'ಉದಾ: ರಮೇಶ್ ಕುಮಾರ್' : isTe ? 'ఉదా: రమేష్ కుమార్' : 'e.g. Ramesh Kumar'}
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
            {isKn ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (10 ಅಂಕಿಗಳು) *' : isTe ? 'మొబైల్ నంబర్ (10 అంకెలు) *' : 'Mobile Number (10 digits) *'}
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
            {isKn ? 'ನಿಮ್ಮ ಊರು / ತಾಲೂಕು *' : isTe ? 'మీ ఊరు / తాలూకా *' : 'City / Taluk *'}
          </label>
          <select
            id="lead-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <optgroup label="Primary Service Hubs">
              <option value="Sindhanur">Sindhanur (ಸಿಂಧನೂರು - Advisory Base)</option>
              <option value="Turvihal">Turvihal (ತುರ್ವಿಹಾಳ)</option>
              <option value="Maski">Maski (ಮಸ್ಕಿ)</option>
            </optgroup>
            <optgroup label="Nearby Hubs">
              <option value="Manvi">Manvi (ಮಾನ್ವಿ)</option>
              <option value="Siruguppa">Siruguppa (ಸಿರುಗುಪ್ಪ)</option>
              <option value="Gangavathi">Gangavathi (ಗಂಗಾವತಿ)</option>
            </optgroup>
            <optgroup label="Extended Service Areas">
              <option value="Raichur">Raichur (ರಾಯಚೂರು)</option>
              <option value="Lingasugur">Lingasugur (ಲಿಂಗಸುಗೂರು)</option>
              <option value="Koppal">Koppal (ಕೊಪ್ಪಳ)</option>
              <option value="Sindhanur Rural">Sindhanur Rural Farming Villages</option>
              <option value="Other">Other Region in Karnataka</option>
            </optgroup>
          </select>
        </div>

        {/* Preferred Language */}
        <div>
          <label htmlFor="lead-pref-lang" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಮಾತನಾಡಲು ಬಯಸುವ ಭಾಷೆ *' : isTe ? 'మాట్లాడాలనుకుంటున్న భాష *' : 'Preferred Language *'}
          </label>
          <select
            id="lead-pref-lang"
            value={prefLanguage}
            onChange={(e) => setPrefLanguage(e.target.value as Language)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="kn">ಕನ್ನಡ (Kannada - Primary)</option>
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Insurance Topic */}
        <div>
          <label htmlFor="lead-topic" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಸಮಾಲೋಚನೆಯ ಮುಖ್ಯ ವಿಷಯ *' : isTe ? 'ప్రధాన చర్చాంశం *' : 'Primary Discussion Topic *'}
          </label>
          <select
            id="lead-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="Family Protection (Term Insurance)">
              {isKn ? 'ಕುಟುಂಬ ರಕ್ಷಣೆ (ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್)' : isTe ? 'కుటుంబ రక్షణ (టర్మ్ ఇన్సూరెన్స్)' : 'Family Protection (Term Insurance)'}
            </option>
            <option value="Child Higher Education Planning">
              {isKn ? 'ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ & ಉಳಿತಾಯ' : isTe ? 'పిల్లల ఉన్నత చదువుల ప్రణాళిక' : 'Child Future Planning'}
            </option>
            <option value="Retirement & Pension Planning">
              {isKn ? 'ಸುರಕ್ಷಿತ ನಿವೃತ್ತಿ & ಪಿಂಚಣಿ' : isTe ? 'పదవీ విరమణ & పెన్షన్ ప్లానింగ్' : 'Retirement Planning'}
            </option>
            <option value="Savings & Investment Insurance">
              {isKn ? 'ಉಳಿತಾಯ & ಹೂಡಿಕೆ ವಿಮೆ' : isTe ? 'పొదుపు & పెట్టుబడి బీమా' : 'Savings and Insurance'}
            </option>
            <option value="Existing Policy Review">
              {isKn ? 'ಹಾಲಿ ಪಾಲಿಸಿ ಪರಿಶೀಲನೆ (ನಾಮಿನಿ/ಸ್ಟೇಟಸ್)' : isTe ? 'పాలసీ సమీక్ష & మార్గదర్శకత్వం' : 'Need Guidance / Policy Review'}
            </option>
            <option value="Claim Settlement Guidance">
              {isKn ? 'ಕ್ಲೈಮ್ ಮಾರ್ಗದರ್ಶನ ಸಹಾಯ' : isTe ? 'క్లెయిమ్ సహాయం' : 'Claim Settlement Assistance'}
            </option>
          </select>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label htmlFor="lead-contact-method" className="block text-xs font-medium text-slate-800 mb-1">
            {isKn ? 'ಸಂಪರ್ಕ ಮಾಧ್ಯಮ *' : isTe ? 'సంప్రదింపు విధానం *' : 'Preferred Contact Method *'}
          </label>
          <select
            id="lead-contact-method"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value as 'Phone Call' | 'WhatsApp' | 'In-person')}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
          >
            <option value="Phone Call">{isKn ? 'ದೂರವಾಣಿ ಕರೆ (Phone Call)' : isTe ? 'ఫోన్ కాల్ (Phone Call)' : 'Phone Call'}</option>
            <option value="WhatsApp">{isKn ? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ (WhatsApp Chat)' : isTe ? 'వాట్సాప్ (WhatsApp)' : 'WhatsApp'}</option>
            <option value="In-person">{isKn ? 'ಮುಖಾಮುಖಿ ಭೇಟಿ (In-person - Sindhanur Hub)' : isTe ? 'ముఖాముఖి (In-person)' : 'In-person Meeting'}</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="lead-time" className="block text-xs font-medium text-slate-800 mb-1">
          {isKn ? 'ಅನುಕೂಲಕರ ಸಮಯದ ಕಿಟಕಿ (Asia/Kolkata) *' : isTe ? 'అనుకూల సమయం (Asia/Kolkata) *' : 'Convenient Time Window (Asia/Kolkata) *'}
        </label>
        <select
          id="lead-time"
          value={callbackTime}
          onChange={(e) => setCallbackTime(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
        >
          <option value="Morning (9:30 AM - 12:00 PM IST)">
            {isKn ? 'ಬೆಳಗ್ಗೆ (9:30 AM – 12:00 PM IST)' : isTe ? 'ఉదయం (9:30 AM – 12:00 PM IST)' : 'Morning (9:30 AM – 12:00 PM IST)'}
          </option>
          <option value="Afternoon (12:00 PM - 3:30 PM IST)">
            {isKn ? 'ಮಧ್ಯಾಹ್ನ (12:00 PM – 3:30 PM IST)' : isTe ? 'మధ్యాహ్నం (12:00 PM – 3:30 PM IST)' : 'Afternoon (12:00 PM – 3:30 PM IST)'}
          </option>
          <option value="Evening (3:30 PM - 6:30 PM IST)">
            {isKn ? 'ಸಂಜೆ (3:30 PM – 6:30 PM IST)' : isTe ? 'సాయంత్రం (3:30 PM – 6:30 PM IST)' : 'Evening (3:30 PM – 6:30 PM IST)'}
          </option>
        </select>
      </div>

      {/* Mandatory Regulatory & Privacy Notices: No Aadhaar / PAN notice */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 mb-5 flex items-start gap-2">
        <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{isKn ? 'ಗೌಪ್ಯತೆ ರಕ್ಷಣೆ:' : isTe ? 'గోప్యతా హామీ:' : 'Privacy Assurance:'}</strong>{' '}
          {isKn
            ? 'ನಾವು ಆಧಾರ್, ಪ್ಯಾನ್, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ, ಒಟಿಪಿ ಅಥವಾ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಈ ಜಾಲತಾಣದಲ್ಲಿ ಎಂದಿಗೂ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ಕೇವಲ ಪ್ರಾಥಮಿಕ ಸಮಾಲೋಚನೆಗಾಗಿ ಮಾತ್ರ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.'
            : isTe
            ? 'మేము ఆధార్, పాన్, బ్యాంక్ ఖాతా వివరాలు లేదా OTPలను ఈ వెబ్‌సైట్‌లో ఎప్పుడూ సేకరించము. సమాచారం కేవలం సలహా కాల్ షెడ్యూల్ చేయడానికి మాత్రమే ఉపయోగించబడుతుంది.'
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
            className="mt-1 w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-700 cursor-pointer shrink-0"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900">
              {isKn ? 'ಸಮಾಲೋಚನಾ ಸಮ್ಮತಿ (ಕಡ್ಡಾಯ) *' : isTe ? 'సమాలోచన సమ్మతి (తప్పనిసరి) *' : 'Consultation Callback Consent (Mandatory) *'}
            </strong>{' '}
            {isKn
              ? 'ನನ್ನ ಈ ವಿಚಾರಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಸೋಫಿಯಾ ರಾಣಿ (ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿ, ಸಿಂಧನೂರು) ಅವರು ನನ್ನನ್ನು ಫೋನ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ.'
              : isTe
              ? 'నా ఈ విచారణకు సంబంధించి సోఫియా రాణి గారు (SBI లైఫ్ ఇన్సూరెన్స్ సలహాదారు, సింధనూరు) నన్ను ఫోన్ లేదా వాట్సాప్ ద్వారా సంప్రదించడానికి నేను అంగీకరిస్తున్నాను.'
              : 'I voluntarily agree that Sofia Rani (SBI Life Insurance Advisor, Sindhanur) may contact me via phone or WhatsApp regarding this life insurance enquiry.'}
          </span>
        </label>
        {errors.consent && <p className="text-[11px] text-red-600 pl-7">{errors.consent}</p>}

        {/* Separate Optional Marketing Consent - NEVER PRESELECTED */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-700 cursor-pointer shrink-0"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">
              {isKn ? 'ಶೈಕ್ಷಣಿಕ ಅಪ್‌ಡೇಟ್ ಸಮ್ಮತಿ (ಐಚ್ಛಿಕ)' : isTe ? 'విద్యా సంబంధిత సమాచారం (ఐచ్ఛికం)' : 'Educational Updates Consent (Optional)'}
            </strong>{' '}
            {isKn
              ? 'ಕುಟುಂಬದ ಆರ್ಥಿಕ ಭದ್ರತೆಯ ಕುರಿತಾದ ಉಪಯುಕ್ತ ಶೈಕ್ಷಣಿಕ ಲೇಖನಗಳನ್ನು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಾಂದರ್ಭಿಕವಾಗಿ ಸ್ವೀಕರಿಸಲು ನಾನು ಇಷ್ಟಪಡುತ್ತೇನೆ.'
              : isTe
              ? 'కుటుంబ ఆర్థిక భద్రత గురించిన ఉపయోగకరమైన సమాచారాన్ని వాట్సాప్‌లో అప్పుడప్పుడు స్వీకరించాలనుకుంటున్నాను.'
              : 'I would like to receive occasional educational articles on family financial protection via WhatsApp.'}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-teal-800 hover:bg-teal-900 active:bg-teal-950 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span>{isKn ? 'ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...' : isTe ? 'నమోదు చేయబడుతోంది...' : 'Logging Request...'}</span>
        ) : (
          <>
            <span>
              {isCallbackRequestOnly
                ? isKn
                  ? 'ಮರಳಿ ಕರೆ ಮಾಡಲು ವಿನಂತಿ ಕಳುಹಿಸಿ'
                  : isTe
                  ? 'కాల్‌బ్యాక్ అభ్యర్థన పంపండి'
                  : 'Submit Callback Request'
                : isKn
                ? 'ಸಮಾಲೋಚನೆ ವಿನಂತಿ ಸಲ್ಲಿಸಿ'
                : isTe
                ? 'సమాలోచన అభ్యర్థన సమర్పించండి'
                : 'Confirm Advisory Request'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center mt-3 text-[11px] text-slate-500">
        {isKn
          ? 'ಕೆಲಸದ ಸಮಯ: ಸೋಮವಾರ – ಶನಿವಾರ | 9:30 AM – 6:30 PM (Asia/Kolkata)'
          : isTe
          ? 'పని వేళలు: సోమవారం – శనివారం | 9:30 AM – 6:30 PM IST'
          : 'Working Hours: Monday – Saturday | 9:30 AM – 6:30 PM IST'}
      </div>
    </form>
  );
};
