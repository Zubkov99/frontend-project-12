import React, {
  useContext, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { renameLocalChannel, channelsSelector } from '../../../../../slices/channels';
import ApiContext from '../../../../../contexts/ApiContext';
import checkForErrors from '../../checkForErrors';
import {
  setExtraData,
  getExtraData,
  setActiveModal,
} from '../../../../../slices/modalWindows';
import ModalWrapper from '../ModalWrapper';

const EditModalWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentId = useSelector(getExtraData);

  const handleClose = () => {
    dispatch(setActiveModal(null));
    dispatch(setExtraData(null));
  };
  const [channelName, setChannelName] = useState('');
  const [statusError, setError] = useState('');

  const channels = useSelector(channelsSelector);

  const { renameChannelGlobal } = useContext(ApiContext);

  const sendingData = {
    id: currentId,
    name: channelName,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkForErrors(channelName, channels, setError, t);
    renameChannelGlobal(sendingData, setError);

    dispatch(renameLocalChannel(sendingData));
    setChannelName('');
    setError('');
    handleClose();
    toast.success(t('notificationBlock.channelRenamed'));
  };

  return (
    <ModalWrapper props={{
      handleClose,
      channelName,
      setChannelName,
      setError,
      statusError,
      submitHandler,
      textBlock: 'renameChannelModal',
    }}
    />
  );
};

export default EditModalWindow;
