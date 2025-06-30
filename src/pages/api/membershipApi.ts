import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;
const API_URL = `${BACK_URL}/api/membership`;

// 유저 멤버십 상태 변경
export const apiPostMembership = async (userId: number, membershipName: string, paymentId: number) => {
  try {
    const response = await axios.post(`${API_URL}/add-membership`, { userId, membershipName, paymentId });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 만료된 멤버십 삭제
export const apiDeleteRemoveMembership = async (userId: number | undefined) => {
  try {
    const response = await axios.delete(`${API_URL}/remove-membership`, { params: { userId } });
    console.log('🚀 ~ apiDeleteRemoveMembership ~ response:', response);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
