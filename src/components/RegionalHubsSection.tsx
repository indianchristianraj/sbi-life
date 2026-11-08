import React, { useState } from 'react';
import { MapPin, Navigation, Calendar, Phone, CheckCircle2, Building, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { Language } from '../types';

interface RegionalHub {
  id: string;
  nameEn: string;
  nameKn: string;
  talukEn: string;
  talukKn: string;
  distanceFromGangavathiEn: string;
  distanceFromGangavathiKn: string;
  economicContextEn: string;
  economicContextKn: string;
  keyProtectionNeedEn: string;
  keyProtectionNeedKn: string;
  advisoryModeEn: string;
  advisoryModeKn: string;
  badgeEn: string;
  badgeKn: string;
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'Gangavathi',
    nameEn: 'Gangavathi (Core Hub)',
    nameKn: 'ಗಂಗಾವತಿ (ಮುಖ್ಯ ಕೇಂದ್ರ)',
    talukEn: 'Gangavathi Taluk, Koppal District',
    talukKn: 'ಗಂಗಾವತಿ ತಾಲೂಕು, ಕೊಪ್ಪಳ ಜಿಲ್ಲೆ',
    distanceFromGangavathiEn: 'Advisory Base / Central Location',
    distanceFromGangavathiKn: 'ಮುಖ್ಯ ಸಲಹಾ ಕೇಂದ್ರ',
    economicContextEn: 'Known as the "Rice Bowl of Karnataka" along the Tungabhadra left bank canal. Vibrant commercial APMC market with rice mill operators, agro-input dealers, transport operators, and urban professional families.',
    economicContextKn: 'ತುಂಗಭದ್ರಾ ಎಡದಂಡೆ ನಾಲೆ ಆಶ್ರಿತ ಕರ್ನಾಟಕದ "ಭತ್ತದ ಕಣಜ". ರೈಸ್ ಮಿಲ್ ಮಾಲೀಕರು, ಕೃಷಿ ವ್ಯಾಪಾರಿಗಳು, ಸಾರಿಗೆ ಉದ್ಯಮಿಗಳು ಮತ್ತು ಉದ್ಯೋಗಸ್ಥ ಕುಟುಂಬಗಳ ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಕೇಂದ್ರ.',
    keyProtectionNeedEn: 'High-value term insurance to protect against substantial business borrowings, home loan cover, and dedicated higher education funds for children aspiring for engineering/medical colleges.',
    keyProtectionNeedKn: 'ಉದ್ಯಮದ ಸಾಲ ಮತ್ತು ಗೃಹಸಾಲದ ಹೊಣೆಗೆ ತಕ್ಕಂತೆ ದೊಡ್ಡ ಮೊತ್ತದ ಟರ್ಮ್ ಇನ್ಶೂರೆನ್ಸ್ ರಕ್ಷಣೆ, ಹಾಗೂ ಮಕ್ಕಳ ಉನ್ನತ ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕೆ ಕಾಲಮಿತಿಯ ಶಿಕ್ಷಣ ನಿಧಿ.',
    advisoryModeEn: 'Personal face-to-face consultations in Gangavathi town by prior appointment, or direct phone guidance during official hours (9:30 AM – 6:30 PM).',
    advisoryModeKn: 'ಗಂಗಾವತಿ ನಗರದಲ್ಲಿ ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ಮುಖಾಮುಖಿ ಭೇಟಿ ಅಥವಾ ಅಧಿಕೃತ ಸಮಯದಲ್ಲಿ ನೇರ ದೂರವಾಣಿ ಸಮಾಲೋಚನೆ.',
    badgeEn: 'Advisory Base',
    badgeKn: 'ಮುಖ್ಯ ಕೇಂದ್ರ',
  },
  {
    id: 'Karatagi',
    nameEn: 'Karatagi',
    nameKn: 'ಕಾರಟಗಿ',
    talukEn: 'Karatagi Taluk, Koppal District',
    talukKn: 'ಕಾರಟಗಿ ತಾಲೂಕು, ಕೊಪ್ಪಳ ಜಿಲ್ಲೆ',
    distanceFromGangavathiEn: '21 km via SH-23',
    distanceFromGangavathiKn: 'ಗಂಗಾವತಿಯಿಂದ 21 ಕಿ.ಮೀ',
    economicContextEn: 'Thriving agricultural hub with extensive paddy cultivation, modern parboiled rice mills, and enterprising progressive farm families with seasonal harvest cashflows.',
    economicContextKn: 'ಭತ್ತದ ಸಮೃದ್ಧ ಬೆಳೆ, ಆಧುನಿಕ ರೈಸ್ ಮಿಲ್‌ಗಳು ಮತ್ತು ಕಾಲೋಚಿತ ಸುಗ್ಗಿ ಆದಾಯ ಹೊಂದಿರುವ ಪ್ರಗತಿಪರ ಕೃಷಿಕರ ತಾಲೂಕು ಕೇಂದ್ರ.',
    keyProtectionNeedEn: 'Aligning insurance premium frequencies with agricultural harvest seasons; safeguarding children’s future against volatile monsoon or commodity price fluctuations.',
    keyProtectionNeedKn: 'ಸುಗ್ಗಿ ಕಾಲಕ್ಕೆ ಅನುಗುಣವಾದ ಪ್ರೀಮಿಯಂ ಪಾವತಿ ವ್ಯವಸ್ಥೆ, ಮತ್ತು ಬೆಳೆ ಅನಿಶ್ಚಿತತೆಯಲ್ಲೂ ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಹಾಗೂ ಮದುವೆ ನಿಧಿ ಸುರಕ್ಷಿತವಾಗಿರುವುದು.',
    advisoryModeEn: 'Scheduled weekly advisory visits to Karatagi, doorstep form clarification, and telephone/WhatsApp consultations.',
    advisoryModeKn: 'ಕಾರಟಗಿಗೆ ವಾರಕ್ಕೊಮ್ಮೆ ನಿಗದಿತ ಭೇಟಿ, ಮನೆ ಬಾಗಿಲಿಗೆ ಮಾರ್ಗದರ್ಶನ ಹಾಗೂ ವಾಟ್ಸಾಪ್/ದೂರವಾಣಿ ನೆರವು.',
    badgeEn: 'Paddy Trading Belt',
    badgeKn: 'ಭತ್ತದ ವಾಣಿಜ್ಯ ವಲಯ',
  },
  {
    id: 'Kanakagiri',
    nameEn: 'Kanakagiri',
    nameKn: 'ಕನಕಗಿರಿ',
    talukEn: 'Kanakagiri Taluk, Koppal District',
    talukKn: 'ಕನಕಗಿರಿ ತಾಲೂಕು, ಕೊಪ್ಪಳ ಜಿಲ್ಲೆ',
    distanceFromGangavathiEn: '24 km via Gangavathi-Kanakagiri Road',
    distanceFromGangavathiKn: 'ಗಂಗಾವತಿಯಿಂದ 24 ಕಿ.ಮೀ',
    economicContextEn: 'Historical town renowned for the Sri Kanakachalapathi temple. Community primarily engaged in agrarian livelihoods, horticulture, local retail trade, and artisan crafts.',
    economicContextKn: 'ಕನಕಾಚಲಪತಿ ದೇವಸ್ಥಾನದ ಐತಿಹಾಸಿಕ ತಾಲೂಕು. ತೋಟಗಾರಿಕೆ, ಕೃಷಿ, ಸಣ್ಣ ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರ ಮತ್ತು ಕುಶಲಕರ್ಮಿ ಕುಟುಂಬಗಳ ಪ್ರಮುಖ ನೆಲೆ.',
    keyProtectionNeedEn: 'Disciplined savings with guaranteed life cover, return of premium options, and securing families lacking corporate retirement benefits with a reliable pension structure.',
    keyProtectionNeedKn: 'ಉದ್ಯೋಗ ಭದ್ರತೆ ಇಲ್ಲದ ಕುಟುಂಬಗಳಿಗೆ ಖಚಿತ ಪಿಂಚಣಿ ಸೌಲಭ್ಯ, ಶಿಸ್ತುಬದ್ಧ ಉಳಿತಾಯ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಅವಘಡದಲ್ಲಿ ಕುಟುಂಬಕ್ಕೆ ಆಸರೆಯಾಗುವ ರಕ್ಷಣೆ.',
    advisoryModeEn: 'Pre-arranged weekend visits for family consultations and ongoing phone advisory support.',
    advisoryModeKn: 'ವಾರಾಂತ್ಯದಲ್ಲಿ ಮುಂಚಿತ ನಿಗದಿತ ಕುಟುಂಬ ಭೇಟಿ ಹಾಗೂ ನಿರಂತರ ದೂರವಾಣಿ ಸಲಹಾ ಸೇವೆ.',
    badgeEn: 'Heritage & Agri Center',
    badgeKn: 'ಐತಿಹಾಸಿಕ ಕೃಷಿ ಕೇಂದ್ರ',
  },
  {
    id: 'Kampli',
    nameEn: 'Kampli',
    nameKn: 'ಕಂಪ್ಲಿ',
    talukEn: 'Kampli Taluk, Vijayanagara/Ballari Border',
    talukKn: 'ಕಂಪ್ಲಿ ತಾಲೂಕು, ವಿಜಯನಗರ ಜಿಲ್ಲೆ ಗಡಿ',
    distanceFromGangavathiEn: '14 km across Tungabhadra River Bridge',
    distanceFromGangavathiKn: 'ತುಂಗಭದ್ರಾ ನದಿಯ ಸೇತುವೆ ಮೂಲಕ 14 ಕಿ.ಮೀ',
    economicContextEn: 'Historic town on the southern bank of the Tungabhadra river. Renowned for sugar manufacturing, traditional weaving communities, banana farming, and cross-river trade with Gangavathi.',
    economicContextKn: 'ತುಂಗಭದ್ರಾ ನದಿ ದಂಡೆಯ ಪಟ್ಟಣ. ಸಕ್ಕರೆ ಕಾರ್ಖಾನೆ, ಕೈಮಗ್ಗ-ವಸ್ತ್ರ ನೇಯ್ಗೆ ಪರಂಪರೆ, ಬಾಳೆ ಮತ್ತು ಕಬ್ಬು ಬೆಳೆಗಾರರ ಚಟುವಟಿಕೆಯ ವಲಯ.',
    keyProtectionNeedEn: 'Breadwinner income protection for weavers and self-employed artisans, ensuring trade borrowings or machinery loans do not burden the surviving family.',
    keyProtectionNeedKn: 'ನೇಯ್ಗೆ ಕುಶಲಕರ್ಮಿಗಳು ಮತ್ತು ವ್ಯಾಪಾರಿಗಳಿಗೆ ಆಕಸ್ಮಿಕ ಸಂದರ್ಭದಲ್ಲಿ ಸಾಲದ ಹೊರೆ ಕುಟುಂಬದ ಮೇಲೆ ಬೀಳದಂತೆ ಆದಾಯ ರಕ್ಷಣಾ ವಿಮೆ.',
    advisoryModeEn: 'Direct telephone consultations and pre-scheduled appointments across the river.',
    advisoryModeKn: 'ನೇರ ದೂರವಾಣಿ ಸಮಾಲೋಚನೆ ಮತ್ತು ಅನುಕೂಲಕರ ಸಮಯದಲ್ಲಿ ನದಿ ದಾಟಿ ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಭೇಟಿ.',
    badgeEn: 'Riverfront & Weaving Hub',
    badgeKn: 'ನದಿ ದಂಡೆಯ ನೇಯ್ಗೆ ಕೇಂದ್ರ',
  },
  {
    id: 'Anegundi',
    nameEn: 'Anegundi',
    nameKn: 'ಆನೆಗೊಂದಿ',
    talukEn: 'Gangavathi Taluk (Heritage Buffer)',
    talukKn: 'ಗಂಗಾವತಿ ತಾಲೂಕು (ಐತಿಹಾಸಿಕ ವಲಯ)',
    distanceFromGangavathiEn: '10 km scenic route',
    distanceFromGangavathiKn: 'ಗಂಗಾವತಿಯಿಂದ 10 ಕಿ.ಮೀ',
    economicContextEn: 'Ancient epic Kishkindha territory along the boulder-strewn Tungabhadra landscape. Vibrant eco-tourism, organic farming, rural handicrafts (banana fiber craft), and homestays.',
    economicContextKn: 'ಪ್ರಾಚೀನ ಕಿಷ್ಕಿಂಧಾ ಪ್ರದೇಶ. ಪರಿಸರ ಪ್ರವಾಸೋದ್ಯಮ, ಸಾವಯವ ಕೃಷಿ, ಬಾಳೆ ನಾರಿನ ಕರಕುಶಲ ವಸ್ತುಗಳ ತಯಾರಿ ಮತ್ತು ಹೋಮ್‌ಸ್ಟೇಗಳ ಗ್ರಾಮೀಣ ಆರ್ಥಿಕತೆ.',
    keyProtectionNeedEn: 'Long-term financial cushion for self-reliant rural and tourism families who do not have formal provident fund or gratuity benefits.',
    keyProtectionNeedKn: 'ಸರ್ಕಾರಿ ನೌಕರಿ ಇಲ್ಲದ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಗ್ರಾಮೀಣ ಉದ್ಯಮಿಗಳಿಗೆ ನಿಶ್ಚಿತ ನಿವೃತ್ತಿ ಪಿಂಚಣಿ ಮತ್ತು ಜೀವ ರಕ್ಷಣಾ ಕವಚ.',
    advisoryModeEn: 'Phone advisory and personalized home visits on confirmed schedule.',
    advisoryModeKn: 'ದೂರವಾಣಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಖಚಿತಪಡಿಸಿದ ದಿನಾಂಕದಂದು ಆನೆಗೊಂದಿಯಲ್ಲಿ ನೇರ ಭೇಟಿ.',
    badgeEn: 'Heritage & Eco-Tourism',
    badgeKn: 'ಪಾರಂಪರಿಕ ತಾಣ',
  },
];

interface Props {
  language: Language;
  onSelectCity: (cityId: string) => void;
}

export const RegionalHubsSection: React.FC<Props> = ({ language, onSelectCity }) => {
  const isKn = language === 'kn';
  const [activeHubId, setActiveHubId] = useState<string>('Gangavathi');

  const selectedHub = REGIONAL_HUBS.find((h) => h.id === activeHubId) || REGIONAL_HUBS[0];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-teal-700" />
          <span>{isKn ? 'ಸ್ಥಳೀಯ ಸೇವಾ ವ್ಯಾಪ್ತಿ ಮತ್ತು ತಾಲೂಕುಗಳು' : 'Regional Advisory Coverage & Local Context'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {isKn
            ? 'ಗಂಗಾವತಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಮಾಲೋಚನೆ'
            : 'Advisory Support Across Gangavathi & Neighboring Hubs'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {isKn
            ? 'ಪ್ರತಿಯೊಂದು ತಾಲೂಕಿನ ಆರ್ಥಿಕ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ಕುಟುಂಬಗಳ ಆದಾಯ ಮೂಲಗಳು ಭಿನ್ನವಾಗಿವೆ. ಕೆಳಗಿನ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಸೂಕ್ತವಾದ ವಿಮಾ ಸಮಾಲೋಚನಾ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
            : 'Every community has distinct economic rhythms and financial responsibilities. Explore how Sofia Rani coordinates personalized consultations tailored to your local context.'}
        </p>
      </div>

      {/* Hub Pill Selector */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-100 pb-4">
        {REGIONAL_HUBS.map((hub) => {
          const isActive = hub.id === activeHubId;
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveHubId(hub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <span>{isKn ? hub.nameKn : hub.nameEn}</span>
              {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />}
            </button>
          );
        })}
      </div>

      {/* Selected Hub Detailed Card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {isKn ? selectedHub.nameKn : selectedHub.nameEn}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                {isKn ? selectedHub.badgeKn : selectedHub.badgeEn}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isKn ? selectedHub.talukKn : selectedHub.talukEn} ·{' '}
              <span className="text-teal-800 font-medium">
                {isKn ? selectedHub.distanceFromGangavathiKn : selectedHub.distanceFromGangavathiEn}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectCity(selectedHub.id)}
            className="self-start sm:self-auto px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span>{isKn ? `${selectedHub.nameKn} ಸಮಾಲೋಚನೆ ನಿಗದಿಪಡಿಸಿ` : `Book for ${selectedHub.nameEn}`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Col 1: Economic & Community Context */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-teal-900">
              <Building className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಸ್ಥಳೀಯ ಆರ್ಥಿಕ ಹಿನ್ನೆಲೆ' : 'Local Community Context'}</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {isKn ? selectedHub.economicContextKn : selectedHub.economicContextEn}
            </p>
          </div>

          {/* Col 2: Priority Family Protection Needs */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-teal-900">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಪ್ರಮುಖ ರಕ್ಷಣಾ ಅಗತ್ಯಗಳು' : 'Priority Advisory Needs'}</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {isKn ? selectedHub.keyProtectionNeedKn : selectedHub.keyProtectionNeedEn}
            </p>
          </div>

          {/* Col 3: How Sofia Rani Coordinates Consultations */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5 text-teal-900">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>{isKn ? 'ಸಮಾಲೋಚನೆ ಪ್ರಕ್ರಿಯೆ' : 'Consultation Access Mode'}</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {isKn ? selectedHub.advisoryModeKn : selectedHub.advisoryModeEn}
            </p>
          </div>
        </div>

        {/* Responsible Anti-Doorway Disclosure */}
        <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            {isKn
              ? 'ಪ್ರಾಮಾಣಿಕ ಸ್ಪಷ್ಟನೆ: ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಗಂಗಾವತಿಯಲ್ಲಿ ನೆಲೆಸಿರುವ ವೈಯಕ್ತಿಕ ಜೀವ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿಯಾಗಿದ್ದಾರೆ. ಯಾವುದೇ ತಾಲೂಕಿನಲ್ಲಿ ಪ್ರತ್ಯೇಕ ಶಾಖೆ ಅಥವಾ ಕಚೇರಿ ಇದೆ ಎಂದು ಸುಳ್ಳು ಹಕ್ಕು ಪ್ರತಿಪಾದಿಸುವುದಿಲ್ಲ. ಈ ಎಲ್ಲಾ ಪ್ರದೇಶಗಳಿಗೆ ದೂರವಾಣಿ ಅಥವಾ ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ನೇರ ಸೇವೆ ಲಭ್ಯವಿದೆ.'
              : 'Honest Disclosure: Sofia Rani operates as an individual advisor based in Gangavathi. We do not claim physical corporate offices in nearby taluks. Advisory to Karatagi, Kanakagiri, Kampli, and Anegundi is delivered via telephone, WhatsApp, or scheduled personal visits.'}
          </span>
        </div>
      </div>
    </section>
  );
};
