// SiteController.js

const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET]/
    async index(req, res, next) {
        // Assuming you have a middleware that sets userData in res.locals
        const userData = res.locals.userData;
        
        Course.find({})
            .then(courses => {
                res.render('home.hbs', {
                    courses: mutipleMongooseToObject(courses),
                    userData: userData
                });
            })
            .catch(next);
    }
    

    //[GET]/search()
    search(req, res){
        res.render('search.hbs'); //render to website
    }
}

module.exports = new SiteController();
