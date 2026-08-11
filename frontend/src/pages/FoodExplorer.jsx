import React from 'react';
import { REGIONAL_FOODS } from '../data/foodData';
import FoodCard from '../components/travel-cards/FoodCard';
import SectionHeader from '../components/common/SectionHeader';

export default function FoodExplorer() {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeader
        badge="Culinary Journey"
        title="Local Food & Culinary Discoveries"
        subtitle="Embark on a mouthwatering food trail across India's 28 states and iconic local culinary hubs."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REGIONAL_FOODS.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
