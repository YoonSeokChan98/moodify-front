
import { UserInfoStyled } from './styled';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { UserType } from '@/types';

interface UserInfoProps {
  user: UserType | null;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter();
  const userName = user?.userName;
  const userMembershipStatus = user?.userMembershipStatus;
  const membershipName = userMembershipStatus?.membershipName
  const userId = user?.userId;

  // const handleUpdateMyInfo = () => {
  //   alert('개발 중');
  // };

  return (
    <UserInfoStyled>
      <div className="userInfoWrap">
        {/* <div className="title">내 정보</div> */}

        <div className="userInfoContent">
          {/* 이미지 & 유저 정보 */}
          <div className="userInfoBox">
            {/* 이미지 */}
            {/* <div className="userInfoImage">이미지</div> */}

            {/* 유저 정보 */}
            <div className="userInfo">
              <div className="userName">{userName}</div>
              <div>
                <Button onClick={() => router.push('/membership_info')}>{membershipName}</Button>
              </div>
            </div>
          </div>

          {/* 유저정보 변경 버튼 */}
          <div className="reMyInfoBtn">
            <Button onClick={() => router.push(`/my_edit_info/${userId}`)}>내정보 변경</Button>
          </div>
        </div>
      </div>
    </UserInfoStyled>
  );
};

export default UserInfo;
