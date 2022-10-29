/* eslint-disable */
import './App.css';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import SignupPage from '../../pages/SignupPage';
import AppContext from '../../helpers/context';
import useLocalStorage from '../../helpers/useLocalStorage';
import Layout from '../Layout/Layout';

const rollbarConfig = {
  accessToken: 'ff503d3bcafc4c20b3a14249c5f53c3b',
  environment: 'production',
  server: {
    root: 'http://localhost:3000',
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
            }}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="*" element={< NotFoundPage/>}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                    <Route path='/signup' element={<SignupPage />}></Route>
                </Route>
            </Routes>
        </AppContext.Provider>
            </ErrorBoundary>
        </Provider>
  );
};

export default App;
