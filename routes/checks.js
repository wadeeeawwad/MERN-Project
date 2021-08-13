const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    addCheck,
} = require('../controllers/checkController'); // Same is Importing from the Controller.Method

router
    .route('/')
    .post(auth, addCheck);

module.exports = router;