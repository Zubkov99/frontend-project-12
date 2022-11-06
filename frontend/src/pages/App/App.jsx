import './App.css';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SignupPage from '../SignupPage/SignupPage';
import AppContext from '../../contexts/AppContext';
import useLocalStorage from '../../helpers/useLocalStorage';
import Layout from '../Layout/Layout';

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
  const [key, setKey] = useLocalStorage(null, 'user');
  const [lang, setLang] = useLocalStorage('ru', 'lang');
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AppContext.Provider value={{
          key,
          setKey,
          lang,
          setLang,
        }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
