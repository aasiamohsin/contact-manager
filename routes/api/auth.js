const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const bcrypt = require('bcrypt');
const jwToken = require('jsonwebtoken');
const config = require('config');

// Import express validator
const { check, validationResult } = require('express-validator')

// Import user model
const Users = require('../../models/Users')

//@route /api/auth
//@desc Get logged in user
//@access private
router.get('/', auth, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route /api/auth
//@desc Authorize user and get the token
//@access Public
router.post('/', [

    // Checks the email and password exist/valid
    check('email', 'Please enter your email').isEmail(),
    check('password', 'Please enter password').exists()

], async (req, res) => {

    // Finds the validation error in the request
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    const { email, password } = req.body

    try {

    // Finds users email
    let user = await Users.findOne({email})

    if(!user) {
        return res.status(400).json({msg: `${email} doesn't exist`});
    }

    // Match password with the hashed password
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword) {
        return res.status(400).json({msg: 'Password you entered is incorrect'})
    }

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
    
    // Shows token if user successfully logged in otherwise throws error
    (err, token) => {
        if(err) throw err;
        res.json({ token })
    });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;