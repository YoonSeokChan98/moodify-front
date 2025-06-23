import styled from 'styled-components';

export const UserEmotionChartStyled = styled.div`
  .UserEmotionChartWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin: 10px;
      font-weight: bolder;
      font-size: 30px;
    }
    .emotionChart {
      /* border: 1px solid; */
      width: 100%;
      height: 400px;
      /* margin: 0 auto; */
    }
  }
`;
