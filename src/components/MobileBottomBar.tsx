import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Language, PublicRoute } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  language: Language;
  onBookClick: () => void;
}

export const MobileBottomBar: React.FC<Props> = ({ language, onBookClick }) => {
  const t = TRANSLATIONS[language];

  const defaultWhatsappMessage = encodeURIComponent(
    language === 'kn'
      ? 'ನಮಸ್ಕಾರ ಸೋಫಿಯಾ ರಾಣಿ ಅವರೇ, ಜೀವ ವಿಮಾ ರಕ್ಷಣೆ ಮತ್ತು ಉಳಿತಾಯ ಯೋಜನೆಗಳ ಕುರಿತು ಮಾಹಿತಿ ಪಡೆಯಲು ಬಯಸುತ್ತೇನೆ.'
      : 'Hello Sofia Rani, I would like to consult with you regarding family life insurance protection.'
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-3 py-2 pb-safe">
      <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
        {/* Call button */}
        <a
          href={`tel:${ADVISOR_CONFIG.contact.phone}`}
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          aria-label="Direct Phone Call to Sofia Rani"
        >
          <Phone className="w-4 h-4 text-teal-800 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">{t.stickyCall}</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${defaultWhatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 transition-colors"
          aria-label="WhatsApp Sofia Rani"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">{t.stickyWhatsapp}</span>
        </a>

        {/* Book Consultation button */}
        <button
          type="button"
          onClick={onBookClick}
          className="min-h-[44px] flex flex-col items-center justify-center rounded-xl bg-teal-800 hover:bg-teal-900 text-white transition-colors cursor-pointer shadow-xs"
          aria-label="Book Call with Sofia Rani"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">{t.stickyBook}</span>
        </button>
      </div>
    </div>
  );
};
