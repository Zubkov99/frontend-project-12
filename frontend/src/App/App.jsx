import './App.css';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AppContext from '../contexts/AppContext';
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

const App = ({ props }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AppContext.Provider value={props}>
        <RoutesComponent />
      </AppContext.Provider>
    </ErrorBoundary>
  </Provider>
);

export default App;
