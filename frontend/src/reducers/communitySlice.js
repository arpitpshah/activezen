// src/reducers/communitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const url = 'http://activezen-backend.us-east-1.elasticbeanstalk.com/';
// Helper function to get auth header

const getAuthHeader = (userInfo) => ({
  headers: {
    Authorization: `Bearer ${userInfo.token}`
  }
});

// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk('community/fetchMessages', async (_, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.get(`${url}api/messages`, getAuthHeader(userInfo));
  return response.data;
});

// Async thunk for posting a new message
export const postMessage = createAsyncThunk('community/postMessage', async (messageContent, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.post(`${url}api/messages`, { content: messageContent }, getAuthHeader(userInfo));
  return response.data;
});

// Async thunk for liking a message
export const likeMessage = createAsyncThunk('community/likeMessage', async (messageId, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.put(`${url}api/messages/${messageId}/like`, {}, getAuthHeader(userInfo));
  return response.data;
});

// Async thunk for disliking a message
export const dislikeMessage = createAsyncThunk('community/dislikeMessage', async (messageId, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.put(`${url}api/messages/${messageId}/dislike`, {}, getAuthHeader(userInfo));
  return response.data;
});

// Async thunk for replying to a message
export const replyToMessage = createAsyncThunk('community/replyToMessage', async ({ messageId, content }, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.post(`${url}api/messages/${messageId}/reply`, { content }, getAuthHeader(userInfo));
  return response.data;
});

// Async thunk for deleting a message
export const deleteMessage = createAsyncThunk('community/deleteMessage', async (messageId, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.delete(`${url}api/messages/${messageId}`, getAuthHeader(userInfo));
  return messageId; // Return the messageId to identify which one was deleted
});

// Async thunk for editing a message
export const editMessage = createAsyncThunk('community/editMessage', async ({ messageId, content }, { getState }) => {
  const { userLogin: { userInfo } } = getState();
  const response = await axios.put(`${url}api/messages/${messageId}`, { content }, getAuthHeader(userInfo));
  
  return response.data;
});

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Post Message
      .addCase(postMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Like Message
      .addCase(likeMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likeMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.messages.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(likeMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Dislike Message
      .addCase(dislikeMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(dislikeMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const index = state.messages.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(dislikeMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Reply to Message
      .addCase(replyToMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(replyToMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.messages.findIndex(m => m._id === action.meta.arg.messageId);
        if (index !== -1) {
          // Create a new array for replies to ensure component re-renders
          state.messages[index].replies = [...state.messages[index].replies, action.payload];
        }
      })
      .addCase(replyToMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Message
      .addCase(deleteMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = state.messages.filter(m => m._id !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Edit Message
      .addCase(editMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const index = state.messages.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(editMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      // Ensure that you add rejected cases for all thunks to handle errors.
  },
    
    // Edit Message
    // [editMessage.fulfilled]: (state, action) => {
    //   const index = state.messages.findIndex(m => m._id === action.payload._id);
    //   if (index !== -1) {
    //     state.messages[index] = action.payload;
    //   }
    // },
    
    // Add the rejected cases for each thunk as necessary...
});

export default communitySlice.reducer;
