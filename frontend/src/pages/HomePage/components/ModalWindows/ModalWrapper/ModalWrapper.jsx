import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalWrapper = ({ props }) => {
  const {
    handleClose, channelName, setChannelName, setError, statusError, submitHandler, textBlock,
  } = props;
  const { t } = useTranslation();

  const formRef = useRef();

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.focus();
    }
  });

  return (
    (
      <Modal
        show
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t(`${textBlock}.header`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <label htmlFor="name" className="visually-hidden">{t(`${textBlock}.placeholder`)}</label>
            <Form.Control
              ref={formRef}
              id="name"
              htmlFor="name"
              placeholder={t(`${textBlock}.placeholder`)}
              value={channelName}
              onChange={(event) => {
                setChannelName(event.target.value);
                setError('');
              }}
              isInvalid={!!statusError}
              isValid={!statusError && channelName}
            />
            {statusError
              && (
                <p style={{
                  color: '#CA0A0A',
                  marginTop: '3vh',
                }}
                >
                  {statusError}
                </p>
              )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t(`${textBlock}.closeButton`)}
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            {t(`${textBlock}.saveButton`)}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default ModalWrapper;
