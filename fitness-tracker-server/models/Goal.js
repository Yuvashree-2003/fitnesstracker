const mongoose = require('mongoose');
const GoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    goalType: {
        type: String,
        required: true,
    },

    target: {
        type: Number,
        required: true,
    },

    progress: {
        type: Number,
        default: 0,
    },

    date: {
        type: Date,
        default: Date.now,
        
    },
});

module.exports = mongoose.model('goal', GoalSchema);