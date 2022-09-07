import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const checkDisabledButton = (data) => {
   const errors = Object.keys(data.errors).length !== 0;
   const values = Object.values(data.values).includes('');
   return errors && values;
}

const loginUser = () => {
    axios.post('/api/v1/login', { username: 'admin1', password: 'admin1' }).then((response) => {
        console.log(response.data); // => { token: ..., username: 'admin' }
    });
}


const LoginPage = () => {
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
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    loginUser()
    return (
            <div className='loginContainer w-50 mx-auto'>
                <h1>Log in</h1>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="login">
                        <Form.Label>Your login</Form.Label>
                        <Form.Control type="login" placeholder="Enter login"
                                      isValid={formik.touched.login && !formik.errors.login}
                                      isInvalid={!!formik.errors.login}
                                      {...formik.getFieldProps('login')}/>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.login}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Your password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      isValid={formik.touched.password && !formik.errors.password}
                                      isInvalid={!!formik.errors.password}
                                      {...formik.getFieldProps('password')}>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            disabled={checkDisabledButton(formik)}
                    >
                        Log in
                    </Button>
                </Form>
            </div>
    );
};

export default LoginPage;