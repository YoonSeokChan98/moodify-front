import { useFormik } from 'formik';
import { SignupStyled } from './styled';
import { useRouter } from 'next/router';
import { Alert, Button, Input, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import { useEffect, useState } from 'react';

import { apiSendAuthNumberEmail } from '@/pages/api/nodemailerApi';
import { apiPostSignup } from '@/pages/api/userApi';
import { ValidateType } from '@/types';
import { toast } from 'react-toastify';

const Signup = () => {
  const router = useRouter();
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 이메일 인증 번호 저장
  const [authNumber, setAuthNumber] = useState<number>(0);
  // 이메일 인증 번호 발송 여부
  const [isAuthNumber, setIsAuthNumber] = useState(false);
  // 이메일 인증 완료 여부
  const [isAuthStatus, setIsAuthStatus] = useState(false);

  // 로그 찍는용 나중에 꼭 지워야함~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    console.log('🚀 ~ Signup ~ authNumber:', authNumber);
  }, [authNumber]);

  const formInitialValues = {
    userName: '',
    userEmail: '',
    userAuthNumber: '',
    userPassword: '',
    userPasswordConfirm: '',
  };
  const signupFormik = useFormik({
    initialValues: formInitialValues,
    validate: (values) => {
      const errors: ValidateType = {};
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmail)) {
        errors.userEmail = '유효하지 않는 이메일 주소입니다.';
      }
      if (values.userPassword !== values.userPasswordConfirm) {
        errors.userPasswordConfirm = '비밀번호가 일치하지 않습니다';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { userName, userEmail, userPassword } = values;
      try {
        setIsLoading(true);
        const response = await apiPostSignup({ userName, userEmail, userPassword });
        signupFormik.resetForm();
        if (response.result === true) {
          toast.success('회원이 되신걸 환영합니다.');
          router.push('/');
        } else {
          toast.error(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(`회원가입 에러: ${error}`);
      }
    },
  });

  // 에러메시지
  const errorEmailMessage =
    signupFormik.touched.userEmail && signupFormik.errors.userEmail ? (
      <div className="errorMessage">{signupFormik.errors.userEmail}</div>
    ) : (
      <></>
    );
  const errorPasswordConfirmMessage =
    signupFormik.touched.userPasswordConfirm && signupFormik.errors.userPasswordConfirm ? (
      <div className="errorMessage">{signupFormik.errors.userPasswordConfirm}</div>
    ) : (
      <></>
    );

  // 이메일 인증 요청
  const handleSendAuthNumberEmail = async () => {
    setIsLoading(true);
    const userEmail = signupFormik.values.userEmail;
    if (!userEmail) {
      toast.error('이메일을 입력해주세요.');
      setIsLoading(false);
      return;
    }
    const response = await apiSendAuthNumberEmail(userEmail);
    if (response.result === true) {
      setAuthNumber(Number(response.authNumber));
      setIsAuthNumber(true);
      setIsLoading(false);
    } else {
      toast.error(response.message);
      setIsAuthNumber(false);
      setIsLoading(false);
      console.error(response.message);
    }
  };

  // 이메일 인증 확인
  const handleVerifyAuthNumberEmail = () => {
    if (Number(signupFormik.values.userAuthNumber) === authNumber) {
      toast.success('이메일 인증 성공!');
      setIsAuthStatus(true);
    } else {
      toast.error('인증 번호가 틀렸습니다.');
      setIsAuthStatus(false);
    }
  };

  return (
    <SignupStyled>
      <form className="signupWrap" onSubmit={signupFormik.handleSubmit}>
        <div className="signupTextBox">
          <div className="signupTitleText">Moodify</div>
          <div className="signupSmallText">감정으로 음악을 만들다.</div>
        </div>
        <div className="signupUsername">
          <Input
            placeholder="닉네임"
            id="userName"
            onChange={signupFormik.handleChange}
            value={signupFormik.values.userName}
            required
          />
        </div>
        <div className="signupUserEmail">
          {isAuthNumber ? (
            <Input
              placeholder="이메일"
              id="userEmail"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.userEmail}
              required
              readOnly
            />
          ) : (
            <Input
              placeholder="이메일"
              id="userEmail"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.userEmail}
              required
            />
          )}

          {errorEmailMessage}
          {isAuthNumber ? (
            <></>
          ) : (
            <Button htmlType="button" onClick={handleSendAuthNumberEmail}>
              {isLoading ? <Spin size="small" /> : '인증받기'}
            </Button>
          )}
        </div>
        {isAuthNumber ? (
          <>
            {isAuthStatus ? (
              <></>
            ) : (
              <div className="signupUserAuthNumber">
                <Input
                  placeholder="인증번호"
                  id="userAuthNumber"
                  onChange={signupFormik.handleChange}
                  value={signupFormik.values.userAuthNumber}
                />
                {isAuthStatus ? (
                  <></>
                ) : (
                  <Button htmlType="button" onClick={handleVerifyAuthNumberEmail}>
                    인증하기
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="signupUserPassword">
          <Password
            placeholder="비밀번호"
            id="userPassword"
            onChange={signupFormik.handleChange}
            value={signupFormik.values.userPassword}
            required
          />
        </div>
        <div className="signupUserPasswordConfirm">
          <Password
            placeholder="비밀번호 확인"
            id="userPasswordConfirm"
            onChange={signupFormik.handleChange}
            value={signupFormik.values.userPasswordConfirm}
            required
          />
          {errorPasswordConfirmMessage}
        </div>
        <div>
          <Button htmlType="submit" disabled={!isAuthStatus}>
            {isLoading ? <Spin size="small" /> : '회원가입'}
          </Button>
        </div>
      </form>
    </SignupStyled>
  );
};

export default Signup;
