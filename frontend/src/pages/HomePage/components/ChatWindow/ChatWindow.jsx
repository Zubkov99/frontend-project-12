import { useSelector } from 'react-redux';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Messages from '../Messages';
import Channels from '../Channels';
import styles from './ChatWindow.module.css';
import { activeChannelSelector } from '../../../../slices/channels';
import { messagesSelector } from '../../../../slices/messages';

const ChatWindow = () => {
  const activeChannel = useSelector(activeChannelSelector);
  const messagesCount = useSelector(messagesSelector).length;
  const { t } = useTranslation();

  return (
    <Card className={styles.cardMain}>
      <Card.Body className={styles.cardBody}>
        <Container>
          <Row>
            <Col xs={4} className={styles.ColChannels}>
              <Channels />
            </Col>
            <Col className={styles.ColMessages}>
              {activeChannel
                                    && (
                                    <div className={`${styles.activeChannel} shadow-sm`}>
                                      <h5>
                                        #
                                        {activeChannel.name}
                                      </h5>
                                      <span>
                                        {messagesCount}
                                        {' '}
                                        {t('chatPage.messagesCount')}
                                      </span>

                                    </div>
                                    )}
              <Messages />
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default ChatWindow;
