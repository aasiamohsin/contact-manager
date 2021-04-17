import React from 'react';
import PropTypes from 'prop-types';

export const ContactItem = ({ contact }) => {

    const { name, email, phone, type } = contact;

    return (
        <div className="contacts">
            <h3 className="contact-info">
                {name}
                <span className={`type ${type === 'personal' ?  'personal' : 'professional'}` }>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </h3>
            <ul className="list">
                {
                    phone && <li> <i className="fas fa-phone" /> {phone}</li>
                }
                {
                    email && <li><i className="far fa-envelope " /> {email}</li>
                }
            </ul>
            <button className="btn">Edit</button>
            <button className="btn">Delete</button>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}