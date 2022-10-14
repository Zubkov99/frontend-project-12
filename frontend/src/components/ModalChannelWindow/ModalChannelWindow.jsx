import React, { useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import SocketContext from "../../helpers/SocketContext";
import { getChannels } from "../../slices/channels";


const ModalChannelWindow = (props) => {
    const {show, handleClose} = props;
    const [channelName, setChannelName] = useState('');
    const [statusError, setError] = useState('');

    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const { channels }  = useSelector(state => state.content);

    const errorStatus = {
        notUniqValue: 'The channel name must be a unique value',
        emptyField: 'the channel name should not be empty'
    }

    //TODO:
    // фильтровать каналы с помощью мидлвар редакса либо разобраться как читать стор в редьюсерах

    useEffect(() => {
        socket.on('newChannel', (payload) =>{
            dispatch(getChannels(payload))
        })
    },[socket])

    const sendingСhannels = (event) => {
        event.preventDefault();
        
        //TODO:
        // оценить, насколько это норм делать проверку в функции

        const duplicatedChannel = channels.find(({name}) => name === channelName);

        if(duplicatedChannel) {
            setError(errorStatus.notUniqValue)
            throw new Error(errorStatus.notUniqValue);
        }
        if(!channelName) {
            setError(errorStatus.emptyField)
            throw new Error(errorStatus.emptyField);
        }
        socket.emit('newChannel', {
            name: channelName
        }, (response) => {
            if (response.status !== 'ok') throw new Error('Network error');
            setChannelName('')
        });
        setError('')
        handleClose();
    };

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new channel, bro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendingСhannels}>
                        <Form.Control
                            aria-describedby="basic-addon2"
                            value={channelName}
                            onChange={(event) => {
                                setChannelName(event.target.value)
                                setError('')
                            }}
                            isInvalid={!!statusError}
                            isValid={!statusError && channelName}
                        />
                        {statusError &&
                            <p style={{
                                color: "#CA0A0A",
                                marginTop: "3vh"
                            }} >
                                {statusError}
                            </p>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendingСhannels}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default ModalChannelWindow