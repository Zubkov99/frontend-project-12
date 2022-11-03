import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Button, Form, Modal, InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import SocketContext from '../../../../helpers/SocketContext';
import { addChannels } from '../../../../slices/channels';
import AppContext from '../../../../helpers/context';

const censorship = filter.add(filter.getDictionary('ru'));

const errorStatus = {
  notUniqValue: 'The channel name must be a unique value',
  emptyField: 'the channel name should not be empty',
  networkError: 'Network error',
  stopWords: 'Incorrect word',
};

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
  }, [socket]);

  const sendingChannels = (event) => {
    event.preventDefault();

    // TODO:
    // оценить, насколько это норм делать проверку в функции

    const duplicatedChannel = channels.find(({ name }) => name === channelName);

    if (duplicatedChannel) {
      setError(errorStatus.notUniqValue);
      throw new Error(errorStatus.notUniqValue);
    }
    if (!channelName) {
      setError(errorStatus.emptyField);
      throw new Error(errorStatus.emptyField);
    }
    if (censorship.check(channelName)) {
      setError(errorStatus.stopWords);
      throw new Error(errorStatus.stopWords);
    }

    socket.emit('newChannel', {
      name: channelName,
      author: key.username,
    }, (response) => {
      if (response.status !== 'ok') {
        setError(errorStatus.networkError);
        throw new Error(errorStatus.networkError);
      }
      setChannelName('');
    });
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
