import { useRouter } from 'next/router';
import { BoardDetailStyled } from './styled';
import { useEffect, useState } from 'react';
import { apiGetOneBoard } from '@/pages/api/boardApi';
import { store } from '@/redux/store';
import { Button, Switch } from 'antd';

const BoardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [emotionUserPid, setEmotionUserPid] = useState('');

  useEffect(() => {
    const getOneBoard = async () => {
      if (id) {
        const boardData = await apiGetOneBoard(id);
        if (boardData) {
          console.log('🚀 ~ getOneBoard ~ boardData:', boardData.data);
          setQuestion(boardData.data.question);
          setTitle(boardData.data.title);
          setContent(boardData.data.content);
          setDate(boardData.data.createdAt);
          setVisibility(boardData.data.visibilityStatus);
          setEmotionUserPid(boardData.data.emotion.userId);
        }
      }
    };
    getOneBoard();
  }, [id]);
  const userPid = store.getState().user.userInfo?.userId;
  if (userPid === Number(emotionUserPid)) {
  }

  return (
    // 업데이트 및 삭제 기능 추가하기!!!!!!!!!!!!!!!!!!!!!!!!!!
    <BoardDetailStyled>
      <div className="boardDetailWrap">
        <div className="title">{title}</div>

        {userPid === Number(emotionUserPid) && (
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

        <div className="date">작성일: {date.split('T')[0]}</div>

        <div className="question">질문: {question}</div>

        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </BoardDetailStyled>
  );
};

export default BoardDetail;
