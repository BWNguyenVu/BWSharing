const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới

const siteController = require('../app/controllers/SiteController');

//newsController.index

router.get('/search', siteController.search); // slug: ex vudeptrai/vu/aloz -> chuyển sang cú pháp show của newsController
router.get('/', siteController.index); // nhảy lên newsController require

module.exports = router;
