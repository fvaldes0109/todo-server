const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersPost = async (req = request, res = response) => {

    const { _id, __v, password, ...body } = req.body;
    const user = new User(body);

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user,
    })
}

module.exports = {
    usersPost,
}