import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../API/axios';

export const getAllUsers = createAsyncThunk(
    'users/fetchGetAllUsersStatus',
    async () => {
        const response = await axios.get('/users?limit=200');
        return response.data;
    }
)
export  const getUserById = createAsyncThunk(
    'users/getUserByIdStatus',
    async (userId) => {
        const response = await axios.get(`/users/${userId}`);
        return response.data;
    }
)

export const changeUserName = createAsyncThunk(
    'users/changeUserNameStatus',
    async ({userName, userId}) => {
        const response = await axios.patch(`/users/${userId}`, {name: userName});
        return response.data;
    }
)

export const changeUserAvatar = createAsyncThunk (
    'users/changeUserAvatarStatus',
    async ({data, userId}) => {
        const response = await axios.put(`/users/upload/${userId}`, data);
        return response.data
    }
)

export const deleteUserById = createAsyncThunk (
    'users/deleteUserByIdStatus',
    async ({userId}) => {
        const response = await axios.delete(`/users/${userId}`);
        return response.data;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState:{users: [], curentUser: []},
    reducers: {},
    extraReducers: {
        [getAllUsers.fulfilled]: (state, actions) => {
            state.users = actions.payload;
        },
        [getUserById.fulfilled]: (state, actions) => {
            state.curentUser = actions.payload;
        },
        [changeUserName.fulfilled]: (state, actions) => {
            state.curentUser = actions.payload;
        },
        [changeUserAvatar.fulfilled]: (state, actions) => {
            state.curentUser = actions.payload;
        },
        
    }
})

export default userSlice.reducer;
