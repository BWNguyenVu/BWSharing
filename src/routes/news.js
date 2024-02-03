const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới

const newsController = require('../app/controllers/NewsController');

//newsController.index

router.get('/:slug', newsController.show); // slug: ex vudeptrai/vu/aloz -> chuyển sang cú pháp show của newsController
router.get('/', newsController.index); // nhảy lên newsController require

module.exports = router;
