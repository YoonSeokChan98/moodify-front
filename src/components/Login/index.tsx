import { useFormik } from 'formik';
import { LoginStyled } from './styled';
import { useRouter } from 'next/router';
import { Input } from 'antd';

const Login = () => {
  const router = useRouter();

  const formInitialValues = {
    userEmail: '',
    userPassword: '',
  };
  const loginFormik = useFormik({
    initialValues: formInitialValues,
    onSubmit: async (values) => {
      const { userEmail, userPassword } = values;
      
    },
  });
  return (
    <LoginStyled>
      <form className="LoginWrap">
        <div>
          <label htmlFor=""></label>
          <Input />
        </div>
      </form>
    </LoginStyled>
  );
};

export default Login;
