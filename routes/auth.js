const express = require('express'); //Import Express
const router = express.Router(); //Use Express Router
const { login, getUser } = require('../controllers/authController'); // Get those methods from the Controller
const auth = require('../middleware/auth');

router
    .route('/')
    .get(auth, getUser) //the get maps to getUser
    .post(login); // the post maps to the login method in Controller

module.exports = router;
