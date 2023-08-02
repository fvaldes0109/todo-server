const { request, response } = require("express")

const Task = require('../models/task');

const tasksGet = (req = request, res = response) => {

    res.json({
        msg: 'get API - controller'
    });
}

const tasksPost = async (req = request, res = response) => {

    const body = req.body;
    const task = new Task(body);

    await task.save();

    res.json({
        msg: 'post API - controller',
        task,
    });
}

module.exports = {
    tasksGet,
    tasksPost,
}