const express = require('express');
const bcrypt = require('bcrypt');
const jwToken = require('jsonwebtoken');
const config = require('config');

// Initialize router
const router = express.Router();

// Import express validator
const { check, validationResult } = require('express-validator')

// Import user model
const Users = require('../../models/Users')

//@route POST /api/users
//@desc Register a user
//@access Public
router.post('/', [
    // Checks if the data entered is valid
    check('name', 'Please enter username.').not().isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Please enter 6 char password').isLength({min: 6})
], async (req, res) => {

    // Finds the validation error in the request
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    const { name, email, password } = req.body

    try {
        // Finds email if the email provided already exist
        let user = await Users.findOne({email})
        if(user) {
            return res.status(400).json({msg: 'User with this email already exist'});
        }

        // Creates new user by Users model with mongoose schemma
        user = new Users({
            name,
            email,
            password
        });

        // Generates a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        user.password = await bcrypt.hash(password, salt);

        // Saves new user into database
        await user.save();

        // Create payload for user id
        const payload = {
            user: {
                id: user.id
            }
        }
        
        // Generates jwt 
        jwToken.sign(payload, config.get('jwtSecret'), {
            // Login session timeout
            expiresIn: 3600000
        },
        
        (err, token) => {
            if(err) throw err;
            res.json({ token })
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;