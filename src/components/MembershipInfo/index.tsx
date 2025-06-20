import { websiteTitle } from '@/assets';
import { MembershipInfoStyled } from './styled';

const MembershipInfo = () => {
  return (
    <MembershipInfoStyled>
      <div className="MembershipInfoWrap">
        <div className="websiteTextBox">
          <div className="websiteTitleText">{websiteTitle}</div>
          <div className="websiteSmallText">감정을 기록하다.</div>
        </div>

        <div>멤버십 페이지</div>
      </div>
    </MembershipInfoStyled>
  );
};

export default MembershipInfo;
