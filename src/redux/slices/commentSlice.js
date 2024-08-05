import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/comments/${postId}`
    );
    return response.data;
  }
);

// Async thunk to add a comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, text }, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/comments/${postId}`,
      {text},
      config
    );
    return response.data;
  }
);

// Async thunk to delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/comments/${postId}/${commentId}`,
      config
    );
    return { commentId };
  }
);

// Comment slice
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment._id !== action.payload.commentId);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
