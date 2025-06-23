import styled from 'styled-components';

export const UserBoardCardStyled = styled.div`
  .boardCardWrap {
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
    }

    .cardId {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }

    .cardTitle {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 6px;
      color: #333;
    }

    .likedBox {
      display: flex;
      align-items: center;
    }

    .cardAuthor {
      font-size: 14px;
      color: #666;
      margin-bottom: 6px;
    }

    .cardDate {
      font-size: 13px;
      color: #aaa;
      margin-bottom: 6px;
    }

    .cardQuestion {
      font-size: 15px;
      color: #444;
      margin-top: 10px;
    }
  }
`;
