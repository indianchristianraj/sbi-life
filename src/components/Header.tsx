import React, { useState } from 'react';
import {
  Menu,
  X,
  Shield,
  ArrowRight,
  Phone,
  Calculator,
  FileCheck2,
  Users,
  Compass,
} from 'lucide-react';
import { Language, PublicRoute } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  currentRoute: PublicRoute;
  setCurrentRoute: (route: PublicRoute) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<Props> = ({
  currentRoute,
  setCurrentRoute,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];
  const isKn = language === 'kn';
  const isTe = language === 'te';

  const handleNav = (route: PublicRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LEFT: Premium Brand Emblem & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
              aria-label="Sofia Rani - Life Advisory Home"
            >
              {/* Geometric Brand Emblem */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F1D36] to-teal-900 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 group-hover:shadow transition-all">
                <svg
                  className="w-5 h-5 text-teal-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F1D36] group-hover:text-teal-900 transition-colors">
                  {ADVISOR_CONFIG.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-normal hidden sm:block">
                  {isKn
                    ? 'ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಅಧಿಕೃತ ಸಲಹೆಗಾರ್ತಿ · ಸಿಂಧನೂರು'
                    : isTe
                    ? 'ఎస్.బి.ఐ లైఫ్ అధికృత సలహాదారు · సింధనూరు'
                    : 'SBI Life Authorized Advisor · Sindhanur'}
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Clean Agency-Quality Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'home'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navHome}
              {currentRoute === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('family-protection')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'family-protection' ||
                currentRoute === 'children-education' ||
                currentRoute === 'retirement'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navServices || (isKn ? 'ಸೇವೆಗಳು & ಯೋಜನೆಗಳು' : 'Services & Plans')}
              {(currentRoute === 'family-protection' ||
                currentRoute === 'children-education' ||
                currentRoute === 'retirement') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('tools')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'tools'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navTools}
              {currentRoute === 'tools' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'about'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navAbout}
              {currentRoute === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('customer-help')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'customer-help'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navCustomerHelp}
              {currentRoute === 'customer-help' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`transition-colors py-1.5 cursor-pointer relative ${
                currentRoute === 'contact'
                  ? 'text-teal-950 font-bold'
                  : 'hover:text-teal-900'
              }`}
            >
              {t.navContact}
              {currentRoute === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-800 rounded-full" />
              )}
            </button>
          </nav>

          {/* RIGHT: Language Switcher + Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Minimalist Language Switcher */}
            <div className="flex items-center bg-slate-100/80 rounded-full p-1 border border-slate-200/90 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('kn')}
                className={`px-2.5 py-1 font-semibold rounded-full transition-all cursor-pointer ${
                  language === 'kn'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ಕನ್ನಡ (Primary)"
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 font-semibold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-2.5 py-1 font-semibold rounded-full transition-all cursor-pointer ${
                  language === 'te'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="తెలుగు"
              >
                తెలుగు
              </button>
            </div>

            {/* High-Conversion Primary CTA: Get Free Consultation */}
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              <span>{t.bookCallCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-slate-200 shadow-xl px-5 py-6 space-y-4">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-900">{ADVISOR_CONFIG.name}</div>
              <div className="text-xs text-slate-500">
                {ADVISOR_CONFIG.professionalTitle[language]} · {ADVISOR_CONFIG.location.city}
              </div>
            </div>
            <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              IRDAI Registered
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-800">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navHome}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('family-protection')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navServices || (isKn ? 'ಸೇವೆಗಳು & ಯೋಜನೆಗಳು' : 'Services & Plans')}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('tools')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navTools}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('customer-help')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navCustomerHelp}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('learn')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navLearn}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navAbout}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between"
            >
              <span>{t.navContact}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="w-full py-3.5 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t.bookCallCta}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
