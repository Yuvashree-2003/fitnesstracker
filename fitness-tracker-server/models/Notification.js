const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    message: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('notification', NotificationSchema);