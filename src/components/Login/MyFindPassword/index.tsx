import { useRouter } from 'next/router';
import { MyFindPasswordStyled } from './styled';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import { ValidateType } from '@/types';
import { toast } from 'react-toastify';
import { apiSendAuthNumberPasswordReset } from '@/pages/api/nodemailerApi';
import { useState } from 'react';
import Password from 'antd/es/input/Password';
import { websiteTitle } from '@/assets';
import { apiPatchResetPassword } from '@/pages/api/userApi';

const MyFindPassword = () => {
  const router = useRouter();
  // 이메일 인증 번호 저장
  const [authNumber, setAuthNumber] = useState<number>(0);
  // 이메일 인증 번호 발송 여부
  const [isAuthNumber, setIsAuthNumber] = useState(false);
  // 이메일 인증 완료 여부
  const [isAuthStatus, setIsAuthStatus] = useState(false);

  const formInitialValues = {
    userEmail: '',
    userAuthNumber: '',
    userPassword: '',
    userPasswordConfirm: '',
  };
  const findPasswordFormik = useFormik({
    initialValues: formInitialValues,
    validate: (values) => {
      const errors: ValidateType = {};
      if (values.userPassword !== values.userPasswordConfirm) {
        errors.userPasswordConfirm = '비밀번호가 일치하지 않습니다';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const { userEmail, userPassword } = values;

        const response = await apiPatchResetPassword(userEmail, userPassword);
        if (response.result === true) {
          toast.success('비밀번호 변경 성공');
          findPasswordFormik.resetForm();
          router.push('/login');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(`비밀번호 찾기 에러: ${error}`);
      }
    },
  });

  // 이메일 인증 요청
  const handleSendAuthNumberPasswordReset = async () => {
    const userEmail = findPasswordFormik.values.userEmail;
    if (!userEmail) {
      toast.error('이메일을 입력해주세요.');
      return;
    }
    const response = await apiSendAuthNumberPasswordReset(userEmail);
    if (response.result === true) {
      setAuthNumber(Number(response.authNumber));
      setIsAuthNumber(true);
    } else {
      toast.error(response.message);
      setIsAuthNumber(false);
      console.error(response.message);
    }
  };
  // 이메일 인증 확인
  const handleVerifyAuthNumberPasswordReset = () => {
    if (Number(findPasswordFormik.values.userAuthNumber) === authNumber) {
      toast.success('이메일 인증 성공!');
      setIsAuthStatus(true);
    } else {
      toast.error('인증 번호가 틀렸습니다.');
      setIsAuthStatus(false);
    }
  };

  // 에러메시지
  const errorPasswordConfirmMessage = findPasswordFormik.touched.userPasswordConfirm &&
    findPasswordFormik.errors.userPasswordConfirm && (
      <div className="errorMessage">{findPasswordFormik.errors.userPasswordConfirm}</div>
    );

  return (
    <MyFindPasswordStyled>
      <form className="findPasswordWrap" onSubmit={findPasswordFormik.handleSubmit}>
        <div className="findPasswordTextBox">
          <div className="findPasswordTitleText">{websiteTitle}</div>
          <div className="findPasswordSmallText">감정을 기록하다.</div>
        </div>

        <div className="findPasswordUserEmail">
          {isAuthNumber ? (
            <Input
              placeholder="이메일"
              id="userEmail"
              onChange={findPasswordFormik.handleChange}
              value={findPasswordFormik.values.userEmail}
              readOnly
            />
          ) : (
            <Input
              placeholder="이메일"
              id="userEmail"
              onChange={findPasswordFormik.handleChange}
              value={findPasswordFormik.values.userEmail}
              required
            />
          )}
          {isAuthNumber || (
            <Button htmlType="button" onClick={handleSendAuthNumberPasswordReset}>
              인증받기
            </Button>
          )}
        </div>
        {isAuthNumber && (
          <>
            {isAuthStatus || (
              <div>
                <Input
                  placeholder="인증번호"
                  id="userAuthNumber"
                  onChange={findPasswordFormik.handleChange}
                  value={findPasswordFormik.values.userAuthNumber}
                />
                {isAuthStatus || (
                  <Button htmlType="button" onClick={handleVerifyAuthNumberPasswordReset}>
                    인증하기
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        <div className="signupUserPassword">
          <Password
            placeholder="비밀번호"
            id="userPassword"
            onChange={findPasswordFormik.handleChange}
            value={findPasswordFormik.values.userPassword}
            required
          />
        </div>

        <div className="signupUserPasswordConfirm">
          <Password
            placeholder="비밀번호 확인"
            id="userPasswordConfirm"
            onChange={findPasswordFormik.handleChange}
            value={findPasswordFormik.values.userPasswordConfirm}
            required
          />
          {errorPasswordConfirmMessage}
        </div>

        <div className="actionButtons">
          <Button className="primaryButton" htmlType="submit">
            비밀번호 변경
          </Button>
        </div>
      </form>
    </MyFindPasswordStyled>
  );
};

export default MyFindPassword;
