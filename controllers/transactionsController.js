const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res,next) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }); // find transactions holding this user Id

        return res.status(200).json({  // return Data inside a ResponseWrapper just to make life easier
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({   // Return Error 500 inside the Wrapper Body if its an error 
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Add transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res,next) => {
    try {
        const { name, amount,comment } = req.body; // Destructuring
        const transaction = await Transaction.create({
            name: name,
            amount: amount,
            comment : comment,
            user: req.user.id
        });

        return res.status(201).json({  // Code 201 is for Created Successfuly responses
            success: true,
            data: transaction
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message); // Loop on the Error Dictionary to and create an error message for the Wrapper

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Delete transactions
// @route   GET /api/transactions/:id
exports.deleteTransaction = async (req, res,next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) { // If Transaction doesnt exist
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        // console.log(req.user.id);
        // console.log(transaction.user);
        if (req.user.id !== transaction.user.toString()) { // If a user is trying to access another user transaction Dont allow it 
            return res.status(401).json({
                success: false,
                error: 'Not authorized'
            });
        }

        await transaction.remove(); // Remove the Transaction

        return res.status(200).json({ // Retuern Success
            success: true,
            data: { msg: 'Transaction removed' }
        });
    } catch (err) { // If Error return error 500
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
