import styled from 'styled-components';

export const MembershipInfoStyled = styled.div`
  .MembershipInfoWrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .pageTitle {
      font-size: 24px;
      font-weight: bold;
    }

    .membershipInfoBox {
      display: flex;
      gap: 20px;
      width: 100%;
      justify-content: space-around;

      .freeMembership,
      .proMembership {
        flex: 1;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #ccc;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        background-color: #f9f9f9;
        transition: all 0.3s ease;

        .title {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 10px;
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
        }

        div {
          margin-bottom: 8px;
          font-size: 14px;
        }
      }

      .proMembership {
        border-color: #1890ff;
        background-color: #e6f7ff;
      }

      .active {
        border-color: #52c41a;
        background-color: #f6ffed;
      }
    }

    button {
      margin-top: 20px;
    }
  }
`;
