import styled from 'styled-components';

export const UserBoardListStyled = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  /* display: flex;
  flex-direction: column; */
  .title {
    padding: 10px;
    text-align: center;
    font-weight: bolder;
    font-size: 30px;
  }
  .boardListWrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    .emptyMessage {
      text-align: center;
      font-size: 18px;
      color: #999;
      padding: 60px 0;
    }
  }
  .moreBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`;
