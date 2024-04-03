const aboutRouter = require('./about');
const contactRouter = require('./contact');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const userRouter = require('./users');
const userController = require('../app/controllers/UserController');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home.hbs');
    // });

    // app.get('/news', (req, res) => {
    //   res.render('news.hbs');
    // })
    // user search /news -> chọc vào newsRouter
    app.get('/login', userController.create);
    app.use('/contact', contactRouter);
    app.use('/about', aboutRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}

module.exports = route;
