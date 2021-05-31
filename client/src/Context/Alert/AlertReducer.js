import { Set_Alert, Remove_Alert } from '../Types';

export const AlertReducer = (state, action) => {
  switch (action.type) {
    case Set_Alert:
      return [...state, action.payload];
    case Remove_Alert:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
