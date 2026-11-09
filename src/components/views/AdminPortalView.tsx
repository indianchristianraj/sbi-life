import React, { useState } from 'react';
import {
  Shield,
  Search,
  Filter,
  Calendar,
  Download,
  Trash2,
  Edit3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText,
  UserCheck,
  Eye,
  EyeOff,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Monitor,
  Smartphone,
  RotateCcw,
  Sliders,
  Check,
  Compass,
} from 'lucide-react';
import {
  LeadRecord,
  LeadStage,
  AppointmentSlot,
  EducationalArticle,
  AuditLogItem,
  TestimonialItem,
  HeroSlideConfig,
  HeroSliderGlobalConfig,
  PublicRoute,
} from '../../types';
import { ADVISOR_CONFIG } from '../../config/advisorConfig';
import { DEFAULT_HERO_SLIDES, DEFAULT_HERO_SLIDER_GLOBAL_CONFIG } from '../../config/heroAndGuideConfig';
import { HeroCarousel } from '../HeroCarousel';
import {
  downloadStandaloneIndexHtml,
  downloadNetlifyZip,
  downloadSourceZip,
} from '../DownloadWebsiteButton';

interface Props {
  leads: LeadRecord[];
  setLeads: React.Dispatch<React.SetStateAction<LeadRecord[]>>;
  appointments: AppointmentSlot[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentSlot[]>>;
  auditLogs: AuditLogItem[];
  setAuditLogs: React.Dispatch<React.SetStateAction<AuditLogItem[]>>;
  testimonials?: TestimonialItem[];
  setTestimonials?: React.Dispatch<React.SetStateAction<TestimonialItem[]>>;
  isTestimonialsPublished?: boolean;
  setIsTestimonialsPublished?: React.Dispatch<React.SetStateAction<boolean>>;
  heroSlides?: HeroSlideConfig[];
  setHeroSlides?: React.Dispatch<React.SetStateAction<HeroSlideConfig[]>>;
  globalSliderConfig?: HeroSliderGlobalConfig;
  setGlobalSliderConfig?: React.Dispatch<React.SetStateAction<HeroSliderGlobalConfig>>;
}

const STAGES: LeadStage[] = [
  'New',
  'Contact Attempted',
  'Appointment Booked',
  'Consultation Completed',
  'Follow-up',
  'Policy Issued',
  'Closed',
];

export const AdminPortalView: React.FC<Props> = ({
  leads,
  setLeads,
  appointments,
  setAppointments,
  auditLogs,
  setAuditLogs,
  testimonials = [],
  setTestimonials,
  isTestimonialsPublished = false,
  setIsTestimonialsPublished,
  heroSlides = [],
  setHeroSlides,
  globalSliderConfig = DEFAULT_HERO_SLIDER_GLOBAL_CONFIG,
  setGlobalSliderConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'calendar' | 'slider' | 'content' | 'audit' | 'roadmap'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<LeadRecord | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [followUpDateInput, setFollowUpDateInput] = useState('');

  // Hero Slider Governance State
  const [sliderPreviewMode, setSliderPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedSlideForEdit, setSelectedSlideForEdit] = useState<HeroSlideConfig | null>(null);
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editTitleKn, setEditTitleKn] = useState('');
  const [editHeadlineEn, setEditHeadlineEn] = useState('');
  const [editHeadlineKn, setEditHeadlineKn] = useState('');
  const [editSupportingEn, setEditSupportingEn] = useState('');
  const [editSupportingKn, setEditSupportingKn] = useState('');
  const [editTaglineEn, setEditTaglineEn] = useState('');
  const [editTaglineKn, setEditTaglineKn] = useState('');
  const [editPrimaryLabelEn, setEditPrimaryLabelEn] = useState('');
  const [editPrimaryLabelKn, setEditPrimaryLabelKn] = useState('');
  const [editPrimaryDestination, setEditPrimaryDestination] = useState<PublicRoute | 'open-guide'>('book');
  const [editSecondaryLabelEn, setEditSecondaryLabelEn] = useState('');
  const [editSecondaryLabelKn, setEditSecondaryLabelKn] = useState('');
  const [editSecondaryDestination, setEditSecondaryDestination] = useState<string>('');
  const [editDesktopImage, setEditDesktopImage] = useState('');
  const [editMobileImage, setEditMobileImage] = useState('');
  const [editAltEn, setEditAltEn] = useState('');
  const [editAltKn, setEditAltKn] = useState('');
  const [editOverlayStrength, setEditOverlayStrength] = useState<'subtle' | 'medium' | 'strong'>('medium');
  const [editFocalPoint, setEditFocalPoint] = useState<'center' | 'left' | 'right' | 'top' | 'bottom'>('center');
  const [editStatus, setEditStatus] = useState<'draft' | 'review' | 'approved' | 'published'>('published');
  const [editApprovalRef, setEditApprovalRef] = useState('');
  const [editIsVisible, setEditIsVisible] = useState(true);
  const [editValidationError, setEditValidationError] = useState<string | null>(null);

  // Testimonial management state
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCity, setNewClientCity] = useState('Sindhanur');
  const [newServiceCategory, setNewServiceCategory] = useState('Family Protection (Term Insurance)');
  const [newFeedbackKn, setNewFeedbackKn] = useState('');
  const [newFeedbackEn, setNewFeedbackEn] = useState('');
  const [newApprovalRef, setNewApprovalRef] = useState('COMP-VERIFIED-2026-01');

  // Policy Outcome editing modal
  const [selectedLeadForOutcome, setSelectedLeadForOutcome] = useState<LeadRecord | null>(null);
  const [outcomePolicyRef, setOutcomePolicyRef] = useState('');
  const [outcomeCategory, setOutcomeCategory] = useState('SBI Life - Pure Protection (Term)');
  const [outcomeSumAssured, setOutcomeSumAssured] = useState<number>(5000000);
  const [outcomeCommission, setOutcomeCommission] = useState<number>(7500);

  // New appointment form state
  const [newApptDate, setNewApptDate] = useState('');
  const [newApptTime, setNewApptTime] = useState('10:00');
  const [newApptName, setNewApptName] = useState('');
  const [newApptPhone, setNewApptPhone] = useState('');
  const [newApptTopic, setNewApptTopic] = useState('Family Protection Review');
  const [apptCollisionError, setApptCollisionError] = useState<string | null>(null);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
      actor: 'Sofia Rani (Authorized Advisor)',
      action,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Real-time filter for leads by name, city, or phone number
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesStage = selectedStage === 'All' || lead.stage === selectedStage;

    if (!q) {
      return matchesStage;
    }

    // Normalize phone numbers (stripping non-digits) for flexible number search
    const cleanLeadPhone = lead.phone.replace(/\D/g, '');
    const cleanQuery = q.replace(/\D/g, '');

    const matchesName = lead.name.toLowerCase().includes(q);
    const matchesCity = lead.city.toLowerCase().includes(q);
    const matchesPhone = cleanQuery.length > 0 
      ? cleanLeadPhone.includes(cleanQuery) 
      : lead.phone.toLowerCase().includes(q);
    const matchesTopic = lead.topic.toLowerCase().includes(q);

    return (matchesName || matchesCity || matchesPhone || matchesTopic) && matchesStage;
  });

  // Stage update handler
  const handleStageChange = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    addAuditLog('Lead Stage Updated', `Lead ID ${leadId} shifted to stage: ${newStage}`);
  };

  // Save notes & follow up
  const handleSaveNotes = () => {
    if (!selectedLeadForNotes) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLeadForNotes.id
          ? {
              ...l,
              notes: noteInput,
              nextFollowUpDate: followUpDateInput || l.nextFollowUpDate,
            }
          : l
      )
    );
    addAuditLog('Lead Notes Updated', `Updated private notes for ${selectedLeadForNotes.name}`);
    setSelectedLeadForNotes(null);
  };

  // Save policy outcome
  const handleSaveOutcome = () => {
    if (!selectedLeadForOutcome) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLeadForOutcome.id
          ? {
              ...l,
              stage: 'Policy Issued',
              manualPolicyOutcome: {
                policyNumberRef: outcomePolicyRef || 'SBI-PROP-' + Math.floor(100000 + Math.random() * 900000),
                productCategory: outcomeCategory,
                sumAssured: outcomeSumAssured,
                actualCommission: outcomeCommission,
                issueDate: new Date().toISOString().split('T')[0],
              },
            }
          : l
      )
    );
    addAuditLog(
      'Policy Outcome Recorded',
      `Policy issued for ${selectedLeadForOutcome.name}. Sum Assured: ₹${outcomeSumAssured.toLocaleString('en-IN')}`
    );
    setSelectedLeadForOutcome(null);
  };

  // Delete lead under DPDP Right to Erasure
  const handleDeleteLead = (leadId: string, leadName: string) => {
    if (confirm(`Confirm deletion of enquiry record for "${leadName}" under DPDP erasure guidelines?`)) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      addAuditLog('Lead Deleted (DPDP Right to Erasure)', `Permanently purged lead record: ${leadName}`);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Lead ID',
      'Created At (UTC)',
      'Name',
      'Phone',
      'City',
      'Preferred Language',
      'Topic',
      'Callback Window',
      'Stage',
      'Consultation Consent',
      'Marketing Consent',
      'Notes',
    ];
    const rows = leads.map((l) => [
      l.id,
      l.createdAt,
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      `"${l.city}"`,
      l.preferredLanguage,
      `"${l.topic.replace(/"/g, '""')}"`,
      `"${l.preferredCallbackTime}"`,
      l.stage,
      l.consultationConsent ? 'YES' : 'NO',
      l.marketingConsent ? 'YES' : 'NO',
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sofia_rani_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditLog('CSV Export', `Exported ${leads.length} lead records to CSV.`);
  };

  // Appointment creation with collision handling
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setApptCollisionError(null);

    // Collision check: verify if identical date & time already exists
    const collision = appointments.find(
      (a) => a.date === newApptDate && a.time === newApptTime && a.status !== 'Cancelled'
    );

    if (collision) {
      setApptCollisionError(
        `Appointment Collision Detected: Slot ${newApptDate} at ${newApptTime} is already booked for ${collision.customerName} (${collision.topic}). Please choose a different 30-minute window.`
      );
      return;
    }

    const newAppt: AppointmentSlot = {
      id: `appt_${Date.now()}`,
      customerName: newApptName,
      customerPhone: newApptPhone,
      date: newApptDate,
      time: newApptTime,
      durationMinutes: 30,
      topic: newApptTopic,
      status: 'Confirmed',
      meetingType: 'Phone Call',
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, newAppt]);
    addAuditLog('Appointment Created', `Booked slot for ${newApptName} on ${newApptDate} at ${newApptTime}`);
    setNewApptName('');
    setNewApptPhone('');
  };

  // Open slide modal for editing
  const handleOpenEditSlide = (slide: HeroSlideConfig) => {
    setSelectedSlideForEdit(slide);
    setEditTitleEn(slide.titleEn || '');
    setEditTitleKn(slide.titleKn || '');
    setEditHeadlineEn(slide.headlineEn || '');
    setEditHeadlineKn(slide.headlineKn || '');
    setEditSupportingEn(slide.supportingEn || '');
    setEditSupportingKn(slide.supportingKn || '');
    setEditTaglineEn(slide.taglineEn || '');
    setEditTaglineKn(slide.taglineKn || '');
    setEditPrimaryLabelEn(slide.primaryActionLabelEn || '');
    setEditPrimaryLabelKn(slide.primaryActionLabelKn || '');
    setEditPrimaryDestination(slide.primaryActionDestination || 'book');
    setEditSecondaryLabelEn(slide.secondaryActionLabelEn || '');
    setEditSecondaryLabelKn(slide.secondaryActionLabelKn || '');
    setEditSecondaryDestination(slide.secondaryActionDestination || '');
    setEditDesktopImage(slide.desktopImage || '');
    setEditMobileImage(slide.mobileImage || '');
    setEditAltEn(slide.imageAltEn || '');
    setEditAltKn(slide.imageAltKn || '');
    setEditOverlayStrength(slide.overlayStrength || 'medium');
    setEditFocalPoint(slide.desktopFocalPoint || 'center');
    setEditStatus(slide.status || 'published');
    setEditApprovalRef(slide.approvalReference || 'COMP-HERO-2026-SR');
    setEditIsVisible(slide.isVisible);
    setEditValidationError(null);
  };

  // Save slide edits with validation
  const handleSaveSlide = () => {
    if (!selectedSlideForEdit || !setHeroSlides) return;

    if (!editHeadlineEn.trim() || !editPrimaryLabelEn.trim()) {
      setEditValidationError('Headline and Primary CTA label are required.');
      return;
    }

    // Security validation: Prevent javascript: or unsafe URL schemas
    if (editDesktopImage.toLowerCase().startsWith('javascript:')) {
      setEditValidationError('Unsafe image path detected.');
      return;
    }

    const updated: HeroSlideConfig = {
      ...selectedSlideForEdit,
      titleEn: editTitleEn.trim(),
      titleKn: editTitleKn.trim(),
      headlineEn: editHeadlineEn.trim(),
      headlineKn: editHeadlineKn.trim(),
      supportingEn: editSupportingEn.trim(),
      supportingKn: editSupportingKn.trim(),
      taglineEn: editTaglineEn.trim(),
      taglineKn: editTaglineKn.trim(),
      primaryActionLabelEn: editPrimaryLabelEn.trim(),
      primaryActionLabelKn: editPrimaryLabelKn.trim(),
      primaryActionDestination: editPrimaryDestination,
      secondaryActionLabelEn: editSecondaryLabelEn.trim() || undefined,
      secondaryActionLabelKn: editSecondaryLabelKn.trim() || undefined,
      secondaryActionDestination: (editSecondaryDestination as any) || undefined,
      desktopImage: editDesktopImage.trim() || selectedSlideForEdit.desktopImage,
      mobileImage: editMobileImage.trim() || undefined,
      imageAltEn: editAltEn.trim() || selectedSlideForEdit.imageAltEn,
      imageAltKn: editAltKn.trim() || selectedSlideForEdit.imageAltKn,
      overlayStrength: editOverlayStrength,
      desktopFocalPoint: editFocalPoint,
      status: editStatus,
      approvalReference: editApprovalRef.trim(),
      reviewDate: new Date().toISOString().split('T')[0],
      isVisible: editIsVisible,
    };

    setHeroSlides((prev) => prev.map((s) => (s.id === selectedSlideForEdit.id ? updated : s)));
    addAuditLog('Hero Slide Content Updated', `Updated editorial content for "${updated.titleEn || updated.headlineEn}"`);
    setSelectedSlideForEdit(null);
  };

  // Export Slider Config JSON
  const handleExportSliderJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      globalConfig: globalSliderConfig,
      slides: heroSlides,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `sofia_rani_hero_slider_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAuditLog('Slider Config Export', 'Exported slider configuration JSON.');
  };

  // Reset to Factory Defaults
  const handleResetSliderDefaults = () => {
    if (window.confirm('Reset hero slides and global autoplay settings to factory defaults?')) {
      if (setHeroSlides) setHeroSlides(DEFAULT_HERO_SLIDES);
      if (setGlobalSliderConfig) setGlobalSliderConfig(DEFAULT_HERO_SLIDER_GLOBAL_CONFIG);
      addAuditLog('Slider Reset', 'Restored 5 default hero slides and global autoplay settings.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* Top Banner: Private Advisor Management Suite */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Private Advisor Suite · Secure Management Dashboard
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Sofia Rani · Lead & Appointment Management
          </h1>
          <p className="text-xs text-slate-400">
            Sindhanur Hub · Asia/Kolkata (IST) · Real-time Session Records & Customer Enquiries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            title="Download CSV of customer leads"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => downloadStandaloneIndexHtml()}
            className="px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-700/60"
            title="Download single-file standalone index.html"
          >
            <Download className="w-3.5 h-3.5 text-emerald-300" />
            <span>Export index.html</span>
          </button>

          <button
            type="button"
            onClick={() => downloadNetlifyZip()}
            className="px-3 py-1.5 bg-teal-900/60 hover:bg-teal-800 text-teal-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-teal-700/60"
            title="Download Netlify deployment ZIP ready for drag-and-drop"
          >
            <Download className="w-3.5 h-3.5 text-teal-300" />
            <span>Netlify ZIP</span>
          </button>

          <button
            type="button"
            onClick={() => downloadSourceZip()}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            title="Download complete project source ZIP"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Source ZIP</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'leads' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Leads Pipeline ({filteredLeads.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'calendar' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Appointment Calendar ({appointments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('slider')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'slider' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-teal-400" />
          <span>Hero Slider ({heroSlides.filter((s) => s.isVisible).length} / {heroSlides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'content' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Content Governance
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'audit' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Audit Log ({auditLogs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'roadmap' ? 'bg-teal-800 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Phase 2 Integration Roadmap
        </button>
      </div>

      {/* TAB 1: LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {/* Controls bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 space-y-3 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Real-time search input */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, phone (e.g. 9845), or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Stage filter & count */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500">Stage:</span>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
                  >
                    <option value="All">All Stages ({leads.length})</option>
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s} ({leads.filter((l) => l.stage === s).length})
                      </option>
                    ))}
                  </select>
                </div>

                {(searchQuery || selectedStage !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStage('All');
                    }}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-900 underline cursor-pointer ml-2"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Chips & Match Count */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-medium text-slate-600">Quick city filter:</span>
                {['Sindhanur', 'Turvihal', 'Maski', 'Manvi', 'Siruguppa', 'Gangavathi', 'Raichur'].map((city) => {
                  const isSelected = searchQuery.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSearchQuery(isSelected ? '' : city)}
                      className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-teal-800 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500">
                Showing <strong className="text-slate-800 font-semibold">{filteredLeads.length}</strong> of{' '}
                <strong className="text-slate-800 font-semibold">{leads.length}</strong> leads
                {searchQuery && (
                  <span>
                    {' '}
                    matching &ldquo;<span className="text-teal-800 font-medium">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Contact & City</th>
                    <th className="py-3 px-4">Topic & Lang</th>
                    <th className="py-3 px-4">Callback Window</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Consent Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 space-y-2">
                        <div className="text-sm font-semibold text-slate-700">
                          No leads matching your search criteria.
                        </div>
                        <p className="text-xs text-slate-400">
                          {searchQuery
                            ? `No records found containing "${searchQuery}" in name, city, or phone.`
                            : 'No records in the selected stage.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedStage('All');
                          }}
                          className="mt-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
                        >
                          Clear Search & Show All
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-slate-500 text-[11px] tabular-nums">
                            +91 {lead.phone} · <span className="font-medium text-slate-700">{lead.city}</span>
                          </div>
                          {lead.nextFollowUpDate && (
                            <div className="text-[10px] text-teal-800 font-medium mt-0.5">
                              Next Follow-up: {lead.nextFollowUpDate}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-medium">{lead.topic}</div>
                          <div className="text-slate-400 text-[10px]">
                            Preferred: {lead.preferredLanguage.toUpperCase()} · Source: {lead.leadSource}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-800">
                            {lead.preferredCallbackTime}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={lead.stage}
                            onChange={(e) => handleStageChange(lead.id, e.target.value as LeadStage)}
                            className="text-xs font-semibold rounded px-2 py-1 bg-teal-50 text-teal-900 border border-teal-200 cursor-pointer focus:outline-none"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>

                          {lead.manualPolicyOutcome && (
                            <div className="mt-1 text-[10px] text-emerald-800 font-medium">
                              Issued: {lead.manualPolicyOutcome.policyNumberRef} (₹{(lead.manualPolicyOutcome.sumAssured || 0) / 100000}L)
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5 text-[11px]">
                            <div className="text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Consultation Consent</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Marketing: {lead.marketingConsent ? 'Subscribed' : 'None'}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLeadForNotes(lead);
                                setNoteInput(lead.notes || '');
                                setFollowUpDateInput(lead.nextFollowUpDate || '');
                              }}
                              className="p-1.5 text-slate-600 hover:text-teal-800 rounded hover:bg-slate-100"
                              title="Edit Notes & Follow-up Date"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLeadForOutcome(lead);
                                setOutcomePolicyRef(lead.manualPolicyOutcome?.policyNumberRef || '');
                                setOutcomeSumAssured(lead.manualPolicyOutcome?.sumAssured || 5000000);
                                setOutcomeCommission(lead.manualPolicyOutcome?.actualCommission || 7500);
                              }}
                              className="p-1.5 text-slate-600 hover:text-indigo-800 rounded hover:bg-slate-100"
                              title="Record Policy Outcome & Commission (Restricted)"
                            >
                              <Lock className="w-3.5 h-3.5 text-indigo-700" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="p-1.5 text-slate-400 hover:text-red-700 rounded hover:bg-red-50"
                              title="DPDP Erasure Deletion"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENT CALENDAR & COLLISION PREVENTION */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Appointment Booking Form with Collision Check */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-800" />
                <h3 className="text-sm font-bold text-slate-900">
                  Book or Log Scheduled Appointment
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Asia/Kolkata timezone (IST) · Working Hours: 9:30 AM – 6:30 PM. Overlapping slots are automatically rejected.
              </p>

              {apptCollisionError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p>{apptCollisionError}</p>
                </div>
              )}

              <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Gowda"
                    value={newApptName}
                    onChange={(e) => setNewApptName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Customer Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9845012345"
                    value={newApptPhone}
                    onChange={(e) => setNewApptPhone(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newApptDate}
                      onChange={(e) => setNewApptDate(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Time (IST)</label>
                    <select
                      value={newApptTime}
                      onChange={(e) => setNewApptTime(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                    >
                      <option value="09:30">09:30 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="14:30">02:30 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="15:30">03:30 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="16:30">04:30 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="17:30">05:30 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Consultation Topic</label>
                  <input
                    type="text"
                    required
                    value={newApptTopic}
                    onChange={(e) => setNewApptTopic(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900 transition-colors cursor-pointer"
                >
                  Confirm & Schedule Appointment
                </button>
              </form>
            </div>

            {/* Existing Appointments List */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Scheduled Appointments ({appointments.length})
              </h3>

              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No appointments scheduled.</p>
                ) : (
                  appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{appt.customerName}</div>
                        <div className="text-slate-500 text-[11px]">
                          {appt.topic} · +91 {appt.customerPhone}
                        </div>
                        <div className="text-[10px] text-teal-800 font-medium mt-0.5">
                          {appt.meetingType} (30 mins)
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-900">{appt.date}</div>
                        <div className="text-teal-800 font-semibold">{appt.time} IST</div>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[10px] font-semibold border border-emerald-200">
                          {appt.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HERO SLIDER GOVERNANCE */}
      {activeTab === 'slider' && (
        <div className="space-y-6">
          {/* Header & Quick Action Buttons */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                  Automatic Homepage Hero Carousel Governance
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Slider Timing, Crossfade & Slide Editorial Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Autoplay cycles through the 5 published slides automatically. Live changes update immediately in session preview.
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={handleResetSliderDefaults}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleExportSliderJSON}
                className="px-3.5 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Slider JSON</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Simulation Preview (Desktop vs Mobile 390px) */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                  Simulated Real-Time Preview
                </span>
                <span className="text-xs text-slate-400">
                  Inspect slide automatic rotation, pause behavior, text contrast and button responsive sizing.
                </span>
              </div>

              {/* Viewport Width Switcher */}
              <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setSliderPreviewMode('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    sliderPreviewMode === 'desktop'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSliderPreviewMode('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    sliderPreviewMode === 'mobile'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (390px)</span>
                </button>
              </div>
            </div>

            {/* Preview Canvas Stage */}
            <div className="pt-2">
              {sliderPreviewMode === 'desktop' ? (
                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                  <HeroCarousel
                    slides={heroSlides}
                    globalConfig={globalSliderConfig}
                  />
                </div>
              ) : (
                <div className="py-4">
                  <div className="max-w-[390px] mx-auto border-8 border-slate-800 rounded-[36px] overflow-hidden shadow-2xl bg-slate-950">
                    <div className="bg-slate-900 py-1.5 px-4 flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800">
                      <span>9:41</span>
                      <div className="w-16 h-3 bg-slate-800 rounded-full" />
                      <span>5G 100%</span>
                    </div>
                    <HeroCarousel
                      slides={heroSlides}
                      globalConfig={globalSliderConfig}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Global Slider Configuration Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900">
                Global Rotation & Accessibility Parameters
              </h4>
              <p className="text-xs text-slate-500">
                Configure timing, loop transitions, and user controls. Mandatory safeguards remain active for compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* 1. Autoplay Toggle */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Automatic Rotation (Autoplay)</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!setGlobalSliderConfig) return;
                      const next = !globalSliderConfig.autoplay;
                      setGlobalSliderConfig((prev) => ({ ...prev, autoplay: next }));
                      addAuditLog('Slider Autoplay Changed', `Global autoplay set to: ${next ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      globalSliderConfig.autoplay
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {globalSliderConfig.autoplay ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Cycles through published slides every {globalSliderConfig.slideDurationMs / 1000}s. Respects prefers-reduced-motion automatically.
                </p>
              </div>

              {/* 2. Slide Duration */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Slide Display Duration</span>
                  <select
                    value={globalSliderConfig.slideDurationMs}
                    onChange={(e) => {
                      if (!setGlobalSliderConfig) return;
                      const val = Number(e.target.value);
                      setGlobalSliderConfig((prev) => ({ ...prev, slideDurationMs: val }));
                      addAuditLog('Slide Duration Changed', `Slide display duration set to ${val / 1000} seconds`);
                    }}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
                  >
                    <option value={5000}>5 Seconds</option>
                    <option value={6000}>6 Seconds</option>
                    <option value={8000}>8 Seconds (Default)</option>
                    <option value={10000}>10 Seconds</option>
                    <option value={12000}>12 Seconds</option>
                    <option value={15000}>15 Seconds</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Time visitor has to read headline and supporting copy before gentle crossfade.
                </p>
              </div>

              {/* 3. Crossfade Duration */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Crossfade Transition Speed</span>
                  <select
                    value={globalSliderConfig.crossfadeDurationMs}
                    onChange={(e) => {
                      if (!setGlobalSliderConfig) return;
                      const val = Number(e.target.value);
                      setGlobalSliderConfig((prev) => ({ ...prev, crossfadeDurationMs: val }));
                      addAuditLog('Crossfade Speed Changed', `Transition speed set to ${val}ms`);
                    }}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
                  >
                    <option value={400}>400ms (Brisk)</option>
                    <option value={600}>600ms (Gentle Default)</option>
                    <option value={800}>800ms (Cinematic)</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Smooth dual opacity crossfade between adjacent photographic carriers.
                </p>
              </div>

              {/* 4. Pause on Hover */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Pause on Pointer Hover</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!setGlobalSliderConfig) return;
                      const next = !globalSliderConfig.pauseOnHover;
                      setGlobalSliderConfig((prev) => ({ ...prev, pauseOnHover: next }));
                    }}
                    className={`px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      globalSliderConfig.pauseOnHover
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {globalSliderConfig.pauseOnHover ? 'Active' : 'Off'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pauses timer while cursor rests over carousel so visitor can read without rush.
                </p>
              </div>

              {/* 5. Navigation Arrows */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Prev/Next Navigation Arrows</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!setGlobalSliderConfig) return;
                      const next = !globalSliderConfig.showArrows;
                      setGlobalSliderConfig((prev) => ({ ...prev, showArrows: next }));
                    }}
                    className={`px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      globalSliderConfig.showArrows
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {globalSliderConfig.showArrows ? 'Visible' : 'Hidden'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Displays 44x44px accessible touch controls for manual navigation.
                </p>
              </div>

              {/* 6. Progress Indicators */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Numbered & Bullet Indicators</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!setGlobalSliderConfig) return;
                      const next = !globalSliderConfig.showProgress;
                      setGlobalSliderConfig((prev) => ({ ...prev, showProgress: next }));
                    }}
                    className={`px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      globalSliderConfig.showProgress
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {globalSliderConfig.showProgress ? 'Visible' : 'Hidden'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Displays &ldquo;01 / 05&rdquo; indicator and accessible tab list.
                </p>
              </div>
            </div>

            {/* Mandatory Safeguard Notice */}
            <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-100 flex items-start gap-2 text-[11px] text-teal-950">
              <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong>Mandatory Accessibility Safeguards:</strong> Automatic rotation pauses unconditionally when keyboard focus enters any slide control, when the browser tab is hidden, when the carousel is scrolled out of viewport, or when any modal/guide dialog opens. Users requesting reduced motion are served manual controls only.
              </div>
            </div>
          </div>

          {/* Slide List & Per-Slide Ordering */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Published Hero Slides ({heroSlides.length})
                </h4>
                <p className="text-xs text-slate-500">
                  Reorder slides, toggle individual visibility, or edit headlines, supporting text, and CTA routing.
                </p>
              </div>
              <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                Active: <strong className="text-slate-800">{heroSlides.filter((s) => s.isVisible).length} / {heroSlides.length}</strong>
              </div>
            </div>

            <div className="space-y-3">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className="w-16 h-11 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300 shadow-2xs">
                      <img
                        src={slide.desktopImage}
                        alt={slide.imageAltEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-teal-800">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 truncate">
                          {slide.titleEn || `Slide ${idx + 1}`}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({slide.titleKn || ''})
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                          {slide.status || 'published'}
                        </span>
                      </div>
                      <p className="text-slate-700 text-xs font-medium mt-0.5 line-clamp-1">
                        &ldquo;{slide.headlineEn}&rdquo;
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span>CTA: <strong className="text-teal-900">&ldquo;{slide.primaryActionLabelEn}&rdquo;</strong> → {slide.primaryActionDestination}</span>
                        {slide.secondaryActionLabelEn && (
                          <span>| 2nd CTA: <strong className="text-slate-800">&ldquo;{slide.secondaryActionLabelEn}&rdquo;</strong></span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        if (!setHeroSlides) return;
                        const targetIdx = idx - 1;
                        const newSlides = [...heroSlides];
                        const temp = newSlides[idx];
                        newSlides[idx] = newSlides[targetIdx];
                        newSlides[targetIdx] = temp;
                        setHeroSlides(newSlides);
                        addAuditLog(
                          'Hero Slide Order Changed',
                          `Moved slide "${slide.titleEn || slide.headlineEn}" up to position ${targetIdx + 1}`
                        );
                      }}
                      className={`p-2 rounded-lg border ${
                        idx === 0
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 cursor-pointer'
                      }`}
                      title="Move Slide Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === heroSlides.length - 1}
                      onClick={() => {
                        if (!setHeroSlides) return;
                        const targetIdx = idx + 1;
                        const newSlides = [...heroSlides];
                        const temp = newSlides[idx];
                        newSlides[idx] = newSlides[targetIdx];
                        newSlides[targetIdx] = temp;
                        setHeroSlides(newSlides);
                        addAuditLog(
                          'Hero Slide Order Changed',
                          `Moved slide "${slide.titleEn || slide.headlineEn}" down to position ${targetIdx + 1}`
                        );
                      }}
                      className={`p-2 rounded-lg border ${
                        idx === heroSlides.length - 1
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 cursor-pointer'
                      }`}
                      title="Move Slide Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!setHeroSlides) return;
                        setHeroSlides((prev) =>
                          prev.map((s) => {
                            if (s.id === slide.id) {
                              const nextState = !s.isVisible;
                              addAuditLog(
                                'Hero Slide Visibility Changed',
                                `Slide "${s.titleEn || s.headlineEn}" visibility set to: ${nextState ? 'Active' : 'Hidden'}`
                              );
                              return { ...s, isVisible: nextState };
                            }
                            return s;
                          })
                        );
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 cursor-pointer transition-colors ${
                        slide.isVisible
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                      }`}
                      title="Toggle visibility"
                    >
                      {slide.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{slide.isVisible ? 'Active' : 'Hidden'}</span>
                    </button>

                    {/* Edit Slide Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(slide)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-800 hover:bg-teal-900 text-white flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT GOVERNANCE PIPELINE */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Educational Content Review Pipeline
              </h3>
              <p className="text-xs text-slate-500">
                Strict editorial workflow: Draft → Under Review → Approved → Published → Archived. No unverified claims or AI-generated returns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Status: Published
              </span>
              <h4 className="font-bold text-slate-900">
                Term Insurance Nominee Mistakes Guide
              </h4>
              <p className="text-slate-600 text-[11px]">
                Covers Section 39 appointee rules for minor nominees. Last reviewed: 2026-10-15 by Sofia Rani.
              </p>
              <div className="text-[10px] text-slate-400">Ref: IRDAI-GEN-EDU-01</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Status: Published
              </span>
              <h4 className="font-bold text-slate-900">
                Claim Roadmap for Karnataka Families
              </h4>
              <p className="text-slate-600 text-[11px]">
                Step-by-step checklist of death certificate, original bond, and NEFT KYC. Last reviewed: 2026-10-20.
              </p>
              <div className="text-[10px] text-slate-400">Ref: IRDAI-CLM-GUIDE-04</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Status: Under Review
              </span>
              <h4 className="font-bold text-slate-900">
                SBI Life Specific Brochure Material
              </h4>
              <p className="text-slate-600 text-[11px]">
                Pending corporate marketing review. Remains unpublished on public site until corporate reference ID is issued.
              </p>
              <div className="text-[10px] text-amber-700">Corporate Review Pending</div>
            </div>
          </div>

          {/* Testimonials Governance Section */}
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Client Testimonials & Ethics Governance
                </h4>
                <p className="text-xs text-slate-500">
                  Strictly controlled: testimonials remain hidden on the public Home page until real verified client entries are approved and published.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {setIsTestimonialsPublished && (
                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !isTestimonialsPublished;
                      setIsTestimonialsPublished(nextState);
                      addAuditLog(
                        'Testimonial Visibility Toggled',
                        `Public testimonial display set to: ${nextState ? 'PUBLISHED' : 'HIDDEN (Compliance Empty State)'}`
                      );
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      isTestimonialsPublished
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    Public State: {isTestimonialsPublished ? 'Published' : 'Hidden (Default)'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowAddTestimonialModal(true)}
                  className="px-3 py-1.5 bg-teal-800 text-white text-xs font-semibold rounded-lg hover:bg-teal-900 transition-colors cursor-pointer"
                >
                  + Add Client Testimonial
                </button>
              </div>
            </div>

            {/* Testimonials List */}
            {testimonials.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center space-y-2">
                <p>
                  No client testimonials have been entered yet. The public Home page cleanly displays the ethical empty state stating reviews are awaiting verification.
                </p>
                {setTestimonials && (
                  <button
                    type="button"
                    onClick={() => {
                      const sample: TestimonialItem = {
                        id: `test_${Date.now()}`,
                        clientName: 'Manjunath Swamy',
                        city: 'Gangavathi',
                        serviceCategory: 'Family Protection (Term Insurance)',
                        feedbackKn: 'ಸೋಫಿಯಾ ರಾಣಿ ಅವರು ಯಾವುದೇ ಒತ್ತಡವಿಲ್ಲದೆ ನನ್ನ ಕುಟುಂಬದ ಸಾಲ ಮತ್ತು ವೆಚ್ಚಕ್ಕೆ ಎಷ್ಟು ಟರ್ಮ್ ಕವರ್ ಬೇಕು ಎಂದು ಪಾರದರ್ಶಕವಾಗಿ ತಿಳಿಸಿದರು. ಗಂಗಾವತಿಯಲ್ಲಿ ನಂಬಿಕಸ್ಥ ಸಲಹೆಗಾರ್ತಿ.',
                        feedbackEn: 'Sofia Rani clearly explained the exact life cover required to shield my family from liabilities with zero sales pressure. Highly transparent advisory in Gangavathi.',
                        verifiedDate: '2026-10-28',
                        approvalReference: 'ADV-VERIFIED-GW-01',
                        reviewer: 'Sofia Rani',
                        isApproved: true,
                      };
                      setTestimonials([sample]);
                      addAuditLog('Sample Testimonial Added', 'Added verified testimonial for Manjunath Swamy (Gangavathi)');
                    }}
                    className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
                  >
                    Click to load sample verified client entry for testing
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white text-xs space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900">{item.clientName}</span>
                        <span className="text-slate-500 text-[11px] ml-2">
                          {item.city} · {item.serviceCategory}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!setTestimonials) return;
                            setTestimonials((prev) =>
                              prev.map((t) => (t.id === item.id ? { ...t, isApproved: !t.isApproved } : t))
                            );
                            addAuditLog(
                              'Testimonial Status Updated',
                              `Toggled approval for ${item.clientName} to: ${!item.isApproved ? 'Approved' : 'Unapproved'}`
                            );
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer ${
                            item.isApproved
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {item.isApproved ? 'Approved' : 'Pending Review'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (!setTestimonials) return;
                            setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
                            addAuditLog('Testimonial Removed', `Removed testimonial record: ${item.clientName}`);
                          }}
                          className="p-1 text-slate-400 hover:text-red-700"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-700 text-[11px] italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "{item.feedbackKn}" / "{item.feedbackEn}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Verified: {item.verifiedDate}</span>
                      <span>Ref: {item.approvalReference || 'Internal Consent Form'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Link to Dedicated Hero Slider Governance */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Hero Slider & Guide Governance
              </h4>
              <p className="text-xs text-slate-500">
                Manage global autoplay rotation, slide order, visual copy, and CTA routing in the dedicated Hero Slider suite.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('slider')}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-300" />
              <span>Open Hero Slider Suite</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            System & Advisor Audit Log (Append-Only)
          </h3>
          <p className="text-xs text-slate-500">
            Records all stage shifts, lead edits, DPDP purges, and export operations.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                </div>
                <div className="text-right shrink-0 text-[10px] text-slate-400">
                  <div>{log.timestamp}</div>
                  <div>{log.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PHASE 2 INTEGRATION ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Phase 2 Technical Integration Blueprint
          </h3>
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              In accordance with delivery rules, Phase 1 delivers the full public website, trilingual localization, planning tools, and session-governed preview. Phase 2 provisions:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-800">
              <li>
                <strong>Cloud Firestore Provisioning:</strong> Setting up collections for <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">leads</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">appointments</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">content_articles</code>, and <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">audit_logs</code>.
              </li>
              <li>
                <strong>Strict Firestore Rules:</strong> Public users have <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">create</code> permission only on sanitized lead documents. All read/update/delete operations are restricted to <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">auth.uid == advisorAdminUid</code>.
              </li>
              <li>
                <strong>Secure Authentication:</strong> Passwordless email magic-link or Google OAuth restricted to Sofia Rani's verified address.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Modal: Edit Notes & Follow-up */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Private Notes & Follow-up · {selectedLeadForNotes.name}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Next Follow-up Date</label>
                <input
                  type="date"
                  value={followUpDateInput}
                  onChange={(e) => setFollowUpDateInput(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Confidential Advisor Notes</label>
                <textarea
                  rows={4}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Record customer preferences, budget, or family circumstances..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedLeadForNotes(null)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-1.5 bg-teal-800 text-white text-xs font-semibold rounded-lg hover:bg-teal-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Record Policy Outcome & Commission */}
      {selectedLeadForOutcome && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Record Issued Policy Outcome (Restricted)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Customer: {selectedLeadForOutcome.name} ({selectedLeadForOutcome.phone})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Official Policy / Proposal Reference</label>
                <input
                  type="text"
                  placeholder="e.g. SBI-POL-984521"
                  value={outcomePolicyRef}
                  onChange={(e) => setOutcomePolicyRef(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Product Category</label>
                <select
                  value={outcomeCategory}
                  onChange={(e) => setOutcomeCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                >
                  <option value="SBI Life - Pure Protection (Term)">SBI Life - Pure Protection (Term)</option>
                  <option value="SBI Life - Child Education Plan">SBI Life - Child Education Plan</option>
                  <option value="SBI Life - Guaranteed Pension / Annuity">SBI Life - Guaranteed Pension / Annuity</option>
                  <option value="SBI Life - Structured Savings">SBI Life - Structured Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Sum Assured (₹)</label>
                <input
                  type="number"
                  step="500000"
                  value={outcomeSumAssured}
                  onChange={(e) => setOutcomeSumAssured(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Actual Commission (₹ - Restricted to Advisor)</label>
                <input
                  type="number"
                  step="500"
                  value={outcomeCommission}
                  onChange={(e) => setOutcomeCommission(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedLeadForOutcome(null)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveOutcome}
                className="px-4 py-1.5 bg-teal-800 text-white text-xs font-semibold rounded-lg hover:bg-teal-900"
              >
                Save Policy Outcome
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Verified Client Testimonial */}
      {showAddTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Register Verified Client Testimonial
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Only enter genuine feedback with explicit documented client consent. Entries require company/advisor sign-off.
            </p>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">City / Taluk *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gangavathi"
                    value={newClientCity}
                    onChange={(e) => setNewClientCity(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Service Category *</label>
                <select
                  value={newServiceCategory}
                  onChange={(e) => setNewServiceCategory(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white"
                >
                  <option value="Family Protection (Term Insurance)">Family Protection (Term Insurance)</option>
                  <option value="Child Higher Education Planning">Child Higher Education Planning</option>
                  <option value="Retirement & Pension Planning">Retirement & Pension Planning</option>
                  <option value="Policy Servicing & Nominee Update">Policy Servicing & Nominee Update</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Client Feedback in Kannada *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="ಗ್ರಾಹಕರ ನೈಜ ಕನ್ನಡ ಅಭಿಪ್ರಾಯವನ್ನು ಇಲ್ಲಿ ದಾಖಲಿಸಿ..."
                  value={newFeedbackKn}
                  onChange={(e) => setNewFeedbackKn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Client Feedback in English (Translation)</label>
                <textarea
                  rows={2}
                  placeholder="English translation of client feedback..."
                  value={newFeedbackEn}
                  onChange={(e) => setNewFeedbackEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Verification / Consent Reference</label>
                <input
                  type="text"
                  placeholder="e.g. ADV-VERIFIED-GW-02"
                  value={newApprovalRef}
                  onChange={(e) => setNewApprovalRef(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddTestimonialModal(false)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newClientName.trim() || !newFeedbackKn.trim() || !setTestimonials) return;
                  const newEntry: TestimonialItem = {
                    id: `test_${Date.now()}`,
                    clientName: newClientName.trim(),
                    city: newClientCity.trim(),
                    serviceCategory: newServiceCategory,
                    feedbackKn: newFeedbackKn.trim(),
                    feedbackEn: newFeedbackEn.trim() || newFeedbackKn.trim(),
                    verifiedDate: new Date().toISOString().split('T')[0],
                    approvalReference: newApprovalRef.trim() || 'ADV-VERIFIED-' + Math.floor(100 + Math.random() * 900),
                    reviewer: 'Sofia Rani',
                    isApproved: true,
                  };
                  setTestimonials((prev) => [newEntry, ...prev]);
                  addAuditLog('Verified Testimonial Added', `Added testimonial from ${newClientName} (${newClientCity})`);
                  setShowAddTestimonialModal(false);
                  setNewClientName('');
                  setNewFeedbackKn('');
                  setNewFeedbackEn('');
                }}
                disabled={!newClientName.trim() || !newFeedbackKn.trim()}
                className="px-4 py-1.5 bg-teal-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg hover:bg-teal-900 cursor-pointer"
              >
                Save & Approve Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HERO SLIDE EDITORIAL EDITOR */}
      {selectedSlideForEdit && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="slide-editor-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  Editorial Slide Customizer
                </span>
                <h3 id="slide-editor-title" className="text-sm font-bold text-white">
                  Edit Slide #{selectedSlideForEdit.order}: {selectedSlideForEdit.titleEn || selectedSlideForEdit.headlineEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSlideForEdit(null)}
                aria-label="Close editor"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {editValidationError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{editValidationError}</span>
                </div>
              )}

              {/* Status and Governance Banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-slate-500 font-semibold text-[10px] uppercase mb-0.5">
                      Review Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                    >
                      <option value="draft">Draft (Internal Only)</option>
                      <option value="review">Under Review</option>
                      <option value="approved">Approved by Advisor</option>
                      <option value="published">Published & Active</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold text-[10px] uppercase mb-0.5">
                      Compliance Reference
                    </label>
                    <input
                      type="text"
                      value={editApprovalRef}
                      onChange={(e) => setEditApprovalRef(e.target.value)}
                      placeholder="e.g. COMP-HERO-2026-SR"
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editIsVisible}
                    onChange={(e) => setEditIsVisible(e.target.checked)}
                    className="w-4 h-4 text-teal-800 rounded border-slate-300 focus:ring-teal-700 cursor-pointer"
                  />
                  <span>Display in Homepage Hero</span>
                </label>
              </div>

              {/* Titles & Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Internal Slide Title (English) *
                  </label>
                  <input
                    type="text"
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ಸ್ಲೈಡ್ ಶೀರ್ಷಿಕೆ (ಕನ್ನಡ)
                  </label>
                  <input
                    type="text"
                    value={editTitleKn}
                    onChange={(e) => setEditTitleKn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Badge Tagline Context (English)
                  </label>
                  <input
                    type="text"
                    value={editTaglineEn}
                    onChange={(e) => setEditTaglineEn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ಬ್ಯಾಡ್ಜ್ ವಿವರಣೆ (ಕನ್ನಡ)
                  </label>
                  <input
                    type="text"
                    value={editTaglineKn}
                    onChange={(e) => setEditTaglineKn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Main Headline (English) *
                  </label>
                  <input
                    type="text"
                    value={editHeadlineEn}
                    onChange={(e) => setEditHeadlineEn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ಮುಖ್ಯ ಮುಖ್ಯಾಂಶ (ಕನ್ನಡ) *
                  </label>
                  <input
                    type="text"
                    value={editHeadlineKn}
                    onChange={(e) => setEditHeadlineKn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-slate-900 text-sm"
                  />
                </div>
              </div>

              {/* Supporting Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Supporting Copy (English)
                  </label>
                  <textarea
                    rows={2}
                    value={editSupportingEn}
                    onChange={(e) => setEditSupportingEn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    ವಿವರಣಾ ವಾಕ್ಯ (ಕನ್ನಡ)
                  </label>
                  <textarea
                    rows={2}
                    value={editSupportingKn}
                    onChange={(e) => setEditSupportingKn(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700"
                  />
                </div>
              </div>

              {/* Actions & Routing */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-teal-800">
                  Call to Action (CTA) Buttons & Routing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Primary CTA Label (EN) *</label>
                    <input
                      type="text"
                      value={editPrimaryLabelEn}
                      onChange={(e) => setEditPrimaryLabelEn(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Primary CTA (ಕನ್ನಡ) *</label>
                    <input
                      type="text"
                      value={editPrimaryLabelKn}
                      onChange={(e) => setEditPrimaryLabelKn(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Target Page Destination *</label>
                    <select
                      value={editPrimaryDestination}
                      onChange={(e) => setEditPrimaryDestination(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-teal-900"
                    >
                      <option value="book">Book a Conversation (Callback)</option>
                      <option value="family-protection">Family Protection (Gap Tool)</option>
                      <option value="children-education">Children Education Planner</option>
                      <option value="retirement">Retirement & Pension</option>
                      <option value="tools">Planning Tools Hub</option>
                      <option value="learn">Knowledge & Video Hub</option>
                      <option value="customer-help">Customer Help Desk</option>
                      <option value="open-guide">Open 25-Slide Family Guide</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Secondary CTA Label (EN)</label>
                    <input
                      type="text"
                      value={editSecondaryLabelEn}
                      onChange={(e) => setEditSecondaryLabelEn(e.target.value)}
                      placeholder="Optional second button..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Secondary CTA (ಕನ್ನಡ)</label>
                    <input
                      type="text"
                      value={editSecondaryLabelKn}
                      onChange={(e) => setEditSecondaryLabelKn(e.target.value)}
                      placeholder="ಐಚ್ಛಿಕ..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Secondary Destination</label>
                    <select
                      value={editSecondaryDestination}
                      onChange={(e) => setEditSecondaryDestination(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
                    >
                      <option value="">None (Primary CTA only)</option>
                      <option value="open-guide">Open 25-Slide Family Guide</option>
                      <option value="whatsapp">Direct WhatsApp Chat</option>
                      <option value="book">Book a Conversation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Photographic Asset & Visual Adjustments */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-teal-800">
                  Photographic Media & Framing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Desktop Photographic Source URL</label>
                    <input
                      type="text"
                      value={editDesktopImage}
                      onChange={(e) => setEditDesktopImage(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Optional Mobile Crop URL</label>
                    <input
                      type="text"
                      value={editMobileImage}
                      onChange={(e) => setEditMobileImage(e.target.value)}
                      placeholder="Optional dedicated portrait crop..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Desktop Subject Focal Point</label>
                    <select
                      value={editFocalPoint}
                      onChange={(e) => setEditFocalPoint(e.target.value as any)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-semibold"
                    >
                      <option value="center">Center</option>
                      <option value="right">Right (Subject positioned right, text safe on left)</option>
                      <option value="left">Left</option>
                      <option value="top">Top</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Text-Safe Gradient Overlay</label>
                    <select
                      value={editOverlayStrength}
                      onChange={(e) => setEditOverlayStrength(e.target.value as any)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-semibold"
                    >
                      <option value="subtle">Subtle (Bright photograph)</option>
                      <option value="medium">Medium (Standard accessible contrast)</option>
                      <option value="strong">Strong (High contrast for bright lighting)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedSlideForEdit(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveSlide}
                className="px-5 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>Save Slide Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
