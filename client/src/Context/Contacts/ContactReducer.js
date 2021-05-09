import {
  Add_Contact,
  Delete_Contact,
  Set_Current,
  Clear_Current,
  Update_Current,
  Filter_Contact,
  Clear_Filter,
  Set_Alert,
  Remove_Alert,
} from '../Types';

export const ContactReducer = (state, action) => {
  switch (action.type) {
    case Add_Contact:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case Delete_Contact:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case Update_Current:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
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
    default:
      return state;
  }
};
