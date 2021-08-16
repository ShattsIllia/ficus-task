import React from "react";
import SubmitBtn from '../../components/submitBtn/SubmitBtn';
import axios from "../../API/axios"
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import './styles.scss';

const SignUp = () => {
    const createNewUser = async (values) => {
        const request = async () => {
            try {
                const response = await axios.post('/users', {
                    "email": values.email,
                    "password": values.password,
                    "name": values.login
                });
            if (response.status === 200) {
                alert('account successful created');
                localStorage.setItem('userId', response.data._id);
                document.location.href = "/signin";
            }
            } catch(e) {
                alert(e);
            }
        };
    await request();
    }

    return(
        <Formik 
            initialValues={{ login: '', password: '', email: ''}} 
            validationSchema={ Yup.object({
                login: Yup.string()
                    .max(25, 'Must be 25 characters or less')
                    .required('Required'),
                password: Yup.string()
                    .max(10, 'Must be 10 characters or less' )
                    .min(5, 'Must be 5 characters or more')
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Requrided'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                createNewUser(values)
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
            }}>
            <Form className="sign-up__form">
                <div className="sign-up__title">Sing Up</div>
                <div className="sign-up">
                    <Field 
                        type='text' 
                        className="sign-up__input" 
                        placeholder="Enter Login..."
                        id="login"
                        name="login"   
                    ></Field>
                    <div className="warning"><ErrorMessage  name="login"/></div>

                    <Field 
                        type='text' 
                        className="sign-up__input" 
                        placeholder="Enter Password..."
                        id="password"
                        name="password"
                    ></Field>
                    <div className="warning"><ErrorMessage className="warning" name="password"/></div>

                    <Field 
                        type='text' 
                        className="sign-up__input" 
                        placeholder="Enter Email..."
                        id="email"
                        name="email"
                    ></Field>
                    <div className="warning"><ErrorMessage className="warning" name="email"/></div>
                    <SubmitBtn/>
                </div>
            </Form>
        </Formik>
    ); 
}

export default SignUp;