import { useRouter } from 'next/router';
import { HeaderStyled } from './styled';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { logOut } from '@/redux/slices/userSlices';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Header = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // 로고
  const logoObj = 'Moodify';
  const clickLogo = () => {
    router.push('/');
  };
  // 미구현 기능 알림창
  const clickDevelopAlert = () => {
    alert('현재 개발 중입니다.');
  };

  // 쿠키체크 -> 로그인 상태 변경
  const cookie = Cookies.get('userToken');
  useEffect(() => {
    if (cookie) {
      setLoginUser(true);
    } else {
      setLoginUser(false);
    }

  }, [cookie]);

  // 로그아웃
  const handleLogout = () => {
    Cookies.remove('userToken');
    dispatch(logOut());
    toast.info('로그아웃');
    router.push('/');
  };

  const name = store.getState().user.userInfo?.userName
  const loginStatus = loginUser ? (
    <>
      <div className='headerUserName'>{name}님</div>
      <Button onClick={handleLogout}>로그아웃</Button>
    </>
  ) : (
    <>
      <Button onClick={() => router.push('/login')}>로그인</Button>
      <Button onClick={() => router.push('/signup')}>회원가입</Button>
    </>
  );

  return (
    <HeaderStyled>
      <div className="headerWrap">
        <div className="headerLogo">
          <div onClick={() => clickLogo()}>{logoObj}</div>
        </div>
        <div className="headerNavBar">
          <Button onClick={() => router.push('/emotion_extraction')}>감정 음악 만들기</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴2</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴3</Button>
        </div>
        <div className="headerAuthBar">{loginStatus}</div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
