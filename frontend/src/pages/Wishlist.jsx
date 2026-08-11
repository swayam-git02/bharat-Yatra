import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { DESTINATIONS } from '../data/destinationsData';
import DestinationCard from '../components/travel-cards/DestinationCard';
import SectionHeader from '../components/common/SectionHeader';
import EmptyState from '../components/common/EmptyState';
import { Heart, Compass, Bookmark } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [selectedCollection, setSelectedCollection] = useState('All');

  const collections = ['All', 'Dream Destinations', 'Weekend Trips', 'Spiritual Trips', 'Adventure'];

  const wishlistedDestinations = DESTINATIONS.filter((d) =>
    wishlist.some((w) => w.id === d.id && (selectedCollection === 'All' || w.collection === selectedCollection))
  );

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Bucket List"
        title="My Wishlist Collections"
        subtitle="Saved destinations for future adventures across India."
      />

      {/* Collection Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {collections.map((col) => (
          <button
            key={col}
            onClick={() => setSelectedCollection(col)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCollection === col
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {col}
          </button>
        ))}
      </div>

      {/* Grid */}
      {wishlistedDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Wishlist is Empty"
          description="Explore destinations and click the heart icon to save your favorite spots."
          actionLabel="Explore Destinations"
          actionPath="/explore"
        />
      )}
    </div>
  );
}
