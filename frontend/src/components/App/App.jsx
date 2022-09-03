import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";


const NotFoundPage = () => {
   return (
       <>
           <h1>Not Found!</h1>
           <Link to="/">Go to main</Link>
       </>
)
}

const App = () => {
    return (
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="*" element={< NotFoundPage/>}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
            </Routes>
    );
}

export default App;
