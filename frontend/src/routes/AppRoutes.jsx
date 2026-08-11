import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Explore from '../pages/Explore';
import DestinationDetails from '../pages/DestinationDetails';
import TripPlanner from '../pages/TripPlanner';
import GeneratedItinerary from '../pages/GeneratedItinerary';
import Festivals from '../pages/Festivals';
import SpiritualCircuits from '../pages/SpiritualCircuits';
import CircuitDetail from '../pages/CircuitDetail';
import BestTimeToVisit from '../pages/BestTimeToVisit';

import FoodExplorer from '../pages/FoodExplorer';
import SavedTrips from '../pages/SavedTrips';
import Wishlist from '../pages/Wishlist';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:id" element={<DestinationDetails />} />
      <Route path="/planner" element={<TripPlanner />} />
      <Route path="/generated-itinerary" element={<GeneratedItinerary />} />
      <Route path="/festivals" element={<Festivals />} />
      <Route path="/spiritual" element={<SpiritualCircuits />} />
      <Route path="/spiritual/:id" element={<CircuitDetail />} />

      <Route path="/best-time" element={<BestTimeToVisit />} />
      <Route path="/food" element={<FoodExplorer />} />
      <Route path="/saved-trips" element={<SavedTrips />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
