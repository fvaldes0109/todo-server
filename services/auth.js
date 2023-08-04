const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/webtoken');

// Log in an already existing user by returning its token
const login = async (req = request, res = response) => {

    try {
        const { email, password } = req.body;
    
        // Non existing account
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            msg: 'Incorrect credentials'
        });
    
        // Wrong password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({
            msg: 'Incorrect credentials'
        });
    
        const token = await generateJWT(user.id);
        
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
    login
}