import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {Button, Form, InputGroup} from "react-bootstrap";
import AppContext from "../../helpers/сontext";
import {getMessage} from "../../slices/channels";
import SocketContext from "../../helpers/SocketContext";
import send from "../../send.png";
import styles from './Messages.module.css'
import {useTranslation} from "react-i18next";
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';

const censorship = filter.add(filter.getDictionary('ru'));

const Messages = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const activeChannelId = useSelector(state => state.content.activeChannelId);
    const messages = useSelector(state => {
        const uniqMessages = _.uniqBy(state.content.messages, 'id');
        return uniqMessages.filter(item => item.channelId === activeChannelId)
    });

    const { key } = useContext(AppContext);
    const inputEl = useRef(null);

    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(getMessage(payload))
        })
        inputEl.current.focus();
    },[])

    useEffect(() => {
        inputEl.current.focus();
    }, [activeChannelId])

    const [text, setText] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        socket.emit('newMessage', {
            message: text,
            username: key.username,
            channelId: activeChannelId,
        }, (response) => {
            if (response.status !== 'ok') throw new Error('Network error');
            setText('');
        });
    }

    return (
        <div id='messages'>
            <div id='messages-box' className={styles.messagesBox}>
                {messages.map((item) => {
                    return (
                        <div key={item.id}>
                            <b>{item.username}</b>

                            <p>{censorship.clean(item.message)}</p>
                        </div>
                    )
                })}
            </div>
            <Form onSubmit={submitHandler}>
                <InputGroup className={`${styles.inputGroup} mb-3`}>
                    <Form.Control
                        aria-describedby="basic-addon2"
                        placeholder={t('chatPage.messagePlaceholder')}
                        onChange={(event) => {
                            setText(event.target.value)
                        }}
                        value={text}
                        ref={inputEl}
                    />
                    <Button variant="outline-secondary">
                        <img src={send} height="17vh" width="17vw"/>
                    </Button>
                </InputGroup>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Messages