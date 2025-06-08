import { UserEmotionChartStyled } from './styled';

const UserEmotionChart = () => {
  /**
   * 1. 백에 유저 pId에 해당하는 감정 전부 가져오기
   * 2. 감정데이터들 날짜별로 보여주기
   */
  return (
    <UserEmotionChartStyled>
      <div className='UserEmotionChartWrap'>
        <div className='title'>감정 데이터 분석</div>
        <div className='emotionChart'>
        </div>
      </div>
    </UserEmotionChartStyled>
  );
};
export default UserEmotionChart;
