import styled from 'styled-components';

export const EmotionDiaryStyled = styled.div`
  padding: 40px 20px;
  /* background: #fdf6f0; 따뜻한 베이지 계열 배경 */
  min-height: 100vh;
  /* font-family: 'Nanum Pen Script', cursive; 손글씨 느낌 폰트 (웹폰트로 연결 필요) */

  .emotionDiaryWrap {
    /* background: #fffdf9; */
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

  .subjectBox {
  }

  .contentBox {
    .ql-editor {
      min-height: 200px;
      font-size: 18px;
      line-height: 1.6;
      /* font-family: 'Nanum Pen Script', cursive; */
    }

    .ql-toolbar {
      border-radius: 8px 8px 0 0;
    }

    .ql-container {
      border-radius: 0 0 8px 8px;
    }
  }

  button {
    /* background-color: #f9c784; */
    /* border: none; */
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    /* font-family: 'Nanum Pen Script', cursive; */
    /* color: #5d4037; */
    transition: background 0.3s ease;

    &:hover {
      /* background-color: #f8b66b; */
    }
  }
`;
