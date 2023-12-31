const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/webtoken')

// Given the user id inside a token, return its user data
const usersGet = async (req = request, res = response) => {

    try {
        const user = await User.findOne({ _id: req.uid });
    
        if (!user) {
            return res.status(400).json({
                msg: 'User not found'
            });
        }
    
        res.json({
            user
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

// Create a new user
const usersPost = async (req = request, res = response) => {

    try {

        const { _id, __v, password, ...body } = req.body;
        const user = new User(body);
    
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    
        const token = await generateJWT(user.id);
        await user.save();
    
        res.json({
            user,
            token,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

module.exports = {
    usersGet,
    usersPost,
}