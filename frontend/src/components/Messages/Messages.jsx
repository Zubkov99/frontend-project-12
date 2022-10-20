import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {Button, Form, InputGroup} from "react-bootstrap";
import AppContext from "../../helpers/сontext";
import {getMessage} from "../../slices/channels";
import SocketContext from "../../helpers/SocketContext";
import send from "../../send.png";
import styles from './Messages.module.css'

const Messages = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const activeChannel = useSelector(state => state.content.channels.find(({active}) => active));
    const messages = useSelector(state => {
        const uniqMessages = _.uniqBy(state.content.messages, 'id');
        return uniqMessages.filter(item => item.channelId === activeChannel.id)
    });

    const { key } = useContext(AppContext);

    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(getMessage(payload))
        })
    },[socket])

    const [text, setText] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        socket.emit('newMessage', {
            message: text,
            username: key.username,
            channelId: activeChannel.id,
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
                            <p>{item.message}</p>
                        </div>
                    )
                })}
            </div>
            <Form onSubmit={submitHandler}>
                <InputGroup className={`${styles.inputGroup} mb-3`}>
                    <Form.Control
                        aria-describedby="basic-addon2"
                        placeholder='enter a message'
                        onChange={(event) => {
                            setText(event.target.value)
                        }}
                        value={text}
                    />
                    <Button variant="outline-secondary">
                        <img src={send} height="17vh" width="17vw"/>
                    </Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default Messages