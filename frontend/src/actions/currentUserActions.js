// currentUserActions.js
import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    _id: '',
    name: '',
    about: '',
    avatar: '',
    email: '',
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log('setCurrentUser action:', action);
      console.log('Current state:', state);
      console.log('Payload:', action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
