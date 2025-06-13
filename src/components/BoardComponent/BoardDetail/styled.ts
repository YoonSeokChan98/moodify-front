import styled from 'styled-components';

export const BoardDetailStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px;

  .boardDetailWrap {
    max-width: 800px;
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
    box-sizing: border-box;
    color: #333;

    > div {
      margin-bottom: 24px;
    }

    .title {
      font-size: 28px;
      font-weight: 700;
      color: #222;
      margin-bottom: 10px;
    }

    .date {
      font-size: 14px;
      color: #888;
      margin-bottom: 20px;
    }

    .question {
      font-size: 16px;
      font-weight: 500;
      background-color: #f0f0f5;
      padding: 12px 16px;
      border-left: 4px solid #4a90e2;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .content {
      line-height: 1.8;
      font-size: 16px;
      white-space: pre-wrap;

      img {
        max-width: 100%;
        height: auto;
        margin: 12px 0;
        border-radius: 8px;
      }
    }

    .visibilityBox {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;

      .ant-switch {
        background-color: #ccc;
      }

      .ant-switch-checked {
        background-color: #4caf50;
      }
    }
  }
`;
