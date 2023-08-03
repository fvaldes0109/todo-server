const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    email: {
        type: String,
        required: [true, 'You must provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'You must provide a password'],
    }
});

module.exports = model('User', UserSchema);