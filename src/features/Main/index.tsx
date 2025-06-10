import Loading from '@/components/Loading';
import { MainStyled } from './styled';
import { Skeleton } from 'antd';
import BoardList from '@/components/BoardComponent/BoardList';

const Main = () => {
  return (
    <MainStyled>
      <div className="mainWrap">
        <div className="mainTitle">
          <div className="title1">Moodify</div>
          <div className="title2">감정을 기록하다.</div>
        </div>
        <div>
          <BoardList />
        </div>
      </div>
    </MainStyled>
  );
};

export default Main;
