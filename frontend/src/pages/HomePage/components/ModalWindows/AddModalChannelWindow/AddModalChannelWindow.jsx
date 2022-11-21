import React, {
  useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ApiContext from '../../../../../contexts/ApiContext';
import AppContext from '../../../../../contexts/AppContext';
import checkForErrors from '../../checkForErrors';
import { setActiveModal } from '../../../../../slices/modalWindows';
import ModalWrapper from '../ModalWrapper';

const AddModalChannelWindow = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => dispatch(setActiveModal(null));

  const [channelName, setChannelName] = useState('');
  const [statusError, setError] = useState('');

  const { userData } = useContext(AppContext);
  const { getChannel, sendChannel } = useContext(ApiContext);
  const { channels } = useSelector((state) => state.content);

  useEffect(() => {
    getChannel(dispatch);
  }, [getChannel, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    checkForErrors(channelName, channels, setError, t);

    const sendingData = {
      name: channelName,
      author: userData.username,
    };

    sendChannel(sendingData, setError);
    setChannelName('');
    setError('');
    handleClose();
    toast.success(t('notificationBlock.channelAdded'));
  };

  return (
    <ModalWrapper props={{
      handleClose,
      channelName,
      setChannelName,
      setError,
      statusError,
      submitHandler,
      textBlock: 'addChannelModal',
    }}
    />
  );
};

export default AddModalChannelWindow;
