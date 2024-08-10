// routes/reviews.js
const express = require('express');
const { createReview, getReviewsForBusiness } = require('../Controllers/reviewController');

const router = express.Router();

router.post('/reviews', createReview);
router.get('/reviews/:businessId', getReviewsForBusiness); // Endpoint for fetching reviews by businessId

module.exports = router;
