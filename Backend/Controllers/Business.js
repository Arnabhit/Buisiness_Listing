const User = require('../Models/User');
const Business = require('../Models/Business');

const handleBusinessCreate = async (req, res) => {
  try {
    const { name, category, address, phone, email, website, description, latitude, longitude } = req.body;
    
    // Check for the image file and get the URL/path
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


    console.log('Request Body:', req.body);
    console.log('Authenticated User:', req.user);
    console.log('Image File:', req.file);

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
