import { ImageUploadStyled } from './styled';
import { Button, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as faceApi from 'face-api.js';
import UserEmotionChart from '../UserEmotionChart';
import { EmotionType } from '@/types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { updateEmotion } from '@/redux/slices/emotionSlices';

const ImageUpload = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [detections, setDetections] = useState<EmotionType | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [step, setStep] = useState<'idle' | 'uploading' | 'analyzing' | 'done'>('idle');

  //upload props 설정
  const props: UploadProps = {
    name: 'file',
    action: '',
    fileList,
    onChange({ file }) {
      if (file.status !== 'uploading') {
        console.log(file);
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'uploading',
        url: 'http://www.baidu.com/xxx.png',
        percent: 33,
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
    showUploadList: {
      extra: ({ size = 0 }) => <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>,
    },
    beforeUpload(file: any) {
      setStep('uploading');
      // antd upload로 만든 이미지 정보를 src를 만들기
      const objectUrl = URL.createObjectURL(file);
      // 만들어진 url 정보 저장
      setImageSrc(objectUrl);
      setFileList([file]);

      return false;
    },
    onRemove(file) {
      setFileList([]);
      setDetections(null);
      setImageSrc(null);
      setStep('idle');
    },
  };

  const imageContentBox =
    imageSrc === null ? (
      <></>
    ) : (
      <>
        <div className="imageUploadImgBox">
          <img className="imageUploadImg" ref={imageRef} src={imageSrc} alt="분석 이미지" />
        </div>
      </>
    );

  // face-api.js
  useEffect(() => {
    // setLoading(true);
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        // console.log('모델 로드 성공');
        // setLoading(false);
      } catch (error) {
        console.error('모델 로드 오류:', error);
        // setLoading(false);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!imageRef.current || !imageSrc) return;

    const analyzeImage = async () => {
      setStep('analyzing');
      try {
        await new Promise((resolve) => {
          imageRef.current!.onload = resolve;
        });

        const newDetections = await faceApi
          .detectAllFaces(imageRef.current!, new faceApi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceExpressions();
        const newEmotions = newDetections[0].expressions;
        dispatch(
          updateEmotion({
            angry: newEmotions.angry,
            disgusted: newEmotions.disgusted,
            fearful: newEmotions.fearful,
            happy: newEmotions.happy,
            neutral: newEmotions.neutral,
            sad: newEmotions.sad,
            surprised: newEmotions.surprised,
          })
        );
      } catch (error) {
        console.error(error);
      }
      setStep('done');
    };

    analyzeImage();
  }, [imageSrc]);

  const emotion = store.getState().emotions.emotions;
  const onClickEmotionDiary = () => {
    if (!emotion) {
      return alert('감정을 먼저 분석해 주세요!');
    }
    router.push('/emotion_diary');
  };

  return (
    <ImageUploadStyled>
      <div className="imageUploadWrap">
        {imageContentBox}
        <div className="imageUploadControllerBox">
          <Upload className="imageUploadBtn" {...props}>
            <Button icon={<UploadOutlined />}>이미지로 감정 분석하기</Button>
          </Upload>
        </div>
      </div>
      <div>
        <div className="loadingBox">
          {step === 'uploading' && (
            <>
              <Spin size="large" style={{ color: 'black', fontSize: 18 }} />
              <div>이미지 업로드 중입니다...</div>
            </>
          )}
          {step === 'analyzing' && (
            <>
              <Spin size="large" style={{ color: 'black', fontSize: 18 }} />
              <div>AI 분석 중입니다...</div>
            </>
          )}
        </div>
        <UserEmotionChart />
        <div className='writeBoardBtn'>
          <Button onClick={() => onClickEmotionDiary()}>감정일기 작성하기</Button>
        </div>
      </div>
    </ImageUploadStyled>
  );
};

export default ImageUpload;

/**
 * 참고한 곳
 * https://velog.io/@justamoment/js-%EA%B8%B0%EB%B0%98%EC%9D%98-%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%93%B4%EB%8B%A4%EA%B3%A0-face-api.js%EB%A1%9C-%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D-%EB%B0%8F-%EB%B6%84%EB%A5%98%ED%95%98%EA%B8%B0face-recognition-and-classification
 */
