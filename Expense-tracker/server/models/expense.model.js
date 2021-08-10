const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    cheek: {
        cheekAmount: {
            type: Number,
            // optional: [true, 'Please add a positive or negative number']

        },
        cheekDate: {
            type: Date,
            // optional: [true, 'Please add date .']
        }
    },

}, { timestamps: true });

module.exports.Expense = mongoose.model('Expense', TransactionSchema);
