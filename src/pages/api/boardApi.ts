import { UserType } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/board`;

// 이미지 업로드 api
export const apiPostUploadImageFile = async (formData: any) => {
  try {
    console.log('test');

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

// 전체 게시글 가져오는 api
export const apiGetAllBoard = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-board`);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 전체 게시글 가져오는 api
export const apiGetAllUserBoard = async (userId: Number) => {
  try {
    const response = await axios.get(`${API_URL}/get-all-user-board`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 게시글 1개 가져오는 api / 게시글 상세페이지
export const apiGetOneBoard = async (id: string | string[]) => {
  try {
    const response = await axios.get(`${API_URL}/get-one-board`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 게시글 수정
export const apiPatchUpdateBoard = async (updateBoardData: any) => {
  try {
    const response = await axios.patch(`${API_URL}/update-board`, updateBoardData);
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 게시글 삭제
export const apiPatchRemoveBoard = async (id: string | string[] | undefined) => {
  try {
    const response = await axios.patch(`${API_URL}/remove-board`, { id });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};

// 좋아요 버튼 클릭
export const apiLikedBoardPlus = async (idData: { boardId: Number; userId: Number }) => {
  try {
    const response = await axios.post(`${API_URL}/liked-board-plus`, { idData });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
