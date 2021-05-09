import React, { useContext, useEffect, useRef } from 'react';
import { contactContext } from '../../Context/Contacts/ContactContext';

export const FilterContact = () => {
  const { filtered, filterContact, clearFilter } = useContext(contactContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='filter-form'>
      {filtered && <i className='fas fa-times' onClick={clearFilter} />}
      <input type='text' ref={text} placeholder='Search' onChange={onChange} />
    </form>
  );
};
