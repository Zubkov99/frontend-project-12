import {useDispatch} from "react-redux";
import {ListGroup} from "react-bootstrap";
import {setActiveChannel} from "../../slices/channels";
import React from "react";

const ChannelsList = (props) => {
    const { channels } = props;
    const dispatch = useDispatch();
    return (
        <ListGroup variant="flush">
            {channels.map(({ name, id, active }) => {
                return (
                    <ListGroup.Item action
                                    variant="dark"
                                    active={active}
                                    key={id}
                                    onClick={() => {
                                        dispatch(setActiveChannel(id))
                                    }}>
                        {name}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default ChannelsList