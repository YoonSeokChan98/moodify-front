import { Board } from '@/types';
import { BoardCardStyled } from './styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { store } from '@/redux/store';

const BoardCard = ({ item }: { item: Board }) => {
  const post = item;
  const router = useRouter();
  const [likeNumber, setLikeNumber] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userPid = store.getState().user.userInfo?.userId;

  useEffect(() => {
    setLikeNumber(post.liked_boards.length);

    const likedUserNumberAry = post.liked_boards.map((value) => value.userId);
    const isLikedStatus = likedUserNumberAry.filter((value: number) => value === userPid);
    if (isLikedStatus.length > 0) setIsLiked(true);
  }, [post, userPid]);

  return (
    <BoardCardStyled>
      <div className="boardCardWrap" onClick={() => router.push(`/board_detail/${post.id}`)}>
        <div className="cardId">게시글 ID: {post.id}</div>
        <div className="cardTitle">제목: {post.title}</div>
        <div className="likedBox">
          {isLiked === true ? (
            <>
              <div>
                <HeartFilled />
              </div>
              <div>{likeNumber}</div>
            </>
          ) : (
            <>
              <HeartOutlined />
              <div>{likeNumber}</div>
            </>
          )}
        </div>

        <div className="cardAuthor">작성자: {post.user.userName}</div>
        <div className="cardDate">작성 날짜: {post.createdAt.split('T')[0]}</div>
        <div className="cardQuestion">질문: {post.question}</div>
      </div>
    </BoardCardStyled>
  );
};
export default BoardCard;

// https://moon-coding.tistory.com/117
