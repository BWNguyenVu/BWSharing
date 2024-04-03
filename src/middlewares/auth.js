const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../app/errors/un-authenticated')
const moment = require("moment");
const { StatusCodes } = require('http-status-codes');
const { GetUserById } = require('../app/controllers/UserController');
const TokenService = require('../app/controllers/TokenController')

const auth = async (req, res, next) => {
    const tokenFromClient = req.headers.cookie ? req.headers.cookie.split('=')[1] : null;

    if (tokenFromClient) {
        try {
            const decoded = await TokenService.VerifyToken(tokenFromClient, process.env.ACCESS_SECRET_KEY);
            req.jwtDecoded = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        res.redirect('/login')
    }
}

const authorizeStaff = async (req, res, next) => {
    const tokenFromClient = req.headers.cookie ? req.headers.cookie.split('=')[1] : null;

    if (tokenFromClient) {
        try {
            const decoded = await TokenService.VerifyToken(tokenFromClient, process.env.ACCESS_SECRET_KEY);
            if (decoded.role === 'staff') {
                next();
            } else {
                res.status(403).json({
                    message: "Forbidden: Insufficient permissions",
                });
            }
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided. Please log in.',
        });
    }
}

const authorizeAdmin = async (req, res, next) => {
    const tokenFromClient = req.headers.cookie ? req.headers.cookie.split('=')[1] : null;

    if (tokenFromClient) {
        try {
            const decoded = await TokenService.VerifyToken(tokenFromClient, process.env.ACCESS_SECRET_KEY);
            if (decoded.role === 'admin') {
                next();
            } else {
                res.status(403).json({
                    message: "Forbidden: Insufficient permissions",
                });
            }
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided. Please log in.',
        });
    }
}

module.exports = {
    auth: auth,
    authorizeAdmin: authorizeAdmin,
    authorizeStaff: authorizeStaff
};
