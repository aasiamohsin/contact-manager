const express = require('express');
const router = express.Router();

//@route /api/auth
//@desc Get logged in user
//@access private
router.get('/', (req, res) => {
    res.send('Get logged in user')
});

//@route /api/auth
//@desc Authorize user and get the token
//@access Public
router.post('/', (req, res) => {
    res.send('login the user')
});

module.exports = router;