import { EmotionType } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/music`;

export const apiPostGenerateMusic = async (emotions: EmotionType) => {
  try {
    const response = await axios.post(`${API_URL}/generate-music`, emotions);
    return response.data;
  } catch (error) {
    console.error(`에러: ${error}`);
  }
};
