const User = require('../Models/User');
const Business = require('../Models/Business');

const handleBusinessCreate = async (req, res) => {
  try {
    const { name, category, address, phone, email, website, description, imageUrl, latitude, longitude } = req.body;
    
    // Log request body for debugging
    console.log('Request Body:', req.body);
    
    // Log authenticated user for debugging
    console.log('Authenticated User:', req.user);

    // if (!req.user || !req.user._id) {
    //   return res.status(400).json({ error: 'User not authenticated' });
    // }

    const business = new Business({ 
      name, 
      category, 
      address, 
      phone, 
      email, 
      website, 
      description, 
      imageUrl, 
      latitude, 
      longitude, 
      owner: req.user._id 
    });

    await business.save();

    // Update user role
    await User.findByIdAndUpdate(req.user._id, { role: 'businessOwner' });

    res.status(201).json({ message: 'Business listed successfully', business });
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to list business' });
  }
};

module.exports = { handleBusinessCreate };
