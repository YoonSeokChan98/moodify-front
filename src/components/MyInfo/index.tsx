import UserEmotionChart from './UserEmotionChart';
import UserInfo from './UserInfo';
import { MyInfoStyled } from './styled';

import { useEffect, useState } from 'react';
import { EmotionData } from '@/types';
import { store } from '@/redux/store';
import { apiGetAllUserBoard } from '@/pages/api/boardApi';
import UserBoardList from './UserBoardList';

const MyInfo = () => {
  const [boards, setBoards] = useState([]);
  // console.log('🚀 ~ MyInfo ~ boards:', boards);
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  // console.log('🚀 ~ MyInfo ~ emotions:', emotions);
  const user = store.getState().user.userInfo;
  const userId = user?.userId;

  useEffect(() => {
    const getAllBoards = async () => {
      try {
        const response = await apiGetAllUserBoard(Number(userId));
        const extractedBoards = response.data.map((x: any) => x);
        setBoards(extractedBoards);
      } catch (error) {
        console.error('게시글 전체 가져오기 실패', error);
      }
    };
    getAllBoards();
  }, [userId]);

  useEffect(() => {
    const getAllEmotions = () => {
      try {
        const extractedEmotions = boards.map((data: any) => data.emotion);
        setEmotions(
          extractedEmotions.map(
            ({ neutral, happy, sad, angry, fearful, disgusted, surprised, createdAt }: EmotionData) => ({
              neutral,
              happy,
              sad,
              angry,
              fearful,
              disgusted,
              surprised,
              createdAt,
            })
          )
        );
      } catch (error) {
        console.error('감정 전체 가져오기 실패', error);
      }
    };
    getAllEmotions();
  }, [boards]);

  return (
    <MyInfoStyled>
      <div className="myInfoWrap">
        <UserInfo user={user} />
        {/* 
        1. 스와이프 적용해서 여러 형태로 그래프 보여주기 
        2. 그래프 날짜 누르면 해당 글로 이동하기 (추가: 게시글에서 그래프 작게 보여주기)
        */}
        <UserEmotionChart emotions={emotions} />
        <UserBoardList />
      </div>
    </MyInfoStyled>
  );
};

export default MyInfo;
