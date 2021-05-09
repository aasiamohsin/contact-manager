import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { contactContext } from '../../Context/Contacts/ContactContext';

export const ContactItem = ({ contact, form }) => {
  const { id, name, email, phone, type } = contact;

  const { deleteContact, setCurrent, clearCurrent } = useContext(
    contactContext
  );

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(contact);
  };

  return (
    <div className='contacts'>
      <h3 className='contact-info'>
        {name}
        <span
          className={`type ${
            type === 'personal' ? 'personal' : 'professional'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
        {email && (
          <li>
            <i className='far fa-envelope' /> {email}
          </li>
        )}
      </ul>
      <button
        className='btn'
        onClick={() => {
          onEdit();
          form();
        }}
      >
        Edit
      </button>
      <button className='btn' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
