import { useEffect, useState } from 'react';
import { FaceDetectionStyled } from './styled';
import * as faceApi from 'face-api.js';


const FaceDetection = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        console.log('모델 로드 성공');
        setLoading(false);
      } catch (error) {
        console.error('모델 로드 오류:', error);
        setLoading(false);
      }
    };
    loadModels()
  }, []);

  return (
    <FaceDetectionStyled>
      <div className="FaceAiWrap">
        <div>FaceAi 활용해보기</div>
        {loading ? <div>로딩 중...</div> : <div>감정 분석</div>}
      </div>
    </FaceDetectionStyled>
  );
};

export default FaceDetection;

/**
 * 참고한 곳
 * https://velog.io/@justamoment/js-%EA%B8%B0%EB%B0%98%EC%9D%98-%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%93%B4%EB%8B%A4%EA%B3%A0-face-api.js%EB%A1%9C-%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D-%EB%B0%8F-%EB%B6%84%EB%A5%98%ED%95%98%EA%B8%B0face-recognition-and-classification
 */
