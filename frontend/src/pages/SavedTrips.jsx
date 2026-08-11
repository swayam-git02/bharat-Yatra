import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useToast } from '../context/ToastContext';
import SectionHeader from '../components/common/SectionHeader';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import { Calendar, DollarSign, Users, MapPin, Eye, Trash2, Share2, Edit3, Heart } from 'lucide-react';

export default function SavedTrips() {
  const { savedTrips, setCurrentItinerary, deleteSavedTrip } = useTrip();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [deletingTripId, setDeletingTripId] = useState(null);

  const handleViewTrip = (trip) => {
    setCurrentItinerary(trip);
    navigate('/generated-itinerary');
  };

  const confirmDelete = () => {
    if (deletingTripId) {
      deleteSavedTrip(deletingTripId);
      setDeletingTripId(null);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="My Collection"
        title="Saved Itineraries & Trips"
        subtitle="Manage, edit, or view all your saved custom travel itineraries."
      />

      {savedTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-navy-900 shadow">
                  {trip.days} Days Journey
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-poppins font-bold text-lg leading-snug">{trip.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-saffron-400" />
                    <span>{trip.destinationName}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Est. Budget</span>
                    <span className="font-bold text-navy-900">₹{trip.budget?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Style</span>
                    <span className="font-bold text-navy-900">{trip.travelStyle}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleViewTrip(trip)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white font-semibold text-xs py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Itinerary</span>
                  </button>

                  <button
                    onClick={() => setDeletingTripId(trip.id)}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Saved Trips Yet"
          description="Create your first custom trip using the Smart Trip Planner."
          actionLabel="Plan New Trip"
          actionPath="/planner"
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingTripId}
        onClose={() => setDeletingTripId(null)}
        title="Confirm Deleting Saved Trip"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-xs leading-relaxed">
            Are you sure you want to delete this trip from your collection? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDeletingTripId(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md"
            >
              Delete Trip
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
