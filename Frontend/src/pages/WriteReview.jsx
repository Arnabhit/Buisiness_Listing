import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';

const WriteReview = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/retrievebusiness/business');
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        const data = await response.json();
        console.log('Fetched businesses:', data); // Check the response data
        setBusinesses(data);
        console.log('Businesses email', data.email); // Debug log
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);
  const navigate = useNavigate();

  const handleBusinessSelect = (business) => {
    console.log('Selected business:', business); // Debug log
    if (business) {
      setSelectedBusiness(business);
      setFilteredBusinesses(businesses.filter(b => b.category === business.category));
      console.log('Filtered businesses:', filteredBusinesses); // Debug log
    } else {
      setSelectedBusiness(null);
      setFilteredBusinesses([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBusiness) {
      alert('Please select a business to continue.');
      return;
    }
    console.log('Selected business for review:', selectedBusiness);
    navigate('/BusinessList')
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
      <div className="space-y-4">
        <SearchBar onBusinessSelect={handleBusinessSelect} placeholder="Search for businesses" />
        
        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Continue</button>

        {selectedBusiness && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Selected Business:</h2>
            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{selectedBusiness.name}</h3>
              <p>Category: {businesses.category}</p>
              <p>Address: {selectedBusiness.address}</p>
              <p>Phone: {selectedBusiness.phone}</p>
              <p>Email: {selectedBusiness.email}</p>
              <p>Website: {selectedBusiness.website}</p>
              <p>Description: {selectedBusiness.description}</p>
              <img src={selectedBusiness.imageUrl} alt={selectedBusiness.name} className="w-full h-auto" />
            </div>
          </div>
        )}

        {filteredBusinesses.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Filtered Businesses:</h2>
            <ul className="space-y-4">
              {filteredBusinesses.map((business) => (
                <li key={business._id} className="border p-4 rounded-md">
                  <h3 className="text-lg font-semibold">{business.name}</h3>
                  <p>Category: {business.category}</p>
                  <p>Address: {business.address}</p>
                  <p>Phone: {business.phone}</p>
                  <p>Email: {business.email}</p>
                  <p>Website: {business.website}</p>
                  <p>Description: {business.description}</p>
                  <img src={business.imageUrl} alt={business.name} className="w-full h-auto" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteReview;
