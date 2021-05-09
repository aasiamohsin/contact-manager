import React, { useState, useContext, useEffect } from 'react';
import { contactContext } from '../../Context/Contacts/ContactContext';

export const AddContact = () => {
  const {
    addContact,
    updateContact,
    currentContact,
    clearCurrent,
  } = useContext(contactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (currentContact !== null) {
      setContact(currentContact);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [currentContact]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentContact === null) {
      addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    } else {
      updateContact(contact);
      clearCurrent();
    }
  };

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  return (
    <form className='form-control' onSubmit={onSubmit}>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='Name'
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        value={email}
        placeholder='Email'
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        value={phone}
        placeholder='Phone'
        onChange={onChange}
      />
      <div className='contact-type'>
        <h3>Contact Type:</h3>
        <label>Personal</label>
        <input
          style={{ filter: 'grayscale(1)' }}
          type='radio'
          name='type'
          value='personal'
          checked={type === 'personal'}
          onChange={onChange}
        />
        <label style={{ marginLeft: '20px' }}>Professional</label>
        <input
          style={{ filter: 'grayscale(1)' }}
          type='radio'
          name='type'
          value='professional'
          checked={type === 'professional'}
          onChange={onChange}
        />
      </div>
      <input
        type='submit'
        value={currentContact ? 'Update Contact' : 'Add Contact'}
        className='btn'
      />

      {currentContact && <input type='submit' value='Clear' className='btn' />}
    </form>
  );
};
