import React from 'react';
import axios from '../../API/axios';
import { showFullPost } from '../../store/postSlice';
import {useDispatch} from 'react-redux';
import UpdateUserPostButtons from '../../components/updateUserPostButtons/UpdateUserPostButtons';
import './styles.scss';

const FullPost = ({fullPost , active , setActive}) => {
    const dispatch = useDispatch()
    if(!fullPost) {
        return <div>...loading</div>
    };
   
    const currentUserId = localStorage.getItem('userId');

    const setLike = async (postId) => {
        const request = async () => {
            await axios.put(`/posts/like/${postId}`); 
        }
        await request();
        dispatch(showFullPost(fullPost._id))
    };

    return(
        <div key={fullPost._id} className={active ? "full-post-overlay active" : "full-post-overlay"} onClick={() => setActive(false)}>
            <div className="full-post" onClick={(e) => e.stopPropagation()}>
                <div className="full-post__container">
                    <div className="full-post__title">{fullPost.title}</div>
                    <div className="full-post__text">{fullPost.fullText}</div>
                    <div className="full-post__statistic">
                        <div className="full-post__likes" onClick={e => setLike(fullPost._id)}>&#10084;{fullPost.likes && fullPost.likes.length}</div>
                        <div className="full-post__date">{fullPost.dateCreated && fullPost.dateCreated.slice(0, 10)}</div>
                    </div>
                </div>
                <button 
                type="submit" 
                className="full-post__close-btn" 
                onClick={() => setActive(false)}
                >Close</button>
                {currentUserId === fullPost.postedBy ? <UpdateUserPostButtons postId={fullPost._id}/> : null}
            </div>
        </div>
    ); 
};

export default FullPost;