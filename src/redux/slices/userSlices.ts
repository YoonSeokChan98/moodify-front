import { MembershipInfo, NewMembership, UserStateType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserStateType = {
  isLoggedIn: false,
  userInfo: {
    userId: 0,
    userName: '',
    userEmail: '',
    userRole: '',
    userMembershipStatus: null as NewMembership | null,
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
        userId: number;
        userName: string;
        userEmail: string;
        userRole: string;
        userMembershipStatus: MembershipInfo | null;
        userToken: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {
        userId: 0,
        userName: '',
        userEmail: '',
        userRole: '',
        userMembershipStatus: null,
        userToken: '',
      };
    },
  },
});

export const { loginSuccess, logOut } = userSlice.actions;
export default userSlice.reducer;
