const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { enums } = require('../database/enums');
const User = require('../models/user');

// Returns the errors from the middlewares in routes
const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

// Validate JWT
const validateJWT = (req = request, res = response, next) => {

    const token = req.header('todo-token');

    if (!token) {
        res.status(401).json({
            msg: 'Missing auth token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid; // Extract user id from token

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Invalid auth token'
        })
    }
}

// If status is given, checks if it is on the list
const validStatus = (status) => {
    const validStatuses = enums.status;
    if( status !== undefined && !validStatuses.includes(status) ){
        throw new Error(`The status must be one of the following: ${validStatuses}`);
    }
    return true;
}

// If priority is given, checks if it is on the list
const validPriority = (priority) => {

    const validPriorities = enums.priority;
    if( priority !== undefined && !validPriorities.includes(priority) ){
        throw new Error(`The priority must be one of the following: ${validPriorities}`);
    }
    return true;
}

// The title cannot be an empty string
const validTitleUpdate = (title) => {

    if(title == ''){
        throw new Error('The title cannot be an empty string');
    }
    return true;
}

// Checks if the email is already in use
const isUniqueEmail = async (email) => {

    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`Email ${email} already exists`);
    }
}

module.exports = {
    validateFields,
    validStatus,
    validTitleUpdate,
    validPriority,
    isUniqueEmail,
    validateJWT
}