import React, { useState } from 'react';
import { Menu, X, Globe, Phone, Shield } from 'lucide-react';
import { Language, PublicRoute } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ADVISOR_CONFIG } from '../config/advisorConfig';
import { PWAInstallButton } from './PWAInstallButton';
import { DownloadWebsiteButton } from './DownloadWebsiteButton';

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

  const handleNav = (route: PublicRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 single-line links) — Zone 3 (1 primary action) */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="text-lg sm:text-xl font-bold tracking-tight text-[#0F1D36] whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Sofia Rani
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`hover:text-teal-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentRoute === 'home' ? 'text-teal-900 font-semibold border-b-2 border-teal-800' : ''
              }`}
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`hover:text-teal-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentRoute === 'about' ? 'text-teal-900 font-semibold border-b-2 border-teal-800' : ''
              }`}
            >
              {t.navAbout}
            </button>
            <button
              type="button"
              onClick={() => handleNav('tools')}
              className={`hover:text-teal-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentRoute === 'tools' ? 'text-teal-900 font-semibold border-b-2 border-teal-800' : ''
              }`}
            >
              {t.navTools}
            </button>
            <button
              type="button"
              onClick={() => handleNav('learn')}
              className={`hover:text-teal-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentRoute === 'learn' ? 'text-teal-900 font-semibold border-b-2 border-teal-800' : ''
              }`}
            >
              {t.navLearn}
            </button>
            <button
              type="button"
              onClick={() => handleNav('customer-help')}
              className={`hover:text-teal-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentRoute === 'customer-help' ? 'text-teal-900 font-semibold border-b-2 border-teal-800' : ''
              }`}
            >
              {t.navCustomerHelp}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Language Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('kn')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'kn' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ಕನ್ನಡ (Primary)"
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'te' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="తెలుగు (Preview)"
              >
                తెలుగు
              </button>
            </div>

            {/* PWA In-App Install Button */}
            <PWAInstallButton language={language} />

            {/* Standalone Single-File index.html Download Button */}
            <DownloadWebsiteButton variant="header" />

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              {t.bookCallCta}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs text-slate-500 font-medium px-2 pb-1 border-b border-slate-200">
            {ADVISOR_CONFIG.name} · {ADVISOR_CONFIG.professionalTitle[language]} · {ADVISOR_CONFIG.location.city}
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-800">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navAbout}
            </button>
            <button
              type="button"
              onClick={() => handleNav('family-protection')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navProtection}
            </button>
            <button
              type="button"
              onClick={() => handleNav('children-education')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navChildren}
            </button>
            <button
              type="button"
              onClick={() => handleNav('retirement')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navRetirement}
            </button>
            <button
              type="button"
              onClick={() => handleNav('tools')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navTools}
            </button>
            <button
              type="button"
              onClick={() => handleNav('learn')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navLearn}
            </button>
            <button
              type="button"
              onClick={() => handleNav('customer-help')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navCustomerHelp}
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 min-h-[44px] flex items-center"
            >
              {t.navContact}
            </button>
            <button
              type="button"
              onClick={() => handleNav('disclosures')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-xs text-slate-600 min-h-[44px] flex items-center"
            >
              {t.navDisclosures}
            </button>
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="text-left px-3 py-2 rounded-lg bg-teal-50 text-teal-900 text-xs font-semibold min-h-[44px] flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-teal-700" />
              <span>{t.navAdmin} (Phase 1 Preview)</span>
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <DownloadWebsiteButton variant="footer" />
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="w-full py-2.5 px-4 bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>{t.bookCallCta}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
