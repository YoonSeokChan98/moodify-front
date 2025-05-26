import styled from 'styled-components';

export const SignupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;

  .signupWrap {
    background-color: #f9f9f9;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    .signupTextBox {
      .signupTitleText {
        font-size: 30px;
        font-weight: 800;
      }
      .signupSmallText {
        color: #939393;
      }
    }
    .errorMessage {
      font-size: 13px;
      color: red;
      margin-left: 5px;
    }
    .signupUsername {
      margin: 10px 0;
    }
    .signupUserEmail {
      margin: 10px 0;
    }
    .signupUserAuthNumber {
      margin: 10px 0;
    }
    .signupUserPassword {
      margin: 10px 0;
    }
    .signupUserPasswordConfirm {
      margin: 10px 0;
    }
  }
`;
