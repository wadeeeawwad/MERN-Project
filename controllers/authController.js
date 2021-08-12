const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc    Gets logged in user
// @route   GET /api/auth
exports.getUser = async (req, res,next) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Get the Password Field from use (Select password from Users where id =id)
        res.json(user); // Return the pasword column of user
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' }); // If the await failed or used didnt exist
    }
};

// @desc    Log user in
// @route   POST /api/auth
exports.login = async (req, res,next) => {
    let { email, password } = req.body; //  Decounstruct Fields

    try {
        if (email) {
            email = email.toLowerCase();  //Convert email to lower Case
        }

        let user = await User.findOne({ email });  //try to search for said email in database

        if (!user) {
            return res.status(400).json({ msg: 'Email not found' }); // If email wasnt found return error 400 couldnt find email
        }

        const isMatch = await bcrypt.compare(password, user.password); // if email exists check if the password passed 
        //from form is same as the user with this email

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // If it Doesnt Match then return Error 404
        }

/** 
 * Java Web Token Authintication code 
  */

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
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
