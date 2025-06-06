import { UserStateType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserStateType = {
  isLoggedIn: false,
  userInfo: {
    userId: 0,
    userName: '',
    userEmail: '',
    userRole: '',
    userMembershipStatus: '',
    userToken: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        userId: Number;
        userName: string;
        userEmail: string;
        userRole: string;
        userMembershipStatus: string;
        userToken: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, logOut } = userSlice.actions;
export default userSlice.reducer;
