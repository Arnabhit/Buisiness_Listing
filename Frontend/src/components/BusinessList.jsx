import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessRetrieve = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch businesses and their associated reviews from the backend API
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/retrievebusiness/business'); // Update with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

        const businessesData = await response.json();

        // Fetch reviews for each business
        const reviewsPromises = businessesData.map(async (business) => {
          const reviewsResponse = await fetch(`http://localhost:3000/api/reviews/reviews/${business._id}`);
          if (!reviewsResponse.ok) {
            throw new Error(`Failed to fetch reviews for business ${business._id}`);
          }
          const reviewsData = await reviewsResponse.json();
          return { ...business, reviews: reviewsData };
        });

        const businessesWithReviews = await Promise.all(reviewsPromises);

        setBusinesses(businessesWithReviews);
        console.log('Businesses with reviews fetched:', businessesWithReviews); // Debug log
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
        {/* Flex container with wrap */}
        <ul className="flex flex-wrap -mx-2">
          {businesses.map((business) => (
            <li 
              key={business._id} 
              className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4" // 1/3rd width on large screens
              onClick={() => handleBusinessClick(business._id)}
            >
              <div className="border p-4  rounded-md cursor-pointer">
              <img src={`http://localhost:3000${business.imageUrl}`} alt="Business Image"  className="w-[30vw] h-[50vh]"/>
                <h2 className="text-xl font-bold">{business.name}</h2>
                <p className="text-lg font-semibold">{business.category}</p>
                <p>Address: {business.address}</p>
                <p>Phone: {business.phone}</p>
                <p>Email: {business.email}</p>
                <p>Website: {business.website}</p>
                <p>Description: {business.description}</p>
                
                
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Reviews:</h3>
                  {business.reviews && business.reviews.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {business.reviews.map((review, index) => (
                        <li key={index} className="mb-2">
                          <p> <strong>{review.reviewText}</strong></p>
                          <p>Rating: {review.rating}/5</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews available</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BusinessRetrieve;