const { request, response } = require("express")

const Task = require('../models/task');
const { priorityCompare } = require("../database/enums");

// Obtains all the tasks for a user. May be sorted by priority
const tasksGet = async (req = request, res = response) => {

    try {
        let { order, status } = req.query;
        if (status) status = status.toUpperCase();
    
        // Get user's tasks and its task count
        const [total, tasks] = await Promise.all([
            Task.countDocuments({ user: req.uid }),
            status ? Task.find({ user: req.uid, status }) : Task.find({ user: req.uid }),
        ]);
    
        // Sort if requested
        if (order) tasks.sort((task1, task2) => priorityCompare(task1.priority, task2.priority) * (order === 'desc' ? -1 : 1));
    
        res.json({
            total,
            tasks,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

// Create a new task
const tasksPost = async (req = request, res = response) => {

    try {
        const { _id, __v, ...body } = req.body;
        const task = new Task(body);
        task.user = req.uid; // Link task to its user
    
        await task.save();
    
        res.json({
            task,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

// Edit an existing task
const tasksPut = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { __v, _id, user, ...body } = req.body;
    
        const task = await Task.findByIdAndUpdate(id, body, { new: true });
    
        res.json({
            task,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

// Remove an existing task
const tasksDelete = async (req = request, res = response) => {

    try {
        const { id } = req.params;
    
        const result = await Task.deleteOne({ _id: id });
    
        res.json({
            result,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

// Delete all the tasks of a user
const tasksDeleteAll = async (req = request, res = response) => {

    try {
        const { uid } = req;
    
        const result = await Task.deleteMany({ user: uid });
    
        res.json({
            result,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

module.exports = {
    tasksGet,
    tasksPost,
    tasksDelete,
    tasksPut,
    tasksDeleteAll,
}