import styled from 'styled-components';

export const HeaderStyled = styled.div`
  .headerWrap {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 0 30px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerLogo {
      cursor: pointer;
      font-weight: bolder;
      font-size: 20px;
      color: #4a90e2;
      transition: color 0.5s ease;
    }
    .headerLogo:hover {
      color: #53d9ae;
    }
    .headerNavBar {
      display: flex;
      gap: 10px;
      Button {
        cursor: pointer;
      }
    }
    .headerAuthBar {
      display: flex;
      gap: 10px;
      Button {
        cursor: pointer;
      }
      .headerUserName {
        margin: auto 0;
      }
    }
  }
`;
