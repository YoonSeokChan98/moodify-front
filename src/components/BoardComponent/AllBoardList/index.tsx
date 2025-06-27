import { useEffect, useState } from 'react';
import { AllBoardListStyled } from './styled';
import { apiGetAllBoard } from '@/pages/api/boardApi';
import { useRouter } from 'next/router';
import BoardCard from '../BoardCard';
import PaginationComponent from '@/components/PaginationComponent';
import { Board } from '@/types';

const AllBoardList = () => {
  const router = useRouter();
  const urlPathname = router.pathname;
  const [postType, setPostType] = useState<boolean>(true);
  const [posts, setPosts] = useState<Board[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const page = parseInt((router.query.page as string) || '1', 10);
  const itemsPerPage = 8;

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
      setTotalItems(filteredPosts.length);
    };
    getAllBoard();
    if (urlPathname === '/all_board_list') setPostType(true);
    if (urlPathname === '/all_popular_board_list') setPostType(false);
  }, [urlPathname]);

  // 현재 페이지에 표시할 게시글들을 계산
  const getCurrentPagePosts = (allPosts: Board[]) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allPosts.slice(startIndex, endIndex);
  };

  const popularPosts = posts.slice().sort((a, b) => b.liked_boards.length - a.liked_boards.length);

  // 현재 페이지에 표시할 게시글들
  const currentPosts = postType ? getCurrentPagePosts(posts) : getCurrentPagePosts(popularPosts);

  return (
    <AllBoardListStyled>
      <div className="allBoardListWrap">
        <div className="title">{postType ? '최신글' : '인기글'}</div>
        <div className="gridBox">
          {currentPosts?.length > 0 ? (
            currentPosts.map((x, i) => <BoardCard key={'post' + i} item={x} />)
          ) : (
            <div className="emptyMessage">작성된 게시글이 없습니다.</div>
          )}
        </div>
        <PaginationComponent totalItems={totalItems} currentPage={page} pageCount={5} itemCountPerPage={itemsPerPage} />
      </div>
    </AllBoardListStyled>
  );
};
export default AllBoardList;
