// 회원가입 / 로그인 검증
export interface ValidateType {
  userEmail?: string;
  // userPassword?: string;
  userPasswordConfirm?: string;
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
  } | null;
}

// 이미지 url
export interface ImageType {
  imageSrc: string | null;
}

// 감정
export interface EmotionType {
  item: {
    angry?: number;
    disgusted?: number;
    fearful?: number;
    happy?: number;
    neutral?: number;
    sad?: number;
    surprised?: number;
  };
}
