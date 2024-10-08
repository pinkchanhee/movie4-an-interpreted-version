import { configureStore, createSlice } from '@reduxjs/toolkit';

// 사용자 slice 생성
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null,
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const { login, logout } = userSlice.actions;
export default store;