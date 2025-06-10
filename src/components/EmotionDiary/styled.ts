import styled from 'styled-components';

export const EmotionDiaryStyled = styled.div`
  padding: 40px 20px;
  min-height: 100vh;

  .emotionDiaryWrap {
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .questionBox {
    font-size: 22px;
    font-weight: bold;
    color: #5d4037;
    border-left: 4px solid #f9c784;
    padding-left: 16px;

    div {
      font-weight: normal;
      font-size: 18px;
      margin-top: 8px;
      color: #6d4c41;
    }
  }

  .titleBox {
  }

  .contentBox {
    .ql-editor {
      min-height: 200px;
      font-size: 18px;
      line-height: 1.6;
    }

    .ql-toolbar {
      border-radius: 8px 8px 0 0;
    }

    .ql-container {
      border-radius: 0 0 8px 8px;
    }
  }

  .visibilityBox{
    font-size: 12px;
    button{
      margin-left: 10px;
      width: 40px;
    }
  }

  button {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
  }
`;
