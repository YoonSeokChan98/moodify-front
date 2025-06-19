import UserEmotionChart from './UserEmotionChart';
import UserInfo from './UserInfo';
import { MyInfoStyled } from './styled';

import { useEffect, useState } from 'react';
import { EmotionData } from '@/types';
import { apiGetAllUserEmotion } from '@/pages/api/emotionApi';
import { store } from '@/redux/store';

const MyInfo = () => {
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const user = store.getState().user.userInfo;
  const userId = user?.userId;

  // userId로 유저가 지금까지 분석한 전체 데이터를 조회
  useEffect(() => {
    const getAllEmotion = async () => {
      try {
        const response = await apiGetAllUserEmotion(userId);
        setEmotions(
          response.data.map(
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
    getAllEmotion();
  }, [userId]);

  return (
    <MyInfoStyled>
      <div className="myInfoWrap">
        <UserInfo user={user} />
        <UserEmotionChart emotions={emotions} />
      </div>
    </MyInfoStyled>
  );
};

export default MyInfo;
