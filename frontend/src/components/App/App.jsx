import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import SignupPage from "../../pages/SignupPage";
import AppContext from "../../helpers/сontext";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import Layout from "../Layout/Layout";

const App = () => {
    const [key, setKey] = useLocalStorage(null, 'user');
    const [lang, setLang] = useLocalStorage('ru', 'lang');
    return (
        <AppContext.Provider value={{
            key,
            setKey,
            lang,
            setLang
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
    );
}

export default App;
