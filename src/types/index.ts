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
    userId: Number;
    userName: string;
    userEmail: string;
    userRole: string;
    userToken: string;
    userMembershipStatus: string;
  } | null;
}

// user
export interface UserType {
  userId: Number;
  userName: string;
  userEmail: string;
  userRole: string;
  userToken: string;
  userMembershipStatus: string;
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
  userId: Number | null | undefined;
}

export interface getReduxEmotionType {
  getReduxEmotion: string | number;
}

// 감정데이터
export interface EmotionData {
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
  userId: Number | undefined;
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
