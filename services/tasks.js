const { request, response } = require("express")

const Task = require('../models/task');

const tasksGet = async (req = request, res = response) => {

    // Get all tasks
    const [total, tasks] = await Promise.all([
        Task.countDocuments(),
        Task.find(),
    ]);

    res.json({
        total,
        tasks,
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