import { useRouter } from 'next/router';
import { HeaderStyled } from './styled';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { logOut, loginSuccess } from '@/redux/slices/userSlices';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { removeEmotions } from '@/redux/slices/emotionSlices';
import { websiteTitle } from '@/assets';

const Header = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = store.getState().user.userInfo;
  const name = user?.userName;
  const membership = user?.userMembershipStatus;
  const role = user?.userRole;

  const clickLogo = () => {
    router.push('/');
  };
  // test 미구현 기능 알림창
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
  }, [cookie, dispatch]);

  // 멤버십 확인
  useEffect(() => {
    // const fakeMembership = {
    //   membershipName: 'premium',
    //   startDate: '2024-06-01',
    //   endDate: '2024-06-02', // 과거로 설정
    // };

    if (membership?.membershipName === 'premium') {
      const now = new Date();
      if (membership?.endDate) {
        const end = new Date(membership.endDate);
        // console.log('⏰ now:', now.toISOString());
        // console.log('🏁 endDate:', end.toISOString());
        if (now.getTime() > end.getTime()) {
          alert('멤버십 기간이 만료되었습니다.');
          dispatch(
            loginSuccess({
              userId: user?.userId || 0,
              userName: user?.userName || '',
              userEmail: user?.userEmail || '',
              userRole: user?.userRole || '',
              userMembershipStatus: null,
              userToken: user?.userToken || '',
            })
          );
        }
      } else {
        console.log('endDate 값이 없습니다.');
      }
    }
  }, [membership, user, dispatch]);

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

  const loginStatus = loginUser ? (
    <>
      {}
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
          <div onClick={() => clickLogo()}>{websiteTitle}</div>
        </div>
        <div className="headerNavBar">
          {role === 'admin' && <Button onClick={() => clickDevelopAlert()}>관리자 페이지</Button>}
          <Button onClick={() => onclickEmotionExtraction()}>감정 분석</Button>
          <Button onClick={() => router.push('/membership_info')}>멤버십</Button>
        </div>
        <div className="headerAuthBar">{loginStatus}</div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
