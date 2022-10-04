import React, {useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import {Row, Col, Container, Button, Card, ListGroup, Form, InputGroup, Alert, Navbar} from "react-bootstrap";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";
import { fetchChannels } from "../slices/channels";
import send from '../send.png'
import SocketContext from "../helpers/SocketContext";
import { sendMessage, setActiveChannel } from "../slices/channels";

const ChatWindow = () => {
    const activeChannel = useSelector(state => state.content.channels.find(({active}) => active));
    return (
        <Card style={{ width: '80%', marginLeft: "auto", marginRight: "auto", minHeight:'80vh', height:'auto', marginTop: '2vh'}}>
            <Card.Body style={{
                paddingRight: '0',
                paddingTop: '0'
            }} >
                <Container>
                    <Row>
                        <Col xs={4} style={{
                            paddingTop: '5vh'
                        }}>
                            <Channels />
                        </Col>
                        <Col style={{
                            paddingRight: '0'
                        }}>
                            <div id='test'
                                 className='shadow-sm'
                                 style={{
                                background: '#FCFCFC',
                                textAlign: 'left',
                                padding: "2vh 1vw"
                            }}>
                                {activeChannel &&
                                <h5>#{activeChannel.name}</h5>
                                }
                            </div>
                            <Messages />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
};

const Messages = () => {

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const messages = useSelector(state => _.uniqBy(state.content.messages, 'id'));
    const { key } = useContext(AppContext);

    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(sendMessage(payload))
        })
    },[socket])

    const [text, setText] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        socket.emit('newMessage', {
            message: text,
            username: key.username,
        }, (response) => {
            if (response.status !== 'ok') throw new Error('Network error');
            setText('');
        });
    }
    return (
 <div id='messages'>
        <div id='messages-box' className="chat-messages overflow-auto" style={{
            paddingTop: '3vh',
            paddingLeft: '1vw',
            textAlign: 'left'
        }}>
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
                <InputGroup className="mb-3" style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '60%',
                }} >
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

const Channels = () => {
    const { channels } = useSelector(state => state.content);
    const dispatch = useDispatch();
    return (
        <>
            <div style={{marginBottom: '5vh'}}>
                <b>Channels</b>
            </div>
            <ListGroup variant="flush">
                {channels.map(({ name, id, active }) => {
                    return <ListGroup.Item action
                                           variant="dark"
                                           active={active}
                                           key={id}
                                           onClick={() => {
                        dispatch(setActiveChannel(id))
                    }
                    }>{name}</ListGroup.Item>
                })}
            </ListGroup>
        </>
    )
};

const HomePage = () => {

    const { key } = useContext(AppContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect( () => {
      if(!key) {
          navigate('/login');
          return;
      }
      dispatch(fetchChannels(key.token));
    }, [])
    return (
        <ChatWindow />
    );
}

export default  HomePage;