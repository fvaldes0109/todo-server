const { Schema, model } = require('mongoose');

const { enums } = require('../database/enums');

const TaskSchema = Schema({

    title: {
        type: String,
        required: [true, 'You must provide a title for the task'],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: enums.status,
        default: 'PENDING',
    },
    priority: {
        type: String,
        enum: enums.priority,
        default: 'Medium',
    }
});

TaskSchema.methods.toJSON = function() {
    const { __v, _id, ...task } = this.toObject();
    task.id = _id;
    return task;
}

module.exports = model('Task', TaskSchema);