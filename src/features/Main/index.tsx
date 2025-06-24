import { websiteTitle } from '@/assets';
import { MainStyled } from './styled';
import BoardList from '@/components/BoardComponent/BoardList';

const Main = () => {
  return (
    <MainStyled>
      <div className="mainWrap">
        <div className="websiteTextBox">
          <div className="websiteTitleText">{websiteTitle}</div>
          <div className="websiteSmallText">감정을 기록하다.</div>
        </div>
        <BoardList />
      </div>
    </MainStyled>
  );
};

export default Main;
