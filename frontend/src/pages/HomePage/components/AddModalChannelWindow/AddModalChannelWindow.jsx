import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Button, Form, Modal, InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../../../../contexts/SocketContext';
import { addChannels } from '../../../../slices/channels';
import AppContext from '../../../../contexts/AppContext';
import sendWsData from '../../../../helpers/sendWsData';
import checkForErrors from '../../../../helpers/checkForErrors';

const AddModalChannelWindow = (props) => {
  const { t } = useTranslation();
  const { show, handleClose } = props;
  const [channelName, setChannelName] = useState('');
  const [statusError, setError] = useState('');

  const { key } = useContext(AppContext);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const { channels } = useSelector((state) => state.content);

  const myRef = useRef();

  useEffect(() => {
    if (myRef && myRef.current) {
      myRef.current.focus();
    }
  });

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(addChannels(payload));
    });
  }, [socket, dispatch]);

  const sendingChannels = (event) => {
    event.preventDefault();
    checkForErrors(channelName, channels, setError, t);

    const sendingData = {
      name: channelName,
      author: key.username,
    };

    sendWsData(socket, sendingData, 'newChannel', setError);
    setError('');
    handleClose();
    toast.success(t('notificationBlock.channelAdded'));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sendingChannels}>
          <InputGroup>
            <Form.Control
              ref={myRef}
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
        <Button variant="secondary" onClick={handleClose}>
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
