const { enums } = require('../database/enums');
const User = require('../models/user');

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
    validStatus,
    validTitleUpdate,
    validPriority,
    isUniqueEmail,
}