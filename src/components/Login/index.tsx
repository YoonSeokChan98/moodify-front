import { useFormik } from 'formik';
import { LoginStyled } from './styled';
import { useRouter } from 'next/router';
import { Button, Input } from 'antd';
import { ValidateType } from '@/types';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import { apiPostLogin } from '@/pages/api/userApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { loginSuccess } from '@/redux/slices/userSlices';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const formInitialValues = {
    userEmail: '',
    userPassword: '',
  };
  const loginFormik = useFormik({
    initialValues: formInitialValues,
    validate: (values) => {
      const errors: ValidateType = {};
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmail)) {
        errors.userEmail = '유효하지 않는 이메일 주소입니다.';
      }
      return errors;
      },
      onSubmit: async (values) => {
        const { userEmail, userPassword } = values;
        try {
          setIsLoading(true);
          const response = await apiPostLogin({ userEmail, userPassword });
        loginFormik.resetForm();

        if (response.result === false) {
          toast.error(response.message);
        }

        if (response.token) {
          Cookies.set('userToken', response.token, {
            expires: 1, // 만료 시간 하루
            secure: true, // HTTPS에서만 전송
            sameSite: 'Strict', // CSRF 공격 방지
            path: '/', // 쿠키의 유효 경로
          });

          dispatch(
            loginSuccess({
              userId: response.data.id,
              userName: response.data.name,
              userEmail: response.data.email,
              userRole: response.data.role,
              userMembershipStatus: response.data.membershipStatus,
              userToken: response.token,
            })
          );
          const name = response.data.name;
          toast.success(`${name}님 어서오세요.`);
          router.push('/');
          setIsLoading(false);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(`로그인 에러: ${error}`);
      }
    },
  });

  const errorEmailMessage =
    loginFormik.touched && loginFormik.errors.userEmail ? (
      <div className="errorMessage">{loginFormik.errors.userEmail}</div>
    ) : (
      <></>
    );
  return (
    <LoginStyled>
      <form className="loginWrap" onSubmit={loginFormik.handleSubmit}>
        <div className="loginTextBox">
          <div className="loginTitleText">Moodify</div>
          <div className="loginSmallText">감정을 기록하다.</div>
        </div>

        <div className="loginUserEmail">
          <Input
            placeholder="이메일"
            id="userEmail"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.userEmail}
          />
          {errorEmailMessage}
        </div>

        <div className="loginUserPassword">
          <Password
            placeholder="비밀번호"
            id="userPassword"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.userPassword}
          />
        </div>

        <div>
          <Button htmlType="submit">로그인</Button>
        </div>
      </form>
    </LoginStyled>
  );
};

export default Login;
