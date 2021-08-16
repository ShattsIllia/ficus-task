import React from 'react';
import SubmitBtn from '../../components/submitBtn/SubmitBtn';
import axios from '../../API/axios'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import './styles.scss';

const CreatePost = () => {
    const createNewPost = async (values) => {
        const request = async () => {
            try {
                const response = await axios.post('/posts', {
                    "title": values.title,
                    "fullText": values.text,
                    "description": values.description
                });
            if (response.status === 200) {
                alert('Post added successfully');
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
            initialValues={{ title: '', text: '', description: ''}} 
            validationSchema={ Yup.object({
                title: Yup.string()
                    .max(25, 'Must be 25 characters or less')
                    .required('Required'),
                text: Yup.string()
                    .min(25, 'Must be more then 25' )
                    .required('Required'),
                description: Yup.string()
                    .max(10, 'Must be less  or equal to 10')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                createNewPost(values)
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
            }}>
            <Form className="create__form">
                <div className="create__title">Create Post</div>
                <div className="create">
                    <Field 
                        type='text' 
                        className="create__input" 
                        placeholder="Enter Title..."
                        id="title"
                        name="title"   
                    ></Field>
                    <div className="warning"><ErrorMessage  name="title"/></div>

                    <Field 
                        type='text' 
                        className="create__input" 
                        placeholder="Enter Text..."
                        id="text"
                        name="text"
                    ></Field>
                    <div className="warning"><ErrorMessage className="warning" name="text"/></div>

                    <Field 
                        type='text' 
                        className="create__input" 
                        placeholder="Enter Description..."
                        id="description"
                        name="description"
                    ></Field>
                    <div className="warning"><ErrorMessage className="warning" name="description"/></div>
                    <SubmitBtn/>
                </div>
            </Form>
        </Formik>

    ); 
}

export default CreatePost;