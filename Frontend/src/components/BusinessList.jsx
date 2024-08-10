// BusinessRetrieve.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessRetrieve = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch businesses from the backend API
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/retrievebusiness/business'); // Update with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        const data = await response.json();
        setBusinesses(data);
        console.log('Businesses fetched:', data); // Debug log
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleBusinessClick = (businessId) => {
    // Navigate to the review form page with the selected business ID
    navigate(`/business/${businessId}/review`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Businesses</h1>
      <ul className="space-y-4">
        {businesses.map((business) => (
          <li 
            key={business._id} 
            className="border p-4 rounded-md cursor-pointer"
            onClick={() => handleBusinessClick(business._id)} // Handle click
          >
            <h2 className="text-xl font-bold">{business.name}</h2>
            <p className="text-lg font-semibold">{business.category}</p> {/* Display the category here */}
            <p>Address: {business.address}</p>
            <p>Phone: {business.phone}</p>
            <p>Email: {business.email}</p>
            <p>Website: {business.website}</p>
            <p>Description: {business.description}</p>
            {/* <p>Reviews: {business.reviews}</p> */}
            <img src={business.imageUrl} alt={business.name} className="w-full h-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessRetrieve;
