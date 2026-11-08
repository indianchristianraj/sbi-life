import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { Language, PublicRoute } from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';
import { RegionalHubsSection } from '../RegionalHubsSection';
import { GANGAVATHI_LANDSCAPE } from '../../assets/embeddedImages';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
  onOpenBookingForCity?: (city: string) => void;
}

export const ContactView: React.FC<Props> = ({
  language,
  onNavigate,
  onOpenBookingForCity,
}) => {
  const isKn = language === 'kn';

  const handleCitySelected = (cityId: string) => {
    if (onOpenBookingForCity) {
      onOpenBookingForCity(cityId);
    } else {
      onNavigate('book');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
          {isKn ? 'ಸ್ಥಳೀಯ ಸಂಪರ್ಕ' : 'Regional Advisory Presence'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isKn ? 'ಗಂಗಾವತಿಯಲ್ಲಿ ಸೋಫಿಯಾ ರಾಣಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Connect with Sofia Rani in Gangavathi'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isKn
            ? 'ದೂರವಾಣಿ, ವಾಟ್ಸಾಪ್ ಅಥವಾ ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ಮುಖಾಮುಖಿ ಸಮಾಲೋಚನೆ ಲಭ್ಯವಿದೆ.'
            : 'Personal and telephone advisory available across Gangavathi, Koppal, and surrounding Karnataka taluks.'}
        </p>
      </div>

      {/* Scenic Gangavathi Editorial Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 relative aspect-[16/8] shadow-sm">
        <img
          src={GANGAVATHI_LANDSCAPE}
          alt="Scenic Gangavathi paddy fields and granite hillocks at sunrise"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
          <div className="text-white text-xs">
            <span className="font-bold text-sm block">Gangavathi, Koppal District</span>
            <span className="text-slate-200">
              {isKn ? 'ಸ್ಥಳೀಯ ಗ್ರಾಮೀಣ & ಪಟ್ಟಣ ಕುಟುಂಬಗಳಿಗೆ ಸಮರ್ಪಿತ ಸೇವೆ' : 'Dedicated to families across the Tungabhadra basin'}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Direct Calling */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
            <Phone className="w-5 h-5 text-teal-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            {isKn ? 'ನೇರ ದೂರವಾಣಿ ಕರೆ' : 'Direct Telephone Call'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isKn
              ? 'ಕೆಲಸದ ಅವಧಿಯಲ್ಲಿ (ಬೆಳಗ್ಗೆ 9:30 ರಿಂದ ಸಂಜೆ 6:30) ನೇರವಾಗಿ ಮಾತನಾಡಿ.'
              : 'Speak directly with Sofia Rani during official working hours.'}
          </p>
          <a
            href={`tel:${ADVISOR_CONFIG.contact.phone}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900"
          >
            <span>{ADVISOR_CONFIG.contact.displayPhone}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Card 2: WhatsApp Chat */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            {isKn ? 'ಅಧಿಕೃತ ವಾಟ್ಸಾಪ್ ಸಮಾಲೋಚನೆ' : 'Official WhatsApp Enquiry'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isKn
              ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಅಥವಾ ಅನುಕೂಲಕರ ಸಮಯವನ್ನು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ.'
              : 'Send a quick message to check availability or request a callback.'}
          </p>
          <a
            href={ADVISOR_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>+{ADVISOR_CONFIG.contact.whatsappNumber}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Working Hours & Service Protocols */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-xs text-slate-700 space-y-3">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-800" />
          <span>{isKn ? 'ಕಾರ್ಯನಿರ್ವಹಣಾ ಸಮಯ ಮತ್ತು ಭೇಟಿ ನಿಯಮಗಳು' : 'Advisory Hours & In-Person Protocols'}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
          <div>
            <strong className="text-slate-800 block">{isKn ? 'ದಿನಗಳು:' : 'Days:'}</strong>
            <span>{isKn ? ADVISOR_CONFIG.workingHours.daysKn : ADVISOR_CONFIG.workingHours.days}</span>
          </div>
          <div>
            <strong className="text-slate-800 block">{isKn ? 'ಸಮಯ:' : 'Timings:'}</strong>
            <span>{isKn ? ADVISOR_CONFIG.workingHours.timingsKn : ADVISOR_CONFIG.workingHours.timings}</span>
          </div>
          <div>
            <strong className="text-slate-800 block">{isKn ? 'ಭಾನುವಾರ:' : 'Sunday Policy:'}</strong>
            <span>{isKn ? ADVISOR_CONFIG.workingHours.sundayPolicyKn : ADVISOR_CONFIG.workingHours.sundayPolicy}</span>
          </div>
          <div>
            <strong className="text-slate-800 block">{isKn ? 'ಮುಖಾಮುಖಿ ಭೇಟಿ:' : 'In-Person Meetings:'}</strong>
            <span>{isKn ? 'ಗಂಗಾವತಿಯಲ್ಲಿ ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ಮಾತ್ರ' : 'Prior appointment required in Gangavathi'}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            {isKn
              ? 'ಭದ್ರತಾ ಸೂಚನೆ: ಯಾವುದೇ ಸಂದರ್ಭದಲ್ಲೂ ವೈಯಕ್ತಿಕವಾಗಿ ನಗದು ನೀಡಬೇಡಿ. ಎಲ್ಲಾ ಪ್ರೀಮಿಯಂ ಪಾವತಿಗಳನ್ನು ನೇರವಾಗಿ ಅಧಿಕೃತ ಕಂಪನಿ ಖಾತೆಗೆ ಮಾತ್ರ ಮಾಡಬೇಕು.'
              : 'Zero cash protocol: Neither Sofia Rani nor any representative collects cash. Premium payments must occur through official SBI Life counters/portals.'}
          </span>
        </div>
      </div>

      {/* Structured Regional Hubs Section with Local Context */}
      <RegionalHubsSection
        language={language}
        onSelectCity={handleCitySelected}
      />
    </div>
  );
};
