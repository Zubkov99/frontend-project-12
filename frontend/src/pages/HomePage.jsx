/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppContext from '../helpers/context';
import { fetchData } from '../slices/channels';
import ChatWindow from '../components/ChatWindow';

const HomePage = () => {
  const { key } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!key) {
      navigate('/login');
      return;
    }
    dispatch(fetchData(key.token));
  }, []);
  return (
      <ChatWindow />
  );
};

export default HomePage;
