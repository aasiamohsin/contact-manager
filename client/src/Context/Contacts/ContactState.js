import React, { useReducer } from 'react';
import { Add_Contact, Delete_Contact, Set_Current, Clear_Current, Update_Current, Filter_Contact, Clear_Filter, Set_Alert, Remove_Alert } from '../Types';
import { contactContext } from './ContactContext';
import { ContactReducer } from './ContactReducer';
import uuid from 'uuid';

export const ContactState = ({children}) => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Aasia',
                email: 'aasia@gmail.com',
                phone: '999-999-9999',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Saba',
                email: 'saba@gmail.com',
                phone: '777-777-6666',
                type: 'professional'
            },
            {
                id:3,
                name: 'Sana',
                email: 'sana@gmail.com',
                phone: '888-888-7777',
                type: 'personal'
            }
        ]
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = contact => {
        contact.id = uuid.v4()
        dispatch({
            type: Add_Contact,
            payload: contact
        })
    }

    return (
        <contactContext.Provider value = {{
            contacts: state.contacts,
            addContact,

        }}>
            {children}
        </contactContext.Provider>
    )
}
