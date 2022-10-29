import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppContext from '../helpers/context';
import { fetchChannels } from '../slices/channels';
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
    dispatch(fetchChannels(key.token));
  }, []);
  return (
        <ChatWindow />
  );
};

export default HomePage;
