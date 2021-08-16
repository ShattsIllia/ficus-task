import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUserById, changeUserName, changeUserAvatar, deleteUserById } from '../../store/userSlice';
import {Formik, Field, Form, ErrorMessage } from 'formik'
import SubmitBtn from '../../components/submitBtn/SubmitBtn';
import * as Yup from 'yup';
import userPhoto from '../../assets/img/userPhoto.jpg';
import { Input } from '@material-ui/core'
import './styles.scss';

const Settings = () => {
    const userId = localStorage.getItem('userId');
    const userData = useSelector(state => state.users.curentUser);
    const dispatch = useDispatch();

    useEffect( () => {
          dispatch(getUserById(userId))}
    ,[dispatch, userId]);

    const changeName = (values) => {
        const  userName = values.name
        dispatch(changeUserName( {userName, userId}))
    }

    const changeAvatar = async (values) => {
        let data = new FormData();
        data.append("avatar", values.avatar);
        dispatch(changeUserAvatar({data, userId}))
    }
    const deleteUser = () => {
        dispatch(deleteUserById({userId}));
        localStorage.clear();
        document.location.href = "/";
    }

    return(
        <div className="settings-wrapper">
            <div className="settings">
                <div className="settings-avatar">{userData.avatar ? <img src={`https://nodejs-test-api-blog.herokuapp.com${userData.avatar}`} alt="userPhoro" /> : <img src={userPhoto} alt="userPhoro"/>}</div>
                <div className="settings-name"><span className="grey-span">Login:</span> {userData.name}</div>
                <div className="settings-email"><span className="grey-span">Email:</span> {userData.email}</div>
            </div> 

            <Formik 
                initialValues={{ name: ''}} 
                validationSchema={ Yup.object({
                    name: Yup.string()
                        .max(25, 'Must be 25 characters or less')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    changeName(values)
                    setTimeout(() => {
                    setSubmitting(false);
                    }, 400);
                }}>
                <Form className="settings-name__form">
                    <Field 
                        type='text' 
                        className="settings-input" 
                        placeholder="Enter New Name..."
                        id="name"
                        name="name"   
                    />
                    <div className="warning"><ErrorMessage  name="name"></ErrorMessage></div>
                    <SubmitBtn/>  
                </Form>     
            </Formik> 

            <Formik
                initialValues={{ avatar: ''}}
                onSubmit={changeAvatar}>
                {(formProps) => (
                    <Form>
                        <div className="settings-avatar__form">
                        <Input
                            disableUnderline={true}
                            color="primary"
                            id="avatar"
                            type="file"
                            name="avatar"
                            onChange={(event) =>{
                                // console.log(' event.target.files[0]', event.target.files[0])
                                formProps.setFieldValue("avatar", event.target.files[0]);
                            }}
                        />
                        <div className="warning"><ErrorMessage  name="name"></ErrorMessage></div>
                            <SubmitBtn/>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="settings-delete-user">
                <button type="submit" className="settings-delete-user__btn" onClick={e => deleteUser()}>Delete User From Blog</button>
            </div>
        </div>
    );
};

export default Settings;
