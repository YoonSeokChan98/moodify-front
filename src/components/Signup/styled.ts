import styled from 'styled-components';

export const SignupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .signupWrap {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;

    .signupTextBox {
      .signupTitleText {
        font-size: 30px;
        font-weight: 800;
      }
      .signupSmallText {
        color: #939393;
      }
    }
    .actionButtons {
      button {
        width: 100%;
        height: 45px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        &.primaryButton {
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          &:hover {
            background-color: #0056b3;
          }
          &:active {
            background-color: #004494;
          }
        }
      }
    }

    .errorMessage {
      font-size: 13px;
      color: red;
      margin-left: 5px;
    }
  }
`;
