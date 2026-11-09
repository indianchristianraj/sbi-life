import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Shield, Lock } from 'lucide-react';
import { Language, PublicRoute } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  language: Language;
  onNavigate: (route: PublicRoute) => void;
}

export const Footer: React.FC<Props> = ({ language, onNavigate }) => {
  const t = TRANSLATIONS[language];
  const isKn = language === 'kn';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Advisor Identity & Local Presence */}
          <div>
            <h3 className="text-white text-base font-bold tracking-tight mb-2">
              {ADVISOR_CONFIG.name}
            </h3>
            <p className="text-teal-400 font-medium text-xs mb-3">
              {ADVISOR_CONFIG.professionalTitle[language]}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isKn
                ? 'ಗಂಗಾವತಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ಕುಟುಂಬಗಳಿಗೆ ಪಾರದರ್ಶಕ, ಪ್ರಾಮಾಣಿಕ ಜೀವ ವಿಮಾ ಮಾರ್ಗದರ್ಶನ.'
                : 'Ethical, objective life insurance advisory for families across Gangavathi and surrounding Karnataka taluks.'}
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{ADVISOR_CONFIG.location.city}, {ADVISOR_CONFIG.location.district} Dist, {ADVISOR_CONFIG.location.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{isKn ? ADVISOR_CONFIG.workingHours.timingsKn : ADVISOR_CONFIG.workingHours.timings} ({ADVISOR_CONFIG.workingHours.timezone})</span>
              </div>
            </div>
          </div>

          {/* Direct Communication */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              {isKn ? 'ನೇರ ಸಂಪರ್ಕ ವಿವರ' : 'Direct Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">{isKn ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ:' : 'Direct Phone:'}</span>
                <a
                  href={`tel:${ADVISOR_CONFIG.contact.phone}`}
                  className="text-white font-medium hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>{ADVISOR_CONFIG.contact.displayPhone}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">WhatsApp:</span>
                <a
                  href={ADVISOR_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-medium hover:underline flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{ADVISOR_CONFIG.contact.whatsappNumber}</span>
                </a>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
                <span>{isKn ? 'ಸೇವಾ ಪ್ರದೇಶಗಳು:' : 'Coverage Areas:'}</span>{' '}
                <span className="text-slate-300">{ADVISOR_CONFIG.location.coverageAreas.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              {isKn ? 'ಮುಖ್ಯ ವಿಭಾಗಗಳು' : 'Advisory Hub'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('family-protection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navProtection}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('children-education')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navChildren}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('retirement')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navRetirement}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tools')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navTools}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('customer-help')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navCustomerHelp}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal, Privacy & Admin */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              {isKn ? 'ಕಾನೂನು & ಪಾರದರ್ಶಕತೆ' : 'Compliance & Governance'}
            </h4>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('disclosures')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navDisclosures}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navPrivacy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onNavigate('admin')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-teal-300 hover:text-teal-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                <span>{isKn ? 'ಸಲಹೆಗಾರರ ಖಾಸಗಿ ಪೋರ್ಟಲ್' : 'Advisor Secure Access'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Regulatory Disclosures Bar */}
        <div className="pt-6 text-xs text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-300">
              {isKn ? 'ಕಡ್ಡಾಯ ಶಾಸನಬದ್ಧ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ:' : 'Mandatory Statutory Disclosure:'}
            </strong>{' '}
            {isKn ? ADVISOR_CONFIG.compliance.advisorNoticeKn : ADVISOR_CONFIG.compliance.advisorNoticeEn}{' '}
            {isKn ? ADVISOR_CONFIG.compliance.corporateNoticeKn : ADVISOR_CONFIG.compliance.corporateNoticeEn}
          </p>
          <p className="text-[11px] text-slate-400">
            <strong className="text-slate-300">
              {isKn ? 'ಪಾವತಿ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ:' : 'Payment Safety Advisory:'}
            </strong>{' '}
            {isKn ? ADVISOR_CONFIG.compliance.paymentGuidelineKn : ADVISOR_CONFIG.compliance.paymentGuidelineEn}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-[11px] text-slate-400 border-t border-slate-800/80 gap-2">
            <span>
              © {new Date().getFullYear()} {ADVISOR_CONFIG.name} · {ADVISOR_CONFIG.location.city}, Karnataka, India. All rights reserved.
            </span>
            <div className="flex items-center gap-3">
              <span>IRDAI Individual Life Advisory Rules</span>
              <span>·</span>
              <span>DPDP Act 2023 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
