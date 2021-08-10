const { Expense } = require("../models/expense.model");

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createExpense = (request, response) => {
    const { name, amount, cheek, cheekAmount, cheekDate } = request.body;
    Expense.create({
        name,
        amount,

        cheek: {
            cheekAmount,
            
            cheekDate
        }

    })
        .then(expense => response.json(expense))
        .catch(err => response.status(400).json(err))
}

module.exports.findAllExpense = (req, res) => {
    Expense.find()
        .then(allDaExpense => res.json(allDaExpense))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.getExpense = (request, response) => {
    Expense.findOne({ _id: request.params.id })
        .then(expense => response.json(expense))
        .catch(err => response.json(err))
}

module.exports.updateExpense = (request, response) => {
    Expense.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updatedExpense => response.json(updatedExpense))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteExpense = (request, response) => {
    Expense.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}