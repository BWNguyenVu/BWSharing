const Course = require('../models/Course');
const { mongooseToObject }= require('../../util/mongoose')
const axios = require('axios');
const jwt = require('jsonwebtoken');

class CourseController {

    //[GET]/courses/:slug
    show(req, res, next){
        Course.findOne({ slug: req.params.slug})
            .then(course => {
                res.render('courses/show.hbs', { course: mongooseToObject(course)});
            })
            .catch(next);
    }
    //[GET]/courses/create 
    create(req, res, next){
       res.render('courses/create.hbs');
    }
    
    //[POST]/courses/store (thêm tài nguyên)

    
    async store(req, res, next) {
        try {
            
            const tokenFromClient = req.headers["cookie"].split('=')[1];
            const decoded = jwt.verify(tokenFromClient, process.env.ACCESS_SECRET_KEY);
            req.jwtDecoded = decoded;
            const userId = decoded.sub;
            const formData = req.body;
            formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
            const course = new Course(formData);
            course.userId = userId;
            await course.save();
            res.redirect('/');
        } catch (error) {
            console.error('Error storing course:', error);
            res.status(500).json({ error: 'Error storing course' });
        }
    }
    
     //[GET]/courses/:id/edit 
    edit(req, res, next){
        Course.findById(req.params.id)
        .then( course => res.render('courses/edit.hbs', {
            course: mongooseToObject(course)
        }))
        .catch(next);
     }
     //[PUT]/courses/:id 
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
        // redirect là tạo ra 1 header location trả về response trình duyệt tự hiểu
        // và điều hướng sang cái path /me/stored/courses
        .then(()=> res.redirect('/me/stored/courses'))
        .catch(next);
    }

     //[DELETE]/courses/:id 
    destroy(req, res, next){
        Course.deleteOne({_id: req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next);
    }


}


module.exports = new CourseController();