import { useRouter } from 'next/router';
import { UserBoardCardStyled } from './styled';
import { useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Board } from '@/types';

const UserBoardCard = ({ item }: { item: Board }) => {
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
    <UserBoardCardStyled>
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
    </UserBoardCardStyled>
  );
};

export default UserBoardCard;
