const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới

const newsController = require('../app/controllers/AboutController');

//newsController.index

router.get('/', newsController.index); // nhảy lên newsController require

module.exports = router;
