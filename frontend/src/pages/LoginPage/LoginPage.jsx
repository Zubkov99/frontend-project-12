/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
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
import routes from '../../api/routes';
import checkDisabledButton from '../HomePage/components/checkDisabledButton';

const LoginPage = () => {
  const { t } = useTranslation();
  const { getLogin } = useContext(AppContext);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const [feedback, showFeedback] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .max(20, 'loginMax')
        .min(3, 'loginMin')
        .required('loginRequired'),
      password: Yup.string()
        .required('passwordRequired'),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      showFeedback(false);
      const { login, password } = values;
      try {
        const response = await axios.post(routes.loginPath(), { username: login, password });
        getLogin(response.data);
        navigate('/', { replace: true });
        setStatus(true);
      } catch (e) {
        if (e.code === 'ERR_BAD_REQUEST') setStatus('ERR_BAD_REQUEST');
        if (e.code === 'ERR_NETWORK') setStatus('ERR_NETWORK');
        toast.error(t(`errorFeedback.${e.code}`));
      }
    },
  });

  useEffect(() => {
    setTimeout(() => showFeedback(true), 4000);
  }, [formik.values.login, formik.values.password]);
  // eslint-disable-next-line consistent-return
  return (
    <div className="loginContainer w-50 mx-auto">
      <Card>
        <Card.Header>{t('loginPage.loginHeader')}</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>{t('loginPage.loginInput')}</Form.Label>
              <Form.Control
                type="login"
                placeholder={t('loginPage.loginPlaceholder')}
                isValid={formik.touched.login && !formik.errors.login}
                isInvalid={(!!formik.errors.login || status) && feedback}
                {...formik.getFieldProps('login')}
              />
              <Form.Control.Feedback type="invalid">
                {t(`validationFeedback.${formik.errors.login}`)}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('loginPage.passwordInput')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('loginPage.passwordPlaceholder')}
                isValid={formik.touched.password && !formik.errors.password}
                isInvalid={(!!formik.errors.password || status) && feedback}
                {...formik.getFieldProps('password')}
              />
              <Form.Control.Feedback type="invalid">
                {t(`validationFeedback.${formik.errors.password}`)}
              </Form.Control.Feedback>
            </Form.Group>
            {!!status
                                && (
                                <Alert variant="danger" onClick={() => setStatus('')}>
                                  {t(`errorFeedback.${status}`)}
                                </Alert>
                                )}
            <Button
              variant="primary"
              type="submit"
              disabled={checkDisabledButton(formik)}
            >
              {t('loginPage.logInButton')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          {t('loginPage.footer')}
&nbsp;
          <Link to="/signup">{t('loginPage.footerLink')}</Link>
        </Card.Footer>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
