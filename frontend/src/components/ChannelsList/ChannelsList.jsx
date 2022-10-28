import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ListGroup, Dropdown } from "react-bootstrap";
import styles from './ChannelList.module.css'
import SocketContext from "../../helpers/SocketContext";
import { deleteChannel, setActiveChannel } from "../../slices/channels";
import ModalWindowEdit from "../ModalWindowEdit";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{
            color: '#FFFFFF',
            textDecoration: "none"
        }}
    >
        {children}
        &#x25bc;
    </a>
));


const ChannelsList = (props) => {
    const { t } = useTranslation();
    const { channels } = props;
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const activeChannel = useSelector(state => state.content.channels.find(item => item.id === state.content.activeChannelId) || {id: null});

    const deleteChannelHandler = (id, removable) => {
        if(!removable) return;
        socket.emit('removeChannel',
            {id},
            (response) => {
                if (response.status !== 'ok') throw new Error('Network error');
            })
        dispatch(deleteChannel({id}))
    }

    const [show, setShow] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ListGroup variant="flush"
                       className={styles.ChannelsContainer}
            >
                {channels.map(({ name, id, removable }) => {
                    const newName = `# ${name}`;
                    return (
                        <ListGroup.Item action
                                        variant="dark"
                                        active={activeChannel.id === id}
                                        key={id}
                                        onClick={() => dispatch(setActiveChannel(id)) }
                                        className={styles.ListGroup}>
                            <span>{newName}</span>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        setCurrentId(id)
                                        handleShow()
                                    }}>
                                        {t('chatPage.editChannelButton')}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        deleteChannelHandler(id, removable)
                                        toast(t('notificationBlock.channelRemoved'));
                                    }}>
                                        {t('chatPage.removeChannelButton')}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <ModalWindowEdit show={show} handleClose={handleClose} currentId={currentId}/>
        </>
    )
}

export default ChannelsList