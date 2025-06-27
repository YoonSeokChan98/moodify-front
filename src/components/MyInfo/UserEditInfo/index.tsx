import { useRouter } from 'next/router';
import { UserEditInfoStyled } from './styled';
import { useEffect, useState } from 'react';
import { apiGetOneUserInfo, apiPatchRemoveUser, apiPatchUpdateUserInfo } from '@/pages/api/userApi';
import { useFormik } from 'formik';
import { UserType } from '@/types';
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logOut, loginSuccess } from '@/redux/slices/userSlices';
import Cookies from 'js-cookie';
import { websiteTitle } from '@/assets';

const UserEditInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();

  const [userInfo, setUserInfo] = useState<UserType>();

  // 유저 정보 가져오기
  useEffect(() => {
    const getUserInfo = async (id: string | string[] | undefined) => {
      const response = await apiGetOneUserInfo(id);
      setUserInfo(response.data);
    };
    getUserInfo(id);
  }, [id]);

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    try {
      if (confirm('정말로 회원을 탈퇴하시나요?') === true) {
        const response = await apiPatchRemoveUser(id);
        if (response.result === true) {
          Cookies.remove('userToken');
          dispatch(logOut());
          alert('지금까지 저희 플랫폼을 사랑해주셔서 감사합니다.');
          router.push('/');
        }
      }
    } catch (error) {
      console.error('에러 발생: ', error);
    }
  };

  const formInitialValues = {
    userName: userInfo?.userName || '',
    userEmail: userInfo?.userEmail || '',
  };
  const userEditInfoFormik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { userName, userEmail } = values;
      try {
        const response = await apiPatchUpdateUserInfo({ userId: userInfo?.userId, userName, userEmail });
        if (response.result === false) return toast.error('회원정보 수정에 실패했습니다. 다시 시도해 주세요.');
        if (response.token) {
          Cookies.set('userToken', response.token, {
            expires: 1, // 만료 시간 하루
            secure: true, // HTTPS에서만 전송
            sameSite: 'Strict', // CSRF 공격 방지
            path: '/', // 쿠키의 유효 경로
          });
          dispatch(
            loginSuccess({
              userId: response.data.userId,
              userName: response.data.userName,
              userEmail: response.data.userEmail,
              userRole: response.data.userRole,
              userMembershipStatus: response.data.userMembershipStatus,
              userToken: response.token,
            })
          );
          userEditInfoFormik.resetForm();
          toast.success('회원정보가 수정되었습니다.');
          router.push('/my_info');
        }
      } catch (error) {
        console.error(`회원정보 수정 에러: ${error}`);
      }
    },
  });
  return (
    <UserEditInfoStyled>
      <form className="userEditInfoWrap" onSubmit={userEditInfoFormik.handleSubmit}>
        <div className="editTitleBox">
          <div className="editTitleText">{websiteTitle}</div>
          <div className="editSmallText">감정을 기록하다.</div>
        </div>

        <div className="formGroup">
          <Input
            className="inputField"
            id="userName"
            name="userName"
            value={userEditInfoFormik.values.userName}
            onChange={userEditInfoFormik.handleChange}
            placeholder="닉네임"
            required
          />
          <Input
            className="inputField"
            id="userEmail"
            name="userEmail"
            value={userEditInfoFormik.values.userEmail}
            onChange={userEditInfoFormik.handleChange}
            placeholder="이메일"
            required
          />
        </div>

        <div className="actionButtons">
          <Button className="primaryButton" htmlType="submit">
            수정하기
          </Button>
          <Button className="secondaryButton" onClick={() => router.push(`/my_edit_password/${id}`)}>
            비밀번호 변경
          </Button>
          <div className="deleteButton" onClick={handleDeleteAccount}>
            회원 탈퇴
          </div>
        </div>
      </form>
    </UserEditInfoStyled>
  );
};

export default UserEditInfo;
