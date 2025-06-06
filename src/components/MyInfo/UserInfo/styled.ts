import styled from 'styled-components';

export const UserInfoStyled = styled.div`
  .userInfoWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .userInfoContent {
      border-bottom: 1px solid #c0c0c0;
      width: 80%;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .userInfoBox {
        display: flex;
        .userInfoImage {
          background-color: gainsboro;
          border-radius: 50px;
          width: 50px;
          height: 50px;
        }
        .userInfo {
          .userName {
            font-weight: bolder;
          }
        }
      }
      .reMyInfoBtn {
      }
    }
  }
`;
