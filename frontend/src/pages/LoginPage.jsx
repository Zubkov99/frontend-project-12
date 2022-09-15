import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Form, Button, Alert, Card} from "react-bootstrap";
import AppContext from "../helpers/сontext";
import {useNavigate} from "react-router-dom";


const checkDisabledButton = (data) => {
   const errors = Object.keys(data.errors).length !== 0;
   const values = Object.values(data.values).includes('');
   return errors && values;
}

const logIn = async (username, password, setKey, redirect, setStatus) => {
    try {
        const response = await axios.post('/api/v1/login', { username, password });
        setKey(response.data.token);
        redirect('/', {replace: true});
        setStatus(true)
    } catch (e) {
        setStatus(false)
    }
};
const LoginPage = () => {
    const { setKey } = useContext(AppContext);
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            login:'',
            password: '',
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
        }),
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            const {login, password} = values;
            await logIn(login, password, setKey, navigate, setStatus);
        },
    });
    return (
            <div className='loginContainer w-50 mx-auto'>
                <Card>
                    <Card.Header>Log in to your account</Card.Header>
                    <Card.Body>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="login">
                                <Form.Label>Your login</Form.Label>
                                <Form.Control type="login" placeholder="Enter login"
                                              isValid={formik.touched.login && !formik.errors.login}
                                              isInvalid={!!formik.errors.login || !status}
                                              {...formik.getFieldProps('login')}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.login}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Your password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              isValid={formik.touched.password && !formik.errors.password}
                                              isInvalid={!!formik.errors.password || !status}
                                              {...formik.getFieldProps('password')}>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {!status &&
                                <Alert variant='danger' >
                                    You have entered an incorrect username or password
                                </Alert>
                            }
                            <Button variant="primary" type="submit"
                                    disabled={checkDisabledButton(formik)}
                            >
                                Log in
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
    );
};

export default LoginPage;