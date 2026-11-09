import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  MessageCircle,
  Building,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { Language } from '../types';
import { SERVICE_AREAS, ServiceAreaItem, ServiceTier } from '../config/serviceAreasConfig';
import { ADVISOR_CONFIG } from '../config/advisorConfig';

interface Props {
  language: Language;
  onSelectCity: (cityId: string) => void;
}

export const RegionalHubsSection: React.FC<Props> = ({ language, onSelectCity }) => {
  const isKn = language === 'kn';
  const isTe = language === 'te';
  const [activeTier, setActiveTier] = useState<ServiceTier | 'all'>('all');
  const [activeAreaId, setActiveAreaId] = useState<string>('sindhanur');

  const filteredAreas =
    activeTier === 'all'
      ? SERVICE_AREAS
      : SERVICE_AREAS.filter((a) => a.tier === activeTier);

  const selectedArea =
    SERVICE_AREAS.find((a) => a.id === activeAreaId) || SERVICE_AREAS[0];

  const getName = (item: ServiceAreaItem) =>
    isKn ? item.nameKn : isTe ? item.nameTe : item.nameEn;
  const getDistrict = (item: ServiceAreaItem) =>
    isKn ? item.districtKn : isTe ? item.districtTe : item.districtEn;
  const getDistance = (item: ServiceAreaItem) =>
    isKn ? item.distanceFromSindhanurKn : isTe ? item.distanceFromSindhanurTe : item.distanceFromSindhanurEn;
  const getContext = (item: ServiceAreaItem) =>
    isKn ? item.contextKn : isTe ? item.contextTe : item.contextEn;
  const getProtectionNeed = (item: ServiceAreaItem) =>
    isKn ? item.protectionNeedKn : isTe ? item.protectionNeedTe : item.protectionNeedEn;
  const getAdvisoryMode = (item: ServiceAreaItem) =>
    isKn ? item.advisoryModeKn : isTe ? item.advisoryModeTe : item.advisoryModeEn;
  const getBadge = (item: ServiceAreaItem) =>
    isKn ? item.badgeKn : isTe ? item.badgeTe : item.badgeEn;
  const getWhatsappMsg = (item: ServiceAreaItem) =>
    isKn ? item.whatsappMessageKn : isTe ? item.whatsappMessageTe : item.whatsappMessageEn;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6 w-full max-w-full overflow-hidden">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            {isKn
              ? 'ಸೇವಾ ವ್ಯಾಪ್ತಿ ಮತ್ತು ತಾಲೂಕುಗಳು · ಸಿಂಧನೂರು ಮತ್ತು ಆಸುಪಾಸು'
              : isTe
              ? 'సేవా ప్రాంతాలు · సింధనూరు మరియు సమీప ప్రాంతాలు'
              : 'Areas We Serve · Sindhanur & Regional Coverage'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn
            ? 'ಸಿಂಧನೂರು ಹಾಗೂ ಸುತ್ತಮುತ್ತಲಿನ ಪಟ್ಟಣ ಮತ್ತು ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸೇವೆ'
            : isTe
            ? 'సింధనూరు మరియు పరిసర పట్టణాలు, గ్రామాల్లో జీవిత బీమా సేవలు'
            : 'Personalized Insurance Guidance in Sindhanur & Surrounding Communities'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {isKn
            ? 'ಪ್ರತಿಯೊಂದು ಪಟ್ಟಣ ಮತ್ತು ಕೃಷಿ ವಲಯದ ಆರ್ಥಿಕ ಅಗತ್ಯಗಳು ವಿಶಿಷ್ಟವಾಗಿವೆ. ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಸೂಕ್ತ ವಿಮಾ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ.'
            : isTe
            ? 'ప్రతి ప్రాంతం యొక్క ఆర్థిక అవసరాలు ప్రత్యేకమైనవి. మీ ప్రాంతాన్ని ఎంచుకుని తగిన బీమా సలహా పొందండి.'
            : 'Whether you are in Sindhanur town, agricultural canal villages, or neighboring business hubs, Sofia Rani offers personalized consultations.'}
        </p>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-100 pb-3">
        {[
          {
            id: 'all',
            labelEn: 'All Areas (10)',
            labelKn: 'ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು (10)',
            labelTe: 'అన్ని ప్రాంతాలు (10)',
          },
          {
            id: 'primary',
            labelEn: 'Primary (Sindhanur, Maski, Turvihal)',
            labelKn: 'ಪ್ರಾಥಮಿಕ ವಲಯ (ಸಿಂಧನೂರು, ಮಸ್ಕಿ, ತುರ್ವಿಹಾಳ)',
            labelTe: 'ప్రధాన ప్రాంతాలు (సింధనూరు, మస్కి, తుర్విహాళ్)',
          },
          {
            id: 'nearby',
            labelEn: 'Nearby Hubs (Manvi, Siruguppa, Gangavathi)',
            labelKn: 'ಸಮೀಪದ ಕೇಂದ್ರಗಳು (ಮಾನ್ವಿ, ಸಿರುಗುಪ್ಪ, ಗಂಗಾವತಿ)',
            labelTe: 'సమీప కేంద్రాలు (మాన్వి, సిరుగుప్ప, గంగావతి)',
          },
          {
            id: 'extended',
            labelEn: 'Extended (Raichur, Lingasugur, Koppal)',
            labelKn: 'ವಿಸ್ತೃತ ವಲಯ (ರಾಯಚೂರು, ಲಿಂಗಸುಗೂರು, ಕೊಪ್ಪಳ)',
            labelTe: 'విస్తృత ప్రాంతాలు (రాయచూరు, లింగసుగూరు, కొప్పల్)',
          },
          {
            id: 'rural',
            labelEn: 'Rural Farming Villages',
            labelKn: 'ಗ್ರಾಮೀಣ ಕೃಷಿ ವಲಯ',
            labelTe: 'గ్రామీణ వ్యవసాయ గ్రామాలు',
          },
        ].map((tab) => {
          const isActive = activeTier === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTier(tab.id as ServiceTier | 'all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {isKn ? tab.labelKn : isTe ? tab.labelTe : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Location Pills Grid */}
      <div className="flex flex-wrap gap-2">
        {filteredAreas.map((area) => {
          const isActive = area.id === activeAreaId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveAreaId(area.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-teal-900 text-white shadow-xs ring-2 ring-teal-500/50'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{getName(area)}</span>
              {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />}
            </button>
          );
        })}
      </div>

      {/* Selected Location Feature Card */}
      <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
        {/* Card Header & Fast Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900">
                {getName(selectedArea)}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                {getBadge(selectedArea)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {getDistrict(selectedArea)} ·{' '}
              <span className="text-teal-800 font-semibold">
                {getDistance(selectedArea)}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectCity(selectedArea.nameEn.split(' ')[0])}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>
                {isKn
                  ? `${getName(selectedArea).split(' ')[0]} ನಿಂದ ಸಮಾಲೋಚಿಸಿ`
                  : isTe
                  ? `${getName(selectedArea).split(' ')[0]} నుండి సంప్రదించండి`
                  : `Enquire from ${selectedArea.nameEn.split(' ')[0]}`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/${ADVISOR_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                getWhatsappMsg(selectedArea)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isKn ? 'ವಾಟ್ಸಾಪ್' : isTe ? 'వాట్సాప్' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* 3-Column Structured Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Col 1: Context */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-teal-950">
              <Building className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                {isKn
                  ? 'ಸ್ಥಳೀಯ ಆರ್ಥಿಕ ಹಿನ್ನೆಲೆ'
                  : isTe
                  ? 'స్థానిక ఆర్థిక నేపథ్యం'
                  : 'Local Economic Context'}
              </span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {getContext(selectedArea)}
            </p>
          </div>

          {/* Col 2: Priority Protection Needs */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-teal-950">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                {isKn
                  ? 'ಪ್ರಮುಖ ರಕ್ಷಣಾ ಅಗತ್ಯಗಳು'
                  : isTe
                  ? 'ముఖ్యమైన రక్షణ అవసరాలు'
                  : 'Priority Protection Needs'}
              </span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {getProtectionNeed(selectedArea)}
            </p>
          </div>

          {/* Col 3: Advisory Mode */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-teal-950">
              <Calendar className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                {isKn
                  ? 'ಸಮಾಲೋಚನೆ ಪ್ರಕ್ರಿಯೆ'
                  : isTe
                  ? 'సలహా అందించే విధానం'
                  : 'Advisory Access Mode'}
              </span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {getAdvisoryMode(selectedArea)}
            </p>
          </div>
        </div>

        {/* Responsible Local Disclosure */}
        <div className="bg-amber-50/90 rounded-xl p-3 border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <span>
            {isKn
              ? 'ಪ್ರಾಮಾಣಿಕ ಸ್ಪಷ್ಟನೆ: ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಸಿಂಧನೂರು ನಗರದಲ್ಲಿ ನೆಲೆಸಿರುವ ವೈಯಕ್ತಿಕ ಜೀವ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿಯಾಗಿದ್ದಾರೆ. ಇತರ ತಾಲೂಕುಗಳಲ್ಲಿ ಸ್ವತಂತ್ರ ಕಚೇರಿ ಇದೆ ಎಂದು ಸುಳ್ಳು ಹಕ್ಕು ಸಾಧಿಸುವುದಿಲ್ಲ. ಎಲ್ಲಾ ಪ್ರದೇಶಗಳ ಗ್ರಾಹಕರಿಗೆ ದೂರವಾಣಿ, ವಾಟ್ಸಾಪ್ ಅಥವಾ ಪೂರ್ವನಿಗದಿತ ಮುಖಾಮುಖಿ ಭೇಟಿ ಮೂಲಕ ಪ್ರಾಮಾಣಿಕ ಸೇವೆ ಒದಗಿಸಲಾಗುತ್ತದೆ.'
              : isTe
              ? 'నిజాయితీ ప్రకటన: సోఫియా రాణి గారు సింధనూరు నగరంలో నివాసముంటూ సేవలందిస్తున్న వ్యక్తిగత జీవిత బీమా సలహాదారు. ఇతర తాలూకాల్లో ప్రత్యేక కార్పొరేట్ కార్యాలయాలు ఉన్నట్లు క్లెయిమ్ చేయము. అన్ని ప్రాంతాల వారికి ఫోన్, వాట్సాప్ లేదా ముందస్తు అపాయింట్‌మెంట్ ద్వారా సేవలందిస్తాము.'
              : 'Honest Disclosure: Sofia Rani operates as an individual life insurance advisor based in Sindhanur. We do not claim physical corporate offices in every taluk. Consultations for surrounding areas are conducted via phone, WhatsApp, or scheduled personal meetings.'}
          </span>
        </div>
      </div>
    </section>
  );
};
