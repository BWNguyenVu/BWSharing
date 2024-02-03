const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');


function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home.hbs');
    // });

    // app.get('/news', (req, res) => {
    //   res.render('news.hbs');
    // })
    // user search /news -> chọc vào newsRouter
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
