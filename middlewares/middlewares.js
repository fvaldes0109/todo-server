const { request, response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Task = require('../models/task');
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
        return res.status(401).json({
            msg: 'Missing auth token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid; // Extract user id from token

        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid auth token'
        })
    }
}

// Check if the task belongs to the user trying to modify it
const taskBelongsToUser = async (req = request, res = response, next) => {

    const { id } = req.params;
    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({
            msg: 'Task not found'
        });
    }
    
    if(task.user.toString() !== req.uid){
        return res.status(401).json({
            msg: 'Not authorized to access this task'
        });
    }

    next();
}

// Check if the user exists in the database
const userExists = async (req = request, res = response, next) => {

    const { uid } = req;
    const user = await User.findById(uid);

    if(!user){
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    next();
}

module.exports = {
    validateFields,
    taskBelongsToUser,
    userExists,
    validateJWT
}