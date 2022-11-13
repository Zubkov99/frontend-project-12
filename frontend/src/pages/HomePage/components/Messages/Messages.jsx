import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import AppContext from '../../../../contexts/AppContext';
import SocketContext from '../../../../contexts/SocketContext';
import send from '../../../../assets/send.png';
import styles from './Messages.module.css';
import { addMessages } from '../../../../slices/messages';
import { activeChannelIdSelector, messagesSelector } from '../../../../slices/selectors';
import sendWsData from '../../../../helpers/sendWsData';

const censorship = filter.add(filter.getDictionary('ru'));

const scrollTo = (ref) => {
  if (ref && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Messages = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const messages = useSelector(messagesSelector);
  const { userData } = useContext(AppContext);
  const inputEl = useRef(null);
  const lastMessage = useRef(null);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessages(payload));
    });
    inputEl.current.focus();
  }, [socket, dispatch]);

  useEffect(() => {
    scrollTo(lastMessage);
  }, [messages]);

  useEffect(() => {
    inputEl.current.focus();
  }, [activeChannelId]);

  const [text, setText] = useState('');
  const sendingData = {
    message: text,
    username: userData.username,
    channelId: activeChannelId,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!sendingData.message) return;
    sendWsData(socket, sendingData, 'newMessage');
    setText('');
  };

  return (
    <div id="messages">
      <div id="messages-box" className={styles.messagesBox}>
        {messages.map((item, index) => (
          <div key={item.id} ref={messages.length === index + 1 ? lastMessage : null}>
            <b>{item.username}</b>
            :&nbsp;
            {censorship.clean(item.message)}
          </div>
        ))}
      </div>
      <Form onSubmit={submitHandler}>
        <InputGroup className={`${styles.inputGroup} mb-3`}>
          <Form.Control
            aria-describedby="basic-addon2"
            aria-label={t('chatPage.messageAriaLabel')}
            placeholder={t('chatPage.messagePlaceholder')}
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
            ref={inputEl}
          />
          <Button variant="outline-secondary">
            <img src={send} height="17vh" width="17vw" alt={t('chatPage.sendButton')} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Messages;
