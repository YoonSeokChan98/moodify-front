import { useEffect, useState } from 'react';
import { BoardListStyled } from './styled';
import { apiGetAllBoard } from '@/pages/api/boardApi';
import BoardCard from '../BoardCard';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getAllBoard = async () => {
      const allBoard = await apiGetAllBoard();
      // 삭제 상태 && 비공개가 아닌 게시글만 필터링 한 뒤 posts에 넣어줌
      const filteredPosts = allBoard.data.filter(
        (board: { removeStatus: boolean; visibilityStatus: string }) =>
          // 삭제 상태: false && 공개 상태: 공개
          board.removeStatus === false && board.visibilityStatus === 'public'
      );
      setPosts(filteredPosts);
    };
    getAllBoard();
  }, []);

  return (
    <BoardListStyled>
      <div className="boardListWrap">
        {posts?.length > 0 ? (
          posts.map((x, i) => <BoardCard key={i} item={x} />)
        ) : (
          <div className="emptyMessage">게시글이 없습니다.</div>
        )}
      </div>
    </BoardListStyled>
  );
};

export default BoardList;
