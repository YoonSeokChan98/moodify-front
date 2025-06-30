import { EmotionDiaryType } from '@/types';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;
const API_URL = `${BACK_URL}/api/emotion`;

// export const apiPostAddEmotion = async ({ userId, emotions }: EmotionDiaryType) => {
//   try {
//     const response = await axios.post(`${API_URL}/add-emotion`, { userId, emotions });
//     return response.data;
//   } catch (error) {
//     console.error(`API 에러: ${error}`);
//   }
// };

export const apiPostWriteEmotionDiary = async (newEmotionDiary: EmotionDiaryType) => {
  try {
    const response = await axios.post(`${API_URL}/write-emotion-diary`, newEmotionDiary);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 마이페이지 사용자 감정들 가져오기
export const apiGetAllUserEmotion = async (userId: number | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/get-all-user-emotion`, { params: { userId } });
    // console.log('🚀 ~ apiGetAllUserEmotion ~ response:', response);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
