import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../Context/Alert/AlertContext';
import { AuthContext } from '../../Context/Auth/AuthContext';

export const Register = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { registerUser, error, clearErrors, isAuthenticated } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User with this email already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password and Confirm Password do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password,
      });
      console.log('User Registered');
    }
  };

  return (
    <div className='form-container'>
      <h1>User Registration</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn' />
      </form>
      <strong>
        Already registered ? <Link to='/login'>Login</Link>
      </strong>
    </div>
  );
};
