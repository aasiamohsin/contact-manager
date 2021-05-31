import React, { Fragment, useState, useEffect, useContext } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Contacts } from '../Contacts/Contacts';
import { AddContact } from '../Contacts/AddContact';
import { FilterContact } from '../Contacts/FilterContact';
import { AuthContext } from '../../Context/Auth/AuthContext';

export const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='add-form'>
        <h2>Contacts</h2>
        <h3
          style={{ cursor: 'pointer' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <i className='fas fa-times' />
          ) : (
            <i className='fas fa-user-plus' />
          )}
        </h3>
      </div>
      <SwitchTransition>
        <CSSTransition key={showForm} timeout={400} classNames='item'>
          <Fragment>{showForm && <AddContact />}</Fragment>
        </CSSTransition>
      </SwitchTransition>
      <div>
        <FilterContact />
        <Contacts setForm={() => setShowForm(true)} />
      </div>
    </div>
  );
};
