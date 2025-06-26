import styled from 'styled-components';

export const PaymentComponentStyled = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    color: #1890ff;
    text-align: center;
  }

  .paymentWidget {
    margin-top: 10px;
    margin-bottom: 15px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    background-color: white;
    padding: 16px;
  }

  .agreementText {
    font-size: 12px;
    color: #666;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  .paymentButton {
    background-color: #1890ff;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    padding: 12px 0;
    border: none;
    cursor: pointer;
    transition: background-color 0.25s ease;
    text-align: center;

    &:hover {
      background-color: #40a9ff;
    }

    &:active {
      background-color: #096dd9;
    }
  } 
`;
