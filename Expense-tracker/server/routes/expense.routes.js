const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    cheek: {
        type: Number,
        optional:[true]
    },

    dueDate: {type: Date}
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);