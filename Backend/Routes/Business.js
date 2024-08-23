const express = require('express');
const { storage, upload } = require('../Middlewares/uploadFile'); // Import storage and upload
const { handleBusinessCreate } = require('../Controllers/Business');
const authMiddleware = require('../Middlewares/BusinessAuth');
const router = express.Router();

// Use the upload middleware for handling file uploads
router.post('/business', authMiddleware, upload.single('image'), handleBusinessCreate);

module.exports = router;
