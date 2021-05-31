import React, { useReducer } from 'react';
import { contactContext } from './ContactContext';
import { ContactReducer } from './ContactReducer';
import uuid from 'uuid';
import {
  Add_Contact,
  Delete_Contact,
  Set_Current,
  Clear_Current,
  Update_Current,
  Filter_Contact,
  Clear_Filter,
} from '../Types';

export const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Aasia',
        email: 'aasia@gmail.com',
        phone: '999-999-9999',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Saba',
        email: 'saba@gmail.com',
        phone: '777-777-6666',
        type: 'professional',
      },
      {
        id: 3,
        name: 'Sana',
        email: 'sana@gmail.com',
        phone: '888-888-7777',
        type: 'personal',
      },
    ],
    currentContact: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({
      type: Add_Contact,
      payload: contact,
    });
  };

  const deleteContact = (id) => {
    dispatch({
      type: Delete_Contact,
      payload: id,
    });
  };

  const updateContact = (contact) => {
    dispatch({
      type: Update_Current,
      payload: contact,
    });
  };

  const setCurrent = (contact) => {
    dispatch({
      type: Set_Current,
      payload: contact,
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: Clear_Current,
    });
  };

  const filterContact = (text) => {
    dispatch({
      type: Filter_Contact,
      payload: text,
    });
  };

  const clearFilter = () => {
    dispatch({
      type: Clear_Filter,
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContact,
        clearFilter,
      }}
    >
      {children}
    </contactContext.Provider>
  );
};
