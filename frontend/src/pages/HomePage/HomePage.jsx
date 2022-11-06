import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import { fetchData, addUserName } from '../../slices/channels';
import ChatWindow from './components/ChatWindow';

const HomePage = () => {
  const { key } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!key) {
      navigate('/login');
      return;
    }
    dispatch(addUserName(key.username));
    dispatch(fetchData(key.token));
  }, [dispatch, key, navigate]);
  return (
    <ChatWindow />
  );
};

export default HomePage;
