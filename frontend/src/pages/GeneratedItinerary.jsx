import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import DayTimeline from '../components/itinerary/DayTimeline';
import BudgetBreakdown from '../components/itinerary/BudgetBreakdown';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import {
  Heart,
  Edit3,
  Share2,
  Download,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
  RefreshCw,
  Lightbulb,
  Globe,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

export default function GeneratedItinerary() {
  const { currentItinerary, generateItinerary, saveCurrentTrip, updateItineraryDays } = useTrip();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!currentItinerary) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        <EmptyState
          title="No Itinerary Generated Yet"
          description="Build your first custom Indian travel itinerary using our smart multi-step trip planner."
          actionLabel="Plan My Trip Now"
          actionPath="/planner"
        />
      </div>
    );
  }

  const {
    title,
    destinationName,
    destinationId,
    days,
    budget,
    estimatedTotal,
    travelStyle,
    travelers,
    interests,
    pace,
    itineraryDays,
    travelTips,
    warnings,
    sources,
    isAiGenerated
  } = currentItinerary;

  const handleUpdateDayData = (dayIndex, updatedDay) => {
    const updatedDays = [...itineraryDays];
    updatedDays[dayIndex] = updatedDay;
    updateItineraryDays(updatedDays);
  };

  const handleSaveTrip = () => {
    if (!isLoggedIn) {
      showToast('Login to save your Bharat Yatra itinerary! 🔑', 'info');
      navigate('/login');
      return;
    }
    saveCurrentTrip();
  };

  const handleRegenerate = async () => {
    if (isRegenerating) return;
    setIsRegenerating(true);
    showToast('Regenerating alternative itinerary with Gemini AI... 🪄', 'info');

    try {
      await generateItinerary({
        destinationId,
        destinationName,
        days,
        budget,
        travelStyle,
        interests,
        travelers,
        pace,
        previousItinerary: currentItinerary
      });
      showToast('Fresh AI itinerary generated! ✨', 'success');
    } catch (err) {
      showToast('Failed to regenerate itinerary. Please try again.', 'error');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Share link copied to clipboard! 📋', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out my customized trip itinerary for ${destinationName} on Bharat Yatra! 🇮🇳✨`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Printable Wrapper */}
      <div id="printable-itinerary" className="space-y-10">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-saffron-400 bg-saffron-500/20 px-3 py-1 rounded-full border border-saffron-500/30">
                  <MapPin className="w-3.5 h-3.5" />
                  {destinationName}
                </span>
                <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-full">
                  {days} Days Journey
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  Est. Budget ₹{estimatedTotal?.toLocaleString() || budget?.toLocaleString()}
                </span>
                {isAiGenerated && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gemini AI + Google Search Grounded
                  </span>
                )}
              </div>

              <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
                {title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap pt-1">
                <span>Travel Style: <strong className="text-white">{travelStyle}</strong></span>
                <span>•</span>
                <span>Travelers: <strong className="text-white">{travelers || 1}</strong></span>
                <span>•</span>
                <span>Interests: <strong className="text-white">{interests?.join(', ') || 'Exploration'}</strong></span>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
              <button
                onClick={handleSaveTrip}
                className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <Heart className="w-4 h-4" />
                <span>Save Trip</span>
              </button>

              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-saffron-500 hover:from-amber-600 hover:to-saffron-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Planning...' : 'Regenerate'}</span>
              </button>

              <button
                onClick={() => navigate('/planner', { state: { preFillDest: destinationId } })}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Parameters</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Warnings / Seasonality Card */}
        {warnings && warnings.length > 0 && (
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-amber-900 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Travel Note & Advisory</span>
            </div>
            <ul className="space-y-1 text-xs font-medium">
              {warnings.map((w, idx) => (
                <li key={idx}>• {w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Layout: Vertical Timeline & Budget Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Day-by-Day Timeline */}
          <div className="lg:col-span-2 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-saffron-600 uppercase tracking-wider block">DAY-WISE SCHEDULE</span>
                <h2 className="font-poppins font-bold text-navy-900 text-2xl">Daily Activity Timeline</h2>
              </div>
              <span className="text-xs font-medium text-slate-400">Reorder activities using ↑ ↓ arrows</span>
            </div>

            <div className="pt-2">
              {itineraryDays.map((dayData, idx) => (
                <DayTimeline
                  key={idx}
                  dayData={dayData}
                  dayIndex={idx}
                  onUpdateDay={handleUpdateDayData}
                />
              ))}
            </div>
          </div>

          {/* Budget Breakdown & AI Travel Tips Sidebar */}
          <div className="space-y-6">
            <BudgetBreakdown totalBudget={budget} itineraryDays={itineraryDays} />

            {/* Travel Tips Card */}
            {travelTips && travelTips.length > 0 && (
              <div className="bg-amber-50/60 rounded-3xl p-6 border border-amber-200/70 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-800 font-poppins font-bold text-base">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Practical Travel Tips & Notes</span>
                </div>
                <ul className="space-y-2 text-xs text-amber-900/90 font-medium">
                  {travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Grounding Sources Section */}
        {sources && sources.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-saffron-600 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider block">GOOGLE SEARCH GROUNDING</span>
                <h3 className="font-poppins font-bold text-navy-900 text-xl">Research Sources</h3>
              </div>
            </div>
            <p className="text-slate-500 text-xs">
              Real-world attractions, local experiences, and pricing in this itinerary were researched live from the following web sources:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {sources.map((src, idx) => {
                let domain = '';
                try {
                  domain = new URL(src.url).hostname.replace(/^www\./, '');
                } catch (e) {
                  domain = src.url;
                }

                return (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-saffron-400 hover:bg-saffron-50/50 transition-all flex flex-col justify-between space-y-2 group shadow-2xs"
                  >
                    <div className="font-poppins font-bold text-xs text-navy-900 group-hover:text-saffron-700 line-clamp-2 leading-snug">
                      {src.title || domain}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="truncate max-w-[140px] font-medium">{domain}</span>
                      <span className="inline-flex items-center gap-0.5 text-saffron-600 font-semibold group-hover:underline shrink-0">
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Your Trip Itinerary"
      >
        <div className="space-y-6">
          <p className="text-slate-600 text-xs leading-relaxed">
            Share this personalized trip plan with your travel companions on WhatsApp, social media, or copy direct link.
          </p>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-navy-900">Direct Share Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-600 outline-none"
              />
              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1 bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share via WhatsApp</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
