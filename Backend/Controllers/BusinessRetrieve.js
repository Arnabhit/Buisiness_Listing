// Controllers/BusinessRetrieve.js
const Business = require('../Models/Business'); // Import the Business model

// Handler function to retrieve businesses
const handleBusinessRetrieve = async (req, res) => {
  try {
    const businesses = await Business.find(); // Retrieve all businesses
    res.json(businesses);
  } catch (error) {
    console.error('Error retrieving businesses:', error);
    res.status(500).json({ error: 'Failed to retrieve businesses' });
  }
};

module.exports = { handleBusinessRetrieve };
