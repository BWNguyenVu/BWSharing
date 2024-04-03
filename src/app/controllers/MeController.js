const Course = require('../models/Course');
const { mutipleMongooseToObject }= require('../../util/mongoose')

class MeController {
    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        const userId = req.params.userId; // Truy cập vào userId từ req.params
        Course.find({ userId: userId }) // Tìm kiếm các khóa học với userId tương ứng
            .then(courses => {
                res.render('me/stored-courses.hbs', {
                    courses: mutipleMongooseToObject(courses) // Dùng để chuyển đổi nhiều object thành đối tượng Mongoose
                });
            })
            .catch(next);
    }

    }



module.exports = new MeController();