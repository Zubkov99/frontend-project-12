import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./slices/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
