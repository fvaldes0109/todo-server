const { Schema, model } = require('mongoose');

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
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING',
    }
});

TaskSchema.methods.toJSON = function() {
    const { __v, ...task } = this.toObject();
    return task;
}

module.exports = model('Task', TaskSchema);