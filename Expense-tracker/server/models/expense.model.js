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
        amount: {
            type: Number,
            required: [true, 'Please add a positive or negative number']

        },
        cheekDate: {
            type: Date,
            required: [true, 'Please add date .']
        }




    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
