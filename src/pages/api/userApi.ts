import { SignupType } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/user`;

// 회원가입
export const postSignup = async (userData: SignupType) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error(`에러: ${error}`);
  }
};
