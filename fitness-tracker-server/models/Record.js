const mongoose = require('mongoose');
const RecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    workoutType: {
        type: String,
        required: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    intensity: {
        type: String,
        required: true,
        enum: ['slow', 'medium','intense'],
    },

    date: {
        type: Date,
        default: Number,
        required: true,
    },
});

module.exports = mongoose.model('record', RecordSchema);