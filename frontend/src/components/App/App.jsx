import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AppContext from "../../helpers/сontext";
import {useLocalStorage} from "../../helpers/useLocalStorage";
import Layout from "../Layout/Layout";

const App = () => {
    const [key, setKey] = useLocalStorage(null, 'token');
    return (
        <AppContext.Provider value={{
            key,
            setKey,
        }}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="*" element={< NotFoundPage/>}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

export default App;
