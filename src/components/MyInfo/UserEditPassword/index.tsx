import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { UserEditPasswordStyled } from './styled';
import { ValidateType } from '@/types';
import { apiPatchUpdatePassword } from '@/pages/api/userApi';
import { toast } from 'react-toastify';
import { Button, Input } from 'antd';
import Password from 'antd/es/input/Password';
import { websiteTitle } from '@/assets';

const UserEditPassword = () => {
  const router = useRouter();
  const { id } = router.query;

  const formInitialValues = {
    userLegacyPassword: '',
    userNewPassword: '',
    userNewPasswordConfirm: '',
  };
  const editPasswordFormik = useFormik({
    initialValues: formInitialValues,
    validate: (values) => {
      const errors: ValidateType = {};
      if (values.userNewPassword !== values.userNewPasswordConfirm) {
        errors.userNewPasswordConfirm = '비밀번호가 일치하지 않습니다';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const { userLegacyPassword, userNewPassword } = values;
        const response = await apiPatchUpdatePassword(id, userLegacyPassword, userNewPassword);
        if (response.result === false) {
          return toast.error(response.message);
        }
        toast.success(response.message);
        editPasswordFormik.resetForm();
        router.push('/my_info');
      } catch (error) {
        console.error(`비밀번호 변경 에러: ${error}`);
      }
    },
  });

  const errorNewPasswordConfirmMessage = editPasswordFormik.touched.userNewPasswordConfirm &&
    editPasswordFormik.errors.userNewPasswordConfirm && (
      <div className="errorMessage">{editPasswordFormik.errors.userNewPasswordConfirm}</div>
    );

  return (
    <UserEditPasswordStyled>
      <form className="userEditPasswordWrap" onSubmit={editPasswordFormik.handleSubmit}>
        <div className="editTitleBox">
          <div className="editTitleText">{websiteTitle}</div>
          <div className="editSmallText">감정을 기록하다.</div>
        </div>
        <div>
          <Password
            placeholder="기존 비밀번호"
            id="userLegacyPassword"
            onChange={editPasswordFormik.handleChange}
            value={editPasswordFormik.values.userLegacyPassword}
            required
          />
        </div>
        <div>
          <Password
            placeholder="새 비밀번호"
            id="userNewPassword"
            onChange={editPasswordFormik.handleChange}
            value={editPasswordFormik.values.userNewPassword}
            required
          />
        </div>
        <div>
          <Password
            placeholder="새 비밀번호 확인"
            id="userNewPasswordConfirm"
            onChange={editPasswordFormik.handleChange}
            value={editPasswordFormik.values.userNewPasswordConfirm}
            required
          />
          {errorNewPasswordConfirmMessage}
        </div>
        <div>
          <Button className="primaryButton" htmlType="submit">
            변경하기
          </Button>
        </div>
      </form>
    </UserEditPasswordStyled>
  );
};
export default UserEditPassword;
