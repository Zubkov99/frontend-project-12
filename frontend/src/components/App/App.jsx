import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AppContext from "../../helpers/сontext";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import Layout from "../Layout/Layout";

const App = ({props}) => {
    const [key, setKey] = useLocalStorage(null, 'user');
    return (
        <AppContext.Provider value={{
            key,
            setKey,
        }}>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage props={props} />} />
                    <Route path="*" element={< NotFoundPage/>}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

export default App;
