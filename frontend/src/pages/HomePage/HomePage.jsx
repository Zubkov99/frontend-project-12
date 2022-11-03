/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../helpers/context';
import { fetchData, addUserName } from '../../slices/channels';
import ChatWindow from './components/ChatWindow';

const HomePage = () => {
  const { key } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(process.env.SOME_VARIABLE)
    if (!key) {
      navigate('/login');
      return;
    }
    dispatch(addUserName(key.username))
    dispatch(fetchData(key.token));
  }, []);
  return (
      <ChatWindow />
  );
};

export default HomePage;
