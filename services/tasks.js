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

    const { _id, __v, ...body } = req.body;
    const task = new Task(body);

    await task.save();

    res.json({
        msg: 'post API - controller',
        task,
    });
}

const tasksPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { __v, _id, ...body } = req.body;

    const task = await Task.findByIdAndUpdate(id, body, { new: true });

    res.json({
        task,
    });
}

const tasksDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    res.json({
        task,
    });
}

module.exports = {
    tasksGet,
    tasksPost,
    tasksDelete,
    tasksPut,
}