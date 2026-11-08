import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { Language } from '../types';

interface Props {
  language: Language;
}

export const OfflineIndicator: React.FC<Props> = ({ language }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  const isKn = language === 'kn';

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:right-auto md:max-w-md z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 text-white px-4 py-2.5 text-xs shadow-xl border border-slate-700 backdrop-blur-md">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="leading-tight">
        {isKn
          ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ. ಲೆಕ್ಕಾಚಾರ ಸಾಧನಗಳು ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದ ಮಾಹಿತಿ ಲಭ್ಯವಿವೆ.'
          : 'Offline Mode active. Calculators and cached guides remain fully operational.'}
      </span>
    </div>
  );
};
