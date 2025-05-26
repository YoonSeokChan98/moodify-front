import styled from 'styled-components';

export const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;

  .loginWrap {
    background-color: #f9f9f9;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    .loginTextBox {
      .loginTitleText {
        font-size: 30px;
        font-weight: 800;
      }
      .loginSmallText {
        color: #939393;
      }
    }
    .loginUserEmail {
      margin: 10px 0;
    }
    .loginUserPassword {
      margin: 10px 0;
    }
    .errorMessage {
      font-size: 13px;
      color: red;
      margin-left: 5px;
    }
  }
`;
