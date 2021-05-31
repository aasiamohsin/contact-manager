import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContactState } from './Context/Contacts/ContactState';
import { AlertState } from './Context/Alert/AlertState';
import { AuthState } from './Context/Auth/AuthState';
import { Navbar } from './Components/Layout/Navbar';
import { Home } from './Components/Pages/Home';
import { About } from './Components/Pages/About';
import { Register } from './Components/Auth/Register';
import { Login } from './Components/Auth/Login';
import { Alert } from './Components/Layout/Alert';
import { setAuthToken } from './Utils/SetAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alert />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
