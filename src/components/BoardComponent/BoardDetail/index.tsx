import { useRouter } from 'next/router';
import { BoardDetailStyled } from './styled';
import { useEffect, useMemo, useState } from 'react';
import {
  apiGetOneBoard,
  apiLikedBoardPlus,
  apiPatchRemoveBoard,
  apiPatchUpdateBoard,
  apiPostUploadImageFile,
} from '@/pages/api/boardApi';
import { store } from '@/redux/store';
import { Button, Input, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

// 에디터 관련
import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const BoardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [emotionUserPid, setEmotionUserPid] = useState('');
  const [userName, setUserName] = useState('');
  const [likeNumber, setLikeNumber] = useState(0);
  const [liked, setLiked] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const userPid = store.getState().user.userInfo?.userId;
  const idData = {
    userId: Number(userPid),
    boardId: Number(id),
  };

  useEffect(() => {
    const getOneBoard = async () => {
      if (id) {
        const boardData = await apiGetOneBoard(id);
        if (boardData) {
          setQuestion(boardData.data.question);
          setTitle(boardData.data.title);
          setContent(boardData.data.content);
          setDate(boardData.data.createdAt);
          boardData.data.visibilityStatus === 'public' ? setVisibility(true) : setVisibility(false);
          setEmotionUserPid(boardData.data.userId);
          setUserName(boardData.data.user.userName);
          setLikeNumber(boardData.data.liked_boards.length);
          const likedUserNumber = boardData.data.liked_boards.map((value: any) => value.userId);
          if (likedUserNumber === boardData.id) setLiked(false);
        }
      }
    };
    getOneBoard();
  }, [id, liked]);

  // 좋아요 버튼
  const handleLikedBtn = async () => {
    try {
      const response = await apiLikedBoardPlus(idData);
      if ((response.result = true)) {
        setLiked(true);
      }
    } catch (error) {
      console.error('게시글 좋아요 실패', error);
    }
  };

  // 삭제 버튼
  const removeBoardBtn = async () => {
    try {
      const response = await apiPatchRemoveBoard(id);
      if (response.result === true) {
        toast.success('게시글이 삭제되었습니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('게시글 삭제 실패', error);
    }
  };

  const formInitialValues = {
    title: title,
    content: content,
  };
  const updateBoardFormik = useFormik({
    initialValues: formInitialValues,
    // 수정 기능을 사용하려면 enableReinitialize를 true값을 줘서 허용 해줘야함
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { title, content } = values;
        if (typeof content !== 'string') {
          console.error('content가 문자열이 아닙니다:', content);
          return;
        }

        const imgRegex = /<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>/gi;
        const matches = Array.from(content.matchAll(imgRegex));

        let finalContent = content;

        // 각 이미지에 순차적으로 접근
        for (let i = 0; i < matches.length; i++) {
          // src === Base64_data
          const src = matches[i][1];

          // Base64 데이터인지 검증
          if (!src.startsWith('data:image/')) {
            console.log(`Base64 이미지가 아님 (index ${i}): ${src}`);
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

            if (res.result === true) {
              const uploadedUrl = res.data?.url || res.url;
              finalContent = finalContent.replaceAll(src, uploadedUrl);
            } else {
              console.error('업로드 실패:', res);
              alert('서버에 이미지 업로드를 실패했습니다.');
            }
          } catch (error) {
            console.error(`이미지 ${i + 1} 변환 오류:`);
            continue;
          }
        }

        let visibilityStatus = '';
        if (visibility === true) {
          visibilityStatus = 'public';
        } else {
          visibilityStatus = 'private';
        }
        const updateBoardData = {
          boardId: id,
          visibilityStatus: visibilityStatus,
          title: title,
          content: finalContent,
          question: question,
        };
        const response = await apiPatchUpdateBoard(updateBoardData);
        if (response.result === false) return toast.error('수정을 실패했습니다. 다시 시도해 주세요');
        setUpdateState(!true);
        toast.success('게시글을 수정했습니다.');
        router.push(`/board_detail/${id}`);
      } catch (error) {
        console.error(`감정 일기 수정 에러: ${error}`);
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
    <BoardDetailStyled>
      <div className="boardDetailWrap">
        <form onSubmit={updateBoardFormik.handleSubmit}>
          {updateState ? (
            <Input
              placeholder="제목을 입력해 주세요"
              id="title"
              onChange={updateBoardFormik.handleChange}
              value={updateBoardFormik.values.title}
            />
          ) : (
            <div className="title">{title}</div>
          )}
          <div className="likedBox">
            {liked === true ? (
              <>
                <div>좋아요</div>
                <div>{likeNumber}</div>
              </>
            ) : (
              <>
                <Button onClick={handleLikedBtn}>좋아요</Button>
                <div>{likeNumber}</div>
              </>
            )}
          </div>
          <div className="userName">작성자: {userName}</div>
          <div className="date">작성일: {date.split('T')[0]}</div>
          <div className="question">질문: {question}</div>
          {updateState ? (
            <ReactQuill
              placeholder="오늘 하루를 기록해 보세요"
              theme="snow"
              modules={modules}
              id="content"
              onChange={(value: string) => {
                updateBoardFormik.setFieldValue('content', value);
              }}
              value={updateBoardFormik.values.content}
            />
          ) : (
            <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
          )}
          {updateState || (
            <>
              {userPid === Number(emotionUserPid) && (
                <>
                  <Button onClick={() => setUpdateState(true)}>수정</Button>
                  <Button onClick={removeBoardBtn}>삭제</Button>
                </>
              )}
            </>
          )}
          {updateState && (
            <div className="visibilityBox">
              <span>공개 여부:</span>
              <Switch
                defaultChecked={visibility}
                checkedChildren="공개"
                unCheckedChildren="비공개"
                onClick={() => setVisibility(!visibility)}
              />
            </div>
          )}
          <div>{updateState && <Button htmlType="submit">저장하기</Button>}</div>
        </form>
      </div>
    </BoardDetailStyled>
  );
};

export default BoardDetail;
