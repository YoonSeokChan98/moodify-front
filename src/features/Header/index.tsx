import { useRouter } from 'next/router';
import { HeaderStyled } from './styled';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { logOut } from '@/redux/slices/userSlices';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { removeEmotions } from '@/redux/slices/emotionSlices';

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
      dispatch(logOut());
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

  // 감정 분석 페이지
  const onclickEmotionExtraction = () => {
    router.push('/emotion_extraction');
    // 기존에 있는 감정 데이터 초기화
    dispatch(removeEmotions());
  };

  const name = store.getState().user.userInfo?.userName;
  const loginStatus = loginUser ? (
    <>
      <div className="headerUserName" onClick={() => router.push('/my_info')}>
        {name}님
      </div>
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
          <Button onClick={() => onclickEmotionExtraction()}>감정 분석</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴버튼</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴버튼</Button>
        </div>
        <div className="headerAuthBar">{loginStatus}</div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
