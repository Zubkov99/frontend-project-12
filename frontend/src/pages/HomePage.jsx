import React, {useContext, useEffect, useState} from "react";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels } from "../slices/channels";
import { Row, Col, Container, Button, Card, ListGroup} from "react-bootstrap";

const ChatWindow = () => {
    return (
        <Card style={{ width: '80%', marginLeft: "auto", marginRight: "auto", height:'85vh', marginTop: '2vh'}}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <Channels />
                        </Col>
                        <Col>Здесь будет чат</Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
};

const Channels = () => {
    const { channels } = useSelector(state => state.content);
    return (
        <>
            <div style={{marginBottom: '5vh'}}>
                <b>Channels</b>
            </div>
            <ListGroup variant="flush">
                {channels.map(({ name, id }) => {
                    return <ListGroup.Item action key={id}>{name}</ListGroup.Item>
                })}
            </ListGroup>
        </>

    )
};

const HomePage = () => {
    const { key:token } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect( () => {
      if(!token) {
          navigate('/login');
          return;
      }
      dispatch(fetchChannels(token));
  }, [])
    return (
        <ChatWindow />
    );
}

export default  HomePage;