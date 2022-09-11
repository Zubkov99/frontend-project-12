import React, {useContext, useEffect} from "react";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../slices/channels";
import axios from "axios";

const HomePage = () => {
    // const { key } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // const dispatch = useDispatch();


  // useEffect(() => {
  //     return async () => {
  //         const response = await axios.get('/api/v1/data', {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': key,
  //             }
  //         });
  //         console.log(response.data)
  //     };
  // }, [])

    // useEffect(() => {
    //     if(!key) {
    //         navigate('/login');
    //         return;
    //     }
    //     dispatch(fetchChannels(key))
    // }, [])

    return (
        <>
            <h2>Welcome to the homepage!</h2>
            <p>You can do this, I believe in you.</p>
        </>
    );
}

export default  HomePage;