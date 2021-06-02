import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { contactContext } from '../../Context/Contacts/ContactContext';
import { ContactItem } from './ContactItem';
import { Spinner } from '../Layout/Spinner';

export const Contacts = ({ setForm }) => {
  const { contacts, getContacts, filtered, loading } =
    useContext(contactContext);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <h4 style={{ color: 'white', textAlign: 'center', margin: '12px' }}>
        No contact to display.
        <br /> Please use the form to add contacts.
      </h4>
    );
  }

  return (
    <TransitionGroup>
      {contacts !== null && !loading ? (
        <Fragment>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  classNames='item'
                  timeout={300}
                >
                  <ContactItem
                    key={contact._id}
                    contact={contact}
                    form={setForm}
                  />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  classNames='item'
                  timeout={300}
                >
                  <ContactItem
                    key={contact._id}
                    contact={contact}
                    form={setForm}
                  />
                </CSSTransition>
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </TransitionGroup>
  );
};
