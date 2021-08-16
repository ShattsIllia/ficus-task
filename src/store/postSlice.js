import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../API/axios'

export const fetchShortPosts = createAsyncThunk(
    'posts/fetchShortPostsStatus', 
    async () => {
        const response = await axios.get('/posts?limit=200');
        return response.data
    }
)
export const fetchShortPostsWayPoint = createAsyncThunk(
    'posts/fetchShortPostsStatus', 
    async (skipCount) => {
        const response = await axios.get(`/posts?skip=${skipCount}`);
        return response.data
    }
)

export const showFullPost =  createAsyncThunk(
    'posts/showFullPostStatus',
    async (postId) => {
        const response = await axios.get(`/posts/${postId}`);
        return response.data ;
    }
)

export const deletePostById = createAsyncThunk(
    'posts/deltePostByIdStatus',
    async ({postId , history}) => {
        await axios.delete(`/posts/${postId}`)
        // await history.push('/');
        document.location.href = "/";
        return postId;
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState:{ posts: [], fullPost: {} , isLoading: false , prevPostLength: 0},
    reducers: {},
    extraReducers: {
        [fetchShortPosts.pending]: (state) => {
            state.isLoading = true
        },
        [fetchShortPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
            state.isLoading = false
        },
        [showFullPost.fulfilled]: (state, action) => {
            state.fullPost = action.payload  
        },
        [fetchShortPostsWayPoint.pending]: (state) => {
            state.isLoading = true
        },
        [fetchShortPostsWayPoint.fulfilled]: (state, action) => {
            state.isLoading = false
            
            state.prevPostLength = state.posts.length
            state.posts = [...state.posts, ...action.payload  ]
        },
        [fetchShortPostsWayPoint.rejected]: (state) => {
            state.isLoading = false
        },
        [deletePostById.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(elem => elem._id !== action.payload)
        }
    },
})

export default postSlice.reducer;
