const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
require("dotenv").config();
const connectDB = require('./config/db');
dotenv.config({ path: './config/.env' });

// Connect to MongoDB
const app = express();

app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new


// Routes
app.use('/api/transactions', require('./routes/transactions'));  // Here we give the path context the the Express Route "/"" in transaction route
app.use('/api/users', require('./routes/users')); // Here we give the path context the the Express Route "/"" in user route
app.use('/api/auth', require('./routes/auth')); // Here we give the path context the the Express Route "/"" in auth route


//Part of JWT Code
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}
const PORT = process.env.PORT || 5000;

//Listen to this Port
app.listen(PORT, console.log(`Server started on port: ${PORT}`));
