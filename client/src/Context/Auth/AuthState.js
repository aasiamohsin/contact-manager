import React, { useReducer } from 'react';
import axios from 'axios';
import { setAuthToken } from '../../Utils/SetAuthToken';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './AuthReducer';
import {
  Register_Success,
  Register_Fail,
  User_Loaded,
  Auth_Error,
  Login_Success,
  Login_Fail,
  Logout,
  Clear_Errors,
} from '../Types';

export const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: Register_Success,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: Register_Fail,
        payload: err.response.data.msg,
      });
    }
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: User_Loaded,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: Auth_Error,
      });
    }
  };

  const loginUser = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: Login_Success,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: Login_Fail,
        payload: err.response.data.msg,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: Logout,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: Clear_Errors,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loadUser,
        loginUser,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
