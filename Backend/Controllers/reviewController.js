// controllers/reviewController.js
const Review = require('../Models/Review');
const Business = require('../Models/Business');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { businessId, reviewText, rating } = req.body;

    // Check if the business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Create a new review
    const review = new Review({
      businessId,
      reviewText,
      rating,
    });

    // Save the review
    const savedReview = await review.save();

    // Update the business with the new review
    business.reviews.push(savedReview._id);
    await business.save();

    // Optional: Update average rating, number of reviews, etc.
    const reviews = await Review.find({ businessId });
    const averageRating = (reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length).toFixed(1);

    business.averageRating = averageRating;
    await business.save();

    res.status(201).json({ message: 'Review created successfully', review: savedReview });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all reviews for a specific business
const getReviewsForBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const reviews = await Review.find({ businessId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReview,
  getReviewsForBusiness,
};
