import { websiteTitle } from '@/assets';
import { MembershipInfoStyled } from './styled';

const MembershipInfo = () => {
  /**
   * 구현 해야하는거
   * 1. 결제 시스템
   * 2. 구독 설명 페이지
   * 3.
   */
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
