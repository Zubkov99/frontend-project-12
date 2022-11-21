import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Button, Form, Modal, InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ApiContext from '../../../../../contexts/ApiContext';
import AppContext from '../../../../../contexts/AppContext';
import checkForErrors from '../../checkForErrors';
import { getActiveModal, setActiveModal } from '../../../../../slices/modalWindows';
import modalWindowKeys from '../../modalWindowKeys';

const AddModalChannelWindow = () => {
  const dispatch = useDispatch();
  // const activeModal = useSelector(getActiveModal);
  // const checkForShow = () => activeModal === modalWindowKeys.addModalChannelWindow;
  const { t } = useTranslation();
  const handleClose = () => dispatch(setActiveModal(null));

  const [channelName, setChannelName] = useState('');
  const [statusError, setError] = useState('');

  const { userData } = useContext(AppContext);

  const { getChannel, sendChannel } = useContext(ApiContext);

  const { channels } = useSelector((state) => state.content);

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    getChannel(dispatch);
  }, [getChannel, dispatch]);

  const sendingChannels = (event) => {
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
    <Modal
      show
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sendingChannels}>
          <InputGroup>
            <Form.Control
              ref={inputRef}
              id="name"
              htmlFor="name"
              aria-describedby="basic-addon2"
              value={channelName}
              onChange={(event) => {
                setChannelName(event.target.value);
                setError('');
              }}
              isInvalid={!!statusError}
              isValid={!statusError && channelName}
              placeholder={t('addChannelModal.placeholder')}
            />
            <label
              htmlFor="name"
              className="visually-hidden"
            >
              {t('renameChannelModal.placeholder')}
            </label>
          </InputGroup>
          {statusError
                        && (
                        <p style={{
                          color: '#CA0A0A',
                          marginTop: '3vh',
                        }}
                        >
                          {statusError}
                        </p>
                        )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          {t('addChannelModal.closeButton')}
        </Button>
        <Button variant="primary" onClick={sendingChannels}>
          {t('addChannelModal.saveButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModalChannelWindow;
