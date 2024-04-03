const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const users = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'staff', 'admin'],
        default: 'user'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
});

users.pre('save', async function (next) {

    const passwordUpperCaseRegex = /[A-Z]+/;
    const passwordSpecialCharacterRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const passwordMin = 8;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email && !emailRegex.test(this.email)) throw new Error('Email must follow condition')

    if (!(passwordSpecialCharacterRegex.test(this.password) && passwordUpperCaseRegex.test(this.password) && this.password.length >= passwordMin)) throw new Error('Password must follow condition')

    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Generate a salt and hash the password
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

users.pre('findOneAndUpdate', async function (next) {

    const passwordUpperCaseRegex = /[A-Z]+/;
    const passwordSpecialCharacterRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const passwordMin = 8;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this._update.email && !emailRegex.test(this._update.email)) throw new Error('Email must follow condition')

    if (this._update.password) {
        if (!(passwordSpecialCharacterRegex.test(this._update.password) && passwordUpperCaseRegex.test(this._update.password) && this._update.password.length >= passwordMin)) throw new Error('password must follow condition')
        try {
            // Generate a salt and hash the password
            const saltRounds = 10;
            this._update.password = await bcrypt.hash(this._update.password, saltRounds);
            next();
        } catch (error) {
            next(error);
        }
    }
});

module.exports = mongoose.model('Users', users);