import { EmotionDiaryType, EmotionType } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/emotion`;

export const apiPostAddEmotion = async ({ userId, emotions }: EmotionDiaryType) => {
  try {
    const response = await axios.post(`${API_URL}/add-emotion`, { userId, emotions });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

export const apiPostWriteEmotionDiary = async (newEmotionDiary: any) => {
  try {
    const response = await axios.post(`${API_URL}/write-emotion-diary`, newEmotionDiary);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
