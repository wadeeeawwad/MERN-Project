const ExpenseController = require('../controllers/expense.controller');
module.exports = function(app){
    app.get('/api', ExpenseController.index);
    app.post('/api/expense', ExpenseController.createExpense);
    app.get('/api/expense', ExpenseController.findAllExpense);
    app.get('/api/expense/:id', ExpenseController.getExpense);
    app.put('/api/expense/:id', ExpenseController.updateExpense);
    app.delete('/api/expense/:id', ExpenseController.deleteExpense);
    
}
