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

// Removing MongoDB data and encrypted password from the response
UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model('User', UserSchema);