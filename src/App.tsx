/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, PublicRoute, LeadRecord, AppointmentSlot, AuditLogItem, TestimonialItem, HeroSlideConfig, HeroSliderGlobalConfig } from './types';
import { TRANSLATIONS } from './i18n/translations';
import { ADVISOR_CONFIG } from './config/advisorConfig';
import { DEFAULT_HERO_SLIDES, DEFAULT_HERO_SLIDER_GLOBAL_CONFIG } from './config/heroAndGuideConfig';

import { Header } from './components/Header';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FamilyPlanningGuideModal } from './components/FamilyPlanningGuideModal';

import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { FamilyProtectionView } from './components/views/FamilyProtectionView';
import { ChildrenFutureView } from './components/views/ChildrenFutureView';
import { RetirementView } from './components/views/RetirementView';
import { PlanningToolsView } from './components/views/PlanningToolsView';
import { PremiumEstimateDetails } from './components/tools/QuickPremiumEstimator';
import { RetirementCalculationDetails } from './components/tools/RetirementPensionCalculator';
import { TaxBenefitDetails } from './components/tools/TaxBenefitEstimator';
import { LearnView } from './components/views/LearnView';
import { BookCallView } from './components/views/BookCallView';
import { CustomerHelpView } from './components/views/CustomerHelpView';
import { ContactView } from './components/views/ContactView';
import { PrivacyView } from './components/views/PrivacyView';
import { DisclosuresView } from './components/views/DisclosuresView';
import { AdminPortalView } from './components/views/AdminPortalView';

// Pre-seeded initial demonstration records for testing in Phase 1
const INITIAL_DEMO_LEADS: LeadRecord[] = [
  {
    id: 'lead_001',
    createdAt: '2026-11-06T10:15:00.000Z',
    name: 'Suresh Patil',
    phone: '9845012345',
    city: 'Gangavathi',
    preferredLanguage: 'kn',
    topic: 'Family Protection (Term Insurance)',
    preferredCallbackTime: 'Morning (9:30 AM - 12:00 PM IST)',
    notes: 'Father of two children, has home loan in Gangavathi. Interested in 1 Cr term cover.',
    stage: 'Contact Attempted',
    consultationConsent: true,
    consultationConsentTimestamp: '2026-11-06T10:15:00.000Z',
    marketingConsent: true,
    marketingConsentTimestamp: '2026-11-06T10:15:00.000Z',
    leadSource: 'Protection Gap Calculator',
    nextFollowUpDate: '2026-11-09',
  },
  {
    id: 'lead_002',
    createdAt: '2026-11-05T14:30:00.000Z',
    name: 'Lakshmi Narayan',
    phone: '7899014523',
    city: 'Karatagi',
    preferredLanguage: 'kn',
    topic: 'Child Higher Education Planning',
    preferredCallbackTime: 'Afternoon (12:00 PM - 3:30 PM IST)',
    notes: 'Daughter in class 5, planning ahead for engineering/medical college fund.',
    stage: 'Appointment Booked',
    consultationConsent: true,
    consultationConsentTimestamp: '2026-11-05T14:30:00.000Z',
    marketingConsent: false,
    leadSource: 'Web Form (Gangavathi Hub)',
    nextFollowUpDate: '2026-11-10',
  },
  {
    id: 'lead_003',
    createdAt: '2026-11-04T16:45:00.000Z',
    name: 'Venkatesh Rao',
    phone: '9448123987',
    city: 'Koppal',
    preferredLanguage: 'en',
    topic: 'Retirement & Pension Planning',
    preferredCallbackTime: 'Evening (3:30 PM - 6:30 PM IST)',
    notes: 'Retiring in 5 years, looking for guaranteed monthly pension annuity.',
    stage: 'New',
    consultationConsent: true,
    consultationConsentTimestamp: '2026-11-04T16:45:00.000Z',
    marketingConsent: true,
    marketingConsentTimestamp: '2026-11-04T16:45:00.000Z',
    leadSource: 'Retirement Guide Page',
    nextFollowUpDate: '2026-11-08',
  },
];

const INITIAL_DEMO_APPOINTMENTS: AppointmentSlot[] = [
  {
    id: 'appt_001',
    customerName: 'Lakshmi Narayan',
    customerPhone: '7899014523',
    date: '2026-11-10',
    time: '11:00',
    durationMinutes: 30,
    topic: 'Child Education Planning Review',
    status: 'Confirmed',
    meetingType: 'Phone Call',
    createdAt: '2026-11-05T14:35:00.000Z',
  },
  {
    id: 'appt_002',
    customerName: 'Prakash Kulkarni',
    customerPhone: '9480112233',
    date: '2026-11-11',
    time: '15:30',
    durationMinutes: 30,
    topic: 'Existing Policy Nominee Update Guidance',
    status: 'Confirmed',
    meetingType: 'In-person (Gangavathi)',
    createdAt: '2026-11-06T09:00:00.000Z',
  },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'audit_init_1',
    timestamp: '10:00 AM IST',
    actor: 'System Initialization',
    action: 'Phase 1 Preview Initialized',
    details: 'Loaded Sofia Rani advisory environment with trilingual localization and planning tools.',
  },
];

const INITIAL_DEMO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test_001',
    clientName: 'Rajeshwar B.',
    city: 'Gangavathi',
    serviceCategory: 'Family Protection',
    feedbackKn: 'ಗಂಗಾವತಿಯಲ್ಲಿ ನಮ್ಮ ಕುಟುಂಬದ ಮಾಸಿಕ ವೆಚ್ಚ ಮತ್ತು ಸಾಲಗಳನ್ನು ಆಧರಿಸಿ ಎಷ್ಟು ಟರ್ಮ್ ಕವರ್ ಬೇಕು ಎಂಬುದನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಕನ್ನಡದಲ್ಲೇ ವಿವರಿಸಿದರು.',
    feedbackEn: 'Sofia explained our family protection gap clearly in Kannada, calculating our coverage needs realistically without pressure.',
    verifiedDate: 'Oct 2026',
    isApproved: true,
  },
  {
    id: 'test_002',
    clientName: 'Sunita M.',
    city: 'Hospet / Gangavathi',
    serviceCategory: 'Child Education Planning',
    feedbackKn: 'ಮಗಳ ಮುಂದಿನ ಇಂಜಿನಿಯರಿಂಗ್ ಶಿಕ್ಷಣಕ್ಕೆ ಹಣದುಬ್ಬರದ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ ಉಳಿತಾಯ ಗುರಿಯನ್ನು ಯೋಜಿಸಲು ಸೋಫಿಯಾ ರಾಣಿ ಅವರ ಮಾರ್ಗದರ್ಶನ ನೆರವಾಯಿತು.',
    feedbackEn: 'The education inflation planning gave our family genuine clarity on planning our daughter’s college fund step-by-step.',
    verifiedDate: 'Sep 2026',
    isApproved: true,
  },
  {
    id: 'test_003',
    clientName: 'Anand Swamy',
    city: 'Koppal',
    serviceCategory: 'Retirement & Annuity',
    feedbackKn: 'ಖಚಿತ ಪಿಂಚಣಿ ಯೋಜನೆಗಳ ನಿಯಮಗಳು ಮತ್ತು ನಿವೃತ್ತಿ ನಂತರದ ಆದಾಯದ ಬಗ್ಗೆ ಯಾವುದೇ ಉತ್ಪ್ರೇಕ್ಷೆಯಿಲ್ಲದೆ ನೇರವಾಗಿ ಮಾಹಿತಿ ನೀಡಿದರು.',
    feedbackEn: 'Honest, patient guidance on guaranteed pension annuity structures without any exaggerated return promises.',
    verifiedDate: 'Aug 2026',
    isApproved: true,
  },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PublicRoute>('home');
  const [language, setLanguage] = useState<Language>('kn'); // Kannada primary

  // Session-persisted leads & appointments for Phase 1 demo
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_DEMO_LEADS);
  const [appointments, setAppointments] = useState<AppointmentSlot[]>(INITIAL_DEMO_APPOINTMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Testimonials state (state-managed carousel with admin portal visibility toggle)
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_DEMO_TESTIMONIALS);
  const [isTestimonialsPublished, setIsTestimonialsPublished] = useState<boolean>(true);

  // Five-Slide Hero Carousel & Interactive 25-Slide Family Guide state
  const [heroSlides, setHeroSlides] = useState<HeroSlideConfig[]>(DEFAULT_HERO_SLIDES);
  const [globalSliderConfig, setGlobalSliderConfig] = useState<HeroSliderGlobalConfig>(DEFAULT_HERO_SLIDER_GLOBAL_CONFIG);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Prefilled states when user transfers from a planning tool or regional hub
  const [prefilledBookingTopic, setPrefilledBookingTopic] = useState<string | undefined>();
  const [prefilledBookingNotes, setPrefilledBookingNotes] = useState<string | undefined>();
  const [prefilledBookingCity, setPrefilledBookingCity] = useState<string | undefined>();

  const handleNavigate = (route: PublicRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeadCaptured = (newLead: LeadRecord) => {
    setLeads((prev) => [newLead, ...prev]);
    const newLog: AuditLogItem = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
      actor: 'Public Visitor',
      action: 'New Lead Submitted',
      details: `Enquiry submitted by ${newLead.name} (${newLead.city}) for topic: ${newLead.topic}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleOpenBookingWithGap = (gap: number) => {
    setPrefilledBookingTopic('Family Protection (Term Insurance)');
    setPrefilledBookingNotes(
      `Calculated Protection Gap from Tool A: ₹${gap.toLocaleString('en-IN')}`
    );
    handleNavigate('book');
  };

  const handleOpenBookingWithEducationCost = (futureCost: number) => {
    setPrefilledBookingTopic('Child Higher Education Planning');
    setPrefilledBookingNotes(
      `Estimated Future Education Cost from Tool B: ₹${futureCost.toLocaleString('en-IN')}`
    );
    handleNavigate('book');
  };

  const handleOpenBookingWithPremiumEstimate = (details: PremiumEstimateDetails) => {
    setPrefilledBookingTopic('Family Protection (Term Insurance)');
    setPrefilledBookingNotes(
      `Quick Premium Estimate: Age ${details.age}, ${details.term}-year term, ₹${(details.sumAssured / 100000).toLocaleString('en-IN')} Lakh cover. Estimated Annual Premium: ₹${details.totalAnnualPremium.toLocaleString('en-IN')} (~₹${details.monthlyEquivalent.toLocaleString('en-IN')}/mo) for ${details.gender === 'female' ? 'Female' : 'Male'} (${details.isTobaccoUser ? 'Tobacco' : 'Non-tobacco'}). Requested consultation with Sofia for underwriting quote.`
    );
    handleNavigate('book');
  };

  const handleOpenBookingWithRetirement = (details: RetirementCalculationDetails) => {
    setPrefilledBookingTopic('Retirement & Pension Planning');
    setPrefilledBookingNotes(
      `Retirement Planning: Current Age ${details.currentAge}, retiring at ${details.retirementAge} (${details.yearsToRetirement} yrs runway). Current monthly expenses ₹${details.monthlyExpenseToday.toLocaleString('en-IN')}, future inflation-adjusted need: ₹${details.futureMonthlyExpense.toLocaleString('en-IN')}/mo. Target Corpus: ₹${details.requiredCorpus.toLocaleString('en-IN')}. Indicative SIP: ~₹${details.monthlyInvestmentNeeded.toLocaleString('en-IN')}/mo.`
    );
    handleNavigate('book');
  };

  const handleOpenBookingWithTax = (details: TaxBenefitDetails) => {
    setPrefilledBookingTopic('Tax Saving & Wealth Advisory (Section 80C & 10(10D))');
    setPrefilledBookingNotes(
      `Section 80C Tax Estimator: Annual Income ₹${details.annualIncome.toLocaleString('en-IN')}, Planned Insurance Investment ₹${details.insurancePremium.toLocaleString('en-IN')}. Eligible 80C Deduction ₹${details.eligible80CDeduction.toLocaleString('en-IN')}. Estimated Tax Saved: ₹${details.totalTaxSaved.toLocaleString('en-IN')} (Net out-of-pocket cost: ₹${details.effectivePremiumCost.toLocaleString('en-IN')}).`
    );
    handleNavigate('book');
  };

  const handleOpenBookingForCity = (city: string) => {
    setPrefilledBookingCity(city);
    handleNavigate('book');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#0F1D36] selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navigation Bar */}
      <Header
        currentRoute={currentRoute}
        setCurrentRoute={handleNavigate}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Telugu Preview Notice Banner (Displays only when Telugu is toggled) */}
      {language === 'te' && (
        <div className="bg-amber-100 text-amber-900 px-4 py-2 text-xs text-center border-b border-amber-200">
          <strong>తెలుగు ప్రివ్యూ:</strong> {TRANSLATIONS.te.teluguNotice}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            language={language}
            onNavigate={handleNavigate}
            onLeadCaptured={handleLeadCaptured}
            testimonials={testimonials}
            isTestimonialsPublished={isTestimonialsPublished}
            heroSlides={heroSlides}
            globalConfig={globalSliderConfig}
            isPausedExternal={isGuideOpen}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {currentRoute === 'about' && (
          <AboutView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'family-protection' && (
          <FamilyProtectionView
            language={language}
            onNavigate={handleNavigate}
            onOpenBookingWithGap={handleOpenBookingWithGap}
            onOpenBookingWithPremiumEstimate={handleOpenBookingWithPremiumEstimate}
          />
        )}

        {currentRoute === 'children-education' && (
          <ChildrenFutureView
            language={language}
            onNavigate={handleNavigate}
            onOpenBookingWithEducationCost={handleOpenBookingWithEducationCost}
          />
        )}

        {currentRoute === 'retirement' && (
          <RetirementView
            language={language}
            onNavigate={handleNavigate}
            onOpenBookingWithRetirement={handleOpenBookingWithRetirement}
          />
        )}

        {currentRoute === 'tools' && (
          <PlanningToolsView
            language={language}
            onNavigate={handleNavigate}
            onOpenBookingWithGap={handleOpenBookingWithGap}
            onOpenBookingWithEducationCost={handleOpenBookingWithEducationCost}
            onOpenBookingWithPremiumEstimate={handleOpenBookingWithPremiumEstimate}
            onOpenBookingWithRetirement={handleOpenBookingWithRetirement}
            onOpenBookingWithTax={handleOpenBookingWithTax}
          />
        )}

        {currentRoute === 'learn' && (
          <LearnView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'book' && (
          <BookCallView
            language={language}
            prefilledTopic={prefilledBookingTopic}
            prefilledNotes={prefilledBookingNotes}
            prefilledCity={prefilledBookingCity}
            onLeadSubmitted={handleLeadCaptured}
          />
        )}

        {currentRoute === 'customer-help' && (
          <CustomerHelpView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactView
            language={language}
            onNavigate={handleNavigate}
            onOpenBookingForCity={handleOpenBookingForCity}
          />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'disclosures' && (
          <DisclosuresView
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminPortalView
            leads={leads}
            setLeads={setLeads}
            appointments={appointments}
            setAppointments={setAppointments}
            auditLogs={auditLogs}
            setAuditLogs={setAuditLogs}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            isTestimonialsPublished={isTestimonialsPublished}
            setIsTestimonialsPublished={setIsTestimonialsPublished}
            heroSlides={heroSlides}
            setHeroSlides={setHeroSlides}
            globalSliderConfig={globalSliderConfig}
            setGlobalSliderConfig={setGlobalSliderConfig}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
      />

      {/* Mobile Bottom Sticky Bar (Call, WhatsApp, Book) */}
      <MobileBottomBar
        language={language}
        onBookClick={() => handleNavigate('book')}
      />

      {/* PWA Offline Indicator */}
      <OfflineIndicator language={language} />

      {/* Interactive 25-Slide Family Planning Guide Modal */}
      <FamilyPlanningGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
        onNavigate={handleNavigate}
        onOpenBookingWithGap={handleOpenBookingWithGap}
        onOpenBookingWithEducationCost={handleOpenBookingWithEducationCost}
      />
    </div>
  );
}
