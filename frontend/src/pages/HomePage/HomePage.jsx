import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import { fetchData, addUserName } from '../../slices/channels';
import ChatWindow from './components/ChatWindow';

const HomePage = () => {
  const { userData } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addUserName(userData.username));
    dispatch(fetchData(userData.token));
  }, [dispatch, userData, navigate]);
  return (
    <ChatWindow />
  );
};

export default HomePage;
