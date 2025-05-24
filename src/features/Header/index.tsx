import { useRouter } from 'next/router';
import { HeaderStyled } from './styled';
import { Button } from 'antd';

const Header = () => {
  const router = useRouter();

  // 미구현 기능 알림창
  const clickDevelopAlert = () => {
    alert('현재 개발 중입니다.');
  };

  // 로고
  const logoObj = 'Moodify';
  const clickLogo = () => {
    router.push('/');
  };

  //메뉴

  // 로그인 회원가입

  return (
    <HeaderStyled>
      <div className="headerWrap">
        <div className="headerLogo">
          <div onClick={() => clickLogo()}>{logoObj}</div>
        </div>
        <div className="headerNavBar">
          <Button onClick={() => clickDevelopAlert()}>메뉴1</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴2</Button>
          <Button onClick={() => clickDevelopAlert()}>메뉴3</Button>
        </div>
        <div className="headerAuthBar">
          <Button onClick={() => router.push('/login')}>로그인</Button>
          <Button onClick={() => router.push('/signup')}>회원가입</Button>
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
