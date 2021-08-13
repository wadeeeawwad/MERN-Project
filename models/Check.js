const mongoose = require('mongoose');

const CheckSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    towhom: {
        type: String,
        trim: true,
        required: [true, 'Please add to whom this check is']
    },
    amount: {
        type: Number,
        required: [true, 'Please select the check amount']
    },
    duedate: {
        type: Date,
        required: [true, 'Please enter the check due date'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Check', CheckSchema);
