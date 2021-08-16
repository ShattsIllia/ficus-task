import React, { useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import FullPost from '../fullPost/FullPost';
import {  fetchShortPostsWayPoint, showFullPost } from '../../store/postSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Waypoint } from 'react-waypoint';
import './styles.scss';

const PostWayPoint = () => {
    const [modalActive, setModalActive] = useState(false);
    const {posts , fullPost, isLoading , prevPostLength } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect( () => {
        if(!posts.length)
           {
          dispatch(fetchShortPostsWayPoint(posts.length))}
        }
    ,[posts.length, dispatch]);

    const openPost = (postId) => {   
        dispatch(showFullPost(postId));
        setTimeout(() => {
            setModalActive(true);
        }, 200);
    }

    const onWaypoinEnter = () => {
        if (posts.length === prevPostLength) {
            return;
        }
        dispatch(fetchShortPostsWayPoint(posts.length))
    }
  
    return (
        <div>
            <div className="post">
                {
                    posts.map((post) => {
                        return (  
                            <div className="post" key={post._id}>
                                <div className="post__item" >
                                    <div className="post__title">{post.title}</div> 
                                    <div className="post__description">{post.description}</div>
                                    <button type='submit' className="post__btn" onClick={e => openPost(post._id) }>Learn More</button>
                                </div>
                            </div> 
                        )
                })}
                {isLoading ? <Loader/> : <Waypoint onEnter={onWaypoinEnter} /> } 
            
            </div>
            <FullPost fullPost={fullPost} active={modalActive} setActive={setModalActive} />
         </div>
    )
}

export default PostWayPoint;