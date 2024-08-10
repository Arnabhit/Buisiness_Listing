const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const BusinessAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('Authorization header missing');
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Token:', token); // Log token for debugging
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    console.log('Decoded:', decoded); // Log decoded token for debugging
    //console.log( decoded.userId);
    //console.log(tokens.token)
    const user = await User.findOne({ _id: decoded.userId });
    console.log('User:', user); // Log user for debugging

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = BusinessAuth;