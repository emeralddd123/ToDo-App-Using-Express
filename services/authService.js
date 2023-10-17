const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginService = async function (loginData) {
    try {
        const userWithName = await UserModel.findOne({ username: loginData.username });

        if (!userWithName) {
            return { status: 401, message: "Incorrect login credentials" };
        }

        const isValidPassword = await userWithName.isValidPassword(loginData.password);

        if (!isValidPassword) {
            return { status: 401, message: "Incorrect login credentials" };
        } else {
            const userData = { ...userWithName._doc };
            delete userData['password'];
            delete userData['createdAt'];
            delete userData['updatedAt'];

            const token = jwt.sign({ user: userData }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return { status: 201, message: 'Success', token };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}

module.exports = loginService;
