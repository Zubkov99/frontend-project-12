import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../../../../slices/channels';
import ApiContext from '../../../../../contexts/ApiContext';
import {
  getExtraData,
  setActiveModal,
  setExtraData,
} from '../../../../../slices/modalWindows';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { deleteChannelGlobal } = useContext(ApiContext);

  const dispatch = useDispatch();
  const currentId = useSelector(getExtraData);

  const deleteChannelHandler = (id) => {
    deleteChannelGlobal({ id });
    dispatch(deleteChannel({ id }));
    toast.success(t('notificationBlock.channelRemoved'));
  };

  const handleClose = () => {
    dispatch(setActiveModal(null));
    dispatch(setExtraData(null));
  };

  return (
    <Modal
      show
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title>{t('removeModalChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{t('removeModalChannel.body')}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('removeModalChannel.closeButton')}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteChannelHandler(currentId);
            handleClose();
          }}
        >
          {t('removeModalChannel.actionButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
