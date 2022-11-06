import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Form, Button, Alert, Card,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import AppContext from '../../contexts/AppContext';
import routes from '../../helpers/routes';

const signup = async (username, password, setKey, redirect, setStatus, t) => {
  try {
    const response = await axios.post(routes.signupPath(), { username, password });
    setKey(response.data);
    redirect('/', { replace: true });
    setStatus('');
  } catch (e) {
    toast.error(t(`signupPage.${e.code}`));
    if (e.code === 'ERR_BAD_REQUEST') setStatus('ERR_BAD_REQUEST');
    if (e.code === 'ERR_NETWORK') setStatus('ERR_NETWORK');
  }
};

const SignupPage = () => {
  const { setKey, key } = useContext(AppContext);
  const { t } = useTranslation();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(20, t('validationFeedback.loginMax'))
        .min(3, t('validationFeedback.loginMin'))
        .required(t('validationFeedback.loginRequired')),
      password: Yup.string()
        .max(20, t('validationFeedback.passwordMax'))
        .min(6, t('validationFeedback.passwordMin'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('validationFeedback.passwordSpecialCharacters'))
        .required(t('validationFeedback.passwordRequired')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], t('validationFeedback.passwordConfirmationMatch'))
        .required(t('validationFeedback.passwordConfirmationRequired')),
    }),
    onSubmit: async (values) => {
      const { login, password } = values;
      await signup(login, password, setKey, navigate, setStatus, t);
    },
  });
  if (key) {
    navigate('/');
    return;
  }
  return (
    <div className="loginContainer w-50 mx-auto">
      <Card>
        <Card.Header>{t('signupPage.header')}</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>{t('signupPage.loginLabel')}</Form.Label>
              <Form.Control
                type="login"
                placeholder={t('loginPage.loginPlaceholder')}
                isValid={!formik.errors.login && !!formik.values.login}
                isInvalid={!!formik.errors.login || !!status}
                {...formik.getFieldProps('login')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.login}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('signupPage.passwordLabel')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('loginPage.passwordPlaceholder')}
                isValid={!formik.errors.password && !!formik.values.passwordConfirmation}
                isInvalid={!!formik.errors.password}
                {...formik.getFieldProps('password')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
              <Form.Label>
                {t('signupPage.confirmPassword')}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t('loginPage.passwordPlaceholder')}
                isValid={
                                !formik.errors.password && !!formik.values.passwordConfirmation
                                          }
                isInvalid={!!formik.errors.passwordConfirmation}
                {...formik.getFieldProps('passwordConfirmation')}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            {!!status
                            && (
                            <Alert variant="danger" onClick={() => setStatus('')}>
                              {t(`signupPage.${status}`)}
                            </Alert>
                            )}
            <Button
              variant="primary"
              type="submit"
            >
              {t('signupPage.signupButton')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          {t('signupPage.footer')}
          &nbsp;
          <Link to="/login">{t('signupPage.goToLoginPage')}</Link>
        </Card.Footer>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default SignupPage;