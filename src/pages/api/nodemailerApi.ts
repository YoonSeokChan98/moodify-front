import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/nodemailer`;

export const sendAuthNumberEmail = async (userEmail: string) => {
  try {
    const response = await axios.post(`${API_URL}/send-auth-number-email`, { userEmail });
    console.log("🚀 ~ sendAuthNumberEmail ~ response:", response)
    return response.data;
  } catch (error) {
    console.error(`에러: ${error}`);
  }
};
