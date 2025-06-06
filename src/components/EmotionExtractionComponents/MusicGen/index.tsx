import { EmotionType } from '@/types';
import { MusicGenStyled } from './styled';
import { Button } from 'antd';
import { apiPostGenerateMusic } from '@/pages/api/musicApi';
import { useState } from 'react';

const MusicGen = (emotions: EmotionType) => {
  // const musicUrl = 'https://cdn1.suno.ai/5b0b809a-1b41-45ec-81fd-8665c5c4dd36.webm';

  // 노래 생성 하기 전에 redux에 로그인 한 유저의 데이터가 있는지 확인
  // 있다면 통과 없다면 로그인 후 노래 생성해 달라고 알림창 띄우기
  const generateMusic = async () => {
    try {
      // 노래 생성에 감정과 유저 pId전달 유저 존재 여부 확인 후 노래 생성
      // 노래 생성... 이거 지금 나는 할 수 없을지도?
      // 다른 방법을 찾아보자
      // const response = await apiPostGenerateMusic(emotions);
      // console.log('🚀 ~ generateMusic ~ response:', response);
      alert('개발 기획 중입니다...')
    } catch (error) {
      console.error(`음악생성 에러: ${error}`);
    }
  };
  return (
    <MusicGenStyled>
      <div>
        <div>뮤직젠</div>
        <div>
          <Button onClick={generateMusic}>음악생성</Button>
        </div>
        {/* <audio controls src={musicUrl}>
          브라우저가 오디오 요소를 지원하지 않습니다.
        </audio> */}
      </div>
    </MusicGenStyled>
  );
};

export default MusicGen;
