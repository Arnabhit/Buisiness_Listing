import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

const BusinessPage = () => {
  const { id } = useParams();
  const business = { id, name: `Business ${id}`, description: `This is business ${id}` };

  const handleReviewSubmit = (review) => {
    console.log('Review submitted:', review);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{business.name}</h2>
      <p>{business.description}</p>
      <ReviewForm onSubmit={handleReviewSubmit} />
    </div>
  );
};

export default BusinessPage;
