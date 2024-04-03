const Course = require('../models/Course');
const { mutipleMongooseToObject }= require('../../util/mongoose')
const UserModel = require("../models/users.js");
const CheckLogin = require('../../util/checkLogin.js');
const TokenController = require('./TokenController.js');
const moment = require("moment");
const TokenModel = require("../models/tokens.js")
class UserController {
    create(req, res, next){
        res.render('login.hbs');
     }
     
     ViewSignUp(req, res, next){
        res.render('signup.hbs');
     }

     async LoginWithEmailAndPassword(req, res, next) {
        try {
            const { email, password } = req.body;
    
            // Check if email and password are provided
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
    
            // Find the user in the database
            const user = await UserModel.findOne({ email: email });
    
            // Check if the user exists
            if (!user) {
                throw new Error('User not found');
            }
    
            // Verify the login credentials
            const loginSuccess = await CheckLogin(email, password);
            if (loginSuccess) {
                // Generate auth token or perform any other necessary actions
                const authToken = await GenerateAuthToken(user, res); // Fix authToken definition
                // Redirect to the home page or send success response
            const accessTokenId = await TokenController.GenerateToken(user, 'ACCESS', process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE_HOUR + 'h');
            saveTokenToCookie(res, accessTokenId); // Pass accessTokenId instead of authToken.access.token

                res.redirect('/');
            } else {
                // Incorrect password
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
            // Return appropriate error response
            res.status(500).send('Internal Server Error');
        }
    }
    

    async SignUp(req, res) {
        const { firstname, lastname, email, password } = req.body;
    
        try {
            const emailExists = await UserModel.findOne({ email: email });
            if (emailExists) {
                throw new Error("Email already exists");
            }
    
            const newUser = new UserModel({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            });
    
            await newUser.save();
            res.redirect('/login');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


    async RefreshAuthToken (refreshToken) {
        if (refreshToken) {
            const decoded = await TokenController.VerifyToken(refreshToken, process.env.REFRESH_SECRET_KEY);
            const userData = decoded;
            const accessTokenId = await TokenController.GenerateToken(userData, 'ACCESS', process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE_HOUR + 'h');
            const accessTokenExpires = moment().add(process.env.ACCESS_TOKEN_LIFE_HOUR, 'hours');
            return {
                access: {
                    token: accessTokenId,
                    exp: accessTokenExpires.toDate()
                },
            }

        }
      };
      async UserLogout(req, res) {
        res.render('login.hbs')
    }
    async Logout(req, res) {
        try {
            res.clearCookie('userId');
            res.clearCookie('accessToken');
            const { userId, accessToken } = req.body;
            await TokenModel.deleteMany({ userId: userId, type: 'REFRESH' });
            return res.redirect('/')
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            return res.status(500).json({ error: 'Error occurred while logging out' });
        }
    }

    async GetUserById(userId) {
        try {
            const user = await UserModel.findById(userId).select('_id firstname lastname username email emailVerified phone profilePicture role').lean();
            return user;
        } catch (err) {
            throw err;
        }
    }

}

async function GenerateAuthToken(userData, res) {
    const accessTokenId = await TokenController.GenerateToken(userData, 'ACCESS', process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE_HOUR + 'h');
    const refreshTokenId = await TokenController.GenerateToken(userData, 'REFRESH', process.env.REFRESH_SECRET_KEY, process.env.REFRESH_TOKEN_LIFE_DAY + 'd');
    const accessTokenExpires = moment().add(process.env.ACCESS_TOKEN_LIFE_HOUR, 'hours');
    const refreshTokenExpires = moment().add(process.env.REFRESH_TOKEN_LIFE_DAY, 'days');
    await TokenController.SaveTokenToDB(userData._id, refreshTokenId, 'REFRESH', refreshTokenExpires);
    return {
        access: {
            token: accessTokenId,
            exp: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshTokenId,
            exp: refreshTokenExpires.toDate()
        }
    };
}

function saveTokenToCookie(res, token) { // Pass 'res' as parameter
    res.cookie('accessToken', token, { httpOnly: true });
}
async function getUserNameFromToken(token) {
    try {
        const decodedToken = await TokenService.VerifyToken(token, process.env.ACCESS_SECRET_KEY); // Giải mã token
        const userId = decodedToken.sub; // Lấy userId từ token
        const user = await UserModel.findOne({ _id: userId }); // Truy vấn cơ sở dữ liệu để lấy thông tin user
        return user.firstname; // Trả về tên của user
    } catch (error) {
        console.error('Error:', error);
        return null; // Trả về null nếu có lỗi xảy ra
    }
}


module.exports = new UserController();
