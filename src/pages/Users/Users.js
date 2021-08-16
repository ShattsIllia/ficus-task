import React, {useEffect} from 'react';
import {getAllUsers} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users);
    const renderedResults = users.map(user => {
        return (
            <div className="user" key={user._id}>
                <div className="user-name">NAME: {user.name}</div>
                <div className="user-email">EMAIL: {user.email}</div>
                <div className="user-id">ID: {user._id}</div>
            </div>
        );
    })

    useEffect(  () => {
         dispatch(getAllUsers())
     }
    ,[dispatch]);

    return(
        <div>
           {renderedResults}
        </div>
    );
}

export default Users;