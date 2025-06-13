import { useEffect, useMemo, useState } from 'react';
import { EmotionDiaryStyled } from './styled';
import { AppDispatch, store } from '@/redux/store';
import { Button, Input, Switch } from 'antd';
import { useFormik } from 'formik';
// 에디터 관련
// @ts-ignore

import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

// api
import { apiPostUploadImageFile, apiPostWriteBoard } from '@/pages/api/boardApi';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeEmotions } from '@/redux/slices/emotionSlices';

const EmotionDiary = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [visibility, setVisibility] = useState(false);
  const [highEmotion, setHighEmotion] = useState<{ key: string; value: number }>({ key: '', value: 0 });
  const getReduxEmotion = store.getState().emotions.emotions as Record<string, number | undefined> | undefined;

  const [question, setQuestion] = useState<string>('');
  const emotionQuestions: Record<string, string[]> = {
    happy: [
      '오늘 기쁘게 만든 일이 무엇인가요?',
      '행복함을 주변에 어떻게 표현하나요?',
      '기쁨을 더 오래 느끼기 위해 어떤 노력을 하고 있나요?',
    ],
    sad: [
      '오늘 슬펐던 경험이 있었다면 무엇인가요?',
      '이 슬픈 감정을 어떻게 해소하려고 하나요?',
      '누군가에게 털어놓고 싶은 일이 있나요?',
    ],
    angry: [
      '오늘 화가 났던 이유를 기억하고 있나요?',
      '분노를 느낄 때 어떻게 대처하나요?',
      '마음을 가라앉히기 위해 어떤 행동을 했나요?',
    ],
    neutral: ['오늘은 평소와 다름없이 보냈나요?', '마음이 평안할 때 드는 생각은?', '특별히 신경 쓰이는 일이 있나요?'],
    surprised: [
      '오늘 놀라웠던 일은 무엇이 있었나요?',
      '놀란 기억이 인상 깊게 남았나요?',
      '예상치 못한 사건이 오늘 기분에 영향을 주었나요?',
    ],
    disgusted: [
      '오늘 불쾌했던 경험이 있었나요?',
      '이 기분을 해소하기 위해 무엇을 했나요?',
      '누구나 겪을 수 있는 일이었나요?',
    ],
    fearful: [
      '오늘 걱정이나 두려움이 있었나요?',
      '이 불안한 마음을 어떻게 다스렸나요?',
      '누군가에게 이야기하고 싶은 두려움이 있나요?',
    ],
  };

  // 게시글 데이터
  const [titleState, setTitleState] = useState<string>('');
  const [contentState, setContentState] = useState<string>('');

  useEffect(() => {
    console.log('변경된 titleState:', titleState);
    console.log('변경된 contentState:', contentState);
  }, [titleState, contentState]);

  // 감정에 따른 질문 추출
  useEffect(() => {
    setVisibility(false);
    if (!getReduxEmotion || Object.keys(getReduxEmotion).length === 0) {
      setHighEmotion({ key: '', value: 0 });
      return;
    }
    let maxKey = '';
    let maxValue = -Infinity; // 모든 값이 음수일 가능성을 위해 -Infinity
    for (let key in getReduxEmotion) {
      const v = getReduxEmotion[key] ?? 0;
      if (v > maxValue) {
        maxKey = key;
        maxValue = v;
      }
    }
    setHighEmotion({ key: maxKey, value: maxValue });
  }, [getReduxEmotion]);
  useEffect(() => {
    if (highEmotion.key && emotionQuestions[highEmotion.key]) {
      const randomNumFloor = Math.floor(Math.random() * emotionQuestions[highEmotion.key].length);
      setQuestion(emotionQuestions[highEmotion.key][Number(randomNumFloor)]);
    } else {
      setQuestion('');
    }
  }, [highEmotion]);

  // 폼 관리
  const formInitialValues = {
    question: question,
    title: '',
    content: '',
  };
  const emotionDiaryFormik = useFormik({
    initialValues: formInitialValues,
    onSubmit: async (values) => {
      try {
        const { title, content } = values;
        if (!title) return alert('제목을 입력해 주세요');
        if (!content) return alert('오늘 하루를 기록해 보세요!');

        const imgRegex = /<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>/gi;
        const matches = Array.from(content.matchAll(imgRegex));

        let finalContent = content;

        // 각 이미지에 순차적으로 접근
        for (let i = 0; i < matches.length; i++) {
          // src === Base64_data
          const src = matches[i][1];

          // Base64 데이터인지 검증
          if (!src.startsWith('data:image/')) {
            console.log(`Base64 이미지가 아닙니다: ${src}`);
            continue;
          }

          try {
            // Base64 데이터를 Blob으로 변환
            // dataURL의 값이 data:image/jpeg:base64,~~~~ 이므로 ','를 기점으로 잘라서 ~~~~ 부분만 다시 인코딩
            const base64Data = src.split(',')[1];
            if (!base64Data) {
              console.error(`Base64 데이터가 없습니다: ${src}`);
              continue;
            }

            const byteString = atob(base64Data);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let j = 0; j < byteString.length; j++) {
              ia[j] = byteString.charCodeAt(j);
            }

            // MIME 타입 추출 (기본값: image/jpeg)
            const mimeMatch = src.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            const fileExtension = mimeType.split('/')[1] || 'jpg';
            const blob = new Blob([ia], { type: mimeType });
            const file = new File([blob], `image_${i + 1}.${fileExtension}`, { type: mimeType });

            const formData = new FormData();
            formData.append('file', file);
            const res = await apiPostUploadImageFile(formData);

            const srcToUrlMap: Record<string, string> = {};
            if (res.result === true) {
              const uploadedUrl = res.data?.url || res.url;
              srcToUrlMap[src] = uploadedUrl;
              let updatedContent = content;

              for (const base64Src in srcToUrlMap) {
                const uploadedUrl = srcToUrlMap[base64Src];
                finalContent = updatedContent.replaceAll(base64Src, uploadedUrl);
              }
            } else {
              console.error('업로드 실패:', res);
              alert('서버에 이미지 업로드를 실패했습니다.');
            }
          } catch (error) {
            console.error(`이미지 ${i + 1} 변환 오류:`);
            continue;
          }
        }
        const userId = store.getState().user.userInfo?.userId;
        if (!userId) {
          console.log('유저 정보가 없습니다');
        }
        const userEmotion = store.getState().emotions.emotions;

        let visibilityStatus = '';
        if (visibility === true) {
          visibilityStatus = 'public';
        } else {
          visibilityStatus = 'private';
        }

        const newEmotionDiary = {
          visibilityStatus: visibilityStatus,
          userEmotion: userEmotion,
          userId: userId,
          question: question,
          title: title,
          content: finalContent,
        };

        const response = await apiPostWriteBoard(newEmotionDiary);
        if (response.result === false) return alert('글 작성 중 문제 발생: 다시 시도해 주세요');
        dispatch(removeEmotions());
        router.push('/');
      } catch (error) {
        console.error(`감정 일기 에러: ${error}`);
      }
    },
  });

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
      ],
      ImageResize: {
        parchment: Quill.import('parchment'),
      },
    };
  }, []);

  return (
    <EmotionDiaryStyled>
      <div>
        {question && (
          <form className="emotionDiaryWrap" onSubmit={emotionDiaryFormik.handleSubmit}>
            <div className="questionBox">
              오늘의 질문: <div>{question}</div>
            </div>
            <div className="titleBox">
              <Input
                placeholder="제목을 입력해 주세요"
                id="title"
                onChange={emotionDiaryFormik.handleChange}
                value={emotionDiaryFormik.values.title}
              />
            </div>
            <div className="contentBox">
              <ReactQuill
                placeholder="오늘 하루를 기록해 보세요"
                theme="snow"
                modules={modules}
                id="content"
                onChange={(value: string) => {
                  emotionDiaryFormik.setFieldValue('content', value);
                }}
                value={emotionDiaryFormik.values.content}
              />
            </div>
            <div className="visibilityBox">
              비공개 / 공개
              <Switch
                defaultChecked={false}
                checkedChildren="공개"
                unCheckedChildren="비공개"
                onClick={() => setVisibility(!visibility)}
              />
            </div>
            <div>
              <Button htmlType="submit">작성하기</Button>
            </div>
          </form>
        )}
      </div>
    </EmotionDiaryStyled>
  );
};

export default EmotionDiary;

// https://velog.io/@khy226/Next.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-React-Quill%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
// https://make-somthing.tistory.com/24
