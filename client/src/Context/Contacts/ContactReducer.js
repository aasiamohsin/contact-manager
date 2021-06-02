import {
  Add_Contact,
  Get_Contacts,
  Delete_Contact,
  Contact_Error,
  Set_Current,
  Clear_Current,
  Update_Current,
  Filter_Contact,
  Clear_Contacts,
  Clear_Filter,
} from '../Types';

export const ContactReducer = (state, action) => {
  switch (action.type) {
    case Add_Contact:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case Get_Contacts:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case Delete_Contact:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case Update_Current:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    case Set_Current:
      return {
        ...state,
        currentContact: action.payload,
      };
    case Clear_Current:
      return {
        ...state,
        currentContact: null,
      };
    case Filter_Contact:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case Clear_Filter:
      return {
        ...state,
        filtered: null,
      };
    case Contact_Error:
      return {
        ...state,
        error: action.payload,
      };
    case Clear_Contacts:
      return {
        ...state,
        contacts: null,
        currentContact: null,
        filtered: null,
        error: null,
      };
    default:
      return state;
  }
};
