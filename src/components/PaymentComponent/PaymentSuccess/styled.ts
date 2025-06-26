import styled from 'styled-components';

export const PaymentSuccessStyled = styled.div`
  .successWrap {
    max-width: 480px;
    margin: 60px auto;
    padding: 32px;
    background-color: #f9f9f9;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    color: #1890ff;
    text-align: center;
    margin-bottom: 24px;
  }

  .infoList {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .infoItem {
    font-size: 16px;
    color: #333;
    line-height: 1.5;

    & > span {
      font-weight: 600;
      color: #555;
      margin-right: 8px;
    }
  }

  .buttonWrapper {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      width: 100%;
      max-width: 240px;
      padding: 12px 0;
      border-radius: 8px;
    }
  }

  @media (max-width: 520px) {
    .successWrap {
      margin: 30px 16px;
      padding: 24px;
    }
    .title {
      font-size: 24px;
      margin-bottom: 18px;
    }
    .infoItem {
      font-size: 14px;
    }
  }
`;
