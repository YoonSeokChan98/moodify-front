import { ImageUploadStyled } from './styled';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as faceApi from 'face-api.js';
import UserEmotionChart from '../UserEmotionChart';

const ImageUpload = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [detections, setDetections] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //upload props 설정
  const props: UploadProps = {
    name: 'file',
    action: '',
    fileList,
    beforeUpload(file: any) {
      setFileList([file]);
      // antd upload로 만든 이미지 정보를 src를 만들기
      const objectUrl = URL.createObjectURL(file);
      // 만들어진 url 정보 저장
      setImageSrc(objectUrl);
      return false;
    },
    onRemove(file) {
      setImageSrc(null);
    },
  };

  const imageContentBox =
    imageSrc === null ? (
      <div className="noneImgBox">이미지가 없습니다.</div>
    ) : (
      <>
        <img className="imageUploadImg" ref={imageRef} src={imageSrc} alt="분석 이미지" />
        {/* <canvas ref={canvasRef} /> */}
      </>
    );

  // face-api.js
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
        // console.log('모델 로드 성공');
        setLoading(false);
      } catch (error) {
        // console.error('모델 로드 오류:', error);
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!imageRef.current || !imageSrc) return;

    const analyzeImage = async () => {
      try {
        await new Promise((resolve) => {
          imageRef.current!.onload = resolve;
        });
        /**
        canvasRef.current!.width = imageRef.current!.width;
        canvasRef.current!.height = imageRef.current!.height;
         */

        const newDetections = await faceApi
          .detectAllFaces(imageRef.current!, new faceApi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceExpressions();
        setDetections(newDetections[0].expressions);

        /** 
          const canvas = canvasRef.current!;
          const ctx = canvas.getContext('2d');
          if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const displaySize = {
            width: imageRef.current!.width,
            height: imageRef.current!.height,
          };
          faceApi.matchDimensions(canvas, displaySize);
          const resizedDetections = faceApi.resizeResults(detections, displaySize);
          faceApi.draw.drawDetections(canvasRef.current!, resizedDetections);
          faceApi.draw.drawFaceExpressions(canvasRef.current!, resizedDetections);
          }
         */
      } catch (error) {
        console.error(error);
      }
    };
    analyzeImage();
  }, [imageSrc]);

  const userEmotions = detections ? (
    <>
      <UserEmotionChart item={detections} />
    </>
  ) : (
    <div>
      <div className="noneImage">감정을 출력하려면 이미지를 등록해주세요</div>
    </div>
  );

  return (
    <ImageUploadStyled>
      <div className="imageUploadWrap">
        <div className="imageUploadImgBox">{imageContentBox}</div>
        <div className="imageUploadControllerBox">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
        </div>
      </div>
      <div>
        {userEmotions}
      </div>
    </ImageUploadStyled>
  );
};

export default ImageUpload;

/**
 * 참고한 곳
 * https://velog.io/@justamoment/js-%EA%B8%B0%EB%B0%98%EC%9D%98-%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%EC%93%B4%EB%8B%A4%EA%B3%A0-face-api.js%EB%A1%9C-%EC%96%BC%EA%B5%B4-%EC%9D%B8%EC%8B%9D-%EB%B0%8F-%EB%B6%84%EB%A5%98%ED%95%98%EA%B8%B0face-recognition-and-classification
 */
