import React, { useState, useEffect} from 'react';
import Loader from '../../components/loader/Loader';
import FullPost from '../fullPost/FullPost';
import { fetchShortPosts, showFullPost } from '../../store/postSlice';
import {getAllUsers} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import PaginationOutlined from '../../components/paginationOutlined/PaginationOutlined';
import './styles.scss';

const GetShortPosts = () => {
    const [loading, setLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [page, setPage] = useState(1);
    const {posts, fullPost } = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect( () => {
        setTimeout(() => {
            dispatch(fetchShortPosts());
            setLoading(false);
            dispatch(getAllUsers());
        }, 400);
        
        }
    ,[dispatch]);

    const openPost = (postId) => {
        dispatch(showFullPost(postId));
        setTimeout(() => {
            setModalActive(true);
        }, 400);
    }

    const pagesAmount = Math.ceil(posts.length / 10); 
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage; 
  
    const handleChangePagination =(event, value) => {
      setPage(value);
    }
 
    const renderedResults = posts.slice(start, end).map((post) => {
        return (  
            <div className="post" key={post._id}>
                <div className="post__item" >
                    <div className="post__title">{post.title}</div> 
                    <div className="post__description">{post.description}</div>
                    <button type='submit' className="post__btn" onClick={e => openPost(post._id) }>Learn More</button>
                </div>
            </div> 
        );
    });
    

    return (
        <div className="post">
            { loading ? <Loader/> : null}
            {renderedResults}
            { loading ? null : <PaginationOutlined currentPage={page} pagesAmount={pagesAmount} handleChangePagination={handleChangePagination}/>}
            <FullPost fullPost={fullPost} active={modalActive} setActive={setModalActive}/>
        </div>
    )
}

export default GetShortPosts;