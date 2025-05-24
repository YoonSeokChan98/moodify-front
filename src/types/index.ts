// 회원가입 검증 타입
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
