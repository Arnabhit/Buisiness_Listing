import React, { useState } from 'react';

const businesses = ['Restaurants', 'Home Services', 'Auto Services', 'More'];

const SearchBar = ({ onBusinessSelect }) => {
  const [business, setBusiness] = useState('');

  const onBusinessChange = (event) => {
    setBusiness(event.target.value);
    onBusinessSelect(event.target.value); // Notify parent component about the selected business
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          value={business}
          onChange={onBusinessChange}
          className="business-dropdown border p-2 rounded mr-2"
        >
          <option value="" disabled>Select a business</option>
          {businesses.map((business, index) => (
            <option key={index} value={business}>
              {business}
            </option>
          ))}
        </select>
        <div className="custom-arrow"></div>
      </div>
      <button onClick={() => onBusinessSelect(business)} className="bg-red-500 text-white p-2 rounded">🔍</button>
    </div>
  );
};

export default SearchBar;
