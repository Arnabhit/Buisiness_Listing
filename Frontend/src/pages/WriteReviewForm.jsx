// WriteReviewForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const WriteReviewForm = () => {
  const { businessId } = useParams(); // to get the business ID from the route(goyal bhaiya)
const navigate=useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/reviews/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          reviewText,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      alert('Review submitted successfully');
      (`/business/${businessId}`); // Redirect to the business detail page
      navigate('/')
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-bold mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-lg font-bold mb-2">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default WriteReviewForm;
