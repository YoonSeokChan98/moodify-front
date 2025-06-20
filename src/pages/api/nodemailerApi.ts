import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/nodemailer`;

// 회원가입 이메일 인증 요청
export const apiSendAuthNumberEmail = async (userEmail: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-auth-number-email`, { userEmail });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 비밀번호 변경 이메일 인증
export const apiSendAuthNumberPasswordReset = async (userEmail: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-auth-number-password-reset`, { userEmail });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
