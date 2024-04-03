const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới
const contactController = require('../app/controllers/ContactController');

router.get('/', contactController.index); // nhảy lên newsController require

module.exports = router;
