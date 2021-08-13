const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a user
// @route   POST /api/users
exports.addUser = async (req, res) => {
    let { email, password ,firstname,lastname } = req.body; // Destructuring
    try {
        email = email.toLowerCase(); // change email to lower case so it can serach even if user entered capital letters by mistake or in domain name
        let user = await User.findOne({ email: email }); // search for simialr result

        if (user) {
            return res.status(400).json({ msg: 'Email already in use' }); // if email already used
        }
////////////////////////////////Add First Name , Last Name Here
        user = new User({  //create new user with the data read from request boddy
            firstname,
            lastname,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save(); // save the object to database same as Add()

        //Authintication Code Goes Here

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message); // Catch Validation Errors based on the model
            // and then get all keys and values and create 
            //Error messages of a custom text so they could appear to the user on the front end forms

            return res.status(400).json({ // Return the message in the Response Wrapper
                success: false,
                error: messages
            });
        } else {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error' }); // If the Error isnt a Validation Error then Retiurn Status 500 hence server error
        }
    }
};
