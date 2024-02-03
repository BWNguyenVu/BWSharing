const Course = require('../models/Course');
const { mutipleMongooseToObject }= require('../../util/mongoose')

class MeController {
    //[GET]/me/stored/courses
    storedCourses(req, res, next){
        Course.find({})
            .then(courses => res.render('me/stored-courses.hbs', {
                courses: mutipleMongooseToObject (courses) // dùng để gọi nhiều object
            
            }))
            .catch(next);
        }

    }



module.exports = new MeController();