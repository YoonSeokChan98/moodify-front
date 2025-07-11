import styled from 'styled-components';

export const BoardListStyled = styled.div`
  padding: 40px 20px;
  min-height: 100vh;

  .boardListWrap {
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
    .moreBtn {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
    }
  }

  .emptyMessage {
    text-align: center;
    font-size: 18px;
    color: #999;
    padding: 60px 0;
  }
`;
