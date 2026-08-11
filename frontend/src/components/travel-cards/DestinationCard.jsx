import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function DestinationCard({ destination }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(destination.id);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

        {/* State Tag */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-navy-900 shadow-md flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-saffron-500" />
          <span>{destination.state}</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(destination.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            isWishlisted ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Name & Tagline Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-poppins font-bold text-xl leading-snug group-hover:text-saffron-400 transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1">{destination.tagline}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Info badges */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <Calendar className="w-3.5 h-3.5 text-saffron-500" />
            <span className="truncate">{destination.bestSeason}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-navy-900">{destination.rating}</span>
            <span className="text-slate-400">({destination.reviewsCount})</span>
          </div>
        </div>

        {/* Interests Pills */}
        {destination.interests && (
          <div className="flex flex-wrap gap-1">
            {destination.interests.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] font-medium bg-saffron-50 text-saffron-700 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Starts from</span>
            <span className="font-poppins font-bold text-navy-900 text-base">
              ₹{destination.avgBudgetPerDay?.toLocaleString() || 2500}
              <span className="text-xs font-normal text-slate-500"> /day</span>
            </span>
          </div>

          <Link
            to={`/explore/${destination.id}`}
            className="flex items-center gap-1 bg-navy-900 hover:bg-navy-950 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all group-hover:bg-saffron-500"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
