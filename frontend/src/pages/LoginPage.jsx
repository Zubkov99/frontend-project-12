import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            login:'',
            password: '',
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(10, 'Must be 5 characters or more')
                .required('Login is required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .min(8, 'Must be 8 characters or more')
                .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Must contain one number and one lowercase')
                .required('Password is required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className='loginContainer'>
            <h1>Log in</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Login</label>
                    <input type="login"
                           className="form-control"
                           id="login"
                           {...formik.getFieldProps('login')}
                    />
                    {formik.touched.login && formik.errors.login ? (
                        <div style={{
                            color:"red"
                        }}>{formik.errors.login}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{
                            color:"red"
                        }}>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>

    );
};

export default LoginPage;