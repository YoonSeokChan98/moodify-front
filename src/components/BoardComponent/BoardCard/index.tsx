import { BoardCardStyled } from './styled';
import { useRouter } from 'next/router';

const BoardCard = (item: any) => {
  const post = item.item;
  const router = useRouter();

  return (
    <BoardCardStyled>
      <div className="boardCardWrap" onClick={() => router.push(`/board_detail/${post.id}`)}>
        <div className="cardId">게시글 ID: {post.id}</div>
        <div className="cardTitle">제목: {post.title}</div>
        <div className="cardAuthor">작성자: {post.emotion.user.userName}</div>
        <div className="cardDate">작성 날짜: {post.createdAt.split('T')[0]}</div>
        <div className="cardQuestion">질문: {post.question}</div>
      </div>
    </BoardCardStyled>
  );
};
export default BoardCard;

// https://moon-coding.tistory.com/117
