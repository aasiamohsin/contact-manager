import React, { useReducer } from 'react';
import { AlertContext } from './AlertContext';
import { AlertReducer } from './AlertReducer';
import { Set_Alert, Remove_Alert } from '../Types';
import uuid from 'uuid';

export const AlertState = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid.v4();
    dispatch({
      type: Set_Alert,
      payload: { msg, type, id },
    });

    setTimeout(() => {
      dispatch({
        type: Remove_Alert,
        payload: id,
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
