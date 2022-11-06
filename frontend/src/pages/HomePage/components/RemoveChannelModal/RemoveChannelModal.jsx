/* eslint-disable */
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../../../slices/channels';
import SocketContext from '../../../../contexts/SocketContext';

const RemoveChannelModal = (props) => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const deleteChannelHandler = (id) => {
    socket.emit(
      'removeChannel',
      { id },
      (response) => {
        if (response.status !== 'ok') throw new Error('Network error');
      },
    );
    dispatch(deleteChannel({ id }));
    toast.success(t('notificationBlock.channelRemoved'));
  };
  const { show, handleClose, currentId } = props;

  return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{t('removeModalChannel.header')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{t('removeModalChannel.body')}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    {t('removeModalChannel.closeButton')}
                </Button>
                <Button variant="danger" onClick={() => {
                  deleteChannelHandler(currentId);
                  handleClose();
                }}>
                    {t('removeModalChannel.actionButton')}
                </Button>
            </Modal.Footer>
        </Modal>
  );
};

export default RemoveChannelModal;
