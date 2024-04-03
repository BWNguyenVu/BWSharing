const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/users');
const userService = require('./CourseController');
const TokenModel = require('../models/tokens')
const moment = require("moment");
const { ObjectId } = require('mongodb');

class TokenService {
    async GenerateToken(data, type, tokenSecretKey, tokenLife) {
        const {_id, role} = data;
        const token = jwt.sign({
            sub: _id,
            role: role,
            type: type,
        }, tokenSecretKey, {expiresIn: tokenLife});
        return token;
    }

    async SaveTokenToDB(userId, token, type, exp) {
        return await TokenModel.create({
            user: userId,
            token: token,
            type: type,
            exp: exp.toDate(),
        });
    };

    async VerifyToken(token, secretKey) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
              if (error) {
                return reject(error);
              }
              resolve(decoded);
            });
          });
    }

    async expireToken(tokenID) {

    }


    async logOut(username, password) {

    }
    async CheckPassword(username, password) {
        let password_correct = false;
        const hash_password = await users.findOne({username: username})
            .then((user) => {
                user.password = undefined;
                if (user) {
                    return user.password;
                } else {
                    return ' ';
                }
            })
        await bcrypt.compare(password, hash_password)
            .then(function (result) {
                if (result === true) {
                    password_correct = true;
                }
            });
        return password_correct;
    }

}

module.exports = new TokenService;