import { useEffect, useState } from 'react';
import { BoardListStyled } from './styled';
import { apiGetAllBoard } from '@/pages/api/boardApi';
import BoardCard from '../BoardCard';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  console.log('🚀 ~ BoardList ~ data:', posts);
  useEffect(() => {
    const getAllBoard = async () => {
      const allBoard = await apiGetAllBoard();
      setPosts(allBoard.data);
    };
    getAllBoard();
  }, []);

  return (
    <BoardListStyled>
      <div className="boardListWrap">
        {posts.length > 0 ? posts?.map((x, i) => <BoardCard key={i} item={x} />) : <div>게시글이 없습니다.</div>}
      </div>
    </BoardListStyled>
  );
};

export default BoardList;
