import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Form, Button, Alert, Card} from "react-bootstrap";
import AppContext from "../helpers/сontext";
import {Link, useNavigate} from "react-router-dom";
import routes from "../helpers/routes";
import checkDisabledButton from "../helpers/checkDisabledButton";
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';


const logIn = async (username, password, setKey, redirect, setStatus, t) => {
    try {
        const response = await axios.post(routes.loginPath(), { username, password });
        setKey(response.data);
        redirect('/', {replace: true});
        setStatus(true)
    } catch (e) {
        if(e.code === 'ERR_BAD_REQUEST') setStatus('ERR_BAD_REQUEST')
        if(e.code === 'ERR_NETWORK') setStatus('ERR_NETWORK');
        toast.error(t(`errorFeedback.${e.code}`));
    }
};

const LoginPage = () => {
    const { t } = useTranslation();
    const { setKey } = useContext(AppContext);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login:'',
            password: '',
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .max(20, t('validationFeedback.loginMax'))
                .min(3, t('validationFeedback.loginMin'))
                .required(t('validationFeedback.loginRequired')),
            password: Yup.string()
                .required(t('validationFeedback.passwordRequired')),
        }),
        onSubmit: async (values) => {
            // alert(JSON.stringify(values, null, 2));
            const {login, password} = values;
            await logIn(login, password, setKey, navigate, setStatus, t);
        },
    });
    return (
            <div className='loginContainer w-50 mx-auto'>
                <Card>
                    <Card.Header>{t('loginPage.loginHeader')}</Card.Header>
                    <Card.Body>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="login">
                                <Form.Label>{t('loginPage.loginInput')}</Form.Label>
                                <Form.Control type="login" placeholder={t('loginPage.loginPlaceholder')}
                                              isValid={formik.touched.login && !formik.errors.login}
                                              isInvalid={!!formik.errors.login || status}
                                              {...formik.getFieldProps('login')}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.login}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{t('loginPage.passwordInput')}</Form.Label>
                                <Form.Control type="password" placeholder={t('loginPage.passwordPlaceholder')}
                                              isValid={formik.touched.password && !formik.errors.password}
                                              isInvalid={!!formik.errors.password || status}
                                              {...formik.getFieldProps('password')}>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {!!status &&
                                <Alert variant='danger' onClick={() => setStatus('')}>
                                    {t(`errorFeedback.${status}`)}
                                </Alert>
                            }
                            <Button variant="primary" type="submit"
                                    disabled={checkDisabledButton(formik)}
                            >
                                {t('loginPage.logInButton')}
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        {t('loginPage.footer')}&nbsp;
                        <Link to="/signup">{t('loginPage.footerLink')}</Link>
                    </Card.Footer>
                </Card>
                <ToastContainer />
            </div>
    );
};

export default LoginPage;