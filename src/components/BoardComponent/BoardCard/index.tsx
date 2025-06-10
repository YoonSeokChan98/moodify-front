import { useEffect } from 'react';
import { BoardCardStyled } from './styled';

const BoardCard = (item: any) => {
  const post = item.item;
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <BoardCardStyled>
      <div className='boardCardWrap'>
        <div>게시글 ID: {post.id}</div>
        <div>게시글 감정ID: {post.emotionId}</div>
        <div>작성날짜: {post.createdAt.split('T')[0]}</div>
        <div>질문: {post.question}</div>
        <div>제목: {post.title}</div>
        <div>내용: {post.content}</div>
        <div>공개상태: {post.visibilityStatus}</div>
      </div>
    </BoardCardStyled>
  );
};
export default BoardCard;

// https://moon-coding.tistory.com/117