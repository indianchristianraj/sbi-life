/**
 * Sofia Rani - SBI Life Insurance Advisor
 * Core Advisor Profile, Contact Information, and Brand Configuration
 * Primary Location: Sindhanur, Raichur District, Karnataka, India
 */

export interface AdvisorConfig {
  name: string;
  professionalTitle: {
    en: string;
    kn: string;
    te: string;
  };
  insurerAffiliation: string;
  location: {
    city: string;
    cityKn: string;
    cityTe: string;
    district: string;
    districtKn: string;
    districtTe: string;
    state: string;
    stateKn: string;
    stateTe: string;
    country: string;
    serviceAreaNameKn: string;
    serviceAreaNameEn: string;
    serviceAreaNameTe: string;
    primaryHubs: string[];
    nearbyHubs: string[];
    extendedHubs: string[];
    coverageAreas: string[];
  };
  contact: {
    phone: string;
    displayPhone: string;
    whatsappNumber: string;
    whatsappUrl: string;
    email: string;
  };
  workingHours: {
    days: string;
    daysKn: string;
    daysTe: string;
    timings: string;
    timingsKn: string;
    timingsTe: string;
    timezone: string;
    sundayPolicy: string;
    sundayPolicyKn: string;
    sundayPolicyTe: string;
  };
  compliance: {
    advisorNoticeEn: string;
    advisorNoticeKn: string;
    advisorNoticeTe: string;
    corporateNoticeEn: string;
    corporateNoticeKn: string;
    corporateNoticeTe: string;
    paymentGuidelineEn: string;
    paymentGuidelineKn: string;
    paymentGuidelineTe: string;
  };
}

export const ADVISOR_CONFIG: AdvisorConfig = {
  name: "Sofia Rani",
  professionalTitle: {
    en: "SBI Life Insurance Advisor",
    kn: "ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಸಲಹೆಗಾರ್ತಿ",
    te: "ఎస్.బి.ఐ లైఫ్ ఇన్సూరెన్స్ సలహాదారు",
  },
  insurerAffiliation: "SBI Life Insurance Co. Ltd.",
  location: {
    city: "Sindhanur",
    cityKn: "ಸಿಂಧನೂರು",
    cityTe: "సింధనూరు",
    district: "Raichur",
    districtKn: "ರಾಯಚೂರು",
    districtTe: "రాయచూరు",
    state: "Karnataka",
    stateKn: "ಕರ್ನಾಟಕ",
    stateTe: "కర్ణాటక",
    country: "India",
    serviceAreaNameEn: "Sindhanur, Raichur District, Karnataka",
    serviceAreaNameKn: "ಸಿಂಧನೂರು, ರಾಯಚೂರು ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ",
    serviceAreaNameTe: "సింధనూరు, రాయచూరు జిల్లా, కర్ణాటక",
    primaryHubs: ["Sindhanur", "Turvihal", "Maski"],
    nearbyHubs: ["Manvi", "Siruguppa", "Gangavathi"],
    extendedHubs: ["Raichur", "Lingasugur", "Koppal"],
    coverageAreas: [
      "Sindhanur Town",
      "Turvihal",
      "Maski",
      "Manvi",
      "Siruguppa",
      "Gangavathi",
      "Raichur",
      "Lingasugur",
      "Koppal",
      "Nearby Rural Farming Communities",
    ],
  },
  contact: {
    phone: "+917899151230",
    displayPhone: "+91 78991 51230",
    whatsappNumber: "917899151230",
    whatsappUrl: "https://wa.me/917899151230",
    email: "sofiarani.advisor@example.com",
  },
  workingHours: {
    days: "Monday – Saturday",
    daysKn: "ಸೋಮವಾರ – ಶನಿವಾರ",
    daysTe: "సోమవారం – శనివారం",
    timings: "9:30 AM – 6:30 PM IST",
    timingsKn: "ಬೆಳಗ್ಗೆ 9:30 ರಿಂದ ಸಂಜೆ 6:30 (IST)",
    timingsTe: "ఉదయం 9:30 నుండి సాయంత్రం 6:30 (IST)",
    timezone: "Asia/Kolkata",
    sundayPolicy: "Sunday: Prior appointments only",
    sundayPolicyKn: "ಭಾನುವಾರ: ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ಮಾತ್ರ",
    sundayPolicyTe: "ఆదివారం: ముందస్తు అపాయింట్‌మెంట్ ద్వారా మాత్రమే",
  },
  compliance: {
    advisorNoticeEn:
      "Sofia Rani is an authorized individual insurance advisor affiliated with SBI Life Insurance Co. Ltd. operating in Sindhanur, Raichur District, Karnataka. This is an independent professional advisory website and is NOT the official corporate website of SBI Life Insurance.",
    advisorNoticeKn:
      "ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಸಿಂಧನೂರು, ರಾಯಚೂರು ಜಿಲ್ಲೆಯಲ್ಲಿ ಕರ್ತವ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಕಂಪನಿ ಲಿಮಿಟೆಡ್‌ನ ಅಧಿಕೃತ ಜೀವ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿಯಾಗಿದ್ದಾರೆ. ಇದು ವೈಯಕ್ತಿಕ ವೃತ್ತಿಪರ ಸಲಹಾ ವೆಬ್‌ಸೈಟ್ ಆಗಿದ್ದು, ಎಸ್.ಬಿ.ಐ ಲೈಫ್‌ನ ಅಧಿಕೃತ ಕಾರ್ಪೊರೇಟ್ ಜಾಲತಾಣವಲ್ಲ.",
    advisorNoticeTe:
      "సోఫియా రాణి గారు సింధనూరు, రాయచూరు జిల్లా, కర్ణాటకలో సేవలందిస్తున్న ఎస్.బి.ఐ లైఫ్ ఇన్సూరెన్స్ కంపెనీ లిమిటెడ్ అధికృత వ్యక్తిగత జీవిత బీమా సలహాదారు. ఇది స్వతంత్ర వృత్తిపరమైన సలహా వెబ్‌సైట్ మరియు ఎస్.బి.ఐ లైఫ్ అధికారిక కార్పొరేట్ వెబ్‌సైట్ కాదు.",
    corporateNoticeEn:
      "All insurance plans, brochures, specific benefits, and policy terms are subject to statutory underwriting guidelines and approval of SBI Life Insurance Co. Ltd. No premiums or payments are collected in personal accounts.",
    corporateNoticeKn:
      "ಎಲ್ಲಾ ವಿಮಾ ಯೋಜನೆಗಳು, ಬ್ರೋಷರ್‌ಗಳು ಮತ್ತು ನಿರ್ದಿಷ್ಟ ಸೌಲಭ್ಯಗಳು ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಕಂಪನಿಯ ಅನುಮೋದಿತ ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ. ಯಾವುದೇ ವಿಮಾ ಕಂತುಗಳನ್ನು ವೈಯಕ್ತಿಕ ಖಾತೆಗೆ ಸ್ವೀಕರಿಸಲಾಗುವುದಿಲ್ಲ.",
    corporateNoticeTe:
      "అన్ని బీమా ప్రణాళికలు, బ్రోచర్‌లు మరియు నిర్దిష్ట ప్రయోజనాలు ఎస్.బి.ఐ లైఫ్ ఇన్సూరెన్స్ నిబంధనలకు లోబడి ఉంటాయి. ఎలాంటి ప్రీమియం చెల్లింపులు వ్యక్తిగత ఖాతాలలో స్వీకరించబడవు.",
    paymentGuidelineEn:
      "Always make premium payments directly through official SBI Life online payment portals, authorized bank branches, or certified cashier counters. Always demand an immediate computer-generated receipt.",
    paymentGuidelineKn:
      "ವಿಮಾ ಕಂತುಗಳನ್ನು ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಬ್ಯಾಂಕಿಂಗ್ ಗೇಟ್‌ವೇ ಅಥವಾ ಅಧಿಕೃತ ಶಾಖೆಗಳಲ್ಲಿ ಮಾತ್ರ ಪಾವತಿಸಿ. ಅಧಿಕೃತ ಕಂಪ್ಯೂಟರ್ ರಶೀದಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆದುಕೊಳ್ಳಿ.",
    paymentGuidelineTe:
      "ఎల్లప్పుడూ అధికారిక ఎస్.బి.ఐ లైఫ్ ఆన్‌లైన్ పోర్టల్‌లు లేదా అధీకృత బ్యాంక్ శాఖల ద్వారా మాత్రమే ప్రీమియం చెల్లింపులు చేయండి. కంప్యూటర్ రసీదును తప్పక పొందండి.",
  },
};
