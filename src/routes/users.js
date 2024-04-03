const express = require('express');
const router = express.Router(); //NewsRouter nhảy xuống dưới
const UserModel = require('../../src/app/models/users'); // Import UserModel

const userController = require('../app/controllers/UserController');
const jwt = require('jsonwebtoken');
const { mutipleMongooseToObject }= require('../util/mongoose')
const {auth: CheckAuth} = require('../middlewares/auth');

//newsController.index
router.post('/login', userController.LoginWithEmailAndPassword);
router.get('/register', userController.ViewSignUp);
router.post('/sign-up', userController.SignUp);
router.get('/log-out', CheckAuth, userController.UserLogout);
router.post('/log-out', CheckAuth, userController.Logout);

router.get('/cookies', async (req, res) => {
    const myCookie = req.headers["cookie"];
    console.log(myCookie);
    
    if (myCookie) {
        try {
            // Lấy token từ cookie
            const token = myCookie.split('=')[1];

            // Giải mã token
            jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    console.error('Lỗi khi giải mã token:', err);
                    res.status(500).send('Lỗi khi giải mã token');
                } else {
                    try {
                        // Tìm người dùng từ ID
                        const sub = decoded.sub;
                        const user = await UserModel.findById(sub)
                        res.send(JSON.stringify(user));
                    } catch (error) {
                        console.error('Lỗi khi tìm kiếm người dùng:', error);
                        res.status(500).send('Lỗi khi tìm kiếm người dùng');
                    }
                }
            });
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
            res.status(500).send('Lỗi khi giải mã token');
        }
    } else {
        res.send('Không có cookie nào được gửi đi.');
    }
});

module.exports = router;