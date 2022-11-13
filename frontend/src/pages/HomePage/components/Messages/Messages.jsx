import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import AppContext from '../../../../contexts/AppContext';
import ApiContext from '../../../../contexts/ApiContext';
import send from '../../../../assets/send.png';
import styles from './Messages.module.css';
import { addMessages } from '../../../../slices/messages';
import { activeChannelIdSelector } from '../../../../slices/channels';
import { messagesSelector } from '../../../../slices/messages';
import sendWsData from '../../../../helpers/sendWsData';

const censorship = filter.add(filter.getDictionary('ru'));

const scrollTo = (ref) => {
  if (ref && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Messages = () => {
  const { getMessages, sendMessages } = useContext(ApiContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const messages = useSelector(messagesSelector);
  const { userData } = useContext(AppContext);
  const inputEl = useRef(null);
  const lastMessage = useRef(null);

  useEffect(() => {
    getMessages(dispatch)
    inputEl.current.focus();
  }, [dispatch, getMessages]);

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
    sendMessages(sendingData)
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
