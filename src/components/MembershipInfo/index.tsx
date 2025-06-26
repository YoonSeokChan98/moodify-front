import { websiteTitle } from '@/assets';
import { MembershipInfoStyled } from './styled';
import MainTitle from '../MainTitle';
import { AppDispatch, store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { apiDeleteRemoveMembership } from '@/pages/api/membershipApi';
import { loginSuccess } from '@/redux/slices/userSlices';
import { useDispatch } from 'react-redux';

const MembershipInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [membershipStatus, setMembershipStatus] = useState(false);
  const user = store.getState().user.userInfo;
  const userId = user?.userId;
  const membership = user?.userMembershipStatus?.membershipName;
  useEffect(() => {
    if (membership === 'premium') setMembershipStatus(true);
  }, [user]);

  const handelClick = () => {
    alert('개발중');
  };

  const handelRemoveMembership = async () => {
    try {
      const response = await apiDeleteRemoveMembership(userId);
      if (response.result === true) {
        const newMembership = {
          id: null,
          membershipName: 'basic',
          startDate: null,
          endDate: null,
          status: null,
          userId: null,
          paymentId: null,
        };
        dispatch(
          loginSuccess({
            userId: user?.userId ?? 0,
            userName: user?.userName ?? '',
            userEmail: user?.userEmail ?? '',
            userRole: user?.userRole ?? '',
            userMembershipStatus: newMembership,
            userToken: user?.userToken ?? '',
          })
        );
      }
      console.log('🚀 ~ handelRemoveMembership ~ response:', response);
    } catch (error) {
      console.error('멤버십 해지 실패: ', error);
    }
  };

  return (
    <MembershipInfoStyled>
      <div className="MembershipInfoWrap">
        <MainTitle />
        <div className="pageTitle">멤버십 관리하기</div>

        <div className="membershipInfoBox">
          <div className={`freeMembership ${!membershipStatus ? 'active' : ''}`}>
            <div className="title">
              {websiteTitle} Free
              {membershipStatus || <span style={{ color: '#52c41a', fontWeight: 'bold' }}>현재 사용중</span>}
            </div>

            <div>
              <div>1. 감정 분석</div>
              <div>2. 감정 데이터 7일 이용</div>
            </div>
          </div>
          <div className={`proMembership ${membershipStatus ? 'active' : ''}`}>
            <div className="title">
              {websiteTitle} Premium
              {membershipStatus && <span style={{ color: '#52c41a', fontWeight: 'bold' }}>현재 사용중</span>}
            </div>

            <div>
              <div>1. 감정 분석</div>
              <div>2. 광고 제거</div>
              <div>3. 감정 데이터 무제한 이용</div>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={membershipStatus ? handelRemoveMembership : () => router.push('payment')}>
            {membershipStatus ? `Premium 가입해지하기` : `Premium 가입하기`}
          </Button>
        </div>
      </div>
    </MembershipInfoStyled>
  );
};

export default MembershipInfo;
