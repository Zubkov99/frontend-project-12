import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SocketContext from "../../helpers/SocketContext";
import {renameLocalChannel} from "../../slices/channels";
import {Button, Form, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import { toast } from "react-toastify";
import filter from 'leo-profanity';

const censorship = filter.add(filter.getDictionary('ru'));


const ModalWindowEdit = (props) => {

    const errorStatus = {
        notUniqValue: 'The channel name must be a unique value',
        emptyField: 'the channel name should not be empty',
        networkError: 'Network error',
        stopWords: 'Incorrect word',
    };

    const { t } = useTranslation();

    const { show, handleClose, currentId } = props;
    const [channelName, setChannelName] = useState('');
    const [statusError, setError] = useState('');
    const { channels }  = useSelector(state => state.content);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    const editChannelHandler = (event) => {
        event.preventDefault();
        const duplicatedChannel = channels.find(({name}) => name === channelName);

        if(duplicatedChannel) {
            setError(errorStatus.notUniqValue)
            throw new Error(errorStatus.notUniqValue);
        }
        if(!channelName) {
            setError(errorStatus.emptyField)
            throw new Error(errorStatus.emptyField);
        }
        if(censorship.check(channelName)) {
            setError(errorStatus.stopWords)
            throw new Error(errorStatus.stopWords);
        }

        socket.emit('renameChannel', {
            id: currentId,
            name: channelName
        },(response) => {
            if (response.status !== 'ok') {
                setError(errorStatus.networkError)
                throw new Error(errorStatus.networkError);
            }
            dispatch(renameLocalChannel({
                id: currentId,
                name: channelName
            }))
            setChannelName('');
            setError('');
            handleClose()
        })
        toast(t('notificationBlock.channelRenamed'));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{t('renameChannelModal.header')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editChannelHandler}>
                    <Form.Control
                        aria-describedby="basic-addon2"
                        placeholder={t('renameChannelModal.placeholder')}
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
                    {t('renameChannelModal.closeButton')}
                </Button>
                <Button variant="primary" onClick={editChannelHandler}>
                    {t('renameChannelModal.saveButton')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindowEdit