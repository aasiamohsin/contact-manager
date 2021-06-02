import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../Context/Alert/AlertContext';
import { AuthContext } from '../../Context/Auth/AuthContext';

export const Login = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { loginUser, error, clearErrors, isAuthenticated } =
    useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Password you entered is incorrect') {
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
    if (!email || !password) {
      setAlert('Please enter all fields.', 'danger');
    } else {
      loginUser({ email, password });
    }
    console.log('Login User');
  };

  return (
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
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
          />
        </div>

        <input type='submit' value='Login' className='btn' />
      </form>
      <strong>
        Don't have an account ? <Link to='/register'>Register now</Link>
      </strong>
    </div>
  );
};
