import { Add_Contact, Delete_Contact, Set_Current, Clear_Current, Update_Current, Filter_Contact, Clear_Filter, Set_Alert, Remove_Alert } from '../Types';

export const ContactReducer = (state, action) => {
    switch(action.type) {
        case Add_Contact:
            return {
                ...state, contacts: [...state.contacts, action.payload]
            }
        default:
            return state;
        
    }
}
