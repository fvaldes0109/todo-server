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

module.exports = model('Task', TaskSchema);