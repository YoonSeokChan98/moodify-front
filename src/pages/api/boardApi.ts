import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/board`;

// 이미지 업로드 api
export const apiPostUploadImageFile = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/upload-image-folder`, formData);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 글 작성 api
export const apiPostWriteBoard = async (newEmotionDiary: any) => {
  try {
    const response = await axios.post(`${API_URL}/write-board`, newEmotionDiary);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
