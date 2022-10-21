import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Form, Button, Alert, Card} from "react-bootstrap";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";
import routes from "../helpers/routes";
import checkDisabledButton from "../helpers/checkDisabledButton";

const signup = async (username, password, setKey, redirect, setStatus) => {
    try {
        const response = await axios.post(routes.signupPath(), { username, password });
        setKey(response.data);
        redirect('/', {replace: true});
        setStatus(true)
    } catch (e) {
        setStatus(false)
    }
};

const SignupPage = () => {
    const { setKey } = useContext(AppContext);
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            login:'',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .max(15, 'Must be 15 characters or less')
                // .min(5, 'Must be 5 characters or more')
                .required('Login is required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                // .min(8, 'Must be 8 characters or more')
                // .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Must contain one number and one lowercase')
                .required('Password is required'),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('You need to confirm the password'),
        }),
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            const {login, password} = values;
            await signup(login, password, setKey, navigate, setStatus);
        },
    });
    return (
        <div className='loginContainer w-50 mx-auto'>
            <Card>
                <Card.Header>Register your account</Card.Header>
                <Card.Body>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="login">
                            <Form.Label>Come up with a name</Form.Label>
                            <Form.Control type="login" placeholder="Enter login"
                                          isValid={!formik.errors.login && !!formik.values.login}
                                          isInvalid={!!formik.errors.login || !status}
                                          {...formik.getFieldProps('login')}/>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.login}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Come up with a password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          isValid={!formik.errors.password && !!formik.values.passwordConfirmation}
                                          isInvalid={!!formik.errors.password}
                                          {...formik.getFieldProps('password')}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                            <Form.Label>Enter your password again</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          isValid={
                                              !formik.errors.password && !!formik.values.passwordConfirmation
                                          }
                                          isInvalid={!!formik.errors.passwordConfirmation}
                                          {...formik.getFieldProps('passwordConfirmation')}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {!status &&
                            <Alert variant='danger' onClick={() => setStatus(true)}>
                                The login is already used by another user
                            </Alert>
                        }
                        <Button variant="primary" type="submit"
                                disabled={checkDisabledButton(formik)}
                        >
                            Sign up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignupPage;