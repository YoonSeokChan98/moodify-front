import styled from 'styled-components';

export const HeaderStyled = styled.div`
  .headerWrap {
    border: 1px solid black;
    border-radius: 0px 0px 20px 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .headerLogo {
      cursor: pointer;
      font-weight: bolder;
    }
    .headerLogo:hover {
      color: #53d9ae;
    }
    .headerNavBar {
      cursor: pointer;
      display: flex;
      gap: 10px;
      Button {
        
      }
    }
    .headerAuthBar {
      cursor: pointer;
      display: flex;
      gap: 10px;
      Button {
      }
    }
  }
`;
