import './App.css';
import React, { useMemo } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SignupPage from '../SignupPage/SignupPage';
import AppContext from '../../contexts/AppContext';
import useLocalStorage from '../../helpers/useLocalStorage';
import Layout from '../Layout/Layout';
import useAuth from '../../helpers/useAuth';

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
  const [getLogin, getLogout, userData] = useAuth('','user');

  const contextValue = useMemo(() => ({
    lang,
    setLang,
    getLogin,
    getLogout,
    userData
  }), [lang, setLang,getLogin, getLogout, userData]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AppContext.Provider value={{
          ...contextValue,
          getLogin,
          getLogout,
          userData
        }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={userData ? <HomePage /> : <LoginPage />} />
              <Route path="/login" element={!userData ? <LoginPage /> : <HomePage />} />
              <Route path="/signup" element={!userData ? <SignupPage /> : <HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
