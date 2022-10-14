import React, {useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";
import { fetchChannels } from "../slices/channels";
import ChatWindow from "../components/ChatWindow/ChatWindow";

const HomePage = () => {

    const { key } = useContext(AppContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect( () => {
      if(!key) {
          navigate('/login');
          return;
      }
      dispatch(fetchChannels(key.token));
    }, [])
    return (
        <ChatWindow />
    );
}

export default HomePage;