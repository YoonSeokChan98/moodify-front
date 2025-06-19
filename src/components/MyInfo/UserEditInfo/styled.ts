import styled from 'styled-components';

export const UserEditInfoStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 화면 세로 중앙 정렬 */

  .userEditInfoWrap {
    width: 100%;
    max-width: 400px;
    border-radius: 20px; /* 둥근 모서리 */
    padding: 40px 30px; /* 내부 여백 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    display: flex;
    flex-direction: column;
    gap: 20px; /* 섹션 간의 간격 */
    align-items: stretch;

    .editTitleBox {
      text-align: center; /* 제목 텍스트 중앙 정렬 */
      margin-bottom: 10px;

      .editPageTitle {
        font-size: 26px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 5px;
      }

      .editPageSubtitle {
        font-size: 14px;
        font-weight: 400;
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
