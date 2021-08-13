const Check = require("../models/Check");
// @desc    Add transaction
// @route   POST /api/transactions
exports.addCheck = async (req, res, next) => {
    try {
        const { towhom, amount,duedate } = req.body; // Destructuring
        const check = await Check.create({
            towhom: towhom,
            amount: amount,
            duedate : duedate,
            user: req.user.id
        });

        return res.status(201).json({  // Code 201 is for Created Successfuly responses
            success: true,
            data: check
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