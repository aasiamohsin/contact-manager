const express = require('express');
const router = express.Router();
const Contacts = require('../../models/Contacts');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route /api/contacts
//@desc Get all the users contacts
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const allContacts = await Contacts
      // Finds the logged in user matches with the user referred in the contact model
      .find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(allContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route /api/contacts
//@desc Add a new contact
//@access private
router.post(
  '/',
  [
    auth,
    [
      // Checks if the data entered is valid
      check('name', 'Add Name').not().isEmpty(),
      check('email', 'Add Email.').isEmail(),
      check('phone', 'Add Number').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Finds the validation error in the request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }

    const { name, email, phone, type } = req.body;

    try {
      // Creates new contact
      const newContact = new Contacts({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });

      // Save new contact in database
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route /api/contacts/:id
//@desc update the contact
//@access private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Stores updated data
  const contactFields = {};

  // If fields contains data
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // Get contact id
    let contact = await Contacts.findById(req.params.id);

    // Checks if the contact doesn't exist
    if (!contact) return res.status(400).json({ msg: 'Contact not found' });

    // Checks if the contact exist and owns by the current signed in user
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to update this contact' });
    }

    // Update contact
    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route /api/contacts/:id
//@desc delete a contact
//@access private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);

    // Checks if the contact doesn't exist
    if (!contact) return res.status(400).json({ msg: 'Contact not found' });

    // Checks if the contact exist and owns by the current signed in user
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to delete this contact' });
    }

    // Delete contact
    contact = await Contacts.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Contact successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
