import {useSelector} from "react-redux";
import {Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import Messages from "../Messages/Messages";
import Channels from "../Channels/Channels";

const ChatWindow = () => {
    const activeChannel = useSelector(state => state.content.channels.find(({active}) => active));
    return (
        <Card style={{ width: '80%', marginLeft: "auto", marginRight: "auto", minHeight:'80vh', height:'80vh', marginTop: '2vh'

        }}>
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
                            paddingRight: '0',
                        }}>
                            <div id='test'
                                 className='shadow-sm'
                                 style={{
                                     background: '#FCFCFC',
                                     textAlign: 'left',
                                     padding: "2vh 1vw"
                                 }}>
                                {activeChannel &&
                                    <h5># {activeChannel.name}</h5>
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

export default ChatWindow