/**
 * Sofia Rani - SBI Life Insurance Advisor
 * Core Advisor Profile, Contact Information, and Brand Configuration
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
    district: string;
    state: string;
    country: string;
    serviceAreaNameKn: string;
    serviceAreaNameEn: string;
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
    timings: string;
    timingsKn: string;
    timezone: string;
    sundayPolicy: string;
    sundayPolicyKn: string;
  };
  compliance: {
    advisorNoticeEn: string;
    advisorNoticeKn: string;
    corporateNoticeEn: string;
    corporateNoticeKn: string;
    paymentGuidelineEn: string;
    paymentGuidelineKn: string;
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
    city: "Gangavathi",
    district: "Koppal",
    state: "Karnataka",
    country: "India",
    serviceAreaNameKn: "ಗಂಗಾವತಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳು",
    serviceAreaNameEn: "Gangavathi and surrounding Koppal/Ballari taluks",
    coverageAreas: [
      "Gangavathi City",
      "Karatagi",
      "Kanakagiri",
      "Kampli",
      "Anegundi",
      "Hospet / Vijayanagara Border",
      "Sindhanoor border",
    ],
  },
  contact: {
    phone: "+917899151230",
    displayPhone: "+91 7899151230",
    whatsappNumber: "917899151230",
    whatsappUrl: "https://wa.me/917899151230",
    email: "sofiarani.advisor@example.com", // Configurable
  },
  workingHours: {
    days: "Monday – Saturday",
    daysKn: "ಸೋಮವಾರ – ಶನಿವಾರ",
    timings: "9:30 AM – 6:30 PM IST",
    timingsKn: "ಬೆಳಗ್ಗೆ 9:30 ರಿಂದ ಸಂಜೆ 6:30 (IST)",
    timezone: "Asia/Kolkata",
    sundayPolicy: "Sunday: Prior appointments only",
    sundayPolicyKn: "ಭಾನುವಾರ: ಮುಂಚಿತ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ ಮಾತ್ರ",
  },
  compliance: {
    advisorNoticeEn:
      "Sofia Rani is an authorized individual insurance advisor affiliated with SBI Life Insurance Co. Ltd. operating in Gangavathi, Karnataka. This is an independent professional advisory website and is NOT the official corporate website of SBI Life Insurance.",
    advisorNoticeKn:
      "ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಗಂಗಾವತಿಯಲ್ಲಿ ಕರ್ತವ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಕಂಪನಿ ಲಿಮಿಟೆಡ್‌ನ ಅಧಿಕೃತ ಜೀವ ವಿಮಾ ಸಲಹೆಗಾರ್ತಿಯಾಗಿದ್ದಾರೆ. ಇದು ವೈಯಕ್ತಿಕ ವೃತ್ತಿಪರ ಸಲಹಾ ವೆಬ್‌ಸೈಟ್ ಆಗಿದ್ದು, ಎಸ್.ಬಿ.ಐ ಲೈಫ್‌ನ ಅಧಿಕೃತ ಕಾರ್ಪೊರೇಟ್ ಜಾಲತಾಣವಲ್ಲ.",
    corporateNoticeEn:
      "All insurance plans, brochures, specific benefits and policy terms are subject to underwriting guidelines and approval of SBI Life Insurance Co. Ltd. No premiums or payments are collected in personal accounts.",
    corporateNoticeKn:
      "ಎಲ್ಲಾ ವಿಮಾ ಯೋಜನೆಗಳು, ಬ್ರೋಷರ್‌ಗಳು ಮತ್ತು ನಿರ್ದಿಷ್ಟ ಸೌಲಭ್ಯಗಳು ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಇನ್ಶೂರೆನ್ಸ್ ಕಂಪನಿಯ ಅನುಮೋದಿತ ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ. ಯಾವುದೇ ವಿಮಾ ಕಂತುಗಳನ್ನು ವೈಯಕ್ತಿಕ ಖಾತೆಗೆ ಸ್ವೀಕರಿಸಲಾಗುವುದಿಲ್ಲ.",
    paymentGuidelineEn:
      "Always make premium payments directly through official SBI Life payment gateways, official branch counters, or authorized banking channels. Always demand an official computer-generated receipt.",
    paymentGuidelineKn:
      "ವಿಮಾ ಕಂತುಗಳನ್ನು ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಎಸ್.ಬಿ.ಐ ಲೈಫ್ ಬ್ಯಾಂಕಿಂಗ್ ಗೇಟ್‌ವೇ ಅಥವಾ ಅಧಿಕೃತ ಶಾಖೆಗಳಲ್ಲಿ ಮಾತ್ರ ಪಾವತಿಸಿ. ಅಧಿಕೃತ ರಶೀದಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆದುಕೊಳ್ಳಿ.",
  },
};
