import styled from 'styled-components';

export const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .loginWrap {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 40px 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;

    .loginTextBox {
      .loginTitleText {
        font-size: 30px;
        font-weight: 800;
      }
      .loginSmallText {
        color: #939393;
      }
    }
    .actionButtons {
      display: flex;
      flex-direction: column;
      gap: 15px;
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
      .secondaryButton {
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: #939393;
        cursor: pointer;
      }
    }

    .errorMessage {
      font-size: 13px;
      color: red;
      margin-left: 5px;
    }
  }
`;
