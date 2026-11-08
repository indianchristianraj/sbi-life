import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface Props {
  language: Language;
}

export const PWAInstallButton: React.FC<Props> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const isKn = language === 'kn';

  // If already running in standalone mode, hide button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
        title={isKn ? 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : 'Install Web App'}
      >
        <Download className="w-3.5 h-3.5 text-teal-800" />
        <span className="hidden sm:inline">{isKn ? 'ಆ್ಯಪ್ ಪಡೆಯಿರಿ' : 'Install App'}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-teal-800" />
          <span className="hidden sm:inline">{isKn ? 'ಐಫೋನ್ ಆ್ಯಪ್' : 'Install on iOS'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-3 text-xs text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {isKn ? 'ಐಫೋನ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : 'Install on iPhone / iPad'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="leading-relaxed">
                {isKn ? (
                  <>
                    1. ಸಫಾರಿ ಬ್ರೌಸರ್‌ನ ಕೆಳಭಾಗದಲ್ಲಿರುವ <strong>Share</strong> ಬಟನ್ ಒತ್ತಿ.<br />
                    2. ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ <strong>Add to Home Screen</strong> ಆಯ್ಕೆಮಾಡಿ.
                  </>
                ) : (
                  <>
                    1. Tap the <strong>Share</strong> button at the bottom of Safari.<br />
                    2. Scroll down and tap <strong>Add to Home Screen</strong>.
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 bg-teal-800 text-white rounded-lg font-semibold hover:bg-teal-900 transition-colors cursor-pointer"
              >
                {isKn ? 'ಸರಿ' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
