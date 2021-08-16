import React, {useState} from 'react';
import {deletePostById} from '../../store/postSlice';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import UpdatePost from '../../pages/updatePost/UpdatePost';
import './styles.scss';


const UpdateUserPostButtons = ({postId}) => {
    const history = useHistory()
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();

    const deletePost = (postId) => {
       dispatch(deletePostById({postId , history}));
    }

    return (    
        <div>
            <div className="update-post__wrapper">
                <button className="update-post__btn" type="submit" onClick={e => setModalActive(true)}>Update Post</button>
                <button className="update-post__btn" type="submit" onClick={() => deletePost(postId)}>Delete Post</button>
            </div>
            <UpdatePost postId={postId} active={modalActive} setActive={setModalActive}/>
        </div>
    );
}

export default UpdateUserPostButtons;