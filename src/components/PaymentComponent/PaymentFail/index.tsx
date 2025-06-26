import { useRouter } from 'next/router';

const PaymentFail = () => {
    const router = useRouter();
    const searchParams = router.query;

    return (
        <div>
            <div>결제 실패</div>
            <div>{`사유: ${searchParams.message}`}</div>
        </div>
    );
};
export default PaymentFail;
