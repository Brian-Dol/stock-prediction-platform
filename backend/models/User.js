const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);
