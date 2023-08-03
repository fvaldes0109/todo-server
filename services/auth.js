const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/webtoken');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({
        msg: 'Incorrect credentials'
    });

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({
        msg: 'Incorrect credentials'
    });

    const token = await generateJWT(user.id);
    
    res.json({
        user,
        token,
    });
}

module.exports = {
    login
}