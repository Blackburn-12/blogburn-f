import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    comments: commentReducer,
  },
});

export default store;
