import React, { useState, useContext } from 'react';
import { contactContext } from '../../Context/Contacts/ContactContext';

export const AddContact = () => {

    const { addContact } = useContext(contactContext);

    const [ contact, setContact ] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onSubmit = e => {
        e.preventDefault()

        addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    return (
        <form className="form-control" onSubmit = {onSubmit}>
            <input type = "text" name = "name" value = {name} placeholder = "Name" onChange = {onChange}/>
            <input type = "text" name = "email" value = {email} placeholder = "Email" onChange = {onChange}/>
            <input type = "text" name = "phone" value = {phone} placeholder = "Phone" onChange = {onChange}/>
            <div className = "contact-type">
                <h3>Contact Type:</h3>
                <label>Personal</label>
                <input style = {{filter: 'grayscale(1)'}} type = "radio" name = "type" value = 'personal' checked = {type === 'personal'} onChange = {onChange}/>
                <label style = {{marginLeft: '20px'}}>Professional</label>
                <input style = {{filter: 'grayscale(1)'}} type = "radio" name = "type" value = 'professional' checked = {type === 'professional'} onChange = {onChange}/>
            </div>
            <input type = "submit" value = "Add Contact" className = "btn"/>
        </form>
    )
}