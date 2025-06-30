import { EditUserInfo, LoginType, SignupType } from '@/types';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;
const API_URL = `${BACK_URL}/api/user`;

// 회원가입
export const apiPostSignup = async (userData: SignupType) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 로그인
export const apiPostLogin = async (userData: LoginType) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 유저 정보 1개 가져오기
export const apiGetOneUserInfo = async (userId: string | string[] | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/get-one-user-info`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 유저 정보 수정하기
export const apiPatchUpdateUserInfo = async (userData: EditUserInfo) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user-info`, userData);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 유저 회원 탈퇴
export const apiPatchRemoveUser = async (id: string | string[] | undefined) => {
  try {
    const response = await axios.patch(`${API_URL}/remove-user`, { userId: id });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 유저 비밀번호 변경
export const apiPatchUpdatePassword = async (
  id: string | string[] | undefined,
  userLegacyPassword: string,
  userNewPassword: string
) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user-password`, {
      userId: id,
      userLegacyPassword,
      userNewPassword,
    });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 유저 비밀번호 변경
export const apiPatchResetPassword = async (userEmail: string, userPassword: string) => {
  try {
    const response = await axios.patch(`${API_URL}/reset-user-password`, { userEmail, userPassword });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
