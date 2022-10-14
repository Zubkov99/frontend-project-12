import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import ChannelsList from "../ChannelsList";
import ModalChannelWindow from "../ModalChannelWindow";
import _ from "lodash";

const Channels = () => {

    const channels = useSelector(state => {
        return _.uniqBy(state.content.channels, 'id');
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={{
                marginBottom: '5vh',
            }}>
                <b>Channels</b>
                <Button variant="outline-dark"
                        size="sm"
                        style={{marginLeft: "1vw"}}
                        onClick={handleShow}
                >
                    add
                </Button>
            </div>
            <ChannelsList channels={channels} />
            <ModalChannelWindow show={show} handleClose={handleClose}/>
        </>
    )
};

export default Channels;