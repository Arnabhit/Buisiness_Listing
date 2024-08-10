const express = require('express');
const { handleBusinessCreate } = require('../Controllers/Business');
const authMiddleware = require('../Middlewares/BusinessAuth');
const router = express.Router();

router.post('/business', authMiddleware, handleBusinessCreate);


module.exports = router;