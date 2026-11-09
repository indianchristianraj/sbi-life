export type Language = 'kn' | 'en' | 'te';

export type PublicRoute =
  | 'home'
  | 'about'
  | 'family-protection'
  | 'children-education'
  | 'retirement'
  | 'tools'
  | 'learn'
  | 'book'
  | 'customer-help'
  | 'contact'
  | 'privacy'
  | 'disclosures'
  | 'admin';

export type LeadStage =
  | 'New'
  | 'Contact Attempted'
  | 'Appointment Booked'
  | 'Consultation Completed'
  | 'Follow-up'
  | 'Policy Issued'
  | 'Closed';

export interface LeadRecord {
  id: string;
  createdAt: string; // ISO timestamp
  name: string;
  phone: string;
  city: string;
  preferredLanguage: Language;
  topic: string;
  preferredCallbackTime: string;
  notes?: string;
  stage: LeadStage;
  consultationConsent: boolean;
  consultationConsentTimestamp: string;
  marketingConsent: boolean;
  marketingConsentTimestamp?: string;
  leadSource: string;
  nextFollowUpDate?: string;
  manualPolicyOutcome?: {
    policyNumberRef?: string;
    productCategory?: string;
    sumAssured?: number;
    issueDate?: string;
    actualCommission?: number; // Restricted to admin
    remarks?: string;
  };
}

export interface AppointmentSlot {
  id: string;
  leadId?: string;
  customerName: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  durationMinutes: number;
  topic: string;
  status: 'Confirmed' | 'Pending Callback' | 'Cancelled' | 'Completed';
  meetingType: 'Phone Call' | 'In-person (Sindhanur)' | 'In-person (Gangavathi)' | 'WhatsApp Call';
  createdAt: string;
}

export type ContentStatus =
  | 'Draft'
  | 'Under Review'
  | 'Approved'
  | 'Published'
  | 'Archived';

export interface EducationalArticle {
  id: string;
  titleKn: string;
  titleEn: string;
  category: 'family' | 'child' | 'retirement' | 'claims';
  summaryKn: string;
  summaryEn: string;
  bodyKn: string;
  bodyEn: string;
  readTime: string;
  status: ContentStatus;
  reviewer?: string;
  lastReviewedDate?: string;
  approvalReference?: string;
  officialSourceUrl?: string;
  videoUrl?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  city: string;
  serviceCategory: string;
  feedbackKn: string;
  feedbackEn: string;
  verifiedDate: string;
  approvalReference?: string;
  reviewer?: string;
  isApproved: boolean;
}

export interface HeroSliderGlobalConfig {
  autoplay: boolean;
  slideDurationMs: number;
  crossfadeDurationMs: number;
  pauseOnHover: boolean;
  pauseOnFocus?: boolean;
  pauseOnInteraction?: boolean;
  loop?: boolean;
  showArrows: boolean;
  showProgress: boolean;
}

export interface HeroSlideConfig {
  id: string;
  order: number;
  isVisible: boolean;
  titleKn?: string;
  titleEn?: string;
  titleTe?: string;
  taglineKn: string;
  taglineEn: string;
  taglineTe?: string;
  headline?: string;
  headlineKn: string;
  headlineEn: string;
  headlineTe?: string;
  subHeadline?: string;
  subHeadlineKn?: string;
  subHeadlineEn?: string;
  subHeadlineTe?: string;
  supportingKn: string;
  supportingEn: string;
  supportingTe?: string;
  primaryActionLabelKn: string;
  primaryActionLabelEn: string;
  primaryActionLabelTe?: string;
  primaryActionDestination: PublicRoute | 'open-guide';
  secondaryActionLabelKn?: string;
  secondaryActionLabelEn?: string;
  secondaryActionLabelTe?: string;
  secondaryActionDestination?: PublicRoute | 'open-guide' | 'whatsapp';
  desktopImage: string;
  mobileImage?: string;
  imageAltKn: string;
  imageAltEn: string;
  imageAltTe?: string;
  isPortraitPlaceholder?: boolean;
  desktopFocalPoint?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  mobileFocalPoint?: 'center' | 'top' | 'bottom';
  overlayStrength?: 'subtle' | 'medium' | 'strong';
  durationOverrideMs?: number;
  status?: 'draft' | 'review' | 'approved' | 'published';
  reviewDate?: string;
  approvalReference?: string;
}

export interface GuideSlideConfig {
  id: number;
  topicGroup: 'basics' | 'expenses' | 'gap' | 'education' | 'savings' | 'retirement' | 'review' | 'action';
  titleKn: string;
  titleEn: string;
  subtitleKn?: string;
  subtitleEn?: string;
  isVisible: boolean;
}

