import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/nodemailer`;

// 이메일 인증 요청
export const apiSendAuthNumberEmail = async (userEmail: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-auth-number-email`, { userEmail });
    return response.data;
  } catch (error) {
    console.error(`에러: ${error}`);
  }
};
