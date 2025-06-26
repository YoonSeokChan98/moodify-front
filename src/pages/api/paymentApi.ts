import { PaymentTypes } from '@/types';
import axios from 'axios';

const BACK_URL = 'http://localhost:4000';
const API_URL = `${BACK_URL}/api/payment`;

// 결제 승인
export const apiPostVerifyPayment = async ({ userId, paymentKey, orderId, amount }: PaymentTypes) => {
  try {
    const response = await axios.post(`${API_URL}/verify-payment`, { userId, paymentKey, orderId, amount });
    return response.data;
  } catch (error) {
    console.error(`API 에러: ${error}`);
  }
};
