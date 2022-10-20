import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ListGroup, Dropdown } from "react-bootstrap";
import styles from './ChannelList.module.css'
import SocketContext from "../../helpers/SocketContext";
import { deleteChannel, setActiveChannel } from "../../slices/channels";

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
    const { channels } = props;
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    const deleteChannelHelper = (id, removable) => {
        if(!removable) return;
        socket.emit('removeChannel', {id})
        dispatch(deleteChannel({id}))
    }

    return (
        <ListGroup variant="flush"
            className={styles.ChannelsContainer}
        >
            {channels.map(({ name, id, active, removable }) => {
                return (
                    <ListGroup.Item action
                                    variant="dark"
                                    active={active}
                                    key={id}
                                    onClick={() => {
                                        dispatch(setActiveChannel(id))
                                    }}
                                    className={styles.ListGroup}>
                        {name}
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteChannelHelper(id, removable)}>Remove</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default ChannelsList