const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
 
 
 
  website: {
    type: String,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//       },
//       comment: {
//         type: String,
//         trim: true,
//       },
//       date: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     },
//   },
owner: {
  type: mongoose.Schema.Types.ObjectId,
  //required: true,
  ref: 'User'
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
},{timestamps: true});


const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;
