import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(review);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
    </form>
  );
};

export default ReviewForm;
