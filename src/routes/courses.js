const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới
const {auth: CheckAuth} = require('../middlewares/auth');

const courseController = require('../app/controllers/CourseController');

//newsController.index
router.get('/create', courseController.create);
router.post('/store', CheckAuth, courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show); // slug: ex vudeptrai/vu/aloz -> chuyển sang cú pháp show của newsControllere

module.exports = router;
