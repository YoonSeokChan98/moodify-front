import styled from 'styled-components';

export const AllBoardListStyled = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  .allBoardListWrap {
    .title {
      text-align: center;
      font-size: 40px;
      font-weight: bolder;
      margin: 10px;
    }
    .gridBox {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
`;
