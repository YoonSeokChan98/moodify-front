import { useEffect, useRef, useState } from 'react';
import { PaymentComponentStyled } from './styled';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { store } from '@/redux/store';
import { Button, Input } from 'antd';
import { nanoid } from 'nanoid';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'YbX2HuSlsC9uVJW6NMRMj';

const PaymentComponent = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);

  const user = store.getState().user.userInfo;

  const [price, setPrice] = useState(1000);
  const productName = 'premium';
  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods('#payment-widget', price);
      paymentWidget.renderAgreement('#agreement');

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    paymentMethodsWidget.updateAmount(price, paymentMethodsWidget.UPDATE_REASON.COUPON);
  }, [price]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;
    try {
      await paymentWidget?.requestPayment({
        orderId: `ORD-${Date.now()}-${nanoid(8)}`,
        orderName: `${productName}`,
        customerName: `${user?.userName}`,
        customerEmail: `${user?.userEmail}`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.log('결제 에러 발생: ', error);
    }
  };

  return (
    <PaymentComponentStyled>
    <div className="container">
      <div className="title">결제창</div>
      <div id="payment-widget" className="paymentWidget"></div>
      <div id="agreement" className="agreementText"></div>
      <Button className="paymentButton" onClick={handlePayment}>멤버십 가입하기</Button>
    </div>
    </PaymentComponentStyled>
  );
};
export default PaymentComponent;
