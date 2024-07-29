import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const businesses = [
  'Restaurants', 'Home Services', 'Auto Services', 'More'
];

const SearchBar = ({ onLocationSelect }) => {
  const [business, setBusiness] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  const getLocationSuggestions = value => {
    // Fetch from Google Places API
  };

  const onBusinessChange = (event) => {
    setBusiness(event.target.value);
  };

  const onLocationChange = (event, { newValue }) => {
    setLocation(newValue);
  };

  const onLocationsFetchRequested = ({ value }) => {
    setLocations(getLocationSuggestions(value));
  };

  const onLocationsClearRequested = () => {
    setLocations([]);
  };

  const inputPropsLocation = {
    placeholder: 'Search location',
    value: location,
    onChange: onLocationChange
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
      <Autosuggest
        suggestions={locations}
        onSuggestionsFetchRequested={onLocationsFetchRequested}
        onSuggestionsClearRequested={onLocationsClearRequested}
        getSuggestionValue={suggestion => suggestion.description}
        renderSuggestion={suggestion => <div>{suggestion.description}</div>}
        inputProps={inputPropsLocation}
      />
      <button className="bg-red-500 text-white p-2 rounded">🔍</button>
    </div>
  );
};

export default SearchBar;
