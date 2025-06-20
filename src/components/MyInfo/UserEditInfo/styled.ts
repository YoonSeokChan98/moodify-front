import styled from 'styled-components';

export const UserEditInfoStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .userEditInfoWrap {
    width: 100%;
    max-width: 400px;
    border-radius: 20px; 
    padding: 40px 30px; 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
    display: flex;
    flex-direction: column;
    gap: 20px; 
    align-items: stretch;

    .editTitleBox {
      text-align: center;
      margin-bottom: 10px;
      .editTitleText {
        font-size: 30px;
        font-weight: 800;
      }
      .editSmallText {
        color: #939393;
      }
    }

    .formGroup {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .inputField {
        width: 100%;
        height: 45px;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 10px;
        font-size: 16px;
        color: #333333;
        outline: none;
        transition: all 0.3s ease;

        &:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
      }

      .errorMessage {
        font-size: 12px;
        color: red;
        margin-top: -5px;
        margin-left: 5px;
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

        &.secondaryButton {
          background-color: #f8f9fa;
          color: #333333;
          border: 1px solid #dcdcdc;
          cursor: pointer;

          &:hover {
            background-color: #e2e6ea;
          }
        }
      }

      .deleteButton {
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        color: #939393;
        cursor: pointer;
      }
    }
  }
`;
