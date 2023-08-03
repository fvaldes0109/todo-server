const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/webtoken')

const usersPost = async (req = request, res = response) => {

    const { _id, __v, password, ...body } = req.body;
    const user = new User(body);

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    const token = await generateJWT(user.id);
    await user.save();

    res.json({
        user,
        token,
    })
}

module.exports = {
    usersPost,
}