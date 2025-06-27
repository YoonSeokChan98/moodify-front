import { useEffect, useState } from 'react';
import { BoardListStyled } from './styled';
import { apiGetAllBoard } from '@/pages/api/boardApi';
import BoardCard from '../BoardCard';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Board } from '@/types';

const BoardList = () => {
  const [posts, setPosts] = useState<Board[]>([]);
  const router = useRouter();

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
  const popularPosts = posts.slice().sort((a, b) => b.liked_boards.length - a.liked_boards.length);

  return (
    <BoardListStyled>
      <div className="boardListWrap">
        <div className="title">최신글</div>
        <div className="gridBox">
          {posts?.length > 0 ? (
            posts.slice(0, 5).map((x, i) => <BoardCard key={'post' + i} item={x} />)
          ) : (
            <div className="emptyMessage">작성된 게시글이 없습니다.</div>
          )}
        </div>
        <div className="moreBtn">
          <Button onClick={() => router.push('/all_board_list')}>최신글 더 보러가기</Button>
        </div>

        <div className="title">인기글</div>
        <div className="gridBox">
          {popularPosts?.length > 0 ? (
            popularPosts.slice(0, 5).map((x, i) => <BoardCard key={'post' + i} item={x} />)
          ) : (
            <div className="emptyMessage">작성된 게시글이 없습니다.</div>
          )}
        </div>
        <div className="moreBtn">
          <Button onClick={() => router.push('/all_popular_board_list')}>인기글 더 보러가기</Button>
        </div>
      </div>
    </BoardListStyled>
  );
};

export default BoardList;
