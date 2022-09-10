import React, {useContext, useEffect} from "react";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";


const HomePage = () => {
    const { key } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!key) navigate('/login');
    }, [])

    return (
        <>
            <h2>Welcome to the homepage!</h2>
            <p>You can do this, I believe in you.</p>
        </>
    );
}

export default  HomePage;