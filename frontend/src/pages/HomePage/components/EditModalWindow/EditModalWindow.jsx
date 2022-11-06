import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { renameLocalChannel } from '../../../../slices/channels';
import SocketContext from '../../../../contexts/SocketContext';
import { channelsSelector } from '../../../../slices/selectors';
import sendWsData from '../../../../helpers/sendWsData';
import checkForErrors from '../../../../helpers/checkForErrors';

const EditModalWindow = (props) => {
  const { t } = useTranslation();

  const myRef = useRef();

  useEffect(() => {
    if (myRef && myRef.current) {
      myRef.current.focus();
    }
  });

  const { show, handleClose, currentId } = props;
  const [channelName, setChannelName] = useState('');
  const [statusError, setError] = useState('');

  const channels = useSelector(channelsSelector);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const sendingData = {
    id: currentId,
    name: channelName,
  };

  const editChannelHandler = (event) => {
    event.preventDefault();

    checkForErrors(channelName, channels, setError, t);

    sendWsData(socket, sendingData, 'renameChannel', setError);
    dispatch(renameLocalChannel(sendingData));
    setChannelName('');
    setError('');
    handleClose();
    toast.success(t('notificationBlock.channelRenamed'));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={editChannelHandler}>
          <label htmlFor="name" className="visually-hidden">{t('renameChannelModal.placeholder')}</label>
          <Form.Control
            ref={myRef}
            id="name"
            htmlFor="name"
            placeholder={t('renameChannelModal.placeholder')}
            value={channelName}
            onChange={(event) => {
              setChannelName(event.target.value);
              setError('');
            }}
            isInvalid={!!statusError}
            isValid={!statusError && channelName}
          />
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
          {t('renameChannelModal.closeButton')}
        </Button>
        <Button variant="primary" onClick={editChannelHandler}>
          {t('renameChannelModal.saveButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalWindow;