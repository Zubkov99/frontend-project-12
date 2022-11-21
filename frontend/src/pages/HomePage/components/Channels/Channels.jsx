import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChannelsList from '../ChannelsList';
import { channelsSelector } from '../../../../slices/channels';
import { setActiveModal } from '../../../../slices/modalWindows';
import modalWindowKeys from '../modalWindowKeys';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelector);

  const showAddModal = () => dispatch(setActiveModal(modalWindowKeys.addModalChannelWindow));

  return (
    <>
      <div style={{
        marginBottom: '5vh',
      }}
      >
        <b>{t('chatPage.channelsHeader')}</b>
        <Button
          variant="outline-dark"
          size="sm"
          style={{ marginLeft: '1vw' }}
          onClick={showAddModal}
        >
          {t('chatPage.channelsAddButton')}
        </Button>
      </div>
      <ChannelsList channels={channels} />
    </>
  );
};

export default Channels;
