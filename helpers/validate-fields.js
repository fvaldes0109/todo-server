const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { enums } = require('../database/enums');
const User = require('../models/user');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

const validateJWT = (req = request, res = response, next) => {

    const token = req.header('todo-token');

    if (!token) {
        res.status(401).json({
            msg: 'Missing auth token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Invalid auth token'
        })
    }
}

const validStatus = (status) => {
    const validStatuses = enums.status;
    if( status !== undefined && !validStatuses.includes(status) ){
        throw new Error(`The status must be one of the following: ${validStatuses}`);
    }
    return true;
}

const validPriority = (priority) => {

    const validPriorities = enums.priority;
    if( priority !== undefined && !validPriorities.includes(priority) ){
        throw new Error(`The priority must be one of the following: ${validPriorities}`);
    }
    return true;
}

const validTitleUpdate = (title) => {

    if(title == ''){
        throw new Error('The title cannot be an empty string');
    }
    return true;
}

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