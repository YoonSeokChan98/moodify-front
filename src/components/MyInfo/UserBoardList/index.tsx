import { apiGetMyAllBoard } from '@/pages/api/boardApi';
import { store } from '@/redux/store';
import { useEffect, useState } from 'react';
import { UserBoardListStyled } from './styled';
import UserBoardCard from './UserBoardCard';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const UserBoardList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const userId = store.getState().user.userInfo?.userId;

  useEffect(() => {
    const getMyAllBoard = async () => {
      try {
        const myAllBoard = await apiGetMyAllBoard(String(userId));
        // 삭제 상태가 아닌 게시글만 필터링
        const filteredPosts = myAllBoard.data.filter(
          (board: { removeStatus: boolean }) => board.removeStatus === false
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error('내 게시글 가져오기 에러: ', error);
      }
    };
    getMyAllBoard();
  }, [userId]);

  return (
    <UserBoardListStyled>
      <div className="title">내가 작성한 게시글</div>
      <div className="boardListWrap">
        {posts?.length > 0 ? (
          posts.map((x, i) => <UserBoardCard key={i} item={x} />)
        ) : (
          <div className="emptyMessage">작성된 게시글이 없습니다.</div>
        )}
      </div>
      <div className="moreBtn">
        <Button onClick={() => router.push('/user_all_board_list')}>더 보러가기</Button>
      </div>
    </UserBoardListStyled>
  );
};

export default UserBoardList;
