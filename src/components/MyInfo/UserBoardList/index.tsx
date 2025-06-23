import { apiGetMyAllBoard } from '@/pages/api/boardApi';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { UserBoardListStyled } from './styled';
import UserBoardCard from './UserBoardCard';

// 페이지네이션 만들기

const UserBoardList = () => {
  const [posts, setPosts] = useState([]);
  // console.log('🚀 ~ UserBoardList ~ posts:', posts);
  const userId = store.getState().user.userInfo?.userId;
  useEffect(() => {
    const getMyAllBoard = async () => {
      try {
        const myAllBoard = await apiGetMyAllBoard(String(userId));
        setPosts(myAllBoard.data);
      } catch (error) {
        console.error('내 게시글 가져오기 에러: ', error);
      }
    };
    getMyAllBoard();
  }, []);

  return (
    <UserBoardListStyled>
      <div className="title">내가 작성한 게시글들</div>
      <div className="boardListWrap">
        {posts?.length > 0 ? (
          posts.map((x, i) => <UserBoardCard key={i} item={x} />)
        ) : (
          <div className="emptyMessage">작성된 게시글이 없습니다.</div>
        )}
      </div>
    </UserBoardListStyled>
  );
};

export default UserBoardList;
