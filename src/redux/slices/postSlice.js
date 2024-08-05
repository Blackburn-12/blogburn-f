import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts`);
    console.log('Fetched posts:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
});

// Async thunk to fetch a post by ID
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/${id}`);
    console.log('Fetched post by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
});

// Async thunk to create a post
export const createPost = createAsyncThunk(
  `${import.meta.env.VITE_BASE_URL}/posts/createPost`,
  async (post, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/posts`,
        post,
        config
      );
      console.log("Created post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
);

// Async thunk to update a post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${post._id}`,
        post,
        config
      );
      console.log("Updated post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
);

// Async thunk to delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${id}`,
        config
      );
      console.log("Deleted post with ID:", id);
      return id;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
);

// Post slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
