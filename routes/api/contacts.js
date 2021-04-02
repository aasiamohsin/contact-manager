const express = require('express');
const router = express.Router();

//@route /api/contacts
//@desc Get all the users contacts
//@access private
router.get('/', (req, res) => {
    res.send('Get all contacts')
});

//@route /api/contacts
//@desc Add a new contact
//@access private
router.post('/', (req, res) => {
    res.send('Add new contact')
});

//@route /api/contacts/:id
//@desc update the contact
//@access private
router.put('/:id', (req, res) => {
    res.send('Update the contact')
});

//@route /api/contacts/:id
//@desc delete a contact
//@access private
router.delete('/:id', (req,res) => {
    res.send('Delete a contact')
});

module.exports = router;