import {useSelector} from "react-redux";
import {Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import Messages from "../Messages";
import Channels from "../Channels";
import styles from './ChatWindow.module.css';
import {ToastContainer} from "react-toastify";

const ChatWindow = () => {
    const activeChannel = useSelector(state => {
       return state.content.channels.find(item => item.id === state.content.activeChannelId)
    });

    //TODO
    // Костыль для фронтовых тестов, потом убрать
    let activeChannelName;
    if (activeChannel) activeChannelName = `# ${activeChannel.name}`;

    return (
        <Card className={styles.cardMain}>
            <Card.Body className={styles.cardBody}>
                <Container>
                    <Row>
                        <Col xs={4} className={styles.ColChannels}>
                            <Channels />
                        </Col>
                        <Col className={styles.ColMessages}>
                                {activeChannel &&
                                    <div className={`${styles.activeChannel} shadow-sm`}>
                                        {/*<h5># {activeChannel.name}</h5>*/}
                                        <h5>{activeChannelName}</h5>
                                    </div>
                                }
                            <Messages />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            <ToastContainer />
        </Card>
    )
};

export default ChatWindow