import { useEffect, useState } from 'react';
import { UserAllBoardListStyled } from './styled';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { apiGetMyAllBoard } from '@/pages/api/boardApi';
import BoardCard from '@/components/BoardComponent/BoardCard';
import PaginationComponent from '@/components/PaginationComponent';

const UserAllBoardList = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const userId = store.getState().user.userInfo?.userId;
  const page = parseInt((router.query.page as string) || '1', 10);
  const itemsPerPage = 8;

  useEffect(() => {
    const getMyAllBoard = async () => {
      try {
        const myAllBoard = await apiGetMyAllBoard(String(userId));
        // 삭제 상태가 아닌 게시글만 필터링
        const filteredPosts = myAllBoard.data.filter(
          (board: { removeStatus: boolean }) => board.removeStatus === false
        );
        setPosts(filteredPosts);
        setTotalItems(filteredPosts.length);
      } catch (error) {
        console.error('내 게시글 가져오기 에러: ', error);
      }
    };
    getMyAllBoard();
  }, []);
  // 현재 페이지에 표시할 게시글들을 계산
  const getCurrentPagePosts = (allPosts: any[]) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allPosts.slice(startIndex, endIndex);
  };
  // 현재 페이지에 표시할 게시글들
  const currentPosts = getCurrentPagePosts(posts);
  return (
    <UserAllBoardListStyled>
      <div className="userAllBoardListWrap">
        <div className="title">내가 작성한 게시글</div>
        <div className="gridBox">
          {currentPosts?.length > 0 ? (
            currentPosts.map((x, i) => <BoardCard key={'post' + i} item={x} />)
          ) : (
            <div className="emptyMessage">작성된 게시글이 없습니다.</div>
          )}
        </div>
        <PaginationComponent totalItems={totalItems} currentPage={page} pageCount={5} itemCountPerPage={itemsPerPage} />
      </div>
    </UserAllBoardListStyled>
  );
};
export default UserAllBoardList;
