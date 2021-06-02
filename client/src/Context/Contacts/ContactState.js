import React, { useReducer } from 'react';
import { contactContext } from './ContactContext';
import { ContactReducer } from './ContactReducer';
import axios from 'axios';
import {
  Add_Contact,
  Get_Contacts,
  Delete_Contact,
  Clear_Contacts,
  Contact_Error,
  Set_Current,
  Clear_Current,
  Update_Current,
  Filter_Contact,
  Clear_Filter,
} from '../Types';

export const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    currentContact: null,
    filtered: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: Add_Contact,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: Contact_Error, payload: err.response.msg });
    }
  };

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: Get_Contacts,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: Delete_Contact,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: Update_Current,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
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

  const clearContacts = () => {
    dispatch({
      type: Clear_Contacts,
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        addContact,
        getContacts,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContact,
        clearContacts,
        clearFilter,
      }}
    >
      {children}
    </contactContext.Provider>
  );
};
