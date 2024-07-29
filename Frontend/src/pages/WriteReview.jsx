// WriteReview.js
import React from 'react';
import SearchBar from '../components/Searchbar';

const WriteReview = () => {
  const handleLocationSelect = (location) => {
    console.log('Selected location:', location);
  };

  const handleBusinessSelect = (business) => {
    console.log('Selected business:', business);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
      <div className="space-y-4">
        <SearchBar onLocationSelect={handleBusinessSelect} placeholder="Search for businesses" />
        
        <button className="bg-green-500 text-white p-2 rounded">Continue</button>
      </div>
    </div>
  );
};

export default WriteReview;
