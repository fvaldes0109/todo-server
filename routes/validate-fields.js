const { validationResult } = require('express-validator');

const { enums } = require('../database/enums');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
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

module.exports = {
    validateFields,
    validStatus,
    validTitleUpdate,
    validPriority,
}