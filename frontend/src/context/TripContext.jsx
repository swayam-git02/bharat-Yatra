import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SAVED_TRIPS } from '../data/userMockData';
import { DESTINATIONS } from '../data/destinationsData';
import { useToast } from './ToastContext';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem('bharat_yatra_saved_trips');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_TRIPS;
  });

  const [currentItinerary, setCurrentItinerary] = useState(() => {
    const saved = localStorage.getItem('bharat_yatra_current_itinerary');
    return saved ? JSON.parse(saved) : null;
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('bharat_yatra_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    if (currentItinerary) {
      localStorage.setItem('bharat_yatra_current_itinerary', JSON.stringify(currentItinerary));
    }
  }, [currentItinerary]);

  // Generate day-by-day itinerary via backend Gemini API
  const generateItinerary = async (params) => {
    const {
      destinationId,
      destinationName,
      days = 3,
      budget = 10000,
      travelStyle = 'Friends',
      interests = [],
      travelers = 1,
      pace = 'Balanced',
      startDate,
      previousItinerary
    } = params;

    const destObj = DESTINATIONS.find((d) => d.id === destinationId || d.name.toLowerCase() === (destinationName || '').toLowerCase()) || DESTINATIONS[0];
    const targetName = destinationName || destObj.name;
    const numDays = parseInt(days, 10);

    try {
      const { itineraryService } = await import('../services/api');
      const apiRes = await itineraryService.generateItinerary({
        destination: targetName,
        destinationId: destObj.id,
        days: numDays,
        budget: parseInt(budget, 10),
        travelStyle,
        interests,
        travelers: parseInt(travelers, 10) || 1,
        pace,
        startDate,
        previousItinerary
      });

      if (apiRes && apiRes.success && apiRes.data) {
        const { tripSummary, itineraryDays, budgetBreakdown, travelTips, days: rawDays } = apiRes.data;

        const newTrip = {
          id: `trip-${Date.now()}`,
          title: tripSummary.title || `${numDays}-Day ${targetName} AI Itinerary`,
          destinationId: destObj.id,
          destinationDbId: tripSummary.destinationId || 1,
          destinationName: `${targetName}, ${destObj.state || 'India'}`,
          days: numDays,
          budget: parseInt(budget, 10),
          estimatedTotal: tripSummary.estimatedTotal || budgetBreakdown?.total || budget,
          travelStyle,
          interests,
          travelers: parseInt(travelers, 10) || 1,
          pace,
          createdDate: new Date().toISOString().split('T')[0],
          image: destObj.heroImage || tripSummary.image,
          itineraryDays: itineraryDays || [],
          rawDays: rawDays || [],
          budgetBreakdown,
          travelTips,
          warnings: apiRes.data.warnings || [],
          sources: apiRes.data.sources || [],
          searchQueries: apiRes.data.searchQueries || [],
          isAiGenerated: true
        };

        setCurrentItinerary(newTrip);
        return newTrip;
      }
    } catch (err) {
      console.warn('⚠️ Gemini API backend offline or failed, using local intelligent fallback:', err.response?.data?.message || err.message);
      const errorMsg = err.response?.data?.message || 'Unable to connect to Gemini API. Generated fallback itinerary.';
      showToast(errorMsg, 'info');
    }

    // Local Fallback Generation if Backend is offline/unreachable
    const generatedDays = [];
    const attractions = destObj.topAttractions || [];
    const foods = destObj.localFood || [];
    const mainTransport = destObj.transport ? destObj.transport.primary : 'Local Cab';

    for (let i = 1; i <= numDays; i++) {
      const attr1 = attractions[(i - 1) % attractions.length] || { name: 'Local Market Explorer & Heritage Streets', desc: 'Discover vibrant local artisan markets.' };
      const attr2 = attractions[i % attractions.length] || { name: 'Scenic Viewpoint & Sunset Spot', desc: 'Panoramic sunset views.' };
      const foodPick = foods[(i - 1) % foods.length] || { name: 'Regional Specialty Thali', desc: 'Traditional authentic feast.' };

      const dayActivities = [
        {
          id: `act-${i}-1`,
          time: 'Morning (08:30 AM)',
          title: `Explore ${attr1.name}`,
          desc: attr1.desc,
          cost: Math.round(budget / (numDays * 4)),
          category: 'Attraction',
          transport: mainTransport
        },
        {
          id: `act-${i}-2`,
          title: `Lunch at iconic local food hub: ${foodPick.name}`,
          desc: foodPick.desc,
          time: 'Afternoon (01:30 PM)',
          cost: Math.round(budget / (numDays * 8)),
          category: 'Food',
          transport: 'Walking'
        },
        {
          id: `act-${i}-3`,
          title: `Sightseeing & Activities at ${attr2.name}`,
          desc: attr2.desc,
          time: 'Evening (05:30 PM)',
          cost: Math.round(budget / (numDays * 5)),
          category: 'Sightseeing',
          transport: mainTransport
        }
      ];

      generatedDays.push({
        day: i,
        title: i === 1 ? 'Arrival & Key Attractions' : i === numDays ? 'Final Discoveries & Departure' : `Exploration & Local Experiences - Day ${i}`,
        activities: dayActivities
      });
    }

    const fallbackTrip = {
      id: `trip-${Date.now()}`,
      title: `${numDays}-Day ${targetName} Journey`,
      destinationId: destObj.id,
      destinationDbId: 1,
      destinationName: `${targetName}, ${destObj.state || 'India'}`,
      days: numDays,
      budget: parseInt(budget, 10),
      travelStyle,
      interests,
      travelers: parseInt(travelers, 10) || 1,
      pace,
      createdDate: new Date().toISOString().split('T')[0],
      image: destObj.heroImage,
      itineraryDays: generatedDays,
      isAiGenerated: false
    };

    setCurrentItinerary(fallbackTrip);
    return fallbackTrip;
  };

  const saveCurrentTrip = async () => {
    if (!currentItinerary) return;
    const exists = savedTrips.some((t) => t.id === currentItinerary.id);
    if (!exists) {
      setSavedTrips((prev) => [currentItinerary, ...prev]);

      try {
        const { tripService } = await import('../services/api');
        const destIdMap = {
          rishikesh: 1,
          goa: 2,
          jaipur: 3,
          varanasi: 4,
          kerala: 5,
          ladakh: 6,
          manali: 7,
          kashmir: 8,
          udaipur: 9,
          hampi: 10,
          amritsar: 11,
          darjeeling: 12,
          ooty: 13,
          agra: 14,
          kolkata: 15,
          mumbai: 16
        };
        const mappedDbId = destIdMap[currentItinerary.destinationId] || currentItinerary.destinationDbId || 1;

        await tripService.saveTrip({
          tripName: currentItinerary.title,
          destinationId: mappedDbId,
          duration: currentItinerary.days,
          budget: currentItinerary.budget,
          travelStyle: currentItinerary.travelStyle,
          interests: currentItinerary.interests,
          days: currentItinerary.itineraryDays
        });
      } catch (err) {
        console.log('Saved to local storage (Backend offline or unsynced).');
      }

      showToast('Itinerary saved to your Saved Trips! ❤️', 'success');
    } else {
      showToast('Trip is already saved in your collection.', 'info');
    }
  };


  const updateItineraryDays = (updatedDays) => {
    if (!currentItinerary) return;
    const updated = {
      ...currentItinerary,
      itineraryDays: updatedDays
    };
    setCurrentItinerary(updated);

    // Also update saved trips if this trip was already saved
    setSavedTrips((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteSavedTrip = async (tripId) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    try {
      const { tripService } = await import('../services/api');
      await tripService.deleteTrip(tripId);
    } catch (err) {
      // Local state fallback handled
    }
    showToast('Trip deleted from Saved Trips.', 'info');
  };

  return (
    <TripContext.Provider
      value={{
        savedTrips,
        currentItinerary,
        setCurrentItinerary,
        generateItinerary,
        saveCurrentTrip,
        updateItineraryDays,
        deleteSavedTrip
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
