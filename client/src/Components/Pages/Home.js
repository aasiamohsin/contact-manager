import React, { Fragment, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Contacts } from '../Contacts/Contacts';
import { AddContact } from '../Contacts/AddContact';
import { FilterContact } from '../Contacts/FilterContact';

export const Home = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className='add-form'>
        <h2 style={{ color: 'white' }}>Contacts</h2>
        <h3
          style={{ cursor: 'pointer', color: 'white' }}
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
