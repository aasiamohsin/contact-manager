import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { contactContext } from '../../Context/Contacts/ContactContext';
import { ContactItem } from './ContactItem';

export const Contacts = ({ setForm }) => {
  const { contacts, filtered } = useContext(contactContext);

  if (contacts.length === 0) {
    return (
      <h4 style={{ color: 'white', textAlign: 'center', margin: '12px' }}>
        No contact to display.
        <br /> Please use the form to add contacts.
      </h4>
    );
  }

  return (
    <TransitionGroup>
      {filtered !== null
        ? filtered.map((contact) => (
            <CSSTransition key={contact.id} classNames='item' timeout={300}>
              <ContactItem key={contact.id} contact={contact} form={setForm} />
            </CSSTransition>
          ))
        : contacts.map((contact) => (
            <CSSTransition key={contact.id} classNames='item' timeout={300}>
              <ContactItem key={contact.id} contact={contact} form={setForm} />
            </CSSTransition>
          ))}
    </TransitionGroup>
  );
};
