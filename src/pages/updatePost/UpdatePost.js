import React from 'react';
import SubmitBtn from '../../components/submitBtn/SubmitBtn';
import axios from '../../API/axios';
import {useSelector} from 'react-redux';
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import './styles.scss';

const UpdatePost = ({postId, active , setActive}) => {
    const fullPost = useSelector(state => state.posts.fullPost)
    const updatePost = async (values) => {
        const request = async () => {
            try {
                const response = await axios.patch(`/posts/${postId}`, {
                    "title": values.title,
                    "fullText": values.text,
                    "description": values.description
                });
            if (response.status === 200) {
                alert('Post updated successfully');
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
            initialValues={{ title: fullPost.title, text: fullPost.fullText, description: fullPost.description}}
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
                updatePost(values)
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
            }}>
            <div className={active ? "update-overlay active" : "update-overlay"} onClick={() => setActive(false)}>
                <Form className="update__form" onClick={(e) => e.stopPropagation()}>
                    <div className="update__title">Update Post</div>
                    <div className="update">
                        <Field
                            type='text' 
                            className="update__input" 
                            id="title"
                            name="title"
                        ></Field>
                        <div className="warning"><ErrorMessage  name="title"/></div>

                        <Field 
                            type='text' 
                            className="update__input" 
                            id="text"
                            name="text"
                        ></Field>
                        <div className="warning"><ErrorMessage className="warning" name="text"/></div>

                        <Field 
                            type='text' 
                            className="update__input" 
                            id="description"
                            name="description"
                        ></Field>
                        <div className="warning"><ErrorMessage className="warning" name="description"/></div>
                        <SubmitBtn />
                        <button 
                            type="submit" 
                            className="update__close-btn" 
                            onClick={() => setActive(false)}
                            >Close
                        </button>
                    </div>
                </Form>
            </div>
        </Formik>
    ); 
}


export default UpdatePost;