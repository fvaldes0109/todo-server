const { request, response } = require("express")

const Task = require('../models/task');
const { priorityCompare } = require("../database/enums");

const tasksGet = async (req = request, res = response) => {

    let { order } = req.query;
    order = (order === 'asc' ? order : 'desc');

    const [total, tasks] = await Promise.all([
        Task.countDocuments(),
        Task.find({ user: req.uid }),
    ]);
    tasks.sort((task1, task2) => priorityCompare(task1.priority, task2.priority) * (order === 'desc' ? -1 : 1));

    res.json({
        total,
        tasks,
    });
}

const tasksPost = async (req = request, res = response) => {

    const { _id, __v, ...body } = req.body;
    const task = new Task(body);
    task.user = req.uid;

    await task.save();

    res.json({
        task,
    });
}

const tasksPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { __v, _id, user, ...body } = req.body;

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