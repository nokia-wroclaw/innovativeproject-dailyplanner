import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return <EmailContext.Provider value={{ email, setEmail }}>{children}</EmailContext.Provider>;
};

EmailProvider.propTypes = {
  children: PropTypes.any,
};
