/* eslint-disable @typescript-eslint/no-explicit-any */
// 회원가입 / 로그인 검증
export interface ValidateType {
  userEmail?: string;
  userPasswordConfirm?: string;
  userNewPasswordConfirm?: string;
}

// 회원가입
export interface SignupType {
  userName: string;
  userEmail: string;
  userPassword: string;
}

// 로그인
export interface LoginType {
  userEmail: string;
  userPassword: string;
}

// 회원정보 redux
export interface UserStateType {
  isLoggedIn: boolean;
  userInfo: {
    userId: number;
    userName: string;
    userEmail: string;
    userRole: string;
    userMembershipStatus: MembershipInfo | null;
    userToken: string;
  } | null;
}
export interface MembershipInfo {
  id: string | null;
  membershipName: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
  userId: string | null;
  paymentId: string | null;
}

export interface NewMembership {
  id: string | null;
  membershipName: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null;
  userId: string | null;
  paymentId: string | null;
}

// user
export interface UserType {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
  userToken: string;
  userMembershipStatus: any;
  // {
  //   id: number;
  //   membershipName: string;
  //   startDate: string;
  //   endDate: string;
  //   status: string;
  //   userId: string;
  //   paymentId: string;
  // };
}

// 이미지 url
export interface ImageType {
  imageSrc: string | null;
}

// 감정
export interface EmotionType {
  emotions: {
    angry?: number | undefined;
    disgusted?: number | undefined;
    fearful?: number | undefined;
    happy?: number | undefined;
    neutral?: number | undefined;
    sad?: number | undefined;
    surprised?: number | undefined;
  } | null;
}

// 감정일기
export interface EmotionDiaryType {
  emotions: {
    angry?: number;
    disgusted?: number;
    fearful?: number;
    happy?: number;
    neutral?: number;
    sad?: number;
    surprised?: number;
  } | null;
  userId: number | null | undefined;
}

export interface getReduxEmotionType {
  getReduxEmotion: string | number;
}

// 감정데이터
export interface EmotionData {
  id: number;
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  createdAt: string;
}

// 유저 정보 수정
export interface EditUserInfo {
  userId: number | undefined;
  userName: string;
  userEmail: string;
}

// 게시글 데이터
export interface BoardData {
  id: number;
  question: string;
  title: string;
  content: string;
  liked: number;
  liked_boards: [];
  removeStatus: boolean;
  createdAt: string;
  emotion: {
    neutral: number;
    happy: number;
    sad: number;
    angry: number;
    fearful: number;
    disgusted: number;
    surprised: number;
    createdAt: string;
  };
  user: any;
}

// 결제 타입
export interface PaymentTypes {
  userId: number | undefined;
  paymentKey: string;
  orderId: string;
  amount: number;
}

// Emotion 타입 정의
export interface Emotion {
  angry: number;
  disgusted: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
  createdAt: string;
}

// User 타입 정의
interface User {
  createdAt: string;
  id: number;
  updatedAt: string;
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: string;
  userStatus: string;
}

// Board 타입 정의
export interface Board {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  emotion: Emotion;
  boardId: number;
  userId: number;
  question: string;
  visibilityStatus: string;
  removeStatus: boolean;
  liked_boards: any[]; // 좋아요 목록 (배열로 처리)
  user: User; // User 정보 포함
}

export interface Liked_boardsType {
  id: number; // 고유 ID
  userId: number; // 좋아요를 누른 사용자 ID
  boardId: number; // 좋아요가 눌린 게시글 ID
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
}

interface NewEmotion {
  angry?: number | undefined;
  disgusted?: number | undefined;
  fearful?: number | undefined;
  happy?: number | undefined;
  neutral?: number | undefined;
  sad?: number | undefined;
  surprised?: number | undefined;
}

export interface NewEmotionDiaryType {
  visibilityStatus: string;
  userEmotion: NewEmotion | null;
  userId: number | undefined;
  question: string;
  title: string;
  content: string;
}

export interface EmotionQuestionsType {
  angry: string[];
  disgusted: string[];
  fearful: string[];
  happy: string[];
  neutral: string[];
  sad: string[];
  surprised: string[];
}

export interface UpdateBoardDataType {
  boardId: number;
  visibilityStatus: string;
  title: string;
  content: string;
  question: string;
}

export interface UserEmotionChartType {
  emotions: any;
}
