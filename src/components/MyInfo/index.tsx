import UserEmotionChart from './UserEmotionChart';
import UserInfo from './UserInfo';
import { MyInfoStyled } from './styled';

const MyInfo = () => {
  return (
    <MyInfoStyled>
      <div className="myInfoWrap">
        <UserInfo />
        <UserEmotionChart />
      </div>
    </MyInfoStyled>
  );
};

export default MyInfo;
