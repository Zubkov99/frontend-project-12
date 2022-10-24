import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './i18n';
import store from "./slices/index";
import SocketContext from "./helpers/SocketContext";

const socket = io();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <SocketContext.Provider value={socket}>
                <App />
                </SocketContext.Provider>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
