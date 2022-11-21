import React, { useMemo } from 'react';
import App from './App';
import useLanguage from '../helpers/useLanguage';
import useAuth from '../helpers/useAuth';

const ContextProvider = () => {
  const [lang, setLang] = useLanguage('ru', 'lang');
  const [getLogin, getLogout, userData] = useAuth();

  const contextValue = useMemo(() => ({
    lang,
    setLang,
    getLogin,
    getLogout,
    userData,
  }), [lang, setLang, getLogin, getLogout, userData]);
  return <App props={contextValue} />;
};

export default ContextProvider;
