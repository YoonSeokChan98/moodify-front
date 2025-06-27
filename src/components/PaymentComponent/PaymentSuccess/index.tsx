import { useRouter } from 'next/router';
import { AppDispatch, store } from '@/redux/store';
import { PaymentSuccessStyled } from './styled';
import { useEffect } from 'react';
import { apiPostVerifyPayment } from '@/pages/api/paymentApi';
import { apiPostMembership } from '@/pages/api/membershipApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/slices/userSlices';
import { Button } from 'antd';

const PaymentSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = router.query;
  const { amount, orderId, paymentKey, paymentType } = router.query;
  const user = store.getState().user.userInfo;
  const membershipName = 'premium';

  useEffect(() => {
    const handleMembership = async () => {
      if (amount && orderId && paymentKey && paymentType) {
        try {
          const paymentResult = await apiPostVerifyPayment({
            userId: user?.userId,
            paymentKey: String(paymentKey),
            orderId: String(orderId),
            amount: Number(amount),
          });
          console.log('🚀 ~ handleMembership ~ paymentResult:', paymentResult);
          // data
          // :
          // cardNumber
          // :
          // "UNKNOWN"
          // cardType
          // :
          // "UNKNOWN"
          // createdAt
          // :
          // "2025-06-26T10:58:23.000Z"
          // id
          // :
          // 1
          // orderId
          // :
          // "ORD-1750935487732-BvRhEnVI"
          // paymentKey
          // :
          // "tgen_20250626195807Hsr51"
          // paymentMethod
          // :
          // "간편결제"
          // paymentPrice
          // :
          // 1000
          // paymentStatus
          // :
          // "COMPLETED"
          // suppliedPrice
          // :
          // 909
          // updatedAt
          // :
          // "2025-06-26T10:58:23.000Z"
          // userId
          // :
          // 1
          // vat
          // :
          // 91
          // [[Prototype]]
          // :
          // Object
          // message
          // :
          // "결제 확인 성공"
          // result
          // :
          // true
          // [[Prototype]]
          // :
          // Object
          if (paymentResult.result === true) {
            const paymentId = paymentResult.data.id;
            const userId = paymentResult.data.userId;
            const membershipResult = await apiPostMembership(userId, membershipName, paymentId);
            const newMembership = {
              id: membershipResult.data.id,
              membershipName: membershipResult.data.membershipName,
              startDate: membershipResult.data.startDate,
              endDate: membershipResult.data.endDate,
              status: membershipResult.data.status,
              userId: membershipResult.data.userId,
              paymentId: membershipResult.data.paymentId,
            };
            if (membershipResult.result === true) {
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
            } else {
              alert('오류 발생 다시 결제해 주세요');
            }
          } else {
            alert('오류 발생 다시 결제해 주세요');
          }
        } catch (error) {
          console.error('프리미엄 가입 실패', error);
        }
      }
    };
    handleMembership();
  }, [amount, orderId, paymentKey, paymentType, dispatch, user]);

  return (
    <PaymentSuccessStyled>
      <div className="successWrap">
        <div className="title">프리미엄이 가입되었습니다.</div>
        <div className="infoList">
          <div className="infoItem">
            <span>구매자 이름:</span> {user?.userName}
          </div>
          <div className="infoItem">
            <span>구매자 이메일:</span> {user?.userEmail}
          </div>
          <div className="infoItem">
            <span>결제 금액:</span> {Number(searchParams.amount)?.toLocaleString()}원
          </div>
        </div>
        <div className="buttonWrapper">
          <Button onClick={() => router.push('/')}>메인으로 돌아가기</Button>
        </div>
      </div>
    </PaymentSuccessStyled>
  );
};
export default PaymentSuccess;
