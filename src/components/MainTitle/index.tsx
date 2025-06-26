import { websiteTitle } from '@/assets';
import { MainTitleStyled } from './styled';

const MainTitle = () => {
  return (
    <MainTitleStyled>
      <div className="websiteTextBox">
        <div className="websiteTitleText">{websiteTitle}</div>
        <div className="websiteSmallText">감정을 기록하다.</div>
      </div>
    </MainTitleStyled>
  );
};

export default MainTitle;
