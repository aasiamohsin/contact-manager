import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '40px', margin: '50px auto', display: 'block' }}
        alt='loading...'
      />
    </Fragment>
  );
};
