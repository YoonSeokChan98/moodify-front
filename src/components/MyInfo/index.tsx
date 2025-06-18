import UserEmotionChart from './UserEmotionChart';
import UserInfo from './UserInfo';
import { MyInfoStyled } from './styled';

import ChartJsComp from "../ChartJsComp";

const MyInfo = () => {
  return (
    <MyInfoStyled>
      <div className="myInfoWrap">
        <UserInfo />
        <UserEmotionChart />
        {/* <ChartJsComp /> */}
      </div>
    </MyInfoStyled>
  );
};

export default MyInfo;
