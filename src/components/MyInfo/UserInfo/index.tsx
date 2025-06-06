import { store } from '@/redux/store';
import { UserInfoStyled } from './styled';
import { Button } from 'antd';

const UserInfo = () => {
  const userName = store.getState().user.userInfo?.userName;
  const userMembershipStatus = store.getState().user.userInfo?.userMembershipStatus;

  const handleUpdateMyInfo = () => {
    alert('개발중');
  };

  return (
    <UserInfoStyled>
      <div className="userInfoWrap">
        <div className="title">내 정보</div>
        <div className="userInfoContent">
          <div className="userInfoBox">
            {/* 이미지 */}
            <div className="userInfoImage">이미지</div>
            {/* 유저 정보 */}
            <div className="userInfo">
              <div className="userName">{userName}</div>
              <div>{userMembershipStatus}</div>
            </div>
          </div>
          {/* 유저정보 변경 버튼 */}
          <div className="reMyInfoBtn">
            <Button onClick={handleUpdateMyInfo}>내정보 변경</Button>
          </div>
        </div>
      </div>
    </UserInfoStyled>
  );
};

export default UserInfo;
