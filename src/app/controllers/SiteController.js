const Course = require('../models/Course');
const { mutipleMongooseToObject }= require('../../util/mongoose')

class SiteController {
    //[GET]/
    async index(req, res, next) {
        Course.find({})
        .then(courses =>{
            res.render('home.hbs', {
                courses: mutipleMongooseToObject(courses) //truyen data lay tu model cho view
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