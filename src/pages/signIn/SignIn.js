import React from 'react';
import SubmitBtn from '../../components/submitBtn/SubmitBtn';
import axios from '../../API/axios';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import './styles.scss';

const SignIn = () => {
    const getUserToken = async (values) => {
        const request = async () => {
            try {
                const response = await axios.post('/auth', {
                    "email": values.email,
                    "password": values.password,
                });
            if (response.status === 200) {
                alert(`You've successfully logged in`)
                localStorage.setItem('token', response.data.token);
                document.location.href = "/";
            }
            } catch(e) {
                alert(e);
            }
        };
        await request();
    }

    return(
        
        <Formik 
            initialValues={{ password: '', email: ''}} 
            validationSchema={ Yup.object({
                password: Yup.string()
                    .max(10, 'Must be 10 characters or less' )
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Requrided'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                getUserToken(values)
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
            }}>
            <Form className="sign-in__form">
                <div className="sign-in__title">Sing In</div>

                <Field 
                    type='text' 
                    className="sign-in__input" 
                    placeholder="Enter Email..."
                    id="email"
                    name="email"
                ></Field>
                <div className="warning"><ErrorMessage className="warning" name="email" /></div>
                
                <Field 
                    type='text' 
                    className="sign-in__input" 
                    placeholder="Enter Password..."
                    id="password"
                    name="password"
                ></Field>
                <div className="warning"><ErrorMessage className="warning" name="password" /></div> 
                <SubmitBtn/>
            </Form>
        </Formik>
    ); 
}

export default SignIn;



