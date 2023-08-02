const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

const validStatus = (status) => {
    const validStatus = ['PENDING', 'COMPLETED'];
    if( status !== undefined && !validStatus.includes(status) ){
        throw new Error(`The status must be one of the following: ${validStatus}`);
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
}