import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './locales/i18n';
import store from './slices/index';
import ApiContext from './contexts/ApiContext';
import socketProvider from './api/socketProvider';
import ContextProvider from './App/ContextProvider';

const wsHandlers = socketProvider();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ApiContext.Provider value={wsHandlers}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ApiContext.Provider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);
