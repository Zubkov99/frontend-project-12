import './App.css';
import React, { useMemo } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AppContext from '../contexts/AppContext';
import useLocalStorage from '../helpers/useLocalStorage';
import useAuth from '../helpers/useAuth';
import RoutesComponent from './Routes';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
  server: {
    root: 'https://slack-spa.herokuapp.com/',
    branch: 'main',
  },
  code_version: '0.13.7',
  person: {
    id: 117,
    email: 'chief@unsc.gov',
    username: 'john-halo',
  },
};

const App = () => {
  const [lang, setLang] = useLocalStorage('ru', 'lang');
  const [getLogin, getLogout, userData] = useAuth('', 'user');

  const contextValue = useMemo(() => ({
    lang,
    setLang,
    getLogin,
    getLogout,
    userData,
  }), [lang, setLang, getLogin, getLogout, userData]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AppContext.Provider value={contextValue}>
          <RoutesComponent />
        </AppContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
