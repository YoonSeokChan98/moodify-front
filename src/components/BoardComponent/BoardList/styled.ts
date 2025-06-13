import styled from 'styled-components';

export const BoardListStyled = styled.div`
  padding: 40px 20px;
  min-height: 100vh;

  .boardListWrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .emptyMessage {
    text-align: center;
    font-size: 18px;
    color: #999;
    padding: 60px 0;
  }
`;
