// routes/business.js
const express = require('express');
const { handleBusinessRetrieve } = require('../Controllers/BusinessRetrieve');

const router = express.Router();

// Define the route for retrieving businesses
router.get('/business', handleBusinessRetrieve);

module.exports = router;
