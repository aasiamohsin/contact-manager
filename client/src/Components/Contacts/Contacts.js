import React, { Fragment, useContext } from 'react';
import { contactContext } from '../../Context/Contacts/ContactContext'
import { ContactItem } from './ContactItem';

export const Contacts = () => {

    const { contacts } = useContext(contactContext);

    return (
        <Fragment>
            {
                contacts.map(contact => (
                    <ContactItem key = {contact.id} contact = {contact}/>
                ))
            }
        </Fragment>
    )
}