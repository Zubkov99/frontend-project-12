/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import ChannelsList from '../ChannelsList';
import AddModalChannelWindow from '../AddModalChannelWindow';

const Channels = () => {
  const { t } = useTranslation();

  const channels = useSelector((state) => _.uniqBy(state.content.channels, 'id'));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
        <>
            <div style={{
              marginBottom: '5vh',
            }}>
                <b>{t('chatPage.channelsHeader')}</b>
                <Button variant="outline-dark"
                        size="sm"
                        style={{ marginLeft: '1vw' }}
                        onClick={handleShow}
                >
                    {t('chatPage.channelsAddButton')}
                </Button>
            </div>
            <ChannelsList channels={channels} />
            <AddModalChannelWindow show={show} handleClose={handleClose}/>
        </>
  );
};

export default Channels;
