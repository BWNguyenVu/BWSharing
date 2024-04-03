const UserModel = require("../../src/app/models/users");
const bcrypt = require("bcrypt");

module.exports = async (email, password) =>{
    let loginSuccess = false;
    //check if is user exists
    const hashPassword = await UserModel.findOne({email: email})
        .then((user) => {
            if (user) {
                return user.password;
            } else {
                return ' ';
            }
        })
        .catch((err) => {
            throw new Error('User not found');
        })
    await bcrypt.compare(password, hashPassword)
        .then(function (result) {
            if (result === true) {
                loginSuccess = true;
            }
        });
    return loginSuccess;
}