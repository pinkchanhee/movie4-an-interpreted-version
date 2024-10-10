// Redux Toolkit에서 필요한 함수들을 가져옵니다.
import { configureStore, createSlice } from '@reduxjs/toolkit'; 

// 사용자 slice 생성
const userSlice = createSlice({
  name: 'user', // slice의 이름
  initialState: null, // 초기 상태를 null로 설정
  reducers: {
    login: (state, action) => action.payload, // 로그인 시 사용자 정보를 상태로 설정
    logout: () => null, // 로그아웃 시 상태를 null로 설정
  },
});

// Redux 스토어를 설정합니다.
const store = configureStore({
  reducer: {
    user: userSlice.reducer, // 사용자 slice의 리듀서를 스토어에 등록
  },
});

// 액션 생성자를 내보내어 다른 컴포넌트에서 사용할 수 있게 합니다.
export const { login, logout } = userSlice.actions; 
export default store; // 스토어를 내보냅니다.