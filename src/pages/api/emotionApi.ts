import { EmotionDiaryType, EmotionType } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/emotion`;

// export const apiPostAddEmotion = async ({ userId, emotions }: EmotionDiaryType) => {
//   try {
//     const response = await axios.post(`${API_URL}/add-emotion`, { userId, emotions });
//     return response.data;
//   } catch (error) {
//     console.error(`API 에러: ${error}`);
//   }
// };

export const apiPostWriteEmotionDiary = async (newEmotionDiary: any) => {
  try {
    const response = await axios.post(`${API_URL}/write-emotion-diary`, newEmotionDiary);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 마이페이지 사용자 감정들 가져오기
export const apiGetAllUserEmotion = async (userId: Number | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/get-all-user-emotion`, { params: { userId } });
    // console.log('🚀 ~ apiGetAllUserEmotion ~ response:', response);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
